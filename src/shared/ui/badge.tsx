import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

type BadgeVariant = "default" | "green" | "blue" | "yellow";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const badgeClasses: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700",
  green: "bg-emerald-50 text-emerald-700",
  blue: "bg-blue-50 text-blue-700",
  yellow: "bg-amber-50 text-amber-700",
};

export const Badge = ({
  variant = "default",
  className,
  children,
  ...rest
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        badgeClasses[variant],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

