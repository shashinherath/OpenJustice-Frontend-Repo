import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/ui/BrandLogo";

const ResearchPage: React.FC = () => {
  const { t } = useTranslation();

  const researchTopics = [
    {
      icon: "library_books",
      title: t("researchLibrary"),
      description: t("researchTopicLibraryDescription"),
      link: "/topics",
    },
    {
      icon: "search",
      title: t("legalResearch"),
      description: t("researchTopicLegalResearchDescription"),
      link: "/chat",
    },
    {
      icon: "gavel",
      title: t("caseLaw"),
      description: t("researchTopicCaseLawDescription"),
      link: "/topics",
    },
    {
      icon: "description",
      title: t("statutes"),
      description: t("researchTopicStatutesDescription"),
      link: "/topics",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-[#191919] dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-border-dark dark:bg-[#191919]/95">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="flex items-center gap-3 text-lg font-black tracking-tight text-slate-900 dark:text-white" to="/">
            <BrandLogo
              containerClassName="flex size-9 items-center justify-center overflow-hidden rounded-lg bg-primary text-white dark:bg-white dark:text-primary"
              iconClassName="text-2xl"
            />
            <span>OpenJustice</span>
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-lg bg-primary text-white px-4 py-2 text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            to="/chat"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            {t("startResearch")}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero Section */}
        <section className="mb-16 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-400">
            <span className="material-symbols-outlined text-sm">search</span>
            {t("legalResearch")}
          </div>

          <h1 className="mb-6 text-5xl font-black text-slate-900 dark:text-white md:text-6xl">
            {t("researchHeroTitle")}
          </h1>

          <p className="mb-8 max-w-2xl text-xl leading-relaxed text-slate-600 dark:text-slate-400">
            {t("researchDescription")}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/chat"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white px-6 py-3 font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="material-symbols-outlined">chat</span>
              {t("askQuestion")}
            </Link>
            <Link
              to="/topics"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white text-slate-900 px-6 py-3 font-bold hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 transition-colors"
            >
              <span className="material-symbols-outlined">grid_view</span>
              {t("browseTopics")}
            </Link>
          </div>
        </section>

        {/* Research Topics Grid */}
        <section className="mb-16">
          <h2 className="mb-12 text-3xl font-bold text-slate-900 dark:text-white text-center">
            {t("researchTools")}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {researchTopics.map((topic) => (
              <Link
                key={topic.title}
                to={topic.link}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                  <span className="material-symbols-outlined text-2xl text-blue-600 dark:text-blue-400">
                    {topic.icon}
                  </span>
                </div>

                <h3 className="mb-2 font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {topic.title}
                </h3>

                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                  {topic.description}
                </p>

                <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
                  {t("researchExplore")}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>

                <div className="absolute inset-0 pointer-events-none -translate-x-full bg-linear-to-r from-transparent via-white to-transparent opacity-30 group-hover:translate-x-full transition-transform duration-500 dark:via-slate-700" />
              </Link>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800/50 md:p-12">
          <h2 className="mb-12 text-3xl font-bold text-slate-900 dark:text-white text-center">
            {t("whyChooseOpenJustice")}
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                <span className="material-symbols-outlined text-2xl text-green-600 dark:text-green-400">
                  verified_user
                </span>
              </div>
              <h3 className="mb-2 font-bold text-slate-900 dark:text-white">{t("researchFeatureSecureTitle")}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("researchFeatureSecureBody")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                <span className="material-symbols-outlined text-2xl text-purple-600 dark:text-purple-400">
                  languages
                </span>
              </div>
              <h3 className="mb-2 font-bold text-slate-900 dark:text-white">{t("researchFeatureMultilingualTitle")}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("researchFeatureMultilingualBody")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-orange-100 p-3 dark:bg-orange-900/30">
                <span className="material-symbols-outlined text-2xl text-orange-600 dark:text-orange-400">
                  lightbulb
                </span>
              </div>
              <h3 className="mb-2 font-bold text-slate-900 dark:text-white">{t("researchFeatureAiTitle")}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("researchFeatureAiBody")}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResearchPage;
