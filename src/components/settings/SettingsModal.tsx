import React, { useEffect } from "react";
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

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/60 p-3 sm:p-6" onClick={onClose}>
      <div
        className="h-[82vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#191919] text-zinc-100 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Account Settings"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-[#121212] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-zinc-300">settings</span>
            <h2 className="text-base font-bold tracking-tight text-zinc-100 sm:text-lg">Account Settings</h2>
          </div>
          <button
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
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
    </div>
  );
};

export default SettingsModal;
