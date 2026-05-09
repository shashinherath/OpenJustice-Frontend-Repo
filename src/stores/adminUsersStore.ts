import { create } from "zustand";
import { adminService, type AdminUserListResponse } from "@/services/adminService";

interface AdminUsersState {
  data: AdminUserListResponse | null;
  isLoading: boolean;
  error: string | null;
  
  fetchUsers: () => Promise<void>;
  toggleUserStatus: (userId: string, currentStatus: "Active" | "Blocked") => Promise<void>;
}

export const useAdminUsersStore = create<AdminUsersState>((set, get) => ({
  data: null,
  isLoading: true,
  error: null,
  
  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await adminService.getUsers();
      set({ data: response, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.message || "Failed to load users.",
        isLoading: false
      });
    }
  },
  
  toggleUserStatus: async (userId: string, currentStatus: "Active" | "Blocked") => {
    try {
      const newIsActive = currentStatus === "Blocked";
      const updatedUser = await adminService.updateUserStatus(userId, newIsActive);
      
      const { data } = get();
      if (data) {
        // Update local state optimistically or purely via response
        const newUsers = data.users.map(u => u.id === userId ? updatedUser : u);
        
        // Recalculate totals
        const total_active = newUsers.filter(u => u.status === "Active").length;
        const total_blocked = newUsers.length - total_active;
        
        set({
          data: {
            ...data,
            users: newUsers,
            total_active,
            total_blocked
          }
        });
      }
    } catch (error: any) {
      console.error("Failed to update user status", error);
      // Optional: Set a specific error state for toasts
    }
  }
}));
