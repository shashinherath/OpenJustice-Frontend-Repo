import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import BrandLogo from "@/components/ui/BrandLogo";

const privacyHighlights = [
  "End-to-end encryption for all session data",
  "Zero third-party data sharing for advertising",
  "GDPR and CCPA compliant architecture",
];

const ethicalFramework = [
  {
    title: "Answer Generation",
    description:
      "Our AI utilizes a Retrieval-Augmented Generation (RAG) system. It is bounded by validated case law and statutory text in our curated databases.",
  },
  {
    title: "Source Attribution",
    description:
      "Every generated statement includes source references. If a source is unavailable, the system explicitly states that limitation.",
  },
  {
    title: "Neutrality Maintenance",
    description:
      "OpenJustice does not provide legal advice or advocate for outcomes. The platform is tuned for objective legal synthesis.",
  },
  {
    title: "System Limitations",
    description:
      "While the corpus is broad, ultra-recent filings may still be processing. Users are alerted when results may be incomplete.",
  },
];

const securityCards = [
  {
    icon: "lock",
    title: "SOC 2 Type II",
    body: "Our infrastructure undergoes annual independent security audits to ensure enterprise-grade protection.",
  },
  {
    icon: "cloud_off",
    title: "No Model Training",
    body: "Your proprietary queries and case strategies are excluded from LLM fine-tuning cycles.",
  },
  {
    icon: "key",
    title: "BYOK Support",
    body: "Enterprise clients can provide their own encryption keys for maximum data sovereignty.",
  },
  {
    icon: "history_toggle_off",
    title: "Data Portability",
    body: "Download or purge your entire search and document history at any time through Settings.",
  },
];

const detailedClauses = [
  {
    title: "1.0 Data Minimization Principle",
    body: "We only collect the minimum amount of information required to provide accurate legal citations and maintain account security. Metadata is stripped from uploaded documents before processing.",
  },
  {
    title: "2.0 Multi-Jurisdictional Compliance",
    body: "Our platform aligns with regional Bar Association ethical standards regarding AI usage in legal practice, including a human-in-the-loop requirement.",
  },
  {
    title: "3.0 Transparency Logs",
    body: "Generative responses include confidence indicators and retrieval trace details to support manual verification of source paths.",
  },
];

const PrivacyPolicyPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    searchInputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-[#191919] dark:text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-border-dark dark:bg-[#191919]/95">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link className="text-lg font-black tracking-tight text-slate-900 dark:text-white" to="/">
              OpenJustice
            </Link>
            <nav className="hidden items-center gap-5 md:flex">
              <a className="text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white" href="#">
                Research
              </a>
              <a className="text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white" href="#">
                Developers
              </a>
              <div className="flex items-center gap-2">
                <input
                  ref={searchInputRef}
                  className="h-9 w-52 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-[#232323] dark:text-slate-100"
                  type="text"
                  placeholder="Search privacy policy..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
                <button
                  className="flex items-center text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"
                  type="button"
                  aria-label="Search privacy policy"
                  onClick={handleSearchClick}
                >
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </button>
              </div>
            </nav>
          </div>

          <Link
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-lg transition-all hover:bg-slate-100"
            to="/chat"
          >
            Try OpenJustice
            <span className="material-symbols-outlined text-sm">north_east</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="mb-14 lg:mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300">
            <span className="material-symbols-outlined text-[14px] text-slate-500 dark:text-slate-200">verified_user</span>
            Trust &amp; Transparency Protocol
          </div>
          <h2 className="mb-6 text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Our commitment to <span className="text-slate-300">legal integrity</span> and data privacy.
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            OpenJustice is built on the foundation of transparency. Professional legal research requires speed, but also a reliable ethical framework that protects practitioner data and preserves source neutrality.
          </p>
        </section>

        <section className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12 lg:mb-16">
          <div className="md:col-span-4">
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 backdrop-blur-xl dark:border-slate-700 dark:bg-[#2d2d2d]/40">
              <span className="material-symbols-outlined mb-6 block text-4xl text-slate-500 dark:text-slate-100">shield</span>
              <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Privacy Policy Overview</h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Standard data protection information regarding how we collect, store, and manage personal identifiers and professional credentials.
              </p>
              <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                {privacyHighlights.map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="material-symbols-outlined text-sm text-slate-500 dark:text-slate-200">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 backdrop-blur-xl dark:border-slate-700 dark:bg-[#2d2d2d]/40">
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-slate-400/10 blur-3xl" />
              <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-200">auto_awesome</span>
                Ethical Framework
              </h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {ethicalFramework.map((item) => (
                  <div key={item.title}>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14 lg:mb-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="relative mb-6 h-64 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <img
                  alt="Server security"
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Data Usage &amp; Security</h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                We treat every query as confidential work product. Search history and uploaded documents remain private to your workspace and are never used to train global AI models.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-2">
              {securityCards.map((card) => (
                <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-surface-dark" key={card.title}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700/30">
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-200">{card.icon}</span>
                  </div>
                  <div>
                    <h5 className="mb-1 font-bold text-slate-900 dark:text-white">{card.title}</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 py-16 dark:border-slate-800">
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="lg:w-1/3">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">Detailed Clauses</h4>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-500">
                Please review our disclosures. These documents govern the formal relationship between your practice and the OpenJustice platform.
              </p>
            </div>

            <div className="space-y-12 lg:w-2/3">
              {detailedClauses.map((clause) => (
                <article className="group" key={clause.title}>
                  <div className="mb-2 flex items-center justify-between">
                    <h5 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-slate-700 dark:text-white dark:group-hover:text-slate-300">{clause.title}</h5>
                    <span className="material-symbols-outlined text-slate-500 transition-colors group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-white">arrow_forward</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{clause.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-8 flex flex-col items-center justify-center gap-6 border-t border-slate-200 py-8 text-center dark:border-slate-800">
          <div className="flex items-center gap-2 text-center">
            <BrandLogo containerClassName="flex size-5 items-center justify-center overflow-hidden" iconClassName="text-xl text-slate-500 dark:text-slate-200" />
            <span className="text-sm font-medium text-slate-500">OpenJustice © 2026. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-center">
            <Link className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white" to="/terms-of-service">
              Terms of Service
            </Link>
            <Link className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white" to="/about-us">
              About Us
            </Link>
            <Link className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white" to="/contact">
              Contact
            </Link>
            <Link className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white" to="/help">
              Help
            </Link>
            <Link className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white" to="/release-notes">
              Release Notes
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;