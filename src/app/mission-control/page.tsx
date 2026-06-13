import { Bot, CheckCircle2, Clock, Radar, ShieldAlert, Sparkles } from "lucide-react";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import { MarketChart } from "@/components/dashboard/market-chart";
import { marketInsights, missionSignals, workspaceModules } from "@/components/xhunt-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MissionControlPage() {
  return (
    <ConsumerShell title="X-Hunt Intelligence Layer" subtitle="Agent handoffs, proof review, trust dynamics, and governance operations.">
      <div className="grid gap-6">
        <section className="grid gap-4 lg:grid-cols-[1fr_380px]">
          <Card>
            <CardHeader>
              <Badge className="w-fit gap-1"><Bot className="size-3" /> Agent control room</Badge>
              <CardTitle className="text-3xl">Coordinate scans, alerts, and confidence reviews.</CardTitle>
              <CardDescription className="text-base">
                Mission control turns verified participation into an operational workflow for organizations,
                communities, AI agents, API users, and governance reviewers.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {[
                ["Scan queue", "387"],
                ["Critical alerts", "12"],
                ["Risk reviews", "28"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border p-4">
                  <div className="text-3xl font-semibold">{value}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Operating modes</CardTitle>
              <CardDescription>Switch between discovery, risk, launch, and API activity.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {workspaceModules.slice(0, 4).map(({ title, detail, icon: Icon }) => (
                <div key={title} className="flex gap-3 rounded-lg border p-3">
                  <div className="flex size-8 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{title}</div>
                    <div className="text-xs text-muted-foreground">{detail}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <Tabs defaultValue="alerts">
          <TabsList>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="alerts">
            <div className="grid gap-4 lg:grid-cols-2">
              {missionSignals.map((mission) => (
                <Card key={mission.name}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle>{mission.name}</CardTitle>
                        <CardDescription>{mission.signal} - {mission.address}</CardDescription>
                      </div>
                      <Badge variant={mission.confidence === "Verified" ? "default" : "secondary"}>{mission.confidence}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between gap-3">
                    <div className="text-sm text-muted-foreground">Proof {mission.proof} - Participation {mission.participation}</div>
                    <Button size="sm" variant="outline">Review</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="agents">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: "Discovery Agent", body: "Finds missions, communities, and opportunity matches.", icon: Radar },
                { title: "Trust Guardian", body: "Reviews proof quality, disputes, and contextual reliability.", icon: ShieldAlert },
                { title: "Insight Analyst", body: "Summarizes contribution, trust, and impact intelligence.", icon: Sparkles },
              ].map(({ title, body, icon: Icon }) => (
                <Card key={title}>
                  <CardHeader>
                    <Icon className="mb-3 size-5 text-primary" />
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{body}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <Badge variant="secondary">Online</Badge>
                    <Button size="sm">Run</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="analytics">
            <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
              <MarketChart />
              <Card>
                <CardHeader>
                  <CardTitle>Review SLA</CardTitle>
                  <CardDescription>Operational commitments for alert queues.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {[
                    ["Critical", "Immediate", CheckCircle2],
                    ["High", "< 15 minutes", Clock],
                    ["Medium", "Daily digest", Clock],
                  ].map(([label, value, Icon]) => (
                    <div key={label as string} className="flex items-center justify-between rounded-lg border p-3">
                      <span className="flex items-center gap-2 text-sm"><Icon className="size-4" />{label as string}</span>
                      <Badge variant="secondary">{value as string}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ConsumerShell>
  );
}
