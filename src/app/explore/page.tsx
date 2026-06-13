import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  Filter,
  MapPin,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import { aiMatchedOpportunities, missionSignals, outcomeCategories } from "@/components/xhunt-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = ["All", "Nearby", "Remote", "Learning", "Community", "Impact", "Paid"];

const allOpportunities = [
  ...missionSignals.map((m) => ({
    name: m.name,
    category: m.signal,
    description: `${m.proof} · ${m.participation}`,
    matchScore: m.score,
    reward: `${m.score} pts`,
    participants: parseInt(m.participation),
    skills: ["Participation", "Proof"],
    verified: m.confidence === "Verified",
    location: "Remote",
    type: "Impact",
  })),
  ...aiMatchedOpportunities.map((o) => ({
    name: o.name,
    category: o.category,
    description: `${o.participants} participants · ${o.skills.join(", ")}`,
    matchScore: o.matchScore,
    reward: o.reward,
    participants: o.participants,
    skills: o.skills,
    verified: o.verified,
    location: "Remote",
    type: o.category,
  })),
];

function OpportunityCard({
  name,
  category,
  description,
  matchScore,
  reward,
  participants,
  verified,
  location,
}: (typeof allOpportunities)[0]) {
  return (
    <Card className="group flex flex-col transition-colors hover:border-primary/40">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-xs">{category}</Badge>
              {verified && <BadgeCheck className="size-3.5 text-primary shrink-0" />}
            </div>
            <CardTitle className="text-base leading-snug">{name}</CardTitle>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-bold text-primary">{matchScore}%</div>
            <div className="text-[10px] text-muted-foreground">match</div>
          </div>
        </div>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto pt-0 grid gap-3">
        <Separator />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Users className="size-3" />{participants}</span>
            <span className="flex items-center gap-1"><MapPin className="size-3" />{location}</span>
          </div>
          <span className="font-medium text-foreground">{reward}</span>
        </div>
        <div className="flex gap-2">
          <Button render={<Link href="/missions" />} size="sm" className="flex-1 gap-1">
            Apply <ArrowRight className="size-3" />
          </Button>
          <Button size="icon" variant="outline" className="size-8 shrink-0" aria-label="Save">
            <Bookmark className="size-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ExplorePage() {
  return (
    <ConsumerShell title="Opportunity Network" subtitle="Browse, search, and join missions across all participation domains.">
      <div className="grid gap-6">

        {/* Page header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Opportunity Network</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Discover missions matched to your skills, context, and reputation profile.
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 w-fit">
            <Filter className="size-4" /> Filters
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-10 h-11 text-sm"
            placeholder="Search by mission, skill, community, or outcome type…"
          />
        </div>

        {/* AI match banner */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Sparkles className="size-4" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">AI found 3 high-match opportunities</div>
              <div className="text-xs text-muted-foreground">Based on your skills, participation history, and trust profile.</div>
            </div>
            <Button size="sm" variant="outline" className="shrink-0 gap-1">
              View matches <ArrowRight className="size-3" />
            </Button>
          </CardContent>
        </Card>

        {/* Tabs + opportunity grid */}
        <Tabs defaultValue="All">
          <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 gap-1">
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab} className="text-xs shrink-0">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {allOpportunities.map((opp) => (
                  <OpportunityCard key={opp.name} {...opp} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Category browser */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Browse by domain</h2>
            <p className="text-sm text-muted-foreground">Explore participation opportunities organized by outcome type.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {outcomeCategories.map(({ label, count, icon }) => (
              <Link href="#" key={label}>
                <div className="group flex items-center gap-3 rounded-xl border bg-card/50 p-4 transition-colors hover:border-primary/40 hover:bg-card">
                  <span className="text-xl">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{label}</div>
                    <div className="text-xs text-muted-foreground">{count}</div>
                  </div>
                  <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ConsumerShell>
  );
}
