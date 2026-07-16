import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/common/useTheme";

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggleTheme = (e: React.MouseEvent) => {
    toggleTheme(e);
  };

  return (
    <button
      onClick={handleToggleTheme}
      className="group flex size-9 items-center justify-center rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-emerald-400 text-slate-500 dark:text-slate-400 hover:text-white dark:hover:text-white cursor-pointer shrink-0"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon size={18} className="transition-transform duration-500 group-hover:rotate-[360deg]" />
      ) : (
        <Sun size={18} className="transition-transform duration-500 group-hover:rotate-[360deg]" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
