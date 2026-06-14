import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, CheckCircle2, Shield, Sparkles, TrendingUp, Users } from "lucide-react";
import { BrandMark } from "@/components/brand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const UNSPLASH = "https://images.unsplash.com";

function PreviewAuthNotice({ redirectHref }: { redirectHref: string }) {
  return (
    <div className="rounded-lg border border-dashed p-6 text-center">
      <p className="text-sm text-muted-foreground">Auth removed for preview build.</p>
      <Button render={<Link href={redirectHref} />} className="mt-4">
        Continue as preview user <ArrowRight className="ml-2 size-4" />
      </Button>
    </div>
  );
}

const consumerFeatures = [
  { icon: BadgeCheck, label: "Verified missions", body: "Join real challenges with proof built in — every completion is recorded.", color: "var(--primary)" },
  { icon: TrendingUp, label: "Reputation that travels", body: "Your track record follows you across every platform and employer.", color: "var(--color-sky)" },
  { icon: Sparkles, label: "Matched to you", body: "AI finds the best missions for your skills — not ads, not algorithms.", color: "var(--color-ai)" },
];

const workspaceFeatures = [
  { icon: Users, label: "Team management", body: "Invite team members with role-based access.", color: "var(--color-sky)" },
  { icon: Sparkles, label: "AI-assisted matching", body: "Automatically match contributors to missions.", color: "var(--color-ai)" },
  { icon: CheckCircle2, label: "Proof & reporting", body: "Verified outcomes with audit-ready evidence.", color: "var(--primary)" },
];

export function ConsumerSignupPanel() {
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[1fr_0.9fr]">
      {/* Auth form — left */}
      <section className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <BrandMark />
            <Badge className="mt-6 w-fit" variant="secondary">Consumer app</Badge>
            <CardTitle className="text-3xl">Join X-Hunt</CardTitle>
            <CardDescription>
              Complete missions, build your reputation, and earn rewards for real-world impact.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PreviewAuthNotice redirectHref="/home" />
            <p className="mt-4 text-xs text-muted-foreground">
              Free to join. Missions, proof submission, and your full contribution history included.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Image panel — right */}
      <section className="hidden lg:block relative overflow-hidden">
        <Image
          src={`${UNSPLASH}/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&h=1100&q=85`}
          alt="People completing missions together"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Gradient overlay — dark bottom for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        {/* Accent tint */}
        <div className="absolute inset-0 opacity-15" style={{ background: "var(--primary)" }} />

        {/* Content on top */}
        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <BrandMark />
          <div className="grid gap-4">
            <p className="text-xl font-semibold text-white leading-snug max-w-xs">
              Real missions. Real proof. A reputation that's yours forever.
            </p>
            <div className="grid gap-3">
              {consumerFeatures.map(({ icon: Icon, label, body, color }) => (
                <div key={label} className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklch, ${color} 20%, transparent)`, color }}>
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{label}</div>
                    <div className="text-xs text-white/60 mt-0.5">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function ConsumerSigninPanel() {
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[1fr_0.9fr]">
      {/* Auth form — left */}
      <section className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <BrandMark />
            <Badge className="mt-6 w-fit" variant="secondary">Welcome back</Badge>
            <CardTitle className="text-3xl">Sign in to X-Hunt</CardTitle>
            <CardDescription>
              Pick up where you left off — your missions and reputation are waiting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PreviewAuthNotice redirectHref="/home" />
            <div className="mt-4">
              <Button render={<Link href="/sign-up" />} variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                New to X-Hunt? Join free <ArrowRight className="size-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Image panel — right */}
      <section className="hidden lg:block relative overflow-hidden">
        <Image
          src={`${UNSPLASH}/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&h=1100&q=85`}
          alt="People doing meaningful work"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        <div className="absolute inset-0 opacity-10" style={{ background: "var(--color-sky)" }} />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="grid gap-3 max-w-sm">
            <div className="flex items-center gap-2">
              <Shield className="size-4" style={{ color: "var(--color-sky)" }} />
              <span className="text-sm text-white/80">Your data is yours — always portable</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="size-4" style={{ color: "var(--primary)" }} />
              <span className="text-sm text-white/80">All missions independently verified</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4" style={{ color: "var(--color-reward)" }} />
              <span className="text-sm text-white/80">Reputation grows with every mission</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function WorkspaceAuthPanel({ mode }: { mode: "sign-in" | "sign-up" }) {
  const signingUp = mode === "sign-up";

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[0.9fr_1.1fr]">
      {/* Image panel — left */}
      <section className="hidden lg:block relative overflow-hidden">
        <Image
          src={`${UNSPLASH}/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&h=1100&q=85`}
          alt="Teams coordinating real-world programmes"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <div className="absolute inset-0 opacity-15" style={{ background: "var(--color-ai)" }} />

        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <BrandMark />
          <div>
            <Badge className="mb-4 gap-1 border-white/20 bg-white/10 text-white">
              <Building2 className="size-3" /> For organisations
            </Badge>
            <h1 className="max-w-xs text-3xl font-semibold tracking-tight text-white leading-snug">
              Run programmes that prove their impact.
            </h1>
            <p className="mt-3 max-w-xs text-sm text-white/60">
              Set goals, verify outcomes, and report results — all in one workspace.
            </p>
            <div className="mt-6 grid gap-3">
              {workspaceFeatures.map(({ icon: Icon, label, body, color }) => (
                <div key={label} className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklch, ${color} 20%, transparent)`, color }}>
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{label}</div>
                    <div className="text-xs text-white/60 mt-0.5">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Auth form — right */}
      <section className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <BrandMark />
            <Badge className="mt-6 w-fit gap-1"><Building2 className="size-3" /> Workspace</Badge>
            <CardTitle className="pt-2 text-3xl">
              {signingUp ? "Create your workspace" : "Sign in to your workspace"}
            </CardTitle>
            <CardDescription>
              {signingUp
                ? "Start running verified participation programmes for your team or community."
                : "Access your missions, participants, and programme reports."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PreviewAuthNotice redirectHref="/workspace" />
            <div className="mt-4 flex flex-col gap-2">
              <Button render={<Link href={signingUp ? "/workspace/sign-in" : "/workspace/sign-up"} />} variant="ghost" size="sm" className="gap-1 justify-start text-muted-foreground">
                {signingUp ? "Already have a workspace? Sign in" : "New here? Create a workspace"} <ArrowRight className="size-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
