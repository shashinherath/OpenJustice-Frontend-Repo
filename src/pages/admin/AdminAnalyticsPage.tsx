import React from "react";
import { Link } from "react-router-dom";

interface AnalyticsCategory {
  key: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  color: "cyan" | "green" | "blue" | "purple" | "amber" | "rose";
}

const ANALYTICS_CATEGORIES: AnalyticsCategory[] = [
  {
    key: "platforms",
    title: "Platform Analytics",
    description:
      "Web, WhatsApp, and voice usage distribution with response performance.",
    icon: "devices",
    path: "/admin/analytics/platforms",
    color: "blue",
  },
  {
    key: "usage",
    title: "Usage Analytics",
    description: "Query volume, active users, and traffic trends.",
    icon: "bar_chart",
    path: "/admin/analytics/usage",
    color: "cyan",
  },
  {
    key: "cost",
    title: "Cost Analytics",
    description:
      "OpenAI and Twilio spend, token usage, and forecasted platform cost.",
    icon: "payments",
    path: "/admin/analytics/cost",
    color: "rose",
  },
  {
    key: "multilingual",
    title: "Multilingual Analytics",
    description: "Language distribution and translation usage.",
    icon: "translate",
    path: "/admin/analytics/multilingual",
    color: "green",
  },
  {
    key: "retrieval",
    title: "Retrieval Evaluation",
    description: "RAG retrieval quality and recall/precision metrics.",
    icon: "search",
    path: "/admin/analytics/retrieval-evaluation",
    color: "purple",
  },
  {
    key: "ai",
    title: "AI Evaluation Metrics",
    description: "Model performance, hallucination rates, and token usage.",
    icon: "psychology",
    path: "/admin/analytics/ai-evaluation",
    color: "blue",
  },
  {
    key: "research",
    title: "Research",
    description:
      "RAGAS, faithfulness, precision/recall, BLEU/ROUGE, and dataset tracking.",
    icon: "insights",
    path: "/admin/analytics/research-metrics",
    color: "amber",
  },
];

const getColorClasses = (color: AnalyticsCategory["color"]) => {
  const colorMap: Record<string, any> = {
    cyan: {
      border: "border-cyan-400/20",
      bg: "bg-cyan-500/5 hover:bg-cyan-500/10",
      icon: "text-cyan-600 dark:text-cyan-400",
      text: "text-cyan-600 dark:text-cyan-300",
      iconBg: "bg-cyan-50 dark:bg-[#0a0a0a]",
    },
    green: {
      border: "border-green-400/20",
      bg: "bg-green-500/5 hover:bg-green-500/10",
      icon: "text-green-600 dark:text-green-400",
      text: "text-green-600 dark:text-green-300",
      iconBg: "bg-green-50 dark:bg-[#0a0a0a]",
    },
    blue: {
      border: "border-blue-400/20",
      bg: "bg-blue-500/5 hover:bg-blue-500/10",
      icon: "text-blue-600 dark:text-blue-400",
      text: "text-blue-600 dark:text-blue-300",
      iconBg: "bg-blue-50 dark:bg-[#0a0a0a]",
    },
    purple: {
      border: "border-purple-400/20",
      bg: "bg-purple-500/5 hover:bg-purple-500/10",
      icon: "text-purple-600 dark:text-purple-400",
      text: "text-purple-600 dark:text-purple-300",
      iconBg: "bg-purple-50 dark:bg-[#0a0a0a]",
    },
    amber: {
      border: "border-amber-400/20",
      bg: "bg-amber-500/5 hover:bg-amber-500/10",
      icon: "text-amber-600 dark:text-amber-400",
      text: "text-amber-600 dark:text-amber-300",
      iconBg: "bg-amber-50 dark:bg-[#0a0a0a]",
    },
    rose: {
      border: "border-rose-400/20",
      bg: "bg-rose-500/5 hover:bg-rose-500/10",
      icon: "text-rose-600 dark:text-rose-400",
      text: "text-rose-600 dark:text-rose-300",
      iconBg: "bg-rose-50 dark:bg-[#0a0a0a]",
    },
  };
  return colorMap[color];
};

const AdminAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-white dark:bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Simple Analytics
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Review daily query activity and language distribution to understand
            platform usage trends.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {ANALYTICS_CATEGORIES.map((category) => {
          const colors = getColorClasses(category.color);
          return (
            <Link
              key={category.key}
              to={category.path}
              className={`rounded border transition-all ${colors.border} ${colors.bg} bg-white dark:bg-[#191919] p-6 hover:border-opacity-50`}
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-lg ${colors.iconBg} p-3 ${colors.icon}`}>
                  <span className="material-symbols-outlined text-2xl">
                    {category.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-widest ${colors.text}`}
                    >
                      View
                    </span>
                    <span className="material-symbols-outlined text-sm text-slate-400">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Analytics Overview</h3>
        <div className="mt-4 space-y-4">
          <div className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200">Query Volume</h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Daily and weekly query counts across the platform.
            </p>
          </div>
          <div className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200">
              Platform Distribution
            </h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Web vs WhatsApp platform share with message and voice breakdown
              plus response time by platform.
            </p>
          </div>
          <div className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200">Cost Efficiency</h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              OpenAI LLM, embeddings, Whisper, TTS, and Twilio message spend.
            </p>
          </div>
          <div className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200">
              Language Distribution
            </h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Breakdown of queries by language and translation patterns.
            </p>
          </div>
          <div className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200">
              Retrieval & RAG Quality
            </h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Recall, precision, and retrieval performance summaries.
            </p>
          </div>
          <div className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200">AI Evaluation</h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Model accuracy, hallucination metrics, and token consumption.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminAnalyticsPage;
