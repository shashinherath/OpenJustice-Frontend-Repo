import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  ApiConversationResponse,
  ApiMessageResponse,
  ChatMessage,
  Conversation,
} from "../types/chat.types";
import { chatService } from "../services/chatService";

export interface SidebarChatItem {
  id: string;
  title: string;
  isArchived: boolean;
  isPinned: boolean;
}

interface ChatStore {
  conversations: Conversation[];
  activeConversationId: string | null;
  isTyping: boolean;
  sidebarChats: SidebarChatItem[];
  chatMessagesById: Record<string, ChatMessage[]>;
  isLoading: boolean;
  error: string | null;

  loadConversations: () => Promise<void>;
  loadConversation: (id: string) => Promise<void>;
  setActiveConversation: (id: string) => void;
  createNewChat: (title?: string) => Promise<string>;
  sendMessageToChat: (chatId: string, question: string) => Promise<void>;
  sendVoiceMessageToChat: (chatId: string, audioBlob: Blob) => Promise<void>;
  setTyping: (isTyping: boolean) => void;
  clearMessages: () => void;
  archiveChat: (id: string) => Promise<void>;
  archiveAllChats: () => void;
  unarchiveChat: (id: string) => Promise<void>;
  deleteChat: (id: string) => Promise<void>;
  deleteAllChats: () => void;
  renameChat: (id: string, title: string) => Promise<void>;
  pinChat: (id: string) => Promise<void>;
}

const CHAT_STORAGE_KEY = "oj-chat-store";

const summarizeTitle = (text: string): string => {
  const cleaned = text.trim();
  if (!cleaned) {
    return "New Question";
  }

  if (cleaned.startsWith("Voice Message")) {
    return "Voice Message Query";
  }

  return cleaned.length > 44 ? `${cleaned.slice(0, 44)}...` : cleaned;
};

const mapApiMessage = (message: ApiMessageResponse): ChatMessage => {
  const sender =
    message.sender === "ai" || message.sender === "assistant" ? "ai" : "user";
  return {
    id: message.id,
    sender,
    content: message.content,
    timestamp: new Date(message.created_at),
    messageType: message.message_type,
    audioUrl: message.audio_url || undefined,
  };
};

const mergeAudioUrl = (
  existingMessage: ChatMessage | undefined,
  nextMessage: ChatMessage,
): ChatMessage => {
  if (
    existingMessage?.audioUrl &&
    existingMessage.sender === nextMessage.sender &&
    nextMessage.messageType === "voice" &&
    !nextMessage.audioUrl
  ) {
    return {
      ...nextMessage,
      audioUrl: existingMessage.audioUrl,
    };
  }

  return nextMessage;
};

const mapConversation = (
  conversation: ApiConversationResponse,
): Conversation => ({
  id: conversation.id,
  title: conversation.title || "New Question",
  createdAt: new Date(conversation.created_at),
  messages: [],
  isArchived: conversation.is_archived,
  isPinned: conversation.is_pinned,
});

const mergeSidebarChats = (
  existing: SidebarChatItem[],
  incoming: Conversation[],
): SidebarChatItem[] => {
  const existingMap = new Map(existing.map((chat) => [chat.id, chat]));

  return incoming.map((conversation) => {
    const previous = existingMap.get(conversation.id);
    return {
      id: conversation.id,
      title: conversation.title,
      isArchived: conversation.isArchived ?? previous?.isArchived ?? false,
      isPinned: conversation.isPinned ?? previous?.isPinned ?? false,
    };
  });
};

