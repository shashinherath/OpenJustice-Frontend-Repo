import { create } from "zustand";
import { adminKnowledgeService, type KnowledgeRecord } from "@/services/adminKnowledgeService";
import { adminDataSourcesService } from "@/services/adminDataSourcesService";

interface AdminKnowledgeState {
  records: KnowledgeRecord[];
  isLoading: boolean;
  error: string | null;

  fetchKnowledgeMetrics: () => Promise<void>;
  reprocessDocument: (documentId: string) => Promise<void>;
}

export const useAdminKnowledgeStore = create<AdminKnowledgeState>((set, get) => ({
  records: [],
  isLoading: true,
  error: null,

  fetchKnowledgeMetrics: async () => {
    set({ isLoading: true, error: null });
    try {
      const records = await adminKnowledgeService.getKnowledgeMetrics();
      set({ records, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.message || "Failed to load knowledge metrics.",
        isLoading: false
      });
    }
  },

  reprocessDocument: async (documentId: string) => {
    try {
      // Reusing the process endpoint from data sources service
      await adminDataSourcesService.processDocument(documentId);
      
      // Optimistically update status to Active (processing state could be mapped here if needed)
      const { records } = get();
      set({
        records: records.map(r => r.documentId === documentId ? { ...r, status: "Active" } : r)
      });
    } catch (error: any) {
      console.error("Failed to re-process document", error);
      throw error;
    }
  }
}));
