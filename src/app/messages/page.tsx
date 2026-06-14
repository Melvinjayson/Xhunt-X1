"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Bell,
  Bot,
  ChevronRight,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { ConsumerShell } from "@/components/consumer/consumer-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type MessageType = "mission" | "match" | "community" | "update";

interface Message {
  id: string;
  type: MessageType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  action?: string;
  actionHref?: string;
  color?: string;
}

const MESSAGES: Message[] = [
  {
    id: "1",
    type: "mission",
    title: "Your proof was approved",
    body: "Climate Action Sprint accepted your beach cleanup photos. You earned 140 points and a Verified badge.",
    time: "2 min ago",
    read: false,
    action: "View mission",
    color: "var(--primary)",
  },
  {
    id: "2",
    type: "match",
    title: "3 new missions matched to you",
    body: "Based on your sustainability skills, we found Resilient Cities Research, Urban Biodiversity Survey, and Circular Economy Challenge.",
    time: "1 hour ago",
    read: false,
    action: "See matches",
    actionHref: "/explore",
    color: "var(--color-ai)",
  },
  {
    id: "3",
    type: "community",
    title: "Alex completed a mission you're on",
    body: "Alex Chen finished Local Discovery Loop and reached the community milestone. You're 89% through the same mission.",
    time: "3 hours ago",
    read: false,
    action: "Keep going",
    actionHref: "/missions",
    color: "var(--color-sky)",
  },
  {
    id: "4",
    type: "update",
    title: "Your reliability score went up",
    body: "Your Reliability score increased from 80 to 84 this month. Consistent proof submissions are building your track record.",
    time: "Yesterday",
    read: true,
    color: "var(--color-reward)",
  },
  {
    id: "5",
    type: "mission",
    title: "Creator Skill Guild wants your feedback",
    body: "You're 41% through Creator Skill Guild. Share a quick update to stay on the leaderboard and keep your streak.",
    time: "Yesterday",
    read: true,
    action: "Submit update",
    color: "var(--primary)",
  },
  {
    id: "6",
    type: "community",
    title: "Local Discovery Loop hit a community milestone",
    body: "874 people have now visited local venues through this mission. Your contribution was part of that.",
    time: "2 days ago",
    read: true,
    color: "var(--color-rose)",
  },
  {
    id: "7",
    type: "match",
    title: "Workforce Readiness Program is filling up",
    body: "Only 12 spots left in a mission that's a 93% match for your skills. It closes in 4 days.",
    time: "2 days ago",
    read: true,
    action: "View mission",
    actionHref: "/explore",
    color: "var(--color-ai)",
  },
];

const TYPE_ICONS: Record<MessageType, React.ComponentType<{ className?: string }>> = {
  mission: Zap,
  match: Sparkles,
  community: MessageCircle,
  update: TrendingUp,
};

const TYPE_LABELS: Record<MessageType, string> = {
  mission: "Mission",
  match: "Match",
  community: "Community",
  update: "Update",
};

const TABS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "mission", label: "Missions" },
  { id: "match", label: "Matches" },
] as const;

type Tab = typeof TABS[number]["id"];

function MessageCard({ msg, onRead }: { msg: Message; onRead: (id: string) => void }) {
  const Icon = TYPE_ICONS[msg.type];

  return (
    <div
      className={cn(
        "group flex gap-4 rounded-2xl border p-4 transition-all cursor-pointer",
        !msg.read ? "bg-card border-primary/20" : "bg-card/50 hover:bg-card"
      )}
      onClick={() => onRead(msg.id)}
    >
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-xl mt-0.5"
        style={{
          background: `color-mix(in oklch, ${msg.color ?? "var(--primary)"} 12%, transparent)`,
          color: msg.color ?? "var(--primary)",
        }}
      >
        <Icon className="size-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn("text-sm font-semibold", !msg.read && "text-foreground")}>
              {msg.title}
            </span>
            {!msg.read && (
              <span
                className="size-1.5 rounded-full shrink-0 mt-0.5"
                style={{ background: "var(--primary)" }}
              />
            )}
          </div>
          <span className="text-[11px] text-muted-foreground shrink-0">{msg.time}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{msg.body}</p>
        <div className="flex items-center gap-2 mt-3">
          <Badge
            variant="secondary"
            className="text-[10px] gap-1"
            style={{ color: msg.color ?? "var(--primary)" }}
          >
            {TYPE_LABELS[msg.type]}
          </Badge>
          {msg.action && (
            <button
              className="flex items-center gap-0.5 text-xs font-medium hover:underline"
              style={{ color: msg.color ?? "var(--primary)" }}
              onClick={(e) => {
                e.stopPropagation();
                if (msg.actionHref) window.location.href = msg.actionHref;
              }}
            >
              {msg.action} <ChevronRight className="size-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [messages, setMessages] = useState(MESSAGES);

  const unreadCount = messages.filter((m) => !m.read).length;

  const filtered = messages.filter((m) => {
    if (tab === "unread") return !m.read;
    if (tab === "mission") return m.type === "mission";
    if (tab === "match") return m.type === "match";
    return true;
  });

  function markRead(id: string) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  }

  function markAllRead() {
    setMessages((prev) => prev.map((m) => ({ ...m, read: true })));
  }

  return (
    <ConsumerShell title="Messages" subtitle="Mission updates, matches, and community news.">
      <div className="grid gap-4 max-w-2xl">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              Messages
              {unreadCount > 0 && (
                <Badge className="text-xs" style={{ background: "var(--primary)" }}>
                  {unreadCount} new
                </Badge>
              )}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Mission updates, AI matches, and news from your community.
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="shrink-0 text-muted-foreground" onClick={markAllRead}>
              Mark all read
            </Button>
          )}
        </div>

        <div className="flex gap-1 p-1 bg-secondary/50 rounded-xl w-fit">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                tab === t.id
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
              {t.id === "unread" && unreadCount > 0 && (
                <span className="ml-1.5 text-[10px] font-bold" style={{ color: "var(--primary)" }}>
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-12 text-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
                <Bell className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">You&apos;re all caught up</p>
                <p className="text-xs text-muted-foreground mt-1">No messages in this category.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-2">
            {filtered.map((msg, i) => (
              <div key={msg.id}>
                <MessageCard msg={msg} onRead={markRead} />
                {i === 0 && tab === "all" && unreadCount > 0 && filtered[1] && filtered[1].read && (
                  <div className="flex items-center gap-2 my-1 px-2">
                    <Separator className="flex-1" />
                    <span className="text-[10px] text-muted-foreground">Earlier</span>
                    <Separator className="flex-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <Card className="border-dashed">
          <CardContent className="flex items-center gap-3 p-4">
            <div
              className="flex size-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "color-mix(in oklch, var(--color-ai) 12%, transparent)", color: "var(--color-ai)" }}
            >
              <Bot className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium">AI keeps you updated</p>
              <p className="text-[11px] text-muted-foreground">
                We notify you when missions move, your score changes, or a great match appears.
              </p>
            </div>
            <BadgeCheck className="size-4 shrink-0" style={{ color: "var(--color-sky)" }} />
          </CardContent>
        </Card>
      </div>
    </ConsumerShell>
  );
}
