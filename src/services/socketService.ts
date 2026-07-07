import { getWebSocketBaseUrl } from "@/config/socket.config";

type MessageHandler = (data: Record<string, unknown>) => void;

interface WebSocketConnection {
  socket: WebSocket;
  handlers: Map<string, Set<MessageHandler>>;
}

const connections = new Map<string, WebSocketConnection>();

/**
 * Opens a native WebSocket connection to the FastAPI backend for a given conversation.
 * Auth is passed via `?token=<jwt>` in the query string (as expected by the backend).
 *
 * @param conversationId  UUID of the conversation
 * @param token           JWT access token from authStore
 * @returns The WebSocket instance
 */
export const connectToConversation = (
  conversationId: string,
  token: string,
): WebSocket => {
  const existing = connections.get(conversationId);
  if (existing && existing.socket.readyState === WebSocket.OPEN) {
    return existing.socket;
  }

  const base = getWebSocketBaseUrl();
  const url = `${base}/api/ws/chat/${conversationId}?token=${encodeURIComponent(token)}`;
  const socket = new WebSocket(url);

  const connection: WebSocketConnection = {
    socket,
    handlers: new Map(),
  };
  connections.set(conversationId, connection);

  socket.addEventListener("message", (event: MessageEvent<string>) => {
    try {
      const data = JSON.parse(event.data) as Record<string, unknown>;
      const type = data.type as string | undefined;
      if (!type) return;

      const typeHandlers = connection.handlers.get(type);
      typeHandlers?.forEach((handler) => handler(data));

      // Respond to server pings
      if (type === "ping") {
        socket.send(JSON.stringify({ type: "pong" }));
      }
    } catch {
      // Ignore non-JSON frames
    }
  });

  return socket;
};

/**
 * Register a handler for a specific message type on a conversation socket.
 */
export const onConversationMessage = (
  conversationId: string,
  type: string,
  handler: MessageHandler,
): (() => void) => {
  const conn = connections.get(conversationId);
  if (!conn) return () => {};

  if (!conn.handlers.has(type)) {
    conn.handlers.set(type, new Set());
  }
  conn.handlers.get(type)!.add(handler);

  // Return unsubscribe function
  return () => {
    conn.handlers.get(type)?.delete(handler);
  };
};

/**
 * Send a chat message over an open WebSocket connection.
 */
export const sendChatMessage = (
  conversationId: string,
  message: string,
): void => {
  const conn = connections.get(conversationId);
  if (!conn || conn.socket.readyState !== WebSocket.OPEN) {
    console.warn("WebSocket not open for conversation:", conversationId);
    return;
  }
  conn.socket.send(JSON.stringify({ type: "chat_message", message }));
};

/**
 * Close and clean up a conversation WebSocket connection.
 */
export const disconnectFromConversation = (conversationId: string): void => {
  const conn = connections.get(conversationId);
  if (conn) {
    conn.socket.close(1000, "Client disconnected");
    connections.delete(conversationId);
  }
};

/**
 * Close all open WebSocket connections (e.g., on logout).
 */
export const disconnectAllSockets = (): void => {
  connections.forEach((conn, id) => {
    conn.socket.close(1000, "Logout");
    connections.delete(id);
  });
};