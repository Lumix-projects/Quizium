import clsx from "clsx";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
}

export default function Button({ children, variant = "default" }: ButtonProps) {
  const base =
    "py-2.5 px-4 rounded-lg w-full cursor-pointer transition-all duration-300 active:scale-95 font-medium";

  const variants = {
    default: "bg-primary text-white hover:bg-primary-hover",
    outline:
      "border-2 border-primary text-primary bg-white hover:bg-primary/10",
  };

  return <button className={clsx(base, variants[variant])}>{children}</button>;
}
