"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  Clock,
  Filter,
  MapPin,
  Plus,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import { outcomeCategories } from "@/components/xhunt-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const UNSPLASH = "https://images.unsplash.com";

const domainColorMap: Record<string, string> = {
  energy:  "var(--color-energy)",
  reward:  "var(--color-reward)",
  primary: "var(--primary)",
  rose:    "var(--color-rose)",
  ai:      "var(--color-ai)",
  sky:     "var(--color-sky)",
};

type Mission = {
  id: string;
  name: string;
  category: string;
  tab: string;
  description: string;
  matchScore: number;
  reward: string;
  participants: number;
  location: string;
  verified: boolean;
  due: string;
  color: string;
  image: string;
  skills: string[];
};

const missions: Mission[] = [
  {
    id: "m1",
    name: "Climate Action Sprint",
    category: "Sustainability",
    tab: "Community",
    description: "Join local teams organising beach and park clean-up events. Submit photo evidence to earn points.",
    matchScore: 97,
    reward: "200 pts + badge",
    participants: 412,
    location: "London, UK",
    verified: true,
    due: "3 days left",
    color: "primary",
    image: "photo-1569163139599-0f4517e36f51",
    skills: ["Volunteering", "Sustainability"],
  },
  {
    id: "m2",
    name: "Resilient Cities Research",
    category: "Research",
    tab: "Remote",
    description: "Contribute to citizen science research on urban resilience. Surveys and field reporting.",
    matchScore: 94,
    reward: "250 pts + certificate",
    participants: 42,
    location: "Remote",
    verified: true,
    due: "7 days left",
    color: "ai",
    image: "photo-1532187863486-abf9dbad1b69",
    skills: ["Analysis", "Reporting"],
  },
  {
    id: "m3",
    name: "Workforce Readiness Programme",
    category: "Workforce Development",
    tab: "Learning",
    description: "Complete career skill modules, earn a verified certificate, and get matched to employers.",
    matchScore: 93,
    reward: "180 pts + badge",
    participants: 128,
    location: "Remote",
    verified: true,
    due: "14 days left",
    color: "sky",
    image: "photo-1521791136064-7986c2920216",
    skills: ["Mentorship", "Communication"],
  },
  {
    id: "m4",
    name: "Urban Biodiversity Survey",
    category: "Exploration",
    tab: "Nearby",
    description: "Map and photograph local green spaces, parks, and wildlife habitats. GPS logs required.",
    matchScore: 88,
    reward: "160 pts",
    participants: 67,
    location: "Nearby",
    verified: false,
    due: "5 days left",
    color: "reward",
    image: "photo-1476514525535-07fb3b4ae5f1",
    skills: ["Field Research", "Photography"],
  },
  {
    id: "m5",
    name: "Community Learning Hub",
    category: "Learning & Education",
    tab: "Learning",
    description: "Run or attend local skill-sharing workshops. Attendance records verify your contribution.",
    matchScore: 91,
    reward: "240 pts",
    participants: 84,
    location: "Manchester, UK",
    verified: true,
    due: "10 days left",
    color: "sky",
    image: "photo-1434030216411-0b793f4b6f57",
    skills: ["Teaching", "Community"],
  },
  {
    id: "m6",
    name: "Neighbourhood Improvement Drive",
    category: "Community Impact",
    tab: "Community",
    description: "Volunteer for local improvement projects — parks, schools, and community spaces.",
    matchScore: 86,
    reward: "120 pts",
    participants: 203,
    location: "Birmingham, UK",
    verified: true,
    due: "Open-ended",
    color: "rose",
    image: "photo-1531206715517-5c0ba140b2b4",
    skills: ["Volunteering", "Leadership"],
  },
  {
    id: "m7",
    name: "Employee Wellness Challenge",
    category: "Health & Wellness",
    tab: "Remote",
    description: "10,000 steps a day for 30 days. Log your activity and earn a verified health record.",
    matchScore: 82,
    reward: "150 pts",
    participants: 318,
    location: "Remote",
    verified: true,
    due: "Ongoing",
    color: "energy",
    image: "photo-1571019613454-1cb2f99b2d8b",
    skills: ["Health", "Accountability"],
  },
  {
    id: "m8",
    name: "AI Ethics Audit Sprint",
    category: "Research",
    tab: "Remote",
    description: "Review AI decision logs and flag potential bias issues. Structured review process with guidance.",
    matchScore: 79,
    reward: "300 pts + certificate",
    participants: 33,
    location: "Remote",
    verified: true,
    due: "21 days left",
    color: "ai",
    image: "photo-1485827404703-89b55fcc595e",
    skills: ["Analysis", "Ethics"],
  },
  {
    id: "m9",
    name: "Creator Skill Guild",
    category: "Learning & Education",
    tab: "Learning",
    description: "Level up your creative skills — design, writing, video. Peer-reviewed output earns attribution.",
    matchScore: 84,
    reward: "85 pts + portfolio entry",
    participants: 156,
    location: "Remote",
    verified: false,
    due: "Ongoing",
    color: "sky",
    image: "photo-1561070791-2526d30994b5",
    skills: ["Design", "Writing"],
  },
];

