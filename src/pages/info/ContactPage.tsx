import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/ui/BrandLogo";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import LanguageSwitcherButton from "@/components/ui/LanguageSwitcherButton";

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const contactOptions = [
    {
      icon: "mail",
      title: t("contactEmailSupport"),
      body: "help@openjustice.example",
    },
    {
      icon: "chat",
      title: t("contactLiveInquiry"),
      body: t("contactLiveInquiryBody"),
    },
    {
      icon: "location_on",
      title: t("contactOfficeHours"),
      body: t("contactOfficeHoursBody"),
    },
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

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-10 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300">
            {t("contactOpenJustice")}
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {t("contactHeading")}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {t("contactDescription")}
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {contactOptions.map((item) => (
            <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-surface-dark" key={item.title}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                <span className="material-symbols-outlined text-[22px]" style={{ color: "var(--oj-accent-color)" }}>{item.icon}</span>
              </div>
              <h2 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{item.title}</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.body}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ContactPage;
