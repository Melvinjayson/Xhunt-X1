/**
 * Verification Engine — VALIDATE-mode worker.
 *
 * Four-stage pipeline wired onto outcome_validations (010 + 030):
 *   1. Evidence-integrity signals  (per evidence item, by type)
 *   2. Fraud risk score            (signals + behavioral context -> risk_score)
 *   3. Tier routing                (LOW -> auto_approve | MEDIUM -> human | HIGH -> reject/escalate)
 *   4. Provenance write            (append-only audit trail)
 *
 * Detectors are injectable so forensic work (AI-gen detection, collusion clustering,
 * perceptual hashing) can land incrementally behind a stable contract.
 *
 * confidence_score is DERIVED here — never accepted from the client.
 */

import { createAdminClient } from '@/lib/supabase/admin';
import type {
  DbOutcomeValidation,
  ValidationEvidence,
  EvidenceType,
} from '@/lib/supabase/types';

// ── public types ───────────────────────────────────────────────────────────────

export type SignalFlag   = 'ok' | 'warn' | 'fail';
export type RoutingTier = 'auto_approved' | 'human_review' | 'auto_rejected' | 'escalated';

export interface IntegritySignal {
  signal: string;
  value:  number;   // 0..1 contribution (1 = fully trustworthy)
  weight: number;   // 0..1 relative importance
  flag:   SignalFlag;
}

export interface ProvenanceEntry {
  stage:          string;
  detail:         string;
  at:             string;          // ISO timestamp
  model_version?: string;
}

export interface VerificationSpec {
  required_evidence_types: EvidenceType[];
  min_source_tier:         number;         // 1..5
  requires_peer_quorum:    number;
  auto_approve_threshold:  number;         // risk below this -> auto_approved
  human_review_threshold:  number;         // risk above this -> auto_rejected/escalated
}

export interface BehavioralContext {
  submissionsInWindow:      number;
  windowNorm:               number;
  deviceSharedAccountCount: number;
  impossibleTravel:         boolean;
  collusionProximity:       number;        // 0..1, from trust graph
  participantStanding:      number;        // 0..100 verified-history standing
  isNewcomer:               boolean;
}

// ── injectable detectors ───────────────────────────────────────────────────────

export interface Detectors {
  /** Per-evidence integrity signals. */
  integrity:   (e: ValidationEvidence) => Promise<IntegritySignal[]>;
  /** Maps evidence to Source-Hierarchy tier (1=system-of-record .. 5=self-attestation). */
  sourceTier:  (e: ValidationEvidence) => number;
  /** Perceptual/url/metric fingerprint for cross-submission dedup. null if not fingerprintable. */
  fingerprint: (e: ValidationEvidence) => Promise<string | null>;
  /** Fraud model: signals + behavior -> risk 0..100 with reasons. */
  fraudScore: (
    signals:       IntegritySignal[],
    minSourceTier: number,
    actualTier:    number,
    ctx:           BehavioralContext,
    dedupHit:      boolean,
  ) => Promise<{ risk: number; reasons: string[] }>;
}

// ── main worker ────────────────────────────────────────────────────────────────

