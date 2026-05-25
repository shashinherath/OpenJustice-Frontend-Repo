import React, { useEffect, useId, useMemo, useRef, useState } from "react";

type Option = { value: string; label: string };

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
  ariaLabel?: string;
}

const LanguageSelect: React.FC<Props> = ({
  value,
  onChange,
  options,
  className = "",
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const uid = useId();
  const listboxId = `${uid}-listbox`;
  const getOptionId = (index: number) => `${uid}-option-${index}`;
  const hasOptions = options.length > 0;

  const selectedOption = useMemo(() => {
    const matchingOption = options.find((option) => option.value === value);
    if (matchingOption) {
      return matchingOption;
    }

    return {
      value,
      label: value,
    };
  }, [options, value]);

  const selectedIndex = useMemo(
    () => options.findIndex((option) => option.value === value),
    [options, value],
  );

  const openDropdown = () => {
    if (!hasOptions) {
      return;
    }

    setIsOpen(true);
    const initialIndex = selectedIndex >= 0 ? selectedIndex : 0;
    setFocusedIndex(initialIndex);
  };

  const closeDropdown = (returnFocus = true) => {
    setIsOpen(false);
    setFocusedIndex(-1);
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
    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeDropdown(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const handleTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else {
          const next = Math.min(focusedIndex + 1, options.length - 1);
          setFocusedIndex(next);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else {
          const prev = Math.max(focusedIndex - 1, 0);
          setFocusedIndex(prev);
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
        setFocusedIndex(Math.min(index + 1, options.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex(Math.max(index - 1, 0));
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        handleSelect(options[index].value);
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

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    closeDropdown();
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={
          isOpen && focusedIndex >= 0 ? getOptionId(focusedIndex) : undefined
        }
        onClick={() => (isOpen ? closeDropdown() : openDropdown())}
        onKeyDown={handleTriggerKeyDown}
        className="flex w-full min-w-32 items-center justify-between gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-800 shadow-lg shadow-black/10 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 dark:border-slate-700/70 dark:bg-brand-bg dark:text-slate-200 dark:shadow-black/20 dark:hover:border-cyan-400/20 dark:hover:bg-[#202020]"
      >
        <span className="truncate">{selectedOption?.label ?? value}</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-600 transition-transform duration-200 dark:border-white/10 dark:bg-white/5 dark:text-cyan-200">
          <svg
            className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden={true}
          >
            <path
              d="M6 8l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 top-full z-50 mt-2 w-full min-w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl shadow-black/20 ring-1 ring-black/5 backdrop-blur-xl dark:border-slate-700/70 dark:bg-brand-bg dark:shadow-black/40 dark:ring-white/5"
        >
          <div className="max-h-56 overflow-auto pr-1">
            {options.map((option, index) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  id={getOptionId(index)}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={focusedIndex === index ? 0 : -1}
                  onClick={() => handleSelect(option.value)}
                  onKeyDown={(e) => handleOptionKeyDown(e, index)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 ${
                    isSelected
                      ? "rounded-md bg-white text-slate-900 ring-1 ring-cyan-300/20 dark:bg-white dark:text-slate-900"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-slate-100"
                  }`}
                >
                  <span className="font-semibold">{option.label}</span>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${isSelected ? "border-cyan-300/30 bg-white text-slate-900 dark:bg-white dark:text-slate-900" : "border-slate-200 bg-slate-100 text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-500"}`}
                  >
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden={true}
                    >
                      <path
                        d="M7.5 10.5l2 2 4-5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
