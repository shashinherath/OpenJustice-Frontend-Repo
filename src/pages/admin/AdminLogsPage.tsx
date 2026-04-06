import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/layout/AdminLayout";

type TraceStatus = "Completed" | "Pending" | "Failed" | "Reviewed";
type EventType = "llm_request" | "llm_response" | "retrieval_results" | "llm_error";

interface TraceLog {
  id: string;
  correlationId: string;
  eventType: EventType;
  model: string;
  promptVersion: string;
  language: "English" | "Sinhala" | "Tamil";
  promptTokens: number;
  completionTokens: number;
  latencyMs: number;
  retrievalCount: number;
  citationCount: number;
  status: TraceStatus;
  timestamp: string;
}

const INITIAL_TRACE_LOGS: TraceLog[] = [
  {
    id: "AIL-90211",
    correlationId: "corr-4e7a8f90",
    eventType: "llm_response",
    model: "gpt-4o",
    promptVersion: "legal-rag-v2.3",
    language: "English",
    promptTokens: 812,
    completionTokens: 261,
    latencyMs: 1288,
    retrievalCount: 5,
    citationCount: 4,
    status: "Completed",
    timestamp: "2026-04-06 10:12",
  },
  {
    id: "AIL-90209",
    correlationId: "corr-3c91b2da",
    eventType: "retrieval_results",
    model: "gpt-4o",
    promptVersion: "legal-rag-v2.3",
    language: "Sinhala",
    promptTokens: 694,
    completionTokens: 0,
    latencyMs: 942,
    retrievalCount: 6,
    citationCount: 0,
    status: "Pending",
    timestamp: "2026-04-06 10:09",
  },
  {
    id: "AIL-90201",
    correlationId: "corr-b2d66ea2",
    eventType: "llm_error",
    model: "gpt-4o",
    promptVersion: "legal-rag-v2.2",
    language: "Tamil",
    promptTokens: 741,
    completionTokens: 0,
    latencyMs: 2310,
    retrievalCount: 3,
    citationCount: 0,
    status: "Failed",
    timestamp: "2026-04-06 09:58",
  },
  {
    id: "AIL-90198",
    correlationId: "corr-a93cf441",
    eventType: "llm_response",
    model: "gpt-4o-mini",
    promptVersion: "legal-rag-v2.1",
    language: "English",
    promptTokens: 628,
    completionTokens: 188,
    latencyMs: 1114,
    retrievalCount: 4,
    citationCount: 3,
    status: "Reviewed",
    timestamp: "2026-04-06 09:54",
  },
  {
    id: "AIL-90191",
    correlationId: "corr-09a9de73",
    eventType: "llm_request",
    model: "gpt-4o",
    promptVersion: "legal-rag-v2.3",
    language: "English",
    promptTokens: 533,
    completionTokens: 0,
    latencyMs: 0,
    retrievalCount: 0,
    citationCount: 0,
    status: "Pending",
    timestamp: "2026-04-06 09:49",
  },
];

const AdminLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<TraceLog[]>(INITIAL_TRACE_LOGS);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<TraceStatus | "All">("All");
  const [eventFilter, setEventFilter] = useState<EventType | "All">("All");
  const [modelFilter, setModelFilter] = useState<string>("All");
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const text = `${log.id} ${log.correlationId} ${log.promptVersion} ${log.model}`.toLowerCase();
      const matchesSearch = text.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || log.status === statusFilter;
      const matchesEvent = eventFilter === "All" || log.eventType === eventFilter;
      const matchesModel = modelFilter === "All" || log.model === modelFilter;
      return matchesSearch && matchesStatus && matchesEvent && matchesModel;
    });
  }, [logs, searchTerm, statusFilter, eventFilter, modelFilter]);

  const selectedLog = logs.find(log => log.id === selectedLogId) ?? null;

  const completedCount = logs.filter(log => log.status === "Completed").length;
  const reviewedCount = logs.filter(log => log.status === "Reviewed").length;
  const failedCount = logs.filter(log => log.status === "Failed").length;
  const pendingCount = logs.filter(log => log.status === "Pending").length;

  const avgLatency = useMemo(() => {
    const valid = logs.filter(log => log.latencyMs > 0);
    const total = valid.reduce((sum, log) => sum + log.latencyMs, 0);
    return Math.round(total / Math.max(valid.length, 1));
  }, [logs]);

  const totalTokens = useMemo(
    () => logs.reduce((sum, log) => sum + log.promptTokens + log.completionTokens, 0),
    [logs]
  );

  const handleCopyCorrelation = async (correlationId: string) => {
    try {
      await navigator.clipboard.writeText(correlationId);
    } catch {
      // Silent fail for environments that block clipboard access.
    }
  };

  const markAsReviewed = (id: string) => {
    setLogs(previous => previous.map(log => (log.id === id ? { ...log, status: "Reviewed" } : log)));
  };

  const retryFailed = () => {
    setLogs(previous => previous.map(log => (log.status === "Failed" ? { ...log, status: "Pending" } : log)));
  };

  const deleteLog = (id: string) => {
    setLogs(previous => previous.filter(log => log.id !== id));
    if (selectedLogId === id) {
      setSelectedLogId(null);
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
    <AdminLayout>
      <div className="space-y-8 p-8">
        <section className="rounded border border-white/10 bg-white/3 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">AI Logs & Traceability</h2>
              <p className="mt-3 max-w-3xl text-sm text-slate-400">
                Audit LLM request and response events, monitor correlation IDs, token usage, retrieval evidence, and investigation outcomes.
              </p>
            </div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Overview
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
          <article className="rounded border border-white/10 bg-black/20 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Total AI Logs</p>
            <p className="mt-3 text-2xl font-black text-white">{logs.length}</p>
          </article>
          <article className="rounded border border-white/10 bg-black/20 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Completed</p>
            <p className="mt-3 text-2xl font-black text-white">{completedCount}</p>
          </article>
          <article className="rounded border border-white/10 bg-black/20 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Reviewed</p>
            <p className="mt-3 text-2xl font-black text-white">{reviewedCount}</p>
          </article>
          <article className="rounded border border-white/10 bg-black/20 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Pending</p>
            <p className="mt-3 text-2xl font-black text-white">{pendingCount}</p>
          </article>
          <article className="rounded border border-white/10 bg-black/20 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Failed</p>
            <p className="mt-3 text-2xl font-black text-white">{failedCount}</p>
          </article>
          <article className="rounded border border-white/10 bg-black/20 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Token Volume</p>
            <p className="mt-3 text-2xl font-black text-white">{totalTokens}</p>
            <p className="mt-1 text-[10px] text-slate-500">Avg latency: {avgLatency} ms</p>
          </article>
        </section>

        <section className="rounded border border-white/10 bg-white/2 p-6">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_170px_180px_170px_auto_auto]">
            <input
              type="text"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              placeholder="Search by log ID, correlation ID, prompt version, or model"
              className="rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-300 placeholder:text-slate-500"
            />
            <select
              value={statusFilter}
              onChange={event => setStatusFilter(event.target.value as TraceStatus | "All")}
              className="rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-300"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
            <select
              value={eventFilter}
              onChange={event => setEventFilter(event.target.value as EventType | "All")}
              className="rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-300"
            >
              <option value="All">All Event Types</option>
              <option value="llm_request">llm_request</option>
              <option value="llm_response">llm_response</option>
              <option value="retrieval_results">retrieval_results</option>
              <option value="llm_error">llm_error</option>
            </select>
            <select
              value={modelFilter}
              onChange={event => setModelFilter(event.target.value)}
              className="rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-300"
            >
              <option value="All">All Models</option>
              <option value="gpt-4o">gpt-4o</option>
              <option value="gpt-4o-mini">gpt-4o-mini</option>
            </select>
            <button
              type="button"
              onClick={retryFailed}
              className="rounded border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/20"
            >
              Retry Failed
            </button>
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
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">AI Trace Log Table</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{filteredLogs.length} entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="px-3 py-3 font-semibold">Log ID</th>
                  <th className="px-3 py-3 font-semibold">Correlation ID</th>
                  <th className="px-3 py-3 font-semibold">Event</th>
                  <th className="px-3 py-3 font-semibold">Model</th>
                  <th className="px-3 py-3 font-semibold">Prompt Ver.</th>
                  <th className="px-3 py-3 font-semibold">Language</th>
                  <th className="px-3 py-3 font-semibold">Tokens (P/C)</th>
                  <th className="px-3 py-3 font-semibold">Latency</th>
                  <th className="px-3 py-3 font-semibold">Retrieval</th>
                  <th className="px-3 py-3 font-semibold">Citations</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-3 py-3 font-semibold">Timestamp</th>
                  <th className="px-3 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(log => (
                  <tr key={log.id} className="border-b border-white/5">
                    <td className="px-3 py-3 text-slate-200">{log.id}</td>
                    <td className="px-3 py-3 text-slate-300">{log.correlationId}</td>
                    <td className="px-3 py-3 text-slate-300">{log.eventType}</td>
                    <td className="px-3 py-3 text-slate-300">{log.model}</td>
                    <td className="px-3 py-3 text-slate-300">{log.promptVersion}</td>
                    <td className="px-3 py-3 text-slate-300">{log.language}</td>
                    <td className="px-3 py-3 text-slate-300">{log.promptTokens} / {log.completionTokens}</td>
                    <td className="px-3 py-3 text-slate-400">{log.latencyMs > 0 ? `${log.latencyMs} ms` : "-"}</td>
                    <td className="px-3 py-3 text-slate-400">{log.retrievalCount}</td>
                    <td className="px-3 py-3 text-slate-400">{log.citationCount}</td>
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
        </section>

        {selectedLog && (
          <section className="rounded border border-white/10 bg-black/30 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Trace Detail</p>
                <h3 className="mt-2 text-base font-bold text-white">{selectedLog.id}</h3>
                <p className="mt-1 text-xs text-slate-400">Correlation ID: {selectedLog.correlationId}</p>
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
                <p className="mt-2 text-sm font-semibold text-slate-200">{selectedLog.model}</p>
                <p className="mt-1">Prompt Version: {selectedLog.promptVersion}</p>
              </article>
              <article className="rounded border border-white/10 bg-black/30 p-4 text-xs text-slate-400">
                <p className="uppercase tracking-wider text-slate-500">Tokens</p>
                <p className="mt-2 text-sm font-semibold text-slate-200">{selectedLog.promptTokens + selectedLog.completionTokens}</p>
                <p className="mt-1">Prompt {selectedLog.promptTokens} / Completion {selectedLog.completionTokens}</p>
              </article>
              <article className="rounded border border-white/10 bg-black/30 p-4 text-xs text-slate-400">
                <p className="uppercase tracking-wider text-slate-500">Retrieval</p>
                <p className="mt-2 text-sm font-semibold text-slate-200">{selectedLog.retrievalCount} chunks</p>
                <p className="mt-1">Citations generated: {selectedLog.citationCount}</p>
              </article>
              <article className="rounded border border-white/10 bg-black/30 p-4 text-xs text-slate-400">
                <p className="uppercase tracking-wider text-slate-500">Execution</p>
                <p className="mt-2 text-sm font-semibold text-slate-200">{selectedLog.latencyMs > 0 ? `${selectedLog.latencyMs} ms` : "In progress"}</p>
                <p className="mt-1">Status: {selectedLog.status}</p>
              </article>
            </div>

            <div className="mt-5 rounded border border-white/10 bg-black/30 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Trace Timeline</p>
              <ol className="mt-3 space-y-2 text-xs text-slate-300">
                <li className="rounded border border-white/10 bg-black/20 px-3 py-2">1. Query request received and sanitized for logging.</li>
                <li className="rounded border border-white/10 bg-black/20 px-3 py-2">2. Retrieval pipeline executed with chunk ranking and score logging.</li>
                <li className="rounded border border-white/10 bg-black/20 px-3 py-2">3. LLM generation completed with token and latency capture.</li>
                <li className="rounded border border-white/10 bg-black/20 px-3 py-2">4. Citation validation and final trace status recorded.</li>
              </ol>
            </div>
          </section>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminLogsPage;
