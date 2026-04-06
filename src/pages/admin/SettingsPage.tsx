import React, { useContext, useMemo, useState } from "react";
import AdminLayout from "@/layout/AdminLayout";
import { LanguageContext } from "@/contexts/LanguageContext";
import { LANGUAGE_OPTIONS, type AppLanguage } from "@/constants/languages";

interface LanguageOption {
  code: AppLanguage;
  label: string;
  enabled: boolean;
}

const SettingsPage: React.FC = () => {
  const languageContext = useContext(LanguageContext);

  const initialLanguages = useMemo<LanguageOption[]>(() => {
    const enabledLanguages = languageContext?.availableLanguages ?? ["en", "si", "ta"];
    return LANGUAGE_OPTIONS.map(option => ({
      code: option.value,
      label: option.label,
      enabled: enabledLanguages.includes(option.value),
    }));
  }, [languageContext?.availableLanguages]);

  const [languages, setLanguages] = useState<LanguageOption[]>(initialLanguages);
  const [defaultLanguage, setDefaultLanguage] = useState<AppLanguage>(languageContext?.defaultLanguage ?? "en");
  const [translationPipelineEnabled, setTranslationPipelineEnabled] = useState<boolean>(languageContext?.translationPipelineEnabled ?? true);
  const [saveNotice, setSaveNotice] = useState<string>("");

  const normalizedLanguages = useMemo(
    () => LANGUAGE_OPTIONS.map(option => ({
      code: option.value,
      label: option.label,
      enabled: languages.find(language => language.code === option.value)?.enabled ?? false,
    })),
    [languages]
  );

  const toggleLanguage = (code: LanguageOption["code"]) => {
    setLanguages(previous =>
      previous.map(language =>
        language.code === code ? { ...language, enabled: !language.enabled } : language
      )
    );

    setSaveNotice("");
  };

  const handleSaveSettings = () => {
    const selectedDefault = languages.find(language => language.code === defaultLanguage);

    if (!selectedDefault?.enabled) {
      setSaveNotice("Default language must be enabled before saving settings.");
      return;
    }

    const enabledLanguages = languages
      .filter(language => language.enabled)
      .map(language => language.code);

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
    <AdminLayout>
      <div className="space-y-8 p-8">
        <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
          <div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">System Settings</h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-300">
              Configure language availability, default language, and translation pipeline behavior.
            </p>
          </div>
        </section>

        <section className="space-y-6 rounded border border-slate-700/70 bg-[#191919] p-6">
          <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Enable or Disable Languages</h3>
            <div className="mt-4 space-y-3">
              {languages.map(language => (
                <label key={language.code} className="flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-3">
                  <span className="text-sm text-slate-200">{language.code.toUpperCase()} - {language.label}</span>
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

          <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Set Default Language</h3>
            <select
              value={defaultLanguage}
              onChange={event => {
                setDefaultLanguage(event.target.value as AppLanguage);
                setSaveNotice("");
              }}
              className="mt-4 w-full rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-300 md:w-80"
            >
              {normalizedLanguages
                .filter(language => language.enabled)
                .map(language => (
                  <option key={language.code} value={language.code}>{language.code.toUpperCase()} - {language.label}</option>
                ))}
            </select>
          </article>

          <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Toggle Translation Pipeline</h3>
            <label className="mt-4 flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-3 md:w-80">
              <span className="text-sm text-slate-200">Translation Pipeline</span>
              <input
                type="checkbox"
                checked={translationPipelineEnabled}
                onChange={() => {
                  setTranslationPipelineEnabled(previous => !previous);
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
              className="rounded border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/20"
            >
              Save settings
            </button>
            {saveNotice && <p className="text-xs font-semibold text-slate-300">{saveNotice}</p>}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;

