import React, {
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "@/contexts/LanguageContext";
import { SUPPORTED_LANGUAGES, type AppLanguage } from "@/constants/languages";

type DropdownAlign = "left" | "right";

interface LanguageSwitcherButtonProps {
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  align?: DropdownAlign;
  ariaLabel?: string;
}

const getLanguageLabel = (
  language: AppLanguage,
  t: ReturnType<typeof useTranslation>["t"],
) => {
  switch (language) {
    case "si":
      return t("langSinhala");
    case "ta":
      return t("langTamil");
    default:
      return t("langEnglish");
  }
};

const LanguageSwitcherButton: React.FC<LanguageSwitcherButtonProps> = ({
  className = "",
  buttonClassName = "",
  menuClassName = "",
  align = "right",
  ariaLabel,
}) => {
  const { t } = useTranslation();
  const languageContext = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
    right: number;
    minWidth: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const availableLanguages =
    languageContext?.availableLanguages || SUPPORTED_LANGUAGES;
  const currentLanguage = (
    languageContext?.currentLanguage || "en"
  ).toLowerCase() as AppLanguage;
  const hasOptions = availableLanguages.length > 0;
  const listboxId = useId();

  const selectedIndex = useMemo(
    () =>
      availableLanguages.findIndex((language) => language === currentLanguage),
    [availableLanguages, currentLanguage],
  );

  const selectedLabel = useMemo(
    () => getLanguageLabel(currentLanguage, t),
    [currentLanguage, t],
  );

  const openDropdown = () => {
    if (!hasOptions) {
      return;
    }

    setIsOpen(true);
    const initialIndex = selectedIndex >= 0 ? selectedIndex : 0;
    setFocusedIndex(initialIndex);
  };

  const updateMenuPosition = () => {
    const triggerElement = triggerRef.current;
    if (!triggerElement) {
      return;
    }

    const rect = triggerElement.getBoundingClientRect();
    const menuWidth = Math.max(rect.width, 176);

    if (align === "right") {
      setMenuPosition({
        top: rect.bottom + 8,
        left: 0,
        right: Math.max(window.innerWidth - rect.right, 8),
        minWidth: menuWidth,
      });
      return;
    }

    setMenuPosition({
      top: rect.bottom + 8,
      left: Math.max(rect.left, 8),
      right: 0,
      minWidth: menuWidth,
    });
  };

  const closeDropdown = (returnFocus = true) => {
    setIsOpen(false);
    setFocusedIndex(-1);
    setMenuPosition(null);
    if (returnFocus) {
      triggerRef.current?.focus();
    }
  };

  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      optionRefs.current[focusedIndex]?.focus();
    }
  }, [isOpen, focusedIndex]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    updateMenuPosition();

    const handleWindowChange = () => updateMenuPosition();
    window.addEventListener("resize", handleWindowChange);
    window.addEventListener("scroll", handleWindowChange, true);

    return () => {
      window.removeEventListener("resize", handleWindowChange);
      window.removeEventListener("scroll", handleWindowChange, true);
    };
  }, [isOpen, align]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        closeDropdown(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const handleSelect = async (nextLanguage: AppLanguage) => {
    if (!languageContext?.changeLanguage) {
      closeDropdown();
      return;
    }

    try {
      await languageContext.changeLanguage(nextLanguage);
    } catch (error) {
      console.error("Failed to change language:", error);
    } finally {
      closeDropdown();
    }
  };

  const handleTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else {
          setFocusedIndex(
            Math.min(focusedIndex + 1, availableLanguages.length - 1),
          );
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else {
          setFocusedIndex(Math.max(focusedIndex - 1, 0));
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (!isOpen) {
          openDropdown();
        }
        break;
      case "Escape":
        event.preventDefault();
        closeDropdown();
        break;
    }
  };

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setFocusedIndex(Math.min(index + 1, availableLanguages.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex(Math.max(index - 1, 0));
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        void handleSelect(availableLanguages[index]);
        break;
      case "Escape":
        event.preventDefault();
        closeDropdown();
        break;
      case "Tab":
        closeDropdown(false);
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative hidden md:inline-block ${className}`.trim()}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={ariaLabel ?? t("selectLanguage")}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={
          isOpen && focusedIndex >= 0
            ? `${listboxId}-option-${focusedIndex}`
            : undefined
        }
        onClick={() => (isOpen ? closeDropdown() : openDropdown())}
        onKeyDown={handleTriggerKeyDown}
        disabled={!hasOptions}
        className={`flex h-full items-center gap-2 rounded-full border border-white/50 bg-white/60 px-3 py-1.5 text-left shadow-sm backdrop-blur-xl transition-colors hover:bg-white/75 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 cursor-pointer ${buttonClassName}`.trim()}
      >
        <span className="material-symbols-outlined text-[18px] text-slate-500 dark:text-slate-300">
          language
        </span>
        <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {selectedLabel || currentLanguage.toUpperCase()}
        </span>
        <span className="pointer-events-none material-symbols-outlined text-[14px] text-slate-500 dark:text-slate-400">
          expand_more
        </span>
      </button>

      {isOpen && menuPosition && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={menuRef}
              id={listboxId}
              role="listbox"
              aria-label={ariaLabel ?? t("selectLanguage")}
              className={`fixed z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-2xl shadow-black/10 ring-1 ring-black/5 backdrop-blur-xl dark:border-slate-700/70 dark:bg-brand-bg dark:shadow-black/40 dark:ring-white/5 ${menuClassName}`.trim()}
              style={{
                top: menuPosition.top,
                left: align === "right" ? "auto" : menuPosition.left,
                right: align === "right" ? menuPosition.right : "auto",
                minWidth: menuPosition.minWidth,
              }}
            >
              <div className="max-h-56 overflow-auto">
                {availableLanguages.map((language, index) => {
                  const isSelected = language === currentLanguage;

                  return (
                    <button
                      key={language}
                      ref={(element) => {
                        optionRefs.current[index] = element;
                      }}
                      id={`${listboxId}-option-${index}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      tabIndex={focusedIndex === index ? 0 : -1}
                      onClick={() => void handleSelect(language)}
                      onKeyDown={(event) => handleOptionKeyDown(event, index)}
                      className={`flex w-full items-center px-3 py-2 text-left text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 ${isSelected ? "rounded-md bg-slate-900 text-white font-bold dark:bg-white dark:text-slate-900 cursor-pointer" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-slate-100 cursor-pointer"}`}
                    >
                      <span className="font-semibold">
                        {getLanguageLabel(language, t)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};

export default LanguageSwitcherButton;
