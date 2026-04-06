import axios from "axios";
import { API_CONFIG } from "@/config/api.config";

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeoutMs,
  headers: {
    "Content-Type": "application/json",
  },
});