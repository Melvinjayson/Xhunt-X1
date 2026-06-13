import { Award, BadgeCheck, BellRing, WalletCards } from "lucide-react";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <ConsumerShell title="Profile" subtitle="Identity, reputation, contribution history, and alert configuration.">
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <Card>
          <CardHeader className="items-center text-center">
            <Avatar className="size-20">
              <AvatarFallback className="text-xl">XH</AvatarFallback>
            </Avatar>
            <CardTitle>X-Hunt Participant</CardTitle>
            <CardDescription>Verified contributor - portable reputation active</CardDescription>
            <Badge className="gap-1"><BadgeCheck className="size-3" /> Verified</Badge>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Manage identity and trust settings</Button>
          </CardContent>
        </Card>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Contributions", "42", WalletCards],
            ["Alerts sent", "186", BellRing],
            ["Tier", "Early", Award],
          ].map(([label, value, Icon]) => (
            <Card key={label as string}>
              <CardContent className="p-5">
                <Icon className="mb-4 size-5 text-primary" />
                <div className="text-3xl font-semibold">{value as string}</div>
                <div className="text-sm text-muted-foreground">{label as string}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ConsumerShell>
  );
}
