import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await sb
    .from('user_profiles')
    .select('tenant_id, role')
    .eq('id', user.id)
    .single();
  if (!profile?.tenant_id) return NextResponse.json({ error: 'No tenant' }, { status: 403 });

  const allowedRoles = ['platform_admin', 'tenant_admin', 'analyst'];
  if (!allowedRoles.includes(profile.role)) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  const { data, error } = await sb
    .from('outcome_validations')
    .select('id, provenance, routing_tier, risk_score, confidence_score, evidence_source_tier, integrity_signals, status, reviewed_at')
    .eq('id', id)
    .eq('tenant_id', profile.tenant_id)
    .single();

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ provenance: data });
}
