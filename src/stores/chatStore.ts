import { create } from "zustand";
import type { ChatMessage, Conversation } from "@/types/chat.types";

interface ChatStore {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: ChatMessage[];
  isTyping: boolean;
  
  setActiveConversation: (id: string) => void;
  addMessage: (message: ChatMessage) => void;
  setTyping: (isTyping: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  conversations: [],
  activeConversationId: null,
  messages: [],
  isTyping: false,
  
  setActiveConversation: (id) => set({ activeConversationId: id }),
  addMessage: (message) => 
    set((state) => ({ messages: [...state.messages, message] })),
  setTyping: (isTyping) => set({ isTyping }),
  clearMessages: () => set({ messages: [] })
}));
