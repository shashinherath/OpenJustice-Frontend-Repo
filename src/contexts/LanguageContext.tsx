import React, { createContext, useState, useCallback } from "react";
import i18n from "@/config/i18n.config";

interface LanguageContextType {
  currentLanguage: string;
  availableLanguages: string[];
  changeLanguage: (lang: string) => Promise<void>;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "en");

  const changeLanguage = useCallback(async (lang: string) => {
    // Check if i18n is initialized properly
    if (i18n && typeof i18n.changeLanguage === 'function') {
        await i18n.changeLanguage(lang);
    }
    setCurrentLanguage(lang);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("preferred-language", lang);
    }
  }, []);

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        availableLanguages: ["en", "si", "ta"], 
        changeLanguage 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
