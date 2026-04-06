export interface AdminModule {
  key: "overview" | "users" | "data-sources" | "knowledge-monitoring" | "query-monitoring" | "logs" | "error-monitoring" | "analytics" | "settings";
  label: string;
  navLabel: string;
  path: string;
  icon: string;
  subtitle: string;
  description: string;
}

export const ADMIN_MODULES: AdminModule[] = [
  {
    key: "overview",
    label: "Overview Metrics",
    navLabel: "Overview",
    path: "/admin",
    icon: "dashboard",
    subtitle: "Live platform KPIs and high-level operational visibility",
    description: "Monitor trust, uptime, and health indicators before drilling into modules.",
  },
  {
    key: "users",
    label: "User Management",
    navLabel: "Users",
    path: "/admin/users",
    icon: "group",
    subtitle: "Roles, permissions, and account governance",
    description: "Review user activity, approval queues, and privileged role assignments.",
  },
  {
    key: "data-sources",
    label: "Data Sources",
    navLabel: "Data Sources",
    path: "/admin/data-sources",
    icon: "dataset",
    subtitle: "Document ingestion and source-level processing controls",
    description: "Upload legal documents, process sources, and manage source records.",
  },
  {
    key: "knowledge-monitoring",
    label: "Knowledge Monitoring",
    navLabel: "Knowledge Monitoring",
    path: "/admin/knowledge-monitoring",
    icon: "database",
    subtitle: "RAG chunk indexing and embedding health visibility",
    description: "Inspect indexed chunks, embedding models, and document-level processing status.",
  },
  {
    key: "query-monitoring",
    label: "Query Monitoring",
    navLabel: "Query Monitoring",
    path: "/admin/query-monitoring",
    icon: "monitoring",
    subtitle: "User question and AI response visibility with language-level filtering",
    description: "Review user questions, response previews, detected language, and open full conversation details.",
  },
  {
    key: "logs",
    label: "AI Logs & Traceability",
    navLabel: "AI Logs",
    path: "/admin/logs",
    icon: "receipt_long",
    subtitle: "LLM auditing, correlation IDs, and end-to-end AI trace visibility",
    description: "Inspect AI decision logs, retrieval traces, token usage, and error paths for legal accountability.",
  },
  {
    key: "error-monitoring",
    label: "Error Monitoring",
    navLabel: "Errors",
    path: "/admin/error-monitoring",
    icon: "error",
    subtitle: "System failure visibility across LLM, database, and API boundaries",
    description: "Inspect operational failures, error types, and timestamps with quick access to detailed diagnostics.",
  },
  {
    key: "analytics",
    label: "Simple Analytics",
    navLabel: "Analytics",
    path: "/admin/analytics",
    icon: "insights",
    subtitle: "Basic usage insights across query volume and language usage",
    description: "Review daily query activity and language distribution to understand platform usage trends.",
  },
  {
    key: "settings",
    label: "System Settings",
    navLabel: "Settings",
    path: "/admin/settings",
    icon: "settings",
    subtitle: "Basic configuration for language and translation behavior",
    description: "Enable or disable languages, set the default language, and toggle translation pipeline behavior.",
  },
];

export const ADMIN_MODULE_BY_PATH = ADMIN_MODULES.reduce<Record<string, AdminModule>>((acc, module) => {
  acc[module.path] = module;
  return acc;
}, {});
