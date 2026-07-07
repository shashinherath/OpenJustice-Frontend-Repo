import React, { useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
import type { AdminRetrievalEvaluationResponse } from "@/services/adminService";

const RetrievalEvaluationPage: React.FC = () => {
  const [data, setData] = useState<AdminRetrievalEvaluationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await adminService.getRetrievalEvaluation();
        if (mounted) {
          setData(response);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          console.error("Failed to load retrieval evaluation data:", err);
          setError("Failed to load retrieval evaluation data.");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-cyan-400">Loading retrieval evaluation data...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-rose-500">Failed to load retrieval evaluation data.</div>
      </div>
    );
  }

  // Calculate max count for the histogram bars
  const maxCount = data.similarity_distribution.length > 0 
    ? Math.max(...data.similarity_distribution.map(d => d.count)) 
    : 1;

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
            <p className="mt-2 text-2xl font-black text-white">{data.recall_at_5.toFixed(2)}</p>
            <p className="text-xs text-slate-400">
              Measured across recent test set
            </p>
          </article>
          <article className="rounded border border-white/10 bg-[#191919] p-4">
            <p className="text-xs text-slate-400">Precision@5</p>
            <p className="mt-2 text-2xl font-black text-white">{data.precision_at_5.toFixed(2)}</p>
            <p className="text-xs text-slate-400">Higher is better</p>
          </article>
        </div>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Similarity Score Distribution
        </h3>
        <div className="mt-4 flex h-64 items-end gap-2 rounded border border-white/10 bg-[#191919] p-4">
          {data.similarity_distribution.map((bin, index) => {
            const heightPercent = maxCount > 0 ? (bin.count / maxCount) * 100 : 0;
            return (
              <div key={index} className="group relative flex flex-1 flex-col items-center justify-end h-full">
                <div 
                  className="w-full rounded-t bg-cyan-500/50 transition-colors group-hover:bg-cyan-400"
                  style={{ height: `${Math.max(heightPercent, 2)}%` }}
                ></div>
                <div className="mt-2 text-[10px] text-slate-400 uppercase tracking-wider">{bin.bin_label}</div>
                
                {/* Tooltip */}
                <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100 bg-slate-800 text-xs text-white px-2 py-1 rounded">
                  {bin.count}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default RetrievalEvaluationPage;
