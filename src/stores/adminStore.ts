import { create } from "zustand";
import { adminService, type AdminOverviewResponse, type AdminAIEvaluationResponse, type AdminResearchMetricsResponse } from "@/services/adminService";

interface AdminState {
  overviewData: AdminOverviewResponse | null;
  aiEvaluationData: AdminAIEvaluationResponse | null;
  researchMetricsData: AdminResearchMetricsResponse | null;
  isLoading: boolean;
  error: string | null;
  
  fetchOverview: () => Promise<void>;
  fetchAiEvaluation: () => Promise<void>;
  fetchResearchMetrics: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  overviewData: null,
  aiEvaluationData: null,
  researchMetricsData: null,
  isLoading: true,
  error: null,
  
  fetchOverview: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await adminService.getOverview();
      set({ overviewData: data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.message || "Failed to load admin overview data.",
        isLoading: false
      });
    }
  },

  fetchAiEvaluation: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await adminService.getAIEvaluationMetrics();
      set({ aiEvaluationData: data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.message || "Failed to load AI evaluation metrics.",
        isLoading: false
      });
    }
  },

  fetchResearchMetrics: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await adminService.getResearchMetrics();
      set({ researchMetricsData: data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.message || "Failed to load research metrics.",
        isLoading: false
      });
    }
  }
}));
