import {
  BadgeCheck,
  Brain,
  Compass,
  Gift,
  HeartPulse,
  Map,
  MessageCircle,
  Radar,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

export const missions = [
  {
    id: "city-signal",
    title: "City Signal Sprint",
    category: "Discovery",
    location: "London",
    reward: "420 XP",
    match: 96,
    duration: "38 min",
    steps: 5,
    description: "Find three local signals, capture proof, and unlock a neighborhood insight drop.",
  },
  {
    id: "creator-loop",
    title: "Creator Loop",
    category: "Social",
    location: "Remote",
    reward: "310 XP",
    match: 91,
    duration: "25 min",
    steps: 4,
    description: "Test a tiny creative habit with peer validation and an AI reflection at the end.",
  },
  {
    id: "wellbeing-pulse",
    title: "Wellbeing Pulse",
    category: "Health",
    location: "Nearby",
    reward: "280 XP",
    match: 88,
    duration: "18 min",
    steps: 3,
    description: "Complete a calm route, mood check, and micro-journal to improve your personal mission score.",
  },
];

export const navItems = [
  { href: "/home", label: "Home", icon: Compass },
  { href: "/explore", label: "Explore", icon: Radar },
  { href: "/missions", label: "Missions", icon: Trophy },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: Users },
];

export const productStats = [
  { label: "Mission Match", value: "96", icon: Sparkles },
  { label: "Active Streak", value: "12", icon: HeartPulse },
  { label: "Verified XP", value: "8.4K", icon: BadgeCheck },
  { label: "Trust Score", value: "98", icon: ShieldCheck },
];

export const platformPillars = [
  { title: "AI mission design", body: "Personalized missions adapt by context, intent, location, and progress.", icon: Brain },
  { title: "Proof and validation", body: "Every outcome can carry evidence, trust signals, and human review paths.", icon: ShieldCheck },
  { title: "Reward economy", body: "XP, escrow, and perks connect participation to measurable value.", icon: Gift },
  { title: "Local discovery", body: "Consumer journeys can happen remotely or in the real world.", icon: Map },
];
