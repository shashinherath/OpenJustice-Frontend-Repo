import React from "react";

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType>;
}

const HomePage = React.lazy(() => import("@/pages/HomePage"));
const ChatPage = React.lazy(() => import("@/pages/chat/ChatPage"));
const AnswerPage = React.lazy(() => import("@/pages/chat/AnswerPage"));
const PrivacyPolicyPage = React.lazy(
  () => import("@/pages/legal/PrivacyPolicyPage"),
);
const TermsOfServicePage = React.lazy(
  () => import("@/pages/legal/TermsOfServicePage"),
);
const AboutUsPage = React.lazy(() => import("@/pages/info/AboutUsPage"));
const ContactPage = React.lazy(() => import("@/pages/info/ContactPage"));
const HelpPage = React.lazy(() => import("@/pages/info/HelpPage"));
const ReleaseNotesPage = React.lazy(
  () => import("@/pages/info/ReleaseNotesPage"),
);
const AdminDashboard = React.lazy(() => import("@/pages/admin/AdminDashboard"));
const UserManagementPage = React.lazy(
  () => import("@/pages/admin/UserManagementPage"),
);
const AdminDataSourcesPage = React.lazy(
  () => import("@/pages/admin/AdminDataSourcesPage"),
);
const KnowledgeBasePage = React.lazy(
  () => import("@/pages/admin/KnowledgeBasePage"),
);
const RetrievalMonitoringPage = React.lazy(
  () => import("@/pages/admin/RetrievalMonitoringPage"),
);
const SecurityMonitoringPage = React.lazy(
  () => import("@/pages/admin/SecurityMonitoringPage"),
);
const AdminLogsPage = React.lazy(() => import("@/pages/admin/AdminLogsPage"));
const ErrorMonitoringPage = React.lazy(
  () => import("@/pages/admin/ErrorMonitoringPage"),
);
const AnalyticsPage = React.lazy(
  () => import("@/pages/admin/AdminAnalyticsPage"),
);
const PlatformAnalyticsPage = React.lazy(
  () => import("@/pages/admin/analytics/PlatformAnalyticsPage"),
);
const UsageAnalyticsPage = React.lazy(
  () => import("@/pages/admin/analytics/UsageAnalyticsPage"),
);
const CostAnalyticsPage = React.lazy(
  () => import("@/pages/admin/analytics/CostAnalyticsPage"),
);
const MultilingualAnalyticsPage = React.lazy(
  () => import("@/pages/admin/analytics/MultilingualAnalyticsPage"),
);
const RetrievalEvaluationPage = React.lazy(
  () => import("@/pages/admin/analytics/RetrievalEvaluationPage"),
);
const AIEvaluationMetricsPage = React.lazy(
  () => import("@/pages/admin/analytics/AIEvaluationMetricsPage"),
);
const ResearchMetricsPage = React.lazy(
  () => import("@/pages/admin/analytics/ResearchMetricsPage"),
);
const SettingsPage = React.lazy(() => import("@/pages/admin/SettingsPage"));
const LanguageSettingsPage = React.lazy(
  () => import("@/pages/admin/settings/LanguageSettingsPage"),
);
const AISettingsPage = React.lazy(
  () => import("@/pages/admin/settings/AISettingsPage"),
);
const RetrievalSettingsPage = React.lazy(
  () => import("@/pages/admin/settings/RetrievalSettingsPage"),
);
const SecuritySettingsPage = React.lazy(
  () => import("@/pages/admin/settings/SecuritySettingsPage"),
);
const PrivacySettingsPage = React.lazy(
  () => import("@/pages/admin/settings/PrivacySettingsPage"),
);
const IntegrationSettingsPage = React.lazy(
  () => import("@/pages/admin/settings/IntegrationSettingsPage"),
);
const TopicBrowserPage = React.lazy(
  () => import("@/pages/topics/TopicBrowserPage"),
);
const ResearchPage = React.lazy(() => import("@/pages/ResearchPage"));
const DeveloperPage = React.lazy(() => import("@/pages/DeveloperPage"));
const SignUpPage = React.lazy(() => import("@/pages/SignUpPage"));

export const APP_ROUTES: RouteConfig[] = [
  { path: "/", component: HomePage },
  { path: "/chat", component: ChatPage },
  { path: "/chat/library", component: ChatPage },
  { path: "/chat/lawyers", component: ChatPage },
  { path: "/chat/analyzer", component: ChatPage },
  { path: "/chat/:chatId", component: AnswerPage },
  { path: "/privacy-policy", component: PrivacyPolicyPage },
  { path: "/terms-of-service", component: TermsOfServicePage },
  { path: "/about-us", component: AboutUsPage },
  { path: "/contact", component: ContactPage },
  { path: "/help", component: HelpPage },
  { path: "/release-notes", component: ReleaseNotesPage },
  { path: "/admin", component: AdminDashboard },
  { path: "/admin/users", component: UserManagementPage },
  { path: "/admin/knowledge-monitoring", component: KnowledgeBasePage },
  {
    path: "/admin/retrieval-monitoring",
    component: RetrievalMonitoringPage,
  },
  { path: "/admin/security-monitoring", component: SecurityMonitoringPage },
  { path: "/admin/data-sources", component: AdminDataSourcesPage },
  { path: "/admin/logs", component: AdminLogsPage },
  { path: "/admin/error-monitoring", component: ErrorMonitoringPage },
  { path: "/admin/analytics", component: AnalyticsPage },
  { path: "/admin/analytics/platforms", component: PlatformAnalyticsPage },
  { path: "/admin/analytics/usage", component: UsageAnalyticsPage },
  { path: "/admin/analytics/cost", component: CostAnalyticsPage },
  {
    path: "/admin/analytics/multilingual",
    component: MultilingualAnalyticsPage,
  },
  {
    path: "/admin/analytics/retrieval-evaluation",
    component: RetrievalEvaluationPage,
  },
  {
    path: "/admin/analytics/ai-evaluation",
    component: AIEvaluationMetricsPage,
  },
  { path: "/admin/analytics/research-metrics", component: ResearchMetricsPage },
  { path: "/admin/settings", component: SettingsPage },
  { path: "/admin/settings/language", component: LanguageSettingsPage },
  { path: "/admin/settings/ai", component: AISettingsPage },
  { path: "/admin/settings/retrieval", component: RetrievalSettingsPage },
  { path: "/admin/settings/security", component: SecuritySettingsPage },
  { path: "/admin/settings/privacy", component: PrivacySettingsPage },
  { path: "/admin/settings/integration", component: IntegrationSettingsPage },
  { path: "/topics", component: TopicBrowserPage },
  { path: "/research", component: ResearchPage },
  { path: "/developers", component: DeveloperPage },
  { path: "/signup", component: SignUpPage },
];
