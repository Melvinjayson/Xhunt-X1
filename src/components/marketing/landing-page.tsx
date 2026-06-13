import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Building2,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Network,
  Scale,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { BrandMark } from "@/components/brand";
import {
  enterpriseOutcomes,
  marketingNav,
  outcomeCategories,
  platformStats,
  technologyPillars,
} from "@/components/xhunt-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const participationFlow = [
  { step: "Identity", description: "Verified profile, skills, and history.", icon: BadgeCheck },
  { step: "Participation", description: "Join missions matched to your context.", icon: Zap },
  { step: "Verification", description: "Submit proof. Earn auditable trust.", icon: Shield },
  { step: "Reputation", description: "Participation capital compounds over time.", icon: TrendingUp },
  { step: "Opportunity", description: "Unlock better matches, rewards, and roles.", icon: Sparkles },
];

const footerSections = [
  { heading: "Participation Network", links: ["How it works", "Mission types", "Verification", "Trust graph"] },
  { heading: "Trust Infrastructure", links: ["Reputation system", "Proof standards", "Governance", "Audit trail"] },
  { heading: "Impact Intelligence", links: ["XIL agents", "Outcome matching", "Community analytics", "Double materiality"] },
  { heading: "Developer Ecosystem", links: ["API reference", "Webhooks", "SDK", "Agent foundry"] },
];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <BrandMark />
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
            {marketingNav.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button render={<Link href="/workspace/sign-in" />} variant="ghost" size="sm">
              Workspace
            </Button>
            <Button render={<Link href="/sign-up" />} size="sm">
              Start participating
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto grid max-w-7xl min-h-[calc(100vh-4rem)] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1.5 text-xs">
            <span className="size-1.5 rounded-full bg-primary animate-pulse inline-block" />
            1,247 participants coordinating now
          </Badge>
          <h1 className="text-5xl font-semibold tracking-tight text-balance leading-[1.1] sm:text-6xl lg:text-7xl">
            Turn goals into<br />
            <span className="text-primary">verified outcomes.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-7 text-muted-foreground">
            The Participation Network where people, organizations, and AI coordinate real-world action, verify results, and reward impact.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/home" />} size="lg" className="gap-2">
              Start participating <ArrowRight className="size-4" />
            </Button>
            <Button render={<Link href="/workspace/sign-up" />} variant="outline" size="lg">
              Create a mission
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            {platformStats.slice(0, 2).map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span className="text-2xl font-semibold tabular-nums">{value}</span>
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Participation flow visualization */}
        <div className="relative">
          <div className="rounded-2xl border bg-card/50 p-6 shadow-xl backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Participation Economy</div>
                <div className="text-xs text-muted-foreground">How X-Hunt creates lasting value</div>
              </div>
              <Badge className="gap-1 text-xs"><Sparkles className="size-3" /> Live</Badge>
            </div>
            <div className="grid gap-3">
              {participationFlow.map(({ step, description, icon: Icon }, i) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="relative flex flex-col items-center">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </div>
                    {i < participationFlow.length - 1 && (
                      <div className="mt-1 h-4 w-px bg-border" />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className="text-sm font-semibold">{step}</div>
                    <div className="text-xs text-muted-foreground">{description}</div>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { value: "2.4M", label: "Verified outcomes" },
                { value: "84%", label: "Trust score avg" },
                { value: "94%", label: "Human-auditable" },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-lg bg-background/60 px-2 py-3">
                  <div className="text-lg font-semibold tabular-nums">{value}</div>
                  <div className="text-[11px] text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-primary/5" />
        </div>
      </section>

      {/* Platform stats bar */}
      <section className="border-y bg-card/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4">
          {platformStats.map(({ label, value, detail, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
              <div>
                <div className="text-xl font-semibold tabular-nums">{value}</div>
                <div className="text-xs text-muted-foreground">{detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Outcome categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10">
          <Badge variant="outline" className="mb-4">Where participation happens</Badge>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Every domain where collective action creates measurable change.
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            From local community action to global research initiatives — X-Hunt coordinates participation across the full spectrum of human outcomes.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {outcomeCategories.map(({ label, description, count, icon }) => (
            <Link href="/explore" key={label}>
              <Card className="group h-full transition-colors hover:border-primary/50 hover:bg-card/80">
                <CardHeader className="pb-3">
                  <div className="text-2xl mb-2">{icon}</div>
                  <CardTitle className="text-base">{label}</CardTitle>
                  <CardDescription className="text-xs leading-relaxed">{description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary font-medium">{count}</span>
                    <ChevronRight className="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {/* CTA card */}
          <Card className="flex flex-col items-start justify-between border-dashed bg-transparent p-6">
            <div>
              <div className="mb-2 text-sm font-medium">Create a new category</div>
              <p className="text-xs text-muted-foreground">Have a mission type we haven't covered? Propose it to the community.</p>
            </div>
            <Button render={<Link href="/sign-up" />} variant="outline" size="sm" className="mt-4 gap-1.5">
              Propose <ArrowRight className="size-3" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Reputation layer */}
      <section className="border-y bg-card/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="mb-4">Participation capital</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Your reputation compounds with every verified action.
            </h2>
            <p className="mt-4 text-muted-foreground">
              X-Hunt builds three distinct reputation scores that reflect who you are, what you do, and what changes because of you.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                { icon: Shield, label: "Trust Score", detail: "Verification rate, peer endorsements, and governance history. Portably yours.", score: "84" },
                { icon: TrendingUp, label: "Participation Score", detail: "Consistency, quality, and completion rate across every mission.", score: "92" },
                { icon: Globe2, label: "Impact Score", detail: "Measured real-world change generated by your contributions.", score: "71" },
              ].map(({ icon: Icon, label, detail, score }) => (
                <div key={label} className="flex items-start gap-4 rounded-xl border bg-background p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{label}</span>
                      <span className="text-lg font-semibold tabular-nums text-primary">{score}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 content-start">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bot className="size-4 text-primary" />
                  <CardTitle className="text-base">Community Intelligence</CardTitle>
                </div>
                <CardDescription>
                  How AI coordinates participation without replacing human judgment.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {[
                  { title: "AI-powered matching", body: "Your skills, context, and reputation guide mission recommendations — not ads or algorithms optimizing for clicks." },
                  { title: "Proof verification", body: "Agents review submission quality, flag inconsistencies, and escalate edge cases to human governance." },
                  { title: "Trust graph modeling", body: "Every interaction strengthens a cross-domain trust graph that belongs to you, not the platform." },
                  { title: "Human oversight", body: "Every AI decision is traceable, auditable, and reversible by community governance." },
                ].map(({ title, body }) => (
                  <div key={title} className="flex gap-3 rounded-lg border bg-card/50 p-3">
                    <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-primary" />
                    <div>
                      <div className="text-sm font-medium">{title}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{body}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enterprise section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Badge variant="outline" className="mb-4"><Building2 className="size-3 mr-1" /> For organizations</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Coordinate outcomes.<br />Not campaigns.
            </h2>
            <p className="mt-4 text-muted-foreground">
              X-Hunt gives teams and organizations the infrastructure to run verified participation programs — with real accountability and measurable results.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "Define missions with clear proof requirements",
                "Coordinate contributors with AI-assisted matching",
                "Verify outcomes with auditable evidence",
                "Measure impact with double materiality metrics",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="size-4 shrink-0 text-primary" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Button render={<Link href="/workspace/sign-up" />} size="lg">
                Create a workspace <ArrowRight className="size-4" />
              </Button>
              <Button render={<Link href="/developers" />} variant="outline" size="lg">
                API docs
              </Button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {enterpriseOutcomes.map(({ metric, label, context }) => (
              <Card key={label}>
                <CardHeader className="pb-2">
                  <div className="text-3xl font-semibold tabular-nums text-primary">{metric}</div>
                  <CardTitle className="text-base">{label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{context}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform pillars */}
      <section className="border-t bg-card/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Built on six platform layers</h2>
            <p className="mt-2 text-sm text-muted-foreground">Every feature strengthens one of these foundational domains.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {technologyPillars.map(({ title, body, icon: Icon }) => (
              <div key={title} className="flex gap-4 rounded-xl border bg-background p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{title}</div>
                  <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Infrastructure for participation.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join the network where every verified action builds your reputation, strengthens your community, and creates measurable impact.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button render={<Link href="/sign-up" />} size="lg" className="gap-2">
              Start participating <ArrowRight className="size-4" />
            </Button>
            <Button render={<Link href="/workspace/sign-up" />} variant="outline" size="lg">
              Run a mission program
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5"><BadgeCheck className="size-4 text-primary" /> Verified outcomes</div>
            <div className="flex items-center gap-1.5"><Network className="size-4 text-primary" /> Portable reputation</div>
            <div className="flex items-center gap-1.5"><Scale className="size-4 text-primary" /> Human governance</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-1">
              <BrandMark />
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                The operating system for verified participation. Built for people, organizations, communities, and AI agents.
              </p>
            </div>
            {footerSections.map(({ heading, links }) => (
              <div key={heading}>
                <div className="text-sm font-semibold mb-3">{heading}</div>
                <ul className="grid gap-2">
                  {links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
            <div>© 2026 X-Hunt. Participation Network.</div>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/developers" className="hover:text-foreground transition-colors">Developers</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
