import React from "react";
import Sidebar from "@/components/navigation/Sidebar";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_45%,#ffffff_100%)] text-slate-900 font-display dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.10),transparent_28%),linear-gradient(180deg,#0f1117_0%,#151922_45%,#191919_100%)] dark:text-slate-100">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto bg-white/45 backdrop-blur-2xl dark:bg-black/10">
        {children}
      </main>
    </div>
  );
};

export default ChatLayout;
