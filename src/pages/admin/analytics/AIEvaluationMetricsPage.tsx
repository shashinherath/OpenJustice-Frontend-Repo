import React from "react";

const AIEvaluationMetricsPage: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            AI Evaluation Metrics
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Track model-level evaluation metrics such as accuracy, hallucination
            rate, and token consumption.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Accuracy
          </p>
          <p className="mt-3 text-2xl font-black text-white">0.88</p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Hallucination Rate
          </p>
          <p className="mt-3 text-2xl font-black text-amber-400">0.06</p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Avg Tokens/Response
          </p>
          <p className="mt-3 text-2xl font-black text-white">182</p>
        </article>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Recent Model Runs
        </h3>
        <div className="mt-4 space-y-3">
          <div className="rounded border border-white/10 bg-[#191919] p-3">
            <p className="text-sm text-slate-200">Model: gpt-4-legal</p>
            <p className="text-xs text-slate-400">
              Accuracy: 0.89 · Tokens: 198
            </p>
          </div>
          <div className="rounded border border-white/10 bg-[#191919] p-3">
            <p className="text-sm text-slate-200">Model: gpt-4-mini</p>
            <p className="text-xs text-slate-400">
              Accuracy: 0.86 · Tokens: 165
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIEvaluationMetricsPage;
