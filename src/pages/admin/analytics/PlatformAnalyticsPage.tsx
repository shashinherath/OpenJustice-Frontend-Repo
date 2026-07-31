import React, { useEffect, useState } from "react";
import { adminService, type AdminPlatformAnalyticsResponse, type PlatformShare, type VoiceHealthMetric } from "@/services/adminService";

const getToneClasses = (
  tone: PlatformShare["tone"] | VoiceHealthMetric["tone"],
) => {
  if (tone === "cyan") {
    return "text-cyan-600 dark:text-cyan-300 border-cyan-400/25 bg-cyan-500/5";
  }

  if (tone === "emerald") {
    return "text-emerald-600 dark:text-emerald-300 border-emerald-400/25 bg-emerald-500/5";
  }

  if (tone === "amber") {
    return "text-amber-600 dark:text-amber-300 border-amber-400/25 bg-amber-500/5";
  }

  return "text-rose-600 dark:text-rose-300 border-rose-400/25 bg-rose-500/5";
};

const PlatformAnalyticsPage: React.FC = () => {
  const [data, setData] = useState<AdminPlatformAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminService.getPlatformAnalytics();
        setData(response);
      } catch (err: any) {
        setError(err.message || "Failed to load platform analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center p-8">
        <div className="text-cyan-600 dark:text-cyan-400">Loading platform analytics...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-64 items-center justify-center p-8">
        <div className="text-rose-600 dark:text-rose-400">Error: {error || "No data available"}</div>
      </div>
    );
  }

  const webShare = data.platform_distribution.find((p) => p.label === "Web") || { value: 0, requests: "0" };
  const waShare = data.platform_distribution.find((p) => p.label === "WhatsApp") || { value: 0, requests: "0" };
  const voiceUsageTotal = data.platform_mode_split.reduce((acc, curr) => {
    return acc + parseInt(curr.voiceRequests.replace(/,/g, ""));
  }, 0);

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-white dark:bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Platform Analytics
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Track distribution across web and WhatsApp channels, voice activity,
            and response performance while monitoring Whisper STT and TTS
            pipeline health.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Web Platform Usage
          </p>
          <p className="mt-3 text-2xl font-black text-cyan-600 dark:text-cyan-300">{webShare.value}%</p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{webShare.requests} requests</p>
        </article>

        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            WhatsApp Platform Usage
          </p>
          <p className="mt-3 text-2xl font-black text-emerald-600 dark:text-emerald-300">{waShare.value}%</p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{waShare.requests} requests</p>
        </article>

        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Voice Modality Usage
          </p>
          <p className="mt-3 text-2xl font-black text-amber-600 dark:text-amber-300">
             {voiceUsageTotal.toLocaleString()} reqs
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Total voice requests across platforms
          </p>
        </article>

        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Avg Response Time
          </p>
          <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">1.29s</p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Weighted average across all platforms
          </p>
        </article>
      </section>

      <section className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
          Platform Distribution
        </h3>

        <div className="mt-5 space-y-4">
          {data.platform_distribution.map((platform) => (
            <article
              key={platform.label}
              className={`rounded border p-4 ${getToneClasses(platform.tone)}`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {platform.label}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Requests: {platform.requests} | Avg response:{" "}
                    {platform.avgResponse}
                  </p>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {platform.value}%
                </p>
              </div>
              <div className="mt-3 h-2 rounded bg-slate-200 dark:bg-black/35">
                <div
                  className="h-full rounded bg-current"
                  style={{ width: `${platform.value}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
          Message vs Voice by Platform
        </h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Voice is tracked as an interaction mode inside each platform, not as a
          standalone channel.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {data.platform_mode_split.map((row) => (
            <article
              key={row.platform}
              className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5"
            >
              <h4 className="text-base font-bold text-slate-900 dark:text-white">{row.platform}</h4>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded border border-cyan-400/20 bg-cyan-500/5 p-3">
                  <p className="font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-300">
                    Message
                  </p>
                  <p className="mt-2 text-lg font-black text-slate-900 dark:text-white">
                    {row.messageUsage}
                  </p>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">
                    {row.messageRequests} req
                  </p>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">
                    Avg response: {row.avgResponseMessage}
                  </p>
                </div>

                <div className="rounded border border-amber-400/20 bg-amber-500/5 p-3">
                  <p className="font-bold uppercase tracking-widest text-amber-600 dark:text-amber-300">
                    Voice
                  </p>
                  <p className="mt-2 text-lg font-black text-slate-900 dark:text-white">
                    {row.voiceUsage}
                  </p>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">{row.voiceRequests} req</p>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">
                    Avg response: {row.avgResponseVoice}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Minimal Voice Metrics
          </h3>
          <div className="mt-4 space-y-3">
            {data.voice_metrics.map((metric) => (
              <div
                key={metric.label}
                className={`rounded border p-4 ${getToneClasses(metric.tone)}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {metric.label}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{metric.note}</p>
                  </div>
                  <p className="text-xl font-black text-slate-900 dark:text-white">
                    {metric.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Language Detection Quality
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Detection confidence and fallback behavior for voice traffic before
            response generation.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  <th className="px-3 py-3 font-semibold">Language</th>
                  <th className="px-3 py-3 font-semibold">Confidence</th>
                  <th className="px-3 py-3 font-semibold">Detected Requests</th>
                  <th className="px-3 py-3 font-semibold">Fallback Rate</th>
                </tr>
              </thead>
              <tbody>
                {data.language_detection.map((row) => (
                  <tr key={row.language} className="border-b border-slate-100 dark:border-white/5">
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{row.language}</td>
                    <td className="px-3 py-3 text-cyan-600 dark:text-cyan-300">
                      {row.confidence}
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                      {row.detectedRequests}
                    </td>
                    <td className="px-3 py-3 text-amber-600 dark:text-amber-300">
                      {row.fallbackRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  );
};

export default PlatformAnalyticsPage;
