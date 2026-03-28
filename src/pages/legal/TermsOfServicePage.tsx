import React from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Use of the platform",
    body: "You may use OpenJustice for lawful research and informational purposes. You are responsible for how you interpret and apply any generated content.",
  },
  {
    title: "No legal advice",
    body: "The platform provides research support and general information only. It does not replace a licensed attorney or professional legal judgment.",
  },
  {
    title: "Acceptable conduct",
    body: "Do not attempt to abuse, scrape, reverse engineer, or misuse the platform, its prompts, or its future APIs.",
  },
  {
    title: "Availability and changes",
    body: "Features may change during development. Service availability, response quality, and supported workflows may evolve over time.",
  },
];

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-[#191919] dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur dark:border-border-dark dark:bg-[#191919]/95">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="text-lg font-black tracking-tight text-slate-900 dark:text-white" to="/">
            OpenJustice
          </Link>
          <div className="flex items-center gap-3">
            <Link className="rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "var(--oj-accent-color)" }} to="/chat">
              Try OpenJustice
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300">
            Terms of Service
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Clear usage terms for the OpenJustice platform.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            These terms describe how the current frontend should be used while backend systems are still being developed. They are intentionally concise and can be expanded later for production deployment.
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
