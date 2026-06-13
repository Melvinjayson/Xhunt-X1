/**
 * Default (stub) detector implementations for the Verification Engine.
 *
 * Safe by default: missing signals fail rather than pass; tier-4/5 sources
 * get a 'warn' until real forensic work is swapped in. The Detectors contract
 * is stable — replace each function incrementally without touching the worker.
 *
 * Priority order for real implementations (highest leverage first):
 *   1. sourceTier + one tier-1 integration  (removes the most fraud per unit effort)
 *   2. fingerprint: perceptual hash for images (e.g. blockhash)
 *   3. integrity: EXIF sanity + geofence checks
 *   4. fraudScore: behavioral model + collusion proximity from trust graph
 *   5. integrity: AI-generation likelihood (low weight, never a sole verdict)
 */

import type { ValidationEvidence } from '@/lib/supabase/types';
import type { Detectors, IntegritySignal, BehavioralContext } from './verifyEvidence';

export function defaultSourceTier(e: ValidationEvidence): number {
  switch (e.type) {
    case 'certificate':  return 2; // verifiable issuer (upgrade to 1 once issuer API wired)
    case 'attestation':  return 3; // peer/manager confirmation
    case 'metric':       return 4;
    case 'url':          return 4;
    case 'screenshot':   return 4;
    case 'document':     return 4;
    default:             return 5;
  }
}

export const defaultDetectors: Detectors = {
  sourceTier: defaultSourceTier,

  async integrity(e: ValidationEvidence): Promise<IntegritySignal[]> {
    const tier = defaultSourceTier(e);
    const base: IntegritySignal = {
      signal: `presence_${e.type}`,
      value:  e.url || e.value ? 1 : 0,
      weight: 0.4,
      // tier 1–2 sources are trustworthy by construction; 4–5 get 'warn' until inspected
      flag:   e.url || e.value ? (tier <= 2 ? 'ok' : 'warn') : 'fail',
    };
    return [base];
  },

  async fingerprint(e: ValidationEvidence): Promise<string | null> {
    // stub: djb2-style hash of url/value. Replace with perceptual hash for images.
    const raw = e.url ?? e.value ?? null;
    if (!raw) return null;
    let h = 0;
    for (let i = 0; i < raw.length; i++) { h = (h * 31 + raw.charCodeAt(i)) | 0; }
    return `fp_${h >>> 0}`;
  },

  async fraudScore(
    signals:       IntegritySignal[],
    minSourceTier: number,
    actualTier:    number,
    ctx:           BehavioralContext,
    dedupHit:      boolean,
  ): Promise<{ risk: number; reasons: string[] }> {
    const reasons: string[] = [];
    let risk = 20; // neutral-low baseline

    if (dedupHit) {
      risk = 95;
      reasons.push('duplicate evidence across submissions');
    }
    if (actualTier > minSourceTier) {
      risk += 30;
      reasons.push(`source tier ${actualTier} below required ${minSourceTier}`);
    }
    if (signals.some(s => s.flag === 'fail')) {
      risk += 25;
      reasons.push('failed integrity signal');
    }
    if (signals.some(s => s.flag === 'warn')) {
      risk += 10;
      reasons.push('unverified participant-supplied evidence');
    }

    if (ctx.submissionsInWindow > ctx.windowNorm * 3) {
      risk += 20;
      reasons.push('submission velocity above norm');
    }
    if (ctx.deviceSharedAccountCount > 2) {
      risk += 25;
      reasons.push('device shared across accounts');
    }
    if (ctx.impossibleTravel) {
      risk += 30;
      reasons.push('impossible travel between submissions');
    }
    if (ctx.collusionProximity > 0.6) {
      risk += 25;
      reasons.push('high collusion proximity in trust graph');
    }

    // established standing lowers scrutiny; newcomers are scrutinized, not penalized
    if (!ctx.isNewcomer && ctx.participantStanding > 75) {
      risk -= 15;
      reasons.push('strong verified history');
    }

    risk = Math.max(0, Math.min(100, risk));
    if (reasons.length === 0) reasons.push('no risk indicators');
    return { risk, reasons };
  },
};
