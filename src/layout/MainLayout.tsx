import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const location = useLocation();

  // Apply chat-like glassy background only on the homepage
  const isHome = location.pathname === "/";

  const wrapperClass = isHome
    ? "relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_45%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.10),transparent_28%),linear-gradient(180deg,#0f1117_0%,#151922_45%,#191919_100%)]"
    : "relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden";

  const mainClass = isHome
    ? "flex-1 flex flex-col overflow-y-auto bg-white/45 backdrop-blur-2xl dark:bg-black/10"
    : "flex-1 flex flex-col";

  return (
    <div className={wrapperClass}>
      <Navbar />
      <main className={mainClass}>{children}</main>
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark py-12">
        <div className="px-4 md:px-10 lg:px-40 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-slate-400 dark:text-slate-500 text-xs font-normal max-w-2xl leading-relaxed">
            <strong className="text-slate-500 dark:text-slate-400">
              {t("legalDisclaimerTitle")}
            </strong>{" "}
            {t("legalDisclaimerBody")}
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">
            {t("prototypeCopyright")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
