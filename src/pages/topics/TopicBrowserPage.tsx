import React from "react";
import { Link } from "react-router-dom";
import BrowseLayout from "@/layout/BrowseLayout";
import TopicCard, { type TopicData } from "@/components/ui/TopicCard";

const TOPICS_DATA: TopicData[] = [
  {
    id: "land-property",
    icon: "house",
    title: "Land & Property",
    description: "Covers real estate transactions, residential and commercial tenancy agreements, land usage, and zoning regulations.",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-500",
    colorHex: "#f97316"
  },
  {
    id: "employment",
    icon: "work",
    title: "Employment Law",
    description: "Statutes regarding workplace rights, contract obligations, termination disputes, and occupational health and safety standards.",
    bgClass: "bg-emerald-500/10",
    textClass: "text-emerald-500",
    colorHex: "#10b981"
  },
  {
    id: "family",
    icon: "family_restroom",
    title: "Family Rights",
    description: "Legal frameworks for marriage, divorce proceedings, child custody rights, adoption, and inheritance distributions.",
    bgClass: "bg-pink-500/10",
    textClass: "text-pink-500",
    colorHex: "#ec4899"
  },
  {
    id: "consumer",
    icon: "shopping_bag",
    title: "Consumer Protection",
    description: "Rights regarding product liability, service guarantees, deceptive trade practices, and consumer credit regulations.",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-500",
    colorHex: "#3b82f6"
  },
  {
    id: "criminal",
    icon: "shield",
    title: "Criminal Justice",
    description: "Procedural guidelines for criminal defense, sentencing guidelines, parole frameworks, and civil liberties protection.",
    bgClass: "bg-red-500/10",
    textClass: "text-red-500",
    colorHex: "#ef4444"
  },
  {
    id: "ip",
    icon: "lightbulb",
    title: "Intellectual Property",
    description: "Management of copyrights, patent filings, trademark protection, and trade secret litigation frameworks.",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-500",
    colorHex: "#a855f7"
  }
];

const TopicBrowserPage: React.FC = () => {
  return (
    <BrowseLayout>
      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-6">
          <Link className="hover:text-[#1152d4] transition-colors" to="/">Home</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-slate-100">Legal Topics Browser</span>
        </nav>
        
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-4 text-white">Legal Topic Browser</h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            Navigate verified legal frameworks and procedural workflows. These modules are curated to minimize hallucination risks by referencing direct statutory data.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {TOPICS_DATA.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
        
        <div className="mt-16 text-center border-t border-[#2d2d2d] pt-10 pb-6">
          <p className="text-sm text-slate-500 italic">
            All information retrieved through this interface is cross-referenced with official jurisdictional databases.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <a className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors" href="#">Privacy Policy</a>
            <a className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors" href="#">Data Provenance</a>
            <a className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors" href="#">Cite Sources</a>
          </div>
        </div>
      </div>
    </BrowseLayout>
  );
};

export default TopicBrowserPage;
