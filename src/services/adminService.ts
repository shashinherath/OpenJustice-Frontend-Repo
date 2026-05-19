import { apiClient } from "@/services/apiClient";

export interface StatItem {
  id: number;
  title: string;
  value: string;
  change: string;
  statusType: "neutral" | "positive" | "warning";
}

export interface ActivityItem {
  id: number;
  title: string;
  description: string;
  timeAgo: string;
  icon: string;
  iconColorClass: string;
}

export interface ServiceStatusItem {
  id: number;
  title: string;
  status: "Active" | "Failed";
}

export interface DataSourceItem {
  id: number;
  title: string;
  statusLabel: string;
  statusColorClass: string;
  progressPercent: number;
  footerText: string;
  progressColorClass?: string;
}

export interface AdminOverviewResponse {
  stats: StatItem[];
  activities: ActivityItem[];
  core_services: ServiceStatusItem[];
  data_sources: DataSourceItem[];
}

export interface AdminUserItem {
  id: string;
  email: string;
  status: "Active" | "Blocked";
  createdDate: string;
}

export interface AdminUserListResponse {
  users: AdminUserItem[];
  total_active: number;
  total_blocked: number;
}

export type TraceStatus = "Completed" | "Pending" | "Failed" | "Reviewed";
export type EventType = "llm_request" | "llm_response" | "retrieval_results" | "llm_error";

export interface TraceLog {
  id: string;
  correlationId: string;
  eventType: EventType;
  model: string;
  promptVersion: string;
  language: "English" | "Sinhala" | "Tamil";
  promptTokens: number;
  completionTokens: number;
  latencyMs: number;
  retrievalCount: number;
  citationCount: number;
  status: TraceStatus;
  timestamp: string;
}

export interface AdminLogListResponse {
  logs: TraceLog[];
  total: number;
}

export const adminService = {
  async getOverview(): Promise<AdminOverviewResponse> {
    const response = await apiClient.get<AdminOverviewResponse>("/admin/overview");
    return response.data;
  },
  
  async getUsers(skip = 0, limit = 100): Promise<AdminUserListResponse> {
    const response = await apiClient.get<AdminUserListResponse>(`/admin/users?skip=${skip}&limit=${limit}`);
    return response.data;
  },
  
  async updateUserStatus(userId: string, isActive: boolean): Promise<AdminUserItem> {
    const response = await apiClient.patch<AdminUserItem>(`/admin/users/${userId}/status`, { is_active: isActive });
    return response.data;
  },

  async getLogs(skip = 0, limit = 100): Promise<AdminLogListResponse> {
    const response = await apiClient.get<AdminLogListResponse>(`/admin/logs?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  async updateLogStatus(logId: string, status: TraceStatus): Promise<void> {
    await apiClient.patch(`/admin/logs/${logId}/status`, { status });
  },

  async deleteLog(logId: string): Promise<void> {
    await apiClient.delete(`/admin/logs/${logId}`);
  }
};