const tabs = ["All", "Nearby", "Remote", "Learning", "Community", "Impact", "Paid"];

function MissionCard({ mission, onJoin }: { mission: Mission; onJoin: (id: string) => void }) {
  const color = domainColorMap[mission.color] ?? "var(--primary)";

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg" style={{ borderColor: `color-mix(in oklch, ${color} 20%, var(--border))` }}>
      {/* Image header */}
      <div className="relative h-36 overflow-hidden">
        <Image
          src={`${UNSPLASH}/${mission.image}?auto=format&fit=crop&w=400&h=180&q=75`}
          alt={mission.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute inset-0 opacity-20" style={{ background: color }} />
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 pb-2">
          <Badge className="text-[10px] border-white/20 bg-black/50 text-white backdrop-blur-sm">{mission.category}</Badge>
          {mission.verified && (
            <BadgeCheck className="size-4 text-white drop-shadow" style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
          )}
        </div>
        {/* Match score chip */}
        <div className="absolute top-2 right-2 rounded-full px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: `color-mix(in oklch, ${color} 70%, black)` }}>
          {mission.matchScore}% match
        </div>
      </div>

      <CardHeader className="pb-2 pt-3">
        <CardTitle className="text-sm leading-snug">{mission.name}</CardTitle>
        <CardDescription className="text-xs line-clamp-2 mt-1">{mission.description}</CardDescription>
      </CardHeader>

      <CardContent className="mt-auto pt-0 grid gap-3">
        <div className="flex flex-wrap gap-1">
          {mission.skills.map((s) => (
            <span key={s} className="rounded-full px-2 py-0.5 text-[10px] border" style={{ borderColor: `color-mix(in oklch, ${color} 30%, var(--border))`, color }}>
              {s}
            </span>
          ))}
        </div>
        <Separator />
        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 truncate"><Users className="size-3 shrink-0" />{mission.participants}</span>
          <span className="flex items-center gap-1 truncate"><MapPin className="size-3 shrink-0" />{mission.location}</span>
          <span className="flex items-center gap-1 truncate"><Clock className="size-3 shrink-0" />{mission.due}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="flex-1 gap-1 text-xs"
            style={{ background: color, color: "black" }}
            onClick={() => onJoin(mission.id)}
          >
            Join mission <ArrowRight className="size-3" />
          </Button>
          <Button size="icon" variant="outline" className="size-8 shrink-0" aria-label="Save">
            <Bookmark className="size-3.5" />
          </Button>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium" style={{ color }}>{mission.reward}</span>
          <span className="text-muted-foreground">reward</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [joined, setJoined] = useState<Set<string>>(new Set());

  const filtered = missions.filter((m) => {
    const matchesTab = activeTab === "All" || m.tab === activeTab || m.category.includes(activeTab);
    const matchesSearch = searchQuery === "" || m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.category.toLowerCase().includes(searchQuery.toLowerCase()) || m.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  function handleJoin(id: string) {
    setJoined((prev) => new Set([...prev, id]));
  }

  return (
    <ConsumerShell title="Explore missions" subtitle="Find and join missions across all participation domains.">
      <div className="grid gap-6">

        {/* Page header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Explore missions</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Find something that matters to you, join it, and start building your record.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="size-4" /> Filters
            </Button>
            <Button render={<Link href="/workspace/missions/new" />} size="sm" className="gap-2">
              <Plus className="size-3.5" /> Create a mission
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-10 h-11 text-sm"
            placeholder="Search by mission name, skill, or category…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* AI match banner */}
        <Card className="border-primary/30" style={{ background: "color-mix(in oklch, var(--primary) 5%, var(--card))" }}>
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg" style={{ background: "color-mix(in oklch, var(--color-ai) 15%, transparent)", color: "var(--color-ai)" }}>
              <Sparkles className="size-4" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">AI found 3 high-match opportunities for you</div>
              <div className="text-xs text-muted-foreground">Based on your skills, history, and location.</div>
            </div>
            <Button size="sm" variant="outline" className="shrink-0 gap-1">
              <Star className="size-3" style={{ color: "var(--color-reward)" }} /> View matches
            </Button>
          </CardContent>
        </Card>

        {/* Joined confirmation banner */}
        {joined.size > 0 && (
          <Card className="border-green-500/30" style={{ background: "color-mix(in oklch, var(--primary) 5%, var(--card))" }}>
            <CardContent className="flex items-center gap-3 py-3">
              <BadgeCheck className="size-5 text-primary shrink-0" />
              <div className="flex-1 text-sm">
                <span className="font-semibold">You&apos;ve joined {joined.size} mission{joined.size > 1 ? "s" : ""}!</span>
                <span className="text-muted-foreground ml-1">Head to Missions to see them.</span>
              </div>
              <Button render={<Link href="/missions" />} size="sm" variant="outline" className="gap-1 shrink-0">
                View <ArrowRight className="size-3" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all"
                style={
                  activeTab === tab
                    ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                    : { background: "var(--secondary)", color: "var(--secondary-foreground)" }
                }
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Mission cards grid */}
          {filtered.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={{ ...mission, name: joined.has(mission.id) ? `✓ ${mission.name}` : mission.name }}
                  onJoin={handleJoin}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed py-12 text-center">
              <Search className="size-8 text-muted-foreground opacity-40" />
              <div className="text-sm font-medium">No missions found</div>
              <p className="text-xs text-muted-foreground max-w-xs">Try a different search or filter, or create a new mission.</p>
              <Button render={<Link href="/workspace/missions/new" />} variant="outline" size="sm" className="mt-2 gap-1">
                <Plus className="size-3.5" /> Create a mission
              </Button>
            </div>
          )}
        </div>

        {/* Create a mission banner */}
        <Card className="relative overflow-hidden border-dashed">
          <div className="pointer-events-none absolute inset-0 opacity-10 hero-grid" />
          <div className="absolute inset-0 opacity-5" style={{ background: "linear-gradient(135deg, var(--color-ai), var(--primary))" }} />
          <CardContent className="relative flex flex-col items-start gap-4 py-6 sm:flex-row sm:items-center">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "color-mix(in oklch, var(--color-ai) 15%, transparent)", color: "var(--color-ai)" }}>
              <Plus className="size-6" />
            </div>
            <div className="flex-1">
              <div className="text-base font-semibold">Have a goal? Turn it into a mission.</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Set a clear outcome, define how participants prove it, and let X-Hunt handle the verification.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button render={<Link href="/workspace/missions/new" />} size="sm" className="gap-2">
                Create a mission <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Browse by domain */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Browse by area</h2>
            <p className="text-sm text-muted-foreground">Tap a category to filter missions.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {outcomeCategories.map(({ label, count, icon, color }) => {
              const c = domainColorMap[color] ?? "var(--primary)";
              return (
                <button
                  key={label}
                  onClick={() => {
                    setActiveTab("All");
                    setSearchQuery(label.split(" ")[0]);
                  }}
                  className="group flex items-center gap-3 rounded-xl border bg-card/50 p-4 text-left transition-colors hover:bg-card"
                  style={{ borderColor: `color-mix(in oklch, ${c} 20%, var(--border))` }}
                >
                  <span className="text-xl">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{label}</div>
                    <div className="text-xs text-muted-foreground">{count}</div>
                  </div>
                  <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" style={{ color: c }} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </ConsumerShell>
  );
}
