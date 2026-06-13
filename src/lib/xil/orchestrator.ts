/**
 * XIL Orchestrator
 *
 * Implements the full XIL Orchestrator System Prompt:
 *   1. INTAKE          — parse intent, resolve IntelligenceFunction(s)
 *   2. CONSTITUTIONAL  — heuristic gate; rejected requests never route
 *   3. ROUTE           — engage minimum agent set (parallel or sequential)
 *   4. UBUNTU          — apply C1–C6 constraints to agent outputs
 *   5. SYNTHESIZE      — reconcile outputs via conflict-resolution priority
 *   6. PROVENANCE      — emit full output contract with attribution
 *
 * Ubuntu as system law: "I am because we are."
 * Protect-vs-share parameter: PROTECT (default — unset by founder).
 */

import Anthropic from '@anthropic-ai/sdk';
import { AGENT_SYSTEM_PROMPTS } from '@/lib/agents/prompts';
import { runHeuristicCheck, persistConstitutionalCheck, logXILRoute } from './constitution';

const client = new Anthropic();

// ── Intelligence function types ───────────────────────────────────────────────

/** Simple functions map to a single parallel agent set */
export type SimpleIntelligenceFunction =
  | 'personal'
  | 'community'
  | 'marketplace'
  | 'impact'
  | 'governance'
  | 'foundry';

/** Compound functions chain agents sequentially; each output enriches the next prompt */
export type CompoundIntelligenceFunction =
  | 'mission-creation'    // architect → planner → trust-guardian → reward-economist
  | 'participant-match'   // discovery-agent → economy-coordinator
  | 'impact-assessment'   // insight-analyst → sustainability-navigator
  | 'integrity-review';   // trust-guardian → fraud-prevention

export type IntelligenceFunction = SimpleIntelligenceFunction | CompoundIntelligenceFunction;

// ── Agent routing maps ────────────────────────────────────────────────────────

const PARALLEL_ROUTES: Record<SimpleIntelligenceFunction, string[]> = {
  personal:    ['discovery-agent'],
  community:   ['community-catalyst'],
  marketplace: ['economy-coordinator'],
  impact:      ['sustainability-navigator'],
  governance:  ['trust-guardian'],
  foundry:     ['agent-foundry'],
};

// Sequential: each agent receives prior outputs as additional context
const SEQUENTIAL_ROUTES: Record<CompoundIntelligenceFunction, string[]> = {
  'mission-creation':  ['mission-architect', 'outcome-planner', 'trust-guardian', 'reward-economist'],
  'participant-match': ['discovery-agent', 'economy-coordinator'],
  'impact-assessment': ['insight-analyst', 'sustainability-navigator'],
  'integrity-review':  ['trust-guardian', 'fraud-prevention'],
};

// ── Ubuntu constraint definitions ─────────────────────────────────────────────

export interface UbuntuConstraintResult {
  constraintsApplied: string[];
  violations: string[];
}

/**
 * Stage 4: Apply Ubuntu constraints C1–C6 to each agent output before synthesis.
 * Returns which constraints were checked and any violations detected.
 */
