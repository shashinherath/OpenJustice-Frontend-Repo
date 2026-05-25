import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useChatStore } from "@/stores/chatStore";
import { useVoiceStore } from "@/stores/voiceStore";
import { useVoiceRecording } from "@/hooks/useVoiceRecording";
import VoiceRecordingUI from "@/components/ui/VoiceRecordingUI";
import LanguageSwitcherButton from "@/components/ui/LanguageSwitcherButton";

const ChatPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [isVoicePreview, setIsVoicePreview] = useState(false);
  const {
    createNewChat,
    sendMessageToChat,
    loadConversations,
    sendVoiceMessageToChat,
  } = useChatStore();
  const { recordingState, audioBlob, reset } = useVoiceStore();
  const {
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    cancelRecording,
    formatDuration,
    voiceLevel,
    isPaused,
  } = useVoiceRecording();

  useEffect(() => {
    void loadConversations();
  }, [loadConversations]);

  const handleSubmitQuestion = async () => {
    const text = question.trim();
    if (!text) {
      return;
    }

    const chatId = await createNewChat(text);
    setQuestion("");
    navigate(`/chat/${chatId}`);
    void sendMessageToChat(chatId, text);
  };

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      void handleSubmitQuestion();
    }
  };

  const handleMicClick = async () => {
    setIsVoicePreview(false);
    await startRecording();
  };

  const handlePauseResumeVoice = () => {
    if (isPaused) {
      resumeRecording();
      return;
    }
    pauseRecording();
  };

  const handleStopVoice = async () => {
    await stopRecording();
    setIsVoicePreview(true);
  };

  const handleCancelVoice = () => {
    cancelRecording();
    setIsVoicePreview(false);
  };

  const handlePlayVoice = () => {
    if (!audioBlob) {
      return;
    }

    const url = URL.createObjectURL(audioBlob);
    const audio = new Audio(url);
    audio.onended = () => URL.revokeObjectURL(url);
    void audio.play();
  };

  const handleSendVoice = async () => {
    if (!audioBlob) {
      return;
    }

    const chatId = await createNewChat("Voice Message");
    // Navigate immediately to the conversation, then upload/process voice in background
    reset();
    setIsVoicePreview(false);
    navigate(`/chat/${chatId}`);
    void sendVoiceMessageToChat(chatId, audioBlob);
  };

  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-white/40 blur-3xl dark:bg-white/5" />
      </div>

      <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-white/40 bg-white/55 px-6 py-4 shadow-[0_8px_32px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#191919]/55 md:px-8">
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <a
              className="border-b-2 border-slate-900 py-1 text-sm font-semibold text-slate-900 dark:border-white dark:text-white"
              href="#"
            >
              Research
            </a>
          </nav>
        </div>
        <div className="flex h-full items-center gap-3">
          <LanguageSwitcherButton />
        </div>
      </header>

      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center px-4 py-10 md:px-6">
        <div className="w-full max-w-4xl text-center mb-8">
          <h2 className="text-[36px] font-bold leading-tight tracking-tight text-slate-900 drop-shadow-sm dark:text-white">
            {t("chatResearchHeading")}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            {t("chatResearchSubheading")}
          </p>
        </div>

        <div className="w-full max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <span className="mr-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              {t("suggestions")}
            </span>
            <button className="group flex h-9 items-center justify-center gap-1.5 rounded-full border border-white/50 bg-white/55 px-4 transition-all hover:-translate-y-0.5 hover:bg-white/75 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-xl">
              <span className="material-symbols-outlined text-[16px] text-slate-500 transition-colors group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200">
                balance
              </span>
              <span className="text-xs font-semibold text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100">
                {t("rights")}
              </span>
            </button>
            <button className="group flex h-9 items-center justify-center gap-1.5 rounded-full border border-white/50 bg-white/55 px-4 transition-all hover:-translate-y-0.5 hover:bg-white/75 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-xl">
              <span className="material-symbols-outlined text-[16px] text-slate-500 transition-colors group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200">
                checklist
              </span>
              <span className="text-xs font-semibold text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100">
                {t("procedures")}
              </span>
            </button>
            <button className="group flex h-9 items-center justify-center gap-1.5 rounded-full border border-white/50 bg-white/55 px-4 transition-all hover:-translate-y-0.5 hover:bg-white/75 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-xl">
              <span className="material-symbols-outlined text-[16px] text-slate-500 transition-colors group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200">
                menu_book
              </span>
              <span className="text-xs font-semibold text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100">
                {t("commonDefinitions")}
              </span>
            </button>
          </div>

          <div className="flex w-full flex-col items-center gap-3 md:flex-row">
            {recordingState.isRecording || isVoicePreview ? (
              <VoiceRecordingUI
                durationLabel={formatDuration(recordingState.duration)}
                voiceLevel={voiceLevel}
                isPaused={isPaused}
                isPreview={isVoicePreview}
                onPauseResume={handlePauseResumeVoice}
                onStop={handleStopVoice}
                onPlay={handlePlayVoice}
                onSend={handleSendVoice}
                onCancel={handleCancelVoice}
              />
            ) : (
              <div className="relative flex w-full flex-1 items-center rounded-full border border-white/60 bg-white/70 px-4 py-1.5 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl transition-all focus-within:ring-2 focus-within:ring-sky-200 dark:border-white/10 dark:bg-white/5 dark:focus-within:ring-slate-700">
                <button
                  className="flex size-10 shrink-0 items-center justify-center text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                  title={t("attachDocument")}
                  type="button"
                >
                  <span className="material-symbols-outlined">attach_file</span>
                </button>
                <input
                  className="min-w-0 flex-1 border-none bg-transparent px-2 text-base text-slate-900 outline-none focus:ring-0 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  placeholder={t("queryPlaceholder")}
                  type="text"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                />
                <button
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                  title={t("voiceInput")}
                  onClick={handleMicClick}
                  type="button"
                >
                  <span className="material-symbols-outlined">mic</span>
                </button>
              </div>
            )}
            {!recordingState.isRecording && !isVoicePreview && (
              <button
                className={`mt-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/40 font-bold shadow-[0_18px_45px_rgba(15,23,42,0.18)] transition-all md:mt-0 ${
                  !question.trim()
                    ? "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none dark:bg-slate-800 dark:text-slate-600"
                    : "cursor-pointer bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-black dark:hover:bg-white"
                }`}
                type="button"
                onClick={handleSubmitQuestion}
                disabled={!question.trim()}
              >
                <span className="material-symbols-outlined text-[28px]">
                  arrow_forward
                </span>
              </button>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="flex items-center justify-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-[14px]">
                info
              </span>
              {t("aiVerificationNotice")}
            </p>
          </div>
        </div>
      </div>

      <footer className="relative z-10 shrink-0 p-6 text-center text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500">
        {t("copyright")}
      </footer>
    </div>
  );
};

export default ChatPage;
