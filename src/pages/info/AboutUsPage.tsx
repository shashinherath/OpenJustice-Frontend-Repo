import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/ui/BrandLogo";

const AboutUsPage: React.FC = () => {
  const { t } = useTranslation();
  const teamValues = [
    {
      title: t("aboutValueLegalClarityTitle"),
      body: t("aboutValueLegalClarityBody"),
    },
    {
      title: t("aboutValueAccessibleDesignTitle"),
      body: t("aboutValueAccessibleDesignBody"),
    },
    {
      title: t("aboutValueResponsibleAiTitle"),
      body: t("aboutValueResponsibleAiBody"),
    },
  ];

  const milestones = [
    t("aboutMilestone1"),
    t("aboutMilestone2"),
    t("aboutMilestone3"),
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-[#191919] dark:text-slate-100">
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
            <Link className="rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "var(--oj-accent-color)" }} to="/chat">
              {t("tryOpenJustice")}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300">
              {t("aboutOpenJustice")}
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {t("aboutHeading")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {t("aboutDescription")}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-surface-dark">
            <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">{t("whatWeStandFor")}</h2>
            <div className="space-y-4">
              {milestones.map((item) => (
                <div className="flex gap-3" key={item}>
                  <span className="material-symbols-outlined text-[18px]" style={{ color: "var(--oj-accent-color)" }}>check_circle</span>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {teamValues.map((item) => (
            <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-surface-dark" key={item.title}>
              <h3 className="mb-3 text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.body}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;
