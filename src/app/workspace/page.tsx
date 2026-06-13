import Link from "next/link";
import { Activity, ArrowRight, Building2, Users, WalletCards } from "lucide-react";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import { MarketChart } from "@/components/dashboard/market-chart";
import { platformStats, workspaceModules } from "@/components/xhunt-content";
import { enterpriseReadiness, workspaceNextActions } from "@/lib/enterprise/readiness";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function WorkspacePage() {
  return (
    <ConsumerShell title="Enterprise workspace" subtitle="Portfolio monitoring, team workflows, API access, billing, and alert governance.">
      <div className="grid gap-6">
        <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <Card>
            <CardHeader>
              <Badge className="w-fit gap-1"><Building2 className="size-3" /> Workspace</Badge>
              <CardTitle className="text-3xl">Operate X-Hunt participation intelligence as a team.</CardTitle>
              <CardDescription className="max-w-2xl text-base">
                The workspace brings mission coordination, trust graph intelligence, agent workflows,
                rewards, developer access, billing, and governance into one enterprise-facing dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/workspace/sign-up">Create workspace <ArrowRight /></Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/developers">Review API</Link>
              </Button>
            </CardContent>
          </Card>
          <div className="grid gap-4">
            {[
              { label: "Team members", value: "24", icon: Users },
              { label: "Trust clusters", value: "186", icon: WalletCards },
              { label: "Active missions", value: "72", icon: Activity },
            ].map(({ label, value, icon: Icon }) => (
              <Card key={label}>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {workspaceModules.map(({ title, detail, href, icon: Icon }) => (
            <Card key={title}>
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                  <Icon className="size-5" />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{detail}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm">
                  <Link href={href}>Open</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <MarketChart />
          <Card>
            <CardHeader>
              <CardTitle>Next best actions</CardTitle>
              <CardDescription>High-impact setup tasks before an enterprise rollout.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {workspaceNextActions.map((action, index) => (
                <div key={action} className="flex items-center gap-3 rounded-lg border p-3">
                  <Badge variant="secondary">{index + 1}</Badge>
                  <div className="text-sm font-medium">{action}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Workspace health</CardTitle>
              <CardDescription>Operational metrics for the enterprise command center.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {platformStats.map(({ label, value, detail }) => (
                <div key={label} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-xs text-muted-foreground">{detail}</div>
                  </div>
                  <Badge>{value}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Enterprise readiness</CardTitle>
              <CardDescription>What is configured, what is in progress, and what still needs production hardening.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {enterpriseReadiness.map(({ title, status, detail, icon: Icon }) => (
                <div key={title} className="rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Icon className="size-4 text-primary" />
                      <div className="text-sm font-medium">{title}</div>
                    </div>
                    <Badge variant={status === "Configured" ? "default" : "secondary"}>{status}</Badge>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">{detail}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </ConsumerShell>
  );
}
