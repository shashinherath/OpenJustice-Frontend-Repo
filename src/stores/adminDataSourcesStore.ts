import { create } from "zustand";
import { adminDataSourcesService, type DocumentItem } from "@/services/adminDataSourcesService";

interface AdminDataSourcesState {
  documents: DocumentItem[];
  isLoading: boolean;
  error: string | null;
  isUploading: boolean;

  searchQuery: string;
  filterLanguage: string;
  filterStatus: string;

  stats: { total: number; processed: number; pending: number; failed: number };

  setSearchQuery: (query: string) => void;
  setFilterLanguage: (lang: string) => void;
  setFilterStatus: (status: string) => void;

  fetchStats: () => Promise<void>;
  fetchDocuments: () => Promise<void>;
  uploadDocument: (file: File, language: string) => Promise<void>;
  processDocument: (documentId: string) => Promise<void>;
  processAllPending: () => Promise<void>;
  deleteDocument: (documentId: string) => Promise<void>;
}

export const useAdminDataSourcesStore = create<AdminDataSourcesState>((set, get) => ({
  documents: [],
  isLoading: true,
  error: null,
  isUploading: false,

  searchQuery: "",
  filterLanguage: "All",
  filterStatus: "All",

  stats: { total: 0, processed: 0, pending: 0, failed: 0 },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterLanguage: (lang) => set({ filterLanguage: lang }),
  setFilterStatus: (status) => set({ filterStatus: status }),

  fetchStats: async () => {
    try {
      const stats = await adminDataSourcesService.getStats();
      set({ stats });
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  },

  fetchDocuments: async () => {
    set({ isLoading: true, error: null });
    const { searchQuery, filterLanguage, filterStatus } = get();
    // Fetch stats without awaiting to avoid blocking documents list
    void get().fetchStats();
    try {
      const documents = await adminDataSourcesService.listDocuments(0, 25, searchQuery, filterLanguage, filterStatus);
      set({ documents, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.message || "Failed to load documents.",
        isLoading: false
      });
    }
  },

  uploadDocument: async (file: File, language: string) => {
    set({ isUploading: true, error: null });
    try {
      const newDoc = await adminDataSourcesService.uploadDocument(file, language);
      const { documents } = get();
      set({ 
        documents: [newDoc, ...documents],
        isUploading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.message || "Failed to upload document.",
        isUploading: false 
      });
      throw error;
    }
  },

  processDocument: async (documentId: string) => {
    try {
      await adminDataSourcesService.processDocument(documentId);
      
      // We will optimistically set it to Processing, or just leave it. 
      // The backend uses BackgroundTasks, so we'll just poll or leave it for now.
      // Since our UI expects "Processed", let's optimistically set it or let the user refresh.
      // In a real app we'd poll or use websockets. Let's do a soft optimistic update for UX.
      const { documents } = get();
      set({
        documents: documents.map(d => d.id === documentId ? { ...d, status: "Processed" } : d)
      });
    } catch (error: any) {
      console.error("Failed to trigger processing", error);
      throw error;
    }
  },

  processAllPending: async () => {
    const { documents, processDocument } = get();
    const pendingDocs = documents.filter(d => d.status === "Pending");
    
    // Trigger in parallel
    await Promise.allSettled(pendingDocs.map(d => processDocument(d.id)));
  },

  deleteDocument: async (documentId: string) => {
    try {
      await adminDataSourcesService.deleteDocument(documentId);
      const { documents } = get();
      set({
        documents: documents.filter(d => d.id !== documentId)
      });
    } catch (error: any) {
      console.error("Failed to delete document", error);
      throw error;
    }
  }
}));
