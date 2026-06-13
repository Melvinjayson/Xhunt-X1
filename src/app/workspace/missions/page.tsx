import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
} from "lucide-react";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MissionStatus = "active" | "draft" | "completed" | "paused" | "review";

interface Mission {
  id: string;
  name: string;
  type: string;
  status: MissionStatus;
  participants: number;
  verified: number;
  budget: string;
  mei: number | null;
  due: string;
  escrow: "locked" | "released" | "pending" | "partial";
}

const missions: Mission[] = [
  {
    id: "m-001",
    name: "Graduate Skills Accelerator",
    type: "workforce",
    status: "active",
    participants: 312,
    verified: 248,
    budget: "£18,400",
    mei: 82,
    due: "12 Jul 2026",
    escrow: "locked",
  },
  {
    id: "m-002",
    name: "Campus Carbon Reduction Sprint",
    type: "sustainability",
    status: "active",
    participants: 541,
    verified: 389,
    budget: "£9,800",
    mei: 71,
    due: "30 Jun 2026",
    escrow: "partial",
  },
  {
    id: "m-003",
    name: "Research Participant Pool",
    type: "research",
    status: "review",
    participants: 84,
    verified: 61,
    budget: "£4,200",
    mei: 88,
    due: "20 Jun 2026",
    escrow: "locked",
  },
  {
    id: "m-004",
    name: "Digital Skills Bootcamp — Cohort 3",
    type: "learning",
    status: "draft",
    participants: 0,
    verified: 0,
    budget: "£6,500",
    mei: null,
    due: "15 Aug 2026",
    escrow: "pending",
  },
  {
    id: "m-005",
    name: "Heritage Discovery Walk — Edinburgh",
    type: "civic",
    status: "completed",
    participants: 218,
    verified: 196,
    budget: "£2,800",
    mei: 91,
    due: "01 Jun 2026",
    escrow: "released",
  },
  {
    id: "m-006",
    name: "Product Beta Testing — Q2",
    type: "paid",
    status: "paused",
    participants: 47,
    verified: 31,
    budget: "£11,200",
    mei: 66,
    due: "25 Jun 2026",
    escrow: "locked",
  },
];

const STATUS_TABS: { value: MissionStatus | "all"; label: string }[] = [
  { value: "all",       label: "All"       },
  { value: "active",    label: "Active"    },
  { value: "draft",     label: "Draft"     },
  { value: "review",    label: "Review"    },
  { value: "completed", label: "Completed" },
  { value: "paused",    label: "Paused"    },
];

function statusBadge(status: MissionStatus) {
  const map: Record<MissionStatus, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
    active:    { label: "Active",    variant: "default"     },
    draft:     { label: "Draft",     variant: "secondary"   },
    review:    { label: "Review",    variant: "outline"     },
    completed: { label: "Completed", variant: "secondary"   },
    paused:    { label: "Paused",    variant: "destructive" },
  };
  const { label, variant } = map[status];
  return <Badge variant={variant} className="text-[10px]">{label}</Badge>;
}

function escrowBadge(escrow: Mission["escrow"]) {
  const map = {
    locked:   { label: "Locked",   cls: "text-primary border-primary/30 bg-primary/10" },
    partial:  { label: "Partial",  cls: "text-warning border-warning/40"                },
    released: { label: "Released", cls: "text-green-400 border-green-400/30"            },
    pending:  { label: "Pending",  cls: ""                                               },
  };
  const { label, cls } = map[escrow];
  return <Badge variant="outline" className={`text-[10px] gap-1 ${cls}`}><ShieldCheck className="size-2.5" />{label}</Badge>;
}

function MeiBar({ score }: { score: number }) {
  return (
    <div className="h-1 w-full rounded-full bg-secondary overflow-hidden">
      <div className="h-full rounded-full bg-primary" style={{ width: `${score}%` }} />
    </div>
  );
}

