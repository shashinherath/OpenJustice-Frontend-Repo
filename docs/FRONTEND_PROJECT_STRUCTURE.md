# OpenJustice Frontend — Project Structure & Guidelines

## 🎯 Project Overview

**OpenJustice** is an AI-powered legal assistant platform providing multilingual legal Q&A, voice-enabled chat interactions, and a comprehensive admin panel for monitoring and analytics. Built as a Sri Lanka–focused legal aid tool, it supports English, Sinhala, and Tamil through a React single-page application with a FastAPI backend.

The frontend is responsible for:

- A public **homepage** with feature overview, topic browsing, and user sign-up.
- An authenticated **chat interface** supporting text and voice messages, with real-time AI streaming responses.
- A role-gated **admin panel** for platform analytics, data source management, security monitoring, retrieval evaluation, user management, and system settings.
- Full **trilingual support** (English / Sinhala / Tamil) powered by `i18next`, with per-user language preferences synced to the backend.
- **Theme toggling** (light / dark) with system-preference detection and accent color customization.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 |
| **Language** | TypeScript ~5.9 |
| **Build Tool** | Vite 7 |
| **Styling** | TailwindCSS 4 |
| **State Management** | Zustand 5 (with `persist` middleware) + React Context |
| **Routing** | React Router DOM 7 |
| **Data Fetching** | Axios (with interceptors) |
| **UI Components** | Radix UI primitives (Dialog, Dropdown Menu, Tabs, Tooltip) |
| **Styling Utilities** | class-variance-authority (CVA), clsx, tailwind-merge |
| **Icons** | Lucide React |
| **Internationalization** | i18next + react-i18next + i18next-browser-languagedetector |
| **Voice Interface** | MediaRecorder API + Web Audio API (AnalyserNode) + WaveSurfer.js |
| **Real-time Communication** | Socket.IO Client |
| **Testing** | Vitest + React Testing Library + jsdom |
| **Linting** | ESLint 9 + typescript-eslint + react-hooks + react-refresh |

---

## 📁 Project Structure

The tree below shows every file and directory that currently exists in the project. Empty directories that are reserved for future use are noted with `(empty)`.

