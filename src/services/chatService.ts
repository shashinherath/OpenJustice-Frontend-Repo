import { apiClient } from "@/services/apiClient";
import type {
  ApiConversationCreate,
  ApiConversationDetailResponse,
  ApiConversationResponse,
  ApiConversationUpdate,
  ApiMessageCreate,
  ApiMessageCompleteRequest,
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

  async updateConversation(
    conversationId: string,
    payload: ApiConversationUpdate,
  ): Promise<ApiConversationResponse> {
    const response = await apiClient.patch<ApiConversationResponse>(
      `/chats/${conversationId}`,
      payload,
    );
    return response.data;
  },

  async deleteConversation(conversationId: string): Promise<void> {
    await apiClient.delete(`/chats/${conversationId}`);
  },

  async archiveConversation(
    conversationId: string,
  ): Promise<ApiConversationResponse> {
    const response = await apiClient.patch<ApiConversationResponse>(
      `/chats/${conversationId}/archive`,
    );
    return response.data;
  },

  async pinConversation(
    conversationId: string,
  ): Promise<ApiConversationResponse> {
    const response = await apiClient.patch<ApiConversationResponse>(
      `/chats/${conversationId}/pin`,
    );
    return response.data;
  },

  async completeMessageStream(
    conversationId: string,
    payload: ApiMessageCompleteRequest,
    onChunk: (chunk: string) => void,
  ): Promise<void> {
    const baseUrl = apiClient.defaults.baseURL || "";

    // Inject Bearer token for cross-origin Azure deployment
    // (SameSite=strict cookies are blocked cross-origin but Bearer headers are not)
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    try {
      const raw = sessionStorage.getItem("oj-auth-store");
      if (raw) {
        const parsed = JSON.parse(raw) as { state?: { token?: string } };
        const token = parsed?.state?.token;
        if (token) headers["Authorization"] = `Bearer ${token}`;
      }
    } catch {
      // fall back to cookie auth
    }

    const response = await fetch(
      `${baseUrl}/chats/${conversationId}/messages/complete`,
      {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok || !response.body) {
      throw new Error("Failed to stream AI response.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const result = await reader.read();
      done = result.done;
      if (result.value) {
        const chunk = decoder.decode(result.value, { stream: !done });
        if (chunk) {
          onChunk(chunk);
        }
      }
    }
  },

  async sendVoiceMessage(
    conversationId: string,
    audioBlob: Blob,
  ): Promise<Blob> {
    const formData = new FormData();
    // Assuming the blob is a webm or ogg from the browser's MediaRecorder
    formData.append("file", audioBlob, "voice_note.webm");

    const response = await apiClient.post(
      `/chats/${conversationId}/messages/voice`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", // Important for receiving binary audio file
      },
    );
    
    return response.data as Blob;
  },
};
