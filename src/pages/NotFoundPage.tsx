import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Status code */}
        <div className="text-8xl font-black text-slate-200 dark:text-slate-800 select-none mb-2">
          404
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <span className="material-symbols-outlined text-6xl text-slate-400 dark:text-slate-600">
            travel_explore
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          {t("notFoundTitle", "Page Not Found")}
        </h1>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
          {t(
            "notFoundDescription",
            "The page you're looking for doesn't exist or has been moved.",
          )}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-base">home</span>
            {t("goHome", "Go Home")}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            {t("goBack", "Go Back")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
