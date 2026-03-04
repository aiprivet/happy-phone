import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Card = ({ className, children, ...rest }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

