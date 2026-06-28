import { apiClient } from "./apiClient";
import type { SuccessResponse } from "./adminDataSourcesService";
import type { DocumentItem } from "./adminDataSourcesService";

export interface CollectionCount {
  collection_id: string;
  count: number;
}

export interface LetterCount {
  letter: string;
  count: number;
}

export interface LibraryCollectionsResponse {
  collections: CollectionCount[];
}

export interface LibraryLettersResponse {
  collection_id: string;
  letters: LetterCount[];
}

export const libraryService = {
  async getCollections(): Promise<CollectionCount[]> {
    const response = await apiClient.get<SuccessResponse<LibraryCollectionsResponse>>("/library/collections");
    return response.data.data.collections;
  },

  async getLetters(collectionId: string): Promise<LetterCount[]> {
    const response = await apiClient.get<SuccessResponse<LibraryLettersResponse>>(`/library/collections/${collectionId}/letters`);
    return response.data.data.letters;
  },

  async getDocuments(
    collectionId?: string,
    letter?: string,
    searchQuery?: string,
    skip = 0,
    limit = 50
  ): Promise<DocumentItem[]> {
    const params = new URLSearchParams();
    if (collectionId) params.append("collection_id", collectionId);
    params.append("skip", skip.toString());
    params.append("limit", limit.toString());
    
    if (letter) params.append("letter", letter);
    if (searchQuery) params.append("search_query", searchQuery);

    const response = await apiClient.get<SuccessResponse<DocumentItem[]>>(`/library/documents?${params.toString()}`);
    return response.data.data;
  },
};
