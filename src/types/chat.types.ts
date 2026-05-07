export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: ChatMessage[];
}

export interface LegalQuery {
  text: string;
  context?: string;
  language?: string;
}

export interface LegalResponse {
  answer: string;
  sources?: string[];
  disclaimer?: string;
}
