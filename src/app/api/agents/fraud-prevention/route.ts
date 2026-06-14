import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { AGENT_SYSTEM_PROMPTS } from '@/lib/agents/prompts';
import type { FraudPreventionInput, FraudPreventionOutput } from '@/lib/agents/types';
import { requireTenantAgent } from '@/lib/agents/auth';

export async function POST(req: NextRequest) {
  const auth = await requireTenantAgent();
  if (!auth.ok) return auth.response;

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 });
  }

  const client = new Anthropic();

  let input: FraudPreventionInput;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { submission_id, mission_id, participant_id, evidence_type, evidence_payload } = input;
  if (!submission_id || !mission_id || !participant_id || !evidence_type || !evidence_payload) {
    return NextResponse.json({ error: 'Missing required fields: submission_id, mission_id, participant_id, evidence_type, evidence_payload' }, { status: 400 });
  }

  const userPrompt = `Assess this evidence submission for fraud risk.

Submission ID: ${submission_id}
Mission ID: ${mission_id}
Participant ID: ${participant_id}
Evidence Type: ${evidence_type}
Evidence Payload: ${JSON.stringify(evidence_payload, null, 2)}
Participant History: ${JSON.stringify(input.participant_history ?? 'not provided', null, 2)}
Co-participants: ${JSON.stringify(input.co_participants ?? [], null, 2)}

Apply C6: individual attribution must always be protected. Never paint an entire group fraudulent for one member's signal.
Assign risk_score 0–100. Set requires_human_review = true if risk_score > 70 or collusion detected.
Return valid JSON matching FraudPreventionOutput exactly. Raw JSON only.`;

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1536,
      system: AGENT_SYSTEM_PROMPTS['fraud-prevention'],
      messages: [{ role: 'user', content: userPrompt }],
    });

    const raw = (message.content[0] as { type: string; text: string }).text.trim();
    const jsonStart = raw.indexOf('{');
    const jsonEnd = raw.lastIndexOf('}');
    const output: FraudPreventionOutput = JSON.parse(raw.slice(jsonStart, jsonEnd + 1));
    return NextResponse.json(output);
  } catch (err) {
    console.error('[fraud-prevention]', err);
    return NextResponse.json({ error: 'Fraud assessment failed' }, { status: 500 });
  }
}
