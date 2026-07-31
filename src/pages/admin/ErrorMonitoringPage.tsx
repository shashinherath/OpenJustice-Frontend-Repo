import React, { useMemo, useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
import type { ErrorRecord } from "@/services/adminService";

const ErrorMonitoringPage: React.FC = () => {
  const [errors, setErrors] = useState<ErrorRecord[]>([]);
  const [globalStats, setGlobalStats] = useState({
    total: 0,
    llm: 0,
    db: 0,
    api: 0,
    auth: 0,
    system: 0,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [selectedErrorId, setSelectedErrorId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 25;

  useEffect(() => {
    const fetchErrors = async () => {
      try {
        const response = await adminService.getErrorMonitoring(0, 100);
        setErrors(response.errors);
        setGlobalStats({
          total: response.total_errors || 0,
          llm: response.total_llm || 0,
          db: response.total_db || 0,
          api: response.total_api || 0,
          auth: response.total_auth || 0,
          system: response.total_system || 0,
        });
      } catch (err) {
        console.error("Failed to fetch error logs", err);
      }
    };
    fetchErrors();
  }, []);

  const filteredErrors = useMemo(() => {
    return errors.filter((err) => {
      const text = `${err.id} ${err.message}`.toLowerCase();
      const matchesSearch = text.includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "All" || err.type.toUpperCase() === typeFilter.toUpperCase();
      return matchesSearch && matchesType;
    });
  }, [errors, searchTerm, typeFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter]);

  const totalPages = Math.ceil(filteredErrors.length / itemsPerPage);
  const paginatedErrors = filteredErrors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const selectedError = errors.find((error) => error.id === selectedErrorId) ?? null;

  const getTypeColor = (type: string) => {
    switch (type.toUpperCase()) {
      case "LLM":
        return "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300";
      case "DB":
        return "bg-amber-500/15 text-amber-600 dark:text-amber-300";
      case "API":
        return "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300";
      case "AUTH":
        return "bg-rose-500/15 text-rose-600 dark:text-rose-300";
      case "SYSTEM":
        return "bg-violet-500/15 text-violet-600 dark:text-violet-300";
      default:
        return "bg-slate-500/15 text-slate-600 dark:text-slate-300";
    }
  };

  const getTypeTextColor = (type: string) => {
    switch (type.toUpperCase()) {
      case "LLM":
        return "text-indigo-600 dark:text-indigo-300";
      case "DB":
        return "text-amber-600 dark:text-amber-300";
      case "API":
        return "text-cyan-600 dark:text-cyan-300";
      case "AUTH":
        return "text-rose-600 dark:text-rose-300";
      case "SYSTEM":
        return "text-violet-600 dark:text-violet-300";
      default:
        return "text-slate-600 dark:text-slate-300";
    }
  };

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-white dark:bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Error Monitoring
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Monitor system failures across LLM, database, and API layers and
            inspect detailed diagnostics for each error.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600/70 dark:text-cyan-200/70">
            Total Errors
          </p>
          <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{globalStats.total}</p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600/70 dark:text-cyan-200/70">
            LLM Errors
          </p>
          <p className={`mt-3 text-2xl font-black ${getTypeTextColor('LLM')}`}>
            {globalStats.llm}
          </p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600/70 dark:text-cyan-200/70">
            DB Errors
          </p>
          <p className={`mt-3 text-2xl font-black ${getTypeTextColor('DB')}`}>
            {globalStats.db}
          </p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600/70 dark:text-cyan-200/70">
            API Errors
          </p>
          <p className={`mt-3 text-2xl font-black ${getTypeTextColor('API')}`}>
            {globalStats.api}
          </p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600/70 dark:text-cyan-200/70">
            AUTH Errors
          </p>
          <p className={`mt-3 text-2xl font-black ${getTypeTextColor('AUTH')}`}>
            {globalStats.auth}
          </p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600/70 dark:text-cyan-200/70">
            SYSTEM Errors
          </p>
          <p className={`mt-3 text-2xl font-black ${getTypeTextColor('SYSTEM')}`}>
            {globalStats.system}
          </p>
        </article>
      </section>

      <section className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_200px_auto]">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by log ID or error message"
            className="w-full rounded border border-cyan-400/20 bg-slate-100 dark:bg-black/30 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="w-full rounded border border-cyan-400/20 bg-white dark:bg-[#191919] px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            <option value="All">All Types</option>
            <option value="LLM">LLM</option>
            <option value="DB">DB</option>
            <option value="API">API</option>
            <option value="AUTH">AUTH</option>
            <option value="SYSTEM">SYSTEM</option>
          </select>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setTypeFilter("All");
            }}
            className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
          >
            Clear Filters
          </button>
        </div>
      </section>

      <section className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            System Failures
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            {filteredErrors.length} entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                <th className="px-3 py-3 font-semibold">Log ID</th>
                <th className="px-3 py-3 font-semibold">Error type</th>
                <th className="px-3 py-3 font-semibold">Error message</th>
                <th className="px-3 py-3 font-semibold">Timestamp</th>
                <th className="px-3 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedErrors.map((error) => (
                <tr key={error.id} className="border-b border-slate-100 dark:border-white/5">
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-300 font-mono text-xs">{error.id}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${getTypeColor(error.type)}`}
                    >
                      {error.type}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{error.message}</td>
                  <td className="px-3 py-3 text-slate-500 dark:text-slate-400">
                    {error.timestamp}
                  </td>
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      onClick={() => setSelectedErrorId(error.id)}
                      className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredErrors.length)} of{" "}
              {filteredErrors.length} entries
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded border border-slate-200 dark:border-white/10 px-2 py-1 transition-colors hover:bg-slate-200 dark:hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
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
                      ? "border-cyan-400 text-cyan-600 dark:text-cyan-400"
                      : "border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded border border-slate-200 dark:border-white/10 px-2 py-1 transition-colors hover:bg-slate-200 dark:hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </section>

      {selectedError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <section className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  Error Detail
                </p>
                <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white font-mono">
                  {selectedError.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedErrorId(null)}
                className="rounded border border-slate-200 dark:border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4 text-xs text-slate-500 dark:text-slate-400">
                <p className="uppercase tracking-wider text-slate-400 dark:text-slate-500">Type</p>
                <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${getTypeColor(selectedError.type)}`}>
                    {selectedError.type}
                  </span>
                </p>
              </article>
              <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4 text-xs text-slate-500 dark:text-slate-400">
                <p className="uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Timestamp
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {selectedError.timestamp}
                </p>
              </article>
              <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4 text-xs text-slate-500 dark:text-slate-400">
                <p className="uppercase tracking-wider text-slate-400 dark:text-slate-500">Message</p>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                  {selectedError.message}
                </p>
              </article>
            </div>

            <div className="mt-4 rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                Diagnostic Details
              </p>
              <pre className="mt-2 whitespace-pre-wrap text-xs text-slate-700 dark:text-slate-300 font-mono">
                {selectedError.details}
              </pre>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ErrorMonitoringPage;
