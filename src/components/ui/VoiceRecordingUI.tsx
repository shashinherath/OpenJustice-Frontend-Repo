import React from "react";

interface VoiceRecordingUIProps {
  durationLabel: string;
  voiceLevel: number;
  isPaused: boolean;
  isPreview: boolean;
  isProcessing?: boolean;
  onPauseResume: () => void;
  onStop: () => void;
  onPlay: () => void;
  onSend: () => void;
  onCancel?: () => void;
}

const VoiceRecordingUI: React.FC<VoiceRecordingUIProps> = ({
  durationLabel,
  voiceLevel,
  isPaused,
  isPreview,
  isProcessing = false,
  onPauseResume,
  onStop,
  onPlay,
  onSend,
  onCancel,
}) => {

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-surface-dark rounded-full border border-slate-200 dark:border-border-dark px-4 py-1.5 flex-1">
      {/* Animated Waveform - Responds to Voice Level */}
      <div className="flex items-center justify-center gap-1">
        {[...Array(5)].map((_, i) => {
          const baseHeight = 8;
          const voiceHeight = (voiceLevel / 100) * (12 + i * 2);
          const animationHeight = isPaused ? baseHeight : baseHeight + voiceHeight;

          return (
            <div
              key={i}
              className="w-0.5 rounded-full bg-red-500 transition-all"
              style={{
                height: `${animationHeight}px`,
              }}
            />
          );
        })}
      </div>

      {/* Recording Indicator */}
      <div className="flex items-center gap-1.5 min-w-15">
        <div className={`size-2 rounded-full ${isPaused ? "bg-slate-400" : "animate-pulse bg-red-500"}`} />
        <span className={`font-mono font-semibold text-sm ${isPaused ? "text-slate-500" : "text-red-500"}`}>
          {durationLabel}
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {!isPreview && (
        <button
          type="button"
          onClick={onPauseResume}
          className="flex items-center justify-center size-8 rounded-full text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors"
          title={isPaused ? "Resume recording" : "Pause recording"}
        >
          <span className="material-symbols-outlined text-[20px]">{isPaused ? "play_arrow" : "pause"}</span>
        </button>
      )}

      {!isPreview && (
        <button
          type="button"
          onClick={onStop}
          className="flex items-center justify-center size-8 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          title="Stop recording"
        >
          <span className="material-symbols-outlined text-[20px]">stop_circle</span>
        </button>
      )}

      {isPreview && (
        <button
          type="button"
          onClick={onPlay}
          className="flex items-center justify-center size-8 rounded-full text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors"
          title="Play recording"
        >
          <span className="material-symbols-outlined text-[20px]">play_circle</span>
        </button>
      )}

      {/* Delete Button */}
      <button
        type="button"
        onClick={onCancel}
        className="flex items-center justify-center size-8 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors"
        title="Delete recording"
      >
        <span className="material-symbols-outlined text-[20px]">close</span>
      </button>

      {/* Send Button */}
      <button
        type="button"
        onClick={onSend}
        disabled={isProcessing}
        className="flex items-center justify-center size-8 rounded-full text-white transition-colors disabled:opacity-50"
        style={{ backgroundColor: "var(--oj-accent-color)" }}
        title="Send voice message"
      >
        <span className="material-symbols-outlined text-[20px]">{isProcessing ? "hourglass_empty" : "send"}</span>
      </button>
    </div>
  );
};

export default VoiceRecordingUI;
