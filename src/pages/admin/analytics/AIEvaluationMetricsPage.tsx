import React, { useEffect } from "react";
import { useAdminStore } from "@/stores/adminStore";

const AIEvaluationMetricsPage: React.FC = () => {
  const { aiEvaluationData, isLoading, error, fetchAiEvaluation } = useAdminStore();

  useEffect(() => {
    fetchAiEvaluation();
  }, [fetchAiEvaluation]);

  if (isLoading) {
    return <div className="p-8 text-white">Loading metrics...</div>;
  }

  if (error) {
    return <div className="p-8 text-rose-500">Error: {error}</div>;
  }

  const data = aiEvaluationData || {
    accuracy: 0,
    hallucination_rate: 0,
    avg_tokens: 0,
    recent_model_runs: []
  };

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
          <p className="mt-3 text-2xl font-black text-white">{data.accuracy.toFixed(2)}</p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Hallucination Rate
          </p>
          <p className="mt-3 text-2xl font-black text-amber-400">{data.hallucination_rate.toFixed(2)}</p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Avg Tokens/Response
          </p>
          <p className="mt-3 text-2xl font-black text-white">{data.avg_tokens}</p>
        </article>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Recent Model Runs
        </h3>
        <div className="mt-4 space-y-3">
          {data.recent_model_runs.length === 0 ? (
            <p className="text-sm text-slate-400">No recent model runs.</p>
          ) : (
            data.recent_model_runs.map((run, index) => (
              <div key={index} className="rounded border border-white/10 bg-[#191919] p-3">
                <p className="text-sm text-slate-200">Model: {run.model}</p>
                <p className="text-xs text-slate-400">
                  Accuracy: {run.accuracy.toFixed(2)} · Tokens: {run.tokens}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default AIEvaluationMetricsPage;