```
src/
├── assets/                       # Static assets
│   ├── images/                   # (empty — reserved for images/logos)
│   ├── sounds/                   # (empty — reserved for notification audio)
│   ├── legal-docs/               # (empty — reserved for sample legal docs)
│   └── react.svg                 # Default Vite/React logo
│
├── components/                   # Reusable UI components
│   ├── admin/                    # Admin dashboard components
│   │   ├── ActivityItem.tsx      # Recent activity entry
│   │   ├── AdminHeader.tsx       # Admin top header bar
│   │   ├── AdminModulePageTemplate.tsx  # Reusable admin page shell
│   │   ├── AdminSidebar.tsx      # Admin navigation sidebar
│   │   ├── DataSourceStatusItem.tsx     # Data source status card
│   │   └── StatCard.tsx          # Metric statistic card
│   │
│   ├── chat/                     # Chat-specific components
│   │   └── ConversationComposer.tsx  # Message input & send controls
│   │
│   ├── analyzer/                 # Document analysis components
│   │   └── DocumentAnalyzer.tsx  # Legal document analyzer UI
│   │
│   ├── lawyers/                  # Lawyer directory components
│   │   └── LawyerDirectory.tsx   # Searchable lawyer directory
│   │
│   ├── library/                  # Legal library components
│   │   └── LegalLibrary.tsx      # Case law & document library
│   │
│   ├── common/                   # Shared generic components
│   │   └── MarkdownText.tsx      # Renders markdown with syntax highlighting
│   │
│   ├── navigation/               # Navigation components
│   │   ├── BrowseHeader.tsx      # Header for browse/topic pages
│   │   ├── Navbar.tsx            # Main site navigation bar
│   │   └── Sidebar.tsx           # Chat sidebar with conversation list
│   │
│   ├── profile/                  # User profile components
│   │   └── ProfileModal.tsx      # Profile edit modal dialog
│   │
│   ├── settings/                 # Settings components
│   │   └── SettingsModal.tsx     # Settings modal dialog
│   │
│   ├── ui/                       # Base UI primitives (Radix wrappers)
│   │   ├── BrandLogo.tsx         # App logo component
│   │   ├── ChatActionModal.tsx   # Chat action confirmation modal
│   │   ├── ConstellationBackground.tsx # Interactive background effect
│   │   ├── FeatureCard.tsx       # Homepage feature showcase card
│   │   ├── LanguageSelect.tsx    # Language dropdown selector
│   │   ├── LanguageSwitcherButton.tsx  # Language toggle button
│   │   ├── LoginModal.tsx        # Login/auth modal
│   │   ├── ThemeToggleButton.tsx # Dark/light mode toggle button
│   │   ├── TopicCard.tsx         # Legal topic browsing card
│   │   ├── VoiceMessagePlayer.tsx # Audio playback for voice messages
│   │   └── VoiceRecordingUI.tsx  # Voice recording interface
│   │
│   ├── voice/                    # (empty — reserved for voice components)
│   └── whatsapp/                 # (empty — reserved for WhatsApp components)
│
├── config/                       # Configuration files
│   ├── api.config.ts             # API base URL & timeout
│   ├── branding.ts               # Logo path & alt text constants
│   ├── i18n.config.ts            # i18next initialization
│   ├── routes.config.tsx         # Centralized route definitions (lazy-loaded)
│   └── socket.config.ts          # WebSocket connection URL & transport
│
├── constants/                    # Application constants
│   ├── admin-flow.ts             # Admin panel flow/navigation constants
│   ├── app-config.ts             # App name, storage keys, defaults
│   └── languages.ts              # Supported language codes & labels
│
├── contexts/                     # React Context providers
│   ├── LanguageContext.tsx        # Language state & admin language settings
│   ├── SettingsModalContext.tsx   # Settings/Profile modal open/close state
│   └── ThemeContext.tsx           # Light/dark theme toggle & accent color
│
├── hooks/                        # Custom React hooks
│   ├── useRecaptcha.ts           # Google reCAPTCHA v3 hook
│   ├── useVoiceRecording.ts      # Full voice recording lifecycle hook
│   ├── auth/                     # (empty — reserved)
│   ├── chat/                     # (empty — reserved)
│   ├── common/
│   │   ├── useSettingsModal.ts   # Access SettingsModalContext
│   │   └── useTheme.ts          # Access ThemeContext
│   ├── legal/                    # (empty — reserved)
│   ├── voice/                    # (empty — reserved)
│   └── websocket/                # (empty — reserved)
│
├── layout/                       # Layout wrapper components
│   ├── AdminLayout.tsx           # Admin sidebar + header shell
│   ├── BrowseLayout.tsx          # Browse pages header + content
│   ├── ChatLayout.tsx            # Chat sidebar + main content
│   ├── MainLayout.tsx            # Public pages — Navbar + footer
│   └── PrivacyPolicyLayout.tsx   # Legal/policy page layout
│
├── lib/                          # Utility libraries
│   └── utils.ts                  # `cn()` helper — clsx + tailwind-merge
│
├── locales/                      # Translation files
│   ├── en/
│   │   └── translation.ts        # English translations
│   ├── si/
│   │   └── translation.ts        # Sinhala translations
│   ├── ta/
│   │   └── translation.ts        # Tamil translations
│   └── index.ts                  # Barrel export for locale resources
│
├── pages/                        # Page components (route targets)
│   ├── admin/
│   │   ├── AdminDashboard.tsx    # Admin overview with stats & charts
│   │   ├── AdminDataSourcesPage.tsx   # Data source management
│   │   ├── AdminLogsPage.tsx     # Trace logs viewer
│   │   ├── AdminAnalyticsPage.tsx     # Analytics hub
│   │   ├── AdminModerationPage.tsx    # Content moderation (stub)
│   │   ├── AdminReportsPage.tsx       # Reports (stub)
│   │   ├── AdminSettingsPage.tsx      # Settings (stub)
│   │   ├── AdminUsersPage.tsx         # Users (stub)
│   │   ├── AnalyticsPage.tsx     # Analytics overview
│   │   ├── ErrorMonitoringPage.tsx    # Error monitoring dashboard
│   │   ├── HealthStatusPage.tsx  # System health status
│   │   ├── KnowledgeBasePage.tsx # Knowledge base monitoring
│   │   ├── RetrievalMonitoringPage.tsx  # RAG retrieval metrics
│   │   ├── SecurityMonitoringPage.tsx   # Security overview
│   │   ├── SettingsPage.tsx      # Admin settings hub
│   │   ├── UserManagementPage.tsx     # User list & status management
│   │   ├── analytics/
│   │   │   ├── AIEvaluationMetricsPage.tsx
│   │   │   ├── CostAnalyticsPage.tsx
│   │   │   ├── MultilingualAnalyticsPage.tsx
│   │   │   ├── PlatformAnalyticsPage.tsx
│   │   │   ├── ResearchMetricsPage.tsx
│   │   │   ├── RetrievalEvaluationPage.tsx
│   │   │   └── UsageAnalyticsPage.tsx
│   │   ├── security/             # (empty — reserved)
│   │   └── settings/
│   │       ├── AISettingsPage.tsx
│   │       ├── IntegrationSettingsPage.tsx
│   │       ├── LanguageSettingsPage.tsx
│   │       ├── PrivacySettingsPage.tsx
│   │       ├── RetrievalSettingsPage.tsx
│   │       └── SecuritySettingsPage.tsx
│   │
│   ├── auth/                     # Authentication pages (reserved)
│   ├── chat/
│   │   ├── ChatPage.tsx          # New chat / conversation list
│   │   └── AnswerPage.tsx        # Active conversation view
│   │
│   ├── info/
│   │   ├── AboutUsPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── HelpPage.tsx
│   │   └── ReleaseNotesPage.tsx
│   │
│   ├── legal/
│   │   ├── PrivacyPolicyPage.tsx
│   │   └── TermsOfServicePage.tsx
│   │
│   ├── settings/
│   │   └── SettingsPage.tsx      # User-facing settings page
│   │
│   ├── topics/
│   │   └── TopicBrowserPage.tsx  # Legal topic browser
│   │
│   ├── voice/                    # (empty — reserved)
│   ├── whatsapp/                 # (empty — reserved)
│   ├── dashboard/                # (empty — reserved)
│   ├── DeveloperPage.tsx         # Developer/API information page
│   ├── HomePage.tsx              # Public landing page
│   ├── NotFoundPage.tsx          # 404 Error page
│   ├── ResearchPage.tsx          # Research overview page
│   ├── SignUpPage.tsx            # User registration page
│   └── VerifyEmailPage.tsx       # Email verification handling page
│
├── services/                     # API service layer
│   ├── apiClient.ts              # Axios instance with 401 interceptor
│   ├── authService.ts            # Login, register, logout, profile CRUD
│   ├── chatService.ts            # Conversations, messages, streaming, voice
│   ├── adminService.ts           # Admin overview, users, logs, analytics
│   ├── adminDataSourcesService.ts # Data source CRUD
│   ├── adminKnowledgeService.ts  # Knowledge base operations
│   ├── analyzerService.ts        # Document analysis service
│   ├── libraryService.ts         # Legal library service
│   └── socketService.ts          # Socket.IO singleton connection
│
├── stores/                       # Zustand state management
│   ├── authStore.ts              # Auth state with persist (login, profile, password)
│   ├── chatStore.ts              # Chat state with persist (conversations, messages, streaming)
│   ├── voiceStore.ts             # Voice recording state (recording, audio blob, transcript)
│   ├── uiStore.ts                # UI state (sidebar, modals)
│   ├── notificationStore.ts      # Toast notification queue
│   ├── adminStore.ts             # Admin overview & evaluation data
│   ├── adminDataSourcesStore.ts  # Admin data sources state
│   ├── adminKnowledgeStore.ts    # Admin knowledge base state
│   ├── adminUsersStore.ts        # Admin user management state
│   └── libraryStore.ts           # Legal library global state
│
├── styles/                       # Global styles
│   ├── index.css                 # Tailwind imports, theme tokens, scrollbar styles
│   └── themes.css                # Theme CSS variables
│
├── types/                        # TypeScript type definitions
│   ├── index.ts                  # Barrel re-export of all types
│   ├── api.types.ts              # Generic API response/error shapes
│   ├── auth.types.ts             # Login/Register request/response types
│   ├── chat.types.ts             # Chat messages, conversations, API DTOs
│   ├── legal.types.ts            # Legal topic & citation interfaces
│   ├── user.types.ts             # User interface with preferences
│   └── voice.types.ts            # Voice state interface
│
├── utils/                        # Utility functions
│   ├── audioUtils.ts             # Blob-to-DataURL converter
│   ├── routeRenderer.tsx         # Route rendering with layout selection & auth guards
│   └── urlUtils.ts               # URL parsing and formatting utilities
│
├── App.tsx                       # Root component (Router, ScrollToTop, global modals)
└── main.tsx                      # Application entry point (providers, render)
```

