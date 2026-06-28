import { create } from "zustand";
import { libraryService, type CollectionCount, type LetterCount } from "@/services/libraryService";
import type { DocumentItem } from "@/services/adminDataSourcesService";

interface LibraryState {
  collections: CollectionCount[];
  letters: LetterCount[];
  documents: DocumentItem[];
  
  isLoadingCollections: boolean;
  isLoadingLetters: boolean;
  isLoadingDocuments: boolean;
  
  error: string | null;

  activeCollectionId: string | null;
  activeLetter: string | null;
  activeDocument: DocumentItem | null;
  searchQuery: string;
  
  // Static metadata mapping for UI display
  collectionMeta: Record<string, { code: string; title: string; description: string }>;

  fetchCollections: () => Promise<void>;
  fetchLetters: (collectionId: string) => Promise<void>;
  fetchDocuments: (collectionId: string, letter?: string, searchQuery?: string) => Promise<void>;
  
  setActiveCollection: (collectionId: string | null) => void;
  setActiveLetter: (letter: string | null) => void;
  setActiveDocument: (doc: DocumentItem | null) => void;
  setSearchQuery: (query: string) => void;
}

const COLLECTION_META: Record<string, { code: string; title: string; description: string }> = {
  slr: {
    code: "SLR",
    title: "Sri Lanka Law Reports",
    description: "Official reports of cases decided by the Supreme Court and Court of Appeal."
  },
  nlr: {
    code: "NLR",
    title: "New Law Reports",
    description: "Historical cases and judgments from the appellate courts of Sri Lanka."
  },
  sclr: {
    code: "SCLR",
    title: "Supreme Court Law Reports",
    description: "Exclusive reports and judgments delivered by the Supreme Court."
  },
  scoa: {
    code: "SCOA",
    title: "Court of Appeal Reports",
    description: "Decisions and orders passed by the Court of Appeal of Sri Lanka."
  },
  acts: {
    code: "ACTS",
    title: "Consolidated Acts",
    description: "Statutes and acts passed by the Parliament, categorized alphabetically."
  },
  special: {
    code: "SPEC",
    title: "Special Documents",
    description: "Miscellaneous legal documents and special legislative references."
  }
};

export const useLibraryStore = create<LibraryState>((set, get) => ({
  collections: [],
  letters: [],
  documents: [],
  
  isLoadingCollections: false,
  isLoadingLetters: false,
  isLoadingDocuments: false,
  
  error: null,

  activeCollectionId: null,
  activeLetter: null,
  activeDocument: null,
  searchQuery: "",
  
  collectionMeta: COLLECTION_META,

  fetchCollections: async () => {
    set({ isLoadingCollections: true, error: null });
    try {
      const collections = await libraryService.getCollections();
      set({ collections, isLoadingCollections: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to load collections", isLoadingCollections: false });
    }
  },

  fetchLetters: async (collectionId: string) => {
    set({ isLoadingLetters: true, error: null });
    try {
      const letters = await libraryService.getLetters(collectionId);
      set({ letters, isLoadingLetters: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to load letters", isLoadingLetters: false });
    }
  },

  fetchDocuments: async (collectionId: string, letter?: string, searchQuery?: string) => {
    set({ isLoadingDocuments: true, error: null });
    try {
      const documents = await libraryService.getDocuments(collectionId, letter, searchQuery);
      set({ documents, isLoadingDocuments: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to load documents", isLoadingDocuments: false });
    }
  },

  setActiveCollection: (collectionId) => set({ activeCollectionId: collectionId }),
  setActiveLetter: (letter) => set({ activeLetter: letter }),
  setActiveDocument: (doc) => set({ activeDocument: doc }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
