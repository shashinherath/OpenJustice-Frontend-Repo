import React from "react";
import { Link } from "react-router-dom";

const TrustHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#191919]/90 backdrop-blur-md px-6 py-4 lg:px-10">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-white text-3xl">balance</span>
          <h2 className="text-xl font-black leading-tight tracking-[0.15em] text-white">OPENJUSTICE</h2>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/chat">Research</Link>
          <a className="text-sm font-medium text-slate-400 hover:text-white transition-colors" href="#">History</a>
          <a className="text-sm font-medium text-slate-400 hover:text-white transition-colors" href="#">Library</a>
          <Link className="text-sm font-bold text-white border-b-2 border-white pb-1" to="/trust">Trust</Link>
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-4 lg:gap-6">
        <div className="hidden sm:flex items-stretch rounded bg-white/5 h-10 w-full max-w-xs border border-white/10 focus-within:border-white/30 transition-all">
          <div className="flex items-center justify-center pl-3 text-slate-500">
            <span className="material-symbols-outlined text-xl">search</span>
          </div>
          <input className="w-full bg-transparent border-none focus:ring-0 text-sm px-2 text-white placeholder-slate-600 outline-none" placeholder="Search framework..." type="text"/>
        </div>
        <button className="flex items-center justify-center rounded h-10 w-10 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-white">account_circle</span>
        </button>
      </div>
    </header>
  );
};

export default TrustHeader;
