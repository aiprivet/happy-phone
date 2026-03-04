import { cn } from "../utils/cn";
import { useEffect, useRef } from "react";

interface Step {
  id: number;
  title: string;
}

interface StepperProps {
  currentStep: number;
  steps: Step[];
}

export const Stepper = ({ currentStep, steps }: StepperProps) => {
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = steps.findIndex((step) => step.id === currentStep);

    if (activeIndex !== -1 && stepRefs.current[activeIndex]) {
      stepRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentStep, steps]);

  return (
    <div className="max-w-dvw overflow-x-scroll no-scrollbar">
      <nav aria-label="Шаги оформления">
        <ol className="flex items-center gap-4">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <li
                key={step.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className="flex flex-1 items-center gap-2"
              >
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
                    isCompleted &&
                      "border-emerald-500 bg-emerald-500 text-white",
                    isActive &&
                      !isCompleted &&
                      "border-blue-600 bg-blue-600 text-white",
                    !isActive &&
                      !isCompleted &&
                      "border-slate-300 bg-white text-slate-600",
                  )}
                >
                  {step.id}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium text-nowrap",
                    isActive
                      ? "text-slate-900"
                      : isCompleted
                        ? "text-slate-600"
                        : "text-slate-500",
                  )}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="mx-1 h-px flex-1 bg-slate-200" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};
