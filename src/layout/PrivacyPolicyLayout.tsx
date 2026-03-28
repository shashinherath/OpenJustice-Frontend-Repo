import React from "react";
import { Link } from "react-router-dom";
import { useSettingsModal } from "@/hooks/common/useSettingsModal";

interface PrivacyPolicyLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { icon: "dashboard", label: "Dashboard", href: "#" },
  { icon: "gavel", label: "Case Law", href: "#" },
  { icon: "menu_book", label: "Statutes", href: "#" },
  { icon: "library_books", label: "Research Library", href: "#" },
  { icon: "history", label: "Recent Activity", href: "#" },
];

const PrivacyPolicyLayout: React.FC<PrivacyPolicyLayoutProps> = ({ children }) => {
  const { openSettings } = useSettingsModal();

  return (
    <div className="min-h-screen bg-[#191919] text-slate-100 antialiased font-display">
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 border-r border-border-dark bg-[#191919] py-4 lg:flex lg:flex-col">
        <div className="mb-8 flex items-center gap-3 px-6">
          <span className="material-symbols-outlined text-slate-200 text-2xl">balance</span>
          <div className="flex flex-col">
            <span className="text-lg font-black text-white leading-none">OpenJustice</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Legal Research</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-2">
          {sidebarItems.map((item) => (
            <a
              key={item.label}
              className="mx-2 flex items-center gap-3 rounded-lg px-4 py-3 text-slate-400 transition-all duration-200 hover:bg-[#2d2d2d]/50"
              href={item.href}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto px-4">
          <div className="flex items-center gap-3 rounded-xl border border-border-dark bg-[#2d2d2d]/40 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
              <span className="material-symbols-outlined text-slate-100 text-lg">person</span>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-white font-medium">J. Smith</span>
              <span className="text-[10px] uppercase font-bold text-slate-500">Premium Counsel</span>
            </div>
            <span className="material-symbols-outlined ml-auto text-sm text-slate-500">more_vert</span>
          </div>
        </div>
      </aside>

      <main className="min-h-screen lg:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border-dark bg-[#191919]/95 px-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-slate-700">/</span>
            <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">Privacy &amp; Ethics</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                search
              </span>
              <input
                className="w-64 rounded-full border border-border-dark bg-surface-dark py-1.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-slate-500 focus:outline-none"
                placeholder="Search policy..."
                type="text"
              />
            </div>
            <button className="text-slate-400 transition-colors hover:text-white" type="button">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-slate-400 transition-colors hover:text-white" type="button" onClick={openSettings}>
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default PrivacyPolicyLayout;