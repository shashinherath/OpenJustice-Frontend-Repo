import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useChatStore } from "@/stores/chatStore";
import { useVoiceStore } from "@/stores/voiceStore";
import { useVoiceRecording } from "@/hooks/useVoiceRecording";
import ConversationComposer from "@/components/chat/ConversationComposer";
import VoiceRecordingUI from "@/components/ui/VoiceRecordingUI";
import LanguageSwitcherButton from "@/components/ui/LanguageSwitcherButton";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import LegalLibrary from "@/components/library/LegalLibrary";
import LawyerDirectory from "@/components/lawyers/LawyerDirectory";
import DocumentAnalyzer from "@/components/analyzer/DocumentAnalyzer";

const ChatPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"library" | "research" | "lawyers" | "analyzer">(
    location.pathname === "/chat/library" 
      ? "library" 
      : location.pathname === "/chat/lawyers"
      ? "lawyers"
      : location.pathname === "/chat/analyzer"
      ? "analyzer"
      : "research"
  );
  const [question, setQuestion] = useState("");
  const [isVoicePreview, setIsVoicePreview] = useState(false);

  useEffect(() => {
    setActiveTab(
      location.pathname === "/chat/library" 
        ? "library" 
        : location.pathname === "/chat/lawyers"
        ? "lawyers"
        : location.pathname === "/chat/analyzer"
        ? "analyzer"
        : "research"
    );
  }, [location.pathname]);

  const handleTabChange = (tab: "library" | "research" | "lawyers" | "analyzer") => {
    setActiveTab(tab);
    if (tab === "library") {
      navigate("/chat/library");
    } else if (tab === "lawyers") {
      navigate("/chat/lawyers");
    } else if (tab === "analyzer") {
      navigate("/chat/analyzer");
    } else {
      navigate("/chat");
    }
  };
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
      <style>{`@keyframes gradient-shift { 0% { background-position: 0% 50%; } 100% { background-position: 300% 50%; } }`}</style>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-white/40 blur-3xl dark:bg-white/5" />
      </div>

      <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-white/40 bg-white/55 px-6 py-4 shadow-[0_8px_32px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#191919]/55 md:px-8">
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <button
              onClick={() => handleTabChange("research")}
              className={`cursor-pointer py-1 text-sm font-semibold transition-colors ${
                activeTab === "research"
                  ? "border-b-2 border-slate-900 text-slate-900 dark:border-white dark:text-white"
                  : "border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {t("chatTabResearch")}
            </button>
            <button
              onClick={() => handleTabChange("library")}
              className={`cursor-pointer py-1 text-sm font-semibold transition-colors ${
                activeTab === "library"
                  ? "border-b-2 border-slate-900 text-slate-900 dark:border-white dark:text-white"
                  : "border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {t("chatTabLibrary")}
            </button>
            <button
              onClick={() => handleTabChange("analyzer")}
              className={`cursor-pointer py-1 text-sm font-semibold transition-colors ${
                activeTab === "analyzer"
                  ? "border-b-2 border-slate-900 text-slate-900 dark:border-white dark:text-white"
                  : "border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {t("chatTabAnalyzer")}
            </button>
            <button
              onClick={() => handleTabChange("lawyers")}
              className={`cursor-pointer py-1 text-sm font-semibold transition-colors ${
                activeTab === "lawyers"
                  ? "border-b-2 border-slate-900 text-slate-900 dark:border-white dark:text-white"
                  : "border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {t("chatTabLawyers")}
            </button>
          </nav>
        </div>
        <div className="flex h-full items-center gap-3">
          <ThemeToggleButton />
          <LanguageSwitcherButton />
        </div>
      </header>

      <div className={`relative z-10 w-full flex-1 flex-col items-center ${activeTab === 'research' ? 'flex justify-center px-4 md:px-6 py-10' : 'flex min-h-0'}`}>
        {activeTab === "research" ? (
          <>
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
            <button className="group relative flex h-9 items-center justify-center rounded-full p-[1.5px] transition-all hover:-translate-y-0.5 overflow-hidden">
              <div className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_35%,#22d3ee_50%,transparent_50%,transparent_85%,#3b82f6_100%)] opacity-70 group-hover:opacity-100 dark:bg-[conic-gradient(from_0deg,transparent_0%,transparent_35%,#fbbf24_50%,transparent_50%,transparent_85%,#eab308_100%)] transition-opacity duration-300"></div>
              <div className="relative flex h-full w-full items-center justify-center gap-1.5 rounded-full bg-slate-50 px-4 dark:bg-slate-800 transition-all group-hover:bg-white dark:group-hover:bg-slate-700">
                <span className="material-symbols-outlined text-[16px] text-slate-500 transition-colors group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200">
                  balance
                </span>
                <span className="text-xs font-semibold text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100">
                  {t("rights")}
                </span>
              </div>
            </button>
            <button className="group relative flex h-9 items-center justify-center rounded-full p-[1.5px] transition-all hover:-translate-y-0.5 overflow-hidden">
              <div className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_35%,#22d3ee_50%,transparent_50%,transparent_85%,#3b82f6_100%)] opacity-70 group-hover:opacity-100 dark:bg-[conic-gradient(from_0deg,transparent_0%,transparent_35%,#fbbf24_50%,transparent_50%,transparent_85%,#eab308_100%)] transition-opacity duration-300"></div>
              <div className="relative flex h-full w-full items-center justify-center gap-1.5 rounded-full bg-slate-50 px-4 dark:bg-slate-800 transition-all group-hover:bg-white dark:group-hover:bg-slate-700">
                <span className="material-symbols-outlined text-[16px] text-slate-500 transition-colors group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200">
                  checklist
                </span>
                <span className="text-xs font-semibold text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100">
                  {t("procedures")}
                </span>
              </div>
            </button>
            <button className="group relative flex h-9 items-center justify-center rounded-full p-[1.5px] transition-all hover:-translate-y-0.5 overflow-hidden">
              <div className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_35%,#22d3ee_50%,transparent_50%,transparent_85%,#3b82f6_100%)] opacity-70 group-hover:opacity-100 dark:bg-[conic-gradient(from_0deg,transparent_0%,transparent_35%,#fbbf24_50%,transparent_50%,transparent_85%,#eab308_100%)] transition-opacity duration-300"></div>
              <div className="relative flex h-full w-full items-center justify-center gap-1.5 rounded-full bg-slate-50 px-4 dark:bg-slate-800 transition-all group-hover:bg-white dark:group-hover:bg-slate-700">
                <span className="material-symbols-outlined text-[16px] text-slate-500 transition-colors group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200">
                  menu_book
                </span>
                <span className="text-xs font-semibold text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100">
                  {t("commonDefinitions")}
                </span>
              </div>
            </button>
          </div>

          <div className="flex w-full flex-col items-center gap-3 md:flex-row">
            {recordingState.isRecording || isVoicePreview ? (
              <VoiceRecordingUI
                durationLabel={formatDuration(recordingState.duration)}
                voiceLevel={voiceLevel}
                isPaused={isPaused}
                isPreview={isVoicePreview}
                isActive={recordingState.isRecording && !isPaused}
                onPauseResume={handlePauseResumeVoice}
                onStop={handleStopVoice}
                onPlay={handlePlayVoice}
                onCancel={handleCancelVoice}
              />
            ) : (
              <ConversationComposer
                value={question}
                placeholder={t("queryPlaceholder")}
                attachTitle={t("attachDocument")}
                micTitle={t("voiceInput")}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={handleInputKeyDown}
                onMicClick={handleMicClick}
              />
            )}
            {!recordingState.isRecording && !isVoicePreview ? (
              <button
                className={`mt-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-slate-200 font-bold shadow-md transition-all md:mt-0 dark:border-white/10 dark:shadow-[0_18px_45px_rgba(15,23,42,0.18)] ${
                  !question.trim()
                    ? "cursor-not-allowed bg-slate-100 text-slate-400 shadow-none dark:bg-slate-800 dark:text-slate-600"
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
            ) : null}
            {isVoicePreview ? (
              <button
                className={`mt-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-slate-200 font-bold shadow-md transition-all md:mt-0 dark:border-white/10 dark:shadow-[0_18px_45px_rgba(15,23,42,0.18)] ${"cursor-pointer bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-black dark:hover:bg-white"}`}
                type="button"
                onClick={handleSendVoice}
              >
                <span className="material-symbols-outlined text-[28px]">
                  arrow_upward
                </span>
              </button>
            ) : null}
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
      </>
      ) : activeTab === "library" ? (
        <LegalLibrary />
      ) : activeTab === "analyzer" ? (
        <DocumentAnalyzer />
      ) : (
        <LawyerDirectory />
      )}
      </div>

      <footer className="relative z-10 shrink-0 p-6 text-center text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500">
        {t("copyright")}
      </footer>
    </div>
  );
};

export default ChatPage;
