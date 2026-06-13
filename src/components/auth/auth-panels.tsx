import Link from "next/link";
import { SignIn, SignUp } from "@clerk/nextjs";
import { ArrowRight, Building2, CheckCircle2, Sparkles, Users } from "lucide-react";
import { BrandMark } from "@/components/brand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const clerkAppearance = {
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none",
    card: "w-full border-0 bg-transparent p-0 shadow-none",
    header: "hidden",
    footer: "hidden",
    formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
    socialButtonsBlockButton: "border-border bg-background text-foreground",
    formFieldInput: "border-input bg-background text-foreground",
    formFieldLabel: "text-foreground",
    identityPreviewText: "text-foreground",
    formFieldAction: "text-primary",
  },
};

export function ConsumerSignupPanel() {
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[1fr_0.9fr]">
      <section className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <BrandMark />
            <Badge className="mt-6 w-fit" variant="secondary">Consumer app</Badge>
            <CardTitle className="text-3xl">Join the X-Hunt participation network</CardTitle>
            <CardDescription>Create your profile, complete missions, build reputation, and record verified contributions.</CardDescription>
          </CardHeader>
          <CardContent>
            <SignUp
              appearance={clerkAppearance}
              fallbackRedirectUrl="/get-started"
              signInUrl="/sign-in"
            />
            <p className="mt-4 text-sm text-muted-foreground">
              Participant access includes missions, proof submission, contribution history, and trust signals.
            </p>
          </CardContent>
        </Card>
      </section>
      <section className="hidden border-l bg-card/35 p-8 lg:flex lg:flex-col lg:justify-between">
        <BrandMark />
        <div className="grid gap-4">
          {[
            "AI-guided mission discovery",
            "Portable reputation and proof records",
            "Community impact and reward access",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg border bg-background p-4">
              <CheckCircle2 className="size-5 text-primary" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export function ConsumerSigninPanel() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <BrandMark />
          <Badge className="mt-6 w-fit" variant="secondary">Welcome back</Badge>
          <CardTitle className="text-3xl">Sign in to X-Hunt</CardTitle>
          <CardDescription>Continue to your missions, contribution ledger, and reputation profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignIn
            appearance={clerkAppearance}
            fallbackRedirectUrl="/home"
            signUpUrl="/sign-up"
          />
        </CardContent>
      </Card>
    </main>
  );
}

export function WorkspaceAuthPanel({ mode }: { mode: "sign-in" | "sign-up" }) {
  const signingUp = mode === "sign-up";

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[0.9fr_1.1fr]">
      <section className="hidden border-r bg-card/35 p-8 lg:flex lg:flex-col lg:justify-between">
        <BrandMark />
        <div>
          <Badge className="mb-4 gap-1"><Building2 className="size-3" /> Enterprise workspace</Badge>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight">
            Team intelligence for organizations, communities, and participation operators.
          </h1>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Coordinate missions, contributors, trust workflows, AI agents, rewards, and governance from one workspace.
          </p>
        </div>
        <div className="grid gap-3">
          {[
            { label: "Team roles", icon: Users },
            { label: "Agent workflows", icon: Sparkles },
            { label: "API and webhook access", icon: CheckCircle2 },
          ].map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 rounded-lg border bg-background p-4">
              <Icon className="size-5 text-primary" />
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <BrandMark />
            <CardTitle className="pt-6 text-3xl">{signingUp ? "Create workspace" : "Workspace sign in"}</CardTitle>
            <CardDescription>
              {signingUp ? "Start an enterprise workspace for verified participation operations." : "Access your enterprise command center."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {signingUp ? (
              <SignUp
                appearance={clerkAppearance}
                fallbackRedirectUrl="/get-started?surface=workspace"
                signInUrl="/workspace/sign-in"
              />
            ) : (
              <SignIn
                appearance={clerkAppearance}
                fallbackRedirectUrl="/workspace"
                signUpUrl="/workspace/sign-up"
              />
            )}
            <div className="mt-4 flex flex-col gap-2">
              <Button asChild variant="ghost">
                <Link href={signingUp ? "/workspace/sign-in" : "/workspace/sign-up"}>
                  {signingUp ? "Already have a workspace?" : "Create a workspace"} <ArrowRight />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
