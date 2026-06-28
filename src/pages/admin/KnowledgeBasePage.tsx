import React, { useEffect, useState, useMemo } from "react";
import { useAdminKnowledgeStore } from "@/stores/adminKnowledgeStore";
import { adminDataSourcesService, type DocumentChunkItem } from "@/services/adminDataSourcesService";

const KnowledgeBasePage: React.FC = () => {
  const [selectedChunks, setSelectedChunks] = useState<DocumentChunkItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingChunks, setIsLoadingChunks] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const {
    records,
    isLoading,
    error,
    fetchKnowledgeMetrics,
    reprocessDocument,
  } = useAdminKnowledgeStore();

  useEffect(() => {
    fetchKnowledgeMetrics();
  }, [fetchKnowledgeMetrics]);

  const activeKnowledge = records.filter(
    (row) => row.status === "Active",
  ).length;
  const failedKnowledge = records.length - activeKnowledge;

  const filteredRecords = useMemo(() => {
    let result = records;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (row) =>
          (row.documentTitle ?? "").toLowerCase().includes(q) ||
          (row.documentId ?? "").toLowerCase().includes(q)
      );
    }

    if (filterStatus !== "All") {
      result = result.filter((row) => row.status === filterStatus);
    }

    return result;
  }, [records, searchQuery, filterStatus]);

  const handleReprocessDocument = async (documentId: string) => {
    try {
      await reprocessDocument(documentId);
    } catch (err) {
      // Error handling is managed by store/service or can be displayed via UI toast
      console.error(err);
    }
  };

  const handleViewChunks = async (documentId: string) => {
    setIsLoadingChunks(true);
    setIsModalOpen(true);
    try {
      const chunks = await adminDataSourcesService.getDocumentChunks(documentId);
      setSelectedChunks(chunks);
    } catch (err) {
      console.error("Failed to fetch chunks", err);
      setSelectedChunks([]);
    } finally {
      setIsLoadingChunks(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center h-64">
        <div className="text-cyan-400 animate-pulse font-bold tracking-widest uppercase text-sm">
          Loading knowledge metrics...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="rounded border border-rose-500/30 bg-rose-500/10 p-6 text-rose-300">
          <h2 className="font-bold mb-2">Error Loading Knowledge</h2>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Knowledge Monitoring
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            View indexed chunks and embedding status for document processing
            quality.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Indexed Documents
          </p>
          <p className="mt-3 text-2xl font-black text-white">
            {records.length}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Total documents with embeddings.
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Active Embeddings
          </p>
          <p className="mt-3 text-2xl font-black text-emerald-300">
            {activeKnowledge}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Documents with successful embeddings.
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Failed Embeddings
          </p>
          <p className="mt-3 text-2xl font-black text-red-300">
            {failedKnowledge}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Documents that failed processing.
          </p>
        </article>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Knowledge Base Status
            </h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {filteredRecords.length} of {records.length} entries
          </span>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Search by document title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded border border-cyan-400/20 bg-black/30 px-3 py-2 text-sm text-slate-300 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full rounded border border-cyan-400/20 bg-[#191919] px-3 py-2 text-sm text-slate-300 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-500">
                <th className="px-3 py-3 font-semibold">Document</th>
                <th className="px-3 py-3 font-semibold">Number of chunks</th>
                <th className="px-3 py-3 font-semibold">
                  Embedding model used
                </th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-3 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-sm text-slate-500">
                    No documents match your search.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((row) => (
                  <tr key={row.documentId} className="border-b border-white/5">
                    <td className="px-3 py-3 text-slate-200">
                      {row.documentTitle || row.documentId}
                    </td>
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
                          onClick={() => handleViewChunks(row.documentId)}
                          className="rounded border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          View chunk details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Chunks Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#191919] border border-slate-700/70 rounded w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-slate-700/70">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Chunk Details</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {isLoadingChunks ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                </div>
              ) : selectedChunks.length === 0 ? (
                <div className="text-center text-slate-400 py-8 text-sm">
                  No chunks found for this document.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded border border-slate-700/70 bg-[#1A1A1A] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Total Chunks</p>
                    <p className="mt-3 text-2xl font-black text-white">{selectedChunks.length}</p>
                  </div>
                  <div className="rounded border border-slate-700/70 bg-[#1A1A1A] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Embedding Model</p>
                    <p className="mt-3 text-lg font-black text-white">{selectedChunks[0]?.embedding_model || "Unknown"}</p>
                  </div>
                  <div className="rounded border border-slate-700/70 bg-[#1A1A1A] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Average Chunk Size</p>
                    <p className="mt-3 text-xl font-black text-white">
                      {Math.round(selectedChunks.reduce((acc, c) => acc + c.chunk_size, 0) / selectedChunks.length)} chars
                    </p>
                  </div>
                  <div className="rounded border border-slate-700/70 bg-[#1A1A1A] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Size Range</p>
                    <p className="mt-3 text-xl font-black text-white">
                      {Math.min(...selectedChunks.map(c => c.chunk_size))} - {Math.max(...selectedChunks.map(c => c.chunk_size))} chars
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBasePage;

