import { Handshake, Scale, ShieldCheck, WalletCards } from "lucide-react";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import { economyPrimitives } from "@/components/xhunt-content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function EconomyPage() {
  return (
    <ConsumerShell title="Participation Economy" subtitle="Identity, contribution, trust, coordination, rewards, and governance.">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <Badge className="w-fit gap-1"><WalletCards className="size-3" /> Economic constitution</Badge>
            <CardTitle className="text-3xl">Contribution is the unit of value.</CardTitle>
            <CardDescription className="max-w-3xl text-base">
              X-Hunt records meaningful action as attributable contribution, evaluates trust
              contextually, and routes rewards through transparent governance.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Attribution", body: "Every output answers who contributed, how, and what role AI played.", icon: Handshake },
              { title: "Fair rewards", body: "Rewards follow verified impact, peer validation, and system-wide benefit.", icon: WalletCards },
              { title: "Auditability", body: "Governance provides appeal paths, review trails, and dispute resolution.", icon: Scale },
            ].map(({ title, body, icon: Icon }) => (
              <div key={title} className="rounded-lg border p-4">
                <Icon className="mb-4 size-5 text-primary" />
                <div className="font-medium">{title}</div>
                <div className="mt-2 text-sm text-muted-foreground">{body}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {economyPrimitives.map((item) => (
            <Card key={item.label}>
              <CardHeader>
                <CardTitle>{item.label}</CardTitle>
                <CardDescription>{item.value}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="size-5" /> Anti-objectives</CardTitle>
            <CardDescription>The economy must never optimize for attention capture, hidden ranking manipulation, reputation inflation, or extractive labor dynamics.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </ConsumerShell>
  );
}
