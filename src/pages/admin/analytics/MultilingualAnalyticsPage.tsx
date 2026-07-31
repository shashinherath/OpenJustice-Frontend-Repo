import React, { useEffect, useState } from "react";
import { adminService, type AdminMultilingualAnalyticsResponse } from "@/services/adminService";

const MultilingualAnalyticsPage: React.FC = () => {
  const [data, setData] = useState<AdminMultilingualAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminService.getMultilingualAnalytics();
        setData(response);
      } catch (err: any) {
        setError(err.message || "Failed to load multilingual analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center p-8">
        <div className="text-cyan-600 dark:text-cyan-400">Loading multilingual analytics...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-64 items-center justify-center p-8">
        <div className="text-rose-400">Error: {error || "No data available"}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-white dark:bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Multilingual Analytics
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Inspect language-level usage, translation volumes, and per-language
            engagement.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Total Queries
          </p>
          <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{data.total_queries}</p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Languages Tracked
          </p>
          <p className="mt-3 text-2xl font-black text-cyan-600 dark:text-cyan-400">
            {data.total_languages}
          </p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Translation Requests
          </p>
          <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{data.translation_requests}</p>
        </article>
      </section>

      <section className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
          Language Share
        </h3>
        <div className="mt-4 space-y-4">
          {data.languages.map((l) => {
            const pct = data.total_queries > 0 ? Math.round((l.count / data.total_queries) * 100) : 0;
            return (
              <article
                key={l.code}
                className="rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-[#191919] p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {l.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l.count} ({pct}%)
                  </p>
                </div>
                <div className="h-2 overflow-hidden rounded bg-slate-100 dark:bg-white/10">
                  <div
                    className="bg-cyan-400 h-full transition-all duration-700 ease-in-out"
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
