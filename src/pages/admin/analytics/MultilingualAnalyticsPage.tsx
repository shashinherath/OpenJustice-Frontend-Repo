import React, { useMemo } from "react";

const LANGS = [
  { code: "EN", label: "English", count: 1800 },
  { code: "SI", label: "Sinhala", count: 1200 },
  { code: "TA", label: "Tamil", count: 700 },
];

const MultilingualAnalyticsPage: React.FC = () => {
  const total = useMemo(() => LANGS.reduce((s, l) => s + l.count, 0), []);

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Multilingual Analytics
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Inspect language-level usage, translation volumes, and per-language
            engagement.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Total Queries
          </p>
          <p className="mt-3 text-2xl font-black text-white">{total}</p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Languages Tracked
          </p>
          <p className="mt-3 text-2xl font-black text-cyan-400">
            {LANGS.length}
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Translation Requests
          </p>
          <p className="mt-3 text-2xl font-black text-white">472</p>
        </article>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Language Share
        </h3>
        <div className="mt-4 space-y-4">
          {LANGS.map((l) => {
            const pct = Math.round((l.count / total) * 100);
            return (
              <article
                key={l.code}
                className="rounded border border-white/10 bg-[#191919] p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-200">
                    {l.label}
                  </p>
                  <p className="text-xs text-slate-400">
                    {l.count} ({pct}%)
                  </p>
                </div>
                <div className="h-2 overflow-hidden rounded bg-white/10">
                  <div
                    className="bg-cyan-400 h-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MultilingualAnalyticsPage;
