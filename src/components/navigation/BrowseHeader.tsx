import React from "react";
import { Link } from "react-router-dom";

const BrowseHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 dark:border-[#2d2d2d] dark:bg-[#191919]">
      <div className="flex items-center gap-8">
        <Link className="flex items-center gap-3" to="/">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-white dark:bg-white dark:text-primary">
            <span className="material-symbols-outlined text-2xl">balance</span>
          </div>
          <h2 className="text-xl font-black leading-tight tracking-widest uppercase text-slate-900 dark:text-white">OpenJustice</h2>
        </Link>
        <div className="hidden h-6 items-center border-l border-slate-200 pl-6 dark:border-[#2d2d2d] md:flex">
          <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:bg-[#2d2d2d] dark:text-slate-400">
            Research Prototype
          </span>
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-6 items-center">
        <label className="hidden lg:flex items-center min-w-64 relative group">
          <span className="material-symbols-outlined absolute left-3 text-slate-500 transition-colors" style={{ color: "var(--oj-accent-color)" }}>
            search
          </span>
          <input
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-500 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-[#2d2d2d] dark:bg-[#232323] dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-700"
            placeholder="Search laws or procedures..."
            type="text"
          />
        </label>
        <Link
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white shadow-lg transition-all"
          style={{ backgroundColor: "var(--oj-accent-color)" }}
          to="/chat"
        >
          <span className="material-symbols-outlined text-[18px]">chat</span>
          <span>Return to Ask</span>
        </Link>
      </div>
    </header>
  );
};

export default BrowseHeader;
