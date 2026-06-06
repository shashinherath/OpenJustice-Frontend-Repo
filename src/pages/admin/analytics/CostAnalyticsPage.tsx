import React, { useMemo, useEffect, useState } from "react";
import { adminService, type AdminCostAnalyticsResponse } from "@/services/adminService";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 1,
});

const integerFormatter = new Intl.NumberFormat("en-US");

const CostAnalyticsPage: React.FC = () => {
  const [data, setData] = useState<AdminCostAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminService.getCostAnalytics();
        setData(response);
      } catch (err: any) {
        setError(err.message || "Failed to load cost analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalOpenAiCost = useMemo(
    () => data?.cost_drivers.reduce((sum, driver) => sum + driver.estimatedCost, 0) || 0,
    [data]
  );
  
  const totalTwilioCost = useMemo(
    () => data?.twilio_items.reduce((sum, item) => sum + item.cost, 0) || 0,
    [data]
  );
  
  const totalCost = totalOpenAiCost + totalTwilioCost;
  
  const totalUsage = useMemo(
    () => data?.cost_drivers.reduce((sum, driver) => sum + driver.usage, 0) || 0,
    [data]
  );
  
  const maxDriverCost = useMemo(
    () => Math.max(1, ...(data?.cost_drivers.map((driver) => driver.estimatedCost) || [1])),
    [data]
  );
  
  const maxDailyTotal = useMemo(
    () => Math.max(1, ...(data?.daily_costs.map((entry) => entry.openAi + entry.twilio) || [1])),
    [data]
  );

  const projectedMonthlyCost = totalCost * 4.3;
  const openAiShare = totalCost > 0 ? Math.round((totalOpenAiCost / totalCost) * 100) : 0;

  const costSegments = useMemo(() => {
    if (!data) return [];
    let cursor = 0;

    return [
      ...data.cost_drivers.map((driver) => ({
        label: driver.title,
        color: driver.colorClass.includes("cyan")
          ? "rgba(34, 211, 238, 0.9)"
          : driver.colorClass.includes("emerald")
            ? "rgba(52, 211, 153, 0.9)"
            : driver.colorClass.includes("amber")
              ? "rgba(251, 191, 36, 0.9)"
              : "rgba(251, 113, 133, 0.9)",
        start: cursor,
        end: (cursor += totalCost > 0 ? (driver.estimatedCost / totalCost) * 360 : 0),
      })),
      {
        label: "Twilio",
        color: "rgba(96, 165, 250, 0.9)",
        start: cursor,
        end: 360,
      },
    ];
  }, [data, totalCost]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center p-8">
        <div className="text-cyan-400">Loading cost analytics...</div>
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
      <section className="rounded border border-rose-400/20 bg-[#191919] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-300/70">
              Analytics / Cost
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              Cost Analytics
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-300">
              Track the main spend drivers: OpenAI models, vector embeddings,
              transcription, and TTS, plus Twilio messaging.
            </p>
          </div>
          <div className="rounded border border-white/10 bg-black/30 px-4 py-3 text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Projected Monthly Cost
            </p>
            <p className="mt-2 text-2xl font-black text-white">
              {currencyFormatter.format(projectedMonthlyCost)}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Estimated Cost (7d)
          </p>
          <p className="mt-3 text-2xl font-black text-white">
            {currencyFormatter.format(totalCost)}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            OpenAI and Twilio combined
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            OpenAI Share
          </p>
          <p className="mt-3 text-2xl font-black text-rose-300">
            {openAiShare}%
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Primary cost driver across all AI features
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Tracked Usage Units
          </p>
          <p className="mt-3 text-2xl font-black text-white">
            {integerFormatter.format(totalUsage)}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Tokens, minutes, and characters measured
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Highest Daily Cost
          </p>
          <p className="mt-3 text-2xl font-black text-white">
            {currencyFormatter.format(maxDailyTotal)}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Peak activity day in the current window
          </p>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
                Daily Cost Trend
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                OpenAI spend versus Twilio messaging spend over the last 7 days.
              </p>
            </div>
            <span className="rounded border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-rose-300">
              7 day view
            </span>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-2">
            {data.daily_costs.map((entry, idx) => {
              const total = entry.openAi + entry.twilio;
              const openAiHeight = Math.max(
                4,
                Math.round((entry.openAi / maxDailyTotal) * 100)
              );
              const twilioHeight = Math.max(
                2,
                Math.round((entry.twilio / maxDailyTotal) * 100)
              );

              return (
                <div key={`${entry.day}-${idx}`} className="space-y-2 text-center">
                  <div className="flex h-44 items-end rounded border border-white/10 bg-black/20 p-2">
                    <div className="flex h-full w-full items-end gap-1">
                      <div
                        className="w-1/2 rounded-sm bg-rose-400/80 transition-all duration-500 ease-in-out"
                        style={{ height: `${openAiHeight}%` }}
                        title={`${entry.day} OpenAI: ${currencyFormatter.format(entry.openAi)}`}
                      />
                      <div
                        className="w-1/2 rounded-sm bg-blue-400/80 transition-all duration-500 ease-in-out"
                        style={{ height: `${twilioHeight}%` }}
                        title={`${entry.day} Twilio: ${currencyFormatter.format(entry.twilio)}`}
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">{entry.day}</p>
                  <p className="text-[11px] font-semibold text-slate-300">
                    {currencyFormatter.format(total)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              OpenAI
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Twilio
            </span>
          </div>
        </article>

        <article className="rounded border border-slate-700/70 bg-[#191919] p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Spend Mix
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Breakdown of total spend by cost driver.
          </p>

          <div className="mt-6 flex items-center justify-center">
            <div
              className="relative h-48 w-48 rounded-full border border-white/10 transition-all duration-1000 ease-in-out"
              style={{
                background: costSegments.length > 0 ? `conic-gradient(${costSegments
                  .map(
                    ({ color, start, end }) => `${color} ${start}deg ${end}deg`,
                  )
                  .join(", ")})` : '#333',
              }}
            >
              <div className="absolute inset-8 rounded-full border border-white/10 bg-[#191919]" />
              <div className="absolute inset-14 flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Total Cost
                </p>
                <p className="mt-2 text-xl font-black text-white">
                  {currencyFormatter.format(totalCost)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {data.cost_drivers.map((driver) => {
              const share = totalCost > 0 ? Math.round(
                (driver.estimatedCost / totalCost) * 100,
              ) : 0;
              return (
                <div
                  key={driver.key}
                  className="rounded border border-white/10 bg-black/20 p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-200">
                      {driver.title}
                    </p>
                    <p className="text-xs text-slate-400">
                      {currencyFormatter.format(driver.estimatedCost)} · {share}
                      %
                    </p>
                  </div>
                  <div className="h-2 overflow-hidden rounded bg-white/10">
                    <div
                      className={`${driver.colorClass} h-full transition-all duration-700 ease-in-out`}
                      style={{
                        width: `${Math.max(2, Math.round((driver.estimatedCost / maxDriverCost) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              OpenAI Cost Drivers
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              The backend cost is mostly driven by LLM tokens, embeddings,
              Whisper transcription minutes, and TTS character generation.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            Each driver is measured in its native billing unit.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.cost_drivers.map((driver) => (
            <article
              key={driver.key}
              className="rounded border border-white/10 bg-black/20 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    {driver.title}
                  </p>
                  <h4 className="mt-2 text-base font-semibold text-white">
                    {driver.model}
                  </h4>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white ${driver.colorClass}`}
                >
                  {driver.trend}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-400">{driver.detail}</p>

              <div className="mt-4 space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                    <span>Usage</span>
                    <span>{driver.unit}</span>
                  </div>
                  <p className="text-lg font-black text-white">
                    {integerFormatter.format(driver.usage)}
                  </p>
                </div>
                <div className="h-2 overflow-hidden rounded bg-white/10">
                  <div
                    className={`${driver.colorClass} h-full transition-all duration-700 ease-in-out`}
                    style={{
                      width: `${Math.max(4, Math.round((driver.estimatedCost / maxDriverCost) * 100))}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Estimated spend</span>
                  <span className="font-semibold text-white">
                    {currencyFormatter.format(driver.estimatedCost)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Twilio Messaging Costs
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              WhatsApp traffic is billed separately through Twilio for the phone
              number and per-message send/receive charges.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            Messaging spend is smaller than OpenAI, but still a live cost line.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.twilio_items.map((item) => (
            <article
              key={item.label}
              className="rounded border border-white/10 bg-black/20 p-4"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-3 text-2xl font-black text-white">
                {currencyFormatter.format(item.cost)}
              </p>
              <p className="mt-2 text-sm text-slate-400">{item.note}</p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Usage
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-200">
                    {integerFormatter.format(item.value)}
                  </p>
                </div>
                <div className="h-2 flex-1 overflow-hidden rounded bg-white/10">
                  <div
                    className="h-full bg-blue-400 transition-all duration-700 ease-in-out"
                    style={{
                      width: `${Math.max(4, Math.round((item.cost / Math.max(1, totalTwilioCost)) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded border border-white/10 bg-white/5 p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Twilio subtotal
              </p>
              <p className="mt-2 text-xl font-black text-white">
                {currencyFormatter.format(totalTwilioCost)}
              </p>
            </div>
            <p className="text-sm text-slate-400">
              Includes monthly number rental and WhatsApp delivery fees.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CostAnalyticsPage;
