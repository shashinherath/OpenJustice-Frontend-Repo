import React from "react";
import { useLocation } from "react-router-dom";
import { ADMIN_MODULE_BY_PATH } from "@/constants/admin-flow";

const AdminHeader: React.FC = () => {
  const { pathname } = useLocation();
  const activeModule = ADMIN_MODULE_BY_PATH[pathname] ?? ADMIN_MODULE_BY_PATH["/admin"];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#191919]/95 backdrop-blur-md px-8 py-4">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">{activeModule.label}</h1>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">{activeModule.subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">System Online</span>
        </div>
        <button className="material-symbols-outlined text-slate-400 hover:text-white">notifications</button>
      </div>
    </header>
  );
};

export default AdminHeader;
