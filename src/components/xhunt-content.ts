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
  { href: "/home", label: "Get started" },
  { href: "/mission-control", label: "How it works" },
  { href: "/workspace", label: "For organisations" },
  { href: "/developers", label: "Build with us" },
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
  { label: "Verified outcomes", value: "2.4M", detail: "missions completed with proof", icon: BadgeCheck },
  { label: "People connected", value: "12,543", detail: "across missions and communities", icon: Network },
  { label: "AI decisions", value: "94%", detail: "reviewed by real people", icon: ShieldCheck },
  { label: "Active participants", value: "1,247", detail: "people completing missions now", icon: Users },
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
  { title: "Your profile", body: "Your skills, experience, and reputation — portable, verified, and owned by you.", icon: BadgeCheck },
  { title: "Challenges & goals", body: "Join, create, and complete missions with clear goals and verified outcomes.", icon: Target },
  { title: "Smart matching", body: "AI finds the right missions for you — and you for the right missions.", icon: Brain },
  { title: "Earn rewards", body: "Rewards, points, and real opportunities — tied to what you actually do.", icon: BriefcaseBusiness },
  { title: "Your network", body: "Connect with others, share progress, and build something together.", icon: HeartHandshake },
  { title: "Safe & fair", body: "Human review, dispute resolution, and community oversight at every step.", icon: Scale },
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

export const outcomeCategories = [
  { label: "Health & Wellness", description: "Exercise, nutrition, mental wellbeing, and community health challenges.", count: "847 missions open now", icon: "🏃", color: "energy", image: "photo-1571019613454-1cb2f99b2d8b" },
  { label: "Learning & Education", description: "Build skills, earn certificates, and share knowledge with others.", count: "1,203 missions open now", icon: "📚", color: "sky", image: "photo-1434030216411-0b793f4b6f57" },
  { label: "Sustainability", description: "Climate action, local ecology, and sustainable everyday habits.", count: "412 missions open now", icon: "🌱", color: "primary", image: "photo-1569163139599-0f4517e36f51" },
  { label: "Community Impact", description: "Volunteering, neighbourhood improvement, and local civic action.", count: "634 missions open now", icon: "🤝", color: "rose", image: "photo-1531206715517-5c0ba140b2b4" },
  { label: "Exploration", description: "Discovery missions, field trips, and local reporting.", count: "289 missions open now", icon: "🧭", color: "reward", image: "photo-1476514525535-07fb3b4ae5f1" },
  { label: "Research", description: "Citizen science, surveys, and collaborative data collection.", count: "156 missions open now", icon: "🔬", color: "ai", image: "photo-1532187863486-abf9dbad1b69" },
  { label: "Workforce Development", description: "Career skills, mentorship, and employment pathways.", count: "371 missions open now", icon: "💼", color: "sky", image: "photo-1521791136064-7986c2920216" },
];

export const reputationScores = {
  trust: { score: 84, label: "Reliability", detail: "How reliable others find you, based on your completed missions.", trend: "+6 this month" },
  participation: { score: 92, label: "Activity", detail: "How often and how well you show up to missions.", trend: "+12 this month" },
  impact: { score: 71, label: "Real-world change", detail: "The real-world difference your contributions have made.", trend: "+4 this month" },
};

export const activityFeed = [
  { actor: "Climate Action Sprint", action: "Verified your proof submission", time: "2h ago", type: "verification" },
  { actor: "Creator Skill Guild", action: "Added you to the contributor leaderboard", time: "5h ago", type: "recognition" },
  { actor: "AI Match Engine", action: "Found 3 new opportunities matching your profile", time: "Yesterday", type: "opportunity" },
  { actor: "Trust Guardian", action: "Your trust score increased by 4 points", time: "Yesterday", type: "trust" },
  { actor: "Local Discovery Loop", action: "Community milestone reached — impact recorded", time: "2 days ago", type: "impact" },
];

export const activeMissions = [
  { name: "Climate Action Sprint", category: "Sustainability", progress: 68, status: "In proof", due: "3 days left", reward: "140 pts" },
  { name: "Creator Skill Guild", category: "Learning", progress: 41, status: "Active", due: "7 days left", reward: "85 pts" },
  { name: "Local Discovery Loop", category: "Community", progress: 89, status: "Review pending", due: "1 day left", reward: "200 pts" },
];

export const aiMatchedOpportunities = [
  { name: "Resilient Cities Research", category: "Research", matchScore: 97, reward: "250 pts + certificate", participants: 42, skills: ["Analysis", "Sustainability"], verified: true },
  { name: "Workforce Readiness Program", category: "Workforce", matchScore: 93, reward: "180 pts + badge", participants: 128, skills: ["Mentorship", "Communication"], verified: true },
  { name: "Urban Biodiversity Survey", category: "Exploration", matchScore: 88, reward: "160 pts", participants: 67, skills: ["Field Research", "Reporting"], verified: false },
];

export const participantSkills = [
  { name: "Community Organizing", level: "Advanced", verified: true, missions: 8 },
  { name: "Data Collection", level: "Proficient", verified: true, missions: 5 },
  { name: "Environmental Analysis", level: "Intermediate", verified: false, missions: 3 },
  { name: "Technical Writing", level: "Proficient", verified: true, missions: 6 },
];

export const verifiedContributions = [
  { mission: "Climate Action Sprint", outcome: "Organized 23 participants for beach cleanup", proof: "Photo + GPS log", impact: "4.2 tons debris removed", date: "May 2026", points: 180 },
  { mission: "Community Learning Hub", outcome: "Delivered 6 skill workshops", proof: "Attendance records + feedback", impact: "84 participants upskilled", date: "Apr 2026", points: 240 },
  { mission: "Urban Green Survey", outcome: "Mapped 47 green spaces across district", proof: "Geo-tagged photos", impact: "Added to city planning database", date: "Mar 2026", points: 120 },
];

export const enterpriseOutcomes = [
  { metric: "↑ 34%", label: "Exercise participation", context: "Over a 12-week employee wellness programme" },
  { metric: "↑ 91%", label: "Training completion", context: "With peer accountability built in" },
  { metric: "3,200", label: "Community activations", context: "Across 8 districts, tracked and verified" },
  { metric: "0.82", label: "Engagement quality score", context: "Real actions, not passive impressions" },
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
