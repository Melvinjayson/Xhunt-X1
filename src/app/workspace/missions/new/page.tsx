"use client";

import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  Loader2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { MissionArchitectOutput } from "@/lib/agents/types";

type MissionFundingType = "paid" | "sponsored" | "learning" | "civic" | "research" | "sustainability" | "workforce";

interface RewardResult {
  recommended_reward_per_completion: number;
  reward_structure: string;
  escrow_recommendation: { release_trigger: string; conditions: string; rationale: string };
  budget_allocation: { participant_rewards: number; platform_fee: number; buffer_reserve: number };
  risk_assessment: { overpay_risk: string; underpay_risk: string; liquidity_impact: string };
  optimization_notes: string[];
  confidence_pct: number;
}

const MISSION_TYPES: { value: MissionFundingType; label: string; desc: string }[] = [
  { value: "workforce",     label: "Workforce",     desc: "Training completion + employment outcomes" },
  { value: "learning",      label: "Learning",      desc: "Certification and skill-building" },
  { value: "sustainability",label: "Sustainability", desc: "Verified behaviour change + ESG targets" },
  { value: "research",      label: "Research",      desc: "Participant compensation per ethics standards" },
  { value: "civic",         label: "Civic",         desc: "Community participation + reputation capital" },
  { value: "paid",          label: "Paid",          desc: "Direct monetary reward on verified completion" },
  { value: "sponsored",     label: "Sponsored",     desc: "Brand-funded with participant fairness" },
];

