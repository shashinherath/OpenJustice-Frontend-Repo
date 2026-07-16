import { API_CONFIG } from "@/config/api.config";

/**
 * Resolves a media or file path against the backend base URL if it's a relative path.
 * If the path is already an absolute URL (e.g., Azure Blob Storage), it returns it as is.
 */
export function getMediaUrl(path: string | undefined): string {
  if (!path) return "";
  
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  
  // Remove the trailing /api or /api/ to get the root backend URL
  const baseUrl = API_CONFIG.baseURL.replace(/\/api\/?$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
  return `${baseUrl}${normalizedPath}`;
}
