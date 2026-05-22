import React, { useContext, useMemo, useState } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { LANGUAGE_OPTIONS, type AppLanguage } from "@/constants/languages";
import LanguageSelect from "@/components/ui/LanguageSelect";

interface LanguageOption {
  code: AppLanguage;
  label: string;
  enabled: boolean;
}

const LanguageSettingsPage: React.FC = () => {
  const languageContext = useContext(LanguageContext);

  const initialLanguages = useMemo<LanguageOption[]>(() => {
    const enabledLanguages = languageContext?.availableLanguages ?? [
      "en",
      "si",
      "ta",
    ];
    return LANGUAGE_OPTIONS.map((option) => ({
      code: option.value,
      label: option.label,
      enabled: enabledLanguages.includes(option.value),
    }));
  }, [languageContext?.availableLanguages]);

  const [languages, setLanguages] =
    useState<LanguageOption[]>(initialLanguages);
  const [defaultLanguage, setDefaultLanguage] = useState<AppLanguage>(
    languageContext?.defaultLanguage ?? "en",
  );
  const [translationPipelineEnabled, setTranslationPipelineEnabled] =
    useState<boolean>(languageContext?.translationPipelineEnabled ?? true);
  const [saveNotice, setSaveNotice] = useState<string>("");

  const normalizedLanguages = useMemo(
    () =>
      LANGUAGE_OPTIONS.map((option) => ({
        code: option.value,
        label: option.label,
        enabled:
          languages.find((language) => language.code === option.value)
            ?.enabled ?? false,
      })),
    [languages],
  );

  const toggleLanguage = (code: LanguageOption["code"]) => {
    setLanguages((previous) =>
      previous.map((language) =>
        language.code === code
          ? { ...language, enabled: !language.enabled }
          : language,
      ),
    );

    setSaveNotice("");
  };

  const handleSaveSettings = () => {
    const selectedDefault = languages.find(
      (language) => language.code === defaultLanguage,
    );

    if (!selectedDefault?.enabled) {
      setSaveNotice("Default language must be enabled before saving settings.");
      return;
    }

    const enabledLanguages = languages
      .filter((language) => language.enabled)
      .map((language) => language.code);

    if (enabledLanguages.length === 0) {
      setSaveNotice("At least one language must remain enabled.");
      return;
    }

    if (!languageContext?.updateLanguageSettings) {
      setSaveNotice("Language settings service is unavailable.");
      return;
    }

    void languageContext
      .updateLanguageSettings({
        enabledLanguages,
        defaultLanguage,
        translationPipelineEnabled,
      })
      .then(() => {
        setSaveNotice("Settings saved successfully.");
      })
      .catch(() => {
        setSaveNotice("Failed to save settings.");
      });
  };

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Language Settings
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Configure supported languages, set default language, and manage
            translation pipeline behavior.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Enabled Languages
          </p>
          <p className="mt-3 text-2xl font-black text-white">
            {languages.filter((l) => l.enabled).length}
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Default Language
          </p>
          <p className="mt-3 text-2xl font-black text-cyan-400">
            {defaultLanguage.toUpperCase()}
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Translation Pipeline
          </p>
          <p className="mt-3 text-2xl font-black text-green-400">
            {translationPipelineEnabled ? "Enabled" : "Disabled"}
          </p>
        </article>
      </section>

      <section className="space-y-6 rounded border border-slate-700/70 bg-[#191919] p-6">
        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Enable or Disable Languages
          </h3>
          <div className="mt-4 space-y-3">
            {languages.map((language) => (
              <label
                key={language.code}
                className="flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-3 transition-colors hover:bg-white/5"
              >
                <span className="text-sm text-slate-200">
                  {language.code.toUpperCase()} - {language.label}
                </span>
                <input
                  type="checkbox"
                  checked={language.enabled}
                  onChange={() => toggleLanguage(language.code)}
                  className="h-4 w-4 rounded border-white/20 bg-black/40"
                />
              </label>
            ))}
          </div>
        </article>

        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Set Default Language
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Users will see this language by default on first login.
          </p>
          <div className="mt-4 md:w-80">
            <LanguageSelect
              value={defaultLanguage}
              onChange={(v) => {
                setDefaultLanguage(v as AppLanguage);
                setSaveNotice("");
              }}
              options={normalizedLanguages
                .filter((l) => l.enabled || l.code === defaultLanguage)
                .map((l) => ({
                  value: l.code,
                  label: `${l.code.toUpperCase()} - ${l.label}${l.enabled ? "" : " (disabled)"}`,
                }))}
              ariaLabel="Select default language"
            />
          </div>
        </article>

        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Toggle Translation Pipeline
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Enable automatic translation for multilingual user queries.
          </p>
          <label className="mt-4 flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-3 md:w-80">
            <span className="text-sm text-slate-200">Translation Pipeline</span>
            <input
              type="checkbox"
              checked={translationPipelineEnabled}
              onChange={() => {
                setTranslationPipelineEnabled((previous) => !previous);
                setSaveNotice("");
              }}
              className="h-4 w-4 rounded border-white/20 bg-black/40"
            />
          </label>
        </article>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <button
            type="button"
            onClick={handleSaveSettings}
            className="rounded border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-300 transition-colors hover:bg-cyan-500/20"
          >
            Save Settings
          </button>
          {saveNotice && (
            <p
              className={`text-xs font-semibold ${
                saveNotice.includes("success")
                  ? "text-green-400"
                  : "text-slate-300"
              }`}
            >
              {saveNotice}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default LanguageSettingsPage;
