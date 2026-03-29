import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/ui/BrandLogo";

const DeveloperPage: React.FC = () => {
  const { t } = useTranslation();

  const resources = [
    {
      icon: "code",
      title: "GitHub Repository",
      description: "View the OpenJustice source code and contribute to the project.",
      link: "https://github.com/shashinherath/OpenJustice",
    },
    {
      icon: "description",
      title: "Documentation",
      description: "Explore our comprehensive technical documentation and API guides.",
      link: "#documentation",
    },
    {
      icon: "bug_report",
      title: "Report Issues",
      description: "Found a bug? Help us improve by reporting issues.",
      link: "https://github.com/shashinherath/OpenJustice/issues",
    },
    {
      icon: "feedback",
      title: "Contribute",
      description: "Join our community and contribute to legal access for all.",
      link: "#contribute",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-[#191919] dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-border-dark dark:bg-[#191919]/95">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="flex items-center gap-3 text-lg font-black tracking-tight text-slate-900 dark:text-white" to="/">
            <BrandLogo
              containerClassName="flex size-9 items-center justify-center overflow-hidden rounded-lg bg-primary text-white dark:bg-white dark:text-primary"
              iconClassName="text-2xl"
            />
            <span>OpenJustice</span>
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-lg bg-primary text-white px-4 py-2 text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            to="/chat"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            {t("tryOpenJustice")}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero Section */}
        <section className="mb-16 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-purple-700 dark:border-purple-900 dark:bg-purple-900/20 dark:text-purple-400">
            <span className="material-symbols-outlined text-sm">code</span>
            For Developers
          </div>

          <h1 className="mb-6 text-5xl font-black text-slate-900 dark:text-white md:text-6xl">
            Build with OpenJustice
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
              View on GitHub
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
            Developer Resources
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
                  Learn More
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>

                <div className="absolute inset-0 pointer-events-none -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 group-hover:translate-x-full transition-transform duration-500 dark:via-slate-700" />
              </a>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16 rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800/50 md:p-12">
          <h2 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
            Technology Stack
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">cloud</span>
                Backend
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>• Python & FastAPI</li>
                <li>• PostgreSQL Database</li>
                <li>• Vector Embeddings</li>
                <li>• LLM Integration</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-600">window</span>
                Frontend
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>• React 18+</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• i18n Support</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600">security</span>
                Security
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>• End-to-End Encryption</li>
                <li>• SOC 2 Compliance</li>
                <li>• Data Privacy</li>
                <li>• Secure APIs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
            Ready to Contribute?
          </h2>
          <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
            Join us in making legal information accessible to everyone.
          </p>
          <a
            href="https://github.com/shashinherath/OpenJustice"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white px-8 py-4 text-lg font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-lg"
          >
            <span className="material-symbols-outlined">fork_right</span>
            Fork on GitHub
          </a>
        </section>
      </main>
    </div>
  );
};

export default DeveloperPage;
