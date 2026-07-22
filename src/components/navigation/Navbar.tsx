import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/ui/BrandLogo";
import LoginModal from "@/components/ui/LoginModal";
import LanguageSwitcherButton from "@/components/ui/LanguageSwitcherButton";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="px-4 md:px-10 lg:px-40 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <BrandLogo
              containerClassName="flex size-9 items-center justify-center overflow-hidden rounded-lg bg-primary text-white dark:bg-white dark:text-primary"
              iconClassName="text-2xl"
              imageClassName="h-full w-full object-cover"
            />
            <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">
              OpenJustice
            </h2>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            <LanguageSwitcherButton />

            {/* Login Button - Triggers LoginModal */}
            <button
              className="cursor-pointer text-sm font-semibold text-primary transition-opacity hover:opacity-70 dark:text-white"
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
