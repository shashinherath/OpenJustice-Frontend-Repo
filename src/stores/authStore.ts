import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user.types";
import { authService } from "@/services/authService";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  userRole: string | null;

  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      userRole: null,

      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          userRole: user.role || null,
        }),
      logout: async () => {
        await authService.logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          userRole: null,
        });
      },
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    {
      name: "oj-auth-store",
    },
  ),
);
