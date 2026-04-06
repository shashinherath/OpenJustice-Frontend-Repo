import React from "react";
import BrowseHeader from "@/components/navigation/BrowseHeader";

interface BrowseLayoutProps {
  children: React.ReactNode;
}

const BrowseLayout: React.FC<BrowseLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-slate-50 text-slate-900 antialiased font-display dark:bg-brand-bg dark:text-slate-100">
      <BrowseHeader />
      <main className="flex-1 overflow-y-auto bg-slate-50 p-6 scroll-smooth dark:bg-brand-bg md:p-10">
        {children}
      </main>
    </div>
  );
};

export default BrowseLayout;
