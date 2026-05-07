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
  }
};
