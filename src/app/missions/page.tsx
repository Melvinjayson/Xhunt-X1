"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Globe2,
  Plus,
  Trophy,
  Zap,
} from "lucide-react";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Tab = "active" | "saved" | "completed";

interface Mission {
  id: string;
  name: string;
  category: string;
  tab: Tab;
  progress?: number;
  status?: string;
  due?: string;
  reward: string;
  points: number;
  color: string;
  description: string;
  participants: number;
  verified: boolean;
  completedDate?: string;
  impact?: string;
}

const MISSIONS: Mission[] = [
  {
    id: "1",
    name: "Climate Action Sprint",
    category: "Sustainability",
    tab: "active",
    progress: 68,
    status: "Proof submitted",
    due: "3 days left",
    reward: "140 pts",
    points: 140,
    color: "var(--primary)",
    description: "Organise and document a local environmental cleanup or green initiative.",
    participants: 412,
    verified: true,
  },
  {
    id: "2",
    name: "Creator Skill Guild",
    category: "Learning",
    tab: "active",
    progress: 41,
    status: "In progress",
    due: "7 days left",
    reward: "85 pts",
    points: 85,
    color: "var(--color-sky)",
    description: "Build and share a creative skill through structured peer collaboration.",
    participants: 128,
    verified: true,
  },
  {
    id: "3",
    name: "Local Discovery Loop",
    category: "Community",
    tab: "active",
    progress: 89,
    status: "Almost done",
    due: "1 day left",
    reward: "200 pts",
    points: 200,
    color: "var(--color-rose)",
    description: "Visit and document local venues and hidden gems in your area.",
    participants: 874,
    verified: true,
  },
  {
    id: "4",
    name: "Resilient Cities Research",
    category: "Research",
    tab: "saved",
    reward: "250 pts + certificate",
    points: 250,
    color: "var(--color-ai)",
    description: "Contribute data and analysis to a city resilience and urban planning study.",
    participants: 42,
    verified: true,
    due: "14 days left",
  },
  {
    id: "5",
    name: "Workforce Readiness Program",
    category: "Workforce",
    tab: "saved",
    reward: "180 pts + badge",
    points: 180,
    color: "var(--color-sky)",
    description: "Mentor or support job seekers through skills workshops and career coaching.",
    participants: 128,
    verified: true,
    due: "20 days left",
  },
  {
    id: "6",
    name: "Urban Biodiversity Survey",
    category: "Exploration",
    tab: "saved",
    reward: "160 pts",
    points: 160,
    color: "var(--color-reward)",
    description: "Map and photograph plant and wildlife species in urban green spaces.",
    participants: 67,
    verified: false,
    due: "30 days left",
  },
  {
    id: "7",
    name: "Community Learning Hub",
    category: "Learning",
    tab: "completed",
    reward: "240 pts",
    points: 240,
    color: "var(--color-sky)",
    description: "Delivered 6 skill workshops for community members.",
    participants: 84,
    verified: true,
    completedDate: "Apr 2026",
    impact: "84 participants upskilled",
  },
  {
    id: "8",
    name: "Urban Green Survey",
    category: "Exploration",
    tab: "completed",
    reward: "120 pts",
    points: 120,
    color: "var(--color-reward)",
    description: "Mapped 47 green spaces across district for city planning.",
    participants: 31,
    verified: true,
    completedDate: "Mar 2026",
    impact: "Added to city planning database",
  },
];

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "active", label: "Active", icon: Zap },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "completed", label: "Completed", icon: CheckCircle2 },
];

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${progress}%`, background: color }}
      />
    </div>
  );
}

function ActiveMissionCard({ mission }: { mission: Mission }) {
  return (
    <div
      className="rounded-2xl border p-4 transition-all hover:border-primary/30"
      style={{
        background: `linear-gradient(to bottom right, color-mix(in oklch, ${mission.color} 5%, transparent), var(--card))`,
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `color-mix(in oklch, ${mission.color} 15%, transparent)`,
            color: mission.color,
          }}
        >
          <Globe2 className="size-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="font-semibold text-sm leading-snug">{mission.name}</div>
            <div className="text-sm font-bold shrink-0" style={{ color: mission.color }}>
              {mission.reward}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant="secondary" className="text-xs">{mission.category}</Badge>
            {mission.verified && <BadgeCheck className="size-3.5" style={{ color: mission.color }} />}
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="size-3" /> {mission.due}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-3">{mission.description}</p>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{mission.status}</span>
          <span className="font-medium" style={{ color: mission.color }}>{mission.progress}%</span>
        </div>
        <ProgressBar progress={mission.progress!} color={mission.color} />
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">{mission.participants} participants</span>
        <Button size="sm" className="gap-1 h-7 text-xs" style={{ background: mission.color }}>
          Continue <ChevronRight className="size-3" />
        </Button>
      </div>
    </div>
  );
}

function SavedMissionCard({
  mission,
  onUnsave,
}: {
  mission: Mission;
  onUnsave: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border bg-card/50 p-4 hover:border-primary/30 transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `color-mix(in oklch, ${mission.color} 15%, transparent)`,
            color: mission.color,
          }}
        >
          <Compass className="size-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="font-semibold text-sm leading-snug">{mission.name}</div>
            <button
              onClick={() => onUnsave(mission.id)}
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              title="Remove from saved"
            >
              <BookmarkCheck className="size-4" style={{ color: mission.color }} />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant="secondary" className="text-xs">{mission.category}</Badge>
            {mission.verified && <BadgeCheck className="size-3.5" style={{ color: mission.color }} />}
            {mission.due && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="size-3" /> {mission.due}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-3">{mission.description}</p>

      <Separator className="mb-3" />

      <div className="flex items-center justify-between gap-2">
        <div>
          <span className="text-sm font-bold" style={{ color: mission.color }}>{mission.reward}</span>
          <span className="text-xs text-muted-foreground ml-2">{mission.participants} joined</span>
        </div>
        <Button size="sm" variant="outline" className="gap-1 h-7 text-xs">
          Join mission <ArrowRight className="size-3" />
        </Button>
      </div>
    </div>
  );
}

function CompletedMissionCard({ mission }: { mission: Mission }) {
  return (
    <div className="rounded-2xl border bg-card/50 p-4">
      <div className="flex items-start gap-3">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `color-mix(in oklch, ${mission.color} 15%, transparent)`,
            color: mission.color,
          }}
        >
          <Trophy className="size-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold text-sm">{mission.name}</div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant="secondary" className="text-xs">{mission.category}</Badge>
                <BadgeCheck className="size-3.5" style={{ color: mission.color }} />
                <span className="text-xs text-muted-foreground">{mission.completedDate}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-bold" style={{ color: mission.color }}>+{mission.points} pts</div>
            </div>
          </div>
          {mission.impact && (
            <div
              className="mt-3 rounded-lg p-2.5 text-xs"
              style={{
                background: `color-mix(in oklch, ${mission.color} 8%, transparent)`,
                color: mission.color,
              }}
            >
              <span className="font-medium">Impact: </span>{mission.impact}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MissionsPage() {
  const [tab, setTab] = useState<Tab>("active");
  const [savedIds, setSavedIds] = useState<Set<string>>(
    new Set(MISSIONS.filter((m) => m.tab === "saved").map((m) => m.id))
  );

  const visible = MISSIONS.filter((m) => {
    if (tab === "saved") return savedIds.has(m.id) && m.tab === "saved";
    return m.tab === tab;
  });

  const counts = {
    active: MISSIONS.filter((m) => m.tab === "active").length,
    saved: savedIds.size,
    completed: MISSIONS.filter((m) => m.tab === "completed").length,
  };

  function unsave(id: string) {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  return (
    <ConsumerShell title="My missions" subtitle="Track, manage, and complete your missions.">
      <div className="grid gap-6 max-w-3xl">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">My missions</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Everything you&apos;re working on, saving, or have finished.
            </p>
          </div>
          <Button render={<Link href="/explore" />} size="sm" className="gap-1.5 shrink-0">
            <Plus className="size-3.5" /> Find missions
          </Button>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Active", value: counts.active, color: "var(--primary)", icon: Zap },
            { label: "Saved", value: counts.saved, color: "var(--color-ai)", icon: Bookmark },
            { label: "Completed", value: counts.completed, color: "var(--color-reward)", icon: CheckCircle2 },
          ].map(({ label, value, color, icon: Icon }) => (
            <Card
              key={label}
              className="cursor-pointer transition-all hover:border-primary/30"
              style={{
                background: `linear-gradient(to top, color-mix(in oklch, ${color} 6%, transparent), var(--card))`,
              }}
              onClick={() => setTab(label.toLowerCase() as Tab)}
            >
              <CardContent className="p-4 flex flex-col gap-1">
                <Icon className="size-4" style={{ color }} />
                <div className="text-2xl font-bold tabular-nums">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-secondary/50 rounded-xl w-fit">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                tab === id
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-3.5" />
              {label}
              <span className="text-[10px] font-bold opacity-60">{counts[id]}</span>
            </button>
          ))}
        </div>

        {/* Mission cards */}
        {visible.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center py-12 text-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
                <Compass className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Nothing here yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {tab === "active" && "Join a mission from Explore to get started."}
                  {tab === "saved" && "Save missions you're interested in from Explore."}
                  {tab === "completed" && "Complete your first mission to see it here."}
                </p>
              </div>
              <Button render={<Link href="/explore" />} variant="outline" size="sm" className="gap-1.5">
                Browse missions <ArrowRight className="size-3.5" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {tab === "active" && visible.map((m) => <ActiveMissionCard key={m.id} mission={m} />)}
            {tab === "saved" && visible.map((m) => (
              <SavedMissionCard key={m.id} mission={m} onUnsave={unsave} />
            ))}
            {tab === "completed" && visible.map((m) => <CompletedMissionCard key={m.id} mission={m} />)}
          </div>
        )}

        {tab !== "completed" && (
          <Card className="border-dashed">
            <CardContent className="flex items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: "color-mix(in oklch, var(--primary) 12%, transparent)",
                    color: "var(--primary)",
                  }}
                >
                  <Compass className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Find something new</p>
                  <p className="text-[11px] text-muted-foreground">
                    Browse hundreds of open missions in your areas of interest.
                  </p>
                </div>
              </div>
              <Button render={<Link href="/explore" />} variant="outline" size="sm" className="gap-1 shrink-0">
                Explore <ArrowRight className="size-3" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </ConsumerShell>
  );
}
