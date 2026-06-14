"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe2,
  Loader2,
  RefreshCw,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { MarketChart } from "@/components/dashboard/market-chart";
import {
  activeMissions,
  activityFeed,
  aiMatchedOpportunities,
  reputationScores,
} from "@/components/xhunt-content";
import type { DiscoveryAgentOutput } from "@/lib/agents/types";
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

function ScoreCard({
  label,
  score,
  detail,
  trend,
  icon: Icon,
  colorVar = "var(--primary)",
}: {
  label: string;
  score: number;
  detail: string;
  trend: string;
  icon: React.ComponentType<{ className?: string }>;
  colorVar?: string;
}) {
  return (
    <Card
      className="@container/card shadow-xs dark:bg-card"
      style={{
        background: `linear-gradient(to top, color-mix(in oklch, ${colorVar} 8%, transparent), var(--card))`,
      }}
    >
      <CardHeader>
        <CardDescription className="flex items-center gap-1.5" style={{ color: colorVar }}>
          <Icon className="size-3.5" />
          {label}
        </CardDescription>
        <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl">
          {score}
          <span className="text-lg text-muted-foreground">/100</span>
        </CardTitle>
        <CardAction>
          <Badge variant="outline" className="gap-1 text-xs" style={{ color: colorVar }}>
            <TrendingUp className="size-3" />
            {trend}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="line-clamp-2 text-muted-foreground text-xs">{detail}</div>
      </CardFooter>
    </Card>
  );
}

function MissionProgress({ progress }: { progress: number }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function AIOpportunityCard({
  title,
  description,
  relevanceScore,
  skillMatchPct,
  timeCommitment,
  communityImpact,
  learningValue,
}: {
  title: string;
  description: string;
  relevanceScore: number;
  skillMatchPct: number;
  timeCommitment: string;
  communityImpact: string;
  learningValue: string;
}) {
  return (
    <Link href="/explore">
      <div className="group rounded-xl border bg-card/50 p-4 transition-colors hover:border-primary/40 hover:bg-card">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold leading-snug">{title}</div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-bold" style={{ color: "var(--color-ai)" }}>
              {relevanceScore}%
            </div>
            <div className="text-[10px] text-muted-foreground">match</div>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="grid grid-cols-3 gap-2 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="size-3 shrink-0" />
            <span className="truncate">{timeCommitment}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="size-3 shrink-0" />
            <span className="truncate">{skillMatchPct}% skill</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe2 className="size-3 shrink-0" />
            <span className="truncate">{communityImpact.slice(0, 20)}</span>
          </div>
        </div>
        {learningValue && (
          <div
            className="mt-2 text-[10px] rounded px-2 py-1"
            style={{
              background: "color-mix(in oklch, var(--color-ai) 8%, transparent)",
              color: "var(--color-ai)",
            }}
          >
            {learningValue}
          </div>
        )}
      </div>
    </Link>
  );
}

function StaticOpportunityCard({ opp }: { opp: typeof aiMatchedOpportunities[number] }) {
  return (
    <Link href="/explore" key={opp.name}>
      <div className="group rounded-xl border bg-card/50 p-4 transition-colors hover:border-primary/40 hover:bg-card">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">{opp.name}</div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <Badge variant="secondary" className="text-xs">{opp.category}</Badge>
              {opp.verified && <BadgeCheck className="size-3.5 text-primary" />}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-bold text-primary">{opp.matchScore}%</div>
            <div className="text-[10px] text-muted-foreground">match</div>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{opp.reward}</span>
          <span>{opp.participants} participants</span>
        </div>
      </div>
    </Link>
  );
}

function AIMatchesSection() {
  const [data, setData] = useState<DiscoveryAgentOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchMatches() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/agents/discovery-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goals: ["build real-world impact", "improve skills", "connect with community"],
          currentSkills: ["Community Organizing", "Data Collection", "Technical Writing"],
          interests: ["Sustainability", "Learning", "Community Impact"],
          historyContext: "Completed Climate Action Sprint (68%), Creator Skill Guild (41%), Local Discovery Loop (89%)",
          maxRecommendations: 3,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      const result: DiscoveryAgentOutput = await res.json();
      setData(result);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchMatches(); }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge
              className="mb-3 gap-1 w-fit"
              style={{
                background: "color-mix(in oklch, var(--color-ai) 12%, transparent)",
                color: "var(--color-ai)",
                borderColor: "color-mix(in oklch, var(--color-ai) 25%, transparent)",
              }}
            >
              <Sparkles className="size-3" /> Matched for you
            </Badge>
            <CardTitle>Opportunities</CardTitle>
            <CardDescription>
              {data
                ? data.discovery_insight.slice(0, 80) + (data.discovery_insight.length > 80 ? "…" : "")
                : "Chosen for you based on what you've done so far."}
            </CardDescription>
          </div>
          {!loading && (
            <button
              onClick={fetchMatches}
              className="text-muted-foreground hover:text-foreground transition-colors mt-1"
              title="Refresh matches"
            >
              <RefreshCw className="size-3.5" />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        {loading ? (
          <div className="grid gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-xl border bg-card/50 p-4 animate-pulse">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 bg-secondary rounded w-3/4" />
                    <div className="h-3 bg-secondary rounded w-full" />
                  </div>
                  <div className="size-8 bg-secondary rounded shrink-0" />
                </div>
                <div className="mt-3 h-px bg-secondary" />
                <div className="mt-3 h-3 bg-secondary rounded w-1/2" />
              </div>
            ))}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground py-1">
              <Loader2 className="size-3 animate-spin" style={{ color: "var(--color-ai)" }} />
              AI is finding your best matches…
            </div>
          </div>
        ) : error || !data ? (
          <>
            {aiMatchedOpportunities.map((opp) => (
              <StaticOpportunityCard key={opp.name} opp={opp} />
            ))}
          </>
        ) : (
          <>
            {data.opportunities.map((opp, i) => (
              <AIOpportunityCard
                key={i}
                title={opp.title}
                description={opp.description}
                relevanceScore={opp.relevance_score}
                skillMatchPct={opp.skill_match_pct}
                timeCommitment={opp.time_commitment}
                communityImpact={opp.community_impact}
                learningValue={opp.learning_value}
              />
            ))}
            {data.diversity_note && (
              <p className="text-[10px] text-muted-foreground px-1">{data.diversity_note}</p>
            )}
          </>
        )}
        <Button render={<Link href="/explore" />} variant="outline" className="w-full gap-2">
          See all missions <ArrowRight className="size-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