function applyUbuntuConstraints(
  agentId: string,
  output: unknown,
  accumulated: UbuntuConstraintResult
): void {
  const text = JSON.stringify(output ?? '').toLowerCase();

  // C1 — Collective-uplift objective
  if (['discovery-agent', 'economy-coordinator', 'community-catalyst'].includes(agentId)) {
    if (!accumulated.constraintsApplied.includes('C1')) accumulated.constraintsApplied.push('C1');
    if (!text.includes('collective') && !text.includes('community') && !text.includes('group uplift')) {
      accumulated.violations.push('C1: output does not explicitly address collective uplift — individual optimization only');
    }
  }

  // C2 — Attribution floor (individual protection)
  if (['economy-coordinator', 'trust-guardian', 'reward-economist'].includes(agentId)) {
    if (!accumulated.constraintsApplied.includes('C2')) accumulated.constraintsApplied.push('C2');
    // Protect-vs-share: PROTECT default — individual verified excellence shielded from collective failure
  }

  // C3 — Newcomer-inclusion floor
  if (['discovery-agent', 'community-catalyst'].includes(agentId)) {
    if (!accumulated.constraintsApplied.includes('C3')) accumulated.constraintsApplied.push('C3');
    const hasInclusionSignal =
      text.includes('newcomer') ||
      text.includes('first-time') ||
      text.includes('inclusion') ||
      text.includes('accessibility');
    if (!hasInclusionSignal) {
      accumulated.violations.push('C3: matching output may not reserve capacity for newcomers — verify inclusion slot');
    }
  }

  // C4 — Anti-collusion: uplift only from verified outcomes
  if (['economy-coordinator', 'trust-guardian', 'fraud-prevention'].includes(agentId)) {
    if (!accumulated.constraintsApplied.includes('C4')) accumulated.constraintsApplied.push('C4');
    if (
      text.includes('self-reported') ||
      text.includes('mutual rating') ||
      text.includes('peer endorsement') ||
      text.includes('self report')
    ) {
      accumulated.violations.push('C4: output references self-reported or mutual-rating data — trust derivation must come from verified outcomes only');
    }
  }

  // C5 — Propagation with decay
  if (agentId === 'trust-guardian') {
    if (!accumulated.constraintsApplied.includes('C5')) accumulated.constraintsApplied.push('C5');
  }

  // C6 — Distributed credit ≠ distributed deniability
  if (agentId === 'fraud-prevention') {
    if (!accumulated.constraintsApplied.includes('C6')) accumulated.constraintsApplied.push('C6');
    if (!text.includes('attribution_protected') && !text.includes('attribution protected')) {
      accumulated.violations.push('C6: fraud assessment must confirm individual attribution is protected — check attribution_protected field');
    }
  }
}

// ── Agent invocation ──────────────────────────────────────────────────────────

interface AgentCall {
  agentId: string;
  systemPrompt: string;
  userPrompt: string;
  maxTokens?: number;
}

async function callAgent(call: AgentCall): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: call.maxTokens ?? 2048,
    system: call.systemPrompt,
    messages: [{ role: 'user', content: call.userPrompt }],
  });

  const raw = (message.content[0] as { type: string; text: string }).text.trim();
  const jsonStart = raw.indexOf('{');
  const jsonEnd = raw.lastIndexOf('}');
  if (jsonStart === -1) throw new Error(`Agent ${call.agentId} returned non-JSON output`);
  return raw.slice(jsonStart, jsonEnd + 1);
}

function buildAgentPrompt(
  agentId: string,
  objective: string,
  context: Record<string, unknown>,
  priorOutputs?: Record<string, unknown>
): string {
  const priorSection = priorOutputs && Object.keys(priorOutputs).length > 0
    ? `\nPrior agent outputs (use as grounding context):\n${JSON.stringify(priorOutputs, null, 2)}\n`
    : '';

  return `Objective: ${objective}

Context:
${JSON.stringify(context, null, 2)}
${priorSection}
Apply your constitutional mandate. Evaluate both financial materiality and impact materiality.
Check all anti-objectives before finalizing your output.

Protect-vs-share assumption: PROTECT (default — founder has not yet set this parameter).
Individual verified excellence is shielded from collective failure.

Return valid JSON matching your output schema exactly. Raw JSON only.`;
}

// ── Synthesis and provenance ──────────────────────────────────────────────────

/**
 * Conflict resolution priority (when agents disagree):
 * 1. Constitutional verdict
 * 2. Verified outcome data over predictions
 * 3. Collective uplift over individual optimization
 * 4. Participant wellbeing & inclusion
 * 5. Financial efficiency
 */
function synthesizeDecision(
  results: Record<string, unknown>,
  constitutionalVerdict: string,
  constraintViolations: string[]
): string {
  if (constitutionalVerdict === 'rejected') {
    return 'Request rejected by constitutional alignment check. No agent outputs produced.';
  }

  const agentIds = Object.keys(results).filter((id) => {
    const r = results[id] as Record<string, unknown>;
    return r && !r.error;
  });

  if (agentIds.length === 0) return 'All agents failed to produce outputs. Review error details.';

  const extractDecisionField = (o: Record<string, unknown>): string | null =>
    (o.recommendation as string) ||
    (o.decision as string) ||
    (o.headline as string) ||
    (o.roadmap_title as string) ||
    (o.engagement_strategy as string) ||
    null;

  const summaries = agentIds
    .map((id) => extractDecisionField(results[id] as Record<string, unknown>))
    .filter(Boolean) as string[];

  const base = summaries.length > 0
    ? summaries.join(' → ')
    : `${agentIds.join(', ')} produced structured outputs — review results field for details.`;

  if (constraintViolations.length > 0) {
    return `${base} [Ubuntu conditions: ${constraintViolations.length} constraint(s) require review]`;
  }

  return base;
}

