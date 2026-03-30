import React from "react";

export interface TopicData {
  id: string;
  icon: string;
  title: string;
  description: string;
  colorHex: string; // Used to override tailwind arbitrary values for the ring and shadow
  bgClass: string;
  textClass: string;
}

interface TopicCardProps {
  topic: TopicData;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:border-slate-300 dark:border-[#2d2d2d] dark:bg-[#232323] dark:hover:border-slate-500">
      <div className="p-6">
        <div
          className={`size-12 rounded-lg ${topic.bgClass} ${topic.textClass} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-lg`}
          style={{ boxShadow: `0 10px 15px -3px ${topic.colorHex}10` }} // using roughly /5 to /10 opacity shadow
        >
          <span className="material-symbols-outlined text-3xl">{topic.icon}</span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">{topic.title}</h3>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{topic.description}</p>
      </div>
    </div>
  );
};

export default TopicCard;
