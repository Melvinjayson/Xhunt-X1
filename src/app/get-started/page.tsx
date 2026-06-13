import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BrandMark } from "@/components/brand";
import { onboardingSteps } from "@/lib/enterprise/readiness";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="flex flex-col justify-between gap-8">
          <div>
            <BrandMark />
            <Badge className="mt-8 w-fit" variant="secondary">Xeno AI onboarding</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Set up participation that can be trusted.</h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Before users land in the full product, X-Hunt should capture identity, intent, proof standards,
              and collaboration context. This page is the canonical onboarding destination after Clerk sign-up.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/home" />}>
              Continue to Home <ArrowRight />
            </Button>
            <Button render={<Link href="/workspace" />} variant="outline">
              Set up Workspace
            </Button>
          </div>
        </section>

        <section className="grid gap-4">
          {onboardingSteps.map(({ title, detail, icon: Icon }, index) => (
            <Card key={title}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex size-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Step {index + 1}</Badge>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{detail}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
          <Card>
            <CardContent className="flex items-center gap-3 p-4 text-sm text-muted-foreground">
              <CheckCircle2 className="size-5 text-primary" />
              Onboarding completion should update <span className="font-mono">user_profiles.onboarding_complete</span> and route users by <span className="font-mono">default_surface</span>.
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
