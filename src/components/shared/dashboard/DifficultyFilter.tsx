"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

const options = [
  { label: "All", value: undefined },
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

export default function DifficultyFilter({ current }: { current?: string }) {
  return options.map((opt) => {
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
  });
}
