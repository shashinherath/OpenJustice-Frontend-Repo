import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  statusType: "positive" | "negative" | "neutral" | "warning";
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, statusType }) => {
  let statusColor = "text-slate-400";
  if (statusType === "positive") statusColor = "text-green-500";
  if (statusType === "negative") statusColor = "text-red-500";
  if (statusType === "warning") statusColor = "text-slate-500"; // or yellow/amber if preferred

  return (
    <div className="p-6 rounded border border-white/10 bg-white/[0.03]">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-black text-white">{value}</h3>
        <span className={`text-xs font-bold ${statusColor}`}>{change}</span>
      </div>
    </div>
  );
};

export default StatCard;
