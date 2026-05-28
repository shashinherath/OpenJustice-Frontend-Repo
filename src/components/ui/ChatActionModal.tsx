import React, { useEffect, useRef } from "react";

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

  return (
    <div
      className="fixed inset-0 z-130 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-[#191919] text-zinc-100 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <form onSubmit={handleSubmit}>
          <header className="flex items-center justify-between border-b border-zinc-800 bg-[#121212] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-zinc-300"
                style={{ color: "var(--oj-accent-color)" }}
              >
                {icon}
              </span>
              <h2 className="text-base font-bold tracking-tight text-zinc-100 sm:text-lg">
                {title}
              </h2>
            </div>
            <button
              className="cursor-pointer rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>

          <div className="space-y-5 px-4 py-4 sm:px-6 sm:py-6">
            <p className="text-sm leading-6 text-zinc-300">{description}</p>

            {inputLabel && onInputChange && inputValue !== undefined && (
              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  {inputLabel}
                </span>
                <input
                  ref={inputRef}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-(--oj-accent-color)"
                  type="text"
                  value={inputValue}
                  placeholder={inputPlaceholder}
                  onChange={(event) => onInputChange(event.target.value)}
                />
              </label>
            )}

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                className="cursor-pointer rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:bg-zinc-800"
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
    </div>
  );
};

export default ChatActionModal;
