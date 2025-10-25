import React from "react";
import { cn } from "@/lib/utils";

// Root Card
export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-xl shadow-xl border border-border rounded-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

// Header
export function CardHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <header className={cn("text-center space-y-1 p-3 lg:p-6", className)}>
      {children}
    </header>
  );
}

// Content
export function CardContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("px-6 py-5 lg:py-8 border-y border-border", className)}>
      {children}
    </div>
  );
}

// Footer
export function CardFooter({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <footer className={cn("text-center py-3 text-sm text-muted", className)}>
      {children}
    </footer>
  );
}
