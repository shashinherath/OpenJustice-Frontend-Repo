import React, { useMemo, useState, useEffect } from "react";
import {
  adminService,
  type TraceLog,
  type TraceStatus,
  type EventType,
} from "@/services/adminService";

const AdminLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<TraceLog[]>([]);
  const [totalLogs, setTotalLogs] = useState<number>(0);
  const [globalStats, setGlobalStats] = useState({
    completed: 0,
    reviewed: 0,
    pending: 0,
    failed: 0,
    tokens: 0,
    latency: 0
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<TraceStatus | "All">("All");
  const [eventFilter, setEventFilter] = useState<EventType | "All">("All");
  const [modelFilter, setModelFilter] = useState<string>("All");
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 25;

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const text =
        `${log.id} ${log.correlationId} ${log.promptVersion} ${log.model}`.toLowerCase();
      const matchesSearch = text.includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || log.status === statusFilter;
      const matchesEvent =
        eventFilter === "All" || log.eventType === eventFilter;
      const matchesModel = modelFilter === "All" || log.model === modelFilter;
      return matchesSearch && matchesStatus && matchesEvent && matchesModel;
    });
  }, [logs, searchTerm, statusFilter, eventFilter, modelFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, eventFilter, modelFilter]);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const selectedLog = logs.find((log) => log.id === selectedLogId) ?? null;



  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await adminService.getLogs(0, 100);
      setLogs(res.logs);
      setTotalLogs(res.total);
      setGlobalStats({
        completed: res.total_completed || 0,
        reviewed: res.total_reviewed || 0,
        pending: res.total_pending || 0,
        failed: res.total_failed || 0,
        tokens: res.total_tokens || 0,
        latency: res.avg_latency || 0
      });
    } catch (error) {
      console.error("Failed to fetch logs", error);
    }
  };

  const handleCopyCorrelation = async (correlationId: string) => {
    try {
      await navigator.clipboard.writeText(correlationId);
    } catch {
      // Silent fail for environments that block clipboard access.
    }
  };

  const markAsReviewed = async (id: string) => {
    try {
      await adminService.updateLogStatus(id, "Reviewed");
      setLogs((previous) =>
        previous.map((log) =>
          log.id === id ? { ...log, status: "Reviewed" } : log,
        ),
      );
    } catch (error) {
      console.error("Failed to mark log as reviewed", error);
    }
  };



  const deleteLog = async (id: string) => {
    try {
      await adminService.deleteLog(id);
      setLogs((previous) => previous.filter((log) => log.id !== id));
      if (selectedLogId === id) {
        setSelectedLogId(null);
      }
    } catch (error) {
      console.error("Failed to delete log", error);
    }
  };

  const exportSelectedTrace = () => {
    if (!selectedLog) {
      return;
    }

    const payload = JSON.stringify(selectedLog, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${selectedLog.id}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            AI Logs & Traceability
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Audit LLM request and response events, monitor correlation IDs,
            token usage, retrieval evidence, and investigation outcomes.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Total AI Logs
          </p>
          <p className="mt-3 text-2xl font-black text-white">{totalLogs}</p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Completed
          </p>
          <p className="mt-3 text-2xl font-black text-emerald-300">
            {globalStats.completed}
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Reviewed
          </p>
          <p className="mt-3 text-2xl font-black text-indigo-300">{globalStats.reviewed}</p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Pending
          </p>
          <p className="mt-3 text-2xl font-black text-amber-300">{globalStats.pending}</p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Failed
          </p>
          <p className="mt-3 text-2xl font-black text-red-300">{globalStats.failed}</p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Token Volume
          </p>
          <p className="mt-3 text-2xl font-black text-white">{globalStats.tokens}</p>
          <p className="mt-1 text-[10px] text-slate-400">
            Avg latency: {globalStats.latency} ms
          </p>
        </article>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_170px_180px_170px_auto_auto]">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by log ID, correlation ID, or model"
            className="w-full rounded border border-cyan-400/20 bg-black/30 px-3 py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as TraceStatus | "All")
            }
            className="w-full rounded border border-cyan-400/20 bg-[#191919] px-3 py-2 text-sm text-slate-300 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <select
            value={eventFilter}
            onChange={(event) =>
              setEventFilter(event.target.value as EventType | "All")
            }
            className="w-full rounded border border-cyan-400/20 bg-[#191919] px-3 py-2 text-sm text-slate-300 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            <option value="All">All Event Types</option>
            <option value="llm_request">llm_request</option>
            <option value="llm_response">llm_response</option>
            <option value="retrieval_results">retrieval_results</option>
            <option value="llm_error">llm_error</option>
            <option value="stt_request">stt_request</option>
            <option value="tts_request">tts_request</option>
          </select>
          <select
            value={modelFilter}
            onChange={(event) => setModelFilter(event.target.value)}
            className="w-full rounded border border-cyan-400/20 bg-[#191919] px-3 py-2 text-sm text-slate-300 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            <option value="All">All Models</option>
            <option value="gpt-4o">gpt-4o</option>
            <option value="gpt-4o-mini">gpt-4o-mini</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("All");
              setEventFilter("All");
              setModelFilter("All");
            }}
            className="rounded border border-white/10 bg-black/30 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            Clear Filters
          </button>
        </div>
      </section>

      <section className="rounded border border-white/10 bg-white/2 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            AI Trace Log Table
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {filteredLogs.length} entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-500">
                <th className="px-3 py-3 font-semibold">Log ID</th>
                <th className="px-3 py-3 font-semibold">Correlation ID</th>
                <th className="px-3 py-3 font-semibold">Event</th>
                <th className="px-3 py-3 font-semibold">Model</th>
                <th className="px-3 py-3 font-semibold">Language</th>
                <th className="px-3 py-3 font-semibold">Tokens (P/C)</th>
                <th className="px-3 py-3 font-semibold">Latency</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-3 py-3 font-semibold">Timestamp</th>
                <th className="px-3 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.map((log) => (
                <tr key={log.id} className="border-b border-white/5">
                  <td className="px-3 py-3 text-slate-200">{log.id}</td>
                  <td className="px-3 py-3 text-slate-300">
                    {log.correlationId}
                  </td>
                  <td className="px-3 py-3 text-slate-300">{log.eventType}</td>
                  <td className="px-3 py-3 text-slate-300">{log.model}</td>
                  <td className="px-3 py-3 text-slate-300">{log.language}</td>
                  <td className="px-3 py-3 text-slate-300">
                    {["stt_request", "tts_request", "retrieval_results"].includes(log.eventType) || ["retrieval-engine", "embeddings"].some(m => log.model?.includes(m))
                      ? "N/A"
                      : `${log.promptTokens} / ${log.completionTokens}`}
                  </td>
                  <td className="px-3 py-3 text-slate-400">
                    {log.latencyMs > 0 ? `${log.latencyMs} ms` : "-"}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
                        log.status === "Completed"
                          ? "bg-green-500/15 text-green-400"
                          : log.status === "Reviewed"
                            ? "bg-indigo-500/15 text-indigo-300"
                            : log.status === "Pending"
                              ? "bg-amber-500/15 text-amber-300"
                              : "bg-red-500/15 text-red-300"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-400">{log.timestamp}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedLogId(log.id)}
                        className="rounded border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        Trace
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopyCorrelation(log.correlationId)}
                        className="rounded border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        Copy ID
                      </button>
                      <button
                        type="button"
                        onClick={() => markAsReviewed(log.id)}
                        className="rounded border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        Review
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteLog(log.id)}
                        className="rounded border border-red-400/30 bg-red-500/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of{" "}
              {filteredLogs.length} entries
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded border border-white/10 px-2 py-1 transition-colors hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`rounded border px-2.5 py-1 transition-colors ${
                    currentPage === idx + 1
                      ? "border-cyan-400 text-cyan-400"
                      : "border-white/10 hover:bg-white/10"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded border border-white/10 px-2 py-1 transition-colors hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </section>

      {selectedLog && (
        <section className="rounded border border-white/10 bg-black/30 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Trace Detail
              </p>
              <h3 className="mt-2 text-base font-bold text-white">
                {selectedLog.id}
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Correlation ID: {selectedLog.correlationId}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={exportSelectedTrace}
                className="rounded border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:bg-white/10 hover:text-white"
              >
                Export JSON
              </button>
              <button
                type="button"
                onClick={() => setSelectedLogId(null)}
                className="rounded border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:bg-white/10 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded border border-white/10 bg-black/30 p-4 text-xs text-slate-400">
              <p className="uppercase tracking-wider text-slate-500">LLM</p>
              <p className="mt-2 text-sm font-semibold text-slate-200">
                {selectedLog.model}
              </p>
              <p className="mt-1">
                Prompt Version: {selectedLog.promptVersion}
              </p>
            </article>
            <article className="rounded border border-white/10 bg-black/30 p-4 text-xs text-slate-400">
              <p className="uppercase tracking-wider text-slate-500">Tokens</p>
              <p className="mt-2 text-sm font-semibold text-slate-200">
                {selectedLog.promptTokens + selectedLog.completionTokens}
              </p>
              <p className="mt-1">
                Prompt {selectedLog.promptTokens} / Completion{" "}
                {selectedLog.completionTokens}
              </p>
            </article>
            <article className="rounded border border-white/10 bg-black/30 p-4 text-xs text-slate-400">
              <p className="uppercase tracking-wider text-slate-500">
                Retrieval
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-200">
                {selectedLog.retrievalCount} chunks
              </p>
              <p className="mt-1">
                Citations generated: {selectedLog.citationCount}
              </p>
            </article>
            <article className="rounded border border-white/10 bg-black/30 p-4 text-xs text-slate-400">
              <p className="uppercase tracking-wider text-slate-500">
                Execution
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-200">
                {selectedLog.latencyMs > 0
                  ? `${selectedLog.latencyMs} ms`
                  : "In progress"}
              </p>
              <p className="mt-1">Status: {selectedLog.status}</p>
            </article>
          </div>

          <div className="mt-5 rounded border border-white/10 bg-black/30 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Trace Timeline
            </p>
            <ol className="mt-3 space-y-2 text-xs text-slate-300">
              <li className="rounded border border-white/10 bg-[#191919] px-3 py-2">
                1. Query request received and sanitized for logging.
              </li>
              <li className="rounded border border-white/10 bg-[#191919] px-3 py-2">
                2. Retrieval pipeline executed with chunk ranking and score
                logging.
              </li>
              <li className="rounded border border-white/10 bg-[#191919] px-3 py-2">
                3. LLM generation completed with token and latency capture.
              </li>
              <li className="rounded border border-white/10 bg-[#191919] px-3 py-2">
                4. Citation validation and final trace status recorded.
              </li>
            </ol>
          </div>
        </section>
      )}
    </div>
  );
};

export default AdminLogsPage;
