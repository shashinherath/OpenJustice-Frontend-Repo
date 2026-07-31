import React from "react";
import { Link } from "react-router-dom";

interface SettingsCategory {
  key: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  color: "cyan" | "green" | "blue" | "purple" | "amber" | "rose";
}

const SETTINGS_CATEGORIES: SettingsCategory[] = [
  {
    key: "language",
    title: "Language Settings",
    description:
      "Enable or disable languages, set default language, and configure translation pipeline.",
    icon: "language",
    path: "/admin/settings/language",
    color: "cyan",
  },
  {
    key: "ai",
    title: "AI Model Settings",
    description:
      "Configure LLM model selection, temperature, token limits, and generation parameters.",
    icon: "smart_toy",
    path: "/admin/settings/ai",
    color: "blue",
  },
  {
    key: "retrieval",
    title: "RAG Retrieval Settings",
    description:
      "Configure vector database retrieval, embedding model, and chunking strategy.",
    icon: "search",
    path: "/admin/settings/retrieval",
    color: "purple",
  },
  {
    key: "security",
    title: "Security Settings",
    description:
      "Configure JWT expiry, rate limits, prompt validation, and access control.",
    icon: "security",
    path: "/admin/settings/security",
    color: "amber",
  },
  {
    key: "privacy",
    title: "Privacy Settings",
    description:
      "Control transcript retention, PII masking, anonymization, and export policy.",
    icon: "policy",
    path: "/admin/settings/privacy",
    color: "rose",
  },
  {
    key: "integration",
    title: "Integration Settings",
    description:
      "Manage OpenAI, Twilio, WhatsApp, and WebSocket integration credentials.",
    icon: "integration_instructions",
    path: "/admin/settings/integration",
    color: "green",
  },
];

const getColorClasses = (
  color: "cyan" | "green" | "blue" | "purple" | "amber" | "rose",
) => {
  const colorMap = {
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

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-white dark:bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            System Settings
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Configure language support, AI models, RAG retrieval, security
            policies, and external integrations.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SETTINGS_CATEGORIES.map((category) => {
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
                      Configure
                    </span>
                    <span className="material-symbols-outlined text-sm text-slate-400 dark:text-slate-400">
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
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Settings Overview</h3>
        <div className="mt-4 space-y-4">
          <div className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200">Language Settings</h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage supported languages and translation behavior
            </p>
          </div>
          <div className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200">
              AI & Model Settings
            </h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Configure LLM model, temperature, and token parameters
            </p>
          </div>
          <div className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200">RAG Settings</h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Configure vector retrieval, embeddings, and chunking
            </p>
          </div>
          <div className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200">Security Settings</h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage authentication, rate limiting, and access control
            </p>
          </div>
          <div className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200">Privacy Settings</h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Control retention windows, masking rules, anonymization, and data
              export restrictions
            </p>
          </div>
          <div className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200">
              Integration Settings
            </h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Configure external APIs and service credentials
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
