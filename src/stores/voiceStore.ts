import { create } from "zustand";

interface VoiceStore {
  isRecording: boolean;
  isPlaying: boolean;
  audioBlob: Blob | null;
  transcript: string;
  
  startRecording: () => void;
  stopRecording: () => void;
  setAudioBlob: (blob: Blob) => void;
  setTranscript: (text: string) => void;
  reset: () => void;
}

export const useVoiceStore = create<VoiceStore>((set) => ({
  isRecording: false,
  isPlaying: false,
  audioBlob: null,
  transcript: "",
  
  startRecording: () => set({ isRecording: true }),
  stopRecording: () => set({ isRecording: false }),
  setAudioBlob: (blob) => set({ audioBlob: blob }),
  setTranscript: (text) => set({ transcript: text }),
  reset: () => set({ 
    isRecording: false, 
    isPlaying: false, 
    audioBlob: null, 
    transcript: "" 
  })
}));
