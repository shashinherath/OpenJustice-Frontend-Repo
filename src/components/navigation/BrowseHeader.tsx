import React from "react";
import { Link } from "react-router-dom";

const BrowseHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between border-b border-[#2d2d2d] px-6 py-3 bg-[#191919] sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link className="flex items-center gap-3" to="/">
          <div className="flex items-center justify-center text-[#1152d4]">
            <span className="material-symbols-outlined text-3xl">balance</span>
          </div>
          <h2 className="text-xl font-black leading-tight tracking-[0.1em] uppercase text-white">OpenJustice</h2>
        </Link>
        <div className="hidden md:flex items-center border-l border-[#2d2d2d] pl-6 h-6">
          <span className="px-2 py-1 bg-[#2d2d2d] text-slate-400 text-[10px] font-bold rounded uppercase tracking-widest">
            Research Prototype
          </span>
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-6 items-center">
        <label className="hidden lg:flex items-center min-w-64 relative group">
          <span className="material-symbols-outlined absolute left-3 text-slate-500 transition-colors group-focus-within:text-[#1152d4]">
            search
          </span>
          <input
            className="w-full h-10 pl-10 pr-4 rounded-lg border-[#2d2d2d] bg-[#232323] text-sm focus:ring-2 focus:ring-[#1152d4] focus:border-[#1152d4] transition-all placeholder:text-slate-500 text-slate-100 outline-none"
            placeholder="Search laws or procedures..."
            type="text"
          />
        </label>
        <Link
          className="flex items-center gap-2 bg-[#1152d4] hover:bg-[#1152d4]/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-[#1152d4]/20"
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
