import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const helpTopics = [
  {
    title: "Getting started",
    body: "Use Ask Question to open a fresh conversation and get a guided legal explanation.",
  },
  {
    title: "Chat history",
    body: "Previous chats stay in the sidebar, and pinned chats are kept at the top for quick access.",
  },
  {
    title: "Archived chats",
    body: "Archived chats are hidden from the sidebar and can be managed later from Settings.",
  },
  {
    title: "Privacy and terms",
    body: "Review the privacy policy and terms pages to understand platform usage and limits.",
  },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "si", label: "Sinhala" },
  { value: "ta", label: "Tamil" },
];

const HelpPage: React.FC = () => {
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return helpTopics;
    }

    return helpTopics.filter((topic) => {
      const searchableText = `${topic.title} ${topic.body}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-[#191919] dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur dark:border-border-dark dark:bg-[#191919]/95">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="text-lg font-black tracking-tight text-slate-900 dark:text-white" to="/">
            OpenJustice
          </Link>
          <div className="flex items-center gap-3">
            <select
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none transition-colors focus:border-slate-400 dark:border-border-dark dark:bg-surface-dark dark:text-slate-200"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              aria-label="Select help page language"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-10 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300">
            <span className="material-symbols-outlined text-[14px]" style={{ color: "var(--oj-accent-color)" }}>help_outline</span>
            Help Center
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Quick answers for using OpenJustice.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            This temporary help page covers the current frontend experience until backend-powered support workflows are added.
          </p>
        </section>

        <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-surface-dark">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Article search</p>
              <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Search help articles</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {filteredTopics.length} articles
            </span>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" style={{ color: "var(--oj-accent-color)" }}>
                search
              </span>
              <input
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-400 dark:border-border-dark dark:bg-[#232323] dark:text-white"
                placeholder="Search help articles, topics, or answers..."
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
          </div>
        </section>
        <section className="grid gap-6 md:grid-cols-2">
          {filteredTopics.map((item) => (
            <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-surface-dark" key={item.title}>
              <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.body}</p>
            </article>
          ))}
          {filteredTopics.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500 dark:border-slate-700 dark:bg-surface-dark dark:text-slate-400 md:col-span-2">
              No help articles match your search.
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HelpPage;
