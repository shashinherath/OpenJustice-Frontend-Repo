import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSettingsModal } from '@/hooks/common/useSettingsModal';
import { useChatStore } from '@/stores/chatStore';
import BrandLogo from '@/components/ui/BrandLogo';

interface SidebarProps {
    showBrand?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ showBrand = true }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const [activeChatMenu, setActiveChatMenu] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { openSettings, openProfile } = useSettingsModal();
    const { sidebarChats, archiveChat, deleteChat, pinChat, renameChat, setActiveConversation } = useChatStore();

    const activeChats = sidebarChats
        .filter((chat) => !chat.isArchived)
        .sort((a, b) => {
            if (a.isPinned === b.isPinned) {
                return 0;
            }
            return a.isPinned ? -1 : 1;
        });
    const selectedChatId = location.pathname.startsWith('/chat/') ? location.pathname.split('/')[2] : null;

    useEffect(() => {
        const handleClickOutside = () => {
            setActiveChatMenu(null);
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <aside className="w-64 border-r border-slate-200 dark:border-border-dark flex flex-col justify-between bg-white dark:bg-brand-bg relative shrink-0">
            <div className="flex flex-col gap-6 p-4">
                {showBrand && (
                    <Link className="flex gap-3 items-center" to="/" aria-label="Go to home page">
                        <BrandLogo containerClassName="bg-primary dark:bg-slate-200 rounded-lg size-10 flex items-center justify-center overflow-hidden" iconClassName="text-white dark:text-[#191919] scale-125" />
                        <div className="flex flex-col">
                            <h1 className="text-base font-bold leading-none text-slate-900 dark:text-white">OpenJustice</h1>
                        </div>
                    </Link>
                )}
                
                <div className="flex flex-col gap-1">
                    <button
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-black dark:hover:bg-white transition-colors mb-4"
                        type="button"
                        onClick={() => {
                            navigate('/chat');
                        }}
                    >
                        <span className="material-symbols-outlined text-[20px]" style={{ color: "var(--oj-accent-color)" }}>add</span>
                        <span className="text-sm font-medium">New Question</span>
                    </button>
                    
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">Query History</div>
                    
                    <div className="flex flex-col gap-1">
                        {activeChats.map((chat) => (
                            <div
                                key={chat.id}
                                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-colors ${
                                    selectedChatId === chat.id
                                        ? "bg-slate-100 text-slate-900 border border-slate-200 dark:bg-surface-dark dark:border-border-dark dark:text-white"
                                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-surface-dark"
                                }`}
                                onClick={() => {
                                    setActiveConversation(chat.id);
                                    navigate(`/chat/${chat.id}`);
                                }}
                            >
                                <span className="material-symbols-outlined text-[18px]">history</span>
                                <p className={`truncate pr-5 ${selectedChatId === chat.id ? "text-sm font-medium" : "text-sm font-normal"}`}>{chat.title}</p>
                                {chat.isPinned && (
                                    <span className="material-symbols-outlined text-[12px] text-amber-500" title="Pinned">keep</span>
                                )}

                                <button
                                    className="ml-auto rounded p-1 text-slate-400 opacity-0 transition-all hover:bg-slate-200 hover:text-slate-700 group-hover:opacity-100 dark:hover:bg-border-dark dark:hover:text-slate-200"
                                    type="button"
                                    aria-label="Chat item actions"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setActiveChatMenu((prev) => (prev === chat.id ? null : chat.id));
                                    }}
                                >
                                    <span className="material-symbols-outlined text-[16px]">more_horiz</span>
                                </button>

                                {activeChatMenu === chat.id && (
                                    <div
                                        className="absolute right-1 top-10 z-30 w-40 rounded-lg border border-slate-200 bg-white py-1 shadow-xl dark:border-border-dark dark:bg-surface-dark"
                                        onClick={(event) => event.stopPropagation()}
                                    >
                                        <button
                                            className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-border-dark"
                                            type="button"
                                            onClick={() => {
                                                archiveChat(chat.id);
                                                setActiveChatMenu(null);
                                            }}
                                        >
                                            <span className="material-symbols-outlined text-[14px]">archive</span>
                                            Archive
                                        </button>
                                        <button className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-border-dark" type="button">
                                            <span className="material-symbols-outlined text-[14px]">share</span>
                                            Share
                                        </button>
                                        <button
                                            className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-border-dark"
                                            type="button"
                                            onClick={() => {
                                                const nextTitle = window.prompt("Rename chat", chat.title);
                                                if (nextTitle && nextTitle.trim()) {
                                                    renameChat(chat.id, nextTitle.trim());
                                                }
                                                setActiveChatMenu(null);
                                            }}
                                        >
                                            <span className="material-symbols-outlined text-[14px]">drive_file_rename_outline</span>
                                            Rename
                                        </button>
                                        <button
                                            className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-border-dark"
                                            type="button"
                                            onClick={() => {
                                                pinChat(chat.id);
                                                setActiveChatMenu(null);
                                            }}
                                        >
                                            <span className="material-symbols-outlined text-[14px]">{chat.isPinned ? "keep_off" : "keep"}</span>
                                            {chat.isPinned ? "Unpin" : "Pin"}
                                        </button>
                                        <button
                                            className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-red-500 transition-colors hover:bg-red-500/10"
                                            type="button"
                                            onClick={() => {
                                                deleteChat(chat.id);
                                                setActiveChatMenu(null);
                                            }}
                                        >
                                            <span className="material-symbols-outlined text-[14px]">delete</span>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-border-dark">
                <div className="relative profile-menu">
                    <button 
                        className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-surface-dark transition-colors group text-slate-900 dark:text-white text-left focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-300 dark:border-slate-600 shrink-0">
                            <span className="material-symbols-outlined text-[20px] text-slate-600 dark:text-slate-300">account_circle</span>
                        </div>
                        <div className="flex flex-col items-start overflow-hidden">
                            <span className="text-sm font-semibold truncate">J. Smith</span>
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Researcher</span>
                        </div>
                        <span className="material-symbols-outlined text-[16px] ml-auto text-slate-400 dark:text-slate-500">more_vert</span>
                    </button>

                    {menuOpen && (
                        <div className="absolute bottom-full left-0 mb-2 w-56 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl py-2 z-100">
                            <div className="px-4 py-2 border-b border-slate-100 dark:border-border-dark mb-1">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Signed in as</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">jsmith@university.edu</p>
                            </div>
                            
                            <button
                                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors"
                                type="button"
                                onClick={() => {
                                    openProfile();
                                    setMenuOpen(false);
                                }}
                            >
                                <span className="material-symbols-outlined text-[18px]">person</span>
                                Profile
                            </button>

                            <button
                                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors"
                                type="button"
                                onClick={() => {
                                    openSettings();
                                    setMenuOpen(false);
                                }}
                            >
                                <span className="material-symbols-outlined text-[18px]">settings</span>
                                Settings
                            </button>
                            
                            <div 
                                className="relative help-item group/help"
                                onMouseEnter={() => setHelpOpen(true)}
                                onMouseLeave={() => setHelpOpen(false)}
                            >
                                <div className="flex items-center justify-between px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-[18px]">help_outline</span>
                                        Help
                                    </div>
                                    <span className="material-symbols-outlined text-[16px]" style={{ color: "var(--oj-accent-color)" }}>chevron_right</span>
                                </div>
                                
                                {helpOpen && (
                                    <div className="absolute left-full bottom-0 ml-1 w-48 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl py-2">
                                        <Link className="group flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors" to="/help">
                                            <span className="material-symbols-outlined text-[16px]" style={{ color: "var(--oj-accent-color)" }}>help_outline</span>
                                            <span>Help Center</span>
                                            <span className="material-symbols-outlined ml-auto text-[7px] opacity-0 transition-opacity group-hover:opacity-100" style={{ color: "var(--oj-accent-color)" }}>north_east</span>
                                        </Link>
                                        <Link className="group flex items-center justify-between px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-border-dark" target="_blank" to="/privacy-policy">
                                            <span className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[16px]" style={{ color: "var(--oj-accent-color)" }}>policy</span>
                                                <span>Terms and Policies</span>
                                            </span>
                                            <span className="material-symbols-outlined text-[7px] opacity-0 transition-opacity group-hover:opacity-100" style={{ color: "var(--oj-accent-color)" }}>north_east</span>
                                        </Link>
                                        <Link className="group flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors" to="/release-notes">
                                            <span className="material-symbols-outlined text-[16px]" style={{ color: "var(--oj-accent-color)" }}>new_releases</span>
                                            <span>Release Notes</span>
                                            <span className="material-symbols-outlined ml-auto text-[7px] opacity-0 transition-opacity group-hover:opacity-100" style={{ color: "var(--oj-accent-color)" }}>north_east</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            
                            <div className="my-1 border-t border-slate-100 dark:border-border-dark"></div>
                            
                            <a className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors" href="#">
                                <span className="material-symbols-outlined text-[18px]">logout</span>
                                Logout
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