---

## 🏗️ Architecture Patterns

### 1. Application Entry Point

The application bootstraps in `main.tsx` by wrapping the `<App />` component with three context providers: `ThemeProvider` for dark/light mode, `LanguageProvider` for i18n, and `SettingsModalProvider` for controlling the settings and profile modals.

Note that the app does **not** use `BrowserRouter` at the top level — the `<Router>` is inside `App.tsx` itself, because certain hooks (like `useLocation` in `ScrollToTop`) require the router context at the component level.

```typescript
// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/themes.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { SettingsModalProvider } from './contexts/SettingsModalContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <SettingsModalProvider>
          <App />
        </SettingsModalProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
```

The `App` component sets up React Router, a `ScrollToTop` utility that scrolls to the top of the page on route changes, renders all routes through `renderRoutes()`, and mounts the global `SettingsModal` and `ProfileModal` overlays.

```typescript
// App.tsx
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { APP_ROUTES } from "@/config/routes.config";
import { renderRoutes } from "@/utils/routeRenderer";
import SettingsModal from "@/components/settings/SettingsModal";
import ProfileModal from "@/components/profile/ProfileModal";
import { useSettingsModal } from "@/hooks/common/useSettingsModal";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  const { isSettingsOpen, isProfileOpen, closeSettings, closeProfile } =
    useSettingsModal();

  return (
    <Router>
      <ScrollToTop />
      <Routes>{renderRoutes(APP_ROUTES)}</Routes>
      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
      <ProfileModal isOpen={isProfileOpen} onClose={closeProfile} />
    </Router>
  );
}

export default App;
```

---

### 2. Routing Architecture

**Pattern:** Centralized route configuration with lazy loading and layout-aware rendering.

All routes are declared in a single `APP_ROUTES` array inside `routes.config.tsx`. Every page component is lazy-loaded with `React.lazy()` for automatic code-splitting. The route configuration uses a minimal `RouteConfig` interface — there are no `requiresAuth` flags on the route objects themselves; instead, authentication and authorization are handled by the `routeRenderer.tsx` utility which wraps routes in layout shells and auth guards based on the URL path.

```typescript
// config/routes.config.tsx
import React from "react";

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType>;
}

const HomePage = React.lazy(() => import("@/pages/HomePage"));
const ChatPage = React.lazy(() => import("@/pages/chat/ChatPage"));
const AnswerPage = React.lazy(() => import("@/pages/chat/AnswerPage"));
const AdminDashboard = React.lazy(() => import("@/pages/admin/AdminDashboard"));
const SignUpPage = React.lazy(() => import("@/pages/SignUpPage"));
// ... 30+ additional lazy imports

export const APP_ROUTES: RouteConfig[] = [
  { path: "/", component: HomePage },
  { path: "/chat", component: ChatPage },
  { path: "/chat/:chatId", component: AnswerPage },
  { path: "/admin", component: AdminDashboard },
  { path: "/admin/users", component: UserManagementPage },
  { path: "/admin/analytics", component: AnalyticsPage },
  { path: "/admin/settings", component: SettingsPage },
  { path: "/topics", component: TopicBrowserPage },
  { path: "/research", component: ResearchPage },
  { path: "/developers", component: DeveloperPage },
  { path: "/signup", component: SignUpPage },
  // ... additional routes for admin sub-pages, legal pages, info pages
];
```

#### Route Rendering & Auth Guards

The `routeRenderer.tsx` utility maps the flat route array into `<Route>` elements, automatically wrapping each page in the appropriate layout and auth guard based on the URL path prefix. This approach keeps the route config clean while centralizing layout and permission logic.

