import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label = ({ className, children, ...rest }: LabelProps) => {
  return (
    <label
      className={cn(
        "block text-sm font-medium text-slate-700",
        className
      )}
      {...rest}
    >
      {children}
    </label>
  );
};

