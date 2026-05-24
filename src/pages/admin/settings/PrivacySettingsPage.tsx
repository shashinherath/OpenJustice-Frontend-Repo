import React, { useState } from "react";

interface PrivacySettings {
  autoDeleteTranscripts: boolean;
  dataRetentionDays: number;
  piiMaskingEnabled: boolean;
  queryAnonymizationEnabled: boolean;
  exportRestrictionsEnabled: boolean;
}

const PrivacySettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<PrivacySettings>({
    autoDeleteTranscripts: true,
    dataRetentionDays: 30,
    piiMaskingEnabled: true,
    queryAnonymizationEnabled: true,
    exportRestrictionsEnabled: true,
  });

  const [saveNotice, setSaveNotice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveNotice("Privacy settings saved successfully.");
      setTimeout(() => setSaveNotice(""), 3000);
    } catch (error) {
      setSaveNotice("Failed to save privacy settings.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Privacy Settings
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Configure transcript lifecycle, retention policies, and data
            protection controls for privacy-aware legal AI operations.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Retention Window
          </p>
          <p className="mt-3 text-2xl font-black text-cyan-400">
            {settings.dataRetentionDays}d
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            PII Masking
          </p>
          <p className="mt-3 text-2xl font-black text-green-400">
            {settings.piiMaskingEnabled ? "Enabled" : "Disabled"}
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Export Policy
          </p>
          <p className="mt-3 text-2xl font-black text-amber-400">
            {settings.exportRestrictionsEnabled ? "Restricted" : "Open"}
          </p>
        </article>
      </section>

      <section className="space-y-6 rounded border border-slate-700/70 bg-[#191919] p-6">
        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Auto-Delete Transcripts
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Automatically remove stored user transcripts after the configured
            retention window.
          </p>
          <label className="mt-4 flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-3 md:w-md">
            <span className="text-sm text-slate-200">Enable Auto-Delete</span>
            <input
              type="checkbox"
              checked={settings.autoDeleteTranscripts}
              onChange={() =>
                setSettings({
                  ...settings,
                  autoDeleteTranscripts: !settings.autoDeleteTranscripts,
                })
              }
              className="h-4 w-4 rounded border-white/20 bg-black/40"
            />
          </label>
        </article>

        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Data Retention Days
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Define how long transcripts and metadata can be retained before
            deletion.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="1"
              max="365"
              step="1"
              value={settings.dataRetentionDays}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  dataRetentionDays: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-400">Range: 1 - 365</span>
              <span className="text-sm font-bold text-cyan-300">
                {settings.dataRetentionDays} days
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            PII Masking
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Mask personally identifiable information in logs, analytics, and
            transcript previews.
          </p>
          <label className="mt-4 flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-3 md:w-md">
            <span className="text-sm text-slate-200">Enable PII Masking</span>
            <input
              type="checkbox"
              checked={settings.piiMaskingEnabled}
              onChange={() =>
                setSettings({
                  ...settings,
                  piiMaskingEnabled: !settings.piiMaskingEnabled,
                })
              }
              className="h-4 w-4 rounded border-white/20 bg-black/40"
            />
          </label>
        </article>

        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Query Anonymization
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Store anonymized query representations for analytics and evaluation
            workflows.
          </p>
          <label className="mt-4 flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-3 md:w-md">
            <span className="text-sm text-slate-200">
              Enable Query Anonymization
            </span>
            <input
              type="checkbox"
              checked={settings.queryAnonymizationEnabled}
              onChange={() =>
                setSettings({
                  ...settings,
                  queryAnonymizationEnabled:
                    !settings.queryAnonymizationEnabled,
                })
              }
              className="h-4 w-4 rounded border-white/20 bg-black/40"
            />
          </label>
        </article>

        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Export Restrictions
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Restrict transcript export to authorized roles and privacy-safe
            formats.
          </p>
          <label className="mt-4 flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-3 md:w-md">
            <span className="text-sm text-slate-200">
              Enforce Export Restrictions
            </span>
            <input
              type="checkbox"
              checked={settings.exportRestrictionsEnabled}
              onChange={() =>
                setSettings({
                  ...settings,
                  exportRestrictionsEnabled:
                    !settings.exportRestrictionsEnabled,
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

export default PrivacySettingsPage;
