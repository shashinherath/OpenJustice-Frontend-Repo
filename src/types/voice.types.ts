export interface VoiceState {
  isRecording: boolean;
  isPlaying: boolean;
  audioBlob: Blob | null;
  transcript: string;
}
