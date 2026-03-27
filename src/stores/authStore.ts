import { create } from "zustand";
import type { User } from "@/types/user.types";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  
  login: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  updateUser: (data) => 
    set((state) => ({ 
      user: state.user ? { ...state.user, ...data } : null 
    }))
}));
