import { io, type Socket } from "socket.io-client";
import { SOCKET_CONFIG } from "@/config/socket.config";

let socketInstance: Socket | null = null;

export const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(SOCKET_CONFIG.url, {
      transports: [...SOCKET_CONFIG.transports],
    });
  }

  return socketInstance;
};

export const disconnectSocket = () => {
  socketInstance?.disconnect();
  socketInstance = null;
};