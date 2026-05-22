import { apiClient } from "@/services/apiClient";

export interface KnowledgeRecord {
  documentId: string;
  documentTitle?: string;
  chunkCount: number;
  embeddingModel: string;
  status: "Active" | "Failed";
}

export interface AdminKnowledgeResponse {
  records: KnowledgeRecord[];
}

export const adminKnowledgeService = {
  async getKnowledgeMetrics(): Promise<KnowledgeRecord[]> {
    const response =
      await apiClient.get<AdminKnowledgeResponse>("/admin/knowledge");
    return response.data.records;
  },
};
