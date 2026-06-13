import {
  Activity,
  BadgeCheck,
  BellRing,
  Bot,
  Brain,
  BriefcaseBusiness,
  Code2,
  Compass,
  Gauge,
  GitBranch,
  Globe2,
  HeartHandshake,
  LineChart,
  Network,
  Radar,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  WalletCards,
  Webhook,
} from "lucide-react";

export const marketingNav = [
  { href: "/home", label: "Participant app" },
  { href: "/mission-control", label: "Intelligence layer" },
  { href: "/workspace", label: "Workspace" },
  { href: "/developers", label: "API docs" },
];

export const missionSignals = [
  {
    name: "Climate Action Sprint",
    age: "Active now",
    address: "mission_impact_7f3a",
    proof: "18 proofs",
    participation: "412 participants",
    partners: "6 partners",
    signal: "High trust density",
    confidence: "Verified",
    score: 94,
  },
  {
    name: "Creator Skill Guild",
    age: "2h review",
    address: "guild_contrib_c91d",
    proof: "42 outputs",
    participation: "128 contributors",
    partners: "14 teams",
    signal: "Attribution ready",
    confidence: "Reviewing",
    score: 82,
  },
  {
    name: "Local Discovery Loop",
    age: "Live today",
    address: "community_route_2b8e",
    proof: "31 proofs",
    participation: "874 visits",
    partners: "9 venues",
    signal: "Strong coordination",
    confidence: "Verified",
    score: 91,
  },
  {
    name: "AI Agent Buildathon",
    age: "Governance",
    address: "agent_foundry_a04c",
    proof: "27 specs",
    participation: "64 builders",
    partners: "11 reviewers",
    signal: "Needs ethics review",
    confidence: "Escalated",
    score: 76,
  },
];

export const platformStats = [
  { label: "Verified outcomes", value: "2.4M", detail: "proof events processed", icon: BadgeCheck },
  { label: "Trust graph edges", value: "12,543", detail: "identity and contribution links", icon: Network },
  { label: "Agent decisions reviewed", value: "94%", detail: "human-auditable outputs", icon: ShieldCheck },
  { label: "Active participants", value: "1,247", detail: "people coordinating now", icon: Users },
];

export const marketInsights = [
  {
    title: "Participation quality",
    source: "XIL generated",
    metric: "+47%",
    label: "verified value",
    confidence: "High",
    body: "Verified contribution density is increasing where missions require proof, peer validation, and explicit impact claims.",
    icon: LineChart,
  },
  {
    title: "Trust graph health",
    source: "Governance data",
    metric: "0.82",
    label: "resilience",
    confidence: "High",
    body: "Cross-domain trust is compounding without over-weighting a single organization, role, or high-frequency participant.",
    icon: Network,
  },
  {
    title: "Opportunity matching",
    source: "Marketplace layer",
    metric: "+32%",
    label: "fit score",
    confidence: "Medium",
    body: "Mission-to-person matching improves when skills, context, reputation, and wellbeing constraints are considered together.",
    icon: Compass,
  },
];

export const technologyPillars = [
  { title: "Identity layer", body: "Portable profiles, credentials, reputation, and trust graph context owned by the participant.", icon: BadgeCheck },
  { title: "Mission layer", body: "Mission creation, discovery, participation, verification, and impact measurement.", icon: Target },
  { title: "Intelligence layer", body: "Recommendations, matching, insight generation, and modular agent orchestration.", icon: Brain },
  { title: "Marketplace layer", body: "Opportunity matching, escrow, rewards, and contribution-weighted value flows.", icon: BriefcaseBusiness },
  { title: "Community layer", body: "Social proof, participation feeds, collaboration, and community resilience loops.", icon: HeartHandshake },
  { title: "Governance layer", body: "Safety, moderation, auditability, dispute resolution, and compliance controls.", icon: Scale },
];

export const roadmapItems = [
  "Portable identity and contribution credentials",
  "Context-specific reputation and trust graph scoring",
  "Human-AI mission teams with traceable decision records",
  "Contribution ledger with collaborative attribution",
  "Escrow, rewards, and marketplace fairness controls",
  "Community governance, dispute resolution, and ethical review",
];

export const economyPrimitives = [
  { label: "Identity", value: "Who acted?" },
  { label: "Contribution", value: "What value was created?" },
  { label: "Trust", value: "Can this actor be relied upon?" },
  { label: "Coordination", value: "How does work happen?" },
  { label: "Governance", value: "Who can audit and appeal?" },
  { label: "Impact", value: "What changed in the world?" },
];

