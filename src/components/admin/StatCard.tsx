import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  statusType: "positive" | "negative" | "neutral" | "warning";
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, statusType }) => {
  let statusColor = "text-cyan-600 dark:text-cyan-200";
  if (statusType === "positive") statusColor = "text-emerald-600 dark:text-emerald-300";
  if (statusType === "negative") statusColor = "text-rose-600 dark:text-rose-300";
  if (statusType === "warning") statusColor = "text-amber-600 dark:text-amber-300";

  return (
    <div className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-cyan-600/70 dark:text-cyan-200/70">{title}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-black text-slate-900 dark:text-white">{value}</h3>
        <span className={`text-xs font-bold ${statusColor}`}>{change}</span>
      </div>
    </div>
  );
};

export default StatCard;
