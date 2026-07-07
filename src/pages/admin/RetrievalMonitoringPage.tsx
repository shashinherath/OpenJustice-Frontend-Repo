import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminService } from "@/services/adminService";
import type { AdminRetrievalMonitoringResponse, RetrievalMetric, RetrievalCheck } from "@/services/adminService";

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
  if (status === "Pass") {
    return "bg-emerald-500/15 text-emerald-300";
  }

  if (status === "Warn") {
    return "bg-amber-500/15 text-amber-300";
  }

  return "bg-rose-500/15 text-rose-300";
};

const RetrievalMonitoringPage: React.FC = () => {
  const [data, setData] = useState<AdminRetrievalMonitoringResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminService.getRetrievalMonitoring();
        setData(response);
      } catch (err: any) {
        setError(err.message || "Failed to load retrieval monitoring data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center p-8">
        <div className="text-cyan-400">Loading retrieval monitoring...</div>
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
        {data.metrics.map((metric) => (
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
            {data.trend_points.map((point) => (
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
                <span className="text-sm font-bold text-amber-300">{data.health_targets.latencyP95}</span>
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
                <span className="text-sm font-bold text-rose-300">{data.health_targets.citationMismatchRate}</span>
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
                <span className="text-sm font-bold text-emerald-300">{data.health_targets.topKHitConfidence}</span>
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
            {data.retrieval_checks.length} entries
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
              {data.retrieval_checks.map((check, index) => (
                <tr key={`${check.queryFamily}-${index}`} className="border-b border-white/5">
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
