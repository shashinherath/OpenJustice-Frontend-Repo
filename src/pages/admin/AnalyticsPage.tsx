import React, { useMemo, useState } from "react";

interface DailyQuery {
  day: string;
  count: number;
}

interface LanguageShare {
  code: "EN" | "SI" | "TA";
  label: string;
  count: number;
  colorClass: string;
}

const DAILY_QUERIES: DailyQuery[] = [
  { day: "Mon", count: 462 },
  { day: "Tue", count: 512 },
  { day: "Wed", count: 488 },
  { day: "Thu", count: 556 },
  { day: "Fri", count: 603 },
  { day: "Sat", count: 421 },
  { day: "Sun", count: 394 },
];

const LANGUAGE_DATA: LanguageShare[] = [
  { code: "EN", label: "English", count: 1588, colorClass: "bg-cyan-400" },
  { code: "SI", label: "Sinhala", count: 1167, colorClass: "bg-green-400" },
  { code: "TA", label: "Tamil", count: 681, colorClass: "bg-amber-400" },
];

const AnalyticsPage: React.FC = () => {
  const [showTrendView, setShowTrendView] = useState<boolean>(false);

  const totalQueries = useMemo(
    () => DAILY_QUERIES.reduce((sum, item) => sum + item.count, 0),
    [],
  );
  const maxDailyCount = useMemo(
    () => Math.max(...DAILY_QUERIES.map((item) => item.count)),
    [],
  );
  const totalLanguageCount = useMemo(
    () => LANGUAGE_DATA.reduce((sum, item) => sum + item.count, 0),
    [],
  );

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Simple Analytics
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            View basic usage insights including daily query volume and language
            distribution.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Queries This Week
          </p>
          <p className="mt-3 text-2xl font-black text-white">{totalQueries}</p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Peak Day
          </p>
          <p className="mt-3 text-2xl font-black text-white">{maxDailyCount}</p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Tracked Languages
          </p>
          <p className="mt-3 text-2xl font-black text-white">3</p>
        </article>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Queries Per Day
          </h3>
          <button
            type="button"
            onClick={() => setShowTrendView((previous) => !previous)}
            className="rounded border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/20"
          >
            View trends
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {DAILY_QUERIES.map((item) => {
            const heightPercentage = Math.max(
              18,
              Math.round((item.count / maxDailyCount) * 100),
            );
            return (
              <div key={item.day} className="space-y-2 text-center">
                <div className="flex h-40 items-end rounded border border-white/10 bg-[#191919] p-2">
                  <div
                    className={`w-full rounded-sm ${showTrendView ? "bg-cyan-400/80" : "bg-white/60"}`}
                    style={{ height: `${heightPercentage}%` }}
                    title={`${item.day}: ${item.count}`}
                  />
                </div>
                <p className="text-[11px] text-slate-400">{item.day}</p>
                <p className="text-[11px] font-semibold text-slate-300">
                  {item.count}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Language Distribution (EN / SI / TA)
        </h3>
        <div className="mt-4 space-y-4">
          {LANGUAGE_DATA.map((item) => {
            const percentage = Math.round(
              (item.count / totalLanguageCount) * 100,
            );
            return (
              <article
                key={item.code}
                className="rounded border border-white/10 bg-[#191919] p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-200">
                    {item.code} - {item.label}
                  </p>
                  <p className="text-xs text-slate-400">
                    {item.count} queries ({percentage}%)
                  </p>
                </div>
                <div className="h-2 overflow-hidden rounded bg-white/10">
                  <div
                    className={`${item.colorClass} h-full`}
                    style={{ width: `${percentage}%` }}
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

export default AnalyticsPage;
