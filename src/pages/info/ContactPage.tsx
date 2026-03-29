import React from "react";
import { Link } from "react-router-dom";

const contactOptions = [
  {
    icon: "mail",
    title: "Email support",
    body: "help@openjustice.example",
  },
  {
    icon: "chat",
    title: "Live inquiry",
    body: "Use the chat interface to start a new legal question.",
  },
  {
    icon: "location_on",
    title: "Office hours",
    body: "Monday to Friday, 9:00 AM - 5:00 PM",
  },
];

const ContactPage: React.FC = () => {
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
        <section className="mb-10 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300">
            Contact OpenJustice
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Reach out for product help or platform guidance.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            This page is a temporary contact surface while the backend is still in development. For now, the chat experience remains the main entry point for legal questions.
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
