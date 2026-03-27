import React from "react";
import BrowseHeader from "@/components/navigation/BrowseHeader";
import BrowseSidebar from "@/components/navigation/BrowseSidebar";

interface BrowseLayoutProps {
  children: React.ReactNode;
}

const BrowseLayout: React.FC<BrowseLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#191919] text-slate-100 antialiased font-display">
      <BrowseHeader />
      <div className="flex flex-1 overflow-hidden">
        <BrowseSidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#191919] scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
};

export default BrowseLayout;
