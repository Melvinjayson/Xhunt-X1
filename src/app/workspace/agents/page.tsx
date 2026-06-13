import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ── Agent registry ────────────────────────────────────────────────────────────

interface AgentEntry {
  id: string;
  name: string;
  category: "mission" | "intelligence" | "marketplace" | "governance" | "community" | "foundry";
  function: string;
  description: string;
  status: "active" | "building" | "planned";
  endpoint: string;
  ubuntuConstraints: string[];
}

const AGENTS: AgentEntry[] = [
  {
    id: "mission-architect",
    name: "Mission Architect",
    category: "mission",
    function: "Goals → executable mission systems",
    description: "Converts a natural-language organizational goal into a structured, verifiable, audience-appropriate mission blueprint with steps, verification criteria, and rationale.",
    status: "active",
    endpoint: "/api/agents/mission-architect",
    ubuntuConstraints: ["C2", "C3"],
  },
  {
    id: "outcome-planner",
    name: "Outcome Planner",
    category: "mission",
    function: "Goals → measurable KPIs and mission sequences",
    description: "Works backwards from desired organizational outcomes to define exactly what must happen, sequencing missions logically and surfacing risks before execution begins.",
    status: "active",
    endpoint: "/api/agents/outcome-planner",
    ubuntuConstraints: ["C1", "C2"],
  },
  {
    id: "experience-designer",
    name: "Experience Designer",
    category: "mission",
    function: "Engagement layer, narrative, motivation",
    description: "Reviews existing missions and optimises for emotional engagement, compelling language, narrative arc, and progressive difficulty. Never optimises for engagement itself.",
    status: "active",
    endpoint: "/api/agents/experience-designer",
    ubuntuConstraints: ["C3"],
  },
  {
    id: "behavioral-analyst",
    name: "Behavioral Analyst",
    category: "intelligence",
    function: "Dynamic adaptation from participant signals",
    description: "Analyses mission performance data to identify exactly where and why participants drop off, then produces specific, implementable recommendations with estimated lift.",
    status: "active",
    endpoint: "/api/agents/behavioral-analyst",
    ubuntuConstraints: ["C1", "C3"],
  },
  {
    id: "insight-analyst",
    name: "Insight Analyst",
    category: "intelligence",
    function: "MEI, impact intelligence, executive synthesis",
    description: "Turns mission analytics into strategic intelligence: MEI calculation, ROI narrative, key findings, opportunities, and prioritised actions for leadership.",
    status: "active",
    endpoint: "/api/agents/insight-analyst",
    ubuntuConstraints: ["C1", "C2"],
  },
  {
    id: "knowledge-agent",
    name: "Knowledge Agent",
    category: "intelligence",
    function: "Contextual knowledge surfacing and grounding",
    description: "Answers questions about mission strategy, outcome patterns, and best practices. Synthesises relationships between user types, missions, skills, and outcomes.",
    status: "active",
    endpoint: "/api/agents/knowledge-agent",
    ubuntuConstraints: [],
  },
  {
    id: "discovery-agent",
    name: "Discovery Agent",
    category: "marketplace",
    function: "Participant-facing opportunity discovery",
    description: "Recommends meaningful opportunities to participants based on skills, context, and history. Mandated to maximise diversity and never use FOMO or artificial scarcity.",
    status: "active",
    endpoint: "/api/agents/discovery-agent",
    ubuntuConstraints: ["C1", "C3"],
  },
  {
    id: "economy-coordinator",
    name: "Economy Coordinator",
    category: "marketplace",
    function: "Incentive optimisation, marketplace balance",
    description: "Synthesises identity, contribution, and trust signals into actionable intelligence. Coordinates human-AI work and identifies highest-value opportunities.",
    status: "active",
    endpoint: "/api/agents/economy-coordinator",
    ubuntuConstraints: ["C1", "C2", "C4"],
  },
  {
    id: "reward-economist",
    name: "Reward Economist",
    category: "marketplace",
    function: "Reward structure design, escrow conditions",
    description: "Optimises mission reward structures to achieve verified outcomes without over- or underpaying. Designs MEI-gated escrow conditions that protect both orgs and participants.",
    status: "active",
    endpoint: "/api/agents/reward-economist",
    ubuntuConstraints: ["C2"],
  },
  {
    id: "community-catalyst",
    name: "Community Catalyst",
    category: "community",
    function: "Community formation, trends, skill clusters",
    description: "Identifies collaboration opportunities, strengthens social capital, and creates conditions for collective flourishing. Reasons about communities as living systems, not segments.",
    status: "active",
    endpoint: "/api/agents/community-catalyst",
    ubuntuConstraints: ["C1", "C3"],
  },
  {
    id: "sustainability-navigator",
    name: "Sustainability Navigator",
    category: "mission",
    function: "Impact / ESG / SDG alignment",
    description: "Evaluates missions through long-term ecological and societal lenses. Evidence-informed, never aspirational. Flags greenwashing risk explicitly.",
    status: "active",
    endpoint: "/api/agents/sustainability-navigator",
    ubuntuConstraints: ["C1"],
  },
  {
    id: "trust-guardian",
    name: "Trust Guardian",
    category: "governance",
    function: "Constitutional + fraud + verification assessment",
    description: "The constitutional integrity agent. Applies the 7-question test, double materiality, anti-pattern detection, stakeholder mapping, and 10-year horizon thinking.",
    status: "active",
    endpoint: "/api/agents/trust-guardian",
    ubuntuConstraints: ["C4", "C5", "C6"],
  },
  {
    id: "fraud-prevention",
    name: "Fraud Prevention",
    category: "governance",
    function: "Risk-scoring every evidence submission",
    description: "Detects GPS spoofing, synthetic media, duplicate submissions, collusion, bot behaviour, and velocity attacks. Risk-scores 0–100. Always protects individual attribution (C6).",
    status: "active",
    endpoint: "/api/agents/fraud-prevention",
    ubuntuConstraints: ["C6"],
  },
  {
    id: "agent-foundry",
    name: "Agent Foundry",
    category: "foundry",
    function: "Construction and governance of new agents",
    description: "Meta-intelligence system responsible for designing, specifying, and governing new specialist agents. Applies the 11-step framework. Admin-only.",
    status: "active",
    endpoint: "/api/agents/agent-foundry",
    ubuntuConstraints: ["C2", "C4"],
  },
];

