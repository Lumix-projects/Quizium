import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline" | "icon";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  className,
  ...props
}) => {
  const base =
    "cursor-pointer transition-all duration-300 active:scale-95 font-medium text-center disabled:opacity-50 flex items-center justify-center gap-2 w-fit";

  const variants = {
    default:
      "bg-primary text-white hover:bg-primary-hover rounded-lg py-2.5 px-4",
    outline:
      "border-2 border-primary text-primary bg-white hover:bg-primary/10 w-full rounded-lg py-2.5 px-4",
    icon: "border border-border rounded-full p-2 bg-background",
  };

  const classes = clsx(base, variants[variant], className);

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
