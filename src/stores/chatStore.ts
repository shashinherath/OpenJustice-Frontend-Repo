import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatMessage, Conversation } from "@/types/chat.types";

export interface SidebarChatItem {
  id: string;
  title: string;
  isArchived: boolean;
  isPinned: boolean;
}

interface ChatStore {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: ChatMessage[];
  isTyping: boolean;
  sidebarChats: SidebarChatItem[];
  chatMessagesById: Record<string, ChatMessage[]>;
  
  setActiveConversation: (id: string) => void;
  createNewChat: () => string;
  addMessage: (message: ChatMessage) => void;
  sendMessageToChat: (chatId: string, question: string, audioUrl?: string) => void;
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

const now = new Date();

const initialMessagesById: Record<string, ChatMessage[]> = {
  "chat-1": [
    {
      id: "chat-1-user-1",
      sender: "user",
      content: "What are my rights if a landlord refuses urgent repairs in California?",
      timestamp: new Date(now.getTime() - 1000 * 60 * 12),
    },
    {
      id: "chat-1-ai-1",
      sender: "ai",
      content:
        "In California, tenants may request repairs in writing and use remedies such as repair-and-deduct in limited conditions. Document all communication and timelines before taking action.",
      timestamp: new Date(now.getTime() - 1000 * 60 * 11),
    },
  ],
  "chat-2": [
    {
      id: "chat-2-user-1",
      sender: "user",
      content: "How do I protect source code and product branding for my startup?",
      timestamp: new Date(now.getTime() - 1000 * 60 * 9),
    },
    {
      id: "chat-2-ai-1",
      sender: "ai",
      content:
        "Use copyright notices for code, trademark filings for brand elements, and clear contributor agreements for ownership. NDA and licensing terms should align with your commercialization plan.",
      timestamp: new Date(now.getTime() - 1000 * 60 * 8),
    },
  ],
  "chat-3": [
    {
      id: "chat-3-user-1",
      sender: "user",
      content: "What should an employment contract include for remote hires?",
      timestamp: new Date(now.getTime() - 1000 * 60 * 6),
    },
    {
      id: "chat-3-ai-1",
      sender: "ai",
      content:
        "Include role scope, compensation, confidentiality, IP ownership, termination clauses, and jurisdiction terms. Ensure labor-law compliance for the employee's work location.",
      timestamp: new Date(now.getTime() - 1000 * 60 * 5),
    },
  ],
};

const buildAiResponse = (question: string): string => {
  const normalized = question.trim();
  if (!normalized) {
    return "Please share your legal question, and I can help you with a structured answer.";
  }

  const isVoice = normalized.startsWith("Voice Message");
  const displayQuestion = isVoice ? "your voice message" : `your question: "${normalized}"`;

  return `Here is a draft legal analysis based on ${displayQuestion}. I can break this down into applicable rights, procedures, and supporting sources next.`;
};

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

const normalizeMessageMap = (
  map: Record<string, ChatMessage[]> | undefined,
): Record<string, ChatMessage[]> => {
  if (!map) {
    return initialMessagesById;
  }

  return Object.fromEntries(
    Object.entries(map).map(([chatId, messages]) => [
      chatId,
      (messages || []).map((message) => ({
        ...message,
        timestamp:
          message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp),
      })),
    ]),
  );
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      conversations: [],
      activeConversationId: "chat-1",
      messages: [],
      isTyping: false,
      sidebarChats: [
        { id: "chat-1", title: "Tenant rights in CA", isArchived: false, isPinned: false },
        { id: "chat-2", title: "IP protection for software", isArchived: false, isPinned: false },
        { id: "chat-3", title: "Employment law basics", isArchived: false, isPinned: false },
      ],
      chatMessagesById: initialMessagesById,

      setActiveConversation: (id) => set({ activeConversationId: id }),
      createNewChat: () => {
        const chatId = `chat-${Date.now()}`;
        set((state) => ({
          activeConversationId: chatId,
          sidebarChats: [{ id: chatId, title: "New Question", isArchived: false, isPinned: false }, ...state.sidebarChats],
          chatMessagesById: {
            ...state.chatMessagesById,
            [chatId]: [],
          },
        }));
        return chatId;
      },
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      sendMessageToChat: (chatId, question, audioUrl) =>
        set((state) => {
          const trimmed = question.trim();
          if (!trimmed) {
            return state;
          }

          const userMessage: ChatMessage = {
            id: `${chatId}-user-${Date.now()}`,
            sender: "user",
            content: trimmed,
            timestamp: new Date(),
            audioUrl: audioUrl,
          };

          const aiMessage: ChatMessage = {
            id: `${chatId}-ai-${Date.now() + 1}`,
            sender: "ai",
            content: buildAiResponse(trimmed),
            timestamp: new Date(),
          };

          const existing = state.chatMessagesById[chatId] || [];
          const nextMessages = [...existing, userMessage, aiMessage];

          return {
            activeConversationId: chatId,
            sidebarChats: state.sidebarChats.map((chat) => {
              if (chat.id !== chatId) {
                return chat;
              }

              const nextTitle = chat.title === "New Question" ? summarizeTitle(trimmed) : chat.title;
              return { ...chat, title: nextTitle };
            }),
            chatMessagesById: {
              ...state.chatMessagesById,
              [chatId]: nextMessages,
            },
          };
        }),
      setTyping: (isTyping) => set({ isTyping }),
      clearMessages: () => set({ messages: [] }),
      archiveChat: (id) =>
        set((state) => ({
          sidebarChats: state.sidebarChats.map((chat) =>
            chat.id === id ? { ...chat, isArchived: true } : chat,
          ),
          activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
        })),
      archiveAllChats: () =>
        set((state) => ({
          sidebarChats: state.sidebarChats.map((chat) => ({ ...chat, isArchived: true })),
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
            Object.entries(state.chatMessagesById).filter(([key]) => key !== id),
          ),
          activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
        })),
      deleteAllChats: () =>
        set({
          sidebarChats: [],
          chatMessagesById: {},
          activeConversationId: null,
          messages: [],
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
