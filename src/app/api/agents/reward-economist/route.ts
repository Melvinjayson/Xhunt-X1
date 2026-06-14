import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { AGENT_SYSTEM_PROMPTS } from '@/lib/agents/prompts';
import type { RewardEconomistInput, RewardEconomistOutput } from '@/lib/agents/types';
import { requireTenantAgent } from '@/lib/agents/auth';

export async function POST(req: NextRequest) {
  const auth = await requireTenantAgent();
  if (!auth.ok) return auth.response;

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 });
  }

  const client = new Anthropic();

  let input: RewardEconomistInput;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const {
    mission_id, mission_type, target_outcome,
    target_participant_count, budget_total, currency, completion_rate_estimate,
  } = input;

  if (!mission_id || !mission_type || !target_outcome || !target_participant_count || !budget_total || !currency) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const userPrompt = `Design the optimal reward structure for this mission.

Mission ID: ${mission_id}
Mission Type: ${mission_type}
Target Outcome: ${target_outcome}
Target Participants: ${target_participant_count}
Total Budget: ${budget_total} ${currency}
Estimated Completion Rate: ${completion_rate_estimate}%
Market Context: ${JSON.stringify(input.market_context ?? 'not provided', null, 2)}
Escrow Preference: ${JSON.stringify(input.escrow_conditions ?? 'recommend best fit', null, 2)}

Optimize for verified outcomes, not engagement. Never recommend paying for attempts.
Design escrow conditions that protect the organization's budget and participants' earned rewards.
Return valid JSON matching RewardEconomistOutput exactly. Raw JSON only.`;

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1536,
      system: AGENT_SYSTEM_PROMPTS['reward-economist'],
      messages: [{ role: 'user', content: userPrompt }],
    });

    const raw = (message.content[0] as { type: string; text: string }).text.trim();
    const jsonStart = raw.indexOf('{');
    const jsonEnd = raw.lastIndexOf('}');
    const output: RewardEconomistOutput = JSON.parse(raw.slice(jsonStart, jsonEnd + 1));
    return NextResponse.json(output);
  } catch (err) {
    console.error('[reward-economist]', err);
    return NextResponse.json({ error: 'Reward optimization failed' }, { status: 500 });
  }
}
