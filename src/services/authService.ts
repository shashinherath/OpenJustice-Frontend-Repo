import { apiClient } from "./apiClient";
import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
} from "@/types/auth.types";

export interface UserProfileResponse {
  uuid: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role: string;
  preferred_language: string;
  avatar_url?: string;
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  preferred_language?: string;
  avatar_url?: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials,
    );
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register",
      userData,
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      // Log error but don't throw - we want to clear local state regardless
      console.error("Logout error:", error);
    }
  },

  getProfile: async (): Promise<UserProfileResponse> => {
    try {
      const response = await apiClient.get<{ data: UserProfileResponse }>(
        "/auth/me",
      );
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      throw error;
    }
  },

  updateProfile: async (
    profileData: UpdateProfileRequest,
  ): Promise<UserProfileResponse> => {
    try {
      const response = await apiClient.patch<{ data: UserProfileResponse }>(
        "/auth/users/me",
        profileData,
      );
      return response.data.data;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  },

  uploadAvatar: async (file: File): Promise<UserProfileResponse> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await apiClient.post<{ data: UserProfileResponse }>(
        "/auth/users/me/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Failed to upload avatar:", error);
      throw error;
    }
  },

  changePassword: async (
    passwordData: ChangePasswordRequest,
  ): Promise<void> => {
    try {
      await apiClient.post("/auth/change-password", passwordData);
    } catch (error) {
      console.error("Failed to change password:", error);
      throw error;
    }
  },

  verifyEmail: async (token: string): Promise<void> => {
    try {
      await apiClient.post("/auth/verify-email", { token });
    } catch (error) {
      console.error("Failed to verify email:", error);
      throw error;
    }
  },

  resendVerification: async (email: string): Promise<void> => {
    try {
      await apiClient.post("/auth/resend-verification", { email });
    } catch (error) {
      console.error("Failed to resend verification:", error);
      throw error;
    }
  },
};
