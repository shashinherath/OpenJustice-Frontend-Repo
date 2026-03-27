import { create } from "zustand";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface AppNotification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

interface NotificationStore {
  notifications: AppNotification[];
  
  addNotification: (notification: Omit<AppNotification, "id">) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  
  addNotification: (notification) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id }]
    }));
  },
  
  removeNotification: (id) => 
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    })),
    
  clearAll: () => set({ notifications: [] })
}));
