import React, { createContext, useState, useEffect, useCallback } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";
const STORAGE_KEY = "oj-theme";
const ACCENT_STORAGE_KEY = "oj-accent-color";

const accentColorHexMap: Record<string, string> = {
  default: "#64748b",
  blue: "#3b82f6",
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent | MouseEvent) => void;
  setTheme: (theme: Theme, e?: React.MouseEvent | MouseEvent) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  };

  useEffect(() => {
    const storedAccent = localStorage.getItem(ACCENT_STORAGE_KEY);
    const accentHex = storedAccent ? accentColorHexMap[storedAccent] : undefined;
    document.documentElement.style.setProperty("--oj-accent-color", accentHex || accentColorHexMap.blue);
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const performThemeTransition = useCallback((updateFn: () => void, e?: React.MouseEvent | MouseEvent) => {
    // @ts-ignore
    if (!document.startViewTransition) {
      updateFn();
      return;
    }

    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        updateFn();
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }, []);

  const toggleTheme = useCallback((e?: React.MouseEvent | MouseEvent) => {
    performThemeTransition(() => {
      setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
    }, e);
  }, [performThemeTransition]);

  const setThemeWithAnimation = useCallback((newTheme: Theme, e?: React.MouseEvent | MouseEvent) => {
    if (theme === newTheme) return;
    performThemeTransition(() => {
      setThemeState(newTheme);
    }, e);
  }, [theme, performThemeTransition]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeWithAnimation }}>
      {children}
    </ThemeContext.Provider>
  );
};
