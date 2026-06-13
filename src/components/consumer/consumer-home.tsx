import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Globe2,
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
}: {
  label: string;
  score: number;
  detail: string;
  trend: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="@container/card bg-linear-to-t from-primary/5 to-card shadow-xs dark:bg-card">
      <CardHeader>
        <CardDescription className="flex items-center gap-1.5">
          <Icon className="size-3.5" />
          {label}
        </CardDescription>
        <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl">
          {score}
          <span className="text-lg text-muted-foreground">/100</span>
        </CardTitle>
        <CardAction>
          <Badge variant="outline" className="gap-1 text-xs text-primary">
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

export function ConsumerHome() {
  const { trust, participation, impact } = reputationScores;

  return (
    <div className="grid gap-6">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Participation Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your reputation, active missions, and AI-matched opportunities.</p>
      </div>

      {/* Reputation scores — dashboard-01 section-cards pattern */}
      <div className="grid gap-4 @xl/main:grid-cols-3 grid-cols-1 sm:grid-cols-3 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
        <ScoreCard
          label={trust.label}
          score={trust.score}
          detail={trust.detail}
          trend={trust.trend}
          icon={Shield}
        />
        <ScoreCard
          label={participation.label}
          score={participation.score}
          detail={participation.detail}
          trend={participation.trend}
          icon={TrendingUp}
        />
        <ScoreCard
          label={impact.label}
          score={impact.score}
          detail={impact.detail}
          trend={impact.trend}
          icon={Globe2}
        />
      </div>

      {/* Continue journey + AI matches */}
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">

        {/* Continue Journey */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge className="mb-3 gap-1 w-fit"><Zap className="size-3" /> Continue journey</Badge>
                <CardTitle>Active missions</CardTitle>
                <CardDescription>Your in-progress participation — pick up where you left off.</CardDescription>
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

        {/* AI-Matched Opportunities */}
        <Card>
          <CardHeader>
            <Badge className="mb-3 gap-1 w-fit bg-primary/10 text-primary border-primary/20">
              <Sparkles className="size-3" /> Matched for you
            </Badge>
            <CardTitle>Opportunities</CardTitle>
            <CardDescription>AI-matched to your skills, context, and reputation profile.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {aiMatchedOpportunities.map((opp) => (
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
            ))}
            <Button render={<Link href="/explore" />} variant="outline" className="w-full gap-2">
              See all opportunities <ArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Weekly progress + Activity feed */}
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <MarketChart />

        {/* Community activity */}
        <Card>
          <CardHeader>
            <CardTitle>Community activity</CardTitle>
            <CardDescription>Verified actions from your participation network.</CardDescription>
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
