import { Bot, CheckCircle2, ShieldCheck } from "lucide-react";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import { agentBlueprints, constitutionChecks } from "@/components/xhunt-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AgentFoundryPage() {
  return (
    <ConsumerShell title="Agent Foundry" subtitle="Design, evaluate, govern, and deploy aligned AI agents for the X-Hunt ecosystem.">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <Badge className="w-fit gap-1"><Bot className="size-3" /> Agent constitution</Badge>
            <CardTitle className="text-3xl">Aligned agents, not isolated automation.</CardTitle>
            <CardDescription className="max-w-3xl text-base">
              Every agent declares purpose, authority, boundaries, objectives, anti-objectives,
              inputs, outputs, constraints, materiality impacts, and human oversight paths.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row">
            <Button>Draft agent specification</Button>
            <Button variant="outline">Run alignment review</Button>
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {agentBlueprints.map(({ name, purpose, boundary, icon: Icon }) => (
            <Card key={name}>
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                  <Icon className="size-5" />
                </div>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{purpose}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="rounded-lg border p-3 text-sm text-muted-foreground">{boundary}</div>
                <Badge variant="secondary" className="w-fit">Human oversight required</Badge>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="size-5" /> Mandatory deployment review</CardTitle>
            <CardDescription>No agent moves from design to deployment without these checks.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {constitutionChecks.map((check) => (
              <div key={check} className="flex items-center gap-2 rounded-lg border p-3 text-sm">
                <CheckCircle2 className="size-4 text-primary" />
                {check}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ConsumerShell>
  );
}
