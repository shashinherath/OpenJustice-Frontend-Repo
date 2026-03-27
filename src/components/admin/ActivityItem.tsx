import React from "react";

interface ActivityItemProps {
  title: string;
  description: string;
  timeAgo: string;
  icon: string;
  iconColorClass: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, description, timeAgo, icon, iconColorClass }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded bg-[#191919] border border-white/5 group hover:border-white/20 transition-all">
      <div className="flex items-center gap-4">
        <span className={`material-symbols-outlined ${iconColorClass}`}>{icon}</span>
        <div>
          <p className="text-sm font-bold text-white">{title}</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">{description}</p>
        </div>
      </div>
      <span className="text-[10px] font-bold text-slate-500">{timeAgo}</span>
    </div>
  );
};

export default ActivityItem;
