import { create } from "zustand";

interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
}

interface VoiceStore {
  recordingState: RecordingState;
  audioBlob: Blob | null;
  transcript: string;
  
  setRecordingState: (state: Partial<RecordingState>) => void;
  setAudioBlob: (blob: Blob | null) => void;
  setTranscript: (text: string) => void;
  reset: () => void;
}

export const useVoiceStore = create<VoiceStore>((set) => ({
  recordingState: {
    isRecording: false,
    isPaused: false,
    duration: 0,
  },
  audioBlob: null,
  transcript: "",
  
  setRecordingState: (state) =>
    set((prevState) => ({
      recordingState: { ...prevState.recordingState, ...state },
    })),
  setAudioBlob: (blob) => set({ audioBlob: blob }),
  setTranscript: (text) => set({ transcript: text }),
  reset: () =>
    set({
      recordingState: {
        isRecording: false,
        isPaused: false,
        duration: 0,
      },
      audioBlob: null,
      transcript: "",
    }),
}));
