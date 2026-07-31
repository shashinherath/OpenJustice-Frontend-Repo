import React, { useState, useEffect } from "react";
import { adminService, type SecuritySettingsPayload } from "@/services/adminService";

const SecuritySettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SecuritySettingsPayload>({
    jwt_expiry_minutes: 60,
    rate_limit_per_minute: 100,
    prompt_validation_enabled: true,
    account_lockout_threshold: 5,
  });

  const [saveNotice, setSaveNotice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await adminService.getSecuritySettings();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch security settings", error);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await adminService.updateSecuritySettings(settings);
      setSaveNotice("Security settings saved successfully.");
      setTimeout(() => setSaveNotice(""), 3000);
    } catch (error) {
      console.error(error);
      setSaveNotice("Failed to save security settings.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-white dark:bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Security Settings
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Configure authentication, rate limiting, and prompt validation policies
            for optimal system security.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            JWT Expiry
          </p>
          <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
            {settings.jwt_expiry_minutes}m
          </p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Rate Limit
          </p>
          <p className="mt-3 text-2xl font-black text-cyan-600 dark:text-cyan-400">
            {settings.rate_limit_per_minute}/m
          </p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Lockout Threshold
          </p>
          <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
            {settings.account_lockout_threshold}
          </p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Prompt Validation
          </p>
          <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
            {settings.prompt_validation_enabled ? "Enabled" : "Disabled"}
          </p>
        </article>
      </section>

      <section className="space-y-6 rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">

        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            JWT Token Expiry (Minutes)
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Session timeout in minutes. Users must re-authenticate after expiry.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="5"
              max="1440"
              step="5"
              value={settings.jwt_expiry_minutes}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  jwt_expiry_minutes: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Range: 5 - 1440</span>
              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300">
                {settings.jwt_expiry_minutes}
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Rate Limit Per Minute
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Maximum number of WebSocket messages a user can send per minute.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={settings.rate_limit_per_minute}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  rate_limit_per_minute: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Range: 10 - 1000</span>
              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300">
                {settings.rate_limit_per_minute}
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Account Lockout Threshold
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Number of failed login attempts before an account is temporarily locked.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="3"
              max="20"
              step="1"
              value={settings.account_lockout_threshold}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  account_lockout_threshold: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Range: 3 - 20</span>
              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300">
                {settings.account_lockout_threshold}
              </span>
            </div>
          </div>
        </article>

        <article className="flex items-center justify-between rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <div className="pr-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
              Prompt Injection Validation
            </h3>
            <p className="mt-2 max-w-xl text-[10px] text-slate-500 dark:text-slate-400">
              Enable the PromptSecurityValidator to intercept and sanitize prompt injection
              attempts before they reach the LLM.
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={settings.prompt_validation_enabled}
              onChange={(e) =>
                setSettings({ ...settings, prompt_validation_enabled: e.target.checked })
              }
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-slate-700 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-cyan-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500/50"></div>
          </label>
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

export default SecuritySettingsPage;
