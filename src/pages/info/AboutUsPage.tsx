import React from "react";
import { Link } from "react-router-dom";

const teamValues = [
  {
    title: "Legal clarity",
    body: "We translate dense legal language into practical guidance that people can understand and act on.",
  },
  {
    title: "Accessible design",
    body: "The experience is built for fast navigation, multilingual use, and low-friction research.",
  },
  {
    title: "Responsible AI",
    body: "Every answer is designed to stay grounded in sources, context, and transparent limitations.",
  },
];

const milestones = [
  "Built to bridge the justice gap for everyday users.",
  "Designed for legal research, case preparation, and rights awareness.",
  "Planned to connect directly to future backend and database services.",
];

const AboutUsPage: React.FC = () => {
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

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300">
              About OpenJustice
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Building legal access that feels clear, modern, and usable.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              OpenJustice is a legal research experience focused on helping people understand legal issues without getting lost in jargon. The product is designed to support rights discovery, guided research, and future database-backed legal workflows.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-surface-dark">
            <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">What we stand for</h2>
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
