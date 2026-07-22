import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/navigation/Sidebar";
import BrandLogo from "@/components/ui/BrandLogo";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import LanguageSwitcherButton from "@/components/ui/LanguageSwitcherButton";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_45%,#ffffff_100%)] text-slate-900 font-display dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.10),transparent_28%),linear-gradient(180deg,#0f1117_0%,#151922_45%,#191919_100%)] dark:text-slate-100">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - responsive classes */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar onMobileClose={() => setIsMobileMenuOpen(false)} />
      </div>

      <main className="flex-1 flex flex-col overflow-y-auto bg-white/45 backdrop-blur-2xl dark:bg-black/10">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 md:hidden border-b border-white/40 bg-white/55 dark:border-white/10 dark:bg-[#191919]/55 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
             <button type="button" onClick={() => setIsMobileMenuOpen(true)} className="p-1 cursor-pointer">
               <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">menu</span>
             </button>
             <Link to="/" className="flex items-center gap-3">
               <BrandLogo containerClassName="bg-primary dark:bg-slate-200 rounded-lg size-8 flex items-center justify-center overflow-hidden" iconClassName="text-white dark:text-[#191919] scale-110" />
               <span className="font-bold text-slate-900 dark:text-white">OpenJustice</span>
             </Link>
          </div>
          <div className="flex items-center gap-2">
             <ThemeToggleButton />
             <LanguageSwitcherButton />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default ChatLayout;
