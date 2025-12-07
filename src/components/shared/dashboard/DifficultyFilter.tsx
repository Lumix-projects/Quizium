"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

const options = [
  { label: "All", value: undefined },
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

export default function DifficultyFilter({
  current,
}: {
  current: string | undefined;
}) {
  return (
    <div className="inline-flex justify-center items-center flex-wrap md:gap-2 p-1 bg-muted/30 rounded-xl border border-border/50 text-xs">
      {options.map((opt) => {
        const active = current === opt.value || (!current && !opt.value);

        return (
          <Link
            key={opt.label}
            scroll={false}
            href={opt.value ? `?difficulty=${opt.value}` : `?`}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-all duration-300",
              active
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {opt.label}
          </Link>
        );
      })}
    </div>
  );
}
