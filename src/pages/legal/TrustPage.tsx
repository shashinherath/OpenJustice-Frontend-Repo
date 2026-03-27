import React from "react";
import { Link } from "react-router-dom";
import TrustLayout from "@/layout/TrustLayout";

const TrustPage: React.FC = () => {
  return (
    <TrustLayout>
      <div className="max-w-4xl mx-auto px-6 py-12 lg:px-16">
        <div className="mb-16" id="overview">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <nav className="flex text-[10px] font-bold text-slate-500 mb-3 gap-2 uppercase tracking-widest">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-white">Trust & Transparency</span>
              </nav>
              <h1 className="text-5xl font-black tracking-tight text-white mb-4">Trust & Transparency</h1>
              <p className="text-xl text-slate-400 max-w-2xl leading-relaxed font-light">
                Our commitment to ethical AI research, legal integrity, and technical accountability for the university research community.
              </p>
            </div>
            <button className="flex items-center gap-2 rounded bg-white text-black px-5 py-2.5 text-xs font-bold hover:bg-slate-200 transition-all uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Framework PDF
            </button>
          </div>
          <div className="h-0.5 w-24 bg-white"></div>
        </div>

        <section className="mb-20" id="generation">
          <h2 className="text-2xl font-bold mb-10 flex items-center gap-4 text-white">
            <span className="material-symbols-outlined text-white">auto_awesome</span>
            How Answers are Generated
          </h2>
          <div className="relative space-y-0">
            <div className="grid grid-cols-[48px_1fr] gap-x-8">
              <div className="flex flex-col items-center">
                <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white border border-white/20">
                  <span className="material-symbols-outlined text-sm">search</span>
                </div>
                <div className="h-full w-px bg-white/10"></div>
              </div>
              <div className="pb-12 pt-1">
                <h3 className="text-lg font-bold text-white mb-2">Query Intent Analysis</h3>
                <p className="text-slate-400 leading-relaxed">
                  The AI first deconstructs your legal query into semantic components, identifying specific jurisdiction and core legal questions without assuming a desired outcome.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[48px_1fr] gap-x-8">
              <div className="flex flex-col items-center">
                <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                  <span className="material-symbols-outlined text-sm">verified</span>
                </div>
                <div className="h-full w-px bg-white/10"></div>
              </div>
              <div className="pb-12 pt-1">
                <h3 className="text-lg font-bold text-white mb-2">Verified Context Retrieval</h3>
                <p className="text-slate-400 leading-relaxed">
                  Instead of relying on training data alone, the system performs real-time retrieval from our <span className="text-white font-semibold">Verified Legal Corpus</span>.
                </p>
                <div className="mt-5 flex gap-2 flex-wrap">
                  <span className="px-2.5 py-1 bg-white/5 rounded border border-white/10 text-[9px] font-bold text-slate-300 uppercase tracking-widest">Statutory Law</span>
                  <span className="px-2.5 py-1 bg-white/5 rounded border border-white/10 text-[9px] font-bold text-slate-300 uppercase tracking-widest">Judicial Opinion</span>
                  <span className="px-2.5 py-1 bg-white/5 rounded border border-white/10 text-[9px] font-bold text-slate-300 uppercase tracking-widest">Reg. Filings</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[48px_1fr] gap-x-8">
              <div className="flex flex-col items-center">
                <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white border border-white/20">
                  <span className="material-symbols-outlined text-sm">edit_note</span>
                </div>
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-bold text-white mb-2">Cited Generative Synthesis</h3>
                <p className="text-slate-400 leading-relaxed">
                  A final summary is synthesized based strictly on retrieved documents. Every claim is mapped back to a specific legal citation to ensure strict accuracy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20" id="sources">
          <div className="p-8 rounded border border-white/10 bg-white/[0.02]">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold flex items-center gap-4 text-white">
                <span className="material-symbols-outlined">storage</span>
                Verified Sources
              </h2>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Updated Daily</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded border border-white/5 bg-[#191919] hover:border-white/20 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <span className="material-symbols-outlined">menu_book</span>
                  </div>
                  <h4 className="font-bold text-white">Federal Statutes</h4>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">Primary source material from the U.S. Code and official legislative records.</p>
              </div>
              <div className="p-6 rounded border border-white/5 bg-[#191919] hover:border-white/20 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <span className="material-symbols-outlined">gavel</span>
                  </div>
                  <h4 className="font-bold text-white">Supreme Court Cases</h4>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">Full judicial opinions spanning from the 18th century to current sessions.</p>
              </div>
              <div className="p-6 rounded border border-white/5 bg-[#191919] hover:border-white/20 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <span className="material-symbols-outlined">article</span>
                  </div>
                  <h4 className="font-bold text-white">Administrative Law</h4>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">Federal Register and Code of Federal Regulations (CFR) datasets.</p>
              </div>
              <div className="p-6 rounded border border-white/5 bg-[#191919] hover:border-white/20 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <span className="material-symbols-outlined">public</span>
                  </div>
                  <h4 className="font-bold text-white">State Level Data</h4>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">Select state legislative databases (expanding as part of the research project).</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20" id="neutrality">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-4 text-white">
                <span className="material-symbols-outlined">balance</span>
                Neutrality & Accuracy
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Our platform is engineered to prevent ideological bias in legal interpretation. We utilize a "Multi-Perspective Retrieval" approach where the AI identifies both majority and dissenting opinions.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-white text-xl">check_circle</span>
                  <span className="text-sm text-slate-300">No fine-tuning on partisan legal commentary or blogs.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-white text-xl">check_circle</span>
                  <span className="text-sm text-slate-300">Mandatory citation for every legal assertion.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-white text-xl">check_circle</span>
                  <span className="text-sm text-slate-300">Regular audits by university legal faculty partners.</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-64 aspect-square rounded border border-white/10 bg-white/5 flex items-center justify-center p-8 text-center">
              <div className="space-y-3 w-full">
                <span className="text-5xl font-black text-white">99.2%</span>
                <p className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em]">Citation Accuracy</p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-6">
                  <div className="h-full bg-white w-[99.2%]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20" id="limitations">
          <div className="border border-white/20 bg-white/[0.02] rounded p-8 relative overflow-hidden">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-4 text-white">
              <span className="material-symbols-outlined">error</span>
              Vital Limitations
            </h2>
            <p className="text-lg font-bold text-white mb-8 leading-relaxed">
              This system provides legal information, not legal advice. It is a research aid, not a substitute for a qualified attorney.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Scope of Knowledge</h4>
                <p className="text-sm text-slate-400 leading-relaxed">The AI may not be aware of case law decided in the last 24-48 hours until sync is complete.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Jurisdictional Nuance</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Local city ordinances and specific circuit variations may not be fully mapped.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Non-Predictive</h4>
                <p className="text-sm text-slate-400 leading-relaxed">OpenJustice describes what the law is, not how a specific judge or jury will rule.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Human Oversight</h4>
                <p className="text-sm text-slate-400 leading-relaxed">All outputs should be cross-referenced with the linked source documents provided.</p>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center gap-6">
              <p className="text-xs text-slate-500 italic flex-1 text-center sm:text-left">By using this tool, you acknowledge that you are using a university research prototype.</p>
              <button className="w-full sm:w-auto px-8 py-3 bg-white text-black text-xs font-black rounded uppercase tracking-widest hover:bg-slate-200 transition-all">
                I Understand
              </button>
            </div>
          </div>
        </section>

        <footer className="mt-20 py-16 border-t border-white/10 text-center">
          <div className="flex justify-center items-center gap-4 mb-6 opacity-30 grayscale">
            <span className="material-symbols-outlined text-xl">school</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">University Research & Ethics Faculty</span>
          </div>
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">OpenJustice © 2026. All rights reserved.</p>
        </footer>
      </div>
    </TrustLayout>
  );
};

export default TrustPage;
