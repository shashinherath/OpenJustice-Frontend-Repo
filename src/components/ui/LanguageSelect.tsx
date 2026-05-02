import React, { useEffect, useMemo, useRef, useState } from "react";

type Option = { value: string; label: string };

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
  ariaLabel?: string;
}

const LanguageSelect: React.FC<Props> = ({ value, onChange, options, className = "", ariaLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? options[0],
    [options, value],
  );

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(previous => !previous)}
        className="flex w-full min-w-32 items-center justify-between gap-2 rounded-xl border border-slate-700/70 bg-[#191919] px-3 py-2 text-left text-sm font-semibold text-slate-200 shadow-lg shadow-black/20 transition-all duration-200 hover:border-cyan-400/20 hover:bg-[#202020] focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
      >
        <span className="truncate">{selectedOption?.label ?? value}</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-200 transition-transform duration-200">
          <svg className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-44 overflow-hidden rounded-2xl border border-slate-700/70 bg-[#191919] p-1.5 shadow-2xl shadow-black/40 ring-1 ring-white/5 backdrop-blur-xl">
          <div className="max-h-56 overflow-auto pr-1">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-all duration-150 ${isSelected
                    ? "bg-cyan-400/10 text-slate-100 ring-1 ring-cyan-300/20"
                    : "text-slate-300 hover:bg-white/5 hover:text-slate-100"
                    }`}
                >
                  <span className="font-semibold">{option.label}</span>
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${isSelected ? "border-cyan-300/30 bg-cyan-400/10 text-slate-100" : "border-white/10 bg-white/5 text-slate-500"}`}>
                    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M7.5 10.5l2 2 4-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
