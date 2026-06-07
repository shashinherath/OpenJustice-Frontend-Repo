# OpenJustice Frontend ⚖️

**OpenJustice** is an AI-powered legal assistant platform providing multilingual legal Q&A and voice-enabled interactions through a modern web interface. Built as a Sri Lanka–focused research prototype, it supports English, Sinhala, and Tamil, and features a comprehensive admin panel for platform monitoring and analytics.

## 🚀 Features

- **Multilingual AI Legal Chat:** Real-time streaming chat interface for legal questions in English, Sinhala, and Tamil — AI responses stream token-by-token for instant feedback.
- **Voice Messaging:** Record voice notes directly in the chat using the browser's MediaRecorder API with real-time audio level visualization, pause/resume support, and automatic AI audio responses.
- **Legal Topic Browser:** Curated browsable directory of legal categories for guided exploration.
- **Admin Dashboard:** Role-gated admin panel with platform analytics, user management, data source monitoring, retrieval evaluation, security monitoring, AI evaluation metrics, cost analytics, and system settings.
- **Dark/Light Theming:** System-preference-aware theme toggle with accent color customization, persisted to localStorage.
- **Internationalization:** Full trilingual support (EN / SI / TA) with per-user language preferences synced to the backend.
- **Real-Time Communication:** Socket.IO WebSocket integration for live updates.

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Core** | React 19 · TypeScript ~5.9 · Vite 7 |
| **Routing** | React Router DOM 7 (centralized config + lazy loading) |
| **Styling** | TailwindCSS 4 · class-variance-authority · clsx · tailwind-merge |
| **State Management** | Zustand 5 (with `persist` middleware) · React Context |
| **HTTP & Networking** | Axios (with interceptors) · Socket.IO Client |
| **UI Components** | Radix UI (Dialog, Dropdown, Tabs, Tooltip) · Lucide React icons |
| **Voice** | MediaRecorder API · Web Audio API (AnalyserNode) · WaveSurfer.js |
| **Internationalization** | i18next · react-i18next · i18next-browser-languagedetector |
| **Testing** | Vitest · React Testing Library · jsdom |
| **Linting** | ESLint 9 · typescript-eslint · react-hooks · react-refresh |

## 📦 Getting Started

### Prerequisites

- Node.js v18+ recommended
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shashinherath/OpenJustice-Frontend-Repo.git
   cd OpenJustice-Frontend-Repo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   The project includes a `.env` file with default local development values:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_SOCKET_URL=http://localhost:8000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## 🗺️ Project Architecture Overview

The codebase follows a feature-organized structure with clear separation of concerns. For detailed architecture patterns, code examples, and implementation explanations, see [`docs/FRONTEND_PROJECT_STRUCTURE.md`](docs/FRONTEND_PROJECT_STRUCTURE.md).

```
src/
├── assets/              # Static assets (images, sounds, legal-docs)
├── components/          # Reusable UI (admin, chat, common, navigation, profile, settings, ui)
├── config/              # Centralized route, i18n, API, socket, and branding configs
├── constants/           # App constants (languages, admin-flow, app-config)
├── contexts/            # React Context providers (Theme, Language, SettingsModal)
├── hooks/               # Custom hooks (useVoiceRecording, useTheme, useSettingsModal)
├── layout/              # Layout wrappers (MainLayout, ChatLayout, AdminLayout, BrowseLayout)
├── lib/                 # Utility library (cn helper — clsx + tailwind-merge)
├── locales/             # Translation files — TypeScript objects (en, si, ta)
├── pages/               # Page components (chat, admin, info, legal, topics, settings, ...)
├── services/            # API service layer (apiClient, auth, chat, admin, socket)
├── stores/              # Zustand stores (auth, chat, voice, ui, notification, admin)
├── styles/              # Global CSS — Tailwind imports & theme tokens
├── types/               # TypeScript type definitions (api, auth, chat, legal, user, voice)
├── utils/               # Utilities (routeRenderer with auth guards, audioUtils)
├── App.tsx              # Root component — Router, ScrollToTop, global modals
└── main.tsx             # Entry point — provider wrappers
```

### Key Architectural Decisions

- **Auth via Zustand (not Context):** Authentication state is managed by a persisted Zustand store (`authStore`) for cross-component access and localStorage persistence — no `AuthContext` or `AuthProvider` needed.
- **Cookie-based authentication:** The backend sets HTTP-only auth cookies; the frontend uses `withCredentials: true` on all requests. No client-side token management.
- **Path-based layout & auth guards:** The `routeRenderer` utility automatically wraps routes in the correct layout and auth guard (`RequireAuth` for `/chat/*`, `RequireAdmin` for `/admin/*`) based on the URL prefix.
- **Streaming AI responses:** Chat uses the Fetch API's `ReadableStream` (not Axios) to stream AI responses token-by-token for real-time typing feedback.

## ⚠️ Disclaimer

OpenJustice is an AI-powered educational tool. It provides **legal information, not legal advice or representation.** The system may not be aware of recent case law or jurisdiction-specific procedural details.

**This interface is a research prototype.** Users should cross-reference all outputs with primary source documents and consult a qualified attorney for specific legal situations.
