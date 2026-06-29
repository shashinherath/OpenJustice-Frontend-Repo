import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import StatCard from "@/components/admin/StatCard";
import ActivityItem from "@/components/admin/ActivityItem";
import { useAdminStore } from "@/stores/adminStore";

import { adminService } from "@/services/adminService";

// Mock dashboard card data - will be replaced with backend data
const DEFAULT_STATS = [
  {
    id: 1,
    title: "Total Users",
    value: "1,248",
    change: "+12%",
    statusType: "positive" as const,
  },
  {
    id: 2,
    title: "Active Sessions",
    value: "342",
    change: "+5%",
    statusType: "positive" as const,
  },
  {
    id: 3,
    title: "Total Queries",
    value: "24,582",
    change: "+18%",
    statusType: "positive" as const,
  },
  {
    id: 4,
    title: "Documents Indexed",
    value: "1,856",
    change: "+3%",
    statusType: "positive" as const,
  },
  {
    id: 5,
    title: "Total Chunks",
    value: "48,942",
    change: "+8%",
    statusType: "positive" as const,
  },
  {
    id: 6,
    title: "AI Responses Today",
    value: "3,621",
    change: "+22%",
    statusType: "positive" as const,
  },
  {
    id: 7,
    title: "Errors Today",
    value: "12",
    change: "-2%",
    statusType: "neutral" as const,
  },
  {
    id: 8,
    title: "WhatsApp Requests",
    value: "487",
    change: "+9%",
    statusType: "positive" as const,
  },
  {
    id: 9,
    title: "Voice Queries",
    value: "156",
    change: "+4%",
    statusType: "positive" as const,
  },
  {
    id: 10,
    title: "Avg Response Time",
    value: "842ms",
    change: "-15%",
    statusType: "positive" as const,
  },
  {
    id: 11,
    title: "Retrieval Accuracy",
    value: "94.2%",
    change: "+1.3%",
    statusType: "positive" as const,
  },
  {
    id: 12,
    title: "System Health",
    value: "98.6%",
    change: "+0.5%",
    statusType: "positive" as const,
  },
];

