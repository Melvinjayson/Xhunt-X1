import Image from "next/image";
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
  Quote,
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

const UNSPLASH = "https://images.unsplash.com";

const participationFlow = [
  { step: "Create your profile", description: "Add your skills and experience — takes 2 minutes.", icon: BadgeCheck },
  { step: "Find a mission", description: "Find and join missions that suit you.", icon: Zap },
  { step: "Show your work", description: "Submit what you did. We check it's real.", icon: Shield },
  { step: "Build your record", description: "Your track record grows with every mission.", icon: TrendingUp },
  { step: "Get better opportunities", description: "Better opportunities find you automatically.", icon: Sparkles },
];

const domainColorMap: Record<string, string> = {
  energy:  "var(--color-energy)",
  reward:  "var(--color-reward)",
  primary: "var(--primary)",
  rose:    "var(--color-rose)",
  ai:      "var(--color-ai)",
  sky:     "var(--color-sky)",
};

const domainGlowMap: Record<string, string> = {
  energy:  "card-glow-energy",
  reward:  "card-glow-reward",
  primary: "card-glow-primary",
  rose:    "card-glow-rose",
  ai:      "card-glow-ai",
  sky:     "card-glow-sky",
};

const testimonials = [
  {
    quote: "I completed a climate mission near me and got a certificate that actually helped me land a volunteer coordinator role.",
    name: "Amara T.",
    role: "Community organiser, Bristol",
    avatar: "photo-1531746020798-e6953c6e8e04",
  },
  {
    quote: "We ran a workforce training programme through X-Hunt and could finally show our funders real proof of impact.",
    name: "Kieran M.",
    role: "Programme lead, Skills Forward",
    avatar: "photo-1507003211169-0a1dd7228f2d",
  },
  {
    quote: "My trust score opened doors I didn't expect — companies started reaching out to me instead of the other way round.",
    name: "Priya S.",
    role: "Freelance researcher",
    avatar: "photo-1494790108377-be9c29b29330",
  },
];