const normalizeMessageMap = (
  map: Record<string, ChatMessage[]> | undefined,
): Record<string, ChatMessage[]> => {
  if (!map) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(map).map(([chatId, messages]) => [
      chatId,
      (messages || []).map((message) => ({
        ...message,
        timestamp:
          message.timestamp instanceof Date
            ? message.timestamp
            : new Date(message.timestamp),
      })),
    ]),
  );
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      isTyping: false,
      sidebarChats: [],
      chatMessagesById: {},
      isLoading: false,
      error: null,

      loadConversations: async () => {
        set({ isLoading: true, error: null });
        try {
          const conversations = await chatService.listConversations();
          const mapped = conversations.map(mapConversation);
          set((state) => ({
            conversations: mapped,
            sidebarChats: mergeSidebarChats(state.sidebarChats, mapped),
          }));
        } catch (error: any) {
          set({ error: error?.message || "Failed to load conversations." });
        } finally {
          set({ isLoading: false });
        }
      },

      loadConversation: async (id) => {
        if (!id) {
          return;
        }
        set({ isLoading: true, error: null });
        try {
          const conversation = await chatService.getConversation(id);
          const mappedMessages = conversation.messages.map(mapApiMessage);
          const mappedConversation = mapConversation(conversation);
          set((state) => ({
            activeConversationId: id,
            chatMessagesById: {
              ...state.chatMessagesById,
              [id]:
                mappedMessages.length === 0
                  ? state.chatMessagesById[id] || []
                  : state.chatMessagesById[id] &&
                      state.chatMessagesById[id].length > mappedMessages.length
                    ? state.chatMessagesById[id]
                    : mappedMessages.map((message, index) =>
                        mergeAudioUrl(
                          state.chatMessagesById[id]?.[index],
                          message,
                        ),
                      ),
            },
            sidebarChats: state.sidebarChats.some((chat) => chat.id === id)
              ? state.sidebarChats.map((chat) =>
                  chat.id === id
                    ? {
                        ...chat,
                        title: mappedConversation.title,
                        isArchived: mappedConversation.isArchived ?? false,
                        isPinned: mappedConversation.isPinned ?? false,
                      }
                    : chat,
                )
              : [
                  {
                    id,
                    title: mappedConversation.title,
                    isArchived: mappedConversation.isArchived ?? false,
                    isPinned: mappedConversation.isPinned ?? false,
                  },
                  ...state.sidebarChats,
                ],
          }));
        } catch (error: any) {
          set({ error: error?.message || "Failed to load conversation." });
        } finally {
          set({ isLoading: false });
        }
      },

      setActiveConversation: (id) => set({ activeConversationId: id }),

      createNewChat: async (title) => {
        const safeTitle =
          title && title.trim() ? summarizeTitle(title) : "New Question";
        set({ isLoading: true, error: null });
        try {
          const conversation = await chatService.createConversation({
            title: safeTitle,
            channel: "web",
          });
          set((state) => ({
            activeConversationId: conversation.id,
            conversations: [
              mapConversation(conversation),
              ...state.conversations,
            ],
            sidebarChats: [
              {
                id: conversation.id,
                title: safeTitle,
                isArchived: false,
                isPinned: false,
              },
              ...state.sidebarChats,
            ],
            chatMessagesById: {
              ...state.chatMessagesById,
              [conversation.id]: [],
            },
          }));
          return conversation.id;
        } catch (error: any) {
          set({ error: error?.message || "Failed to create conversation." });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      sendMessageToChat: async (chatId, question) => {
        const trimmed = question.trim();
        if (!trimmed || !chatId) {
          return;
        }

        const tempId = `${chatId}-temp-${Date.now()}`;
        const optimisticMessage: ChatMessage = {
          id: tempId,
          sender: "user",
          content: trimmed,
          timestamp: new Date(),
          messageType: "text",
        };

        const aiMessageId = `${chatId}-ai-${Date.now()}`;
        const aiMessage: ChatMessage = {
          id: aiMessageId,
          sender: "ai",
          content: "",
          timestamp: new Date(),
          messageType: "text",
        };

        set((state) => {
          const existing = state.chatMessagesById[chatId] || [];
          return {
            chatMessagesById: {
              ...state.chatMessagesById,
              [chatId]: [...existing, optimisticMessage, aiMessage],
            },
            sidebarChats: state.sidebarChats.map((chat) => {
              if (chat.id !== chatId) {
                return chat;
              }
              const nextTitle =
                chat.title === "New Question"
                  ? summarizeTitle(trimmed)
                  : chat.title;
              return { ...chat, title: nextTitle };
            }),
          };
        });

        set({ isTyping: true });

        try {
          await chatService.completeMessageStream(
            chatId,
            { query: trimmed, context: "" },
            (chunk: string) => {
              set((state) => {
                const existing = state.chatMessagesById[chatId] || [];
                return {
                  chatMessagesById: {
                    ...state.chatMessagesById,
                    [chatId]: existing.map((message) =>
                      message.id === aiMessageId
                        ? { ...message, content: `${message.content}${chunk}` }
                        : message,
                    ),
                  },
                };
              });
            },
          );
        } catch (error: any) {
          set((state) => ({
            error: error?.message || "Failed to send message.",
            chatMessagesById: {
              ...state.chatMessagesById,
              [chatId]: (state.chatMessagesById[chatId] || []).filter(
                (message) =>
                  message.id !== tempId && message.id !== aiMessageId,
              ),
            },
          }));
          throw error;
        } finally {
          set({ isTyping: false });
        }
      },

      sendVoiceMessageToChat: async (chatId, audioBlob) => {
        if (!chatId || !audioBlob) {
          return;
        }

        // Insert optimistic voice message + AI placeholder immediately
        const tempUserId = `${chatId}-temp-voice-${Date.now()}`;
        const tempAiId = `${chatId}-ai-voice-${Date.now()}`;
        const optimisticUserMessage: ChatMessage = {
          id: tempUserId,
          sender: "user",
          content: "Voice Message",
          timestamp: new Date(),
          messageType: "voice",
          audioUrl: URL.createObjectURL(audioBlob),
        } as ChatMessage;

        const optimisticAiMessage: ChatMessage = {
          id: tempAiId,
          sender: "ai",
          content: "",
          timestamp: new Date(),
          messageType: "voice",
        } as ChatMessage;

        set((state) => {
          const existing = state.chatMessagesById[chatId] || [];
          return {
            chatMessagesById: {
              ...state.chatMessagesById,
              [chatId]: [
                ...existing,
                optimisticUserMessage,
                optimisticAiMessage,
              ],
            },
            sidebarChats: state.sidebarChats.map((chat) =>
              chat.id === chatId
                ? {
                    ...chat,
                    title:
                      chat.title === "New Question"
                        ? "Voice Message"
                        : chat.title,
                  }
                : chat,
            ),
          };
        });

        set({ isTyping: true, error: null });

        try {
          // Send the voice message
          const aiAudioBlob = await chatService.sendVoiceMessage(
            chatId,
            audioBlob,
          );

          // The backend saves the user message and AI message during the voice processing.
          // Let's reload the conversation to pull the newly transcribed text and AI reply
          await get().loadConversation(chatId);

          // Play the received audio automatically
          const url = URL.createObjectURL(aiAudioBlob);
          const audio = new Audio(url);
          audio.onended = () => URL.revokeObjectURL(url);
          await audio
            .play()
            .catch((err) => console.error("Failed to play AI audio:", err));
        } catch (error: any) {
          set({ error: error?.message || "Failed to send voice message." });
          throw error;
        } finally {
          set({ isTyping: false });
        }
      },

      setTyping: (isTyping) => set({ isTyping }),
      clearMessages: () => set({ chatMessagesById: {} }),

      archiveChat: async (id) => {
        try {
          await chatService.archiveConversation(id);
          set((state) => ({
            sidebarChats: state.sidebarChats.map((chat) =>
              chat.id === id ? { ...chat, isArchived: true } : chat,
            ),
            activeConversationId:
              state.activeConversationId === id
                ? null
                : state.activeConversationId,
          }));
        } catch (error: any) {
          set({ error: error?.message || "Failed to archive chat." });
        }
      },
      archiveAllChats: () =>
        set((state) => ({
          sidebarChats: state.sidebarChats.map((chat) => ({
            ...chat,
            isArchived: true,
          })),
        })),
      unarchiveChat: async (id) => {
        try {
          await chatService.updateConversation(id, { is_archived: false });
          set((state) => ({
            sidebarChats: state.sidebarChats.map((chat) =>
              chat.id === id ? { ...chat, isArchived: false } : chat,
            ),
          }));
        } catch (error: any) {
          set({ error: error?.message || "Failed to unarchive chat." });
        }
      },
      deleteChat: async (id) => {
        try {
          await chatService.deleteConversation(id);
          set((state) => ({
            sidebarChats: state.sidebarChats.filter((chat) => chat.id !== id),
            chatMessagesById: Object.fromEntries(
              Object.entries(state.chatMessagesById).filter(
                ([key]) => key !== id,
              ),
            ),
            activeConversationId:
              state.activeConversationId === id
                ? null
                : state.activeConversationId,
          }));
        } catch (error: any) {
          set({ error: error?.message || "Failed to delete chat." });
        }
      },
      deleteAllChats: () =>
        set({
          sidebarChats: [],
          chatMessagesById: {},
          activeConversationId: null,
        }),
      renameChat: async (id, title) => {
        try {
          await chatService.updateConversation(id, { title });
          set((state) => ({
            sidebarChats: state.sidebarChats.map((chat) =>
              chat.id === id ? { ...chat, title } : chat,
            ),
          }));
        } catch (error: any) {
          set({ error: error?.message || "Failed to rename chat." });
        }
      },
      pinChat: async (id) => {
        const current = get().sidebarChats.find((chat) => chat.id === id);
        try {
          const nextPinned = !current?.isPinned;
          await chatService.updateConversation(id, { is_pinned: nextPinned });
          set((state) => ({
            sidebarChats: state.sidebarChats.map((chat) =>
              chat.id === id ? { ...chat, isPinned: nextPinned } : chat,
            ),
          }));
        } catch (error: any) {
          set({ error: error?.message || "Failed to update chat pin." });
        }
      },
    }),
    {
      name: CHAT_STORAGE_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        activeConversationId: state.activeConversationId,
        sidebarChats: state.sidebarChats,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        state.chatMessagesById = normalizeMessageMap(state.chatMessagesById);
      },
    },
  ),
);
