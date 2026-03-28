import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "@/contexts/LanguageContext";
import { useChatStore } from "@/stores/chatStore";

const ChatPage: React.FC = () => {
    const navigate = useNavigate();
    const languageContext = useContext(LanguageContext);
    const [question, setQuestion] = useState("");
    const { createNewChat, sendMessageToChat } = useChatStore();
    const currentLanguage = (languageContext?.currentLanguage || "en").toLowerCase();
    const languageLabelMap: Record<string, string> = {
        en: "English",
        si: "Sinhala",
        ta: "Tamil",
    };
    const selectedLanguageLabel = languageLabelMap[currentLanguage] || "English";

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
                    <div className="flex items-center h-full gap-2 bg-slate-50 dark:bg-surface-dark px-3 py-1.5 rounded-lg border border-slate-200 dark:border-border-dark">
                        <span className="material-symbols-outlined text-[18px] text-slate-500">language</span>
                        <span className="text-xs font-bold tracking-tight text-slate-900 dark:text-white">{selectedLanguageLabel}</span>
                    </div>
                </div>
            </header>
            
            <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-4xl mx-auto w-full">
                <div className="w-full text-center mb-8">
                    <h2 className="text-slate-900 dark:text-white text-[36px] font-bold leading-tight tracking-tight mb-2">
                        How can we help with your legal research?
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">
                        Ask a question to start your legal analysis.
                    </p>
                </div>
                
                <div className="w-full max-w-3xl">
                    <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mr-1">Suggestions:</span>
                        <button className="flex h-8 items-center justify-center gap-1.5 rounded-full border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-[#2d2d2d] transition-all px-4 group">
                            <span className="material-symbols-outlined text-[16px] text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">balance</span>
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100">Rights</span>
                        </button>
                        <button className="flex h-8 items-center justify-center gap-1.5 rounded-full border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-[#2d2d2d] transition-all px-4 group">
                            <span className="material-symbols-outlined text-[16px] text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">checklist</span>
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100">Procedures</span>
                        </button>
                        <button className="flex h-8 items-center justify-center gap-1.5 rounded-full border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-[#2d2d2d] transition-all px-4 group">
                            <span className="material-symbols-outlined text-[16px] text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">menu_book</span>
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100">Definitions</span>
                        </button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
                        <div className="relative flex-1 flex items-center bg-white dark:bg-surface-dark rounded-full border border-slate-200 dark:border-border-dark shadow-xl px-4 py-1.5 focus-within:ring-2 focus-within:ring-slate-200 dark:focus-within:ring-slate-700 transition-all w-full">
                            <button className="flex items-center justify-center size-10 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors shrink-0" title="Attach Document">
                                <span className="material-symbols-outlined">attach_file</span>
                            </button>
                            <input 
                                className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-slate-900 dark:text-white text-base px-2 placeholder:text-slate-400 dark:placeholder:text-slate-600 min-w-0" 
                                placeholder="Type your legal query or research question here..." 
                                type="text"
                                value={question}
                                onChange={(event) => setQuestion(event.target.value)}
                                onKeyDown={handleInputKeyDown}
                            />
                            <button className="flex items-center justify-center size-10 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors shrink-0" title="Voice Input">
                                <span className="material-symbols-outlined">mic</span>
                            </button>
                        </div>
                        <button
                            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full font-bold text-white transition-all shadow-lg shrink-0 mt-3 md:mt-0 disabled:cursor-not-allowed"
                            style={{ backgroundColor: "var(--oj-accent-color)" }}
                            type="button"
                            onClick={handleSubmitQuestion}
                            disabled={!question.trim()}
                        >
                            <span className="material-symbols-outlined text-[28px]">arrow_forward</span>
                        </button>
                    </div>
                    
                    <div className="mt-8 text-center">
                        <p className="text-slate-400 dark:text-slate-500 text-[11px] flex items-center justify-center gap-1 uppercase tracking-wider font-semibold">
                            <span className="material-symbols-outlined text-[14px]">info</span>
                            AI verification required by professional counsel
                        </p>
                    </div>
                </div>
            </div>
            
            <footer className="p-6 text-center text-slate-500 dark:text-slate-600 text-[11px] uppercase tracking-widest font-bold shrink-0">
                OpenJustice © 2026. All rights reserved.
            </footer>
        </>
    );
};

export default ChatPage;
