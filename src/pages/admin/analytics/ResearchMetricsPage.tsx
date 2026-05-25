import React from "react";

interface ResearchMetric {
  label: string;
  value: string;
  note: string;
  trend: "up" | "down" | "neutral";
}

interface EvaluationDataset {
  name: string;
  version: string;
  samples: number;
  split: string;
  lastRun: string;
  status: "Ready" | "Running" | "Needs Refresh";
}

const CORE_RESEARCH_METRICS: ResearchMetric[] = [
  {
    label: "RAGAS Score",
    value: "0.81",
    note: "Composite retrieval-generation score",
    trend: "up",
  },
  {
    label: "Faithfulness",
    value: "0.87",
    note: "Groundedness against retrieved context",
    trend: "up",
  },
  {
    label: "Context Precision",
    value: "0.79",
    note: "Relevant chunks among retrieved context",
    trend: "up",
  },
  {
    label: "Context Recall",
    value: "0.84",
    note: "Coverage of required evidence",
    trend: "neutral",
  },
  {
    label: "BLEU",
    value: "0.46",
    note: "n-gram overlap with references",
    trend: "down",
  },
  {
    label: "ROUGE-L",
    value: "0.62",
    note: "Longest common subsequence overlap",
    trend: "up",
  },
];

const EVALUATION_DATASETS: EvaluationDataset[] = [
  {
    name: "OJ-LegalQA-Benchmark",
    version: "v2.3",
    samples: 2400,
    split: "70/15/15",
    lastRun: "2026-05-22",
    status: "Ready",
  },
  {
    name: "SriLanka-Statute-Citations",
    version: "v1.9",
    samples: 1300,
    split: "80/10/10",
    lastRun: "2026-05-21",
    status: "Running",
  },
  {
    name: "Multilingual-Legal-Reasoning",
    version: "v1.4",
    samples: 980,
    split: "75/10/15",
    lastRun: "2026-05-18",
    status: "Needs Refresh",
  },
];

const trendColorMap: Record<ResearchMetric["trend"], string> = {
  up: "text-emerald-300",
  down: "text-amber-300",
  neutral: "text-slate-300",
};

const statusStyleMap: Record<EvaluationDataset["status"], string> = {
  Ready: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  Running: "border-cyan-400/30 bg-cyan-500/10 text-cyan-300",
  "Needs Refresh": "border-amber-400/30 bg-amber-500/10 text-amber-300",
};

const ResearchMetricsPage: React.FC = () => {
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
        {CORE_RESEARCH_METRICS.map((metric) => (
          <article
            key={metric.label}
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
              className={`mt-1 text-[11px] font-semibold uppercase tracking-wider ${trendColorMap[metric.trend]}`}
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
        <p className="mt-2 text-sm text-slate-400">
          Dataset versions and run-readiness for reproducible thesis
          experiments.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400">
                <th className="px-3 py-3 font-semibold">Dataset</th>
                <th className="px-3 py-3 font-semibold">Version</th>
                <th className="px-3 py-3 font-semibold">Samples</th>
                <th className="px-3 py-3 font-semibold">Split</th>
                <th className="px-3 py-3 font-semibold">Last Run</th>
                <th className="px-3 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {EVALUATION_DATASETS.map((dataset) => (
                <tr
                  key={dataset.name}
                  className="border-b border-white/5 text-slate-200"
                >
                  <td className="px-3 py-3 font-medium">{dataset.name}</td>
                  <td className="px-3 py-3 text-slate-300">
                    {dataset.version}
                  </td>
                  <td className="px-3 py-3 text-slate-300">
                    {dataset.samples}
                  </td>
                  <td className="px-3 py-3 text-slate-300">{dataset.split}</td>
                  <td className="px-3 py-3 text-slate-300">
                    {dataset.lastRun}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center rounded border px-2 py-1 text-[11px] font-semibold ${statusStyleMap[dataset.status]}`}
                    >
                      {dataset.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Experiment Notes
        </h3>
        <div className="mt-4 space-y-3">
          <article className="rounded border border-white/10 bg-black/30 p-4">
            <p className="text-sm font-semibold text-slate-200">
              Ablation: Retrieval Window Size (k=3/5/8)
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Best combined RAGAS and faithfulness observed at k=5 with stable
              context precision.
            </p>
          </article>
          <article className="rounded border border-white/10 bg-black/30 p-4">
            <p className="text-sm font-semibold text-slate-200">
              Prompt Policy Variant Study
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Citation-first response structure improved ROUGE-L while BLEU
              remained sensitive to legal paraphrasing.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ResearchMetricsPage;
