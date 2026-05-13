import React, { useEffect } from "react";
import { useAdminKnowledgeStore } from "@/stores/adminKnowledgeStore";

const KnowledgeBasePage: React.FC = () => {
  const { records, isLoading, error, fetchKnowledgeMetrics, reprocessDocument } = useAdminKnowledgeStore();

  useEffect(() => {
    fetchKnowledgeMetrics();
  }, [fetchKnowledgeMetrics]);

  const activeKnowledge = records.filter(
    (row) => row.status === "Active",
  ).length;
  const failedKnowledge = records.length - activeKnowledge;

  const handleReprocessDocument = async (documentId: string) => {
    try {
      await reprocessDocument(documentId);
    } catch (err) {
      // Error handling is managed by store/service or can be displayed via UI toast
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-white">Loading knowledge metrics...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-400">Error: {error}</div>;
  }

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            RAG / Knowledge Monitoring
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            View indexed chunks and embedding status for document processing
            quality.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Indexed Documents
          </p>
          <p className="mt-3 text-2xl font-black text-white">
            {records.length}
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Active Embeddings
          </p>
          <p className="mt-3 text-2xl font-black text-green-400">
            {activeKnowledge}
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Failed Embeddings
          </p>
          <p className="mt-3 text-2xl font-black text-red-400">
            {failedKnowledge}
          </p>
        </article>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Knowledge Base Status
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {records.length} entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-500">
                <th className="px-3 py-3 font-semibold">Document ID</th>
                <th className="px-3 py-3 font-semibold">Number of chunks</th>
                <th className="px-3 py-3 font-semibold">
                  Embedding model used
                </th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-3 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row) => (
                <tr key={row.documentId} className="border-b border-white/5">
                  <td className="px-3 py-3 text-slate-200">{row.documentId}</td>
                  <td className="px-3 py-3 text-slate-300">{row.chunkCount}</td>
                  <td className="px-3 py-3 text-slate-300">
                    {row.embeddingModel}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
                        row.status === "Active"
                          ? "bg-green-500/15 text-green-400"
                          : "bg-red-500/15 text-red-300"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleReprocessDocument(row.documentId)}
                        className="rounded border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        Re-process document
                      </button>
                      <button
                        type="button"
                        className="rounded border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        View chunk details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default KnowledgeBasePage;
