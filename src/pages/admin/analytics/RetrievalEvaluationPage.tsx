import React from "react";

const RetrievalEvaluationPage: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Retrieval Evaluation
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Evaluate retrieval quality (recall@K, precision, similarity
            distributions) for the document retrieval pipeline.
          </p>
        </div>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Retrieval Metrics
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <article className="rounded border border-white/10 bg-[#191919] p-4">
            <p className="text-xs text-slate-400">Recall@5</p>
            <p className="mt-2 text-2xl font-black text-white">0.82</p>
            <p className="text-xs text-slate-400">
              Measured across recent test set
            </p>
          </article>
          <article className="rounded border border-white/10 bg-[#191919] p-4">
            <p className="text-xs text-slate-400">Precision@5</p>
            <p className="mt-2 text-2xl font-black text-white">0.74</p>
            <p className="text-xs text-slate-400">Higher is better</p>
          </article>
        </div>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Similarity Score Distribution
        </h3>
        <div className="mt-4 h-48 rounded border border-white/10 bg-[#191919] p-4">
          <p className="text-sm text-slate-400">(Placeholder for histogram)</p>
        </div>
      </section>
    </div>
  );
};

export default RetrievalEvaluationPage;
