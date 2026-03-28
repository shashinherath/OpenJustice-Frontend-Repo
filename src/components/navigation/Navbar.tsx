import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/ui/BrandLogo";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isLoginOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLoginOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLoginOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoginOpen(false);
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="px-4 md:px-10 lg:px-40 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <BrandLogo containerClassName="flex size-9 items-center justify-center overflow-hidden rounded-lg bg-primary text-white dark:bg-white dark:text-primary" iconClassName="text-2xl" />
            <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">
              OpenJustice
            </h2>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Login Button */}
            <button
              className="text-sm font-semibold text-primary dark:text-white hover:opacity-70 transition-opacity"
              type="button"
              onClick={() => setIsLoginOpen(true)}
            >
              {t("logIn")}
            </button>
          </div>
        </div>
      </header>

      {isLoginOpen && (
        <div className="fixed inset-0 z-140 flex items-center justify-center bg-black/60 p-4" onClick={() => setIsLoginOpen(false)}>
          <div
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-border-dark dark:bg-brand-bg"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Login"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Login</h3>
              <button
                className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-surface-dark dark:hover:text-white"
                type="button"
                onClick={() => setIsLoginOpen(false)}
                aria-label="Close login window"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Username</label>
                <input
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-500 dark:border-border-dark dark:bg-surface-dark dark:text-white"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Password</label>
                <input
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-500 dark:border-border-dark dark:bg-surface-dark dark:text-white"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <button
                className="mt-2 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                type="submit"
              >
                {t("logIn")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

