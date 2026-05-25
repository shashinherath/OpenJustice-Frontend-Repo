import React from "react";

export interface FeatureData {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  chat: {
    userMsg: string;
    botMsg: string;
  };
}

interface FeatureCardProps {
  feature: FeatureData;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="flex flex-col gap-6 group">
      {/* Feature Info Card */}
      <div className="flex flex-col items-start p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
        <div
          className={`p-3 rounded-lg ${feature.iconBg} ${feature.iconColor} mb-5`}
        >
          <span className="material-symbols-outlined text-3xl">
            {feature.icon}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 text-left">
          {feature.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed text-left">
          {feature.description}
        </p>
      </div>

      {/* Demo Chat Bubble */}
      <div className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-left">
        {/* User message */}
        <div className="flex items-start gap-3">
          <div className="size-7 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />
          <p className="text-[13px] text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 p-2.5 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
            {feature.chat.userMsg}
          </p>
        </div>
        {/* Bot message */}
        <div className="flex items-start gap-3 flex-row-reverse">
          <div className="size-7 rounded-full bg-blue-600 shrink-0 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[16px]">
              smart_toy
            </span>
          </div>
          <p className="text-[13px] text-slate-700 dark:text-slate-300 bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-lg border border-blue-100 dark:border-blue-800/50">
            {feature.chat.botMsg}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
