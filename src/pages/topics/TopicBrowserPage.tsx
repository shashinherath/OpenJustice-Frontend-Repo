import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BrowseLayout from "@/layout/BrowseLayout";
import TopicCard, { type TopicData } from "@/components/ui/TopicCard";

const TopicBrowserPage: React.FC = () => {
  const { t } = useTranslation();

  const TOPICS_DATA: TopicData[] = [
    {
      id: "land-property",
      icon: "house",
      title: t("landAndProperty"),
      description: t("landDescription"),
      bgClass: "bg-orange-500/10",
      textClass: "text-orange-500",
      colorHex: "#f97316"
    },
    {
      id: "employment",
      icon: "work",
      title: t("employmentLaw"),
      description: t("employmentDescription"),
      bgClass: "bg-emerald-500/10",
      textClass: "text-emerald-500",
      colorHex: "#10b981"
    },
    {
      id: "family",
      icon: "family_restroom",
      title: t("familyRights"),
      description: t("familyDescription"),
      bgClass: "bg-pink-500/10",
      textClass: "text-pink-500",
      colorHex: "#ec4899"
    },
    {
      id: "consumer",
      icon: "shopping_bag",
      title: t("consumerProtection"),
      description: t("consumerDescription"),
      bgClass: "bg-blue-500/10",
      textClass: "text-blue-500",
      colorHex: "#3b82f6"
    },
    {
      id: "criminal",
      icon: "shield",
      title: t("criminalJustice"),
      description: t("criminalDescription"),
      bgClass: "bg-red-500/10",
      textClass: "text-red-500",
      colorHex: "#ef4444"
    },
    {
      id: "ip",
      icon: "lightbulb",
      title: t("intellectualProperty"),
      description: t("ipDescription"),
      bgClass: "bg-purple-500/10",
      textClass: "text-purple-500",
      colorHex: "#a855f7"
    }
  ];

  return (
    <BrowseLayout>
      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-6">
          <Link className="transition-colors hover:text-slate-900 dark:hover:text-white" style={{ color: "var(--oj-accent-color)" }} to="/">Home</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-slate-700 dark:text-slate-100">Legal Topics Browser</span>
        </nav>
        
        <div className="mb-10">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white">{t("legalTopicBrowser")}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {t("exploreTopics")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {TOPICS_DATA.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
        
        <div className="mt-16 border-t border-slate-200 pb-6 pt-10 text-center dark:border-[#2d2d2d]">
          <p className="text-sm italic text-slate-500">
            All information retrieved through this interface is cross-referenced with official jurisdictional databases.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <a
              className="text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <a className="text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white" href="#">Data Provenance</a>
            <a className="text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white" href="#">Cite Sources</a>
          </div>
        </div>
      </div>
    </BrowseLayout>
  );
};

export default TopicBrowserPage;
