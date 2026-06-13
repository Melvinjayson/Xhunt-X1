import { BellRing, Bot, ShieldCheck } from "lucide-react";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MessagesPage() {
  return (
    <ConsumerShell title="Alerts and messages" subtitle="AI notes, proof reviews, mission alerts, and workspace notifications.">
      <div className="grid gap-4">
        {[
          { title: "Climate Action Sprint needs review", body: "Proof activity increased while partner validation is still pending.", icon: BellRing, tag: "Critical" },
          { title: "Trust Guardian review complete", body: "Contribution claims passed evidence checks. One dispute path remains open.", icon: ShieldCheck, tag: "Review" },
          { title: "Insight Analyst digest", body: "Community missions gained verified value through the last coordination window.", icon: Bot, tag: "Digest" },
        ].map(({ title, body, icon: Icon, tag }) => (
          <Card key={title}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="flex size-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{body}</CardDescription>
                  </div>
                </div>
                <Badge>{tag}</Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">2 minutes ago</CardContent>
          </Card>
        ))}
      </div>
    </ConsumerShell>
  );
}
