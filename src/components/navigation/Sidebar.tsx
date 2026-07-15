import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSettingsModal } from "@/hooks/common/useSettingsModal";
import { useChatStore } from "@/stores/chatStore";
import { useAuthStore } from "@/stores/authStore";
import BrandLogo from "@/components/ui/BrandLogo";
import ChatActionModal from "@/components/ui/ChatActionModal";

interface SidebarProps {
  showBrand?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ showBrand = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [activeChatMenu, setActiveChatMenu] = useState<string | null>(null);
  const [chatModalState, setChatModalState] = useState<{
    mode: "rename" | "delete";
    chatId: string;
    title: string;
    value?: string;
  } | null>(null);
  const [historySearch, setHistorySearch] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { openSettings, openProfile } = useSettingsModal();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const {
    sidebarChats,
    archiveChat,
    deleteChat,
    pinChat,
    renameChat,
    setActiveConversation,
    loadConversations,
    loadConversation,
  } = useChatStore();

  const activeChats = useMemo(() => {
    const normalizedSearch = historySearch.trim().toLowerCase();

    return sidebarChats
      .filter((chat) => !chat.isArchived)
      .filter((chat) => {
        if (!normalizedSearch) {
          return true;
        }

        return chat.title.toLowerCase().includes(normalizedSearch);
      })
      .sort((a, b) => {
        if (a.isPinned === b.isPinned) {
          return 0;
        }
        return a.isPinned ? -1 : 1;
      });
  }, [historySearch, sidebarChats]);
  const selectedChatId = location.pathname.startsWith("/chat/")
    ? location.pathname.split("/")[2]
    : null;

  useEffect(() => {
    void loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveChatMenu(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleOutsideProfileClick = (event: MouseEvent) => {
      if (!menuOpen) {
        return;
      }

      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
        setHelpOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideProfileClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideProfileClick);
  }, [menuOpen]);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    setHelpOpen(false);
    navigate("/");
  };

