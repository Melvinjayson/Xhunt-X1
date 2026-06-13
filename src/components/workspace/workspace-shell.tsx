"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bot,
  Building2,
  ChevronRight,
  LayoutDashboard,
  Rocket,
  Shield,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Max 8 items per AGENTS.md constraint
const NAV_ITEMS = [
  { href: "/workspace",            label: "Dashboard",      icon: LayoutDashboard, tier: "starter"    },
  { href: "/workspace/missions",   label: "Missions",       icon: Rocket,          tier: "starter"    },
  { href: "/workspace/missions/new", label: "Mission Studio", icon: Zap,           tier: "growth"     },
  { href: "/workspace/participants", label: "Participants",  icon: Users,           tier: "growth"     },
  { href: "/workspace/rewards",    label: "Rewards",        icon: Wallet,          tier: "growth"     },
  { href: "/workspace/analytics",  label: "Analytics",      icon: BarChart3,       tier: "growth"     },
  { href: "/workspace/agents",     label: "Agent Hub",      icon: Bot,             tier: "enterprise" },
  { href: "/workspace/governance", label: "Governance",     icon: Shield,          tier: "enterprise" },
];

function MissionControlSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="border-b border-sidebar-border pb-3">
        <div className="flex items-center gap-2 px-2 pt-1">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
            XH
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <div className="text-sm font-semibold leading-none">Mission Control</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">X-Hunt Enterprise</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-2">
        <SidebarMenu>
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = href === "/workspace"
              ? pathname === "/workspace"
              : pathname.startsWith(href);
            return (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton
                  isActive={active}
                  tooltip={label}
                  render={<Link href={href} />}
                >
                  <Icon className="size-4" />
                  <span>{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border pt-3">
        <div className="group-data-[collapsible=icon]:hidden px-2 pb-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-semibold">
                MO
              </div>
              <div className="text-xs font-medium leading-none">Preview Org</div>
            </div>
            <Badge variant="secondary" className="text-[9px] px-1.5">Enterprise</Badge>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

interface WorkspaceShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function WorkspaceShell({ children, title, subtitle, actions }: WorkspaceShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full">
        <MissionControlSidebar />
        <div className="flex flex-1 flex-col min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <div className="flex flex-1 items-center justify-between gap-4 min-w-0">
              <div className="min-w-0">
                {title && (
                  <h1 className="text-sm font-semibold truncate leading-none">{title}</h1>
                )}
                {subtitle && (
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{subtitle}</p>
                )}
              </div>
              {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="outline" className="gap-1 text-[10px] border-primary/30 text-primary">
                <Building2 className="size-2.5" />
                Mission Control
              </Badge>
              <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                Consumer <ChevronRight className="size-3" />
              </Link>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <div className="container max-w-7xl mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
