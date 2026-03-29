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
const TopicBrowserPage = React.lazy(() => import("@/pages/topics/TopicBrowserPage"));

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
  { path: "/topics", component: TopicBrowserPage },
];