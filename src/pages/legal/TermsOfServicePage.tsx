import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TermsOfServicePage: React.FC = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: t("termsUseOfPlatformTitle"),
      body: t("termsUseOfPlatformBody"),
    },
    {
      title: t("termsNoLegalAdviceTitle"),
      body: t("termsNoLegalAdviceBody"),
    },
    {
      title: t("termsAcceptableConductTitle"),
      body: t("termsAcceptableConductBody"),
    },
    {
      title: t("termsAvailabilityTitle"),
      body: t("termsAvailabilityBody"),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-[#191919] dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur dark:border-border-dark dark:bg-[#191919]/95">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="text-lg font-black tracking-tight text-slate-900 dark:text-white" to="/">
            OpenJustice
          </Link>
          <div className="flex items-center gap-3">
            <Link className="rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "var(--oj-accent-color)" }} to="/chat">
              {t("tryOpenJustice")}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300">
            {t("termsOfService")}
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {t("termsHeading")}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {t("termsDescription")}
          </p>
        </section>

        <section className="space-y-4">
          {sections.map((item) => (
            <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-surface-dark" key={item.title}>
              <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.body}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default TermsOfServicePage;
