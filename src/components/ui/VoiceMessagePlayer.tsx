import React, { useState, useRef, useEffect, useMemo } from "react";
import { useAuthStore } from "@/stores/authStore";

interface VoiceMessagePlayerProps {
  audioUrl: string;
  sender: "user" | "ai";
}

const VoiceMessagePlayer: React.FC<VoiceMessagePlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const token = useAuthStore((state) => state.token);
  
  const finalAudioUrl = useMemo(() => {
    if (!audioUrl) return audioUrl;
    if (audioUrl.startsWith("blob:") || audioUrl.startsWith("data:")) return audioUrl;
    if (audioUrl.includes("?token=")) return audioUrl;
    return token ? `${audioUrl}${audioUrl.includes("?") ? "&" : "?"}token=${token}` : audioUrl;
  }, [audioUrl, token]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      if (audio.duration === Infinity || isNaN(audio.duration)) {
        audio.currentTime = 1e101;
        audio.addEventListener("timeupdate", function getDuration() {
          audio.removeEventListener("timeupdate", getDuration);
          audio.currentTime = 0;
          setDuration(audio.duration);
        });
      } else {
        setDuration(audio.duration);
      }
    };

    const setAudioTime = () => {
      if (audio.duration !== Infinity && !isNaN(audio.duration)) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      void audioRef.current.play();
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === Infinity) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="flex w-64 items-center gap-3 rounded-full p-2 px-3 pr-4 shadow-sm backdrop-blur-md relative overflow-hidden group transition-all bg-white border border-slate-200 text-slate-800 dark:bg-surface-dark dark:border-border-dark dark:text-slate-200">
      <audio
        ref={audioRef}
        src={finalAudioUrl}
      />

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="shrink-0 flex items-center justify-center size-10 rounded-full shadow-sm transition-all z-10 bg-blue-600 text-white hover:bg-blue-700"
      >
        <span className="material-symbols-outlined text-[24px]">
          {isPlaying ? "pause" : "play_arrow"}
        </span>
      </button>

      {/* Waveform / Progress */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="relative w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div 
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] font-medium text-slate-500 dark:text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default VoiceMessagePlayer;
