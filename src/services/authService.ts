import { apiClient } from "./apiClient";
import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
} from "@/types/auth.types";

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
    // If backend has a logout endpoint, call it here:
    // await apiClient.post("/auth/logout");
  },
};
