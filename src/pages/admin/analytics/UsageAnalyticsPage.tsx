import React, { useEffect, useState } from "react";
import { adminService, type AdminUsageAnalyticsResponse } from "@/services/adminService";

const UsageAnalyticsPage: React.FC = () => {
  const [data, setData] = useState<AdminUsageAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminService.getUsageAnalytics();
        setData(response);
      } catch (err: any) {
        setError(err.message || "Failed to load usage analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center p-8">
        <div className="text-cyan-600 dark:text-cyan-400">Loading usage analytics...</div>
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

  // Calculate maximum count for scaling the bar chart
  // Default to 1 to avoid division by zero, and enforce a minimum reasonable scale.
  const maxCount = Math.max(
    10,
    ...data.queries_per_day.map(d => d.count)
  );

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-white dark:bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Usage Analytics
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            High-level usage metrics including query volume, active users and
            peak times.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Queries This Week
          </p>
          <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{data.total_queries_this_week.toLocaleString()}</p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Active Users
          </p>
          <p className="mt-3 text-2xl font-black text-cyan-600 dark:text-cyan-400">{data.active_users.toLocaleString()}</p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Peak Hour
          </p>
          <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{data.peak_hour}</p>
        </article>
      </section>

      <section className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
          Queries Per Day
        </h3>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {data.queries_per_day.map((d, idx) => (
            <div key={`${d.day}-${idx}`} className="space-y-2 text-center">
              <div className="flex h-40 items-end rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-[#191919] p-2">
                <div
                  className="w-full rounded-sm bg-cyan-400/80 transition-all duration-500 ease-in-out"
                  style={{
                    height: `${Math.max(4, Math.round((d.count / maxCount) * 100))}%`,
                  }}
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{d.day}</p>
              <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                {d.count}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UsageAnalyticsPage;
