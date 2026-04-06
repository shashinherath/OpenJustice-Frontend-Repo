import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useChatStore } from "@/stores/chatStore";

const AnswerPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { chatId = "" } = useParams<{ chatId: string }>();
  const [question, setQuestion] = useState("");

  const { sidebarChats, chatMessagesById, sendMessageToChat } = useChatStore();

  const chat = sidebarChats.find((item) => item.id === chatId);
  const messages = chatMessagesById[chatId] || [];

  const createdAtLabel = useMemo(() => {
    const firstMessage = messages[0];
    if (!firstMessage) {
      return t("justNow");
    }
    return firstMessage.timestamp.toLocaleString();
  }, [messages, t]);

  const handleSend = () => {
    if (!chatId || !question.trim()) {
      return;
    }
    sendMessageToChat(chatId, question.trim());
    setQuestion("");
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  if (!chat) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">{t("chatNotFound")}</h2>
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
          <h1 className="truncate text-lg font-bold text-slate-900 dark:text-white">{chat.title}</h1>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{t("startedAt", { value: createdAtLabel })}</p>
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
            className={`max-w-[88%] rounded-xl px-4 py-3 text-sm shadow-sm ${
              message.sender === "user"
                ? "ml-auto bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "mr-auto border border-slate-200 bg-white text-slate-700 dark:border-border-dark dark:bg-surface-dark dark:text-slate-200"
            }`}
          >
            <p className="whitespace-pre-wrap leading-6">{message.content}</p>
            <p
              className={`mt-2 text-[10px] font-semibold uppercase tracking-wide ${
                message.sender === "user" ? "text-slate-300 dark:text-slate-600" : "text-slate-400"
              }`}
            >
              {message.sender === "user" ? t("you") : t("openJusticeAi")}
            </p>
          </div>
        ))}
      </div>

      <footer className="border-t border-slate-200 bg-white px-4 py-4 dark:border-border-dark dark:bg-brand-bg shrink-0">
        <div className="mx-auto flex w-full max-w-4xl items-center gap-2">
          <input
            className="h-12 flex-1 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-slate-400 dark:border-border-dark dark:bg-surface-dark dark:text-white"
            placeholder={t("followUpQuestionPlaceholder")}
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: "var(--oj-accent-color)" }}
            type="button"
            onClick={handleSend}
            disabled={!question.trim()}
          >
            <span className="material-symbols-outlined text-[22px]">arrow_upward</span>
          </button>
        </div>
      </footer>
    </>
  );
};

export default AnswerPage;
