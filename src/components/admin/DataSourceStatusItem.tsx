import React from "react";

interface DataSourceStatusItemProps {
  title: string;
  statusLabel: string;
  statusColorClass: string;
  progressPercent: number; // 0-100
  progressColorClass?: string; // defaults to bg-white
  footerText: string;
}

const DataSourceStatusItem: React.FC<DataSourceStatusItemProps> = ({ 
  title, 
  statusLabel, 
  statusColorClass, 
  progressPercent, 
  progressColorClass = "bg-white", 
  footerText 
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-white">{title}</span>
        <span className={`text-[9px] font-black uppercase tracking-widest ${statusColorClass}`}>
          {statusLabel}
        </span>
      </div>
      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <div 
          className={`h-full ${progressColorClass}`} 
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <p className="text-[9px] text-slate-600">{footerText}</p>
    </div>
  );
};

export default DataSourceStatusItem;
