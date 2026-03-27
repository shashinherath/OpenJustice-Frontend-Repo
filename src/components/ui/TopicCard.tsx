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
    <div className="bg-[#232323] rounded-xl border border-[#2d2d2d] flex flex-col overflow-hidden hover:border-slate-500 transition-all group">
      <div className="p-6">
        <div
          className={`size-12 rounded-lg ${topic.bgClass} ${topic.textClass} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-lg`}
          style={{ boxShadow: `0 10px 15px -3px ${topic.colorHex}10` }} // using roughly /5 to /10 opacity shadow
        >
          <span className="material-symbols-outlined text-3xl">{topic.icon}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{topic.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{topic.description}</p>
      </div>
      <div className="mt-auto border-t border-[#2d2d2d] bg-[#1a1a1a] p-4">
        <div className="flex flex-col gap-2">
          <a
            className="flex items-center justify-between text-xs font-bold text-[#1152d4] hover:underline uppercase tracking-wider"
            href="#"
          >
            Relevant Laws <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <a
            className="flex items-center justify-between text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-wider"
            href="#"
          >
            Standard Procedures <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <a
            className="flex items-center justify-between text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-wider"
            href="#"
          >
            Common Definitions <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