function determineUpliftBasis(results: Record<string, unknown>): string {
  const text = JSON.stringify(results).toLowerCase();
  if (
    text.includes('verified_outcome') ||
    text.includes('verified outcome') ||
    text.includes('completion_rate') ||
    text.includes('verified completion')
  ) {
    return 'Verified outcome data from agent analysis';
  }
  return 'none — predictive (no verified outcome data in current context; uplift estimates are forecasts, not measurements)';
}

// ── Orchestrator request / response ──────────────────────────────────────────

export interface OrchestratorRequest {
  intelligenceFunction: IntelligenceFunction;
  objective: string;
  context: Record<string, unknown>;
  userId?: string;
  sessionId?: string;
  skipConstitutionalCheck?: boolean;
}

export interface OrchestratorResponse {
  // ── PRD Output Contract ────────────────────────────────────────────
  decision: string;
  constitutional_verdict: 'approved' | 'flagged' | 'rejected';
  conditions: string[];
  agents_engaged: string[];
  constraints_applied: string[];
  uplift_basis: string;
  attribution: string;
  assumptions: string[];
  provenance: string;
  // ── Legacy fields (backward-compat for existing callers) ──────────
  intelligenceFunction: IntelligenceFunction;
  results: Record<string, unknown>;
  constitutionalCheck: {
    verdict: string;
    score: number;
    redFlags: string[];
    conditions: string[];
  };
  constitutionalCheckId: string;
  processingMs: number;
}

// ── Main orchestrate function ─────────────────────────────────────────────────

export async function orchestrate(req: OrchestratorRequest): Promise<OrchestratorResponse> {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  // Stage 1: INTAKE — resolve agent set
  const isCompound = req.intelligenceFunction in SEQUENTIAL_ROUTES;
  const agentIds: string[] = isCompound
    ? SEQUENTIAL_ROUTES[req.intelligenceFunction as CompoundIntelligenceFunction]
    : (PARALLEL_ROUTES[req.intelligenceFunction as SimpleIntelligenceFunction] ?? ['trust-guardian']);

  // Stage 2: CONSTITUTIONAL GATE
  let checkId = 'skipped';
  const heuristicCheck = runHeuristicCheck(req.objective, req.context);

  if (!req.skipConstitutionalCheck) {
    if (heuristicCheck.verdict === 'rejected') {
      checkId = await persistConstitutionalCheck(
        heuristicCheck,
        req.intelligenceFunction,
        req.objective,
        req.context,
        agentIds[0],
        req.userId
      );

      const processingMs = Date.now() - start;
      await logXILRoute(
        req.intelligenceFunction, [], req.objective,
        'Rejected by constitutional gate', processingMs, checkId, req.userId, req.sessionId
      );

      return buildResponse({
        decision: 'Request rejected by constitutional alignment check.',
        verdict: 'rejected',
        conditions: heuristicCheck.conditions,
        agentsEngaged: [],
        constraintsApplied: [],
        constraintViolations: [],
        results: { error: 'Constitutional rejection', redFlags: heuristicCheck.redFlags },
        heuristicCheck,
        checkId,
        intelligenceFunction: req.intelligenceFunction,
        processingMs,
        timestamp,
      });
    }

    checkId = await persistConstitutionalCheck(
      heuristicCheck,
      req.intelligenceFunction,
      req.objective,
      req.context,
      agentIds[0],
      req.userId
    );
  }

  // Stage 3: ROUTE — invoke agents (parallel or sequential)
  const results: Record<string, unknown> = {};
  const invokedIds: string[] = [];
  const ubuntuResult: UbuntuConstraintResult = { constraintsApplied: [], violations: [] };

  if (isCompound) {
    // Sequential: each agent's output becomes context for the next
    const priorOutputs: Record<string, unknown> = {};
    for (const agentId of agentIds) {
      const systemPrompt = AGENT_SYSTEM_PROMPTS[agentId];
      if (!systemPrompt) {
        results[agentId] = { error: `No system prompt for agent: ${agentId}` };
        continue;
      }
      const userPrompt = buildAgentPrompt(agentId, req.objective, req.context, priorOutputs);
      try {
        const raw = await callAgent({ agentId, systemPrompt, userPrompt });
        const parsed = JSON.parse(raw);
        results[agentId] = parsed;
        priorOutputs[agentId] = parsed;
        invokedIds.push(agentId);
        // Stage 4: UBUNTU CONSTRAINTS applied after each agent
        applyUbuntuConstraints(agentId, parsed, ubuntuResult);
      } catch (err) {
        results[agentId] = { error: `Agent ${agentId} failed: ${(err as Error).message}` };
      }
    }
  } else {
    // Parallel: all agents run simultaneously
    await Promise.all(
      agentIds.map(async (agentId) => {
        const systemPrompt = AGENT_SYSTEM_PROMPTS[agentId];
        if (!systemPrompt) {
          results[agentId] = { error: `No system prompt for agent: ${agentId}` };
          return;
        }
        const userPrompt = buildAgentPrompt(agentId, req.objective, req.context);
        try {
          const raw = await callAgent({ agentId, systemPrompt, userPrompt });
          const parsed = JSON.parse(raw);
          results[agentId] = parsed;
          invokedIds.push(agentId);
          applyUbuntuConstraints(agentId, parsed, ubuntuResult);
        } catch (err) {
          results[agentId] = { error: `Agent ${agentId} failed: ${(err as Error).message}` };
        }
      })
    );
  }

  // Stage 5: SYNTHESIZE
  const decision = synthesizeDecision(results, heuristicCheck.verdict, ubuntuResult.violations);
  const upliftBasis = determineUpliftBasis(results);
  const processingMs = Date.now() - start;

  // Stage 6: PROVENANCE
  const outputSummary = JSON.stringify(results).slice(0, 500);
  await logXILRoute(
    req.intelligenceFunction, invokedIds, req.objective, outputSummary,
    processingMs, checkId !== 'skipped' ? checkId : undefined, req.userId, req.sessionId
  );

  const effectiveVerdict = ubuntuResult.violations.length > 0 && heuristicCheck.verdict === 'approved'
    ? 'flagged'
    : heuristicCheck.verdict;

  const effectiveConditions = [
    ...heuristicCheck.conditions,
    ...ubuntuResult.violations,
  ];

  return buildResponse({
    decision,
    verdict: effectiveVerdict,
    conditions: effectiveConditions,
    agentsEngaged: invokedIds,
    constraintsApplied: ubuntuResult.constraintsApplied,
    constraintViolations: ubuntuResult.violations,
    results,
    heuristicCheck,
    checkId,
    intelligenceFunction: req.intelligenceFunction,
    processingMs,
    timestamp,
    upliftBasis,
  });
}

