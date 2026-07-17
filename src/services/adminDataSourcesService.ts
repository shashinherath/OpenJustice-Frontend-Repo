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
  collection_id: string | null;
  created_at: string;
}

export interface DocumentChunkItem {
  id: string;
  document_id: string;
  content: string;
  language: string;
  chunk_index: number;
  chunk_total: number;
  chunk_size: number;
  embedding_model: string | null;
  metadata_: any | null;
}

export interface SuccessResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const adminDataSourcesService = {
  async listDocuments(
    skip = 0,
    limit = 25,
    searchQuery?: string,
    language?: string,
    status?: string,
    collectionId?: string
  ): Promise<DocumentItem[]> {
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
    });
    
    if (searchQuery) params.append("search_query", searchQuery);
    if (language && language !== "All") params.append("language", language);
    if (status && status !== "All") params.append("status", status);
    if (collectionId && collectionId !== "All") params.append("collection_id", collectionId);

    const response = await apiClient.get<SuccessResponse<DocumentItem[]>>(`/documents?${params.toString()}`);
    return response.data.data;
  },

  async uploadDocument(
    file: File, 
    language: string, 
    collectionId: string, 
    publishedYear: string,
    onProgress?: (progress: number) => void
  ): Promise<DocumentItem> {
    const CHUNK_SIZE = 1 * 1024 * 1024; // 1 MB chunk
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    
    // 1. Initialize
    const initRes = await apiClient.post<SuccessResponse<{ upload_id: string }>>("/documents/chunked/initialize");
    const uploadId = initRes.data.data.upload_id;

    // 2. Upload chunks sequentially
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const chunkForm = new FormData();
      chunkForm.append("upload_id", uploadId);
      chunkForm.append("chunk_index", i.toString());
      chunkForm.append("file", chunk, file.name);

      await apiClient.post("/documents/chunked/upload", chunkForm, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (onProgress) {
        onProgress(Math.round(((i + 1) / totalChunks) * 100));
      }
    }

    // 3. Complete
    const completeForm = new FormData();
    completeForm.append("upload_id", uploadId);
    completeForm.append("filename", file.name);
    completeForm.append("total_chunks", totalChunks.toString());
    completeForm.append("language", language);
    completeForm.append("collection_id", collectionId);
    if (publishedYear) {
      completeForm.append("published_year", publishedYear);
    }
    completeForm.append("title", file.name);

    const response = await apiClient.post<SuccessResponse<DocumentItem>>("/documents/chunked/complete", completeForm, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data.data;
  },

  async getStats(): Promise<{total: number; processed: number; pending: number; failed: number}> {
    const response = await apiClient.get<SuccessResponse<any>>("/documents/stats");
    return response.data.data;
  },

  async processDocument(documentId: string): Promise<void> {
    await apiClient.post(`/documents/${documentId}/process`);
  },

  async deleteDocument(documentId: string): Promise<void> {
    await apiClient.delete(`/documents/${documentId}`);
  },

  async getDocumentChunks(documentId: string): Promise<DocumentChunkItem[]> {
    const response = await apiClient.get<SuccessResponse<DocumentChunkItem[]>>(`/documents/${documentId}/chunks`);
    return response.data.data;
  }
};
