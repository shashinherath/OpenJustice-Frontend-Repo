import React, { useState } from "react";
import AdminLayout from "@/layout/AdminLayout";

type ErrorType = "LLM" | "DB" | "API";

interface ErrorRecord {
  id: string;
  type: ErrorType;
  message: string;
  timestamp: string;
  details: string;
}

const INITIAL_ERRORS: ErrorRecord[] = [
  {
    id: "ERR-3001",
    type: "LLM",
    message: "Provider timeout after 30s while generating legal answer.",
    timestamp: "2026-04-06 10:21",
    details: "Correlation: corr-b2d66ea2. Event: llm_error. Request retried twice and reached timeout threshold.",
  },
  {
    id: "ERR-2998",
    type: "DB",
    message: "Vector index lookup failed due to temporary connection loss.",
    timestamp: "2026-04-06 10:09",
    details: "Read replica unreachable for 4 seconds. Automatic failover completed and service resumed.",
  },
  {
    id: "ERR-2995",
    type: "API",
    message: "Upstream legal metadata endpoint returned HTTP 502.",
    timestamp: "2026-04-06 09:54",
    details: "Provider status page reported partial outage. Requests routed to backup endpoint.",
  },
];

const ErrorMonitoringPage: React.FC = () => {
  const [errors] = useState<ErrorRecord[]>(INITIAL_ERRORS);
  const [selectedErrorId, setSelectedErrorId] = useState<string | null>(null);

  const selectedError = errors.find(error => error.id === selectedErrorId) ?? null;

  return (
    <AdminLayout>
      <div className="space-y-8 p-8">
        <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
          <div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">Error Monitoring</h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-300">
              Monitor system failures across LLM, database, and API layers and inspect detailed diagnostics for each error.
            </p>
          </div>
        </section>

        <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">System Failures</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{errors.length} entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="px-3 py-3 font-semibold">Error type</th>
                  <th className="px-3 py-3 font-semibold">Error message</th>
                  <th className="px-3 py-3 font-semibold">Timestamp</th>
                  <th className="px-3 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {errors.map(error => (
                  <tr key={error.id} className="border-b border-white/5">
                    <td className="px-3 py-3">
                      <span
                        className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
                          error.type === "LLM"
                            ? "bg-indigo-500/15 text-indigo-300"
                            : error.type === "DB"
                              ? "bg-amber-500/15 text-amber-300"
                              : "bg-cyan-500/15 text-cyan-300"
                        }`}
                      >
                        {error.type}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-300">{error.message}</td>
                    <td className="px-3 py-3 text-slate-400">{error.timestamp}</td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={() => setSelectedErrorId(error.id)}
                        className="rounded border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        View error details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {selectedError && (
          <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Error Detail</p>
                <h3 className="mt-2 text-base font-bold text-white">{selectedError.id}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedErrorId(null)}
                className="rounded border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:bg-white/10 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <article className="rounded border border-white/10 bg-[#191919] p-4 text-xs text-slate-400">
                <p className="uppercase tracking-wider text-slate-500">Type</p>
                <p className="mt-2 text-sm font-semibold text-slate-200">{selectedError.type}</p>
              </article>
              <article className="rounded border border-white/10 bg-[#191919] p-4 text-xs text-slate-400">
                <p className="uppercase tracking-wider text-slate-500">Timestamp</p>
                <p className="mt-2 text-sm font-semibold text-slate-200">{selectedError.timestamp}</p>
              </article>
              <article className="rounded border border-white/10 bg-[#191919] p-4 text-xs text-slate-400">
                <p className="uppercase tracking-wider text-slate-500">Message</p>
                <p className="mt-2 text-sm text-slate-200">{selectedError.message}</p>
              </article>
            </div>

            <div className="mt-4 rounded border border-white/10 bg-[#191919] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Diagnostic Details</p>
              <p className="mt-2 text-sm text-slate-300">{selectedError.details}</p>
            </div>
          </section>
        )}
      </div>
    </AdminLayout>
  );
};

export default ErrorMonitoringPage;

