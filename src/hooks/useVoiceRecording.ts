import { useEffect, useRef, useState } from "react";
import { useVoiceStore } from "@/stores/voiceStore";

export const useVoiceRecording = () => {
  const { setRecordingState, setAudioBlob, reset } = useVoiceStore();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [voiceLevel, setVoiceLevel] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const durationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Analyze voice levels for animation
  const analyzeVoice = () => {
    if (!analyzerRef.current) return;

    const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
    analyzerRef.current.getByteFrequencyData(dataArray);

    // Calculate average volume
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    const normalizedLevel = Math.min(100, (average / 255) * 100);

    setVoiceLevel(normalizedLevel);

    if (!isPausedRef.current) {
      animationFrameRef.current = requestAnimationFrame(analyzeVoice);
    }
  };

  const startRecording = async () => {
    try {
      // Check browser support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("Browser does not support audio recording");
        return;
      }

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;
      chunksRef.current = [];
      setRecordingDuration(0);
      setVoiceLevel(0);
      setIsPaused(false);
      isPausedRef.current = false;
      setAudioBlob(null);

      // Setup audio context for voice analysis
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 256;
      analyzerRef.current = analyzer;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyzer);

      // Create MediaRecorder with fallback mime types
      let mimeType = "audio/webm;codecs=opus";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = "audio/webm";
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = "audio/mp4";
        }
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });

      // Handle recording data chunks
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      // Handle recording stop
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: mimeType });
        setAudioBlob(audioBlob);

        // Close audio context
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }

        // Stop microphone stream
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      // Start recording state
      setRecordingState({
        isRecording: true,
        isPaused: false,
        duration: 0,
      });

      // Start duration timer
      durationIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => {
          const next = prev + 1;
          setRecordingState({
            isRecording: true,
            isPaused: false,
            duration: next,
          });
          return next;
        });
      }, 1000);

      // Start voice level analysis
      animationFrameRef.current = requestAnimationFrame(analyzeVoice);
    } catch (error) {
      console.error("Error starting recording:", error);
      reset();
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      isPausedRef.current = true;
      setVoiceLevel(0);

      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      setRecordingState({
        isRecording: true,
        isPaused: true,
        duration: recordingDuration,
      });
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      isPausedRef.current = false;

      setRecordingState({
        isRecording: true,
        isPaused: false,
        duration: recordingDuration,
      });

      // Restart timer
      durationIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => {
          const next = prev + 1;
          setRecordingState({
            isRecording: true,
            isPaused: false,
            duration: next,
          });
          return next;
        });
      }, 1000);

      // Restart voice analysis
      animationFrameRef.current = requestAnimationFrame(analyzeVoice);
    }
  };

  const stopRecording = async () => {
    return new Promise<void>((resolve) => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        const mediaRecorder = mediaRecorderRef.current;

        // Set up onstop callback to resolve after data is collected
        const handleStop = () => {
          mediaRecorder.removeEventListener("stop", handleStop);
          setRecordingState({
            isRecording: false,
            isPaused: false,
            duration: recordingDuration,
          });

          if (durationIntervalRef.current) {
            clearInterval(durationIntervalRef.current);
          }

          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }

          setVoiceLevel(0);
          isPausedRef.current = false;
          resolve();
        };

        mediaRecorder.addEventListener("stop", handleStop);
        mediaRecorder.stop();
      } else {
        resolve();
      }
    });
  };

  const cancelRecording = () => {
    // Immediately stop the recorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }

    // Stop microphone stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    chunksRef.current = [];
    mediaRecorderRef.current = null;
    setRecordingDuration(0);
    setVoiceLevel(0);
    setIsPaused(false);
    isPausedRef.current = false;
    reset();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    cancelRecording,
    recordingDuration,
    voiceLevel,
    isPaused,
    formatDuration,
  };
};
