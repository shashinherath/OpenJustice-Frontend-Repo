import React from "react";

interface PlatformShare {
  label: string;
  value: number;
  requests: string;
  avgResponse: string;
  tone: "cyan" | "emerald";
}

interface PlatformModeSplit {
  platform: "Web" | "WhatsApp";
  messageUsage: string;
  voiceUsage: string;
  messageRequests: string;
  voiceRequests: string;
  avgResponseMessage: string;
  avgResponseVoice: string;
}

interface VoiceHealthMetric {
  label: string;
  value: string;
  note: string;
  tone: "cyan" | "emerald" | "amber" | "rose";
}

interface LanguageDetectionRow {
  language: string;
  confidence: string;
  detectedRequests: string;
  fallbackRate: string;
}

const PLATFORM_DISTRIBUTION: PlatformShare[] = [
  {
    label: "Web",
    value: 64,
    requests: "23,550",
    avgResponse: "0.92s",
    tone: "cyan",
  },
  {
    label: "WhatsApp",
    value: 36,
    requests: "10,580",
    avgResponse: "1.18s",
    tone: "emerald",
  },
];

const PLATFORM_MODE_SPLIT: PlatformModeSplit[] = [
  {
    platform: "Web",
    messageUsage: "78%",
    voiceUsage: "22%",
    messageRequests: "18,369",
    voiceRequests: "5,181",
    avgResponseMessage: "0.81s",
    avgResponseVoice: "2.26s",
  },
  {
    platform: "WhatsApp",
    messageUsage: "73%",
    voiceUsage: "27%",
    messageRequests: "7,723",
    voiceRequests: "2,857",
    avgResponseMessage: "0.96s",
    avgResponseVoice: "2.62s",
  },
];

const VOICE_METRICS: VoiceHealthMetric[] = [
  {
    label: "Voice requests",
    value: "5,130",
    note: "Web and WhatsApp voice interactions in the current 7-day window.",
    tone: "cyan",
  },
  {
    label: "STT failures",
    value: "2.9%",
    note: "Whisper transcription failures after retry and confidence gating.",
    tone: "rose",
  },
  {
    label: "Avg transcription time",
    value: "1.62s",
    note: "Median time from audio upload to completed transcript output.",
    tone: "amber",
  },
  {
    label: "Language detection",
    value: "97.4%",
    note: "Correct language detection confidence before downstream response.",
    tone: "emerald",
  },
];

const LANGUAGE_DETECTION_ROWS: LanguageDetectionRow[] = [
  {
    language: "English",
    confidence: "98.6%",
    detectedRequests: "2,220",
    fallbackRate: "0.7%",
  },
  {
    language: "Sinhala",
    confidence: "96.9%",
    detectedRequests: "1,730",
    fallbackRate: "1.8%",
  },
  {
    language: "Tamil",
    confidence: "95.8%",
    detectedRequests: "1,180",
    fallbackRate: "2.4%",
  },
];

const getToneClasses = (
  tone: PlatformShare["tone"] | VoiceHealthMetric["tone"],
) => {
  if (tone === "cyan") {
    return "text-cyan-300 border-cyan-400/25 bg-cyan-500/5";
  }

  if (tone === "emerald") {
    return "text-emerald-300 border-emerald-400/25 bg-emerald-500/5";
  }

  if (tone === "amber") {
    return "text-amber-300 border-amber-400/25 bg-amber-500/5";
  }

  return "text-rose-300 border-rose-400/25 bg-rose-500/5";
};

const PlatformAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Platform Analytics
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Track distribution across web and WhatsApp channels, voice activity,
            and response performance while monitoring Whisper STT and TTS
            pipeline health.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Web Platform Usage
          </p>
          <p className="mt-3 text-2xl font-black text-cyan-300">64%</p>
          <p className="mt-2 text-xs text-slate-400">23,550 requests</p>
        </article>

        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            WhatsApp Platform Usage
          </p>
          <p className="mt-3 text-2xl font-black text-emerald-300">36%</p>
          <p className="mt-2 text-xs text-slate-400">10,580 requests</p>
        </article>

        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Voice Modality Usage
          </p>
          <p className="mt-3 text-2xl font-black text-amber-300">22.0%</p>
          <p className="mt-2 text-xs text-slate-400">
            8,038 voice requests across Web and WhatsApp
          </p>
        </article>

        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Avg Response Time
          </p>
          <p className="mt-3 text-2xl font-black text-white">1.29s</p>
          <p className="mt-2 text-xs text-slate-400">
            Weighted average across all platforms
          </p>
        </article>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Platform Distribution
        </h3>

        <div className="mt-5 space-y-4">
          {PLATFORM_DISTRIBUTION.map((platform) => (
            <article
              key={platform.label}
              className={`rounded border p-4 ${getToneClasses(platform.tone)}`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {platform.label}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Requests: {platform.requests} | Avg response:{" "}
                    {platform.avgResponse}
                  </p>
                </div>
                <p className="text-2xl font-black text-white">
                  {platform.value}%
                </p>
              </div>
              <div className="mt-3 h-2 rounded bg-black/35">
                <div
                  className="h-full rounded bg-current"
                  style={{ width: `${platform.value}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Message vs Voice by Platform
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          Voice is tracked as an interaction mode inside each platform, not as a
          standalone channel.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {PLATFORM_MODE_SPLIT.map((row) => (
            <article
              key={row.platform}
              className="rounded border border-white/10 bg-black/30 p-5"
            >
              <h4 className="text-base font-bold text-white">{row.platform}</h4>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded border border-cyan-400/20 bg-cyan-500/5 p-3">
                  <p className="font-bold uppercase tracking-widest text-cyan-300">
                    Message
                  </p>
                  <p className="mt-2 text-lg font-black text-white">
                    {row.messageUsage}
                  </p>
                  <p className="mt-1 text-slate-400">
                    {row.messageRequests} req
                  </p>
                  <p className="mt-1 text-slate-400">
                    Avg response: {row.avgResponseMessage}
                  </p>
                </div>

                <div className="rounded border border-amber-400/20 bg-amber-500/5 p-3">
                  <p className="font-bold uppercase tracking-widest text-amber-300">
                    Voice
                  </p>
                  <p className="mt-2 text-lg font-black text-white">
                    {row.voiceUsage}
                  </p>
                  <p className="mt-1 text-slate-400">{row.voiceRequests} req</p>
                  <p className="mt-1 text-slate-400">
                    Avg response: {row.avgResponseVoice}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Minimal Voice Metrics
          </h3>
          <div className="mt-4 space-y-3">
            {VOICE_METRICS.map((metric) => (
              <div
                key={metric.label}
                className={`rounded border p-4 ${getToneClasses(metric.tone)}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {metric.label}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{metric.note}</p>
                  </div>
                  <p className="text-xl font-black text-white">
                    {metric.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded border border-slate-700/70 bg-[#191919] p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Language Detection Quality
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Detection confidence and fallback behavior for voice traffic before
            response generation.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="px-3 py-3 font-semibold">Language</th>
                  <th className="px-3 py-3 font-semibold">Confidence</th>
                  <th className="px-3 py-3 font-semibold">Detected Requests</th>
                  <th className="px-3 py-3 font-semibold">Fallback Rate</th>
                </tr>
              </thead>
              <tbody>
                {LANGUAGE_DETECTION_ROWS.map((row) => (
                  <tr key={row.language} className="border-b border-white/5">
                    <td className="px-3 py-3 text-slate-300">{row.language}</td>
                    <td className="px-3 py-3 text-cyan-300">
                      {row.confidence}
                    </td>
                    <td className="px-3 py-3 text-slate-300">
                      {row.detectedRequests}
                    </td>
                    <td className="px-3 py-3 text-amber-300">
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
