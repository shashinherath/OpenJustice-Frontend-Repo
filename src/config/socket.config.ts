export const SOCKET_CONFIG = {
  url: import.meta.env.VITE_SOCKET_URL || "http://localhost:8000",
  transports: ["websocket"] as const,
};