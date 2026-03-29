import React from "react";
import AdminLayout from "@/layout/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import ActivityItem from "@/components/admin/ActivityItem";
import DataSourceStatusItem from "@/components/admin/DataSourceStatusItem";

const STATS = [
  { id: 1, title: "Total Queries", value: "142,842", change: "+12%", statusType: "neutral" as const },
  { id: 2, title: "Average Retrieval Accuracy", value: "99.2%", change: "Stable", statusType: "neutral" as const },
  { id: 3, title: "System Uptime", value: "99.98%", change: "Optimal", statusType: "positive" as const },
  { id: 4, title: "Flagged Outputs", value: "12", change: "Requires Review", statusType: "warning" as const },
];

const ACTIVITIES = [
  { id: 1, title: "Query #82910 Processing Complete", description: "Semantic Analysis • Retrieval • Synthesis", timeAgo: "2 mins ago", icon: "check_circle", iconColorClass: "text-green-500" },
  { id: 2, title: "Database Sync: Federal Statutes", description: "Updating 244 modified records", timeAgo: "14 mins ago", icon: "sync", iconColorClass: "text-slate-500" },
  { id: 3, title: "Flagged Output: Toxicity Threshold", description: "Manual review required for query #82895", timeAgo: "42 mins ago", icon: "warning", iconColorClass: "text-white" },
];

const DATA_SOURCES = [
  { id: 1, title: "Federal Statutes", statusLabel: "Healthy", statusColorClass: "text-green-500", progressPercent: 100, footerText: "Last sync: 12 minutes ago" },
  { id: 2, title: "Supreme Court Opinions", statusLabel: "Healthy", statusColorClass: "text-green-500", progressPercent: 100, footerText: "Last sync: 4 hours ago" },
  { id: 3, title: "State Level Data", statusLabel: "Indexing", statusColorClass: "text-slate-500", progressPercent: 74, progressColorClass: "bg-white/40", footerText: "74% Complete" },
  { id: 4, title: "Administrative Law", statusLabel: "Active", statusColorClass: "text-white", progressPercent: 100, footerText: "Last sync: Yesterday" },
];

const QUICKS_ACTIONS = [
  { icon: "refresh", label: "Clear Cache" },
  { icon: "download", label: "Export Report" },
  { icon: "lock_reset", label: "Reset API" },
  { icon: "help", label: "Support", highlight: true },
];

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map(stat => (
            <StatCard key={stat.id} title={stat.title} value={stat.value} change={stat.change} statusType={stat.statusType} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="p-8 rounded border border-white/10 bg-white/2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-white flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400">trending_up</span>
                  Trust Metrics: Citation Accuracy over Time
                </h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-[10px] font-bold bg-white text-black rounded">7D</button>
                  <button className="px-3 py-1 text-[10px] font-bold bg-white/5 text-slate-400 rounded">30D</button>
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
              <div className="flex justify-between mt-4 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                <span>01 May</span>
                <span>02 May</span>
                <span>03 May</span>
                <span>04 May</span>
                <span>05 May</span>
                <span>06 May</span>
                <span>Today</span>
              </div>
            </section>
            
            <section className="p-8 rounded border border-white/10 bg-white/2">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">history</span>
                Recent System Activity
              </h2>
              <div className="space-y-4">
                {ACTIVITIES.map(activity => (
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
              <button className="w-full mt-6 py-3 border border-dashed border-white/10 rounded text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all">
                View Full Logs
              </button>
            </section>
          </div>
          
          <div className="space-y-6">
            <section className="p-6 rounded border border-white/10 bg-white/2">
              <h2 className="text-sm font-bold text-white mb-6 uppercase tracking-[0.15em]">Data Source Status</h2>
              <div className="space-y-6">
                {DATA_SOURCES.map(source => (
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
            
            <section className="p-6 rounded border border-white/10 bg-white/2">
              <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-[0.15em]">Admin Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {QUICKS_ACTIONS.map(action => (
                  <button key={action.label} className={`p-3 rounded border border-white/5 bg-[#191919] hover:bg-white/10 text-center space-y-2 transition-all ${action.highlight ? 'text-white' : ''}`}>
                    <span className="material-symbols-outlined text-white">{action.icon}</span>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase">{action.label}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
        
        <footer className="pt-16 pb-8 border-t border-white/10 text-center">
          <div className="flex justify-center items-center gap-4 mb-6 opacity-30 grayscale">
            <span className="material-symbols-outlined text-xl">school</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">University Research & Ethics Faculty</span>
          </div>
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">OpenJustice © 2026. All rights reserved.</p>
        </footer>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
