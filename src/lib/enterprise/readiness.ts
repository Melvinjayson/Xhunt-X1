import { BadgeCheck, Building2, KeyRound, ListChecks, LockKeyhole, Radar, ShieldCheck, Users } from "lucide-react";

export const enterpriseReadiness = [
  {
    title: "Identity and access",
    status: "Configured",
    detail: "Clerk sessions, sign-in, sign-up, and profile provisioning are the canonical auth path.",
    icon: LockKeyhole,
  },
  {
    title: "Workspace roles",
    status: "In progress",
    detail: "Tenant admins, mission creators, analysts, and participants need role-specific screens and actions.",
    icon: Users,
  },
  {
    title: "Audit trails",
    status: "In progress",
    detail: "Agent runs, governance decisions, reward changes, and trust updates should create reviewable records.",
    icon: ListChecks,
  },
  {
    title: "API governance",
    status: "Planned",
    detail: "Scoped API keys, signed webhooks, and rate-limit dashboards are still needed for enterprise developers.",
    icon: KeyRound,
  },
  {
    title: "Trust operations",
    status: "Configured",
    detail: "Trust, contribution, identity, matching, and XIL endpoints are modeled as first-class capabilities.",
    icon: ShieldCheck,
  },
  {
    title: "Observability",
    status: "Planned",
    detail: "System health, agent latency, failed workflows, and tenant-level usage need operational dashboards.",
    icon: Radar,
  },
];

export const onboardingSteps = [
  {
    title: "Create your identity",
    detail: "Confirm your profile, role, interests, skills, location context, and contribution preferences.",
    icon: BadgeCheck,
  },
  {
    title: "Choose your surface",
    detail: "Use Home for personal missions or Workspace for tenant operations and team workflows.",
    icon: Building2,
  },
  {
    title: "Set proof rules",
    detail: "Define what counts as contribution evidence, who can validate it, and when agents need approval.",
    icon: ShieldCheck,
  },
  {
    title: "Invite collaborators",
    detail: "Bring in teammates, reviewers, community operators, and developers with clear permission boundaries.",
    icon: Users,
  },
];

export const workspaceNextActions = [
  "Invite team members and assign tenant roles",
  "Create mission templates with proof requirements",
  "Connect developer API keys and webhook destinations",
  "Review Agent Foundry governance checks",
  "Turn on audit logs for trust, reward, and agent decisions",
];
