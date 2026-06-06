import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/ui/BrandLogo";

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const privacyHighlights = [t("privacyHighlight1"), t("privacyHighlight2"), t("privacyHighlight3")];

  const ethicalFramework = [
    {
      title: t("privacyEthicalAnswerGenerationTitle"),
      description: t("privacyEthicalAnswerGenerationBody"),
    },
    {
      title: t("privacyEthicalSourceAttributionTitle"),
      description: t("privacyEthicalSourceAttributionBody"),
    },
    {
      title: t("privacyEthicalNeutralityTitle"),
      description: t("privacyEthicalNeutralityBody"),
    },
    {
      title: t("privacyEthicalSystemLimitationsTitle"),
      description: t("privacyEthicalSystemLimitationsBody"),
    },
  ];

  const securityCards = [
    {
      icon: "lock",
      title: t("privacySecuritySoc2Title"),
      body: t("privacySecuritySoc2Body"),
    },
    {
      icon: "cloud_off",
      title: t("privacySecurityNoModelTrainingTitle"),
      body: t("privacySecurityNoModelTrainingBody"),
    },
    {
      icon: "key",
      title: t("privacySecurityByokTitle"),
      body: t("privacySecurityByokBody"),
    },
    {
      icon: "history_toggle_off",
      title: t("privacySecurityDataPortabilityTitle"),
      body: t("privacySecurityDataPortabilityBody"),
    },
  ];

  const detailedClauses = [
    {
      title: t("privacyClause1Title"),
      body: t("privacyClause1Body"),
    },
    {
      title: t("privacyClause2Title"),
      body: t("privacyClause2Body"),
    },
    {
      title: t("privacyClause3Title"),
      body: t("privacyClause3Body"),
    },
  ];

  const handleSearchClick = () => {
    searchInputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-[#191919] dark:text-slate-100">
      <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="px-4 md:px-10 lg:px-40 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link className="flex items-center gap-3 text-lg font-black tracking-tight text-slate-900 dark:text-white" to="/">
              <BrandLogo
                containerClassName="flex size-9 items-center justify-center overflow-hidden rounded-lg bg-primary text-white dark:bg-white dark:text-primary"
                iconClassName="text-2xl"
              />
              <span>OpenJustice</span>
            </Link>
            <nav className="hidden items-center gap-5 md:flex">
              <div className="flex items-center gap-2">
                <input
                  ref={searchInputRef}
                  className="h-9 w-52 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-[#232323] dark:text-slate-100"
                  type="text"
                  placeholder={t("policySearchPlaceholder")}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
                <button
                  className="flex items-center text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"
                  type="button"
                  aria-label={t("searchPrivacyPolicy")}
                  onClick={handleSearchClick}
                >
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </button>
              </div>
            </nav>
          </div>

          <Link
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-lg transition-all hover:bg-slate-100"
            to="/chat"
          >
            {t("tryOpenJustice")}
            <span className="material-symbols-outlined text-sm">north_east</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="mb-14 lg:mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300">
            <span className="material-symbols-outlined text-[14px] text-slate-500 dark:text-slate-200">verified_user</span>
            {t("trustAndTransparencyProtocol")}
          </div>
          <h2 className="mb-6 text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {t("privacyHeadingPrefix")} <span className="text-slate-300">{t("privacyHeadingHighlight")}</span> {t("privacyHeadingSuffix")}
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {t("privacyDescription")}
          </p>
        </section>

        <section className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12 lg:mb-16">
          <div className="md:col-span-4">
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 backdrop-blur-xl dark:border-slate-700 dark:bg-[#2d2d2d]/40">
              <span className="material-symbols-outlined mb-6 block text-4xl text-slate-500 dark:text-slate-100">shield</span>
              <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">{t("privacyPolicyOverview")}</h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t("privacyPolicyOverviewBody")}
              </p>
              <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                {privacyHighlights.map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="material-symbols-outlined text-sm text-slate-500 dark:text-slate-200">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 backdrop-blur-xl dark:border-slate-700 dark:bg-[#2d2d2d]/40">
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-slate-400/10 blur-3xl" />
              <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-200">auto_awesome</span>
                {t("ethicalFramework")}
              </h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {ethicalFramework.map((item) => (
                  <div key={item.title}>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14 lg:mb-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="relative mb-6 h-64 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <img
                  alt={t("serverSecurity")}
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">{t("dataUsageAndSecurity")}</h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                {t("dataUsageAndSecurityBody")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-2">
              {securityCards.map((card) => (
                <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-surface-dark" key={card.title}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700/30">
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-200">{card.icon}</span>
                  </div>
                  <div>
                    <h5 className="mb-1 font-bold text-slate-900 dark:text-white">{card.title}</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 py-16 dark:border-slate-800">
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="lg:w-1/3">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">Detailed Clauses</h4>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-500">
                {t("detailedClausesBody")}
              </p>
            </div>

            <div className="space-y-12 lg:w-2/3">
              {detailedClauses.map((clause) => (
                <article className="group" key={clause.title}>
                  <div className="mb-2 flex items-center justify-between">
                    <h5 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-slate-700 dark:text-white dark:group-hover:text-slate-300">{clause.title}</h5>
                    <span className="material-symbols-outlined text-slate-500 transition-colors group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-white">arrow_forward</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{clause.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-8 flex flex-col items-center justify-center gap-6 border-t border-slate-200 py-8 text-center dark:border-slate-800">
          <div className="flex items-center gap-2 text-center">
            <span className="text-sm font-medium text-slate-500">{t("copyright")}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-center">
            <Link className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white" to="/terms-of-service">
              {t("termsOfService")}
            </Link>
            <Link className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white" to="/about-us">
              {t("aboutUs")}
            </Link>
            <Link className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white" to="/contact">
              {t("contact")}
            </Link>
            <Link className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white" to="/help">
              {t("help")}
            </Link>
            <Link className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white" to="/release-notes">
              {t("releaseNotes")}
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;