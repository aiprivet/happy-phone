import type { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "../utils/cn";

interface ModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: "primary" | "danger";
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: ReactNode;
}

export const Modal = ({
  open,
  title,
  description,
  confirmLabel = "Подтвердить",
  cancelLabel = "Отмена",
  confirmVariant = "primary",
  onConfirm,
  onCancel,
  children,
}: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        className={cn(
          "w-full max-w-sm rounded-xl bg-white p-4 shadow-lg"
        )}
      >
        {title && (
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        )}
        {description && (
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        )}
        {children && <div className="mt-3 text-sm text-slate-700">{children}</div>}

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant === "danger" ? "danger" : "primary"}
            type="button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