export default function MissionStudio() {
  const [goal, setGoal] = useState("");
  const [audience, setAudience] = useState("");
  const [industry, setIndustry] = useState("");
  const [duration, setDuration] = useState("");
  const [successMetric, setSuccessMetric] = useState("");
  const [missionType, setMissionType] = useState<MissionFundingType>("workforce");
  const [budget, setBudget] = useState("");
  const [targetCount, setTargetCount] = useState("");

  const [designing, setDesigning] = useState(false);
  const [optimising, setOptimising] = useState(false);
  const [missionOutput, setMissionOutput] = useState<MissionArchitectOutput | null>(null);
  const [rewardOutput, setRewardOutput] = useState<RewardResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function designMission() {
    if (!goal || !audience || !industry || !duration || !successMetric) return;
    setDesigning(true);
    setError(null);
    setMissionOutput(null);
    setRewardOutput(null);
    try {
      const res = await fetch("/api/agents/mission-architect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, audience, industry, duration, success_metric: successMetric }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Agent failed");
      setMissionOutput(await res.json());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setDesigning(false);
    }
  }

  async function optimiseRewards() {
    if (!missionOutput || !budget || !targetCount) return;
    setOptimising(true);
    setError(null);
    try {
      const res = await fetch("/api/agents/reward-economist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mission_id: "studio-preview",
          mission_type: missionType,
          target_outcome: successMetric,
          target_participant_count: parseInt(targetCount, 10),
          budget_total: parseFloat(budget),
          currency: "GBP",
          completion_rate_estimate: 75,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Agent failed");
      setRewardOutput(await res.json());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setOptimising(false);
    }
  }

  const formComplete = goal && audience && industry && duration && successMetric;

  return (
    <WorkspaceShell
      title="Mission Studio"
      subtitle="Describe an outcome. The Mission Architect designs the mission."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">

        {/* Left: input form */}
        <div className="grid gap-6">

          {/* Step 1: objective */}
          <Card>
            <CardHeader>
              <Badge className="mb-3 gap-1 w-fit"><Sparkles className="size-3" /> Step 1 — Define the outcome</Badge>
              <CardTitle>What do you want to achieve?</CardTitle>
              <CardDescription>
                Describe the real-world outcome in plain language. The Mission Architect converts it into a verified, fundable mission.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="goal">Outcome goal</Label>
                <Textarea
                  id="goal"
                  placeholder="e.g. 500 university students complete a verified career readiness assessment and receive portfolio evidence of their employability skills."
                  className="min-h-[100px] text-sm resize-none"
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="audience">Target audience</Label>
                  <Input id="audience" placeholder="e.g. Final-year undergraduates" value={audience} onChange={e => setAudience(e.target.value)} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="industry">Sector / industry</Label>
                  <Input id="industry" placeholder="e.g. Higher education" value={industry} onChange={e => setIndustry(e.target.value)} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="duration">Mission duration</Label>
                  <Input id="duration" placeholder="e.g. 4 weeks" value={duration} onChange={e => setDuration(e.target.value)} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="metric">Success metric</Label>
                  <Input id="metric" placeholder="e.g. 500 verified assessments" value={successMetric} onChange={e => setSuccessMetric(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: funding */}
          <Card>
            <CardHeader>
              <Badge className="mb-3 gap-1 w-fit"><DollarSign className="size-3" /> Step 2 — Economic model</Badge>
              <CardTitle>Funding type and budget</CardTitle>
              <CardDescription>The Reward Economist will optimise your incentive structure after the mission is designed.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {MISSION_TYPES.map(({ value, label, desc }) => (
                  <button
                    key={value}
                    onClick={() => setMissionType(value)}
                    className={`rounded-xl border p-3 text-left transition-colors hover:border-primary/40 ${missionType === value ? "border-primary bg-primary/5" : "bg-card/50"}`}
                  >
                    <div className="text-xs font-semibold mb-0.5">{label}</div>
                    <div className="text-[10px] text-muted-foreground leading-relaxed">{desc}</div>
                  </button>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="budget">Total budget (£)</Label>
                  <Input id="budget" type="number" placeholder="e.g. 15000" value={budget} onChange={e => setBudget(e.target.value)} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="target">Target participants</Label>
                  <Input id="target" type="number" placeholder="e.g. 500" value={targetCount} onChange={e => setTargetCount(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <Button onClick={designMission} disabled={!formComplete || designing} className="gap-2">
              {designing ? <Loader2 className="size-4 animate-spin" /> : <Bot className="size-4" />}
              {designing ? "Designing mission…" : "Design this mission"}
            </Button>
            {missionOutput && (
              <Button
                variant="outline"
                onClick={optimiseRewards}
                disabled={!budget || !targetCount || optimising}
                className="gap-2"
              >
                {optimising ? <Loader2 className="size-4 animate-spin" /> : <DollarSign className="size-4" />}
                {optimising ? "Optimising rewards…" : "Optimise reward structure"}
              </Button>
            )}
          </div>

          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>

        {/* Right: agent output */}
        <div className="grid gap-4 content-start">
          {!missionOutput && !designing && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="size-6 text-primary" />
                </div>
                <CardTitle className="text-base">Mission Architect</CardTitle>
                <CardDescription className="text-sm max-w-xs">
                  Fill in the outcome goal and click "Design this mission" to generate a structured, verifiable mission blueprint.
                </CardDescription>
              </CardContent>
            </Card>
          )}

          {designing && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 gap-3">
                <Loader2 className="size-8 text-primary animate-spin" />
                <div className="text-sm font-medium">Mission Architect is designing…</div>
                <div className="text-xs text-muted-foreground text-center">Applying constitutional gate and Ubuntu constraints</div>
              </CardContent>
            </Card>
          )}

          {missionOutput && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Badge className="mb-2 gap-1 w-fit text-[10px] bg-primary/10 text-primary border-primary/20"><CheckCircle2 className="size-2.5" /> Mission designed</Badge>
                    <CardTitle className="text-lg leading-snug">{missionOutput.title}</CardTitle>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge variant="secondary" className="text-[10px]">{missionOutput.difficulty}</Badge>
                  </div>
                </div>
                <CardDescription className="text-xs leading-relaxed">{missionOutput.story_context}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground">{missionOutput.estimated_time}</span>
                  <Separator orientation="vertical" className="h-3 mt-0.5" />
                  <span className="text-xs text-muted-foreground">{missionOutput.reward}</span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {missionOutput.tags.map(t => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
                </div>
                <Separator />
                <div className="grid gap-2">
                  {missionOutput.steps.map((step, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-lg border bg-card/50">
                      <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-semibold mt-0.5">{i + 1}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-mono text-muted-foreground">{step.type}</span>
                        </div>
                        <div className="text-xs font-medium leading-snug">{step.instruction}</div>
                        <div className="text-[10px] text-muted-foreground mt-1 flex items-start gap-1">
                          <ShieldCheck className="size-2.5 mt-0.5 shrink-0 text-primary" />
                          {step.success_criteria}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="text-[11px] text-muted-foreground leading-relaxed">{missionOutput.rationale}</div>
                <Button className="w-full gap-2 mt-1" disabled>
                  <Zap className="size-4" /> Publish mission <ChevronRight className="size-3" />
                </Button>
              </CardContent>
            </Card>
          )}

          {rewardOutput && (
            <Card>
              <CardHeader className="pb-3">
                <Badge className="mb-2 gap-1 w-fit text-[10px] bg-primary/10 text-primary border-primary/20"><DollarSign className="size-2.5" /> Reward structure optimised</Badge>
                <CardTitle className="text-base">
                  £{rewardOutput.recommended_reward_per_completion} <span className="text-sm font-normal text-muted-foreground">per verified completion</span>
                </CardTitle>
                <CardDescription className="text-xs">{rewardOutput.reward_structure} structure · {rewardOutput.confidence_pct}% confidence</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  {[
                    { l: "Participant rewards", v: `£${rewardOutput.budget_allocation.participant_rewards}` },
                    { l: "Platform fee",        v: `£${rewardOutput.budget_allocation.platform_fee}` },
                    { l: "Buffer reserve",      v: `£${rewardOutput.budget_allocation.buffer_reserve}` },
                  ].map(({ l, v }) => (
                    <div key={l} className="rounded-lg bg-secondary/50 p-2">
                      <div className="font-semibold">{v}</div>
                      <div className="text-muted-foreground">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border bg-card/50 p-3 grid gap-1.5">
                  <div className="text-[10px] font-medium">Escrow: {rewardOutput.escrow_recommendation.release_trigger}</div>
                  <div className="text-[10px] text-muted-foreground">{rewardOutput.escrow_recommendation.conditions}</div>
                </div>
                {rewardOutput.optimization_notes.map((n, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                    <ArrowRight className="size-2.5 mt-0.5 shrink-0 text-primary" />
                    {n}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </WorkspaceShell>
  );
}
