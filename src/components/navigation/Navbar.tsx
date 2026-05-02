import React, { useState } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/ui/BrandLogo";
import LoginModal from "@/components/ui/LoginModal";
import { LanguageContext } from "@/contexts/LanguageContext";
import LanguageSelect from "@/components/ui/LanguageSelect";
import { SUPPORTED_LANGUAGES, type AppLanguage } from "@/constants/languages";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const languageContext = useContext(LanguageContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const currentLanguage = (languageContext?.currentLanguage || "en") as AppLanguage;
  const availableLanguages = languageContext?.availableLanguages || SUPPORTED_LANGUAGES;

  const handleLanguageChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const nextLanguage = event.target.value as AppLanguage;
    if (languageContext?.changeLanguage) {
      void languageContext.changeLanguage(nextLanguage);
    }
  };

  return (
    <>
      <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="px-4 md:px-10 lg:px-40 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <BrandLogo containerClassName="flex size-9 items-center justify-center overflow-hidden rounded-lg bg-primary text-white dark:bg-white dark:text-primary" iconClassName="text-2xl" />
            <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">
              OpenJustice
            </h2>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 dark:border-border-dark dark:bg-surface-dark">
              <span className="material-symbols-outlined text-[16px] text-slate-500">language</span>
              <LanguageSelect
                value={currentLanguage}
                onChange={(v) => {
                  const next = v as AppLanguage;
                  if (languageContext?.changeLanguage) {
                    void languageContext.changeLanguage(next);
                  }
                }}
                options={availableLanguages.map((lang) => ({ value: lang, label: lang === "en" ? t("langEnglish") : lang === "si" ? t("langSinhala") : t("langTamil") }))}
                ariaLabel={t("selectLanguage")}
                className="ml-2"
              />
            </div>

            {/* Login Button */}
            <button
              className="text-sm font-semibold text-primary dark:text-white hover:opacity-70 transition-opacity"
              type="button"
              onClick={() => setIsLoginOpen(true)}
            >
              {t("logIn")}
            </button>
          </div>
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;

