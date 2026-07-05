import { apiClient } from './apiClient';

export interface AnalyzerResponse {
  conversation_id: string;
}

export const analyzeDocument = async (
  file: File, 
  documentType: string, 
  analysisType: string = "Risk & Compliance", 
  customPrompt?: string
): Promise<AnalyzerResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('document_type', documentType);
  formData.append('analysis_type', analysisType);
  if (customPrompt) {
    formData.append('custom_prompt', customPrompt);
  }

  const response = await apiClient.post<AnalyzerResponse>('/analyzer/document', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 60000, // LLM processing can take longer than the default 10s
  });

  return response.data;
};
