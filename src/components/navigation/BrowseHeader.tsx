import React from "react";
import { Link } from "react-router-dom";
import BrandLogo from "@/components/ui/BrandLogo";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";

const BrowseHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between border-b border-[#2d2d2d] px-6 py-3 bg-[#191919] sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link className="flex items-center gap-3" to="/">
          <BrandLogo containerClassName="flex size-9 items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white text-primary" iconClassName="text-3xl" />
          <h2 className="text-xl font-black leading-tight tracking-widest uppercase text-white">OpenJustice</h2>
        </Link>
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
        <ThemeToggleButton />
      </div>
    </header>
  );
};

export default BrowseHeader;
