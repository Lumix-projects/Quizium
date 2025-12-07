"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function BackBtn({
  to,
  label,
  className,
}: {
  to?: string;
  label?: string;
  className?: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    if (to) {
      router.push(to);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer",
        className
      )}
    >
      <FiArrowLeft />
      <span>{label ?? (to ? `Back to ${to}` : "Go Back")}</span>
    </button>
  );
}
