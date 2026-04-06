import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FeatureCard from "@/components/ui/FeatureCard";
import LoginModal from "@/components/ui/LoginModal";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("login") === "1") {
      setIsLoginOpen(true);
    }
  }, [searchParams]);

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
    if (searchParams.has("login") || searchParams.has("redirect")) {
      const next = new URLSearchParams(searchParams);
      next.delete("login");
      next.delete("redirect");
      setSearchParams(next, { replace: true });
    }
  };

  // Feature card data built with translations
  const features = [
    {
      icon: "verified_user",
      iconBg: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
      title: t("privateAndSecure"),
      description: t("privateDescription"),
      chat: {
        userMsg: t("isMyDataShared"),
        botMsg: t("dataSecurity"),
      },
    },
    {
      icon: "translate",
      iconBg: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      title: t("plainLanguage"),
      description: t("plainDescription"),
      chat: {
        userMsg: t("forceMajeure"),
        botMsg: t("forceMajeureExplanation"),
      },
    },
    {
      icon: "library_books",
      iconBg: "bg-orange-50 dark:bg-orange-900/20",
      iconColor: "text-orange-600 dark:text-orange-400",
      title: t("comprehensive"),
      description: t("comprehensiveDescription"),
      chat: {
        userMsg: t("smallClaimsCase"),
        botMsg: t("smallClaimsSteps"),
      },
    },
  ];

  return (
    <>
      <div className="flex-1 flex flex-col items-center px-4 md:px-10 lg:px-40 py-16 md:py-24">
        <div className="w-full max-w-5xl flex flex-col items-center text-center gap-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-8 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest">
            {t("homeBadge")}
          </div>

          {/* Headline */}
          <h1 className="text-slate-900 dark:text-white text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
            {t("homeHeroTitleLine1")}
            <br className="hidden md:block" /> {t("homeHeroTitleLine2")}
          </h1>

          {/* Subheading */}
          <p className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl leading-relaxed max-w-3xl font-light">
            {t("homeHeroDescription")}
          </p>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 max-w-2xl text-left">
            <span className="material-symbols-outlined text-amber-600 dark:text-amber-500 shrink-0">
              info
            </span>
            <div>
              <p className="text-sm text-amber-800 dark:text-amber-400 leading-snug">
                <strong className="font-bold">{t("disclaimer")}</strong>{" "}
                {t("disclaimerText")}
              </p>
              <Link
                className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-700 hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-200 transition-colors"
                to="/privacy-policy"
                target="_blank"
              >
                {t("readPrivacyPolicy")}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsLoginOpen(true)}
              className="flex w-full sm:w-auto min-w-50 h-14 items-center justify-center gap-2 rounded-xl bg-primary dark:bg-white dark:text-primary hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.98] text-white text-lg font-bold shadow-xl transition-all"
            >
              <span className="material-symbols-outlined">chat_bubble</span>
              <span>{t("askQuestion")}</span>
            </button>
            <Link to="/topics" className="flex w-full sm:w-auto min-w-50 h-14 items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-lg font-bold transition-all shadow-sm">
              <span className="material-symbols-outlined">grid_view</span>
              <span>{t("browseTopics")}</span>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>

        <section className="w-full rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm dark:border-slate-700 dark:bg-surface-dark md:p-8">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t("learnMore")}</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {t("homeLearnMoreHeading")}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {t("homeLearnMoreDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Link
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-[#232323] dark:hover:border-slate-600 dark:hover:bg-slate-800"
              to="/about-us"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300">
                <span className="material-symbols-outlined text-[22px]">info</span>
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{t("aboutUs")}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t("homeAboutCardDescription")}
              </p>
            </Link>

            <Link
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-[#232323] dark:hover:border-slate-600 dark:hover:bg-slate-800"
              to="/contact"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300">
                <span className="material-symbols-outlined text-[22px]">support_agent</span>
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{t("contact")}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t("homeContactCardDescription")}
              </p>
            </Link>

            <Link
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-[#232323] dark:hover:border-slate-600 dark:hover:bg-slate-800"
              to="/terms-of-service"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300">
                <span className="material-symbols-outlined text-[22px]">description</span>
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{t("termsOfService")}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t("homeTermsCardDescription")}
              </p>
            </Link>

            <Link
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-[#232323] dark:hover:border-slate-600 dark:hover:bg-slate-800"
              to="/research"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-300">
                <span className="material-symbols-outlined text-[22px]">search</span>
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{t("research")}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t("homeResearchCardDescription")}
              </p>
            </Link>

            <Link
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-[#232323] dark:hover:border-slate-600 dark:hover:bg-slate-800"
              to="/developers"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300">
                <span className="material-symbols-outlined text-[22px]">code</span>
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{t("developers")}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t("homeDevelopersCardDescription")}
              </p>
            </Link>
          </div>
        </section>
        </div>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={handleCloseLogin} />
    </>
  );
};

export default HomePage;
