import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface WhatsAppConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatsAppConnectModal: React.FC<WhatsAppConnectModalProps> = ({
  isOpen,
  onClose,
}) => {
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

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  const handleOpenLink = () => {
    window.open("https://wa.me/+14155238886?text=join%20both-road", "_blank", "noopener,noreferrer");
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/60 p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl dark:border-zinc-800 dark:bg-[#191919] dark:text-zinc-100"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Connect WhatsApp"
      >
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-6 dark:border-zinc-800 dark:bg-[#121212]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-500 dark:text-zinc-300">
              qr_code_2
            </span>
            <div>
              <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-zinc-100 sm:text-lg">
                Connect WhatsApp
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Twilio WhatsApp Sandbox Integration
              </p>
            </div>
          </div>
          <button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        {/* Content */}
        <div className="flex flex-col items-center px-6 py-6 text-center space-y-5">
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Scan the QR code on mobile
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
              Open WhatsApp on your mobile device, scan the code below, or send the sandbox join message to connect.
            </p>
          </div>

          {/* QR Code Container */}
          <div className="relative group p-4 bg-white rounded-2xl shadow-lg border border-slate-200/80 transition-all duration-300 hover:shadow-xl hover:shadow-[#25D366]/10">
            <img
              src="/whatsapp-qr.png"
              alt="WhatsApp Sandbox QR Code"
              className="w-64 h-64 sm:w-72 sm:h-72 object-contain mx-auto select-none rounded-lg"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-800/80 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-700/60 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Twilio WhatsApp Sandbox</span>
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-zinc-800 dark:bg-[#121212]">
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-zinc-200 transition-all hover:bg-slate-50 dark:hover:bg-zinc-700 hover:border-[#25D366]/40 cursor-pointer shadow-2xs"
            type="button"
            onClick={handleOpenLink}
          >
            <span className="material-symbols-outlined text-[16px] text-[#25D366]">
              open_in_new
            </span>
            Open in WhatsApp
          </button>

          <button
            className="inline-flex items-center justify-center rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs px-5 py-2.5 shadow-md shadow-[#25D366]/20 transition-all active:scale-95 cursor-pointer"
            type="button"
            onClick={onClose}
          >
            Done
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
};

export default WhatsAppConnectModal;
