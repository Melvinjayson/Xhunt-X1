import Link from "next/link";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import { missionSignals } from "@/components/xhunt-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function MissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mission = missionSignals.find((item) => item.name.toLowerCase().replaceAll(" ", "-") === id) ?? missionSignals[0];

  return (
    <ConsumerShell title={`${mission.name} review`} subtitle="Mission proof, trust dynamics, and contribution evidence.">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{mission.name}</CardTitle>
          <CardDescription>{mission.signal} - {mission.address}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          {[
            ["Proof", mission.proof],
            ["Participation", mission.participation],
            ["Partners", mission.partners],
            ["Confidence", mission.confidence],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">{label}</div>
              <div className="mt-1 text-xl font-semibold">{value}</div>
            </div>
          ))}
          <div className="md:col-span-4">
            <Button render={<Link href="/mission-control" />}>
              Open in mission control
            </Button>
          </div>
        </CardContent>
      </Card>
    </ConsumerShell>
  );
}
