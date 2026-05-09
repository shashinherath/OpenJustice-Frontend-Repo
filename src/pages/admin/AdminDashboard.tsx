import React, { useEffect } from "react";
import AdminLayout from "@/layout/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import ActivityItem from "@/components/admin/ActivityItem";
import DataSourceStatusItem from "@/components/admin/DataSourceStatusItem";
import { useAdminStore } from "@/stores/adminStore";

const QUICK_ACTIONS = [
  { icon: "refresh", label: "Clear Cache" },
  { icon: "download", label: "Export Report" },
  { icon: "lock_reset", label: "Reset API" },
  { icon: "help", label: "Support", highlight: true },
];

const AdminDashboard: React.FC = () => {
  const { overviewData: data, isLoading, error, fetchOverview } = useAdminStore();

  useEffect(() => {
    void fetchOverview();
  }, [fetchOverview]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-8 flex justify-center items-center h-64">
          <div className="text-cyan-400 animate-pulse font-bold tracking-widest uppercase text-sm">
            Loading System Metrics...
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !data) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="rounded border border-rose-500/30 bg-rose-500/10 p-6 text-rose-300">
            <h2 className="font-bold mb-2">Error Loading Dashboard</h2>
            <p className="text-sm">{error || "No data available."}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.stats.map(stat => (
            <StatCard key={stat.id} title={stat.title} value={stat.value} change={stat.change} statusType={stat.statusType} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded border border-cyan-400/15 bg-[#191919] p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-white flex items-center gap-3">
                  <span className="material-symbols-outlined text-cyan-300">trending_up</span>
                  Trust Metrics: Citation Accuracy over Time
                </h2>
                <div className="flex gap-2">
                  <button className="rounded border border-cyan-400/30 bg-cyan-500/15 px-3 py-1 text-[10px] font-bold text-cyan-100">7D</button>
                  <button className="rounded border border-slate-700 px-3 py-1 text-[10px] font-bold text-slate-300">30D</button>
                </div>
              </div>
              <div className="h-64 flex items-end justify-between gap-1 pt-4">
                <div className="w-full bg-white/5 h-[80%] rounded-t-sm hover:bg-white/20 transition-all relative group">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[9px] font-bold text-white">98.1%</div>
                </div>
                <div className="w-full bg-white/5 h-[82%] rounded-t-sm hover:bg-white/20 transition-all relative group"></div>
                <div className="w-full bg-white/5 h-[79%] rounded-t-sm hover:bg-white/20 transition-all relative group"></div>
                <div className="w-full bg-white/5 h-[85%] rounded-t-sm hover:bg-white/20 transition-all relative group"></div>
                <div className="w-full bg-white/10 h-[88%] rounded-t-sm hover:bg-white/20 transition-all relative group"></div>
                <div className="w-full bg-white/10 h-[92%] rounded-t-sm hover:bg-white/20 transition-all relative group"></div>
                <div className="w-full bg-white h-[99.2%] rounded-t-sm hover:bg-white/20 transition-all relative group">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-100 text-[9px] font-bold text-white">99.2%</div>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400">
                <span>01 May</span>
                <span>02 May</span>
                <span>03 May</span>
                <span>04 May</span>
                <span>05 May</span>
                <span>06 May</span>
                <span>Today</span>
              </div>
            </section>

            <section className="rounded border border-cyan-400/15 bg-[#191919] p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Health Status</h2>
                  <p className="text-sm text-slate-400">Live system metrics for the AI and database services.</p>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-slate-300">
                  Updated now
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {data.core_services.map(service => (
                  <article key={service.id} className="rounded-2xl bg-slate-950/95 p-5 ring-1 ring-white/5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-white">{service.title}</p>
                        <p className="mt-2 text-xs text-slate-500">Service availability and health check.</p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${
                          service.status === "Active"
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-rose-500/15 text-rose-300"
                        }`}
                      >
                        {service.status}
                      </span>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full ${service.status === "Active" ? "bg-emerald-400" : "bg-rose-400"}`}
                        style={{ width: service.status === "Active" ? "100%" : "45%" }}
                      />
                    </div>
                    <p className="mt-3 text-[11px] text-slate-500">Telemetry refreshed every 30 seconds.</p>
                  </article>
                ))}
              </div>
            </section>
            
            <section className="rounded border border-cyan-400/15 bg-[#191919] p-8">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-cyan-300">history</span>
                Recent System Activity
              </h2>
              <div className="space-y-4">
                {data.activities.map(activity => (
                  <ActivityItem
                    key={activity.id}
                    title={activity.title}
                    description={activity.description}
                    timeAgo={activity.timeAgo}
                    icon={activity.icon}
                    iconColorClass={activity.iconColorClass}
                  />
                ))}
              </div>
              <button className="mt-6 w-full rounded border border-dashed border-cyan-400/25 py-3 text-[10px] font-bold uppercase tracking-widest text-cyan-200/80 transition-all hover:bg-cyan-500/10 hover:text-cyan-100">
                View Full Logs
              </button>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded border border-cyan-400/15 bg-[#191919] p-6">
              <h2 className="text-sm font-bold text-white mb-6 uppercase tracking-[0.15em]">Data Source Status</h2>
              <div className="space-y-6">
                {data.data_sources.map(source => (
                  <DataSourceStatusItem
                    key={source.id}
                    title={source.title}
                    statusLabel={source.statusLabel}
                    statusColorClass={source.statusColorClass}
                    progressPercent={source.progressPercent}
                    progressColorClass={source.progressColorClass}
                    footerText={source.footerText}
                  />
                ))}
              </div>
            </section>

            <section className="rounded border border-cyan-400/15 bg-[#191919] p-6">
              <h2 className="text-sm font-bold text-white mb-6 uppercase tracking-[0.15em]">Admin Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {QUICK_ACTIONS.map(action => (
                  <button key={action.label} className={`space-y-2 rounded border border-slate-700/70 bg-[#191919] p-3 text-center transition-all hover:border-cyan-400/35 hover:bg-cyan-500/5 ${action.highlight ? "text-cyan-100" : ""}`}>
                    <span className="material-symbols-outlined text-cyan-200">{action.icon}</span>
                    <span className="block text-[9px] font-bold uppercase text-slate-300">{action.label}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
        
        <footer className="border-t border-cyan-400/15 pb-8 pt-16 text-center">
          <div className="flex justify-center items-center gap-4 mb-6 opacity-30 grayscale">
            <span className="material-symbols-outlined text-xl">school</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">University Research & Ethics Faculty</span>
          </div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-cyan-200/65">OpenJustice Â© 2026. All rights reserved.</p>
        </footer>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