const AdminDashboard: React.FC = () => {
  const [showAllCards, setShowAllCards] = React.useState(false);
  const {
    overviewData: data,
    isLoading,
    error,
    fetchOverview,
  } = useAdminStore();

  useEffect(() => {
    void fetchOverview();
  }, [fetchOverview]);

  const handleQuickAction = async (actionId: string) => {
    if (actionId === "clear_semantic_cache") {
      try {
        await adminService.clearSemanticCache();
        alert("Semantic cache cleared successfully.");
      } catch (err) {
        console.error(err);
        alert("Failed to clear semantic cache.");
      }
    } else if (actionId === "export_report") {
      alert("Export report functionality not yet implemented.");
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center h-64">
        <div className="text-cyan-400 animate-pulse font-bold tracking-widest uppercase text-sm">
          Loading System Metrics...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8">
        <div className="rounded border border-rose-500/30 bg-rose-500/10 p-6 text-rose-300">
          <h2 className="font-bold mb-2">Error Loading Dashboard</h2>
          <p className="text-sm">{error || "No data available."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="space-y-3">
        {/* Primary Stats - 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(data.stats && data.stats.length >= 12 ? data.stats : DEFAULT_STATS)
            .slice(0, 4)
            .map((stat) => (
              <StatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                statusType={stat.statusType}
              />
            ))}
        </div>

        {/* Expandable Additional Stats - 8 Cards */}
        {showAllCards && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {(data.stats && data.stats.length >= 12
              ? data.stats
              : DEFAULT_STATS
            )
              .slice(4, 12)
              .map((stat) => (
                <StatCard
                  key={stat.id}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  statusType={stat.statusType}
                />
              ))}
          </div>
        )}

        {/* Toggle Button */}
        <div className="flex justify-end pt-1">
          <button
            onClick={() => setShowAllCards(!showAllCards)}
            className="inline-flex items-center gap-1.5 rounded border border-cyan-400/35 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-cyan-100 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/20"
          >
            <span className="material-symbols-outlined text-[16px] leading-none">
              {showAllCards ? "expand_less" : "expand_more"}
            </span>
            {showAllCards ? "Show Less" : "View All Metrics"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="rounded border border-cyan-400/15 bg-[#191919] p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-white flex items-center gap-3">
                <span className="material-symbols-outlined text-cyan-300">
                  bar_chart
                </span>
                Queries Per Day
              </h2>
              <div className="flex gap-2">
                <button className="rounded border border-cyan-400/30 bg-cyan-500/15 px-3 py-1 text-[10px] font-bold text-cyan-100">
                  7D
                </button>
                <button className="rounded border border-slate-700 px-3 py-1 text-[10px] font-bold text-slate-300">
                  30D
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {data.queries_per_day?.map((day, idx) => (
                <div key={idx} className="space-y-2 text-center">
                  <div className="flex h-48 items-end rounded border border-white/10 bg-[#191919] p-2">
                    <div
                      className={`w-full rounded-sm transition-all hover:opacity-100 ${idx === 4 ? "bg-cyan-400" : idx === 6 ? "bg-amber-400" : "bg-cyan-400/80"}`}
                      style={{ height: day.heightPercentage }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">{day.date}</p>
                  <p className="text-[11px] font-semibold text-slate-300">
                    {day.count}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded border border-cyan-400/15 bg-[#191919] p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
                  Monitoring Layers
                </p>
                <h2 className="mt-2 text-lg font-bold text-white">
                  Separate ingestion health from retrieval quality
                </h2>
                <p className="mt-2 max-w-3xl text-sm text-slate-400">
                  Knowledge monitoring tracks chunks and embeddings. Retrieval
                  monitoring tracks ranking quality, latency, and citation
                  validity.
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                RAG observability
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Link
                to="/admin/knowledge-monitoring"
                className="group rounded border border-white/10 bg-black/30 p-5 transition-all hover:border-cyan-400/30 hover:bg-cyan-500/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Ingestion Health
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-white">
                      Knowledge Monitoring
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      Track indexed documents, chunk counts, and embedding
                      status.
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-cyan-300 transition-transform group-hover:translate-x-0.5">
                    database
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-400">
                  <div className="rounded border border-white/10 bg-[#191919] px-3 py-2">
                    Indexed docs
                  </div>
                  <div className="rounded border border-white/10 bg-[#191919] px-3 py-2">
                    Chunk coverage
                  </div>
                  <div className="rounded border border-white/10 bg-[#191919] px-3 py-2">
                    Embedding state
                  </div>
                  <div className="rounded border border-white/10 bg-[#191919] px-3 py-2">
                    Processing status
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-200/80">
                  Open knowledge monitoring
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </div>
              </Link>

              <Link
                to="/admin/retrieval-monitoring"
                className="group rounded border border-white/10 bg-black/30 p-5 transition-all hover:border-cyan-400/30 hover:bg-cyan-500/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Retrieval Quality
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-white">
                      Retrieval Monitoring
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      Inspect similarity, top-K accuracy, latency, and citation
                      validity.
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-cyan-300 transition-transform group-hover:translate-x-0.5">
                    manage_search
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-400">
                  <div className="rounded border border-white/10 bg-[#191919] px-3 py-2">
                    Avg similarity
                  </div>
                  <div className="rounded border border-white/10 bg-[#191919] px-3 py-2">
                    Top-K accuracy
                  </div>
                  <div className="rounded border border-white/10 bg-[#191919] px-3 py-2">
                    Retrieval latency
                  </div>
                  <div className="rounded border border-white/10 bg-[#191919] px-3 py-2">
                    Citation validity
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-200/80">
                  Open retrieval monitoring
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </div>
              </Link>
            </div>
          </section>

          <section className="rounded border border-cyan-400/15 bg-[#191919] p-8">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-cyan-300">
                history
              </span>
              Recent System Activity
            </h2>
            <div className="space-y-4">
              {data.activities.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  title={activity.title}
                  description={activity.description}
                  timeAgo={activity.timeAgo}
                  icon={activity.icon}
                  iconColorClass={activity.iconColorClass}
                  userEmail={activity.userEmail}
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
            <h2 className="text-sm font-bold text-white mb-6 uppercase tracking-[0.15em]">
              Live Status Indicators
            </h2>
            <div className="space-y-3">
              {data.core_services?.map((indicator) => (
                <div
                  key={indicator.title}
                  className="flex items-center justify-between rounded border border-white/10 bg-black/30 p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-cyan-300 text-[18px]">
                      {indicator.icon}
                    </span>
                    <span className="text-sm font-medium text-slate-200">
                      {indicator.title}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${
                      indicator.status === "Active"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-rose-500/15 text-rose-300"
                    }`}
                  >
                    {indicator.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded border border-cyan-400/15 bg-[#191919] p-6">
            <h2 className="text-sm font-bold text-white mb-6 uppercase tracking-[0.15em]">
              Admin Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {data.quick_actions?.map((action) => (
                <button
                  key={action.action_id}
                  onClick={() => handleQuickAction(action.action_id)}
                  className={`space-y-2 rounded border border-slate-700/70 bg-[#191919] p-3 text-center transition-all hover:border-cyan-400/35 hover:bg-cyan-500/5 ${action.highlight ? "text-cyan-100" : ""}`}
                >
                  <span className="material-symbols-outlined text-cyan-200">
                    {action.icon}
                  </span>
                  <span className="block text-[9px] font-bold uppercase text-slate-300">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      <footer className="border-t border-cyan-400/15 pb-8 pt-16 text-center">
        <p className="text-[11px] font-medium uppercase tracking-widest text-cyan-200/65">
          OpenJustice © 2026. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
