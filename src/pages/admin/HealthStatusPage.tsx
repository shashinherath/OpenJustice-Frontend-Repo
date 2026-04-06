import React from "react";
import AdminLayout from "@/layout/AdminLayout";

type ServiceStatus = "Active" | "Failed";

interface HealthService {
  id: number;
  name: string;
  status: ServiceStatus;
  lastChecked: string;
  note: string;
}

const SERVICES: HealthService[] = [
  {
    id: 1,
    name: "LLM Service",
    status: "Active",
    lastChecked: "2026-04-06 10:32",
    note: "Provider responding within threshold.",
  },
  {
    id: 2,
    name: "Database Service",
    status: "Failed",
    lastChecked: "2026-04-06 10:31",
    note: "Read-replica timeout detected. Retry policy active.",
  },
  {
    id: 3,
    name: "Vector DB Service",
    status: "Active",
    lastChecked: "2026-04-06 10:32",
    note: "Embedding queries healthy and index reachable.",
  },
];

const HealthStatusPage: React.FC = () => {
  const activeCount = SERVICES.filter(service => service.status === "Active").length;
  const failedCount = SERVICES.length - activeCount;

  return (
    <AdminLayout>
      <div className="space-y-8 p-8">
        <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
          <div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">Health Status</h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-300">
              Monitor live health states for LLM, database, and vector database services.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Total Services</p>
            <p className="mt-3 text-2xl font-black text-white">{SERVICES.length}</p>
          </article>
          <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Active</p>
            <p className="mt-3 text-2xl font-black text-green-400">{activeCount}</p>
          </article>
          <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Failed</p>
            <p className="mt-3 text-2xl font-black text-red-400">{failedCount}</p>
          </article>
        </section>

        <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Service Health Detail</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{SERVICES.length} entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="px-3 py-3 font-semibold">Service</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-3 py-3 font-semibold">Last checked</th>
                  <th className="px-3 py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {SERVICES.map(service => (
                  <tr key={service.id} className="border-b border-white/5">
                    <td className="px-3 py-3 text-slate-200">{service.name}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
                          service.status === "Active"
                            ? "bg-green-500/15 text-green-400"
                            : "bg-red-500/15 text-red-300"
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-400">{service.lastChecked}</td>
                    <td className="px-3 py-3 text-slate-300">{service.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default HealthStatusPage;

