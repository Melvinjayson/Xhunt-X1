import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { DbMission } from '@/lib/supabase/types';

// Rule-based tier derivation for v1.
// Replace with the AI Verification Engine (DESIGN mode) when the LLM agent is wired.
function deriveMinTier(mission: DbMission): number {
  // Hard missions with explicit rewards need at least peer validation
  if (mission.difficulty === 'hard') return 3;
  // Easy/medium missions default to participant-supplied artifacts with inspection
  return 4;
}

function deriveFrictionEstimate(tier: number): 'low' | 'medium' | 'high' {
  if (tier <= 2) return 'high';
  if (tier === 3) return 'medium';
  return 'low';
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: missionId } = await params;
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await sb
    .from('user_profiles')
    .select('tenant_id, role')
    .eq('id', user.id)
    .single();
  if (!profile?.tenant_id) return NextResponse.json({ error: 'No tenant' }, { status: 403 });

  const allowedRoles = ['platform_admin', 'tenant_admin', 'mission_creator'];
  if (!allowedRoles.includes(profile.role)) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  const { data: mission, error: mErr } = await sb
    .from('missions')
    .select('id, title, difficulty, reward, tags')
    .eq('id', missionId)
    .eq('tenant_id', profile.tenant_id)
    .single<DbMission>();
  if (mErr || !mission) return NextResponse.json({ error: 'Mission not found' }, { status: 404 });

  // Accept optional caller-supplied overrides; defaults are rule-derived
  const body = await req.json().catch(() => ({})) as {
    min_source_tier?: number;
    required_evidence_types?: string[];
    requires_peer_quorum?: number;
    auto_approve_threshold?: number;
    human_review_threshold?: number;
  };

  const minTier         = body.min_source_tier ?? deriveMinTier(mission);
  const frictionEst     = deriveFrictionEstimate(minTier);
  const residualRisk    = minTier >= 4
    ? 'Participant-supplied artifacts are inspectable but not structurally unfakeable. Forensic signals lower but do not eliminate residual risk.'
    : 'Peer/manager attestation reduces fraud risk but does not eliminate collusion between known parties.';

  const rationale = `Rule-based v1 derivation: difficulty=${mission.difficulty}, min_source_tier=${minTier}. ` +
    `Upgrade to AI Verification Engine (DESIGN mode) for outcome-specific evidence selection.`;

  const admin = createAdminClient();
  const { data: spec, error: upsertErr } = await admin
    .from('mission_verification_specs')
    .upsert(
      {
        tenant_id:               profile.tenant_id,
        mission_id:              missionId,
        required_evidence_types: body.required_evidence_types ?? [],
        min_source_tier:         minTier,
        requires_peer_quorum:    body.requires_peer_quorum ?? (minTier <= 3 ? 1 : 0),
        auto_approve_threshold:  body.auto_approve_threshold ?? 30,
        human_review_threshold:  body.human_review_threshold ?? 70,
        friction_estimate:       frictionEst,
        residual_risk:           residualRisk,
        rationale,
      },
      { onConflict: 'mission_id' },
    )
    .select()
    .single();

  if (upsertErr) return NextResponse.json({ error: upsertErr.message }, { status: 500 });

  return NextResponse.json({ spec }, { status: 201 });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: missionId } = await params;
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await sb
    .from('user_profiles')
    .select('tenant_id')
    .eq('id', user.id)
    .single();
  if (!profile?.tenant_id) return NextResponse.json({ error: 'No tenant' }, { status: 403 });

  const { data, error } = await sb
    .from('mission_verification_specs')
    .select('*')
    .eq('mission_id', missionId)
    .eq('tenant_id', profile.tenant_id)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data)  return NextResponse.json({ spec: null }, { status: 200 });

  return NextResponse.json({ spec: data });
}