const COMPOUND_ROUTES = [
  {
    name: "Mission Creation",
    function: "mission-creation",
    chain: ["mission-architect", "outcome-planner", "trust-guardian", "reward-economist"],
    description: "Full mission lifecycle: design → KPIs → constitutional review → reward optimisation.",
  },
  {
    name: "Participant Matching",
    function: "participant-match",
    chain: ["discovery-agent", "economy-coordinator"],
    description: "Personal opportunity discovery with economic coordination for collective uplift.",
  },
  {
    name: "Impact Assessment",
    function: "impact-assessment",
    chain: ["insight-analyst", "sustainability-navigator"],
    description: "MEI synthesis with ESG/SDG alignment review.",
  },
  {
    name: "Integrity Review",
    function: "integrity-review",
    chain: ["trust-guardian", "fraud-prevention"],
    description: "Constitutional gate + fraud risk-scoring for high-stakes decisions.",
  },
];

const CATEGORY_COLORS: Record<AgentEntry["category"], string> = {
  mission:      "bg-primary/10 text-primary border-primary/20",
  intelligence: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  marketplace:  "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  community:    "bg-green-500/10 text-green-400 border-green-500/20",
  governance:   "bg-red-500/10 text-red-400 border-red-500/20",
  foundry:      "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const CONSTRAINT_LABELS: Record<string, string> = {
  C1: "Collective uplift",
  C2: "Attribution floor",
  C3: "Newcomer inclusion",
  C4: "Anti-collusion",
  C5: "Propagation decay",
  C6: "Credit attribution",
};

