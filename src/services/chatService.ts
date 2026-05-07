import { apiClient } from "@/services/apiClient";
import type {
  ApiConversationCreate,
  ApiConversationDetailResponse,
  ApiConversationResponse,
  ApiMessageCreate,
  ApiMessageResponse,
} from "@/types/chat.types";

export const chatService = {
  async listConversations(
    skip = 0,
    limit = 100,
  ): Promise<ApiConversationResponse[]> {
    const response = await apiClient.get<ApiConversationResponse[]>("/chats", {
      params: { skip, limit },
    });
    return response.data;
  },

  async createConversation(
    payload: ApiConversationCreate,
  ): Promise<ApiConversationResponse> {
    const response = await apiClient.post<ApiConversationResponse>(
      "/chats",
      payload,
    );
    return response.data;
  },

  async getConversation(
    conversationId: string,
  ): Promise<ApiConversationDetailResponse> {
    const response = await apiClient.get<ApiConversationDetailResponse>(
      `/chats/${conversationId}`,
    );
    return response.data;
  },

  async createMessage(
    conversationId: string,
    payload: ApiMessageCreate,
  ): Promise<ApiMessageResponse> {
    const response = await apiClient.post<ApiMessageResponse>(
      `/chats/${conversationId}/messages`,
      payload,
    );
    return response.data;
  },
};
