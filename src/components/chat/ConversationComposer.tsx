import React, { useEffect, useRef, useState } from "react";

interface ConversationComposerProps {
  value: string;
  placeholder: string;
  attachTitle: string;
  micTitle: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onMicClick: () => void;
  onAttachClick?: () => void;
  attachDisabled?: boolean;
}

const ConversationComposer: React.FC<ConversationComposerProps> = ({
  value,
  placeholder,
  attachTitle,
  micTitle,
  onChange,
  onKeyDown,
  onMicClick,
  onAttachClick,
  attachDisabled = false,
}) => {
  const TYPING_GLOW_IDLE_MS = 1000;
  const [isTypingActive, setIsTypingActive] = useState(false);
  const typingGlowTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (typingGlowTimeoutRef.current !== null) {
        window.clearTimeout(typingGlowTimeoutRef.current);
      }
    };
  }, []);

  const handleTypingActivity: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (typingGlowTimeoutRef.current !== null) {
      window.clearTimeout(typingGlowTimeoutRef.current);
    }

    setIsTypingActive(true);
    typingGlowTimeoutRef.current = window.setTimeout(() => {
      setIsTypingActive(false);
    }, TYPING_GLOW_IDLE_MS);

    onKeyDown(event);
  };

  return (
    <>
      <style>{`@keyframes gradient-shift { 0% { background-position: 0% 50%; } 100% { background-position: 300% 50%; } }`}</style>
      <div className="relative isolate flex w-full min-w-0 flex-1 items-center rounded-[30px] p-[1.5px] transition-all duration-300">
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-[30px] bg-[linear-gradient(90deg,rgba(34,211,238,0.95),rgba(59,130,246,0.95),rgba(168,85,247,0.9),rgba(245,158,11,0.85),rgba(34,211,238,0.95))] bg-size-[300%_100%] blur-xl transition-opacity duration-300 animate-[gradient-shift_4s_linear_infinite] ${
            isTypingActive ? "opacity-100" : "opacity-35"
          }`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-[30px] bg-[linear-gradient(90deg,rgba(34,211,238,0.7),rgba(59,130,246,0.75),rgba(168,85,247,0.7),rgba(245,158,11,0.65),rgba(34,211,238,0.7))] bg-size-[300%_100%] transition-opacity duration-300 animate-[gradient-shift_4s_linear_infinite] ${
            isTypingActive ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="relative z-10 flex w-full min-w-0 items-center gap-1 rounded-[28px] border border-slate-200 bg-white px-3 py-2.5 shadow-[0_16px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-[#111111] dark:shadow-[0_16px_50px_rgba(0,0,0,0.45)]">
          <button
            className="flex size-10 shrink-0 items-center justify-center text-slate-400 transition-colors hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-300 dark:hover:text-white"
            title={attachTitle}
            type="button"
            onClick={onAttachClick}
            disabled={attachDisabled}
          >
            <span className="material-symbols-outlined text-[22px]">add</span>
          </button>
          <input
            className="min-w-0 flex-1 border-none bg-transparent px-2 text-[15px] font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0 dark:text-white dark:placeholder:text-slate-400"
            placeholder={placeholder}
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={handleTypingActivity}
          />
          <button
            className={`flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-all duration-300 border-slate-200 bg-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white dark:hover:bg-slate-900`}
            title={micTitle}
            onClick={onMicClick}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">mic</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ConversationComposer;