- `/` — `MainLayout` (public — Navbar + footer)
- `/chat` and `/chat/:chatId` — `RequireAuth` + `ChatLayout` (sidebar + main)
- `/admin` and `/admin/*` — `RequireAdmin` + `AdminLayout` (admin sidebar + header)
- All other paths — no layout wrapper (standalone pages)

```typescript
// utils/routeRenderer.tsx
import React, { Suspense } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import type { RouteConfig } from "@/config/routes.config";
import MainLayout from "@/layout/MainLayout";
import ChatLayout from "@/layout/ChatLayout";
import AdminLayout from "@/layout/AdminLayout";
import { useAuthStore } from "@/stores/authStore";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    const redirect = `${location.pathname}${location.search}`;
    return (
      <Navigate
        to={`/?login=1&redirect=${encodeURIComponent(redirect)}`}
        replace
      />
    );
  }

  return <>{children}</>;
};

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);
  const location = useLocation();

  if (!isAuthenticated) {
    const redirect = `${location.pathname}${location.search}`;
    return (
      <Navigate
        to={`/?login=1&redirect=${encodeURIComponent(redirect)}`}
        replace
      />
    );
  }

  if (userRole !== "admin") {
    return <Navigate to="/chat" replace />;
  }

  return <>{children}</>;
};

const withLayout = (path: string, content: React.ReactNode) => {
  if (path === "/") {
    return <MainLayout>{content}</MainLayout>;
  }
  if (path === "/chat" || path.startsWith("/chat/")) {
    return (
      <RequireAuth>
        <ChatLayout>{content}</ChatLayout>
      </RequireAuth>
    );
  }
  if (path === "/admin" || path.startsWith("/admin/")) {
    return (
      <RequireAdmin>
        <AdminLayout>{content}</AdminLayout>
      </RequireAdmin>
    );
  }
  return content;
};

export const renderRoutes = (routes: RouteConfig[]) =>
  routes.map(({ path, component: Component }) => {
    const page = withLayout(path, <Component />);
    return (
      <Route
        key={path}
        path={path}
        element={
          <Suspense fallback={<div className="p-4 text-sm text-slate-500">Loading...</div>}>
            {page}
          </Suspense>
        }
      />
    );
  });
```

---

### 3. State Management Strategy

The project uses a **dual approach** to state management:

- **Zustand stores** — For global, cross-component state that may need persistence (auth, chat, voice, admin, UI, notifications). Stores use Zustand's `persist` middleware where appropriate to survive page reloads.
- **React Context** — For app-wide settings that require React tree propagation (theme, language, modal open/close state). Contexts are thin wrappers that hold state and expose setter callbacks.

#### Zustand Stores

**Auth Store** — Manages user session with localStorage persistence. Handles login, logout, profile loading from the backend, profile updates, and password changes. Automatically syncs the user's preferred language via i18n on login and profile load.

```typescript
// stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user.types";
import { authService } from "@/services/authService";
import i18n from "@/config/i18n.config";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  userRole: string | null;
  isLoadingProfile: boolean;

  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
  clearSession: () => void;
  updateUser: (data: Partial<User>) => void;
  loadProfile: () => Promise<void>;
  updateProfileFromBackend: (data: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      userRole: null,
      isLoadingProfile: false,

      login: (user, token) => {
        const lang = user?.preferences?.language;
        if (lang) {
          void i18n.changeLanguage(lang);
        }
        set({
          user,
          token,
          isAuthenticated: true,
          userRole: user.role || null,
        });
      },

      logout: async () => {
        await authService.logout();
        void i18n.changeLanguage("en");
        set({ user: null, token: null, isAuthenticated: false, userRole: null });
      },

      clearSession: () => {
        set({ user: null, token: null, isAuthenticated: false, userRole: null, isLoadingProfile: false });
      },

      loadProfile: async () => {
        try {
          set({ isLoadingProfile: true });
          const profile = await authService.getProfile();
          const userData: User = {
            id: profile.uuid,
            name: profile.first_name
              ? `${profile.first_name} ${profile.last_name || ""}`.trim()
              : "User",
            email: profile.email || "",
            role: profile.role,
            avatarUrl: profile.avatar_url,
            preferences: { language: profile.preferred_language },
          };
          if (profile.preferred_language) {
            void i18n.changeLanguage(profile.preferred_language);
          }
          set({ user: userData, isAuthenticated: true, userRole: profile.role });
        } catch (error) {
          console.error("Failed to load profile:", error);
          throw error;
        } finally {
          set({ isLoadingProfile: false });
        }
      },

      // ... updateProfileFromBackend, changePassword
    }),
    { name: "oj-auth-store" },
  ),
);
```

**Chat Store** — The most complex store. Manages the conversation list, sidebar state, per-conversation messages, and streaming AI responses. Uses `persist` to cache conversations and messages across reloads. Key features include:

- **Optimistic updates** — User messages appear instantly before the API responds.
- **Streaming AI responses** — The `sendMessageToChat` action uses `completeMessageStream` (which reads from a `ReadableStream` via the Fetch API) to incrementally append AI response chunks.
- **Voice message support** — The `sendVoiceMessageToChat` action sends an audio blob, then reloads the conversation from the backend to get the transcribed messages.
- **Sidebar management** — Tracks pinned, archived, and renamed conversations.

