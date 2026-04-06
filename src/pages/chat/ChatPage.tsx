import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "@/contexts/LanguageContext";
import { useChatStore } from "@/stores/chatStore";
import { useVoiceStore } from "@/stores/voiceStore";
import { useVoiceRecording } from "@/hooks/useVoiceRecording";
import VoiceRecordingUI from "@/components/ui/VoiceRecordingUI";
import { SUPPORTED_LANGUAGES, type AppLanguage } from "@/constants/languages";

const ChatPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const languageContext = useContext(LanguageContext);
    const [question, setQuestion] = useState("");
    const [isVoicePreview, setIsVoicePreview] = useState(false);
    const { createNewChat, sendMessageToChat } = useChatStore();
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
    const currentLanguage = (languageContext?.currentLanguage || "en").toLowerCase() as AppLanguage;
    const availableLanguages = languageContext?.availableLanguages || SUPPORTED_LANGUAGES;
    const languageLabelMap: Record<string, string> = {
        en: t("langEnglish"),
        si: t("langSinhala"),
        ta: t("langTamil"),
    };

    const handleLanguageChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const nextLanguage = event.target.value as AppLanguage;
        if (languageContext?.changeLanguage) {
            void languageContext.changeLanguage(nextLanguage);
        }
    };

    const handleSubmitQuestion = () => {
        const text = question.trim();
        if (!text) {
            return;
        }

        const chatId = createNewChat();
        sendMessageToChat(chatId, text);
        setQuestion("");
        navigate(`/chat/${chatId}`);
    };

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmitQuestion();
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
        void audio.play();
        audio.onended = () => URL.revokeObjectURL(url);
    };

    const handleSendVoice = () => {
        if (!audioBlob) {
            return;
        }

        const voiceMessage = `[Voice message ${(audioBlob.size / 1024).toFixed(1)}KB]`;
        const chatId = createNewChat();
        sendMessageToChat(chatId, voiceMessage);
        reset();
        setIsVoicePreview(false);
        navigate(`/chat/${chatId}`);
    };
    
    return (
        <>
            <header className="flex items-center justify-between px-8 py-4 border-b border-slate-200 dark:border-border-dark bg-white dark:bg-brand-bg shrink-0">
                <div className="flex items-center gap-6">
                    <nav className="flex items-center gap-6">
                        <a className="text-sm font-semibold border-b-2 border-slate-900 dark:border-white py-1 text-slate-900 dark:text-white" href="#">Research</a>
                        <a className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors" href="#">Documents</a>
                        <a className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors" href="#">Archive</a>
                    </nav>
                </div>
                <div className="flex gap-3 h-full items-center">
                    <div className="relative flex items-center h-full gap-2 bg-slate-50 dark:bg-surface-dark px-3 py-1.5 rounded-lg border border-slate-200 dark:border-border-dark">
                        <span className="material-symbols-outlined text-[18px] text-slate-500">language</span>
                        <select
                            className="appearance-none bg-transparent pr-5 text-sm font-semibold tracking-tight text-slate-900 outline-none dark:text-slate-100"
                            value={currentLanguage}
                            onChange={handleLanguageChange}
                            aria-label={t("selectLanguage")}
                        >
                            {availableLanguages.map((language) => (
                                <option key={language} value={language} className="bg-white text-slate-900">
                                    {languageLabelMap[language] || language.toUpperCase()}
                                </option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined pointer-events-none absolute right-2 text-[14px] text-slate-500">expand_more</span>
                    </div>
                </div>
            </header>
            
            <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-4xl mx-auto w-full">
                <div className="w-full text-center mb-8">
                    <h2 className="text-slate-900 dark:text-white text-[36px] font-bold leading-tight tracking-tight mb-2">
                        {t("chatResearchHeading")}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">
                        {t("chatResearchSubheading")}
                    </p>
                </div>
                
                <div className="w-full max-w-3xl">
                    <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mr-1">{t("suggestions")}</span>
                        <button className="flex h-8 items-center justify-center gap-1.5 rounded-full border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-[#2d2d2d] transition-all px-4 group">
                            <span className="material-symbols-outlined text-[16px] text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">balance</span>
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100">{t("rights")}</span>
                        </button>
                        <button className="flex h-8 items-center justify-center gap-1.5 rounded-full border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-[#2d2d2d] transition-all px-4 group">
                            <span className="material-symbols-outlined text-[16px] text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">checklist</span>
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100">{t("procedures")}</span>
                        </button>
                        <button className="flex h-8 items-center justify-center gap-1.5 rounded-full border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-[#2d2d2d] transition-all px-4 group">
                            <span className="material-symbols-outlined text-[16px] text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">menu_book</span>
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100">{t("commonDefinitions")}</span>
                        </button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
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
                            <div className="relative flex-1 flex items-center bg-white dark:bg-surface-dark rounded-full border border-slate-200 dark:border-border-dark shadow-xl px-4 py-1.5 focus-within:ring-2 focus-within:ring-slate-200 dark:focus-within:ring-slate-700 transition-all w-full">
                                <button className="flex items-center justify-center size-10 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors shrink-0" title={t("attachDocument")}>
                                    <span className="material-symbols-outlined">attach_file</span>
                                </button>
                                <input 
                                    className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-slate-900 dark:text-white text-base px-2 placeholder:text-slate-400 dark:placeholder:text-slate-600 min-w-0" 
                                    placeholder={t("queryPlaceholder")} 
                                    type="text"
                                    value={question}
                                    onChange={(event) => setQuestion(event.target.value)}
                                    onKeyDown={handleInputKeyDown}
                                />
                                <button 
                                    className="flex items-center justify-center size-10 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors shrink-0 rounded-lg"
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
                                className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full font-bold text-white transition-all shadow-lg shrink-0 mt-3 md:mt-0 disabled:cursor-not-allowed"
                                style={{ backgroundColor: "var(--oj-accent-color)" }}
                                type="button"
                                onClick={handleSubmitQuestion}
                                disabled={!question.trim()}
                            >
                                <span className="material-symbols-outlined text-[28px]">arrow_forward</span>
                            </button>
                        )}
                    </div>
                    
                    <div className="mt-8 text-center">
                        <p className="text-slate-400 dark:text-slate-500 text-[11px] flex items-center justify-center gap-1 uppercase tracking-wider font-semibold">
                            <span className="material-symbols-outlined text-[14px]">info</span>
                            {t("aiVerificationNotice")}
                        </p>
                    </div>
                </div>
            </div>
            
            <footer className="p-6 text-center text-slate-500 dark:text-slate-600 text-[11px] uppercase tracking-widest font-bold shrink-0">
                {t("copyright")}
            </footer>


        </>
    );
};

export default ChatPage;
