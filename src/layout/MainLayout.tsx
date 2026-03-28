import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark py-12">
        <div className="px-4 md:px-10 lg:px-40 flex flex-col items-center justify-center gap-8">
          <div className="flex flex-wrap items-center justify-center gap-10">
            <Link
              className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white text-sm font-semibold transition-colors"
              to="/privacy-policy"
            >
              Privacy Policy
            </Link>
            <a
              className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white text-sm font-semibold transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white text-sm font-semibold transition-colors"
              href="#"
            >
              About Us
            </a>
            <a
              className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white text-sm font-semibold transition-colors"
              href="#"
            >
              Contact
            </a>
          </div>

          <div className="flex flex-col items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-8 w-full">
            <p className="text-slate-400 dark:text-slate-500 text-xs font-normal text-center max-w-2xl leading-relaxed">
              <strong className="text-slate-500 dark:text-slate-400">
                Legal Disclaimer:
              </strong>{" "}
              OpenJustice is an AI assistant, not a law firm. Information
              provided is for educational purposes only and does not constitute
              professional legal advice, an attorney-client relationship, or a
              substitute for a lawyer.
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium text-center">
              OpenJustice Prototype &copy; 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