```typescript
// stores/chatStore.ts (simplified — full file is ~530 lines)
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatMessage, Conversation } from "../types/chat.types";
import { chatService } from "../services/chatService";

interface ChatStore {
  conversations: Conversation[];
  activeConversationId: string | null;
  isTyping: boolean;
  sidebarChats: SidebarChatItem[];
  chatMessagesById: Record<string, ChatMessage[]>;
  isLoading: boolean;
  error: string | null;

  loadConversations: () => Promise<void>;
  loadConversation: (id: string) => Promise<void>;
  createNewChat: (title?: string) => Promise<string>;
  sendMessageToChat: (chatId: string, question: string) => Promise<void>;
  sendVoiceMessageToChat: (chatId: string, audioBlob: Blob) => Promise<void>;
  archiveChat: (id: string) => Promise<void>;
  deleteChat: (id: string) => Promise<void>;
  renameChat: (id: string, title: string) => Promise<void>;
  pinChat: (id: string) => Promise<void>;
  // ... additional actions
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // ... state & actions (see source for full implementation)

      sendMessageToChat: async (chatId, question) => {
        // 1. Create optimistic user message + empty AI message placeholder
        // 2. Append both to chatMessagesById[chatId]
        // 3. Call chatService.completeMessageStream() with an onChunk callback
        // 4. Each chunk appends to the AI message's content in real-time
        // 5. On error, remove the optimistic messages
      },

      sendVoiceMessageToChat: async (chatId, audioBlob) => {
        // 1. Create optimistic voice message with blob URL
        // 2. Send audio via chatService.sendVoiceMessage()
        // 3. Reload conversation from backend (gets transcription + AI reply)
        // 4. Auto-play the returned AI audio response
      },
    }),
    {
      name: "oj-chat-store",
      partialize: (state) => ({
        activeConversationId: state.activeConversationId,
        sidebarChats: state.sidebarChats,
        chatMessagesById: state.chatMessagesById,
      }),
    },
  ),
);
```

**Voice Store** — Lightweight store tracking the current recording state (isRecording, isPaused, duration), the captured audio blob, and the transcription result.

```typescript
// stores/voiceStore.ts
import { create } from "zustand";

interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
}

interface VoiceStore {
  recordingState: RecordingState;
  audioBlob: Blob | null;
  transcript: string;

  setRecordingState: (state: Partial<RecordingState>) => void;
  setAudioBlob: (blob: Blob | null) => void;
  setTranscript: (text: string) => void;
  reset: () => void;
}

export const useVoiceStore = create<VoiceStore>((set) => ({
  recordingState: { isRecording: false, isPaused: false, duration: 0 },
  audioBlob: null,
  transcript: "",

  setRecordingState: (state) =>
    set((prev) => ({ recordingState: { ...prev.recordingState, ...state } })),
  setAudioBlob: (blob) => set({ audioBlob: blob }),
  setTranscript: (text) => set({ transcript: text }),
  reset: () =>
    set({
      recordingState: { isRecording: false, isPaused: false, duration: 0 },
      audioBlob: null,
      transcript: "",
    }),
}));
```

**Other Stores:**

| Store | Purpose |
|---|---|
| `uiStore.ts` | Sidebar open/close, active modal tracking |
| `notificationStore.ts` | Toast notification queue (add, remove, clearAll) |
| `adminStore.ts` | Admin dashboard overview, AI evaluation, research metrics data |
| `adminDataSourcesStore.ts` | Admin data sources list & management state |
| `adminKnowledgeStore.ts` | Admin knowledge base monitoring state |
| `adminUsersStore.ts` | Admin user list & status management state |

#### React Contexts

**Theme Context** — Detects the system color scheme preference on first load, persists the user's choice to localStorage, and applies the `.dark` / `.light` class to `<html>`. Also manages an accent color CSS variable (`--oj-accent-color`).

```typescript
// contexts/ThemeContext.tsx
import React, { createContext, useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "oj-theme";
const ACCENT_STORAGE_KEY = "oj-accent-color";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  };

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

**Language Context** — Manages the current language, available languages (can be narrowed by admin settings), default language, and a translation pipeline toggle. Initializes from localStorage with fallback to `SUPPORTED_LANGUAGES`. The `updateLanguageSettings` method allows admins to configure which languages are enabled across the platform.

```typescript
// contexts/LanguageContext.tsx (simplified)
import React, { createContext, useState, useCallback } from "react";
import i18n from "@/config/i18n.config";
import { SUPPORTED_LANGUAGES, type AppLanguage } from "@/constants/languages";

interface LanguageContextType {
  currentLanguage: AppLanguage;
  availableLanguages: AppLanguage[];
  defaultLanguage: AppLanguage;
  translationPipelineEnabled: boolean;
  changeLanguage: (lang: AppLanguage) => Promise<void>;
  updateLanguageSettings: (payload: LanguageSettingsPayload) => Promise<void>;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Reads enabled languages and default from localStorage
  // Falls back to SUPPORTED_LANGUAGES (["en", "si", "ta"])
  const [currentLanguage, setCurrentLanguage] = useState<AppLanguage>(/* resolved */);
  const [availableLanguages, setAvailableLanguages] = useState<AppLanguage[]>(/* from storage */);

  const changeLanguage = useCallback(async (lang: AppLanguage) => {
    if (!availableLanguages.includes(lang)) return;
    await i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    localStorage.setItem("preferred-language", lang);
  }, [availableLanguages]);

  // updateLanguageSettings: allows admin to enable/disable languages platform-wide

  return (
    <LanguageContext.Provider value={{ currentLanguage, availableLanguages, /* ... */ }}>
      {children}
    </LanguageContext.Provider>
  );
};
```

**Settings Modal Context** — A simple context that tracks whether the Settings and Profile modals are open, and exposes open/close callbacks. This lets any component in the tree (e.g., the sidebar user menu) open a modal without prop drilling.

```typescript
// contexts/SettingsModalContext.tsx
import React, { createContext, useCallback, useState } from "react";

