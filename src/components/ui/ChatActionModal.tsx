import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ChatActionModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  tone?: "default" | "danger";
  icon?: string;
  inputLabel?: string;
  inputValue?: string;
  inputPlaceholder?: string;
  onInputChange?: (value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

const ChatActionModal: React.FC<ChatActionModalProps> = ({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  tone = "default",
  icon = "edit_note",
  inputLabel,
  inputValue,
  inputPlaceholder,
  onInputChange,
  onConfirm,
  onClose,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hasFocusedInputRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      hasFocusedInputRef.current = false;
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    if (!hasFocusedInputRef.current) {
      hasFocusedInputRef.current = true;
      window.setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select?.();
      }, 0);
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const confirmButtonClassName =
    tone === "danger"
      ? "bg-red-600 text-white hover:bg-red-500"
      : "bg-[var(--oj-accent-color)] text-white hover:opacity-90";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onConfirm();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-130 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl dark:border-zinc-800 dark:bg-[#191919] dark:text-zinc-100"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <form onSubmit={handleSubmit}>
          <header className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-zinc-800 dark:bg-[#121212] sm:px-6">
            <div className="flex items-center gap-3">
              <span
                className="material-symbols-outlined"
                style={{ color: "var(--oj-accent-color)" }}
              >
                {icon}
              </span>
              <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-zinc-100 sm:text-lg">
                {title}
              </h2>
            </div>
            <button
              className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>

          <div className="space-y-5 px-4 py-4 sm:px-6 sm:py-6">
            <p className="text-sm leading-6 text-slate-600 dark:text-zinc-300">{description}</p>

            {inputLabel && onInputChange && inputValue !== undefined && (
              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                  {inputLabel}
                </span>
                <input
                  ref={inputRef}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-(--oj-accent-color) dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                  type="text"
                  value={inputValue}
                  placeholder={inputPlaceholder}
                  onChange={(event) => onInputChange(event.target.value)}
                />
              </label>
            )}

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                type="button"
                onClick={onClose}
              >
                {cancelLabel}
              </button>
              <button
                className={`cursor-pointer rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${confirmButtonClassName}`}
                type="submit"
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default ChatActionModal;
