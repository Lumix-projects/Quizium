import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface LinkButtonProps extends React.ComponentPropsWithoutRef<typeof Link> {
  children: React.ReactNode;
  variant?: "link";
  className?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  variant = "link",
  className,
  ...props
}) => {
  const base =
    "cursor-pointer transition-all duration-300 active:scale-95 font-medium text-center";

  const variants = {
    link: "text-primary text-sm underline hover:text-primary/80",
  };

  const classes = clsx(base, variants[variant], className);

  return (
    <Link className={classes} {...props}>
      {children}
    </Link>
  );
};
