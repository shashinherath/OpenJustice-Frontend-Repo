// NOTE: The backend uses native FastAPI WebSockets, not socket.io.
// This URL is used to derive the WebSocket base URL for native WebSocket connections.
// The wss:// upgrade is handled automatically in websocketService.ts.
const rawSocketUrl =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:8000";

/**
 * Converts an HTTP/HTTPS URL to a WebSocket URL (ws:// or wss://).
 * Ensures wss:// is used on HTTPS pages to avoid mixed content blocks.
 */
export const getWebSocketBaseUrl = (): string => {
  const url = rawSocketUrl.replace(/^http/, "ws");
  // If page is served over HTTPS but env var uses http, force wss
  if (
    typeof window !== "undefined" &&
    window.location.protocol === "https:" &&
    url.startsWith("ws://")
  ) {
    return url.replace("ws://", "wss://");
  }
  return url;
};