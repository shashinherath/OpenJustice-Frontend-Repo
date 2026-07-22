import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ReleaseNotesPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const releaseNotes = [
    {
      version: "v0.4.0",
      date: t("releaseDateMarch2026"),
      items: [
        t("release040Item1"),
        t("release040Item2"),
        t("release040Item3"),
      ],
    },
    {
      version: "v0.3.0",
      date: t("releaseDateMarch2026"),
      items: [
        t("release030Item1"),
        t("release030Item2"),
        t("release030Item3"),
      ],
    },
  ];

  const filteredNotes = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return releaseNotes;
    }

    return releaseNotes.filter((release) => {
      const searchableText = `${release.version} ${release.date} ${release.items.join(" ")}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-[#191919] dark:text-slate-100">
      

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-10 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300">
            <span className="material-symbols-outlined text-[14px]" style={{ color: "var(--oj-accent-color)" }}>new_releases</span>
            {t("releaseNotes")}
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {t("releaseNotesHeading")}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {t("releaseNotesDescription")}
          </p>
        </section>

        <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-surface-dark">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Article search</p>
              <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{t("searchReleaseNotes")}</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {t("releasesCount", { count: filteredNotes.length })}
            </span>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" style={{ color: "var(--oj-accent-color)" }}>
                search
              </span>
              <input
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-400 dark:border-border-dark dark:bg-[#232323] dark:text-white"
                placeholder={t("searchReleasePlaceholder")}
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          {filteredNotes.map((release) => (
            <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-surface-dark" key={release.version}>
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{release.version}</h2>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{release.date}</span>
              </div>
              <ul className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {release.items.map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="material-symbols-outlined text-[18px]" style={{ color: "var(--oj-accent-color)" }}>check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
          {filteredNotes.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500 dark:border-slate-700 dark:bg-surface-dark dark:text-slate-400">
              {t("noReleaseNotes")}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ReleaseNotesPage;
