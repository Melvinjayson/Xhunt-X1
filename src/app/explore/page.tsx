import Link from "next/link";
import { Filter, Search } from "lucide-react";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import { marketInsights, missionSignals } from "@/components/xhunt-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ExplorePage() {
  return (
    <ConsumerShell title="Explore opportunities" subtitle="Browse missions, communities, contribution paths, and trust signals.">
      <div className="grid gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Explore participation signals</h1>
            <p className="mt-1 text-muted-foreground">Search by mission, contributor, community, proof type, or impact narrative.</p>
          </div>
          <Button variant="outline"><Filter /> Filters</Button>
        </div>
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search climate missions, creator guilds, trust reviews" />
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {missionSignals.map((mission) => (
            <Card key={mission.name}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle>{mission.name}</CardTitle>
                    <CardDescription className="font-mono">{mission.address}</CardDescription>
                  </div>
                  <Badge>{mission.score}</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-md border p-3"><div className="text-muted-foreground">Proof</div><div className="font-medium">{mission.proof}</div></div>
                  <div className="rounded-md border p-3"><div className="text-muted-foreground">Participation</div><div className="font-medium">{mission.participation}</div></div>
                </div>
                <Badge variant="secondary" className="w-fit">{mission.signal}</Badge>
                <Button asChild variant="outline">
                  <Link href="/mission-control">Send to review</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {marketInsights.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </ConsumerShell>
  );
}
