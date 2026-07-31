import React from "react";
import { useLocation } from "react-router-dom";
import { ADMIN_MODULE_BY_PATH } from "@/constants/admin-flow";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";

const AdminHeader: React.FC = () => {
  const { pathname } = useLocation();
  const activeModule =
    ADMIN_MODULE_BY_PATH[pathname] ?? ADMIN_MODULE_BY_PATH["/admin"];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#191919]/95 backdrop-blur-md px-8 py-4">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          {activeModule.label}
        </h1>
        <p className="text-[10px] text-cyan-600/80 dark:text-cyan-200/80 uppercase tracking-widest">
          {activeModule.subtitle}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-200 uppercase tracking-widest">
            System Online
          </span>
        </div>
        <ThemeToggleButton />
        <button className="material-symbols-outlined text-cyan-600/70 dark:text-cyan-200/70 hover:text-cyan-700 dark:hover:text-cyan-100">
          notifications
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
