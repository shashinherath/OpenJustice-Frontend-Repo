import React, { createContext, useState, useCallback } from "react";
import i18n from "@/config/i18n.config";
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from "@/constants/app-config";
import { SUPPORTED_LANGUAGES, type AppLanguage } from "@/constants/languages";

interface LanguageContextType {
  currentLanguage: AppLanguage;
  availableLanguages: AppLanguage[];
  changeLanguage: (lang: AppLanguage) => Promise<void>;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const resolvedLanguage = i18n.language?.slice(0, 2) as AppLanguage | undefined;
  const initialLanguage = SUPPORTED_LANGUAGES.includes(resolvedLanguage as AppLanguage)
    ? (resolvedLanguage as AppLanguage)
    : (DEFAULT_LANGUAGE as AppLanguage);
  const [currentLanguage, setCurrentLanguage] = useState<AppLanguage>(initialLanguage);

  const changeLanguage = useCallback(async (lang: AppLanguage) => {
    // Check if i18n is initialized properly
    if (i18n && typeof i18n.changeLanguage === 'function') {
        await i18n.changeLanguage(lang);
    }
    setCurrentLanguage(lang);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  }, []);

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        availableLanguages: SUPPORTED_LANGUAGES,
        changeLanguage 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
