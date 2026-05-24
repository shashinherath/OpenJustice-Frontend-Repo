import React from "react";
import { Link } from "react-router-dom";

interface RetrievalMetric {
  label: string;
  value: string;
  note: string;
  tone: "emerald" | "cyan" | "amber" | "violet" | "rose";
}

interface RetrievalCheck {
  queryFamily: string;
  topK: number;
  avgSimilarity: string;
  latency: string;
  citationValidity: string;
  status: "Healthy" | "Review" | "Degraded";
}

const METRICS: RetrievalMetric[] = [
  {
    label: "Avg similarity score",
    value: "0.87",
    note: "Mean cosine similarity across recent retrievals.",
    tone: "cyan",
  },
  {
    label: "Top-K accuracy",
    value: "92.4%",
    note: "Relevant chunk appears inside the first K results.",
    tone: "emerald",
  },
  {
    label: "Retrieval latency",
    value: "184ms",
    note: "Median time from query to ranked chunk response.",
    tone: "amber",
  },
  {
    label: "Chunk hit rate",
    value: "96.1%",
    note: "Queries that return at least one highly relevant chunk.",
    tone: "violet",
  },
  {
    label: "Citation validity",
    value: "98.3%",
    note: "Answer citations resolve to matching retrieval evidence.",
    tone: "rose",
  },
];

const TREND_POINTS = [
  { label: "Mon", value: 82 },
  { label: "Tue", value: 84 },
  { label: "Wed", value: 86 },
  { label: "Thu", value: 87 },
  { label: "Fri", value: 88 },
  { label: "Sat", value: 86 },
  { label: "Sun", value: 87 },
];

const RETRIEVAL_CHECKS: RetrievalCheck[] = [
  {
    queryFamily: "Constitutional rights",
    topK: 5,
    avgSimilarity: "0.91",
    latency: "162ms",
    citationValidity: "100%",
    status: "Healthy",
  },
  {
    queryFamily: "Land dispute precedent",
    topK: 5,
    avgSimilarity: "0.84",
    latency: "188ms",
    citationValidity: "96%",
    status: "Healthy",
  },
  {
    queryFamily: "Procedural rule lookup",
    topK: 10,
    avgSimilarity: "0.78",
    latency: "241ms",
    citationValidity: "92%",
    status: "Review",
  },
  {
    queryFamily: "Policy cross-reference",
    topK: 5,
    avgSimilarity: "0.72",
    latency: "263ms",
    citationValidity: "88%",
    status: "Degraded",
  },
];

const getToneClasses = (tone: RetrievalMetric["tone"]) => {
  const tones: Record<RetrievalMetric["tone"], string> = {
    emerald: "text-emerald-300",
    cyan: "text-cyan-300",
    amber: "text-amber-300",
    violet: "text-violet-300",
    rose: "text-rose-300",
  };

  return tones[tone];
};

const getStatusClasses = (status: RetrievalCheck["status"]) => {
  if (status === "Healthy") {
    return "bg-emerald-500/15 text-emerald-300";
  }

  if (status === "Review") {
    return "bg-amber-500/15 text-amber-300";
  }

  return "bg-rose-500/15 text-rose-300";
};

const RetrievalMonitoringPage: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
              RAG Operations
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              Retrieval Monitoring
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-300">
              Monitor live retrieval quality independently from knowledge
              ingestion. This view focuses on ranking quality, latency, chunk
              hit rate, and citation validity.
            </p>
          </div>
          <div className="rounded border border-white/10 bg-black/30 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Operational signal layer
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {METRICS.map((metric) => (
          <article
            key={metric.label}
            className="rounded border border-white/10 bg-[#191919] p-5"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              {metric.label}
            </p>
            <p
              className={`mt-3 text-2xl font-black ${getToneClasses(metric.tone)}`}
            >
              {metric.value}
            </p>
            <p className="mt-2 text-xs text-slate-400">{metric.note}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
                Similarity Trend
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Recent average similarity performance across retrieval runs.
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              7 day window
            </span>
          </div>

          <div className="mt-5 grid grid-cols-7 gap-2">
            {TREND_POINTS.map((point) => (
              <div key={point.label} className="space-y-2 text-center">
                <div className="flex h-44 items-end rounded border border-white/10 bg-black/30 p-2">
                  <div
                    className="w-full rounded-sm bg-cyan-400/85 transition-all hover:bg-cyan-300"
                    style={{ height: `${point.value}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400">{point.label}</p>
                <p className="text-[11px] font-semibold text-slate-300">
                  {point.value}%
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded border border-slate-700/70 bg-[#191919] p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Retrieval Health Targets
          </h3>
          <div className="mt-5 space-y-4">
            <div className="rounded border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-slate-200">
                  Latency p95
                </span>
                <span className="text-sm font-bold text-amber-300">240ms</span>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Investigate cache misses and vector store pressure when this
                exceeds the threshold.
              </p>
            </div>
            <div className="rounded border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-slate-200">
                  Citation mismatch rate
                </span>
                <span className="text-sm font-bold text-rose-300">1.7%</span>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Any increase here should be traced to prompt grounding or source
                selection issues.
              </p>
            </div>
            <div className="rounded border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-slate-200">
                  Top-K hit confidence
                </span>
                <span className="text-sm font-bold text-emerald-300">High</span>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Prefer stable gains here before relaxing chunking or ranking
                thresholds.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Recent Retrieval Checks
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Sample operational checks used to validate retrieval quality.
            </p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {RETRIEVAL_CHECKS.length} entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-500">
                <th className="px-3 py-3 font-semibold">Query family</th>
                <th className="px-3 py-3 font-semibold">Top-K</th>
                <th className="px-3 py-3 font-semibold">Avg similarity</th>
                <th className="px-3 py-3 font-semibold">Latency</th>
                <th className="px-3 py-3 font-semibold">Citation validity</th>
                <th className="px-3 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {RETRIEVAL_CHECKS.map((check) => (
                <tr key={check.queryFamily} className="border-b border-white/5">
                  <td className="px-3 py-3 text-slate-200">
                    {check.queryFamily}
                  </td>
                  <td className="px-3 py-3 text-slate-300">{check.topK}</td>
                  <td className="px-3 py-3 text-slate-300">
                    {check.avgSimilarity}
                  </td>
                  <td className="px-3 py-3 text-slate-300">{check.latency}</td>
                  <td className="px-3 py-3 text-slate-300">
                    {check.citationValidity}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${getStatusClasses(check.status)}`}
                    >
                      {check.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          to="/admin/analytics/retrieval-evaluation"
          className="rounded border border-cyan-400/20 bg-[#191919] p-5 transition-colors hover:border-cyan-400/40 hover:bg-cyan-500/5"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Research view
          </p>
          <h4 className="mt-2 text-base font-bold text-white">
            Open retrieval evaluation
          </h4>
          <p className="mt-2 text-sm text-slate-400">
            Compare recall, precision, and similarity distributions in the
            evaluation layer.
          </p>
        </Link>

        <Link
          to="/admin/settings/retrieval"
          className="rounded border border-cyan-400/20 bg-[#191919] p-5 transition-colors hover:border-cyan-400/40 hover:bg-cyan-500/5"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Tuning view
          </p>
          <h4 className="mt-2 text-base font-bold text-white">
            Open retrieval settings
          </h4>
          <p className="mt-2 text-sm text-slate-400">
            Adjust top-K, similarity threshold, embedding model, and chunking
            configuration.
          </p>
        </Link>
      </section>
    </div>
  );
};

export default RetrievalMonitoringPage;
