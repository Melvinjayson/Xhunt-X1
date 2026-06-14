"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock,
  Globe2,
  MapPin,
  Share2,
  Sparkles,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import { exploreMissions, MISSION_COLOR_MAP } from "@/lib/missions-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const UNSPLASH = "https://images.unsplash.com";

const STEP_ICONS = {
  action: Zap,
  reflection: Star,
  discovery: Globe2,
};

const STEP_COLORS = {
  action: "var(--primary)",
  reflection: "var(--color-reward)",
  discovery: "var(--color-ai)",
};

const recentActivity = [
  { actor: "Sarah M.", action: "joined this mission", time: "12 min ago" },
  { actor: "James K.", action: "submitted proof", time: "1 hour ago" },
  { actor: "Anita R.", action: "completed all steps", time: "3 hours ago" },
  { actor: "Tom B.", action: "joined this mission", time: "5 hours ago" },
];

export default function MissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const mission = exploreMissions.find((m) => m.id === id) ?? exploreMissions[0];
  const color = MISSION_COLOR_MAP[mission.color] ?? "var(--primary)";

  const [joined, setJoined] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  function handleJoin() {
    setJoined(true);
  }

  function markStep(index: number) {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
        if (index < mission.steps.length - 1) {
          setCurrentStep(index + 1);
        }
      }
      return next;
    });
  }

  const progress = joined ? Math.round((completedSteps.size / mission.steps.length) * 100) : 0;
  const allDone = completedSteps.size === mission.steps.length && joined;

  return (
    <ConsumerShell title={mission.name} subtitle={mission.category}>
      <div className="grid gap-6 max-w-2xl">

        {/* Back link */}
        <Link
          href="/explore"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="size-4" /> Back to explore
        </Link>

        {/* Hero image */}
        <div className="relative h-48 sm:h-64 w-full rounded-2xl overflow-hidden">
          <Image
            src={`${UNSPLASH}/${mission.image}?auto=format&fit=crop&w=800&h=400&q=80`}
            alt={mission.name}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 opacity-20" style={{ background: color }} />

          {/* Badges on image */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="border-white/20 bg-black/50 text-white backdrop-blur-sm text-xs">
              {mission.category}
            </Badge>
            {mission.verified && (
              <Badge className="border-white/20 bg-black/50 text-white backdrop-blur-sm text-xs gap-1">
                <BadgeCheck className="size-3" /> Verified
              </Badge>
            )}
          </div>

          {/* Match score */}
          <div
            className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-bold text-white"
            style={{ background: `color-mix(in oklch, ${color} 70%, black)` }}
          >
            {mission.matchScore}% match
          </div>

          {/* Mission name on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h1 className="text-xl font-bold text-white leading-tight">{mission.name}</h1>
            <div className="flex items-center gap-1.5 mt-1 text-white/70 text-xs">
              <Building2 className="size-3" />
              <span>{mission.organiser} · {mission.organiserType}</span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: Trophy, label: "Reward", value: mission.reward, color },
            { icon: Clock, label: "Deadline", value: mission.due, color: "var(--color-reward)" },
            { icon: Users, label: "People", value: `${mission.participants.toLocaleString()}`, color: "var(--color-sky)" },
            { icon: MapPin, label: "Location", value: mission.location, color: "var(--color-ai)" },
          ].map(({ icon: Icon, label, value, color: c }) => (
            <div
              key={label}
              className="flex flex-col gap-1 rounded-xl border p-3"
              style={{ background: `color-mix(in oklch, ${c} 6%, var(--card))` }}
            >
              <Icon className="size-3.5" style={{ color: c }} />
              <div className="text-[10px] text-muted-foreground">{label}</div>
              <div className="text-xs font-semibold leading-tight truncate">{value}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div>
          <p className="text-sm text-muted-foreground leading-relaxed">{mission.longDescription}</p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {mission.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border px-3 py-1 text-xs font-medium"
              style={{
                borderColor: `color-mix(in oklch, ${color} 30%, var(--border))`,
                color,
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        <Separator />

        {/* Progress (if joined) */}
        {joined && (
          <div className="rounded-2xl border p-4" style={{ background: `color-mix(in oklch, ${color} 5%, var(--card))` }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Your progress</span>
              <span className="text-sm font-bold" style={{ color }}>{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden mb-3">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: color }}
              />
            </div>
            <div className="text-xs text-muted-foreground">
              {completedSteps.size} of {mission.steps.length} steps completed
            </div>
          </div>
        )}

        {/* Steps */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-base font-semibold">What you&apos;ll do</h2>
            <Badge variant="secondary" className="text-xs">{mission.steps.length} steps</Badge>
          </div>
          <div className="grid gap-3">
            {mission.steps.map((step, i) => {
              const Icon = STEP_ICONS[step.type];
              const stepColor = STEP_COLORS[step.type];
              const done = completedSteps.has(i);
              const active = joined && i === currentStep && !done;

              return (
                <div
                  key={i}
                  className={cn(
                    "flex gap-4 rounded-2xl border p-4 transition-all",
                    done && "opacity-70",
                    active && "border-primary/40 shadow-sm",
                    !joined && "opacity-90"
                  )}
                  style={active ? { background: `color-mix(in oklch, ${color} 5%, var(--card))` } : {}}
                >
                  {/* Step number / done indicator */}
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <button
                      disabled={!joined}
                      onClick={() => markStep(i)}
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full border-2 transition-all",
                        done
                          ? "border-transparent text-white"
                          : "border-border hover:border-primary/50",
                        !joined && "cursor-default"
                      )}
                      style={done ? { background: color } : {}}
                      aria-label={done ? "Mark incomplete" : "Mark complete"}
                    >
                      {done ? (
                        <CheckCircle2 className="size-4" />
                      ) : (
                        <span className="text-xs font-bold text-muted-foreground">{i + 1}</span>
                      )}
                    </button>
                    {i < mission.steps.length - 1 && (
                      <div
                        className="w-px flex-1 min-h-[16px]"
                        style={{ background: done ? color : "var(--border)" }}
                      />
                    )}
                  </div>

                  {/* Step content */}
                  <div className="flex-1 pb-2">
                    <div className="flex items-start gap-2 mb-1">
                      <div
                        className="flex size-5 shrink-0 items-center justify-center rounded-md mt-0.5"
                        style={{ background: `color-mix(in oklch, ${stepColor} 15%, transparent)`, color: stepColor }}
                      >
                        <Icon className="size-3" />
                      </div>
                      <div className="text-sm font-semibold">{step.title}</div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-7">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Join / Continue CTA */}
        {allDone ? (
          <div
            className="rounded-2xl border-2 p-5 text-center"
            style={{ borderColor: color, background: `color-mix(in oklch, ${color} 8%, var(--card))` }}
          >
            <Trophy className="size-8 mx-auto mb-2" style={{ color }} />
            <div className="text-base font-bold mb-1">Mission complete!</div>
            <p className="text-xs text-muted-foreground mb-4">
              Your proof is being reviewed. You&apos;ll earn {mission.reward} once approved.
            </p>
            <Button render={<Link href="/missions" />} className="gap-2">
              View my missions <ArrowRight className="size-4" />
            </Button>
          </div>
        ) : joined ? (
          <Button
            className="w-full gap-2 h-12 text-base"
            onClick={() => markStep(currentStep)}
            style={{ background: color }}
          >
            <CheckCircle2 className="size-5" />
            Mark step {currentStep + 1} done
          </Button>
        ) : (
          <div className="grid gap-3">
            <Button
              className="w-full gap-2 h-12 text-base font-semibold"
              style={{ background: color }}
              onClick={handleJoin}
            >
              <Sparkles className="size-5" />
              Join this mission
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-2 text-sm" size="sm">
                <Star className="size-3.5" style={{ color: "var(--color-reward)" }} /> Save for later
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-sm shrink-0">
                <Share2 className="size-3.5" /> Share
              </Button>
            </div>
          </div>
        )}

        <Separator />

        {/* Recent activity */}
        <div>
          <h2 className="text-base font-semibold mb-3">Recent activity</h2>
          <div className="grid gap-1">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5">
                <div
                  className="flex size-7 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold"
                  style={{ background: color }}
                >
                  {item.actor[0]}
                </div>
                <div className="flex-1 text-sm">
                  <span className="font-medium">{item.actor}</span>
                  <span className="text-muted-foreground ml-1">{item.action}</span>
                </div>
                <span className="text-[11px] text-muted-foreground shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
          <Button render={<Link href="/messages" />} variant="ghost" size="sm" className="w-full mt-2 text-xs text-muted-foreground">
            See all updates <ArrowRight className="size-3 ml-1" />
          </Button>
        </div>

      </div>
    </ConsumerShell>
  );
}
