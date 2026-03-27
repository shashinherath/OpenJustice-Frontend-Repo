import React from "react";
import Sidebar from "@/components/navigation/Sidebar";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-brand-bg text-slate-900 dark:text-slate-100 font-display">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto bg-white dark:bg-brand-bg">
        {children}
      </main>
    </div>
  );
};

export default ChatLayout;
