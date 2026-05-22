import React from "react";

const ResearchMetricsPage: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Research Metrics
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Curated metrics for research experiments, A/B cohorts and
            longitudinal studies.
          </p>
        </div>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Experiment Summaries
        </h3>
        <div className="mt-4 space-y-4">
          <article className="rounded border border-white/10 bg-[#191919] p-4">
            <p className="text-sm font-semibold text-slate-200">
              Cohort A vs B
            </p>
            <p className="text-xs text-slate-400">
              Precision Delta: +0.03 · N=1,200
            </p>
          </article>
          <article className="rounded border border-white/10 bg-[#191919] p-4">
            <p className="text-sm font-semibold text-slate-200">
              Prompt Variation Study
            </p>
            <p className="text-xs text-slate-400">
              Hallucination Delta: -0.02 · N=800
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ResearchMetricsPage;