export interface SettingsModalContextType {
  isSettingsOpen: boolean;
  isProfileOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  openProfile: () => void;
  closeProfile: () => void;
}

export const SettingsModalContext = createContext<SettingsModalContextType | undefined>(undefined);

export const SettingsModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <SettingsModalContext.Provider
      value={{
        isSettingsOpen,
        isProfileOpen,
        openSettings: useCallback(() => setIsSettingsOpen(true), []),
        closeSettings: useCallback(() => setIsSettingsOpen(false), []),
        openProfile: useCallback(() => setIsProfileOpen(true), []),
        closeProfile: useCallback(() => setIsProfileOpen(false), []),
      }}
    >
      {children}
    </SettingsModalContext.Provider>
  );
};
```

---

### 4. API Layer Architecture

#### API Client Setup

The Axios client is configured with the base URL from environment variables, a 10-second timeout, and `withCredentials: true` for cookie-based authentication. The response interceptor handles 401 errors globally — if the user is on the homepage it dispatches a custom event to open the login modal; otherwise it redirects to `/?login=1`.

Certain paths (`/auth/login`, `/auth/register`, `/auth/logout`) are excluded from the 401 handling to avoid redirect loops during authentication flows.

```typescript
// services/apiClient.ts
import axios from "axios";
import { API_CONFIG } from "@/config/api.config";

const LOGIN_MODAL_OPEN_EVENT = "oj:open-login-modal";
const AUTH_SESSION_EXPIRED_KEY = "oj-auth-session-expired";
const IGNORED_UNAUTHORIZED_PATHS = new Set([
  "/auth/login",
  "/auth/register",
  "/auth/logout",
]);

const handleUnauthorizedResponse = (requestUrl?: string) => {
  if (typeof window === "undefined") return;

  const requestPath = getRequestPath(requestUrl);
  if (IGNORED_UNAUTHORIZED_PATHS.has(requestPath)) return;

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
  headers: { "Content-Type": "application/json" },
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
```

#### Service Layer

Each service module wraps API calls for a specific domain, returning typed responses. Services are plain objects with async methods — they are **not** classes.

**Auth Service** — Handles login, registration, logout, profile retrieval, profile updates, and password changes.

```typescript
// services/authService.ts
import { apiClient } from "./apiClient";
import type { LoginRequest, RegisterRequest, LoginResponse, RegisterResponse } from "@/types/auth.types";

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>("/auth/register", userData);
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  getProfile: async (): Promise<UserProfileResponse> => {
    const response = await apiClient.get<{ data: UserProfileResponse }>("/auth/me");
    return response.data.data;
  },

  updateProfile: async (profileData: UpdateProfileRequest): Promise<UserProfileResponse> => {
    const response = await apiClient.patch<{ data: UserProfileResponse }>("/auth/users/me", profileData);
    return response.data.data;
  },

  changePassword: async (passwordData: ChangePasswordRequest): Promise<void> => {
    await apiClient.post("/auth/change-password", passwordData);
  },
};
```

**Chat Service** — Provides conversation CRUD, message creation, AI response streaming via the Fetch API's `ReadableStream`, and voice message upload. The streaming endpoint (`/chats/:id/messages/complete`) uses native `fetch` instead of Axios because Axios does not support streaming responses.

```typescript
// services/chatService.ts
import { apiClient } from "@/services/apiClient";

export const chatService = {
  async listConversations(skip = 0, limit = 100): Promise<ApiConversationResponse[]> {
    const response = await apiClient.get<ApiConversationResponse[]>("/chats", {
      params: { skip, limit },
    });
    return response.data;
  },

  async createConversation(payload: ApiConversationCreate): Promise<ApiConversationResponse> {
    const response = await apiClient.post<ApiConversationResponse>("/chats", payload);
    return response.data;
  },

  async getConversation(conversationId: string): Promise<ApiConversationDetailResponse> {
    const response = await apiClient.get<ApiConversationDetailResponse>(`/chats/${conversationId}`);
    return response.data;
  },

  async deleteConversation(conversationId: string): Promise<void> {
    await apiClient.delete(`/chats/${conversationId}`);
  },

  async completeMessageStream(
    conversationId: string,
    payload: ApiMessageCompleteRequest,
    onChunk: (chunk: string) => void,
  ): Promise<void> {
    const baseUrl = apiClient.defaults.baseURL || "";
    const response = await fetch(
      `${baseUrl}/chats/${conversationId}/messages/complete`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok || !response.body) {
      throw new Error("Failed to stream AI response.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const result = await reader.read();
      done = result.done;
      if (result.value) {
        const chunk = decoder.decode(result.value, { stream: !done });
        if (chunk) onChunk(chunk);
      }
    }
  },

  async sendVoiceMessage(conversationId: string, audioBlob: Blob): Promise<Blob> {
    const formData = new FormData();
    formData.append("file", audioBlob, "voice_note.webm");
    const response = await apiClient.post(
      `/chats/${conversationId}/messages/voice`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      },
    );
    return response.data as Blob;
  },
};
```

---

### 5. WebSocket Integration

WebSocket connectivity is provided through Socket.IO. The configuration and connection are lightweight — a simple singleton pattern exposed via `getSocket()` and `disconnectSocket()`.

```typescript
// config/socket.config.ts
export const SOCKET_CONFIG = {
  url: import.meta.env.VITE_SOCKET_URL || "http://localhost:8000",
  transports: ["websocket"] as const,
};
```

```typescript
// services/socketService.ts
import { io, type Socket } from "socket.io-client";
import { SOCKET_CONFIG } from "@/config/socket.config";

let socketInstance: Socket | null = null;

export const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(SOCKET_CONFIG.url, {
      transports: [...SOCKET_CONFIG.transports],
    });
  }
  return socketInstance;
};

