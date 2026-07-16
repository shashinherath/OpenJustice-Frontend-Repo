import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useChatStore } from "../../stores/chatStore";
import type { SidebarChatItem } from "../../stores/chatStore";
import type { ChatMessage } from "../../types/chat.types";
import { useVoiceStore } from "@/stores/voiceStore";
import { useVoiceRecording } from "@/hooks/useVoiceRecording";
import ConversationComposer from "@/components/chat/ConversationComposer";
import VoiceRecordingUI from "@/components/ui/VoiceRecordingUI";
import VoiceMessagePlayer from "@/components/ui/VoiceMessagePlayer";
import MarkdownText from "@/components/common/MarkdownText";
import BrandLogo from "@/components/ui/BrandLogo";

const AnswerPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { chatId = "" } = useParams<{ chatId: string }>();
  const [question, setQuestion] = useState("");
  const [isVoicePreview, setIsVoicePreview] = useState(false);

  const {
    sidebarChats,
    chatMessagesById,
    isTyping,
    sendMessageToChat,
    sendVoiceMessageToChat,
    loadConversation,
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

  const chat = sidebarChats.find((item: SidebarChatItem) => item.id === chatId);
  const messages = useMemo<ChatMessage[]>(
    () => chatMessagesById[chatId] || [],
    [chatMessagesById, chatId],
  );
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [shouldAutoScrollToBottom, setShouldAutoScrollToBottom] =
    useState(false);

  const createdAtLabel = useMemo(() => {
    const firstMessage = messages[0];
    if (!firstMessage) {
      return t("justNow");
    }
    return firstMessage.timestamp.toLocaleString();
  }, [messages, t]);

  const showTypingIndicator = isTyping && messages.length === 0;

  useEffect(() => {
    if (chatId) {
      setShouldAutoScrollToBottom(true);
      void loadConversation(chatId);
    }
  }, [chatId, loadConversation]);

  useEffect(() => {
    if (!shouldAutoScrollToBottom) {
      return;
    }

    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });

    if (!isTyping) {
      setShouldAutoScrollToBottom(false);
    }
  }, [isTyping, messages, shouldAutoScrollToBottom]);

  const handleSend = async () => {
    const trimmedQuestion = question.trim();

    if (!chatId || !trimmedQuestion) {
      return;
    }

    setQuestion("");
    setShouldAutoScrollToBottom(true);

    await sendMessageToChat(chatId, trimmedQuestion);
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

    reset();
    setIsVoicePreview(false);
    setShouldAutoScrollToBottom(true);

    await sendVoiceMessageToChat(chatId, audioBlob);
  };

  if (!chat) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center px-6 text-center">
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
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="shrink-0 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4 dark:border-border-dark dark:bg-brand-bg">
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

      <div
        ref={messagesContainerRef}
        className="min-h-0 flex-1 overflow-y-auto"
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-6">
          {showTypingIndicator ? (
            <div className="mr-auto max-w-[88%] rounded-xl border border-slate-200 bg-white p-3 px-4 text-sm text-slate-700 shadow-sm dark:border-border-dark dark:bg-surface-dark dark:text-slate-200">
              <div className="flex items-center gap-2">
                <BrandLogo containerClassName="flex items-center justify-center size-5" iconClassName="text-xl" />
                <div
                  className="flex items-center gap-1.5"
                  aria-live="polite"
                  aria-label="OpenJustice AI is typing"
                >
                  <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.25s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-current" />
                </div>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500 dark:border-border-dark dark:bg-surface-dark dark:text-slate-400">
              {t("askFirstQuestion")}
            </div>
          ) : null}

          {messages.map((message: ChatMessage) => (
            <div
              key={message.id}
              className={`max-w-[88%] rounded-xl text-sm ${
                message.sender === "user" ? "ml-auto" : "mr-auto"
              } ${
                message.audioUrl
                  ? ""
                  : `shadow-sm p-3 px-4 ${
                      message.sender === "user"
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                        : "border border-slate-200 bg-white text-slate-700 dark:border-border-dark dark:bg-surface-dark dark:text-slate-200"
                    }`
              }`}
            >
              {message.audioUrl ? (
                <VoiceMessagePlayer
                  audioUrl={message.audioUrl}
                  sender={message.sender}
                />
              ) : message.sender === "ai" ? (
                message.content.trim() ? (
                  <MarkdownText
                    className="text-inherit"
                    content={message.content}
                  />
                ) : (
                  <div className="flex items-center gap-2 py-1 text-slate-500 dark:text-slate-400">
                    <BrandLogo containerClassName="flex items-center justify-center size-5" iconClassName="text-xl" />
                    <div
                      className="flex items-center gap-1.5"
                      aria-live="polite"
                      aria-label="OpenJustice AI is typing"
                    >
                      <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.25s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-current" />
                    </div>
                  </div>
                )
              ) : (() => {
                  try {
                    const data = JSON.parse(message.content);
                    return data && data.intent === "document_analysis";
                  } catch { return false; }
                })() ? (
                (() => {
                  const data = JSON.parse(message.content);
                  const filename = data.filename || "Document";
                  const ext = data.file_extension || "pdf";
                  const docType = data.document_type || "Document";
                  const analysisType = data.analysis_type || "Analysis";
                  const isPdf = ext.toLowerCase() === 'pdf';
                  
                  return (
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      <div className="flex items-center gap-3 bg-white/10 dark:bg-black/5 p-3 rounded-lg border border-white/20 dark:border-black/10">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isPdf ? 'bg-red-500/20 text-red-200 dark:bg-red-100 dark:text-red-600' : 'bg-blue-500/20 text-blue-200 dark:bg-blue-100 dark:text-blue-600'}`}>
                          <span className="material-symbols-outlined">{isPdf ? 'picture_as_pdf' : 'description'}</span>
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="truncate text-sm font-bold text-white dark:text-slate-900">{filename}</p>
                          <p className="text-xs text-slate-300 dark:text-slate-600">{docType} • {analysisType}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <p className="whitespace-pre-wrap leading-6">
                  {message.content}
                </p>
              )}
              {!message.audioUrl && (
                <p
                  className={`mt-2 text-[10px] font-semibold uppercase tracking-wide ${
                    message.sender === "user"
                      ? "text-slate-300 dark:text-slate-600"
                      : "text-slate-400"
                  }`}
                >
                  {message.sender === "user" ? t("you") : t("openJusticeAi")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="shrink-0 border-t border-transparent bg-transparent px-4 py-4 dark:border-transparent dark:bg-transparent">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 md:flex-row">
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
              onKeyDown={handleKeyDown}
              onMicClick={handleMicClick}
              attachDisabled
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
              onClick={handleSend}
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
        <div className="mt-4 text-center">
          <p className="flex items-center justify-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-[14px]">info</span>
            {t("aiVerificationNotice")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AnswerPage;
