import { apiClient } from "@/services/apiClient";

export interface DocumentItem {
  id: string;
  title: string | null;
  document_type: string | null;
  language: string | null;
  source_url: string | null;
  storage_path: string | null;
  status: "Processed" | "Pending" | "Failed";
  published_year: number | null;
  created_at: string;
}

export interface SuccessResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const adminDataSourcesService = {
  async listDocuments(skip = 0, limit = 100): Promise<DocumentItem[]> {
    const response = await apiClient.get<SuccessResponse<DocumentItem[]>>(`/documents?skip=${skip}&limit=${limit}`);
    return response.data.data;
  },

  async uploadDocument(file: File, language: string): Promise<DocumentItem> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);
    
    // In a real app we might also extract title or let user specify type
    formData.append("title", file.name);

    const response = await apiClient.post<SuccessResponse<DocumentItem>>("/documents", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data.data;
  },

  async processDocument(documentId: string): Promise<void> {
    await apiClient.post(`/documents/${documentId}/process`);
  },

  async deleteDocument(documentId: string): Promise<void> {
    await apiClient.delete(`/documents/${documentId}`);
  }
};
