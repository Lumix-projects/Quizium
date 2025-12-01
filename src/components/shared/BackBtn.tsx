"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function BackBtn({
  backTo,
  className,
}: {
  backTo?: string;
  className?: string;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={cn(
        "flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer",
        className
      )}
    >
      <FiArrowLeft />
      <span>{backTo ? `Back to ${backTo}` : "Go Back"}</span>
    </button>
  );
}
