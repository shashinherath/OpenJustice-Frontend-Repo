import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useChatStore } from "@/stores/chatStore";
import { useVoiceStore } from "@/stores/voiceStore";
import { useVoiceRecording } from "@/hooks/useVoiceRecording";
import VoiceRecordingUI from "@/components/ui/VoiceRecordingUI";
import VoiceMessagePlayer from "@/components/ui/VoiceMessagePlayer";
import { blobToDataURL } from "@/utils/audioUtils";

const AnswerPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { chatId = "" } = useParams<{ chatId: string }>();
  const [question, setQuestion] = useState("");
  const [isVoicePreview, setIsVoicePreview] = useState(false);

  const { sidebarChats, chatMessagesById, sendMessageToChat } = useChatStore();
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

  const chat = sidebarChats.find((item) => item.id === chatId);
  const messages = chatMessagesById[chatId] || [];

  const createdAtLabel = useMemo(() => {
    const firstMessage = messages[0];
    if (!firstMessage) {
      return t("justNow");
    }
    return firstMessage.timestamp.toLocaleString();
  }, [messages, t]);

  useEffect(() => {
    if (chatId) {
      void loadConversation(chatId);
    }
  }, [chatId, loadConversation]);

  const handleSend = async () => {
    if (!chatId || !question.trim()) {
      return;
    }
    await sendMessageToChat(chatId, question.trim());
    setQuestion("");
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      void handleSend();
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
    let isCleanedUp = false;

    const cleanup = () => {
      if (isCleanedUp) {
        return;
      }
      isCleanedUp = true;
      audio.onended = null;
      audio.onerror = null;
      URL.revokeObjectURL(url);
    };

    audio.onended = cleanup;
    audio.onerror = cleanup;

    void audio.play().catch(() => {
      cleanup();
    });
  };

  const handleSendVoice = async () => {
    if (!audioBlob) {
      return;
    }

    try {
      const audioUrl = await blobToDataURL(audioBlob);
      const voiceMessage = "Voice Message";
      sendMessageToChat(chatId, voiceMessage, audioUrl);
      reset();
      setIsVoicePreview(false);
    } catch (error) {
      console.error("Failed to convert audio to data URL:", error);
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
    let isCleanedUp = false;

    const cleanup = () => {
      if (isCleanedUp) {
        return;
      }
      isCleanedUp = true;
      audio.onended = null;
      audio.onerror = null;
      URL.revokeObjectURL(url);
    };

    audio.onended = cleanup;
    audio.onerror = cleanup;

    void audio.play().catch(() => {
      cleanup();
    });
  };

  const handleSendVoice = async () => {
    if (!audioBlob) {
      return;
    }

    try {
      const audioUrl = await blobToDataURL(audioBlob);
      const voiceMessage = "Voice Message";
      sendMessageToChat(chatId, voiceMessage, audioUrl);
      reset();
      setIsVoicePreview(false);
    } catch (error) {
      console.error("Failed to convert audio to data URL:", error);
    }
  };

  if (!chat) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
          {t("chatNotFound")}
        </h2>
        <p className="mb-6 max-w-md text-sm text-slate-500 dark:text-slate-400">
          {t("chatNotFoundDescription")}
        </p>
        <button
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--oj-accent-color)" }}
          type="button"
          onClick={() => navigate("/chat")}
        >
          {t("goToChatHome")}
        </button>
      </div>
    );
  }

  return (
    <>
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4 dark:border-border-dark dark:bg-brand-bg shrink-0">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-slate-900 dark:text-white">
            {chat.title}
          </h1>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {t("startedAt", { value: createdAtLabel })}
          </p>
        </div>
        <button
          className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 dark:border-border-dark dark:text-slate-300 dark:hover:bg-surface-dark"
          type="button"
          onClick={() => navigate("/chat")}
        >
          {t("back")}
        </button>
      </header>

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 overflow-y-auto px-4 py-6">
        {messages.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500 dark:border-border-dark dark:bg-surface-dark dark:text-slate-400">
            {t("askFirstQuestion")}
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[88%] rounded-xl text-sm ${
              message.sender === "user"
                ? "ml-auto"
                : "mr-auto"
            } ${message.audioUrl ? "" : `shadow-sm p-3 px-4 ${
              message.sender === "user"
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "border border-slate-200 bg-white text-slate-700 dark:border-border-dark dark:bg-surface-dark dark:text-slate-200"
            }`}`}
          >
            {message.audioUrl ? (
              <VoiceMessagePlayer audioUrl={message.audioUrl} sender={message.sender} />
            ) : (
              <p className="whitespace-pre-wrap leading-6">{message.content}</p>
            )}
            {!message.audioUrl && (
              <p
                className={`mt-2 text-[10px] font-semibold uppercase tracking-wide ${
                  message.sender === "user" ? "text-slate-300 dark:text-slate-600" : "text-slate-400"
                }`}
              >
                {message.sender === "user" ? t("you") : t("openJusticeAi")}
              </p>
            )}
          </div>
        ))}
      </div>

      <footer className="border-t border-slate-200 bg-white px-4 py-4 dark:border-border-dark dark:bg-brand-bg shrink-0">
        <div className="mx-auto flex w-full max-w-4xl items-center gap-3">
          <button
            className="flex items-center justify-center size-10 text-slate-400 transition-colors shrink-0 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-500"
            title={t("attachDocument")}
            type="button"
            disabled
          >
            <span className="material-symbols-outlined text-[20px]">attach_file</span>
          </button>
          {(recordingState.isRecording || isVoicePreview) ? (
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
            <>
              <div className="relative flex-1 flex items-center bg-white dark:bg-surface-dark rounded-full border border-slate-200 dark:border-border-dark shadow-md px-4 py-2.5 focus-within:ring-2 focus-within:ring-slate-200 dark:focus-within:ring-slate-700 transition-all">
                <input
                  className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-slate-900 dark:text-white text-sm px-2 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  placeholder={t("queryPlaceholder")}
                  type="text"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="flex items-center justify-center size-8 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors shrink-0"
                  title={t("voiceInput")}
                  type="button"
                  onClick={handleMicClick}
                >
                  <span className="material-symbols-outlined text-[18px]">mic</span>
                </button>
              </div>
              <button
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full font-bold text-white transition-all shadow-lg shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ backgroundColor: "var(--oj-accent-color)" }}
                type="button"
                onClick={handleSend}
                disabled={!question.trim()}
              >
                <span className="material-symbols-outlined text-[24px]">arrow_upward</span>
              </button>
            </>
          )}
        </div>
      </footer>
    </>
  );
};

export default AnswerPage;
