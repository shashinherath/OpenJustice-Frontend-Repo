import React, { useState } from "react";

interface SecuritySettings {
  jwtExpiryMinutes: number;
  rateLimitPerHour: number;
  enablePromptValidation: boolean;
  enableAuditLogging: boolean;
  maxFailedAttempts: number;
  lockoutDurationMinutes: number;
}

const SecuritySettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SecuritySettings>({
    jwtExpiryMinutes: 1440,
    rateLimitPerHour: 100,
    enablePromptValidation: true,
    enableAuditLogging: true,
    maxFailedAttempts: 5,
    lockoutDurationMinutes: 30,
  });

  const [saveNotice, setSaveNotice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveNotice("Security settings saved successfully.");
      setTimeout(() => setSaveNotice(""), 3000);
    } catch (error) {
      setSaveNotice("Failed to save security settings.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Security Settings
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Configure JWT expiry, rate limiting, prompt validation, and access
            control policies.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            JWT Expiry
          </p>
          <p className="mt-3 text-2xl font-black text-white">
            {settings.jwtExpiryMinutes}m
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Rate Limit
          </p>
          <p className="mt-3 text-2xl font-black text-cyan-400">
            {settings.rateLimitPerHour}/hr
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Audit Logging
          </p>
          <p className="mt-3 text-2xl font-black text-green-400">
            {settings.enableAuditLogging ? "Enabled" : "Disabled"}
          </p>
        </article>
      </section>

      <section className="space-y-6 rounded border border-slate-700/70 bg-[#191919] p-6">
        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            JWT Token Expiry
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Session timeout in minutes. Users must re-authenticate after expiry.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="15"
              max="10080"
              step="15"
              value={settings.jwtExpiryMinutes}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  jwtExpiryMinutes: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-400">Range: 15m - 7d</span>
              <span className="text-sm font-bold text-cyan-300">
                {settings.jwtExpiryMinutes}m
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Rate Limiting
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Maximum API requests allowed per user per hour.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={settings.rateLimitPerHour}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  rateLimitPerHour: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-400">Range: 10 - 1000</span>
              <span className="text-sm font-bold text-cyan-300">
                {settings.rateLimitPerHour}
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Failed Login Attempts
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Lock account after N failed authentication attempts.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={settings.maxFailedAttempts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maxFailedAttempts: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-400">Range: 1 - 10</span>
              <span className="text-sm font-bold text-cyan-300">
                {settings.maxFailedAttempts}
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Account Lockout Duration
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Duration to lock account after exceeding max failed attempts.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="5"
              max="480"
              step="5"
              value={settings.lockoutDurationMinutes}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  lockoutDurationMinutes: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-400">Range: 5m - 8h</span>
              <span className="text-sm font-bold text-cyan-300">
                {settings.lockoutDurationMinutes}m
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Prompt Validation
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Enable validation to detect and block prompt injection attempts.
          </p>
          <label className="mt-4 flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-3">
            <span className="text-sm text-slate-200">
              Prompt Injection Protection
            </span>
            <input
              type="checkbox"
              checked={settings.enablePromptValidation}
              onChange={() =>
                setSettings({
                  ...settings,
                  enablePromptValidation: !settings.enablePromptValidation,
                })
              }
              className="h-4 w-4 rounded border-white/20 bg-black/40"
            />
          </label>
        </article>

        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Audit Logging
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Enable detailed logging of all admin actions and security events.
          </p>
          <label className="mt-4 flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-3">
            <span className="text-sm text-slate-200">Audit Trail</span>
            <input
              type="checkbox"
              checked={settings.enableAuditLogging}
              onChange={() =>
                setSettings({
                  ...settings,
                  enableAuditLogging: !settings.enableAuditLogging,
                })
              }
              className="h-4 w-4 rounded border-white/20 bg-black/40"
            />
          </label>
        </article>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="rounded border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-300 transition-colors hover:bg-cyan-500/20 disabled:opacity-50"
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