export async function verifyEvidence(
  validationId: string,
  detectors:    Detectors,
): Promise<{ routing_tier: RoutingTier; risk_score: number; confidence_score: number }> {
  const sb  = createAdminClient();
  const now = () => new Date().toISOString();
  const provenance: ProvenanceEntry[] = [];

  const { data: v, error } = await sb
    .from('outcome_validations')
    .select('*')
    .eq('id', validationId)
    .single<DbOutcomeValidation>();
  if (error || !v) throw new Error(`validation ${validationId} not found`);

  const spec = await loadSpec(sb, v.mission_id, v.tenant_id);

  // ── stage 1: integrity signals + source tier ───────────────────────────────
  const evidence     = (v.evidence ?? []) as ValidationEvidence[];
  let   allSignals:  IntegritySignal[] = [];
  let   minTierSeen  = 5;

  for (const e of evidence) {
    const s = await detectors.integrity(e);
    allSignals    = allSignals.concat(s);
    minTierSeen   = Math.min(minTierSeen, detectors.sourceTier(e));
  }
  provenance.push({ stage: 'integrity', detail: `${allSignals.length} signals across ${evidence.length} items`, at: now() });

  // design-rule guard: evidence below the mission's required source tier is a hard fail
  const meetsDesign = minTierSeen <= spec.min_source_tier;
  if (!meetsDesign) {
    allSignals.push({ signal: 'source_tier_below_spec', value: 0, weight: 1, flag: 'fail' });
    provenance.push({ stage: 'design_guard', detail: `tier ${minTierSeen} > required ${spec.min_source_tier}`, at: now() });
  }

  // ── stage 1b: cross-submission dedup ──────────────────────────────────────
  let dedupHit = false;
  for (const e of evidence) {
    const fp = await detectors.fingerprint(e);
    if (!fp) continue;
    const hit = await recordFingerprint(sb, v.tenant_id, fp, e.type, v.id);
    if (hit) {
      dedupHit = true;
      allSignals.push({ signal: 'cross_submission_duplicate', value: 0, weight: 1, flag: 'fail' });
    }
  }
  if (dedupHit) provenance.push({ stage: 'dedup', detail: 'duplicate evidence fingerprint found', at: now() });

  // ── stage 2: fraud risk score ──────────────────────────────────────────────
  const ctx = await loadBehavioralContext(sb, v);
  const { risk, reasons } = await detectors.fraudScore(allSignals, spec.min_source_tier, minTierSeen, ctx, dedupHit);
  provenance.push({ stage: 'risk', detail: `risk=${risk} :: ${reasons.join('; ')}`, at: now() });

  // ── stage 3: tier routing ──────────────────────────────────────────────────
  let routing: RoutingTier;
  let status:  DbOutcomeValidation['status'];

  if (risk < spec.auto_approve_threshold && meetsDesign && !dedupHit) {
    routing = 'auto_approved';
    status  = 'approved';
  } else if (risk > spec.human_review_threshold) {
    const coordinated = ctx.collusionProximity > 0.6 || dedupHit;
    if (coordinated) {
      routing = 'escalated';
      status  = 'under_review';
    } else if (ctx.isNewcomer) {
      // newcomer-inclusion floor: route to human rather than auto-reject
      routing = 'human_review';
      status  = 'under_review';
    } else {
      routing = 'auto_rejected';
      status  = 'rejected';
    }
  } else {
    routing = 'human_review';
    status  = 'under_review';
  }
  provenance.push({ stage: 'routing', detail: `tier=${routing} status=${status}`, at: now() });

  // ── derive confidence: (1 - normalized risk) × source-tier adjustment ─────
  const tierAdj        = (6 - minTierSeen) / 5;  // tier1 -> 1.0, tier5 -> 0.2
  const confidence_score = Math.round((1 - risk / 100) * tierAdj * 100 * 100) / 100;

  // ── stage 4: persist verdict + provenance (append-only) ───────────────────
  const existingProvenance = Array.isArray(v.provenance) ? v.provenance as ProvenanceEntry[] : [];
  const { error: upErr } = await sb
    .from('outcome_validations')
    .update({
      status,
      routing_tier:          routing,
      risk_score:            risk,
      confidence_score,
      evidence_source_tier:  minTierSeen,
      integrity_signals:     allSignals,
      provenance:            [...existingProvenance, ...provenance],
      reviewed_at: (routing === 'auto_approved' || routing === 'auto_rejected') ? now() : null,
    })
    .eq('id', validationId);
  if (upErr) throw new Error(`persist failed: ${upErr.message}`);

  return { routing_tier: routing, risk_score: risk, confidence_score };
}

// ── helpers ────────────────────────────────────────────────────────────────────

async function loadSpec(
  sb:        ReturnType<typeof createAdminClient>,
  missionId: string | null,
  tenantId:  string,
): Promise<VerificationSpec> {
  if (missionId) {
    const { data } = await sb
      .from('mission_verification_specs')
      .select('required_evidence_types, min_source_tier, requires_peer_quorum, auto_approve_threshold, human_review_threshold')
      .eq('mission_id', missionId)
      .eq('tenant_id', tenantId)
      .maybeSingle();
    if (data) return data as VerificationSpec;
  }
  // conservative default when a mission has no spec
  return {
    required_evidence_types: [],
    min_source_tier:         4,
    requires_peer_quorum:    0,
    auto_approve_threshold:  30,
    human_review_threshold:  70,
  };
}

async function recordFingerprint(
  sb:           ReturnType<typeof createAdminClient>,
  tenantId:     string,
  fingerprint:  string,
  type:         string,
  validationId: string,
): Promise<boolean> {
  const { data: existing } = await sb
    .from('evidence_fingerprints')
    .select('id, seen_count')
    .eq('tenant_id', tenantId)
    .eq('fingerprint', fingerprint)
    .eq('evidence_type', type)
    .maybeSingle();

  if (existing) {
    await sb
      .from('evidence_fingerprints')
      .update({ seen_count: (existing as { id: string; seen_count: number }).seen_count + 1 })
      .eq('id', (existing as { id: string; seen_count: number }).id);
    return true;
  }

  await sb.from('evidence_fingerprints').insert({
    tenant_id:                tenantId,
    fingerprint,
    evidence_type:            type,
    first_seen_validation_id: validationId,
  });
  return false;
}

async function loadBehavioralContext(
  _sb: ReturnType<typeof createAdminClient>,
  _v:  DbOutcomeValidation,
): Promise<BehavioralContext> {
  // Skeleton: fill from event_spine / trust_graph in implementation.
  // Defaults are conservative: neutral risk, newcomer-protective.
  return {
    submissionsInWindow:      1,
    windowNorm:               1,
    deviceSharedAccountCount: 0,
    impossibleTravel:         false,
    collusionProximity:       0,
    participantStanding:      50,
    isNewcomer:               true,
  };
}
