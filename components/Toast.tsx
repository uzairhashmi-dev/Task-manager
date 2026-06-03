"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Toast as ToastType } from "@/hooks/useToast";

type ToastItemProps = {
  toast: ToastType;
  onDismiss: (id: string) => void;
  onUndo?: (id: string) => void;
};

function ToastItem({ toast, onDismiss, onUndo }: ToastItemProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const styles = {
    delete: {
      bg: "bg-rose-50 dark:bg-rose-500/10",
      border: "border-rose-200 dark:border-rose-500/20",
      text: "text-rose-700 dark:text-rose-300",
      undoBg:
        "bg-rose-100 hover:bg-rose-200 dark:bg-rose-500/20 dark:hover:bg-rose-500/30",
      undoText: "text-rose-700 dark:text-rose-300",
    },
    restore: {
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/20",
      text: "text-emerald-700 dark:text-emerald-300",
      undoBg: "",
      undoText: "",
    },
    error: {
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/20",
      text: "text-amber-700 dark:text-amber-300",
      undoBg: "",
      undoText: "",
    },
  };

  const s = styles[toast.type];

  return (
    <div
      className={[
        "flex items-center gap-3 rounded-xl border px-4 py-3",
        "shadow-lg min-w-[280px] max-w-sm",
        "transition-all duration-300",
        s.bg,
        s.border,
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2",
      ].join(" ")}
    >

      {/* Message */}
      <p className={`flex-1 text-sm font-medium ${s.text}`}>
        {toast.message}
      </p>

      {/* Undo — sirf delete toast pe */}
      {toast.type === "delete" && onUndo && (
        <button
          type="button"
          onClick={() => onUndo(toast.id)}
          className={[
            "rounded-lg px-3 py-1 text-xs font-semibold transition-colors",
            s.undoBg,
            s.undoText,
          ].join(" ")}
        >
          Undo
        </button>
      )}

      {/* Dismiss */}
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className={`rounded-full p-0.5 transition-colors
                    opacity-60 hover:opacity-100 ${s.text}`}
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}

type ToastContainerProps = {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
  onUndo?: (id: string) => void;
};

export default function ToastContainer({
  toasts,
  onDismiss,
  onUndo,
}: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className={[
        "fixed bottom-6 right-4 z-50",
        "flex flex-col gap-2",
        "sm:right-6",
      ].join(" ")}
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
          onUndo={onUndo}
        />
      ))}
    </div>
  );
}