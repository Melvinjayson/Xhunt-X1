import Link from "next/link";
import { ArrowRight, BellRing, Eye, ShieldCheck, WalletCards } from "lucide-react";
import { MarketChart } from "@/components/dashboard/market-chart";
import { marketInsights, missionSignals, platformStats } from "@/components/xhunt-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ConsumerHome() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <Badge className="mb-3 w-fit">Live network</Badge>
                <CardTitle className="text-3xl tracking-tight">AI-ranked participation opportunities</CardTitle>
                <CardDescription className="mt-2 max-w-2xl text-base">
                  Coordinate missions, proof events, contributor activity, trust state, and governance review from one dashboard.
                </CardDescription>
              </div>
              <Button asChild>
                <Link href="/mission-control">Open control room <ArrowRight /></Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Proof</TableHead>
                  <TableHead>Participation</TableHead>
                  <TableHead>Confidence</TableHead>
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
                    <TableCell>{mission.age}</TableCell>
                    <TableCell>{mission.proof}</TableCell>
                    <TableCell>{mission.participation}</TableCell>
                    <TableCell>
                      <Badge variant={mission.confidence === "Verified" ? "default" : "secondary"}>{mission.confidence}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{mission.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-4">
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

      <section className="grid gap-4 lg:grid-cols-[1fr_420px]">
        <MarketChart />
        <Card>
          <CardHeader>
            <CardTitle>Alert configuration</CardTitle>
            <CardDescription>Critical, high, medium, and digest channels mapped to your watchlist.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {[
              { label: "Critical alerts", value: "Immediate", icon: BellRing },
              { label: "Contribution routing", value: "High trust only", icon: WalletCards },
              { label: "Proof filter", value: "Verification required", icon: ShieldCheck },
              { label: "Coordination mode", value: "Mission and community loops", icon: Eye },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                    <Icon className="size-4" />
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
                <Badge variant="secondary">{value}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {marketInsights.map(({ title, body, metric, label, confidence, icon: Icon }) => (
          <Card key={title}>
            <CardHeader>
              <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <Icon className="size-5" />
              </div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{body}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-semibold">{metric}</div>
                <div className="text-xs uppercase text-muted-foreground">{label}</div>
              </div>
              <Badge variant={confidence === "High" ? "default" : "secondary"}>{confidence}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
