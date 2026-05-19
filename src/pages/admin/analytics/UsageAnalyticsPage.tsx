import React, { useMemo } from "react";

const DAILY = [
  { day: "Mon", count: 320 },
  { day: "Tue", count: 410 },
  { day: "Wed", count: 380 },
  { day: "Thu", count: 455 },
  { day: "Fri", count: 502 },
  { day: "Sat", count: 290 },
  { day: "Sun", count: 260 },
];

const UsageAnalyticsPage: React.FC = () => {
  const total = useMemo(() => DAILY.reduce((s, d) => s + d.count, 0), []);

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Usage Analytics
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            High-level usage metrics including query volume, active users and
            peak times.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Queries This Week
          </p>
          <p className="mt-3 text-2xl font-black text-white">{total}</p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Active Users
          </p>
          <p className="mt-3 text-2xl font-black text-cyan-400">1,248</p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Peak Hour
          </p>
          <p className="mt-3 text-2xl font-black text-white">18:00</p>
        </article>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Queries Per Day
        </h3>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {DAILY.map((d) => (
            <div key={d.day} className="space-y-2 text-center">
              <div className="flex h-40 items-end rounded border border-white/10 bg-[#191919] p-2">
                <div
                  className="w-full rounded-sm bg-cyan-400/80"
                  style={{
                    height: `${Math.max(18, Math.round((d.count / 502) * 100))}%`,
                  }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{d.day}</p>
              <p className="text-[11px] font-semibold text-slate-300">
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
