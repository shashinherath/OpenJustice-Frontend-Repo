import React, { useMemo, useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { adminService, type AdminCostAnalyticsResponse } from "@/services/adminService";

const currencyFormatter = {
  format: (usdAmount: number) => {
    const rsAmount = usdAmount * 335.28;
    return `Rs. ${rsAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
};

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

  const maxDailyTotal = useMemo(
    () => Math.max(1, ...(data?.daily_costs.map((entry) => entry.openAi + entry.twilio) || [1])),
    [data]
  );

  const projectedMonthlyCost = totalCost * 4.3;

  const aggregatedCategories = useMemo(() => {
    if (!data) return [];

    let languageModelsCost = 0;
    let embeddingModelsCost = 0;
    let sttCost = 0;
    let ttsCost = 0;

    data.cost_drivers.forEach(driver => {
      if (driver.title === "Language Models") languageModelsCost += driver.estimatedCost;
      else if (driver.title === "Vector Embeddings") embeddingModelsCost += driver.estimatedCost;
      else if (driver.title === "Speech-to-Text") sttCost += driver.estimatedCost;
      else if (driver.title === "Text-to-Speech") ttsCost += driver.estimatedCost;
    });

    return [
      { id: 'lm', label: "Language models", cost: languageModelsCost, colorClass: "bg-cyan-400", hex: "rgba(34, 211, 238, 0.9)" },
      { id: 'em', label: "Embedding Models", cost: embeddingModelsCost, colorClass: "bg-emerald-400", hex: "rgba(52, 211, 153, 0.9)" },
      { id: 'stt', label: "Speech-to-Text", cost: sttCost, colorClass: "bg-amber-400", hex: "rgba(251, 191, 36, 0.9)" },
      { id: 'tts', label: "Text-to-Speech", cost: ttsCost, colorClass: "bg-rose-400", hex: "rgba(251, 113, 133, 0.9)" },
      { id: 'tw', label: "Twilio", cost: totalTwilioCost, colorClass: "bg-blue-400", hex: "rgba(96, 165, 250, 0.9)" }
    ].filter(cat => cat.cost > 0).sort((a, b) => b.cost - a.cost);
  }, [data, totalTwilioCost]);

  const costSegments = useMemo(() => {
    let cursor = 0;
    return aggregatedCategories.map(cat => ({
      label: cat.label,
      color: cat.hex,
      start: cursor,
      end: (cursor += totalCost > 0 ? (cat.cost / totalCost) * 360 : 0)
    }));
  }, [aggregatedCategories, totalCost]);

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
        <article className="rounded border border-white/10 bg-[#191919] p-5">
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
        <article className="rounded border border-white/10 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            OpenAI Cost
          </p>
          <p className="mt-3 text-2xl font-black text-rose-300">
            {currencyFormatter.format(totalOpenAiCost)}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Models, embeddings, STT, and TTS
          </p>
        </article>
        <article className="rounded border border-white/10 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Twilio Cost
          </p>
          <p className="mt-3 text-2xl font-black text-blue-400">
            {currencyFormatter.format(totalTwilioCost)}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            WhatsApp messaging and numbers
          </p>
        </article>
        <article className="rounded border border-white/10 bg-[#191919] p-5">
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
        <article className="rounded border border-white/10 bg-[#191919] p-6">
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
                  <div className="flex h-44 items-end rounded border border-white/10 bg-black/30 p-2">
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

          {data.daily_model_costs && data.daily_model_costs.length > 0 && (
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    OpenAI Model Trending
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Daily cost split across language models, embeddings, and audio generation.
                  </p>
                </div>
              </div>

              <div className="mt-4 h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.daily_model_costs} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="day" 
                      stroke="#64748b" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                      dy={5} 
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#191919', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}
                      itemStyle={{ fontSize: '11px' }}
                      labelStyle={{ color: '#cbd5e1', marginBottom: '4px', fontSize: '11px', fontWeight: 'bold' }}
                      formatter={(value: any) => [currencyFormatter.format(Number(value))]}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '5px' }} />
                    <Line type="monotone" name="Language Models" dataKey="llm" stroke="#22d3ee" strokeWidth={2} dot={{ r: 2.5, fill: '#191919', strokeWidth: 2 }} activeDot={{ r: 4 }} />
                    <Line type="monotone" name="Embeddings" dataKey="embedding" stroke="#34d399" strokeWidth={2} dot={{ r: 2.5, fill: '#191919', strokeWidth: 2 }} activeDot={{ r: 4 }} />
                    <Line type="monotone" name="Speech-to-Text" dataKey="stt" stroke="#fbbf24" strokeWidth={2} dot={{ r: 2.5, fill: '#191919', strokeWidth: 2 }} activeDot={{ r: 4 }} />
                    <Line type="monotone" name="Text-to-Speech" dataKey="tts" stroke="#fb7185" strokeWidth={2} dot={{ r: 2.5, fill: '#191919', strokeWidth: 2 }} activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </article>

        <article className="rounded border border-white/10 bg-[#191919] p-6">
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

          <div className="mt-6 space-y-3">
            {aggregatedCategories.map((cat) => {
              const share = totalCost > 0 ? Math.round(
                (cat.cost / totalCost) * 100,
              ) : 0;
              const maxCategoryCost = Math.max(1, ...aggregatedCategories.map(c => c.cost));

              return (
                <div
                  key={cat.id}
                  className="rounded border border-white/10 bg-black/30 p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-200">
                      {cat.label}
                    </p>
                    <p className="text-xs text-slate-400">
                      {currencyFormatter.format(cat.cost)} · {share}%
                    </p>
                  </div>
                  <div className="h-2 overflow-hidden rounded bg-white/10">
                    <div
                      className={`${cat.colorClass} h-full transition-all duration-700 ease-in-out`}
                      style={{
                        width: `${Math.max(2, Math.round((cat.cost / maxCategoryCost) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>


      <section className="rounded border border-white/10 bg-[#191919] p-6">
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

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-500">
                <th className="px-3 py-3 font-semibold">Driver</th>
                <th className="px-3 py-3 font-semibold">Model</th>
                <th className="px-3 py-3 font-semibold">Usage</th>
                <th className="px-3 py-3 font-semibold">Trend</th>
                <th className="px-3 py-3 font-semibold text-right">Estimated Spend</th>
              </tr>
            </thead>
            <tbody>
              {[...data.cost_drivers].sort((a, b) => b.estimatedCost - a.estimatedCost).map((driver) => (
                <tr key={driver.key} className="border-b border-white/5">
                  <td className="px-3 py-3 text-slate-200">
                    <div>
                      <p className="font-semibold">{driver.title}</p>
                      <p className="mt-1 text-xs text-slate-400">{driver.detail}</p>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-slate-300">{driver.model}</td>
                  <td className="px-3 py-3 text-slate-300">
                    {integerFormatter.format(driver.usage)} <span className="text-xs text-slate-500">({driver.unit})</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${driver.colorClass.replace('bg-', 'text-')}`}>
                      {driver.trend}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-semibold text-white">
                    {currencyFormatter.format(driver.estimatedCost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded border border-white/10 bg-white/5 p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                OpenAI subtotal
              </p>
              <p className="mt-2 text-xl font-black text-white">
                {currencyFormatter.format(totalOpenAiCost)}
              </p>
            </div>
            <p className="text-sm text-slate-400">
              Includes text generation, embeddings, and audio processing fees.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded border border-white/10 bg-[#191919] p-6">
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

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-500">
                <th className="px-3 py-3 font-semibold">Item</th>
                <th className="px-3 py-3 font-semibold">Usage</th>
                <th className="px-3 py-3 font-semibold text-right">Estimated Spend</th>
              </tr>
            </thead>
            <tbody>
              {data.twilio_items.map((item) => (
                <tr key={item.label} className="border-b border-white/5">
                  <td className="px-3 py-3 text-slate-200">
                    <div>
                      <p className="font-semibold">{item.label}</p>
                      <p className="mt-1 text-xs text-slate-400">{item.note}</p>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-slate-300">
                    {integerFormatter.format(item.value)}
                  </td>
                  <td className="px-3 py-3 text-right font-semibold text-blue-400">
                    {currencyFormatter.format(item.cost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
