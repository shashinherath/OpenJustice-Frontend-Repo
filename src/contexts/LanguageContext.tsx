import React, { createContext, useState, useCallback, useEffect } from "react";
import i18n from "@/config/i18n.config";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  ENABLED_LANGUAGES_STORAGE_KEY,
  DEFAULT_ADMIN_LANGUAGE_STORAGE_KEY,
  TRANSLATION_PIPELINE_STORAGE_KEY,
} from "@/constants/app-config";
import { SUPPORTED_LANGUAGES, type AppLanguage } from "@/constants/languages";

interface LanguageSettingsPayload {
  enabledLanguages: AppLanguage[];
  defaultLanguage: AppLanguage;
  translationPipelineEnabled: boolean;
}

interface LanguageContextType {
  currentLanguage: AppLanguage;
  availableLanguages: AppLanguage[];
  defaultLanguage: AppLanguage;
  translationPipelineEnabled: boolean;
  changeLanguage: (lang: AppLanguage) => Promise<void>;
  updateLanguageSettings: (payload: LanguageSettingsPayload) => Promise<void>;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedEnabledLanguages = (() => {
    if (typeof localStorage === "undefined") {
      return SUPPORTED_LANGUAGES;
    }

    try {
      const raw = localStorage.getItem(ENABLED_LANGUAGES_STORAGE_KEY);
      if (!raw) {
        return SUPPORTED_LANGUAGES;
      }

      const parsed = JSON.parse(raw) as AppLanguage[];
      const valid = parsed.filter(language => SUPPORTED_LANGUAGES.includes(language));
      return valid.length > 0 ? valid : SUPPORTED_LANGUAGES;
    } catch {
      return SUPPORTED_LANGUAGES;
    }
  })();

  const savedDefaultLanguage = (() => {
    if (typeof localStorage === "undefined") {
      return DEFAULT_LANGUAGE as AppLanguage;
    }

    const raw = localStorage.getItem(DEFAULT_ADMIN_LANGUAGE_STORAGE_KEY) as AppLanguage | null;
    if (raw && savedEnabledLanguages.includes(raw)) {
      return raw;
    }

    return (savedEnabledLanguages[0] ?? DEFAULT_LANGUAGE) as AppLanguage;
  })();

  const resolvedLanguage = i18n.language?.slice(0, 2) as AppLanguage | undefined;
  const initialLanguage = resolvedLanguage && savedEnabledLanguages.includes(resolvedLanguage)
    ? resolvedLanguage
    : savedDefaultLanguage;

  const [currentLanguage, setCurrentLanguage] = useState<AppLanguage>(initialLanguage);
  const [availableLanguages, setAvailableLanguages] = useState<AppLanguage[]>(savedEnabledLanguages);
  const [defaultLanguage, setDefaultLanguage] = useState<AppLanguage>(savedDefaultLanguage);
  const [translationPipelineEnabled, setTranslationPipelineEnabled] = useState<boolean>(() => {
    if (typeof localStorage === "undefined") {
      return true;
    }
    return localStorage.getItem(TRANSLATION_PIPELINE_STORAGE_KEY) !== "false";
  });

  useEffect(() => {
    if (i18n.language?.slice(0, 2) !== initialLanguage) {
      void i18n.changeLanguage(initialLanguage);
    }
  }, [initialLanguage]);

  useEffect(() => {
    // Sync with backend on mount
    const syncWithBackend = async () => {
      try {
        const { adminService } = await import("@/services/adminService");
        const settings = await adminService.getLanguageSettings();
        
        const validLanguages = settings.enabled_languages.filter((l: string) => SUPPORTED_LANGUAGES.includes(l as AppLanguage)) as AppLanguage[];
        if (validLanguages.length > 0) {
          setAvailableLanguages(validLanguages);
          setDefaultLanguage(settings.default_language as AppLanguage);
          setTranslationPipelineEnabled(settings.translation_pipeline_enabled);

          if (typeof localStorage !== "undefined") {
            localStorage.setItem(ENABLED_LANGUAGES_STORAGE_KEY, JSON.stringify(validLanguages));
            localStorage.setItem(DEFAULT_ADMIN_LANGUAGE_STORAGE_KEY, settings.default_language);
            localStorage.setItem(TRANSLATION_PIPELINE_STORAGE_KEY, String(settings.translation_pipeline_enabled));
          }
        }
      } catch (error) {
        console.warn("Failed to sync language settings with backend, using local defaults", error);
      }
    };
    void syncWithBackend();
  }, []);

  const changeLanguage = useCallback(async (lang: AppLanguage) => {
    if (!availableLanguages.includes(lang)) {
      return;
    }

    // Check if i18n is initialized properly
    if (i18n && typeof i18n.changeLanguage === 'function') {
        await i18n.changeLanguage(lang);
    }
    setCurrentLanguage(lang);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  }, [availableLanguages]);

  const updateLanguageSettings = useCallback(async ({
    enabledLanguages,
    defaultLanguage: nextDefaultLanguage,
    translationPipelineEnabled: nextTranslationPipelineEnabled,
  }: LanguageSettingsPayload) => {
    const normalizedEnabledLanguages = enabledLanguages.filter(language => SUPPORTED_LANGUAGES.includes(language));
    const safeEnabledLanguages = normalizedEnabledLanguages.length > 0
      ? normalizedEnabledLanguages
      : [DEFAULT_LANGUAGE as AppLanguage];

    const safeDefaultLanguage = safeEnabledLanguages.includes(nextDefaultLanguage)
      ? nextDefaultLanguage
      : safeEnabledLanguages[0];

    try {
      const { adminService } = await import("@/services/adminService");
      await adminService.updateLanguageSettings({
        enabled_languages: safeEnabledLanguages,
        default_language: safeDefaultLanguage,
        translation_pipeline_enabled: nextTranslationPipelineEnabled
      });
      
      setAvailableLanguages(safeEnabledLanguages);
      setDefaultLanguage(safeDefaultLanguage);
      setTranslationPipelineEnabled(nextTranslationPipelineEnabled);

      if (typeof localStorage !== "undefined") {
        localStorage.setItem(ENABLED_LANGUAGES_STORAGE_KEY, JSON.stringify(safeEnabledLanguages));
        localStorage.setItem(DEFAULT_ADMIN_LANGUAGE_STORAGE_KEY, safeDefaultLanguage);
        localStorage.setItem(TRANSLATION_PIPELINE_STORAGE_KEY, String(nextTranslationPipelineEnabled));
      }

      // Apply selected default immediately so changes are visible across the app.
      const nextCurrentLanguage = safeDefaultLanguage;

      await changeLanguage(nextCurrentLanguage);
    } catch (error) {
      console.error("Failed to save language settings to backend", error);
      throw error;
    }
  }, [changeLanguage]);

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        availableLanguages,
        defaultLanguage,
        translationPipelineEnabled,
        changeLanguage,
        updateLanguageSettings,
      }}
    >
      {children}
    </LanguageContext.Provider>

  );
};
