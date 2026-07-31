import React from "react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const confirmClass =
    variant === "danger"
      ? "rounded border border-red-400/30 bg-red-500/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-300 transition-colors hover:bg-red-500/25"
      : "rounded border border-cyan-400/30 bg-cyan-500/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-100 transition-colors hover:bg-cyan-500/25";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121212] p-6 shadow-xl">
        <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-slate-300 dark:border-slate-600 bg-transparent px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={confirmClass}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
