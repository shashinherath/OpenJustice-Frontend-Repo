import axios from "axios";
import { API_CONFIG } from "@/config/api.config";

const LOGIN_MODAL_OPEN_EVENT = "oj:open-login-modal";
const AUTH_SESSION_EXPIRED_KEY = "oj-auth-session-expired";
const IGNORED_UNAUTHORIZED_PATHS = new Set([
  "/auth/login",
  "/auth/register",
  "/auth/logout",
]);

const getRequestPath = (url?: string) => {
  if (!url) {
    return "";
  }

  try {
    return new URL(url, window.location.origin).pathname;
  } catch {
    return url.split("?")[0] ?? "";
  }
};

const handleUnauthorizedResponse = (requestUrl?: string) => {
  if (typeof window === "undefined") {
    return;
  }

  const requestPath = getRequestPath(requestUrl);
  if (IGNORED_UNAUTHORIZED_PATHS.has(requestPath)) {
    return;
  }

  window.sessionStorage.setItem(AUTH_SESSION_EXPIRED_KEY, "1");

  if (window.location.pathname === "/") {
    window.dispatchEvent(new Event(LOGIN_MODAL_OPEN_EVENT));
    return;
  }

  window.location.assign("/?login=1");
};

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeoutMs,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor: injects the JWT as an Authorization: Bearer header.
 * This ensures auth works cross-origin on Azure (SameSite=strict cookies
 * are blocked cross-origin, but Bearer tokens work regardless of domain).
 * We read the token lazily from the persisted Zustand store in localStorage
 * to avoid a circular import with authStore.
 */
apiClient.interceptors.request.use((config) => {
  try {
    const raw = sessionStorage.getItem("oj-auth-store");
    if (raw) {
      const parsed = JSON.parse(raw) as { state?: { token?: string } };
      const token = parsed?.state?.token;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
  } catch {
    // localStorage unavailable or parse error — fall back to cookie auth
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      handleUnauthorizedResponse(error?.config?.url);
    }

    return Promise.reject(error);
  },
);

