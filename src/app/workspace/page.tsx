import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bot,
  CheckCircle2,
  Clock,
  DollarSign,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ── Mock executive data ───────────────────────────────────────────────────────

const meiMetrics = [
  { label: "Completion weight", value: "40%", score: 78, note: "617 of 1,240 target outcomes verified" },
  { label: "Engagement depth",  value: "25%", score: 84, note: "Avg 3.2 steps completed per participant" },
  { label: "Retention",         value: "20%", score: 71, note: "58% returned for a second mission" },
  { label: "Outcome quality",   value: "15%", score: 91, note: "91% of proofs passed verification" },
];

const meiOverall = Math.round(
  meiMetrics[0].score * 0.40 +
  meiMetrics[1].score * 0.25 +
  meiMetrics[2].score * 0.20 +
  meiMetrics[3].score * 0.15
);

const activeMissions = [
  {
    name: "Graduate Skills Accelerator",
    type: "workforce",
    status: "active",
    participants: 312,
    verified: 248,
    budget: "£18,400",
    escrow: "locked",
    mei: 82,
    due: "12 Jul 2026",
  },
  {
    name: "Campus Carbon Reduction Sprint",
    type: "sustainability",
    status: "active",
    participants: 541,
    verified: 389,
    budget: "£9,800",
    escrow: "partial",
    mei: 71,
    due: "30 Jun 2026",
  },
  {
    name: "Research Participant Pool",
    type: "research",
    status: "review",
    participants: 84,
    verified: 61,
    budget: "£4,200",
    escrow: "locked",
    mei: 88,
    due: "20 Jun 2026",
  },
];

const verificationFunnel = [
  { label: "Submissions received",  count: 1847, pct: 100,  color: "bg-primary/20"  },
  { label: "Passed initial check",  count: 1712, pct: 92.7, color: "bg-primary/40"  },
  { label: "Verified by agent",     count: 1601, pct: 86.7, color: "bg-primary/60"  },
  { label: "Fraud-flagged",         count:   46, pct:  2.5, color: "bg-warning/60"  },
  { label: "Rewarded",             count: 1555, pct: 84.2, color: "bg-primary"      },
];

const aiRecommendations = [
  {
    agent: "insight-analyst",
    headline: "Completion rate will fall 12% if deadline holds",
    detail: "Graduate Skills Accelerator has 64 participants at step 3 with 8 days remaining. Recommend extending by 5 days or adding a peer-support nudge.",
    priority: "high",
  },
  {
    agent: "reward-economist",
    headline: "Sustainability mission is over-incentivised",
    detail: "Campus Carbon mission avg reward is 2.4× market rate for equivalent effort. Recommend reducing per-completion award from £18 to £11 and reallocating surplus to buffer reserve.",
    priority: "medium",
  },
  {
    agent: "fraud-prevention",
    headline: "3 submissions flagged for GPS inconsistency",
    detail: "Research mission submissions from participant IDs rp-0041, rp-0079, rp-0112 show location data inconsistent with stated context. Human review required before reward release.",
    priority: "high",
  },
];

