import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Copy, Radio, Sparkles } from "lucide-react";
import { BrandMark } from "@/components/brand";
import {
  externalDocs,
  economyPrimitives,
  marketInsights,
  marketingNav,
  missionSignals,
  platformStats,
  roadmapItems,
  technologyPillars,
} from "@/components/xhunt-content";
import { MarketChart } from "@/components/dashboard/market-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <BrandMark />
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
            {marketingNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/workspace/sign-in">Workspace sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/sign-up">Join network</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="max-w-2xl">
          <Badge variant="secondary" className="mb-5 gap-1">
            <Radio className="size-3.5" />
            Verified participation operating system
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Transform goals into verified outcomes.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            X-Hunt coordinates people, communities, organizations, and AI agents through missions,
            proof, contribution records, portable reputation, and auditable trust systems.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/home">Open participant app <ArrowRight /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/developers">Developer API <Copy /></Link>
            </Button>
          </div>
          <Card className="mt-8 max-w-xl">
            <CardHeader>
              <CardTitle>Participation economy constitution</CardTitle>
              <CardDescription>Identity, contribution, trust, coordination, governance, and impact are the platform primitives.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-muted p-3 font-mono text-sm text-muted-foreground">proof - trust - contribution - coordination</div>
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Participation intelligence layer</CardTitle>
                <CardDescription>Last updated 10:23:45 - 1,247 active participants - 387 outcomes processed</CardDescription>
              </div>
              <Badge className="gap-1"><Sparkles className="size-3" /> Live</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mission</TableHead>
                  <TableHead>Proof</TableHead>
                  <TableHead>Participation</TableHead>
                  <TableHead>Trust signal</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {missionSignals.map((mission) => (
                  <TableRow key={mission.name}>
                    <TableCell>
                      <div className="font-medium">{mission.name}</div>
                      <div className="truncate font-mono text-xs text-muted-foreground">{mission.address}</div>
                    </TableCell>
                    <TableCell>{mission.proof}</TableCell>
                    <TableCell>{mission.participation}</TableCell>
                    <TableCell><Badge variant="secondary">{mission.signal}</Badge></TableCell>
                    <TableCell className="text-right">{mission.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section className="border-y bg-card/35">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-6 sm:px-6 lg:grid-cols-4">
          {platformStats.map(({ label, value, detail, icon: Icon }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <div className="text-2xl font-semibold">{value}</div>
                  <div className="text-xs text-muted-foreground">{label} - {detail}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Badge variant="outline">Participation insights</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Identity, trust, contribution, and agent coordination in one system.</h2>
          <p className="mt-3 text-muted-foreground">
            The interface now reflects X-Hunt&apos;s platform constitution: meaningful participation,
            verifiable outcomes, portable reputation, human oversight, and double materiality.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {marketInsights.map(({ title, source, metric, label, confidence, body, icon: Icon }) => (
            <Card key={title}>
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                  <Icon className="size-5" />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{body}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-2xl font-semibold">{metric}</div>
                  <div className="text-xs uppercase text-muted-foreground">{label}</div>
                </div>
                <Badge variant={confidence === "High" ? "default" : "secondary"}>{confidence}</Badge>
                <span className="sr-only">{source}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <MarketChart />
        <Card>
          <CardHeader>
            <CardTitle>Core technology</CardTitle>
            <CardDescription>Multi-dimensional data analysis powering confidence scores and alerts.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {technologyPillars.map(({ title, body, icon: Icon }) => (
              <div key={title} className="flex gap-3 rounded-lg border p-3">
                <div className="flex size-9 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                  <Icon className="size-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">{title}</div>
                  <div className="text-xs text-muted-foreground">{body}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section id="participation-economy" className="border-y bg-card/35">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <Badge className="w-fit gap-1"><Clock className="size-3" /> Participation economy</Badge>
              <CardTitle className="text-3xl">Protocol primitives and ecosystem readiness</CardTitle>
              <CardDescription>
                X-Hunt is designed as a decentralized participation economy where verified contribution becomes native value.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-4 gap-3">
                {["Days", "Hours", "Minutes", "Seconds"].map((unit) => (
                  <div key={unit} className="rounded-lg border bg-background p-4 text-center">
                    <div className="text-3xl font-semibold">00</div>
                    <div className="text-xs text-muted-foreground">{unit}</div>
                  </div>
                ))}
              </div>
              <Button asChild>
                <Link href="/sign-up">Join the network <CheckCircle2 /></Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Economic primitives</CardTitle>
              <CardDescription>The system captures who acted, what value was created, who can be trusted, and what changed.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {economyPrimitives.map((item) => (
                <div key={item.label} className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                  <div className="mt-1 font-semibold">{item.value}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="outline">Documentation</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Docs, API, identity, contribution, agents, governance, and webhooks.</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/developers">Open developer reference</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {externalDocs.map(({ title, body, icon: Icon }) => (
            <Card key={title}>
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                  <Icon className="size-5" />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <Separator className="my-10" />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {roadmapItems.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg border p-3 text-sm">
              <CheckCircle2 className="size-4 text-primary" />
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
