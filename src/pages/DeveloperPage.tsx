import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/ui/BrandLogo";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import LanguageSwitcherButton from "@/components/ui/LanguageSwitcherButton";

const DeveloperPage: React.FC = () => {
  const { t } = useTranslation();

  const resources = [
    {
      icon: "code",
      title: t("developerResourceGithubTitle"),
      description: t("developerResourceGithubDescription"),
      link: "https://github.com/shashinherath/OpenJustice",
    },
    {
      icon: "description",
      title: t("developerResourceDocsTitle"),
      description: t("developerResourceDocsDescription"),
      link: "#documentation",
    },
    {
      icon: "bug_report",
      title: t("developerResourceIssuesTitle"),
      description: t("developerResourceIssuesDescription"),
      link: "https://github.com/shashinherath/OpenJustice/issues",
    },
    {
      icon: "feedback",
      title: t("developerResourceContributeTitle"),
      description: t("developerResourceContributeDescription"),
      link: "#contribute",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-[#191919] dark:to-slate-900">
      {/* Header */}
      <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="px-4 md:px-10 lg:px-40 py-4 flex items-center justify-between">
          <Link className="flex items-center gap-3 text-lg font-black tracking-tight text-slate-900 dark:text-white" to="/">
            <BrandLogo
              containerClassName="flex size-9 items-center justify-center overflow-hidden rounded-lg bg-primary text-white dark:bg-white dark:text-primary"
              iconClassName="text-2xl"
            />
            <span>OpenJustice</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            <LanguageSwitcherButton />
            <Link
              className="inline-flex items-center gap-2 rounded-lg bg-primary text-white px-4 py-2 text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              to="/chat"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              {t("tryOpenJustice")}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero Section */}
        <section className="mb-16 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-purple-700 dark:border-purple-900 dark:bg-purple-900/20 dark:text-purple-400">
            <span className="material-symbols-outlined text-sm">code</span>
            {t("developerHeroBadge")}
          </div>

          <h1 className="mb-6 text-5xl font-black text-slate-900 dark:text-white md:text-6xl">
            {t("developerHeroTitle")}
          </h1>

          <p className="mb-8 max-w-2xl text-xl leading-relaxed text-slate-600 dark:text-slate-400">
            {t("developerDescription")}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="https://github.com/shashinherath/OpenJustice"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white px-6 py-3 font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="material-symbols-outlined">code</span>
              {t("developerViewGithub")}
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white text-slate-900 px-6 py-3 font-bold hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 transition-colors"
            >
              <span className="material-symbols-outlined">mail</span>
              {t("contact")}
            </Link>
          </div>
        </section>

        {/* Developer Resources */}
        <section className="mb-16">
          <h2 className="mb-12 text-3xl font-bold text-slate-900 dark:text-white text-center">
            {t("developerResourcesHeading")}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.link}
                target={resource.link.startsWith("http") ? "_blank" : undefined}
                rel={resource.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40 transition-colors">
                  <span className="material-symbols-outlined text-2xl text-purple-600 dark:text-purple-400">
                    {resource.icon}
                  </span>
                </div>

                <h3 className="mb-2 font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {resource.title}
                </h3>

                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                  {resource.description}
                </p>

                <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:gap-3 transition-all">
                  {t("developerLearnMore")}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>

                <div className="absolute inset-0 pointer-events-none -translate-x-full bg-linear-to-r from-transparent via-white to-transparent opacity-30 group-hover:translate-x-full transition-transform duration-500 dark:via-slate-700" />
              </a>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16 rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800/50 md:p-12">
          <h2 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
            {t("developerTechStackHeading")}
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">cloud</span>
                {t("developerBackend")}
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>{t("developerBackendItem1")}</li>
                <li>{t("developerBackendItem2")}</li>
                <li>{t("developerBackendItem3")}</li>
                <li>{t("developerBackendItem4")}</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-600">window</span>
                {t("developerFrontend")}
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>{t("developerFrontendItem1")}</li>
                <li>{t("developerFrontendItem2")}</li>
                <li>{t("developerFrontendItem3")}</li>
                <li>{t("developerFrontendItem4")}</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600">security</span>
                {t("developerSecurity")}
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>{t("developerSecurityItem1")}</li>
                <li>{t("developerSecurityItem2")}</li>
                <li>{t("developerSecurityItem3")}</li>
                <li>{t("developerSecurityItem4")}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
            {t("developerReadyTitle")}
          </h2>
          <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
            {t("developerReadyDescription")}
          </p>
          <a
            href="https://github.com/shashinherath/OpenJustice"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white px-8 py-4 text-lg font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-lg"
          >
            <span className="material-symbols-outlined">fork_right</span>
            {t("developerForkGithub")}
          </a>
        </section>
      </main>
    </div>
  );
};

export default DeveloperPage;
