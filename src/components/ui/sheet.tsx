"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SheetContext = React.createContext<{ open: boolean; setOpen: (open: boolean) => void } | null>(null);

function Sheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return <SheetContext.Provider value={{ open, setOpen }}>{children}</SheetContext.Provider>;
}

function SheetTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
  const ctx = React.useContext(SheetContext);
  if (asChild && React.isValidElement<{ onClick?: React.MouseEventHandler }>(children)) {
    return React.cloneElement(children, { onClick: () => ctx?.setOpen(true) });
  }
  return <Button variant="ghost" size="icon" onClick={() => ctx?.setOpen(true)}>{children}</Button>;
}

function SheetContent({ className, children, side = "right", ...props }: React.ComponentProps<"div"> & { side?: "left" | "right" }) {
  const ctx = React.useContext(SheetContext);
  if (!ctx?.open) return null;
  return (
    <div data-slot="sheet-root" className="fixed inset-0 z-50">
      <button aria-label="Close menu" className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => ctx.setOpen(false)} />
      <div
        data-slot="sheet-content"
        className={cn(
          "absolute inset-y-0 w-80 bg-background p-6 shadow-lg",
          side === "left" ? "left-0 border-r" : "right-0 border-l",
          className,
        )}
        {...props}
      >
        <Button className="absolute right-4 top-4" variant="ghost" size="icon" onClick={() => ctx.setOpen(false)} aria-label="Close menu">
          <X />
        </Button>
        {children}
      </div>
    </div>
  );
}

export { Sheet, SheetTrigger, SheetContent };
