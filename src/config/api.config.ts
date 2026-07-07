export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  // 60s — AI inference + RAG retrieval can take 15–30s; voice/doc uploads can also be slow
  timeoutMs: 60000,
};