const footerSections = [
  { heading: "How it works", links: ["How to join", "Mission types", "How we verify", "Your reputation"] },
  { heading: "Trust & safety", links: ["Reliability system", "How we verify", "Community rules", "Transparency"] },
  { heading: "What X-Hunt does", links: ["How AI helps", "Impact tracking", "Community analytics", "Reward system"] },
  { heading: "Build with us", links: ["API reference", "Webhooks", "SDK", "Developer docs"] },
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
              For organisations
            </Button>
            <Button render={<Link href="/sign-up" />} size="sm">
              Find your first mission
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-grid relative mx-auto grid max-w-7xl min-h-[calc(100vh-4rem)] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        {/* Radial glow accents */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/4 size-96 rounded-full opacity-20 blur-3xl" style={{ background: "var(--color-ai)" }} />
          <div className="absolute bottom-0 right-0 size-80 rounded-full opacity-15 blur-3xl" style={{ background: "var(--primary)" }} />
        </div>

        <div className="relative">
          <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1.5 text-xs">
            <span className="size-1.5 rounded-full bg-primary animate-pulse inline-block" />
            1,247 people completing missions right now
          </Badge>
          <h1 className="text-5xl font-semibold tracking-tight text-balance leading-[1.1] sm:text-6xl lg:text-7xl">
            Do real things.<br />
            <span className="gradient-text">Get credit for it.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-7 text-muted-foreground">
            Join missions in your community, show what you did, and earn a record of your real-world impact — portable and always yours.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/home" />} size="lg" className="gap-2">
              Find your first mission <ArrowRight className="size-4" />
            </Button>
            <Button render={<Link href="/workspace/sign-up" />} variant="outline" size="lg">
              Run a mission programme
            </Button>
          </div>

          {/* Social proof stats */}
          <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            {platformStats.slice(0, 2).map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span className="text-2xl font-semibold tabular-nums">{value}</span>
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Participation flow card */}
        <div className="relative">
          <div className="rounded-2xl border bg-card/50 p-6 shadow-xl backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">How X-Hunt works</div>
                <div className="text-xs text-muted-foreground">From sign-up to real impact in 5 steps</div>
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
                { value: "2.4M", label: "Completed missions" },
                { value: "84%", label: "Avg reliability score" },
                { value: "94%", label: "AI reviewed by humans" },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-lg bg-background/60 px-2 py-3">
                  <div className="text-lg font-semibold tabular-nums">{value}</div>
                  <div className="text-[11px] text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-primary/5" />
        </div>
      </section>

      {/* Platform stats bar */}
      <section className="border-y" style={{ background: "linear-gradient(to right, color-mix(in oklch, var(--color-ai) 5%, transparent), var(--card) 40%, color-mix(in oklch, var(--primary) 5%, transparent))" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4">
          {platformStats.map(({ label, value, detail, icon: Icon }, i) => {
            const colors = ["var(--primary)", "var(--color-sky)", "var(--color-ai)", "var(--color-reward)"];
            const c = colors[i] ?? "var(--primary)";
            return (
              <div key={label} className="flex items-center gap-3 px-4 py-5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklch, ${c} 12%, transparent)`, color: c }}>
                  <Icon className="size-4" />
                </div>
                <div>
                  <div className="text-xl font-semibold tabular-nums">{value}</div>
                  <div className="text-xs text-muted-foreground">{detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Outcome categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10">
          <Badge variant="outline" className="mb-4">What you can do</Badge>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Pick the area that matters to you.
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            From local volunteering to global research — there&apos;s a mission for everyone.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {outcomeCategories.map(({ label, description, count, color, image }) => {
            const domainColor = domainColorMap[color] ?? "var(--primary)";
            const glowClass = domainGlowMap[color] ?? "card-glow-primary";
            return (
              <Link href="/explore" key={label}>
                <div className={`group relative h-52 overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 ${glowClass}`}>
                  {/* Background image */}
                  <Image
                    src={`${UNSPLASH}/${image}?auto=format&fit=crop&w=400&q=75`}
                    alt={label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  {/* Domain colour tint */}
                  <div className="absolute inset-0 opacity-20" style={{ background: domainColor }} />
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="text-sm font-semibold text-white">{label}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/70">{description}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-medium" style={{ color: domainColor }}>{count}</span>
                      <ChevronRight className="size-3.5 text-white/60 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          {/* CTA card */}
          <div className="flex flex-col items-start justify-between rounded-2xl border border-dashed bg-transparent p-6 h-52">
            <div>
              <div className="mb-2 text-sm font-medium">Suggest a new category</div>
              <p className="text-xs text-muted-foreground">Have a mission type we haven&apos;t covered? Propose it to the community.</p>
            </div>
            <Button render={<Link href="/sign-up" />} variant="outline" size="sm" className="mt-4 gap-1.5">
              Propose <ArrowRight className="size-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* Reputation layer */}
      <section className="border-y" style={{ background: "linear-gradient(to right, color-mix(in oklch, var(--color-sky) 5%, transparent), var(--card) 50%, color-mix(in oklch, var(--color-reward) 5%, transparent))" }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="mb-4">Your track record</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Every mission you complete builds your reputation.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We track three things that show who you are and what you&apos;ve done — all verifiable, all portable.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                { icon: Shield, label: "Reliability", detail: "How consistent and trustworthy others find you.", score: "84", color: "var(--color-sky)" },
                { icon: TrendingUp, label: "Activity", detail: "How often and how well you show up.", score: "92", color: "var(--primary)" },
                { icon: Globe2, label: "Real-world change", detail: "What's actually changed because of your contributions.", score: "71", color: "var(--color-reward)" },
              ].map(({ icon: Icon, label, detail, score, color }) => (
                <div key={label} className="flex items-start gap-4 rounded-xl border bg-background p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklch, ${color} 12%, transparent)`, color }}>
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{label}</span>
                      <span className="text-lg font-semibold tabular-nums" style={{ color }}>{score}</span>
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
                  <Bot className="size-4" style={{ color: "var(--color-ai)" }} />
                  <CardTitle className="text-base">AI that works for you</CardTitle>
                </div>
                <CardDescription>
                  Smart matching and verification — with humans always in the loop.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {[
                  { title: "Matched to you", body: "Your skills and experience guide what you see — not ads or engagement tricks.", color: "var(--color-ai)" },
                  { title: "We check it's real", body: "AI reviews what you submit, flags anything unusual, and passes edge cases to real people.", color: "var(--primary)" },
                  { title: "Your network, your data", body: "Every connection you make is yours to keep — not locked in to our platform.", color: "var(--color-sky)" },
                  { title: "Always reviewed by people", body: "Every AI decision is traceable and can be appealed by the community.", color: "var(--color-rose)" },
                ].map(({ title, body, color }) => (
                  <div key={title} className="flex gap-3 rounded-lg border bg-card/50 p-3">
                    <CheckCircle2 className="size-4 mt-0.5 shrink-0" style={{ color }} />
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
            <Badge variant="outline" className="mb-4"><Building2 className="size-3 mr-1" /> For organisations</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Coordinate outcomes.<br />Not campaigns.
            </h2>
            <p className="mt-4 text-muted-foreground">
              X-Hunt gives teams and organisations the tools to run verified participation programmes — with real accountability and proof that it worked.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                { text: "Set clear goals with proof built in", color: "var(--primary)" },
                { text: "Match contributors automatically with AI", color: "var(--color-ai)" },
                { text: "Get proof your programme actually worked", color: "var(--color-sky)" },
                { text: "Report financial and social impact — in one place", color: "var(--color-reward)" },
              ].map(({ text, color }) => (
                <div key={text} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="size-4 shrink-0" style={{ color }} />
                  {text}
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Button render={<Link href="/workspace/sign-up" />} size="lg">
                Set up your workspace <ArrowRight className="size-4" />
              </Button>
              <Button render={<Link href="/developers" />} variant="outline" size="lg">
                API docs
              </Button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {enterpriseOutcomes.map(({ metric, label, context }, i) => {
              const colors = ["var(--primary)", "var(--color-sky)", "var(--color-rose)", "var(--color-reward)"];
              const c = colors[i] ?? "var(--primary)";
              return (
                <Card key={label}>
                  <CardHeader className="pb-2">
                    <div className="text-3xl font-semibold tabular-nums" style={{ color: c }}>{metric}</div>
                    <CardTitle className="text-base">{label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{context}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform pillars — bento-style */}
      <section className="border-t bg-card/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">How X-Hunt works under the hood</h2>
            <p className="mt-2 text-sm text-muted-foreground">Six things that make verified participation possible.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {technologyPillars.map(({ title, body, icon: Icon }, i) => {
              const colors = ["var(--color-sky)", "var(--primary)", "var(--color-ai)", "var(--color-reward)", "var(--color-rose)", "var(--color-sky)"];
              const c = colors[i] ?? "var(--primary)";
              return (
                <div key={title} className="flex gap-4 rounded-xl border bg-background p-5 transition-colors hover:border-border/80">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklch, ${c} 12%, transparent)`, color: c }}>
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{title}</div>
                    <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{body}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <Badge variant="outline" className="mb-4">Real people, real results</Badge>
          <h2 className="text-2xl font-semibold tracking-tight">What participants say</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map(({ quote, name, role, avatar }, i) => {
            const colors = ["var(--color-sky)", "var(--primary)", "var(--color-ai)"];
            const c = colors[i] ?? "var(--primary)";
            return (
              <Card key={name} className="relative">
                <CardContent className="pt-6">
                  <Quote className="size-5 mb-3 opacity-40" style={{ color: c }} />
                  <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{quote}&rdquo;</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="relative size-9 overflow-hidden rounded-full border">
                      <Image
                        src={`${UNSPLASH}/${avatar}?auto=format&fit=crop&w=80&h=80&q=80`}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="36px"
                        unoptimized
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{name}</div>
                      <div className="text-xs text-muted-foreground">{role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 text-center">
        <div className="relative mx-auto max-w-2xl rounded-3xl border p-10 overflow-hidden" style={{ background: "linear-gradient(135deg, color-mix(in oklch, var(--color-ai) 8%, var(--card)), color-mix(in oklch, var(--primary) 8%, var(--card)))" }}>
          <div className="pointer-events-none absolute inset-0 hero-grid opacity-30" />
          <div className="relative">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Ready to start?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Complete missions. Prove your impact. Build a reputation that goes with you everywhere.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button render={<Link href="/sign-up" />} size="lg" className="gap-2">
                Find your first mission <ArrowRight className="size-4" />
              </Button>
              <Button render={<Link href="/workspace/sign-up" />} variant="outline" size="lg">
                Run a mission programme
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1.5"><BadgeCheck className="size-4" style={{ color: "var(--primary)" }} /> Real proof</div>
              <div className="flex items-center gap-1.5"><Network className="size-4" style={{ color: "var(--color-sky)" }} /> Reputation that&apos;s yours</div>
              <div className="flex items-center gap-1.5"><Scale className="size-4" style={{ color: "var(--color-ai)" }} /> Always human oversight</div>
            </div>
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
                Complete real missions. Build a reputation that opens doors. Join people making a genuine difference.
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
            <div>© 2026 X-Hunt. All rights reserved.</div>
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
