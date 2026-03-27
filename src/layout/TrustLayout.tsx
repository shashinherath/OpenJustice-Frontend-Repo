import React from "react";
import TrustHeader from "@/components/legal/TrustHeader";
import TrustSidebar from "@/components/legal/TrustSidebar";

interface TrustLayoutProps {
  children: React.ReactNode;
}

const TrustLayout: React.FC<TrustLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#191919] text-slate-300 antialiased font-display">
      <TrustHeader />
      <div className="flex flex-1 overflow-hidden">
        <TrustSidebar />
        <main className="flex-1 overflow-y-auto bg-[#191919] scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
};

export default TrustLayout;