const trustMetrics = [
  { label: "Platform trust density",  value: "87.4",  unit: "/100", trend: "+2.1 this week"    },
  { label: "Verification rate",       value: "86.7",  unit: "%",    trend: "+0.8% vs last week" },
  { label: "Fraud catch rate",        value: "97.5",  unit: "%",    trend: "< 2% leaked target" },
  { label: "Cost per verified outcome", value: "£11.82", unit: "",  trend: "↓ £0.74 this cohort" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function MeiBar({ score }: { score: number }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${score}%` }} />
    </div>
  );
}

function EscrowBadge({ status }: { status: string }) {
  if (status === "locked")  return <Badge className="text-[10px] gap-1 bg-primary/15 text-primary border-primary/30"><ShieldCheck className="size-2.5" /> Locked</Badge>;
  if (status === "partial") return <Badge variant="outline" className="text-[10px] gap-1 text-warning border-warning/40"><Clock className="size-2.5" /> Partial</Badge>;
  return <Badge variant="secondary" className="text-[10px]">{status}</Badge>;
}

function PriorityDot({ priority }: { priority: string }) {
  if (priority === "high")   return <span className="size-2 rounded-full bg-destructive shrink-0 mt-1.5" />;
  if (priority === "medium") return <span className="size-2 rounded-full bg-warning shrink-0 mt-1.5" />;
  return <span className="size-2 rounded-full bg-primary shrink-0 mt-1.5" />;
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ExecutiveDashboard() {
  return (
    <WorkspaceShell
      title="Executive Dashboard"
      subtitle="Verified outcomes · MEI · Trust · Escrow"
      actions={
        <Button render={<Link href="/workspace/missions/new" />} size="sm" className="gap-1.5">
          <Zap className="size-3.5" /> New mission
        </Button>
      }
    >
      <div className="grid gap-6">

        {/* MEI overview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {meiMetrics.map(({ label, score, note, value }) => (
            <Card key={label} className="@container/card">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs">{label}</CardDescription>
                <CardTitle className="text-3xl font-semibold tabular-nums">{score}</CardTitle>
                <CardAction>
                  <Badge variant="outline" className="text-[10px] text-muted-foreground">{value}</Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="pt-0 pb-3 flex-col items-start gap-1.5">
                <MeiBar score={score} />
                <span className="text-[10px] text-muted-foreground">{note}</span>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* MEI composite + trust metrics */}
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="mb-3 gap-1 w-fit"><TrendingUp className="size-3" /> Mission Effectiveness Index</Badge>
                  <CardTitle className="text-5xl font-semibold tabular-nums">{meiOverall}<span className="text-2xl text-muted-foreground">/100</span></CardTitle>
                  <CardDescription className="mt-1">Composite across 3 active missions · 40/25/20/15 weight</CardDescription>
                </div>
                <Badge variant="outline" className="text-primary border-primary/30 gap-1 shrink-0">
                  <ArrowUpRight className="size-3" /> +4.2 vs last month
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="rounded-xl border bg-card/50 p-4 grid gap-3">
                <div className="text-xs font-medium text-muted-foreground">MEI weight breakdown</div>
                {meiMetrics.map(({ label, score, value }) => (
                  <div key={label} className="grid gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>{label} <span className="text-muted-foreground">({value})</span></span>
                      <span className="font-semibold tabular-nums">{score}</span>
                    </div>
                    <MeiBar score={score} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Badge className="mb-3 gap-1 w-fit bg-primary/10 text-primary border-primary/20">
                <ShieldCheck className="size-3" /> Trust & integrity
              </Badge>
              <CardTitle>Platform trust metrics</CardTitle>
              <CardDescription>Verified outcomes, fraud catch rate, and cost efficiency.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {trustMetrics.map(({ label, value, unit, trend }) => (
                <div key={label} className="flex items-center justify-between rounded-lg border bg-card/50 p-3">
                  <div>
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{trend}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold tabular-nums">{value}</span>
                    <span className="text-xs text-muted-foreground">{unit}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Active missions table */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>Active missions</CardTitle>
                <CardDescription>Live participation, verification status, and escrow.</CardDescription>
              </div>
              <Button render={<Link href="/workspace/missions" />} variant="outline" size="sm" className="gap-1 shrink-0">
                All missions <ArrowRight className="size-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            {activeMissions.map((m) => (
              <div key={m.name} className="rounded-xl border bg-card/50 p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-[10px]">{m.type}</Badge>
                      <EscrowBadge status={m.escrow} />
                    </div>
                    <div className="text-sm font-semibold truncate">{m.name}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Due {m.due}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-semibold tabular-nums">{m.mei}</div>
                    <div className="text-[10px] text-muted-foreground">MEI</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="rounded-lg bg-secondary/50 p-2">
                    <div className="font-semibold tabular-nums">{m.participants}</div>
                    <div className="text-muted-foreground">Participants</div>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-2">
                    <div className="font-semibold tabular-nums text-primary">{m.verified}</div>
                    <div className="text-muted-foreground">Verified</div>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-2">
                    <div className="font-semibold tabular-nums">{m.budget}</div>
                    <div className="text-muted-foreground">Budget</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Verification funnel + AI recommendations */}
        <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">

          {/* Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Verification funnel</CardTitle>
              <CardDescription>From raw submission to rewarded verified outcome.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              {verificationFunnel.map(({ label, count, pct, color }) => (
                <div key={label} className="grid gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>{label}</span>
                    <span className="font-semibold tabular-nums">{count.toLocaleString()} <span className="text-muted-foreground font-normal">({pct}%)</span></span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
              <Separator className="mt-2" />
              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <AlertTriangle className="size-3 text-warning" />
                  Fraud catch rate: 97.5%
                </div>
                <div className="flex items-center gap-1.5 text-primary">
                  <CheckCircle2 className="size-3" />
                  Target: &lt; 2% leaked
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI recommendations */}
          <Card>
            <CardHeader>
              <Badge className="mb-3 gap-1 w-fit bg-primary/10 text-primary border-primary/20">
                <Sparkles className="size-3" /> AI recommendations
              </Badge>
              <CardTitle>Agent intelligence</CardTitle>
              <CardDescription>Prioritised actions from the insight, reward, and fraud agents.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {aiRecommendations.map((rec, i) => (
                <div key={i}>
                  <div className="flex gap-3 py-2">
                    <PriorityDot priority={rec.priority} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-muted-foreground">{rec.agent}</span>
                        {rec.priority === "high" && <Badge variant="destructive" className="text-[9px] px-1">Action required</Badge>}
                      </div>
                      <div className="text-sm font-medium leading-snug">{rec.headline}</div>
                      <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{rec.detail}</div>
                    </div>
                  </div>
                  {i < aiRecommendations.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button render={<Link href="/workspace/agents" />} variant="outline" size="sm" className="w-full gap-2">
                <Bot className="size-3.5" /> Open Agent Hub
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Economic snapshot */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total budget locked in escrow", value: "£32,400", icon: DollarSign, detail: "Across 3 active missions" },
            { label: "Verified outcomes this week",   value: "1,555",   icon: BadgeCheck, detail: "84.2% of submissions rewarded" },
            { label: "Active participants",           value: "937",     icon: Users,      detail: "312 in multi-mission track" },
          ].map(({ label, value, icon: Icon, detail }) => (
            <Card key={label}>
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <div className="text-2xl font-semibold tabular-nums">{value}</div>
                  <div className="text-sm font-medium mt-0.5">{label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{detail}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </WorkspaceShell>
  );
}
