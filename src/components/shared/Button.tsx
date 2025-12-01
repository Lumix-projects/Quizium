import clsx from "clsx";
import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "default",
  href,
  className,
  type = "button",
}: ButtonProps) {
  // Base ClassName
  const base =
    "py-2.5 px-4 rounded-lg w-full cursor-pointer transition-all duration-300 active:scale-95 font-medium text-center";

  const variants = {
    default: "bg-primary text-white hover:bg-primary-hover",
    outline:
      "border-2 border-primary text-primary bg-white hover:bg-primary/10",
  };

  const classes = clsx(base, variants[variant], className);

  // If href exists → render Link
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // Otherwise → render button
  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
