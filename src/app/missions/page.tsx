import Link from "next/link";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import { missionSignals } from "@/components/xhunt-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MissionsPage() {
  return (
    <ConsumerShell title="Mission queue" subtitle="Saved missions, proof reviews, and agent-assisted coordination tasks.">
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Watchlist missions</h1>
          <p className="mt-1 text-muted-foreground">Turn mission signals into proof review, contribution records, webhooks, and workspace tasks.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Signal queue</CardTitle>
            <CardDescription>Dashboard-01 style data table adapted to verified participation workflows.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mission</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Proof</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {missionSignals.map((mission) => (
                  <TableRow key={mission.name}>
                    <TableCell>
                      <div className="font-medium">{mission.name}</div>
                      <div className="font-mono text-xs text-muted-foreground">{mission.address}</div>
                    </TableCell>
                    <TableCell><Badge variant="secondary">{mission.signal}</Badge></TableCell>
                    <TableCell>{mission.confidence}</TableCell>
                    <TableCell>{mission.proof}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild size="sm" variant="outline">
                        <Link href="/mission-control">Review</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ConsumerShell>
  );
}
