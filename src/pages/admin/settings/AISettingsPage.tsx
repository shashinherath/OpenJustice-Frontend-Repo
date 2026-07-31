import React, { useState, useEffect } from "react";
import { adminService, type AISettingsPayload } from "@/services/adminService";

const AI_MODELS = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4o-mini", label: "GPT-4o-Mini" }
];

const AISettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<AISettingsPayload>({
    ai_model_name: "gpt-4o-mini",
    ai_temperature: 0.2,
    ai_max_tokens: 1200,
    ai_top_p: 1.0,
    ai_frequency_penalty: 0.0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveNotice, setSaveNotice] = useState<string>("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await adminService.getAISettings();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch AI settings", error);
      }
    };
    fetchSettings();
  }, []);


  const handleSave = async () => {
    setIsLoading(true);
    try {
      await adminService.updateAISettings(settings);
      setSaveNotice("AI settings saved successfully.");
      setTimeout(() => setSaveNotice(""), 3000);
    } catch (error) {
      console.error(error);
      setSaveNotice("Failed to save AI settings.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-white dark:bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            AI Model Settings
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Configure LLM model selection, temperature, token limits, and
            generation parameters.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Active Model
          </p>
          <p className="mt-3 text-2xl font-black text-cyan-600 dark:text-cyan-400">
            {settings.ai_model_name.toUpperCase()}
          </p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Temperature
          </p>
          <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
            {settings.ai_temperature.toFixed(2)}
          </p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Max Tokens
          </p>
          <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
            {settings.ai_max_tokens}
          </p>
        </article>
      </section>

      <section className="space-y-6 rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Model Selection
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Choose the LLM model for legal query generation.
          </p>
          <div className="mt-4 md:w-96">
            <select
              value={settings.ai_model_name}
              onChange={(e) =>
                setSettings({ ...settings, ai_model_name: e.target.value })
              }
              className="w-full rounded border border-slate-300 dark:border-white/10 bg-white dark:bg-[#191919] px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition-colors hover:border-cyan-400/30 focus:border-cyan-400/50 focus:outline-none"
            >
              {AI_MODELS.map((model) => (
                <option
                  key={model.value}
                  value={model.value}
                  className="bg-white dark:bg-[#191919] text-slate-700 dark:text-slate-300"
                >
                  {model.label}
                </option>
              ))}
            </select>
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Temperature
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Controls response randomness. Lower = deterministic, Higher = creative.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={settings.ai_temperature}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  ai_temperature: parseFloat(e.target.value),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Range: 0.0 - 2.0</span>
              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300">
                {settings.ai_temperature.toFixed(2)}
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Max Tokens
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Maximum length of generated response in tokens.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="256"
              max="4096"
              step="256"
              value={settings.ai_max_tokens}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  ai_max_tokens: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Range: 256 - 4096</span>
              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300">
                {settings.ai_max_tokens}
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Top P (Nucleus Sampling)
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Controls diversity via nucleus sampling. Recommended: 0.9
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.ai_top_p}
              onChange={(e) =>
                setSettings({ ...settings, ai_top_p: parseFloat(e.target.value) })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Range: 0.0 - 1.0</span>
              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300">
                {settings.ai_top_p.toFixed(2)}
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Frequency Penalty
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Penalizes repeated tokens. Higher = less repetition.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={settings.ai_frequency_penalty}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  ai_frequency_penalty: parseFloat(e.target.value),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Range: 0.0 - 2.0</span>
              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300">
                {settings.ai_frequency_penalty.toFixed(2)}
              </span>
            </div>
          </div>
        </article>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="rounded border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-300 transition-colors hover:bg-cyan-500/20 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Settings"}
          </button>
          {saveNotice && (
            <p className="text-xs font-semibold text-green-400">{saveNotice}</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AISettingsPage;
