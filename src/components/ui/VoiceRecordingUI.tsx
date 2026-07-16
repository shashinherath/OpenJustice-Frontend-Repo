import React from "react";

interface VoiceRecordingUIProps {
  durationLabel: string;
  voiceLevel: number;
  isPaused: boolean;
  isPreview: boolean;
  isActive: boolean;
  onPauseResume: () => void;
  onStop: () => void;
  onPlay: () => void;
  onCancel?: () => void;
}

const VoiceRecordingUI: React.FC<VoiceRecordingUIProps> = ({
  durationLabel,
  voiceLevel,
  isPaused,
  isPreview,
  isActive,
  onPauseResume,
  onStop,
  onPlay,
  onCancel,
}) => {
  return (
    <>
      <style>{`@keyframes gradient-shift { 0% { background-position: 0% 50%; } 100% { background-position: 300% 50%; } }`}</style>
      <div className="relative isolate flex w-full flex-1 items-center rounded-[30px] p-[1.5px] transition-all duration-300">
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-[30px] bg-[linear-gradient(90deg,rgba(34,211,238,0.95),rgba(59,130,246,0.95),rgba(168,85,247,0.9),rgba(245,158,11,0.85),rgba(34,211,238,0.95))] bg-size-[300%_100%] blur-xl transition-opacity duration-300 animate-[gradient-shift_4s_linear_infinite] ${
            isActive ? "opacity-100" : "opacity-35"
          }`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-[30px] bg-[linear-gradient(90deg,rgba(34,211,238,0.7),rgba(59,130,246,0.75),rgba(168,85,247,0.7),rgba(245,158,11,0.65),rgba(34,211,238,0.7))] bg-size-[300%_100%] transition-opacity duration-300 animate-[gradient-shift_4s_linear_infinite] ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="relative z-10 flex w-full items-center gap-2 rounded-[28px] border border-slate-200 bg-white px-3 py-2.5 shadow-[0_16px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-[#111111] dark:shadow-[0_16px_50px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => {
              const baseHeight = 8;
              const voiceHeight = (voiceLevel / 100) * (12 + i * 2);
              const animationHeight = isPaused
                ? baseHeight
                : baseHeight + voiceHeight;

              return (
                <div
                  key={i}
                  className="w-0.5 rounded-full bg-cyan-400 transition-all"
                  style={{
                    height: `${animationHeight}px`,
                  }}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 min-w-15">
            <div
              className={`size-2 rounded-full ${isPaused ? "bg-slate-400" : "animate-pulse bg-rose-500 dark:bg-rose-400"}`}
            />
            <span
              className={`font-mono text-sm font-semibold ${isPaused ? "text-slate-500" : "text-slate-900 dark:text-slate-100"}`}
            >
              {durationLabel}
            </span>
          </div>

          <div className="flex-1" />

          {!isPreview && (
            <button
              type="button"
              onClick={onPauseResume}
              className="flex size-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:text-slate-900 hover:bg-slate-100 cursor-pointer dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10"
              title={isPaused ? "Resume recording" : "Pause recording"}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isPaused ? "play_arrow" : "pause"}
              </span>
            </button>
          )}

          {!isPreview && (
            <button
              type="button"
              onClick={onStop}
              className="flex size-8 items-center justify-center rounded-full text-rose-500 transition-colors hover:bg-rose-100 hover:text-rose-700 cursor-pointer dark:text-rose-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
              title="Stop recording"
            >
              <span className="material-symbols-outlined text-[20px]">
                stop_circle
              </span>
            </button>
          )}

          {isPreview && (
            <button
              type="button"
              onClick={onPlay}
              className="flex size-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 cursor-pointer dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              title="Play recording"
            >
              <span className="material-symbols-outlined text-[20px]">
                play_circle
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={onCancel}
            className="flex size-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 cursor-pointer dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-200"
            title="Delete recording"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default VoiceRecordingUI;
