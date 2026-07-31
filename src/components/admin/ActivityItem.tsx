import React from "react";

interface ActivityItemProps {
  title: string;
  description: string;
  timeAgo: string;
  icon: string;
  iconColorClass: string;
  userEmail?: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, description, timeAgo, icon, iconColorClass, userEmail }) => {
  return (
    <div className="group flex items-center justify-between rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-4 transition-all hover:border-cyan-400/30">
      <div className="flex items-center gap-4">
        <span className={`material-symbols-outlined ${iconColorClass}`}>{icon}</span>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            {title}
            {userEmail && (
              <span className="ml-2 text-[14px] font-normal text-cyan-600/60 dark:text-cyan-200/60">
                ({userEmail})
              </span>
            )}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-cyan-600/60 dark:text-cyan-200/60">{description}</p>
        </div>
      </div>
      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{timeAgo}</span>
    </div>
  );
};

export default ActivityItem;