function StatusBadge({ status }: { status: AgentEntry["status"] }) {
  if (status === "active")   return <Badge className="gap-1 text-[9px] bg-primary/10 text-primary border-primary/20"><CheckCircle2 className="size-2" />Active</Badge>;
  if (status === "building") return <Badge variant="outline" className="gap-1 text-[9px] text-warning border-warning/40"><Clock className="size-2" />Building</Badge>;
  return <Badge variant="secondary" className="text-[9px]">Planned</Badge>;
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AgentHubPage() {
  const byCategory = AGENTS.reduce<Record<string, AgentEntry[]>>((acc, a) => {
    (acc[a.category] ??= []).push(a);
    return acc;
  }, {});

  return (
    <WorkspaceShell
      title="Agent Hub"
      subtitle="XIL intelligence layer — 14 specialist agents coordinated by the orchestrator."
    >
      <div className="grid gap-8">

        {/* Constitution summary */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-start gap-4 pt-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <div className="flex-1 grid gap-3">
              <div>
                <div className="text-sm font-semibold mb-1">Constitutional principles — always enforced</div>
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {[
                    "Human agency takes precedence over optimisation objectives",
                    "Neither financial nor impact materiality may be ignored",
                    "Recommendations must be relevant, explainable, fair, and beneficial",
                    "Fairness means maximising opportunity, not reinforcing advantages",
                    "Trust is the platform's most valuable asset — protect it absolutely",
                    "Engage for value creation, never engagement itself",
                  ].map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="size-3 text-primary shrink-0 mt-0.5" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <div className="text-xs font-medium mb-1.5">Ubuntu constraints (C1–C6) applied at stage 4</div>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(CONSTRAINT_LABELS).map(([k, v]) => (
                    <Badge key={k} variant="outline" className="text-[10px] gap-1">
                      <span className="font-mono text-primary">{k}</span> {v}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compound routes */}
        <div>
          <h2 className="text-sm font-semibold mb-1">Compound orchestration routes</h2>
          <p className="text-xs text-muted-foreground mb-3">Sequential agent chains for complex requests. Each agent's output enriches the next.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {COMPOUND_ROUTES.map((r) => (
              <div key={r.function} className="rounded-xl border bg-card/50 p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="text-sm font-medium">{r.name}</div>
                  <Badge variant="outline" className="text-[10px] font-mono shrink-0">{r.function}</Badge>
                </div>
                <div className="text-[11px] text-muted-foreground mb-3">{r.description}</div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {r.chain.map((id, i) => (
                    <span key={id} className="flex items-center gap-1">
                      <span className="text-[10px] font-mono bg-secondary px-1.5 py-0.5 rounded">{id}</span>
                      {i < r.chain.length - 1 && <span className="text-muted-foreground text-[10px]">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agents by category */}
        {(["mission", "intelligence", "marketplace", "community", "governance", "foundry"] as AgentEntry["category"][]).map((category) => (
          <div key={category}>
            <h2 className="text-sm font-semibold capitalize mb-1">{category}</h2>
            <Separator className="mb-3" />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {(byCategory[category] ?? []).map((agent) => (
                <Card key={agent.id} className="flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={`text-[9px] ${CATEGORY_COLORS[category]}`}>{category}</Badge>
                          <StatusBadge status={agent.status} />
                        </div>
                        <CardTitle className="text-sm leading-snug">{agent.name}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-xs">{agent.function}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 grid gap-3 pt-0">
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{agent.description}</p>
                    {agent.ubuntuConstraints.length > 0 && (
                      <div className="flex gap-1.5 flex-wrap">
                        {agent.ubuntuConstraints.map(c => (
                          <Badge key={c} variant="outline" className="text-[9px] font-mono gap-1">
                            <Zap className="size-2" />{c}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2 pt-1">
                      <code className="text-[10px] text-muted-foreground flex-1 truncate">{agent.endpoint}</code>
                      <Link
                        href={`${agent.endpoint}?_method=GET`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        target="_blank"
                      >
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* XIL health link */}
        <Card className="border-dashed">
          <CardContent className="flex items-center justify-between gap-4 py-5">
            <div className="flex items-center gap-3">
              <Sparkles className="size-5 text-primary" />
              <div>
                <div className="text-sm font-medium">XIL ecosystem health</div>
                <div className="text-xs text-muted-foreground">Constitutional approval rates, routing metrics, agent evaluations.</div>
              </div>
            </div>
            <Button render={<Link href="/api/xil?view=health" target="_blank" />} variant="outline" size="sm" className="gap-1.5 shrink-0">
              View health <ArrowUpRight className="size-3" />
            </Button>
          </CardContent>
        </Card>

      </div>
    </WorkspaceShell>
  );
}
