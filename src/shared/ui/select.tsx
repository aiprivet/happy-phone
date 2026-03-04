import type { SelectHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  children: ReactNode;
}

export const Select = ({ className, error, children, ...rest }: SelectProps) => {
  return (
    <div className="space-y-1">
      <select
        className={cn(
          "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...rest}
      >
        {children}
      </select>
      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