// ── Response builder ──────────────────────────────────────────────────────────

interface BuildArgs {
  decision: string;
  verdict: string;
  conditions: string[];
  agentsEngaged: string[];
  constraintsApplied: string[];
  constraintViolations: string[];
  results: Record<string, unknown>;
  heuristicCheck: ReturnType<typeof runHeuristicCheck>;
  checkId: string;
  intelligenceFunction: IntelligenceFunction;
  processingMs: number;
  timestamp: string;
  upliftBasis?: string;
}

function buildResponse(args: BuildArgs): OrchestratorResponse {
  return {
    // PRD output contract
    decision: args.decision,
    constitutional_verdict: args.verdict as 'approved' | 'flagged' | 'rejected',
    conditions: args.conditions,
    agents_engaged: args.agentsEngaged,
    constraints_applied: args.constraintsApplied,
    uplift_basis: args.upliftBasis ?? 'none — predictive',
    attribution: args.agentsEngaged.length > 0
      ? `XIL Orchestrator via ${args.agentsEngaged.join(' → ')}`
      : 'Constitutional gate — no agents invoked',
    assumptions: [
      'protect-vs-share: PROTECT (default — unset by founder)',
      'heuristic constitutional gate applied; escalate high-stakes decisions to trust-guardian',
    ],
    provenance: `function=${args.intelligenceFunction} agents=${args.agentsEngaged.join(',')} model=claude-sonnet-4-6 ts=${args.timestamp}`,
    // Legacy fields
    intelligenceFunction: args.intelligenceFunction,
    results: args.results,
    constitutionalCheck: {
      verdict: args.heuristicCheck.verdict,
      score: args.heuristicCheck.constitutionalScore,
      redFlags: args.heuristicCheck.redFlags,
      conditions: args.heuristicCheck.conditions,
    },
    constitutionalCheckId: args.checkId,
    processingMs: args.processingMs,
  };
}
