"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronRight,
  Compass,
  Home,
  MessageCircle,
  Search,
  Shield,
  Sparkles,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { BrandMark } from "@/components/brand";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const primaryNav = [
  { href: "/home", label: "Dashboard", icon: Home },
  { href: "/explore", label: "Opportunities", icon: Compass },
  { href: "/missions", label: "Activity", icon: Zap },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: User },
];

const mobileNav = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/missions", label: "Activity", icon: Zap },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: User },
];

function XHuntSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="gap-3 data-[state=open]:bg-sidebar-accent"
              render={<Link href="/" />}
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                XH
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">X-Hunt</span>
                <span className="truncate text-xs text-muted-foreground">Participation Network</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {primaryNav.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== "/home" && pathname.startsWith(href));
              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    tooltip={label}
                    isActive={active}
                    render={<Link href={href} />}
                  >
                    <Icon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/sign-up" />}
                className="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
              >
                <Sparkles />
                <span>Start a Mission</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="grid gap-2 p-2">
          <div className="flex items-center gap-2 rounded-lg border bg-card/50 px-3 py-2">
            <Avatar className="size-8 shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">XH</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
              <div className="truncate text-sm font-medium">Preview Participant</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Shield className="size-3 text-primary" />
                <span className="text-xs text-muted-foreground">Trust: 84</span>
                <TrendingUp className="size-3 text-primary" />
                <span className="text-xs text-muted-foreground">92</span>
              </div>
            </div>
            <ChevronRight className="size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export function ConsumerShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <XHuntSidebar />
      <div className="flex min-h-svh flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-2 border-b bg-background/90 px-4 backdrop-blur-xl lg:px-6">
          <SidebarTrigger className="-ml-1 lg:flex" />
          <Separator orientation="vertical" className="mx-1 h-4 data-vertical:self-auto hidden lg:block" />
          {(title || subtitle) && (
            <div className="hidden lg:block">
              {title && <div className="text-sm font-medium">{title}</div>}
              {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
            </div>
          )}
          <div className="relative ml-auto hidden w-full max-w-xs sm:block lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search opportunities, missions, people" />
          </div>
          <Button size="icon" variant="ghost" className="ml-auto sm:ml-0" aria-label="Notifications">
            <Bell className="size-4" />
          </Button>
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">XH</AvatarFallback>
          </Avatar>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav className="fixed inset-x-0 bottom-0 border-t bg-background/95 backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">
          <div className="grid grid-cols-5">
            {mobileNav.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== "/home" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex flex-col items-center gap-1 px-2 py-2.5 text-[11px] text-muted-foreground transition-colors",
                    active && "text-primary"
                  )}
                >
                  <Icon className="size-5" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="h-16 lg:hidden" />
      </div>
    </SidebarProvider>
  );
}
