import React from "react";

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType>;
}

const HomePage = React.lazy(() => import("@/pages/HomePage"));
const ChatPage = React.lazy(() => import("@/pages/chat/ChatPage"));
const AnswerPage = React.lazy(() => import("@/pages/chat/AnswerPage"));
const PrivacyPolicyPage = React.lazy(() => import("@/pages/legal/PrivacyPolicyPage"));
const TermsOfServicePage = React.lazy(() => import("@/pages/legal/TermsOfServicePage"));
const AboutUsPage = React.lazy(() => import("@/pages/info/AboutUsPage"));
const ContactPage = React.lazy(() => import("@/pages/info/ContactPage"));
const HelpPage = React.lazy(() => import("@/pages/info/HelpPage"));
const ReleaseNotesPage = React.lazy(() => import("@/pages/info/ReleaseNotesPage"));
const AdminDashboard = React.lazy(() => import("@/pages/admin/AdminDashboard"));
const UserManagementPage = React.lazy(() => import("@/pages/admin/UserManagementPage"));
const KnowledgeBasePage = React.lazy(() => import("@/pages/admin/KnowledgeBasePage"));
const QueryMonitoringPage = React.lazy(() => import("@/pages/admin/QueryMonitoringPage"));
const AdminLogsPage = React.lazy(() => import("@/pages/admin/AdminLogsPage"));
const ErrorMonitoringPage = React.lazy(() => import("@/pages/admin/ErrorMonitoringPage"));
const AnalyticsPage = React.lazy(() => import("@/pages/admin/AnalyticsPage"));
const SettingsPage = React.lazy(() => import("@/pages/admin/SettingsPage"));
const TopicBrowserPage = React.lazy(() => import("@/pages/topics/TopicBrowserPage"));
const ResearchPage = React.lazy(() => import("@/pages/ResearchPage"));
const DeveloperPage = React.lazy(() => import("@/pages/DeveloperPage"));
const SignUpPage = React.lazy(() => import("@/pages/SignUpPage"));

export const APP_ROUTES: RouteConfig[] = [
  { path: "/", component: HomePage },
  { path: "/chat", component: ChatPage },
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
  { path: "/admin/query-monitoring", component: QueryMonitoringPage },
  { path: "/admin/data-sources", component: KnowledgeBasePage },
  { path: "/admin/logs", component: AdminLogsPage },
  { path: "/admin/error-monitoring", component: ErrorMonitoringPage },
  { path: "/admin/analytics", component: AnalyticsPage },
  { path: "/admin/settings", component: SettingsPage },
  { path: "/topics", component: TopicBrowserPage },
  { path: "/research", component: ResearchPage },
  { path: "/developers", component: DeveloperPage },
  { path: "/signup", component: SignUpPage },
];