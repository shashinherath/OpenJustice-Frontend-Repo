import React, { useState, useRef, useEffect, useMemo } from "react";
import BrandLogo from "@/components/ui/BrandLogo";
import { useAuthStore } from "@/stores/authStore";

interface VoiceMessagePlayerProps {
  audioUrl: string;
  sender: "user" | "ai";
}

const VoiceMessagePlayer: React.FC<VoiceMessagePlayerProps> = ({ audioUrl, sender }) => {
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

  const isUser = sender === "user";

  return (
    <div className={`flex items-center gap-3 ${isUser ? "flex-row" : "flex-row-reverse"}`}>
      {/* The "Box" part */}
      <div className="flex-1 flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-800 dark:bg-slate-900 min-w-[240px] md:min-w-[300px] text-white">
        <audio ref={audioRef} src={finalAudioUrl} preload="metadata" />
        
        <button 
          onClick={togglePlay}
          className="flex items-center justify-center size-8 rounded-full shrink-0 transition-all active:scale-90 hover:bg-white/10 text-white"
        >
          <span className="material-symbols-outlined text-[24px]">
            {isPlaying ? "pause" : "play_arrow"}
          </span>
        </button>

        <div className="flex-1 flex flex-col gap-1">
          <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
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
          <div className="flex justify-between items-center text-[10px] font-medium text-white/50">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Avatar outside the box on the right (if isUser) */}
      <div className="shrink-0 flex items-center justify-center size-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden relative border-2 border-white/10 shadow-sm">
        {isUser ? (
          <div className="absolute inset-0 bg-slate-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px] text-white">person</span>
          </div>
        ) : (
          <div className="absolute inset-0 bg-blue-100 flex items-center justify-center text-blue-600">
            <BrandLogo containerClassName="flex items-center justify-center w-full h-full" iconClassName="text-xl" imageClassName="h-full w-full object-cover scale-[1.15]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceMessagePlayer;
