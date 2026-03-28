import React from "react";
import { Link } from "react-router-dom";
import { useSettingsModal } from "@/hooks/common/useSettingsModal";

const AdminSidebar: React.FC = () => {
  const { openSettings } = useSettingsModal();

  return (
    <aside className="w-64 flex flex-col border-r border-white/10 bg-[#191919]">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-white text-3xl">balance</span>
          <Link to="/">
            <h2 className="text-xl font-black leading-tight tracking-[0.15em] text-white">OPENJUSTICE</h2>
          </Link>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Administration</p>
        <a className="flex items-center gap-3 px-3 py-2.5 rounded bg-white/10 text-white" href="#">
          <span className="material-symbols-outlined text-[20px]">dashboard</span>
          <span className="text-sm font-semibold">Overview</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 rounded text-slate-400 hover:bg-white/5 hover:text-white transition-colors" href="#">
          <span className="material-symbols-outlined text-[20px]">monitoring</span>
          <span className="text-sm font-medium">System Health</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 rounded text-slate-400 hover:bg-white/5 hover:text-white transition-colors" href="#">
          <span className="material-symbols-outlined text-[20px]">policy</span>
          <span className="text-sm font-medium">Ethical Audits</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 rounded text-slate-400 hover:bg-white/5 hover:text-white transition-colors" href="#">
          <span className="material-symbols-outlined text-[20px]">database</span>
          <span className="text-sm font-medium">Data Pipelines</span>
        </a>
        <button
          className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          type="button"
          onClick={openSettings}
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span className="text-sm font-medium">Configurations</span>
        </button>
      </nav>
      <div className="p-4 border-t border-white/10 bg-white/2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden">
            <span className="material-symbols-outlined text-white">account_circle</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Admin User</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest truncate">System Overseer</p>
          </div>
          <button className="text-slate-500 hover:text-white">
            <span className="material-symbols-outlined text-sm">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
