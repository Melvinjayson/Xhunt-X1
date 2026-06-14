import {
  ArrowUpRight,
  BadgeCheck,
  Globe2,
  LinkIcon,
  Medal,
  Settings,
  Shield,
  Star,
  TrendingUp,
} from "lucide-react";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import {
  participantSkills,
  reputationScores,
  verifiedContributions,
} from "@/components/xhunt-content";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function ScoreRing({
  score,
  label,
  icon: Icon,
}: {
  score: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative size-20">
        <svg className="size-full -rotate-90" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={radius} fill="none" strokeWidth="5" className="stroke-secondary" />
          <circle
            cx="36" cy="36" r={radius}
            fill="none" strokeWidth="5"
            className="stroke-primary transition-all"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold tabular-nums leading-none">{score}</span>
          <Icon className="size-3 text-primary mt-0.5" />
        </div>
      </div>
      <span className="text-xs font-medium text-muted-foreground text-center">{label}</span>
    </div>
  );
}

export default function ProfilePage() {
  const { trust, participation, impact } = reputationScores;

  return (
    <ConsumerShell title="Profile" subtitle="Your reputation, skills, and completed missions.">
      <div className="grid gap-6">

        {/* Profile header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {/* Avatar + identity */}
              <div className="flex items-start gap-4">
                <Avatar className="size-20 shrink-0">
                  <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">XH</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl font-semibold">Preview Participant</h1>
                    <Badge className="gap-1"><BadgeCheck className="size-3" /> Verified</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Reputation score active · Profile verified</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Globe2 className="size-3" /> On X-Hunt since 2025</span>
                    <span className="flex items-center gap-1"><LinkIcon className="size-3" /> Identity verified</span>
                  </div>
                </div>
              </div>

              {/* Score rings */}
              <div className="sm:ml-auto flex items-center gap-6 pl-0 sm:pl-4">
                <ScoreRing score={trust.score} label="Trust" icon={Shield} />
                <ScoreRing score={participation.score} label="Participation" icon={TrendingUp} />
                <ScoreRing score={impact.score} label="Impact" icon={Globe2} />
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex gap-6 text-sm">
                <div><span className="font-semibold">42</span><span className="text-muted-foreground ml-1.5">Completions</span></div>
                <div><span className="font-semibold">12</span><span className="text-muted-foreground ml-1.5">Missions</span></div>
                <div><span className="font-semibold">186</span><span className="text-muted-foreground ml-1.5">Actions taken</span></div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Settings className="size-3.5" /> Edit profile
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ArrowUpRight className="size-3.5" /> Share profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">

          {/* Verified contributions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Medal className="size-4 text-primary" />
                <CardTitle>Verified contributions</CardTitle>
              </div>
              <CardDescription>Missions you&apos;ve completed with verified proof.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {verifiedContributions.map((c, i) => (
                <div key={i}>
                  <div className="rounded-xl border bg-card/50 p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="text-sm font-semibold">{c.mission}</div>
                        <Badge variant="secondary" className="text-xs mt-1">{c.date}</Badge>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-primary">+{c.points} pts</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{c.outcome}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-md bg-secondary/50 p-2">
                        <div className="text-muted-foreground mb-0.5">Proof</div>
                        <div className="font-medium">{c.proof}</div>
                      </div>
                      <div className="rounded-md bg-primary/5 p-2">
                        <div className="text-muted-foreground mb-0.5">Impact</div>
                        <div className="font-medium text-primary">{c.impact}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-sm">View full portfolio</Button>
            </CardContent>
          </Card>

          <div className="grid gap-4 content-start">
            {/* Skills */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Star className="size-4 text-primary" />
                  <CardTitle>Skills & credentials</CardTitle>
                </div>
                <CardDescription>Verified through mission participation and peer endorsement.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                {participantSkills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      {skill.verified
                        ? <BadgeCheck className="size-4 text-primary shrink-0" />
                        : <div className="size-4 shrink-0 rounded-full border-2 border-dashed border-muted-foreground" />
                      }
                      <div>
                        <div className="text-sm font-medium">{skill.name}</div>
                        <div className="text-xs text-muted-foreground">{skill.missions} missions</div>
                      </div>
                    </div>
                    <Badge variant={skill.verified ? "default" : "secondary"} className="text-xs shrink-0">
                      {skill.level}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full text-sm mt-1">Add a skill</Button>
              </CardContent>
            </Card>

            {/* Score detail */}
            <Card>
              <CardHeader>
                <CardTitle>Reputation breakdown</CardTitle>
                <CardDescription>What makes up your reputation score.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {[trust, participation, impact].map(({ label, score, detail, trend }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${score}%` }} />
                    </div>
                    <div className="w-8 text-right text-sm font-semibold tabular-nums">{score}</div>
                    <div className="w-28 text-xs text-muted-foreground truncate">{label}</div>
                    <Badge variant="outline" className="text-[10px] shrink-0">{trend}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ConsumerShell>
  );
}
