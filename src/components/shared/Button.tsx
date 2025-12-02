import clsx from "clsx";
import React from "react";
import Link from "next/link";

interface BaseButtonProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "icon";
  className?: string;
}

// Button case
type ButtonOnlyProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

// Link case
type LinkOnlyProps = BaseButtonProps &
  React.ComponentPropsWithoutRef<typeof Link> & { href: string };

type ButtonProps = ButtonOnlyProps | LinkOnlyProps;

export default function Button({
  children,
  variant = "default",
  href,
  className,
  ...props
}: ButtonProps) {
  // Base ClassName
  const base =
    "cursor-pointer transition-all duration-300 active:scale-95 font-medium text-center disabled:opacity-50";

  const variants = {
    default:
      "bg-primary text-white hover:bg-primary-hover w-full rounded-lg py-2.5 px-4",
    outline:
      "border-2 border-primary text-primary bg-white hover:bg-primary/10 w-full rounded-lg py-2.5 px-4",
    icon: "border border-border rounded-full p-2 bg-background",
  };

  const classes = clsx(base, variants[variant], className);

  // If href exists → render Link
  if (href) {
    return (
      <Link
        className={classes}
        {...(props as React.ComponentPropsWithoutRef<typeof Link>)}
      >
        {children}
      </Link>
    );
  }

  // Otherwise → render button
  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
