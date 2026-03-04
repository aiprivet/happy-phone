import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

type Variant = "primary" | "outline" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:text-white",
  outline:
    "border border-slate-300 text-slate-800 hover:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200",
  ghost:
    "text-slate-700 hover:bg-slate-100 disabled:text-slate-400 disabled:bg-transparent",
  danger:
    "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 disabled:text-white",
};

export const Button = ({
  variant = "primary",
  fullWidth,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed",
        variantClasses[variant],
        fullWidth && "w-full",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

