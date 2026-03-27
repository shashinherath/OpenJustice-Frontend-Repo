# OpenJustice Frontend ⚖️

**OpenJustice** is an advanced AI-powered legal assistant platform providing multilingual legal Q&A, document analysis, and voice-enabled interactions through modern web and WhatsApp interfaces.

Built as a robust research prototype, it prioritizes verified legal insights, strict anti-hallucination protocols via Multi-Perspective Retrieval, and profound architectural scale.

## 🚀 Features

*   **Multilingual AI Legal Assistant:** Real-time chat interface parsing complex legal questions in English, Hindi, and Marathi, backed by verifiable citations.
*   **Voice-Enabled Interaction:** Native audio recording, waveform visualization (WaveSurfer.js), and OpenAI-backed speech-to-text and text-to-speech pipelines.
*   **Document Analysis:** Upload and scrutinize complex legal contracts and notices with AI.
*   **Legal Topic Browser:** Curated modular directories for standard legal categories (Employment Law, Family Rights, Consumer Protection, etc.).
*   **Real-Time Capabilities:** Socket.IO WebSocket integrations for rapid, robust communication.
*   **WhatsApp Integration:** Extend reach directly to users via native WhatsApp QR/Status capabilities.

## 🛠️ Technology Stack

Our frontend architecture utilizes best-in-class, enterprise-ready tooling:

*   **Core Framework:** React 19 + TypeScript + Vite
*   **Routing:** React Router 7 (Centralized route config with lazy loading)
*   **Styling:** TailwindCSS 4 + class-variance-authority (CVA)
*   **State Management:** Zustand + React Context
*   **Data Fetching & Networking:** TanStack Query + Axios + Socket.IO Client
*   **Voice Interface:** MediaRecorder API + WaveSurfer.js (with OpenAI Whisper & TTS backend)
*   **Internationalization:** i18next + react-i18next
*   **Testing:** Vitest + React Testing Library

## 📦 Getting Started

### Prerequisites
*   Node.js (v18+ recommended)
*   npm or yarn

### Installation
1.  **Clone the repository**
    ```bash
    git clone https://github.com/shashinherath/OpenJustice-Frontend-Repo.git
    cd OpenJustice-Frontend-Repo
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

## 🗺️ Project Architecture Overview

The repository is organized following scalable frontend design patterns. For in-depth architecture patterns involving our Zustand stores, Service Layers, and WebSocket hooks, please see `docs/FRONTEND_PROJECT_STRUCTURE.md`.

```
src/
├── components/          # Reusable UI (common, navigation, chat, voice, legal, whatsapp)
├── config/              # Centralized route, i18n, socket, and api configs
├── constants/           # Core constants (languages, endpoints, topics)
├── contexts/            # React Context (Auth, Theme, Chat, Voice, Language)
├── hooks/               # Custom modular hooks organized by feature domain
├── layout/              # Structural wrappers (MainLayout, DashboardLayout, etc.)
├── lib/                 # Utility libraries (date formatting, audio utils)
├── locales/             # Native language JSON maps (en, hi, mr)
├── pages/               # Segmented smart route containers
├── services/            # Deep API client layer and websocket integration
├── stores/              # Zustand global state slices
├── styles/              # Global Tailwind logic
├── types/               # Strict TypeScript definitions
└── utils/               # App utilities, validators, and loggers
```

## ⚠️ Vital Disclaimer

OpenJustice is an AI-powered educational tool. We provide **legal information, not legal advice or representation.** The system may not be aware of extremely recent case law or hyper-local procedural nuances. 

**This interface is a research prototype.** Users must cross-reference all outputs with the primary source linked documents and should consult a qualified attorney for their specific contextual situations.
