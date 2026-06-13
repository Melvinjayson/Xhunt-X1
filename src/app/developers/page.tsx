import { Code2, KeyRound, ShieldCheck, Webhook } from "lucide-react";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import { apiReference, externalDocs } from "@/components/xhunt-content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DevelopersPage() {
  return (
    <ConsumerShell title="Developer API" subtitle="Reference, auth model, webhook events, and local route capabilities.">
      <div className="grid gap-6">
        <section className="grid gap-4 lg:grid-cols-[1fr_380px]">
          <Card>
            <CardHeader>
              <Badge className="w-fit">API reference</Badge>
              <CardTitle className="text-3xl">Build with X-Hunt intelligence.</CardTitle>
              <CardDescription className="max-w-2xl text-base">
                The developer surface exposes recommendations, agent orchestration, trust, contribution,
                workspace features, timeline, messages, billing, and webhook provisioning.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-muted p-4 font-mono text-sm">
                curl -H &quot;Authorization: Bearer $XHUNT_API_KEY&quot; https://xhunt.app/api/recommendations
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4">
            {[
              { title: "Bearer auth", body: "Use scoped API keys and server-side requests.", icon: KeyRound },
              { title: "Signed webhooks", body: "Verify event signatures before processing alerts.", icon: Webhook },
              { title: "Risk controls", body: "Route proof, reputation, and reward decisions through confidence checks.", icon: ShieldCheck },
            ].map(({ title, body, icon: Icon }) => (
              <Card key={title}>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className="font-medium">{title}</div>
                    <div className="text-sm text-muted-foreground">{body}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Endpoint catalog</CardTitle>
            <CardDescription>Mapped from this project&apos;s available Next.js route handlers.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Method</TableHead>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiReference.map((item) => (
                  <TableRow key={item.endpoint}>
                    <TableCell><Badge variant={item.method === "GET" ? "secondary" : "default"}>{item.method}</Badge></TableCell>
                    <TableCell className="font-mono text-xs">{item.endpoint}</TableCell>
                    <TableCell>{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        </section>

        <Separator />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Code2 className="size-5" /> Response shape</CardTitle>
            <CardDescription>Use typed JSON and keep client secrets on the server.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-auto rounded-lg border bg-muted p-4 text-xs">{`{
  "mission": "Climate Action Sprint",
  "confidence": 94,
  "signals": ["proof", "trust", "contribution"],
  "alerts": [{ "type": "review", "severity": "high" }]
}`}</pre>
          </CardContent>
        </Card>
      </div>
    </ConsumerShell>
  );
}
