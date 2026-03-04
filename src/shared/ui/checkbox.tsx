import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  error?: string;
}

export const Checkbox = ({ label, error, className, ...rest }: CheckboxProps) => {
  return (
    <div className="space-y-1">
      <label className="flex items-start gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          className={cn(
            "mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500",
            className
          )}
          {...rest}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

