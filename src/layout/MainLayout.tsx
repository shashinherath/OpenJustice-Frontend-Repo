import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/navigation/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
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
