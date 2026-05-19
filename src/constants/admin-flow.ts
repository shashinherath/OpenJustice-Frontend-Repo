export interface AdminModule {
  key:
    | "overview"
    | "users"
    | "data-sources"
    | "knowledge-monitoring"
    | "logs"
    | "error-monitoring"
    | "analytics"
    | "settings"
    | "settings-language"
    | "settings-ai"
    | "settings-retrieval"
    | "settings-security"
    | "settings-integration";
  label: string;
  navLabel: string;
  path: string;
  icon: string;
  subtitle: string;
  description: string;
  parentKey?: string;
}

export interface AdminMenuGroup {
  key: string;
  label: string;
  navLabel: string;
  path: string;
  icon: string;
  children?: AdminModule[];
}

export const ADMIN_MODULES: AdminModule[] = [
  {
    key: "overview",
    label: "Overview Metrics",
    navLabel: "Overview",
    path: "/admin",
    icon: "dashboard",
    subtitle: "Live platform KPIs and high-level operational visibility",
    description:
      "Monitor trust, uptime, and health indicators before drilling into modules.",
  },
  {
    key: "users",
    label: "User Management",
    navLabel: "Users",
    path: "/admin/users",
    icon: "group",
    subtitle: "Roles, permissions, and account governance",
    description:
      "Review user activity, approval queues, and privileged role assignments.",
  },
  {
    key: "data-sources",
    label: "Data Sources",
    navLabel: "Data Sources",
    path: "/admin/data-sources",
    icon: "dataset",
    subtitle: "Document ingestion and source-level processing controls",
    description:
      "Upload legal documents, process sources, and manage source records.",
  },
  {
    key: "knowledge-monitoring",
    label: "Knowledge Monitoring",
    navLabel: "Knowledge Monitoring",
    path: "/admin/knowledge-monitoring",
    icon: "database",
    subtitle: "RAG chunk indexing and embedding health visibility",
    description:
      "Inspect indexed chunks, embedding models, and document-level processing status.",
  },
  {
    key: "logs",
    label: "AI Logs & Traceability",
    navLabel: "AI Logs",
    path: "/admin/logs",
    icon: "receipt_long",
    subtitle:
      "LLM auditing, correlation IDs, and end-to-end AI trace visibility",
    description:
      "Inspect AI decision logs, retrieval traces, token usage, and error paths for legal accountability.",
  },
  {
    key: "error-monitoring",
    label: "Error Monitoring",
    navLabel: "Errors",
    path: "/admin/error-monitoring",
    icon: "error",
    subtitle:
      "System failure visibility across LLM, database, and API boundaries",
    description:
      "Inspect operational failures, error types, and timestamps with quick access to detailed diagnostics.",
  },
  {
    key: "analytics",
    label: "Simple Analytics",
    navLabel: "Analytics",
    path: "/admin/analytics",
    icon: "insights",
    subtitle: "Basic usage insights across query volume and language usage",
    description:
      "Review daily query activity and language distribution to understand platform usage trends.",
  },
  {
    key: "settings",
    label: "System Settings",
    navLabel: "Settings",
    path: "/admin/settings",
    icon: "settings",
    subtitle:
      "Configuration for language, AI, retrieval, security, and integrations",
    description:
      "Manage system-wide settings including language support, AI parameters, RAG retrieval, security policies, and external integrations.",
  },
  {
    key: "settings-language",
    label: "Language Settings",
    navLabel: "Language",
    path: "/admin/settings/language",
    icon: "language",
    subtitle: "Multilingual support and translation configuration",
    description:
      "Enable or disable languages, set default language, and configure translation pipeline.",
  },
  {
    key: "settings-ai",
    label: "AI Model Settings",
    navLabel: "AI Settings",
    path: "/admin/settings/ai",
    icon: "smart_toy",
    subtitle: "LLM model selection and generation parameters",
    description:
      "Configure model selection, temperature, token limits, and generation behavior.",
  },
  {
    key: "settings-retrieval",
    label: "RAG Retrieval Settings",
    navLabel: "Retrieval",
    path: "/admin/settings/retrieval",
    icon: "search",
    subtitle: "Vector database and embedding configuration",
    description:
      "Configure top-K results, similarity threshold, embedding model, and chunking strategy.",
  },
  {
    key: "settings-security",
    label: "Security Settings",
    navLabel: "Security",
    path: "/admin/settings/security",
    icon: "security",
    subtitle: "Authentication, rate limiting, and access control",
    description:
      "Configure JWT expiry, rate limits, prompt validation, and account lockout policies.",
  },
  {
    key: "settings-integration",
    label: "Integration Settings",
    navLabel: "Integrations",
    path: "/admin/settings/integration",
    icon: "integration_instructions",
    subtitle: "External API and service configuration",
    description:
      "Manage OpenAI, Twilio, WhatsApp, and WebSocket integration settings.",
  },
];

export const ADMIN_MODULE_BY_PATH = ADMIN_MODULES.reduce<
  Record<string, AdminModule>
>((acc, module) => {
  acc[module.path] = module;
  return acc;
}, {});

// Hierarchical menu structure for sidebar with collapsible groups
export const ADMIN_MENU_ITEMS: Array<AdminModule | AdminMenuGroup> = [
  ADMIN_MODULES[0], // Overview
  ADMIN_MODULES[1], // Users
  ADMIN_MODULES[2], // Data Sources
  ADMIN_MODULES[3], // Knowledge Monitoring
  ADMIN_MODULES[4], // Logs
  ADMIN_MODULES[5], // Error Monitoring
  ADMIN_MODULES[6], // Analytics
  {
    key: "settings",
    label: "System Settings",
    navLabel: "Settings",
    path: "/admin/settings",
    icon: "settings",
    children: [
      ADMIN_MODULES.find((module) => module.key === "settings-language")!,
      ADMIN_MODULES.find((module) => module.key === "settings-ai")!,
      ADMIN_MODULES.find((module) => module.key === "settings-retrieval")!,
      ADMIN_MODULES.find((module) => module.key === "settings-security")!,
      ADMIN_MODULES.find((module) => module.key === "settings-integration")!,
    ],
  },
];
