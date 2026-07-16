import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import SettingsPage from "@/pages/settings/SettingsPage";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) {
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

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/60 p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="h-[82vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl dark:border-zinc-800 dark:bg-[#191919] dark:text-zinc-100"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Account Settings"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-6 dark:border-zinc-800 dark:bg-[#121212]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-500 dark:text-zinc-300">
              settings
            </span>
            <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg dark:text-zinc-100">
              Account Settings
            </h2>
          </div>
          <button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            type="button"
            onClick={onClose}
            aria-label="Close settings"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <div className="h-[calc(82vh-57px)] overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          <SettingsPage />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default SettingsModal;