function MissionCard({ m }: { m: Mission }) {
  const completionPct = m.participants > 0 ? Math.round((m.verified / m.participants) * 100) : 0;
  return (
    <div className="rounded-xl border bg-card/50 p-4 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge variant="secondary" className="text-[10px]">{m.type}</Badge>
            {statusBadge(m.status)}
            {escrowBadge(m.escrow)}
          </div>
          <div className="text-sm font-semibold truncate">{m.name}</div>
          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground">
            <Clock className="size-2.5" /> Due {m.due}
          </div>
        </div>
        <div className="text-right shrink-0">
          {m.mei !== null ? (
            <>
              <div className="text-xl font-semibold tabular-nums">{m.mei}</div>
              <div className="text-[10px] text-muted-foreground">MEI</div>
            </>
          ) : (
            <Badge variant="outline" className="text-[10px]">No data</Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-[10px] mb-3">
        {[
          { v: m.participants.toLocaleString(), l: "Participants" },
          { v: m.verified.toLocaleString(), l: "Verified" },
          { v: `${completionPct}%`, l: "Completion" },
          { v: m.budget, l: "Budget" },
        ].map(({ v, l }) => (
          <div key={l} className="rounded-md bg-secondary/50 p-1.5">
            <div className="font-semibold">{v}</div>
            <div className="text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      {m.status !== "draft" && <MeiBar score={m.mei ?? 0} />}

      <Separator className="my-3" />
      <div className="flex items-center justify-between">
        <Button
          render={<Link href={`/workspace/missions/${m.id}`} />}
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs gap-1"
        >
          View details <ArrowRight className="size-3" />
        </Button>
        <Button variant="ghost" size="icon" className="size-7">
          <MoreHorizontal className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}

export default function MissionsPage() {
  return (
    <WorkspaceShell
      title="Missions"
      subtitle="Design, fund, distribute, and measure verified outcome missions."
      actions={
        <Button render={<Link href="/workspace/missions/new" />} size="sm" className="gap-1.5">
          <Plus className="size-3.5" /> New mission
        </Button>
      }
    >
      <div className="grid gap-6">

        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "Total missions",    value: missions.length.toString(),                        icon: BadgeCheck },
            { label: "Active",            value: missions.filter(m => m.status === "active").length.toString(), icon: BadgeCheck },
            { label: "Avg MEI",           value: `${Math.round(missions.filter(m => m.mei !== null).reduce((a, m) => a + (m.mei ?? 0), 0) / missions.filter(m => m.mei !== null).length)}`, icon: BadgeCheck },
            { label: "In draft",          value: missions.filter(m => m.status === "draft").length.toString(), icon: BadgeCheck },
          ].map(({ label, value }) => (
            <Card key={label}>
              <CardContent className="p-4">
                <div className="text-2xl font-semibold tabular-nums">{value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search + filter */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9 h-9 text-sm" placeholder="Search missions by name, type, or status…" />
          </div>
          <Button variant="outline" size="sm" className="gap-2 h-9">
            <Filter className="size-3.5" /> Filter
          </Button>
        </div>

        {/* Mission tabs */}
        <Tabs defaultValue="all">
          <TabsList className="h-auto p-1 gap-0.5">
            {STATUS_TABS.map(({ value, label }) => (
              <TabsTrigger key={value} value={value} className="text-xs h-7">
                {label}
                {value !== "all" && (
                  <span className="ml-1.5 text-[10px] text-muted-foreground">
                    {missions.filter(m => m.status === value).length}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {STATUS_TABS.map(({ value }) => {
            const filtered = value === "all" ? missions : missions.filter(m => m.status === value);
            return (
              <TabsContent key={value} value={value} className="mt-4">
                {filtered.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                      <BadgeCheck className="size-8 text-muted-foreground/50 mb-3" />
                      <CardTitle className="text-base mb-1">No {value} missions</CardTitle>
                      <CardDescription className="text-sm">
                        {value === "draft" ? "Create your first mission in Mission Studio." : `No missions currently in ${value} status.`}
                      </CardDescription>
                      {value === "draft" && (
                        <Button render={<Link href="/workspace/missions/new" />} size="sm" className="mt-4 gap-1">
                          <Plus className="size-3.5" /> Create mission
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {filtered.map(m => <MissionCard key={m.id} m={m} />)}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>

      </div>
    </WorkspaceShell>
  );
}
