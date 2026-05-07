import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ApiConversationDetailResponse,
  ApiConversationResponse,
  ApiMessageResponse,
  ChatMessage,
  Conversation,
} from "@/types/chat.types";
import { chatService } from "@/services/chatService";

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
  setTyping: (isTyping: boolean) => void;
  clearMessages: () => void;
  archiveChat: (id: string) => void;
  archiveAllChats: () => void;
  unarchiveChat: (id: string) => void;
  deleteChat: (id: string) => void;
  deleteAllChats: () => void;
  renameChat: (id: string, title: string) => void;
  pinChat: (id: string) => void;
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
  };
};

const mapConversation = (
  conversation: ApiConversationResponse,
): Conversation => ({
  id: conversation.id,
  title: conversation.title || "New Question",
  createdAt: new Date(conversation.created_at),
  messages: [],
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
      isArchived: previous?.isArchived ?? false,
      isPinned: previous?.isPinned ?? false,
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
          set((state) => ({
            activeConversationId: id,
            chatMessagesById: {
              ...state.chatMessagesById,
              [id]: mappedMessages,
            },
            sidebarChats: mergeSidebarChats(state.sidebarChats, [
              mapConversation(conversation),
            ]),
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
        if (!trimmed) {
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

        set((state) => {
          const existing = state.chatMessagesById[chatId] || [];
          return {
            chatMessagesById: {
              ...state.chatMessagesById,
              [chatId]: [...existing, optimisticMessage],
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

        try {
          const created = await chatService.createMessage(chatId, {
            content: trimmed,
            sender: "user",
            message_type: "text",
          });

          set((state) => {
            const existing = state.chatMessagesById[chatId] || [];
            const withoutTemp = existing.filter(
              (message) => message.id !== tempId,
            );
            return {
              chatMessagesById: {
                ...state.chatMessagesById,
                [chatId]: [...withoutTemp, mapApiMessage(created)],
              },
            };
          });
        } catch (error: any) {
          set((state) => ({
            error: error?.message || "Failed to send message.",
            chatMessagesById: {
              ...state.chatMessagesById,
              [chatId]: (state.chatMessagesById[chatId] || []).filter(
                (message) => message.id !== tempId,
              ),
            },
          }));
          throw error;
        }
      },

      setTyping: (isTyping) => set({ isTyping }),
      clearMessages: () => set({ chatMessagesById: {} }),
      archiveChat: (id) =>
        set((state) => ({
          sidebarChats: state.sidebarChats.map((chat) =>
            chat.id === id ? { ...chat, isArchived: true } : chat,
          ),
          activeConversationId:
            state.activeConversationId === id
              ? null
              : state.activeConversationId,
        })),
      archiveAllChats: () =>
        set((state) => ({
          sidebarChats: state.sidebarChats.map((chat) => ({
            ...chat,
            isArchived: true,
          })),
        })),
      unarchiveChat: (id) =>
        set((state) => ({
          sidebarChats: state.sidebarChats.map((chat) =>
            chat.id === id ? { ...chat, isArchived: false } : chat,
          ),
        })),
      deleteChat: (id) =>
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
        })),
      deleteAllChats: () =>
        set({
          sidebarChats: [],
          chatMessagesById: {},
          activeConversationId: null,
        }),
      renameChat: (id, title) =>
        set((state) => ({
          sidebarChats: state.sidebarChats.map((chat) =>
            chat.id === id ? { ...chat, title } : chat,
          ),
        })),
      pinChat: (id) =>
        set((state) => ({
          sidebarChats: state.sidebarChats.map((chat) =>
            chat.id === id ? { ...chat, isPinned: !chat.isPinned } : chat,
          ),
        })),
    }),
    {
      name: CHAT_STORAGE_KEY,
      partialize: (state) => ({
        activeConversationId: state.activeConversationId,
        sidebarChats: state.sidebarChats,
        chatMessagesById: state.chatMessagesById,
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
