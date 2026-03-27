import React from "react";

const TrustSidebar: React.FC = () => {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-[#191919] p-4 gap-6 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="space-y-1">
        <h3 className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Transparency Hub</h3>
        <a className="flex items-center gap-3 px-3 py-2.5 rounded bg-white/10 text-white" href="#overview">
          <span className="material-symbols-outlined text-[20px]">dashboard</span>
          <span className="text-sm font-semibold">Overview</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 rounded text-slate-400 hover:bg-white/5 hover:text-white transition-colors" href="#generation">
          <span className="material-symbols-outlined text-[20px]">psychology</span>
          <span className="text-sm font-medium">AI Process</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 rounded text-slate-400 hover:bg-white/5 hover:text-white transition-colors" href="#sources">
          <span className="material-symbols-outlined text-[20px]">database</span>
          <span className="text-sm font-medium">Data Sources</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 rounded text-slate-400 hover:bg-white/5 hover:text-white transition-colors" href="#neutrality">
          <span className="material-symbols-outlined text-[20px]">balance</span>
          <span className="text-sm font-medium">Neutrality</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 rounded text-slate-400 hover:bg-white/5 hover:text-white transition-colors" href="#limitations">
          <span className="material-symbols-outlined text-[20px]">report_problem</span>
          <span className="text-sm font-medium">Limitations</span>
        </a>
      </div>
      <div className="mt-auto border-t border-white/10 pt-6">
        <div className="p-4 rounded border border-white/10 bg-white/5">
          <p className="text-[10px] font-bold text-white mb-2 uppercase tracking-widest">University Project</p>
          <p className="text-xs text-slate-500 leading-relaxed">Capstone 2026: Ethical Legal Information Retrieval Systems.</p>
        </div>
      </div>
    </aside>
  );
};

export default TrustSidebar;
