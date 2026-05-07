export type ChatSender = "user" | "ai";

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  content: string;
  timestamp: Date;
  messageType?: string;
  audioUrl?: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  messages: ChatMessage[];
  isArchived?: boolean;
  isPinned?: boolean;
}

export interface ApiConversationCreate {
  title: string;
  channel?: string;
}

export interface ApiConversationResponse {
  id: string;
  user_id: string;
  title: string;
  channel: string;
  is_archived: boolean;
  is_pinned: boolean;
  created_at: string;
}

export interface ApiConversationUpdate {
  title?: string;
  is_archived?: boolean;
  is_pinned?: boolean;
}

export interface ApiMessageCreate {
  sender?: string;
  content: string;
  message_type?: string;
}

export interface ApiMessageResponse {
  id: string;
  conversation_id: string;
  sender: string;
  content: string;
  message_type: string;
  created_at: string;
}

export interface ApiConversationDetailResponse extends ApiConversationResponse {
  messages: ApiMessageResponse[];
}

export interface ApiMessageCompleteRequest {
  query: string;
  context?: string;
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
