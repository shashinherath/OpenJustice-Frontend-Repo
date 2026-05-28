import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user.types";
import { authService } from "@/services/authService";
import i18n from "@/config/i18n.config";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  userRole: string | null;
  isLoadingProfile: boolean;

  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
  clearSession: () => void;
  updateUser: (data: Partial<User>) => void;
  loadProfile: () => Promise<void>;
  updateProfileFromBackend: (data: Partial<User>) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      userRole: null,
      isLoadingProfile: false,

      login: (user, token) => {
        // set language from user preferences when logging in
        const lang = user?.preferences?.language;
        if (lang) {
          void i18n.changeLanguage(lang);
        }
        set({
          user,
          token,
          isAuthenticated: true,
          userRole: user.role || null,
        });
      },
      logout: async () => {
        await authService.logout();
        // revert language to fallback on logout
        void i18n.changeLanguage("en");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          userRole: null,
        });
      },
      clearSession: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          userRole: null,
          isLoadingProfile: false,
        });
      },
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
      loadProfile: async () => {
        try {
          set({ isLoadingProfile: true });
          const profile = await authService.getProfile();

          const userData: User = {
            id: profile.uuid,
            name: profile.first_name
              ? `${profile.first_name} ${profile.last_name || ""}`.trim()
              : "User",
            email: profile.email || "",
            role: profile.role,
            avatarUrl: profile.avatar_url,
            preferences: {
              language: profile.preferred_language,
            },
          };

          // apply preferred language from backend profile
          if (profile.preferred_language) {
            void i18n.changeLanguage(profile.preferred_language);
          }

          set({
            user: userData,
            isAuthenticated: true,
            userRole: profile.role,
          });
        } catch (error) {
          console.error("Failed to load profile:", error);
          set({ isLoadingProfile: false });
          throw error;
        } finally {
          set({ isLoadingProfile: false });
        }
      },
      updateProfileFromBackend: async (data) => {
        try {
          const response = await authService.updateProfile({
            first_name:
              data.name && data.name.split(" ")[0]
                ? data.name.split(" ")[0]
                : undefined,
            last_name:
              data.name && data.name.split(" ").slice(1).join(" ")
                ? data.name.split(" ").slice(1).join(" ")
                : undefined,
            email: data.email,
            avatar_url: data.avatarUrl,
            preferred_language: data.preferences?.language,
          });

          const userData: User = {
            id: response.uuid,
            name: response.first_name
              ? `${response.first_name} ${response.last_name || ""}`.trim()
              : "User",
            email: response.email || "",
            role: response.role,
            avatarUrl: response.avatar_url,
            preferences: {
              language: response.preferred_language,
            },
          };

          // apply language if backend returned preference
          if (response.preferred_language) {
            void i18n.changeLanguage(response.preferred_language);
          }

          set({ user: userData });
        } catch (error) {
          console.error("Failed to update profile:", error);
          throw error;
        }
      },
      changePassword: async (currentPassword, newPassword) => {
        try {
          await authService.changePassword({
            current_password: currentPassword,
            new_password: newPassword,
          });
        } catch (error) {
          console.error("Failed to change password:", error);
          throw error;
        }
      },
    }),
    {
      name: "oj-auth-store",
    },
  ),
);