export function ConsumerHome() {
  const { trust, participation, impact } = reputationScores;

  return (
    <div className="grid gap-6">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Your missions</h1>
        <p className="mt-1 text-sm text-muted-foreground">Pick up where you left off, or find something new.</p>
      </div>

      {/* Reputation scores */}
      <div className="grid gap-4 @xl/main:grid-cols-3 grid-cols-1 sm:grid-cols-3">
        <ScoreCard
          label={trust.label}
          score={trust.score}
          detail={trust.detail}
          trend={trust.trend}
          icon={Shield}
          colorVar="var(--color-sky)"
        />
        <ScoreCard
          label={participation.label}
          score={participation.score}
          detail={participation.detail}
          trend={participation.trend}
          icon={TrendingUp}
          colorVar="var(--primary)"
        />
        <ScoreCard
          label={impact.label}
          score={impact.score}
          detail={impact.detail}
          trend={impact.trend}
          icon={Globe2}
          colorVar="var(--color-reward)"
        />
      </div>

      {/* Continue journey + AI matches */}
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">

        {/* Active missions */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge className="mb-3 gap-1 w-fit"><Zap className="size-3" /> Keep going</Badge>
                <CardTitle>Active missions</CardTitle>
                <CardDescription>Missions you've already started.</CardDescription>
              </div>
              <Button render={<Link href="/missions" />} variant="ghost" size="sm" className="shrink-0">
                View all <ChevronRight className="size-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            {activeMissions.map((m) => (
              <div key={m.name} className="rounded-xl border bg-card/50 p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="text-sm font-semibold">{m.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">{m.category}</Badge>
                      <span className="text-xs text-muted-foreground">{m.due}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold text-primary">{m.reward}</div>
                    <div className="text-xs text-muted-foreground">{m.status}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{m.progress}%</span>
                  </div>
                  <MissionProgress progress={m.progress} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Live AI-Matched Opportunities */}
        <AIMatchesSection />
      </div>

      {/* Weekly progress + Activity feed */}
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <MarketChart />

        {/* Community activity */}
        <Card>
          <CardHeader>
            <CardTitle>Community activity</CardTitle>
            <CardDescription>What&apos;s happening in your community.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-1">
            {activityFeed.map((item, i) => (
              <div key={i}>
                <div className="flex items-start gap-3 py-3">
                  <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="size-3.5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium leading-snug">{item.actor}</div>
                    <div className="text-xs text-muted-foreground">{item.action}</div>
                  </div>
                  <div className="text-[11px] text-muted-foreground shrink-0">{item.time}</div>
                </div>
                {i < activityFeed.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