  return (
    <aside
      className={`relative flex h-full min-h-0 shrink-0 flex-col overflow-visible border-r border-slate-200 bg-white transition-all duration-200 dark:border-border-dark dark:bg-brand-bg ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className={`flex-none ${isCollapsed ? "gap-4 p-2" : "gap-6 p-4"}`}>
        {showBrand && (
          <div
            className={`flex items-center ${isCollapsed ? "justify-center gap-2" : "justify-between gap-3"}`}
          >
            {isCollapsed ? (
              <button
                className="group relative flex size-10 items-center justify-center cursor-pointer"
                type="button"
                onClick={() => setIsCollapsed(false)}
                aria-label="Expand sidebar"
              >
                <div className="transition-opacity group-hover:opacity-0">
                  <BrandLogo
                    containerClassName="bg-primary dark:bg-slate-200 rounded-lg size-10 flex items-center justify-center overflow-hidden"
                    iconClassName="text-white dark:text-[#191919] scale-125"
                  />
                </div>
                <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-[28px] text-slate-900 opacity-0 transition-opacity group-hover:opacity-100 dark:text-white">
                  dock_to_right
                </span>
              </button>
            ) : (
              <Link
                className="flex items-center gap-3"
                to="/"
                aria-label="Go to home page"
              >
                <BrandLogo
                  containerClassName="bg-primary dark:bg-slate-200 rounded-lg size-10 flex items-center justify-center overflow-hidden"
                  iconClassName="text-white dark:text-[#191919] scale-125"
                />
                <div className="flex flex-col">
                  <h1 className="text-base font-bold leading-none text-slate-900 dark:text-white">
                    OpenJustice
                  </h1>
                </div>
              </Link>
            )}

            {!isCollapsed && (
              <button
                className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-border-dark dark:bg-surface-dark dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white cursor-pointer"
                type="button"
                onClick={() => setIsCollapsed((prev) => !prev)}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <span className="material-symbols-outlined text-[18px] text-slate-400 dark:text-slate-500">
                  dock_to_right
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-4">
        <div className="flex-none">
          <button
            className={`mb-4 flex w-full items-center rounded-lg border border-slate-200 bg-white py-2.5 text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 dark:border-transparent dark:bg-slate-200 dark:text-black dark:hover:bg-white cursor-pointer ${
              isCollapsed ? "justify-center px-2" : "gap-3 px-3"
            }`}
            type="button"
            onClick={() => {
              navigate("/chat");
            }}
          >
            <span
              className="material-symbols-outlined text-[20px] text-slate-400 dark:text-slate-600 transition-colors group-hover:text-slate-600"
            >
              add
            </span>
            {!isCollapsed && (
              <span className="text-sm font-semibold">New Question</span>
            )}
          </button>

          {!isCollapsed && (
            <div className="mb-3 px-3">
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Query History
              </label>
              <div className="relative flex h-10 w-full min-w-0 items-center rounded-full border border-slate-200 bg-white/80 px-3 shadow-sm transition-colors focus-within:border-slate-300 dark:border-border-dark dark:bg-surface-dark dark:focus-within:border-slate-600">
                <span className="material-symbols-outlined pointer-events-none shrink-0 text-[18px] text-slate-400 dark:text-slate-500">
                  search
                </span>
                <input
                  className="ml-2 h-full min-w-0 flex-1 border-none bg-transparent p-0 text-sm leading-none text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0 dark:text-white dark:placeholder:text-slate-500"
                  placeholder="Search query history"
                  type="text"
                  value={historySearch}
                  onChange={(event) => setHistorySearch(event.target.value)}
                  aria-label="Search query history"
                />
                {historySearch && (
                  <button
                    className="ml-2 shrink-0 rounded p-1 text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                    type="button"
                    aria-label="Clear query history search"
                    onClick={() => setHistorySearch("")}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      close
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-2">
          <div className="flex flex-col gap-1">
            {activeChats.length > 0 ? (
              activeChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`group relative flex cursor-pointer items-center rounded-lg py-2 transition-colors ${
                    isCollapsed ? "justify-center px-2" : "gap-3 px-3"
                  } ${
                    selectedChatId === chat.id
                      ? "bg-slate-100 text-slate-900 border border-slate-200 dark:bg-surface-dark dark:border-border-dark dark:text-white"
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-surface-dark"
                  }`}
                  onClick={() => {
                    setActiveConversation(chat.id);
                    navigate(`/chat/${chat.id}`);
                    void loadConversation(chat.id);
                  }}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    history
                  </span>
                  {!isCollapsed && (
                    <p
                      className={`truncate pr-5 ${selectedChatId === chat.id ? "text-sm font-medium" : "text-sm font-normal"}`}
                    >
                      {chat.title}
                    </p>
                  )}
                  {!isCollapsed && chat.isPinned && (
                    <span
                      className="material-symbols-outlined text-[12px] text-amber-500"
                      title="Pinned"
                    >
                      keep
                    </span>
                  )}

                  {!isCollapsed && (
                    <button
                      className="ml-auto rounded p-1 text-slate-400 opacity-0 transition-all hover:bg-slate-200 hover:text-slate-700 group-hover:opacity-100 dark:hover:bg-border-dark dark:hover:text-slate-200 cursor-pointer"
                      type="button"
                      aria-label="Chat item actions"
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveChatMenu((prev) =>
                          prev === chat.id ? null : chat.id,
                        );
                      }}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        more_horiz
                      </span>
                    </button>
                  )}

                  {!isCollapsed && activeChatMenu === chat.id && (
                    <div
                      className="absolute right-1 top-10 z-30 w-40 rounded-lg border border-slate-200 bg-white py-1 shadow-xl dark:border-border-dark dark:bg-surface-dark"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-border-dark cursor-pointer"
                        type="button"
                        onClick={() => {
                          void archiveChat(chat.id);
                          setActiveChatMenu(null);
                        }}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          archive
                        </span>
                        Archive
                      </button>
                      <button
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-border-dark cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          share
                        </span>
                        Share
                      </button>
                      <button
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-border-dark cursor-pointer"
                        type="button"
                        onClick={() => {
                          setActiveChatMenu(null);
                          setChatModalState({
                            mode: "rename",
                            chatId: chat.id,
                            title: chat.title,
                            value: chat.title,
                          });
                        }}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          drive_file_rename_outline
                        </span>
                        Rename
                      </button>
                      <button
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-border-dark cursor-pointer"
                        type="button"
                        onClick={() => {
                          void pinChat(chat.id);
                          setActiveChatMenu(null);
                        }}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {chat.isPinned ? "keep_off" : "keep"}
                        </span>
                        {chat.isPinned ? "Unpin" : "Pin"}
                      </button>
                      <button
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-red-500 transition-colors hover:bg-red-500/10 cursor-pointer"
                        type="button"
                        onClick={() => {
                          setActiveChatMenu(null);
                          setChatModalState({
                            mode: "delete",
                            chatId: chat.id,
                            title: chat.title,
                          });
                        }}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          delete
                        </span>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-slate-200 bg-white/50 px-3 py-4 text-sm text-slate-500 dark:border-border-dark dark:bg-surface-dark/40 dark:text-slate-400">
                No matching chats.
              </div>
            )}
          </div>
        </div>
      </div>

      <ChatActionModal
        isOpen={chatModalState !== null}
        title={
          chatModalState?.mode === "rename" ? "Rename chat" : "Delete chat"
        }
        description={
          chatModalState?.mode === "rename"
            ? `Choose a new title for "${chatModalState.title}".`
            : `Are you sure you want to permanently delete "${chatModalState?.title ?? "this chat"}"? This action cannot be undone.`
        }
        confirmLabel={chatModalState?.mode === "rename" ? "Rename" : "Delete"}
        tone={chatModalState?.mode === "delete" ? "danger" : "default"}
        icon={
          chatModalState?.mode === "rename"
            ? "drive_file_rename_outline"
            : "delete_forever"
        }
        inputLabel={
          chatModalState?.mode === "rename" ? "Chat title" : undefined
        }
        inputValue={
          chatModalState?.mode === "rename"
            ? (chatModalState.value ?? "")
            : undefined
        }
        inputPlaceholder="Enter chat title"
        onInputChange={
          chatModalState?.mode === "rename"
            ? (value) =>
                setChatModalState((current) =>
                  current?.mode === "rename" ? { ...current, value } : current,
                )
            : undefined
        }
        onClose={() => setChatModalState(null)}
        onConfirm={() => {
          if (!chatModalState) {
            return;
          }

          if (chatModalState.mode === "rename") {
            const nextTitle = (chatModalState.value ?? "").trim();
            if (!nextTitle) {
              return;
            }

            void renameChat(chatModalState.chatId, nextTitle);
          } else {
            void deleteChat(chatModalState.chatId);
            if (selectedChatId === chatModalState.chatId) {
              navigate("/chat");
            }
          }

          setActiveChatMenu(null);
          setChatModalState(null);
        }}
      />

      <div className="relative z-20 flex-none border-t border-slate-200 p-4 dark:border-border-dark">
        <div className="relative profile-menu" ref={profileMenuRef}>
          <button
            className={`flex w-full items-center rounded-lg px-2 py-2 text-left transition-colors group focus:outline-none cursor-pointer ${
              isCollapsed
                ? "justify-center"
                : "gap-3 hover:bg-slate-50 dark:hover:bg-surface-dark text-slate-900 dark:text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-300 dark:border-slate-600 shrink-0">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-[20px] text-slate-600 dark:text-slate-300">
                  account_circle
                </span>
              )}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col items-start overflow-hidden">
                <span className="truncate text-sm font-semibold">
                  {user?.name || "User"}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-tight text-slate-500">
                  {user?.role || "User"}
                </span>
              </div>
            )}
            {!isCollapsed && (
              <span className="material-symbols-outlined ml-auto text-[16px] text-slate-400 dark:text-slate-500">
                more_vert
              </span>
            )}
          </button>

          {menuOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-56 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl py-2 z-100">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-border-dark mb-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Signed in as
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {user?.email || "user@openjustice.org"}
                </p>
              </div>

              <button
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors cursor-pointer"
                type="button"
                onClick={() => {
                  openProfile();
                  setMenuOpen(false);
                }}
              >
                <span className="material-symbols-outlined text-[18px]">
                  person
                </span>
                Profile
              </button>

              <button
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors cursor-pointer"
                type="button"
                onClick={() => {
                  openSettings();
                  setMenuOpen(false);
                }}
              >
                <span className="material-symbols-outlined text-[18px]">
                  settings
                </span>
                Settings
              </button>

              <div
                className="relative help-item group/help"
                onMouseEnter={() => setHelpOpen(true)}
                onMouseLeave={() => setHelpOpen(false)}
              >
                <div className="flex items-center justify-between px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">
                      help_outline
                    </span>
                    Help
                  </div>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ color: "var(--oj-accent-color)" }}
                  >
                    chevron_right
                  </span>
                </div>

                {helpOpen && (
                  <div className="absolute left-full bottom-0 ml-1 w-48 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl py-2">
                    <Link
                      className="group flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors"
                      to="/help"
                    >
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ color: "var(--oj-accent-color)" }}
                      >
                        help_outline
                      </span>
                      <span>Help Center</span>
                      <span
                        className="material-symbols-outlined ml-auto text-[7px] opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ color: "var(--oj-accent-color)" }}
                      >
                        north_east
                      </span>
                    </Link>
                    <Link
                      className="group flex items-center justify-between px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-border-dark"
                      target="_blank"
                      to="/privacy-policy"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ color: "var(--oj-accent-color)" }}
                        >
                          policy
                        </span>
                        <span>Terms and Policies</span>
                      </span>
                      <span
                        className="material-symbols-outlined text-[7px] opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ color: "var(--oj-accent-color)" }}
                      >
                        north_east
                      </span>
                    </Link>
                    <Link
                      className="group flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors"
                      to="/release-notes"
                    >
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ color: "var(--oj-accent-color)" }}
                      >
                        new_releases
                      </span>
                      <span>Release Notes</span>
                      <span
                        className="material-symbols-outlined ml-auto text-[7px] opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ color: "var(--oj-accent-color)" }}
                      >
                        north_east
                      </span>
                    </Link>
                  </div>
                )}
              </div>

              <div className="my-1 border-t border-slate-100 dark:border-border-dark" />

              <button
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-border-dark cursor-pointer"
                type="button"
                onClick={handleLogout}
              >
                <span className="material-symbols-outlined text-[18px]">
                  logout
                </span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