export const apiReference = [
  { method: "GET", endpoint: "/api/recommendations", description: "Return mission and opportunity recommendations for a participant context." },
  { method: "POST", endpoint: "/api/agents/insight-analyst", description: "Generate ecosystem intelligence from contribution, mission, and trust context." },
  { method: "POST", endpoint: "/api/agents/discovery-agent", description: "Discover missions, communities, and opportunities aligned to participant intent." },
  { method: "POST", endpoint: "/api/agents/agent-foundry", description: "Generate aligned agent specifications with objectives, constraints, and governance controls." },
  { method: "POST", endpoint: "/api/xil", description: "Route X-Hunt Intelligence Layer orchestration actions." },
  { method: "GET", endpoint: "/api/workspace/features", description: "Resolve role-gated workspace capabilities and plan access." },
  { method: "POST", endpoint: "/api/economy/contributions", description: "Record contribution events for reward, reputation, and attribution flows." },
  { method: "POST", endpoint: "/api/economy/trust", description: "Evaluate contextual trust signals for participants and missions." },
  { method: "POST", endpoint: "/api/timeline/post", description: "Publish auditable participation and community activity events." },
  { method: "POST", endpoint: "/api/messages/conversations", description: "Create collaboration threads between participants, teams, and agents." },
];

export const externalDocs = [
  { title: "Verified participation", body: "Every screen should clarify what happened, what proof exists, and why the action matters.", icon: Target },
  { title: "API reference", body: "Use typed JSON payloads for mission, agent, trust, contribution, and workspace workflows.", icon: Code2 },
  { title: "Identity and reputation", body: "Profiles, credentials, contribution records, and contextual trust form portable reputation.", icon: BadgeCheck },
  { title: "Agent foundry", body: "Agents declare purpose, boundaries, objectives, anti-objectives, and human oversight paths.", icon: Bot },
  { title: "Double materiality", body: "Financial materiality and impact materiality are evaluated together for every system decision.", icon: Gauge },
  { title: "Webhooks", body: "Receive signed events when missions, contributions, outcomes, trust, or governance states change.", icon: Webhook },
];

export const workspaceModules = [
  { title: "Participant app", href: "/home", icon: Radar, detail: "Missions, proof, contribution history, and personal trust signals." },
  { title: "Intelligence layer", href: "/mission-control", icon: Brain, detail: "XIL recommendations, agent handoffs, explainability, and oversight." },
  { title: "Developer API", href: "/developers", icon: Code2, detail: "Endpoint catalog for missions, trust, contribution, agents, and webhooks." },
  { title: "Trust graph", href: "/workspace", icon: Network, detail: "Identity relationships, contribution paths, and contextual reputation." },
  { title: "Agent foundry", href: "/agent-foundry", icon: Bot, detail: "Specialized agent specs, evaluation controls, and deployment governance." },
];

export const chartData = [
  { time: "00:00", participation: 42, sentiment: 28, discoveries: 6 },
  { time: "04:00", participation: 58, sentiment: 34, discoveries: 8 },
  { time: "08:00", participation: 76, sentiment: 45, discoveries: 13 },
  { time: "12:00", participation: 63, sentiment: 52, discoveries: 10 },
  { time: "16:00", participation: 88, sentiment: 61, discoveries: 17 },
  { time: "20:00", participation: 97, sentiment: 69, discoveries: 21 },
];

export const agentBlueprints = [
  { name: "Mission Architect", purpose: "Design meaningful missions with clear proof and impact criteria.", boundary: "Cannot alter trust scores or rewards.", icon: Target },
  { name: "Trust Guardian", purpose: "Evaluate proof quality, dispute risks, and contextual reliability.", boundary: "Cannot issue unilateral sanctions.", icon: ShieldCheck },
  { name: "Economy Coordinator", purpose: "Balance rewards, escrow, contribution value, and marketplace fairness.", boundary: "Cannot bypass governance approval.", icon: WalletCards },
  { name: "Community Catalyst", purpose: "Strengthen participation loops and collaborative community outcomes.", boundary: "Cannot optimize for engagement addiction.", icon: Users },
  { name: "Sustainability Navigator", purpose: "Assess environmental and societal materiality of missions.", boundary: "Cannot hide negative impact tradeoffs.", icon: Globe2 },
  { name: "Knowledge Graph Agent", purpose: "Connect identity, skill, proof, and contribution data into shared context.", boundary: "Cannot expose private data.", icon: GitBranch },
];

export const constitutionChecks = [
  "Identity implications",
  "Contribution model",
  "Trust dynamics",
  "Coordination flow",
  "Financial materiality",
  "Impact materiality",
  "Feedback loops",
  "Failure modes",
  "Desiderata alignment",
  "Anti-objective review",
];
