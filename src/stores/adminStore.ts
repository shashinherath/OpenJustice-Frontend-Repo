import { create } from "zustand";
import { adminService, type AdminOverviewResponse } from "@/services/adminService";

interface AdminState {
  overviewData: AdminOverviewResponse | null;
  isLoading: boolean;
  error: string | null;
  
  fetchOverview: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  overviewData: null,
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
  }
}));
