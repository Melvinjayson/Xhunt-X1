"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Compass, Home, Menu, MessageCircle, Search, Sparkles, Target, User } from "lucide-react";
import { BrandMark } from "@/components/brand";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/missions", label: "Missions", icon: Target },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: User },
];

export function ConsumerShell({ children, title = "X-Hunt participation network", subtitle = "Missions, proof, trust, contribution, and AI coordination." }: { children: React.ReactNode; title?: string; subtitle?: string }) {
  const pathname = usePathname();
  const nav = (
    <nav className="grid gap-1">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              active && "bg-accent text-accent-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r bg-card/50 p-4 lg:block">
        <BrandMark />
        <div className="mt-6">{nav}</div>
        <div className="absolute bottom-4 left-4 right-4 rounded-lg border bg-background p-4">
          <Badge variant="secondary" className="mb-3 gap-1">
            <Sparkles className="size-3" />
            XIL active
          </Badge>
          <p className="text-sm font-medium">387 contribution events processed today.</p>
          <p className="mt-1 text-xs text-muted-foreground">Trust scores combine proof, contribution, reputation, and human oversight.</p>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 border-b bg-background/90 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <BrandMark />
                <div className="mt-8">{nav}</div>
              </SheetContent>
            </Sheet>
            <div className="hidden lg:block">
              <div className="text-sm font-medium">{title}</div>
              <div className="text-xs text-muted-foreground">{subtitle}</div>
            </div>
            <div className="relative ml-auto hidden w-full max-w-sm sm:block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search missions, contributors, proofs" />
            </div>
            <Button size="icon" variant="outline" aria-label="Notifications">
              <Bell />
            </Button>
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/sign-up">Join</Link>
            </Button>
            <Avatar className="size-9">
              <AvatarFallback>XH</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 border-t bg-background/95 backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link key={href} href={href} className={cn("flex flex-col items-center gap-1 px-2 py-2 text-[11px] text-muted-foreground", active && "text-primary")}>
                <Icon className="size-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <Separator className="lg:hidden" />
      <div className="h-16 lg:hidden" />
    </div>
  );
}
