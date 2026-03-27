import React from "react";
import FeatureCard from "@/components/ui/FeatureCard";

// Feature card data
const features = [
  {
    icon: "verified_user",
    iconBg: "bg-green-50 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
    title: "Private & Secure",
    description:
      "Your inquiries remain anonymous. We use enterprise-grade encryption to ensure your data is never shared or exposed.",
    chat: {
      userMsg: "Is my personal information shared with third parties?",
      botMsg:
        "No. We prioritize data protection. Your inquiries are anonymized and stored securely using end-to-end encryption protocols.",
    },
  },
  {
    icon: "translate",
    iconBg: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    title: "Plain Language",
    description:
      'We strip away the legalese to provide you with clear, actionable information that anyone can understand, regardless of background.',
    chat: {
      userMsg: 'What does "Force Majeure" mean in simple terms?',
      botMsg:
        'It refers to "acts of God"—unforeseeable events like floods or war that prevent someone from fulfilling their part of a contract.',
    },
  },
  {
    icon: "library_books",
    iconBg: "bg-orange-50 dark:bg-orange-900/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    title: "Comprehensive",
    description:
      "From housing disputes to small claims and family law, our library covers the essential legal procedures you need to know.",
    chat: {
      userMsg: "How do I start a small claims case?",
      botMsg:
        "1. Send a demand letter. 2. File a 'Statement of Claim' at court. 3. Pay the filing fee and serve the defendant.",
    },
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center px-4 md:px-10 lg:px-40 py-16 md:py-24">
      <div className="w-full max-w-[1024px] flex flex-col items-center text-center gap-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-8 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest">
            Bridging the Justice Gap
          </div>

          {/* Headline */}
          <h1 className="text-slate-900 dark:text-white text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
            Ask a legal question
            <br className="hidden md:block" /> in your language.
          </h1>

          {/* Subheading */}
          <p className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl leading-relaxed max-w-3xl font-light">
            Our mission is to democratize legal information. We provide clear,
            multi-lingual guidance to help you navigate complex systems and
            protect your rights with confidence.
          </p>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 max-w-2xl text-left">
            <span className="material-symbols-outlined text-amber-600 dark:text-amber-500 shrink-0">
              info
            </span>
            <p className="text-sm text-amber-800 dark:text-amber-400 leading-snug">
              <strong className="font-bold">Important Disclaimer:</strong>{" "}
              OpenJustice is an AI-powered educational tool. We provide legal
              information, not legal advice or representation. Consult a
              qualified attorney for your specific situation.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <button className="flex w-full sm:w-auto min-w-[200px] h-14 items-center justify-center gap-2 rounded-xl bg-primary dark:bg-white dark:text-primary hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.98] text-white text-lg font-bold shadow-xl transition-all">
              <span className="material-symbols-outlined">chat_bubble</span>
              <span>Ask a Question</span>
            </button>
            <button className="flex w-full sm:w-auto min-w-[200px] h-14 items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-lg font-bold transition-all shadow-sm">
              <span className="material-symbols-outlined">grid_view</span>
              <span>Browse Topics</span>
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