export const disconnectSocket = () => {
  socketInstance?.disconnect();
  socketInstance = null;
};
```

---

### 6. Voice Recording System

The `useVoiceRecording` hook encapsulates the full voice recording lifecycle using the browser's `MediaRecorder` API and `Web Audio API`. It provides start, pause, resume, stop, and cancel operations, along with real-time voice level analysis for audio visualizations.

Key implementation details:

- **MIME type negotiation** — Falls back through `audio/webm;codecs=opus` → `audio/webm` → `audio/mp4` depending on browser support.
- **Audio analysis** — Uses an `AnalyserNode` connected to the microphone stream to compute a normalized volume level (0–100) on every animation frame, which drives the waveform UI.
- **Pause/resume** — Pauses the `MediaRecorder` and stops the analysis loop; resuming restarts both.
- **Cleanup** — All streams, audio contexts, intervals, and animation frames are properly cleaned up on stop, cancel, or component unmount.

```typescript
// hooks/useVoiceRecording.ts (key sections)
import { useEffect, useRef, useState } from "react";
import { useVoiceStore } from "@/stores/voiceStore";

export const useVoiceRecording = () => {
  const { setRecordingState, setAudioBlob, reset } = useVoiceStore();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [voiceLevel, setVoiceLevel] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    });

    // Setup AudioContext + AnalyserNode for voice level monitoring
    const audioContext = new AudioContext();
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;
    audioContext.createMediaStreamSource(stream).connect(analyzer);

    // Create MediaRecorder with MIME fallback
    let mimeType = "audio/webm;codecs=opus";
    if (!MediaRecorder.isTypeSupported(mimeType)) mimeType = "audio/webm";

    const mediaRecorder = new MediaRecorder(stream, { mimeType });
    mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    mediaRecorder.onstop = () => {
      setAudioBlob(new Blob(chunksRef.current, { type: mimeType }));
      audioContext.close();
      stream.getTracks().forEach((t) => t.stop());
    };
    mediaRecorder.start();
    // Start duration timer & voice analysis animation loop
  };

  const stopRecording = async () => { /* stops recorder, waits for onstop */ };
  const pauseRecording = () => { /* pauses recorder, stops analysis loop */ };
  const resumeRecording = () => { /* resumes recorder, restarts analysis */ };
  const cancelRecording = () => { /* stops everything, clears state */ };

  // Cleanup on unmount
  useEffect(() => {
    return () => { /* clear intervals, animation frames, streams, audio context */ };
  }, []);

  return {
    startRecording, pauseRecording, resumeRecording, stopRecording, cancelRecording,
    recordingDuration, voiceLevel, isPaused,
    formatDuration: (s: number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`,
  };
};
```

---

### 7. Internationalization Setup

The i18n system uses `i18next` with the `react-i18next` binding and a browser language detector. Translation resources are TypeScript objects (not JSON files) for type safety and tree-shaking. The three supported languages are English (`en`), Sinhala (`si`), and Tamil (`ta`).

```typescript
// config/i18n.config.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { localeResources } from "@/locales";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    interpolation: { escapeValue: false },
    resources: localeResources,
  });

export default i18n;
```

```typescript
// locales/index.ts
import enTranslation from "@/locales/en/translation";
import siTranslation from "@/locales/si/translation";
import taTranslation from "@/locales/ta/translation";

export const localeResources = {
  en: { translation: enTranslation },
  si: { translation: siTranslation },
  ta: { translation: taTranslation },
} as const;
```

```typescript
// constants/languages.ts
export type AppLanguage = "en" | "si" | "ta";

export const SUPPORTED_LANGUAGES: AppLanguage[] = ["en", "si", "ta"];

export const LANGUAGE_OPTIONS: Array<{ value: AppLanguage; label: string }> = [
  { value: "en", label: "English" },
  { value: "si", label: "Sinhala" },
  { value: "ta", label: "Tamil" },
];
```

**Usage in components:**

```typescript
import { useTranslation } from "react-i18next";

const SomeComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("appName")}</h1>
      <p>{t("legalDisclaimerBody")}</p>
    </div>
  );
};
```

---

## 📝 TypeScript Type Definitions

All shared types are defined in `src/types/` and re-exported through a barrel `index.ts`.

```typescript
// types/user.types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string;
  preferences?: {
    language?: string;
    theme?: "light" | "dark" | "system";
  };
}
```

```typescript
// types/auth.types.ts
export interface SuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface LoginRequest {
  email?: string;
  phone_number?: string;
  password: string;
}

export interface RegisterRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  password: string;
  preferred_language?: string;
}

export interface AuthResponseData {
  uuid: string;
  first_name?: string;
  last_name?: string;
  role: string;
  preferred_language: string;
  access_token?: string;
}

export type LoginResponse = SuccessResponse<AuthResponseData>;
export type RegisterResponse = SuccessResponse<AuthResponseData>;
```

```typescript
// types/chat.types.ts
export type ChatSender = "user" | "ai";

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  content: string;
  timestamp: Date;
  messageType?: string;
  audioUrl?: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  messages: ChatMessage[];
  isArchived?: boolean;
  isPinned?: boolean;
}

export interface ApiConversationCreate {
  title: string;
  channel?: string;
}

export interface ApiConversationResponse {
  id: string;
  user_id: string;
  title: string;
  channel: string;
  is_archived: boolean;
  is_pinned: boolean;
  created_at: string;
}

export interface ApiConversationUpdate {
  title?: string;
  is_archived?: boolean;
  is_pinned?: boolean;
}

export interface ApiMessageResponse {
  id: string;
  conversation_id: string;
  sender: string;
  content: string;
  message_type: string;
  audio_url?: string | null;
  created_at: string;
}

export interface ApiConversationDetailResponse extends ApiConversationResponse {
  messages: ApiMessageResponse[];
}

export interface ApiMessageCompleteRequest {
  query: string;
  context?: string;
}
```

```typescript
// types/api.types.ts
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
  details?: unknown;
}
```

```typescript
// types/legal.types.ts
export interface LegalTopic {
  id: string;
  title: string;
  description: string;
}

export interface LegalCitation {
  source: string;
  reference: string;
  confidence?: number;
}
```

```typescript
// types/voice.types.ts
export interface VoiceState {
  isRecording: boolean;
  isPlaying: boolean;
  audioBlob: Blob | null;
  transcript: string;
}
```

---

## 🎨 Layout System

The application uses four layout components, selected by the `routeRenderer` based on the URL path:

| Layout | Used For | Components |
|---|---|---|
| `MainLayout` | Homepage (`/`) | Navbar + glassmorphism background + footer with legal disclaimer |
| `ChatLayout` | Chat pages (`/chat`, `/chat/:id`) | Sidebar (conversation list) + main content area with blur effect |
| `AdminLayout` | Admin pages (`/admin/*`) | AdminSidebar + AdminHeader + dark theme content area |
| `BrowseLayout` | Browse/topic pages | BrowseHeader + scrollable content area |

---

## ⚙️ Configuration Files

### Vite Configuration

```typescript
// vite.config.ts
import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Environment Variables

```env
# .env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_SOCKET_URL=http://localhost:8000
```

### ESLint Configuration

```javascript
// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
```

### TailwindCSS Theme Tokens

The global CSS defines custom Tailwind theme tokens and base styles:

```css
/* styles/index.css */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-primary: #1A1A1A;
  --color-background-light: #f7f7f7;
  --color-background-dark: #191919;
  --color-brand-bg: #191919;
  --color-surface-dark: #242424;
  --color-border-dark: #333333;
  --font-display: "Public Sans", sans-serif;
}

@layer base {
  :root {
    --oj-accent-color: #64748b;
  }
  /* ... scrollbar styles, selection color, transitions */
}
```

---

## 📋 Code Quality Standards

### Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Components | PascalCase | `ChatPage.tsx`, `ProfileModal.tsx` |
| Hooks | camelCase with `use` prefix | `useTheme.ts`, `useVoiceRecording.ts` |
| Stores | camelCase with `Store` suffix | `authStore.ts`, `chatStore.ts` |
| Services | camelCase with `Service` suffix | `authService.ts`, `chatService.ts` |
| Types | PascalCase interfaces | `ChatMessage`, `ApiConversationResponse` |
| Constants | UPPER_SNAKE_CASE | `SUPPORTED_LANGUAGES`, `STORAGE_KEY` |

### Path Aliases

The `@` alias maps to `src/`, configured in both `vite.config.ts` and `tsconfig.app.json`. Always use `@/` imports rather than relative paths for cross-directory references.

```typescript
// ✅ Correct
import { useAuthStore } from "@/stores/authStore";

// ❌ Avoid
import { useAuthStore } from "../../stores/authStore";
```

---

## 🔒 Security Practices

1. **Cookie-based auth** — Tokens are set as HTTP-only cookies by the backend; the frontend uses `withCredentials: true` on all API requests.
2. **401 interceptor** — Global Axios interceptor catches expired sessions and redirects to login, with exclusions for auth endpoints to avoid loops.
3. **Role-based access** — Admin routes are protected by `RequireAdmin`, which checks both authentication and `userRole === "admin"` in the auth store.
4. **Session expiry flag** — A `sessionStorage` key (`oj-auth-session-expired`) is set on 401 to allow the login modal to show a "session expired" message.
5. **No client-side token storage** — The auth store persists user metadata and role, but tokens are managed by the backend via cookies.

---

## 📊 Performance Optimization

1. **Code splitting** — All page components are lazy-loaded via `React.lazy()`, producing separate chunks per route.
2. **Zustand persist with `partialize`** — Only essential state fields are persisted to localStorage to avoid bloated storage and slow rehydration.
3. **Optimistic UI** — Chat messages appear instantly before the API responds; errors roll back the optimistic state.
4. **Streaming responses** — AI responses are streamed via `ReadableStream`, providing real-time typing feedback instead of waiting for the full response.
5. **Suspense boundaries** — Each route is wrapped in `<Suspense>` with a lightweight loading fallback.

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS v4](https://tailwindcss.com)
- [Zustand](https://docs.pmnd.rs/zustand)
- [React Router v7](https://reactrouter.com)
- [Radix UI](https://www.radix-ui.com/)
- [i18next](https://www.i18next.com/)
- [Socket.IO Client](https://socket.io/docs/v4/client-api/)
- [WaveSurfer.js](https://wavesurfer-js.org/)
- [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)

---

## 🤝 Contributing Guidelines

1. Follow the established project structure — place files in the correct directory.
2. Use TypeScript strictly; avoid `any` where possible.
3. Write meaningful commit messages.
4. Use `@/` path aliases for all cross-directory imports.
5. Keep components small and focused — extract reusable logic into hooks.
6. Use Zustand for global state and React Context for provider-pattern state.
7. All new pages must be lazy-loaded and added to `routes.config.tsx`.
8. Follow the naming conventions outlined above.
9. Ensure dark mode compatibility — test both themes.
10. Support all three languages (EN, SI, TA) when adding user-facing text.

---

**Last Updated:** June 2026
**Version:** 2.0.0
**Maintainer:** OpenJustice Development Team
