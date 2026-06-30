import React, { useEffect } from "react";
import { useAdminStore } from "@/stores/adminStore";

const trendColorMap: Record<string, string> = {
  up: "text-emerald-300",
  down: "text-amber-300",
  neutral: "text-slate-300",
};

const statusStyleMap: Record<string, string> = {
  Ready: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  Running: "border-cyan-400/30 bg-cyan-500/10 text-cyan-300",
  "Needs Refresh": "border-amber-400/30 bg-amber-500/10 text-amber-300",
};

const ResearchMetricsPage: React.FC = () => {
  const { researchMetricsData, isLoading, error, fetchResearchMetrics } = useAdminStore();

  useEffect(() => {
    fetchResearchMetrics();
  }, [fetchResearchMetrics]);

  if (isLoading) {
    return <div className="p-8 text-white">Loading research metrics...</div>;
  }

  if (error) {
    return <div className="p-8 text-rose-500">Error: {error}</div>;
  }

  const metrics = researchMetricsData?.metrics || [];
  const datasets = researchMetricsData?.datasets || [];
  const notes = researchMetricsData?.experiment_notes || [];
  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Research
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Track research-grade evaluation metrics for RAG quality, generation
            quality, and dataset readiness across experiment cycles.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {metrics.length === 0 && (
          <p className="col-span-3 text-sm text-slate-400">No research metrics available.</p>
        )}
        {metrics.map((metric, idx) => (
          <article
            key={idx}
            className="rounded border border-slate-700/70 bg-[#191919] p-5"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              {metric.label}
            </p>
            <p className="mt-3 text-2xl font-black text-white">
              {metric.value}
            </p>
            <p className="mt-2 text-xs text-slate-400">{metric.note}</p>
            <p
              className={`mt-1 text-[11px] font-semibold uppercase tracking-wider ${trendColorMap[metric.trend] || "text-slate-300"}`}
            >
              {metric.trend === "up"
                ? "Trending Up"
                : metric.trend === "down"
                  ? "Needs Attention"
                  : "Stable"}
            </p>
          </article>
        ))}
      </section>
      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Evaluation Datasets
        </h3>
        <div className="mt-4 overflow-hidden rounded border border-white/10">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="border-b border-white/10 bg-black/40 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Dataset</th>
                <th className="px-4 py-3 font-semibold">Version</th>
                <th className="px-4 py-3 font-semibold">Samples</th>
                <th className="px-4 py-3 font-semibold">Split (Train/Val/Test)</th>
                <th className="px-4 py-3 font-semibold">Last Run</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#191919]">
              {datasets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-slate-500">
                    No datasets available.
                  </td>
                </tr>
              ) : (
                datasets.map((ds, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium text-white">{ds.name}</td>
                    <td className="px-4 py-3">{ds.version}</td>
                    <td className="px-4 py-3">{ds.samples.toLocaleString()}</td>
                    <td className="px-4 py-3">{ds.split}</td>
                    <td className="px-4 py-3">{ds.lastRun}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusStyleMap[ds.status] || "border-slate-400/30 bg-slate-500/10 text-slate-300"}`}
                      >
                        {ds.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>


      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Experiment Notes
        </h3>
        <div className="mt-4 space-y-3">
          {notes.length === 0 && (
            <p className="text-sm text-slate-400">No experiment notes available.</p>
          )}
          {notes.map((note, idx) => (
            <article key={idx} className="rounded border border-white/10 bg-black/30 p-4">
              <p className="text-sm font-semibold text-slate-200">
                {note.title}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {note.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResearchMetricsPage;
