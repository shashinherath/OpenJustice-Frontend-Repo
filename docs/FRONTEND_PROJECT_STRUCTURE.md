# OpenJustice Frontend - Project Structure & Guidelines

## 🎯 Project Overview

**OpenJustice** is an AI-powered legal assistant platform providing multilingual legal Q&A, document analysis, and voice-enabled interactions through web and WhatsApp interfaces.

---

## 🛠️ Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS 4
- **State Management:** Zustand + React Context
- **Routing:** React Router 7
- **Data Fetching:** TanStack Query (React Query)
- **HTTP Client:** Axios
- **UI Components:** Radix UI primitives
- **Styling Utilities:** class-variance-authority (CVA)
- **Internationalization:** i18next + react-i18next
- **Voice Interface:** 
  - Audio Recording: MediaRecorder API
  - Audio Visualization: WaveSurfer.js
  - Speech Processing: OpenAI Whisper (backend) + OpenAI TTS
- **Real-time Communication:** Socket.IO Client (WebSockets)
- **Testing:** Vitest + React Testing Library

---

## 📁 Project Structure

```
src/
├── assets/                 # Static assets
│   ├── images/            # Images, logos, icons
│   ├── sounds/            # Audio files (notification sounds, etc.)
│   └── legal-docs/        # Sample legal documents for demo
│
├── components/            # Reusable UI components
│   ├── common/           # Shared components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── LanguageSelector.tsx
│   │
│   ├── navigation/       # Navigation components
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileMenu.tsx
│   │
│   ├── ui/               # Base UI primitives (Radix UI wrappers)
│   │   ├── dialog.tsx
│   │   ├── dropdown.tsx
│   │   ├── tabs.tsx
│   │   └── tooltip.tsx
│   │
│   ├── chat/             # Chat interface components
│   │   ├── ChatContainer.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ChatHistory.tsx
│   │   ├── TypingIndicator.tsx
│   │   └── MessageActions.tsx
│   │
│   ├── voice/            # Voice interface components
│   │   ├── VoiceRecorder.tsx
│   │   ├── VoicePlayer.tsx
│   │   ├── AudioWaveform.tsx
│   │   ├── VoiceControls.tsx
│   │   └── AudioVisualizer.tsx
│   │
│   ├── legal/            # Legal-specific components
│   │   ├── DocumentViewer.tsx
│   │   ├── DocumentUploader.tsx
│   │   ├── LegalCitation.tsx
│   │   ├── CaseReference.tsx
│   │   └── SourceAttribution.tsx
│   │
│   └── whatsapp/         # WhatsApp integration components
│       ├── WhatsAppConnect.tsx
│       ├── WhatsAppQRCode.tsx
│       └── WhatsAppStatus.tsx
│
├── config/               # Configuration files
│   ├── routes.config.tsx     # Centralized routing
│   ├── i18n.config.ts        # Internationalization config
│   ├── api.config.ts         # API endpoints configuration
│   └── socket.config.ts      # WebSocket configuration
│
├── constants/            # Application constants
│   ├── languages.ts      # Supported languages
│   ├── legal-topics.ts   # Legal categories/topics
│   ├── api-endpoints.ts  # API route constants
│   └── app-config.ts     # General app constants
│
├── contexts/             # React Context providers
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   ├── ChatContext.tsx
│   ├── VoiceContext.tsx
│   └── LanguageContext.tsx
│
├── hooks/                # Custom React hooks
│   ├── auth/
│   │   ├── useAuth.ts
│   │   └── useSession.ts
│   │
│   ├── chat/
│   │   ├── useChat.ts
│   │   ├── useChatHistory.ts
│   │   └── useTypingIndicator.ts
│   │
│   ├── voice/
│   │   ├── useVoiceRecorder.ts
│   │   ├── useAudioPlayer.ts
│   │   ├── useWaveSurfer.ts
│   │   └── useSpeechToText.ts
│   │
│   ├── legal/
│   │   ├── useLegalQuery.ts
│   │   ├── useDocumentAnalysis.ts
│   │   └── useLegalCitations.ts
│   │
│   ├── websocket/
│   │   ├── useSocket.ts
│   │   └── useSocketEvent.ts
│   │
│   └── common/
│       ├── useTranslation.ts
│       ├── useTheme.ts
│       ├── useMobile.ts
│       └── useDebounce.ts
│
├── layout/               # Layout components
│   ├── MainLayout.tsx
│   ├── DashboardLayout.tsx
│   ├── ChatLayout.tsx
│   └── AuthLayout.tsx
│
├── lib/                  # Utility libraries
│   ├── utils.ts          # Common utilities (cn helper)
│   ├── audio-utils.ts    # Audio processing utilities
│   └── date-utils.ts     # Date formatting utilities
│
├── locales/              # Translation files
│   ├── en/
│   │   ├── common.json
│   │   ├── legal.json
│   │   └── errors.json
│   ├── hi/               # Hindi translations
│   ├── mr/               # Marathi translations
│   └── index.ts          # Locale exports
│
├── pages/                # Page components (route targets)
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── ForgotPasswordPage.tsx
│   │
│   ├── dashboard/
│   │   ├── DashboardPage.tsx
│   │   └── ProfilePage.tsx
│   │
│   ├── chat/
│   │   ├── ChatPage.tsx
│   │   └── ChatHistoryPage.tsx
│   │
│   ├── legal/
│   │   ├── LegalResourcesPage.tsx
│   │   ├── DocumentAnalysisPage.tsx
│   │   └── CaseSearchPage.tsx
│   │
│   ├── voice/
│   │   └── VoiceAssistantPage.tsx
│   │
│   ├── whatsapp/
│   │   └── WhatsAppIntegrationPage.tsx
│   │
│   └── HomePage.tsx
│
├── services/             # API service layer
│   ├── apiClient.ts      # Axios instance with interceptors
│   ├── authService.ts    # Authentication services
│   ├── chatService.ts    # Chat/conversation services
│   ├── voiceService.ts   # Voice/audio services
│   ├── legalService.ts   # Legal query services
│   ├── documentService.ts # Document upload/analysis
│   ├── whatsappService.ts # WhatsApp integration
│   └── socketService.ts  # WebSocket connection management
│
├── stores/               # Zustand state management
│   ├── authStore.ts
│   ├── chatStore.ts
│   ├── voiceStore.ts
│   ├── uiStore.ts
│   └── notificationStore.ts
│
├── styles/               # Global styles
│   ├── index.css         # Global CSS and Tailwind imports
│   └── themes.css        # Theme variables
│
├── types/                # TypeScript type definitions
│   ├── index.ts          # Shared types
│   ├── api.types.ts      # API response types
│   ├── chat.types.ts     # Chat-related types
│   ├── voice.types.ts    # Voice-related types
│   ├── legal.types.ts    # Legal domain types
│   └── user.types.ts     # User-related types
│
├── utils/                # Utility functions
│   ├── logger.ts         # Logging utilities
│   ├── secureStorage.ts  # Secure storage wrapper
│   ├── routeRenderer.tsx # Route rendering utilities
│   ├── errorHandler.ts   # Error handling utilities
│   ├── validators.ts     # Input validation
│   └── formatters.ts     # Data formatting utilities
│
├── App.tsx               # Root application component
└── main.tsx              # Application entry point
```

---

## 🏗️ Architecture Patterns

### 1. Routing Architecture

**Pattern:** Centralized route configuration with lazy loading

```typescript
// config/routes.config.tsx
import React from "react";

// Lazy load pages
const HomePage = React.lazy(() => import("@/pages/HomePage"));
const ChatPage = React.lazy(() => import("@/pages/chat/ChatPage"));
const VoiceAssistantPage = React.lazy(() => import("@/pages/voice/VoiceAssistantPage"));
const LoginPage = React.lazy(() => import("@/pages/auth/LoginPage"));

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  props?: Record<string, unknown>;
  children?: RouteConfig[];
  requiresAuth?: boolean;
}

// Public routes
export const PUBLIC_ROUTES: RouteConfig[] = [
  { path: "", component: HomePage },
  { path: "login", component: LoginPage },
  { path: "register", component: RegisterPage }
];

// Protected routes
export const PROTECTED_ROUTES: RouteConfig[] = [
  { path: "dashboard", component: DashboardPage, requiresAuth: true },
  { path: "chat", component: ChatPage, requiresAuth: true },
  { path: "voice", component: VoiceAssistantPage, requiresAuth: true },
  { path: "documents", component: DocumentAnalysisPage, requiresAuth: true }
];
```

---

### 2. State Management Strategy

#### **Zustand Stores**

**Chat Store:**
```typescript
// stores/chatStore.ts
import { create } from "zustand";
import { ChatMessage, Conversation } from "@/types/chat.types";

interface ChatStore {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: ChatMessage[];
  isTyping: boolean;
  
  setActiveConversation: (id: string) => void;
  addMessage: (message: ChatMessage) => void;
  setTyping: (isTyping: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  conversations: [],
  activeConversationId: null,
  messages: [],
  isTyping: false,
  
  setActiveConversation: (id) => set({ activeConversationId: id }),
  addMessage: (message) => 
    set((state) => ({ messages: [...state.messages, message] })),
  setTyping: (isTyping) => set({ isTyping }),
  clearMessages: () => set({ messages: [] })
}));
```

**Voice Store:**
```typescript
// stores/voiceStore.ts
import { create } from "zustand";

interface VoiceStore {
  isRecording: boolean;
  isPlaying: boolean;
  audioBlob: Blob | null;
  transcript: string;
  
  startRecording: () => void;
  stopRecording: () => void;
  setAudioBlob: (blob: Blob) => void;
  setTranscript: (text: string) => void;
  reset: () => void;
}

export const useVoiceStore = create<VoiceStore>((set) => ({
  isRecording: false,
  isPlaying: false,
  audioBlob: null,
  transcript: "",
  
  startRecording: () => set({ isRecording: true }),
  stopRecording: () => set({ isRecording: false }),
  setAudioBlob: (blob) => set({ audioBlob: blob }),
  setTranscript: (text) => set({ transcript: text }),
  reset: () => set({ 
    isRecording: false, 
    isPlaying: false, 
    audioBlob: null, 
    transcript: "" 
  })
}));
```

#### **React Context**

**Language Context:**
```typescript
// contexts/LanguageContext.tsx
import { createContext, useState, useCallback, useEffect } from "react";
import i18n from "@/config/i18n.config";

interface LanguageContextType {
  currentLanguage: string;
  availableLanguages: string[];
  changeLanguage: (lang: string) => Promise<void>;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = useCallback(async (lang: string) => {
    await i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    localStorage.setItem("preferred-language", lang);
  }, []);

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        availableLanguages: ["en", "hi", "mr"], 
        changeLanguage 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
```

---

### 3. API Layer Architecture

#### **API Client Setup**
```typescript
// services/apiClient.ts
import axios from "axios";
import { authStorage } from "@/utils/secureStorage";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

// Request interceptor: Add auth token & language
apiClient.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();
    const language = localStorage.getItem("preferred-language") || "en";
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    config.headers["Accept-Language"] = language;
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle errors & token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

#### **Service Layer Examples**

**Chat Service:**
```typescript
// services/chatService.ts
import apiClient from "./apiClient";
import { ChatMessage, LegalQuery, LegalResponse } from "@/types/chat.types";

export const chatService = {
  // Send legal query to AI
  sendQuery: async (query: LegalQuery): Promise<LegalResponse> => {
    const response = await apiClient.post("/chat/query", query);
    return response.data;
  },

  // Get chat history
  getHistory: async (conversationId?: string) => {
    const response = await apiClient.get("/chat/history", {
      params: { conversationId }
    });
    return response.data;
  },

  // Create new conversation
  createConversation: async (title?: string) => {
    const response = await apiClient.post("/chat/conversations", { title });
    return response.data;
  },

  // Get conversation by ID
  getConversation: async (id: string) => {
    const response = await apiClient.get(`/chat/conversations/${id}`);
    return response.data;
  }
};
```

**Voice Service:**
```typescript
// services/voiceService.ts
import apiClient from "./apiClient";

export const voiceService = {
  // Transcribe audio to text (Whisper)
  transcribeAudio: async (audioBlob: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    const response = await apiClient.post("/voice/transcribe", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data.transcript;
  },

  // Convert text to speech (TTS)
  synthesizeSpeech: async (text: string, language: string = "en"): Promise<Blob> => {
    const response = await apiClient.post(
      "/voice/synthesize",
      { text, language },
      { responseType: "blob" }
    );

    return response.data;
  },

  // Voice query (STT + AI + TTS pipeline)
  voiceQuery: async (audioBlob: Blob): Promise<{ 
    transcript: string; 
    response: string; 
    audioResponse: Blob 
  }> => {
    const formData = new FormData();
    formData.append("audio", audioBlob);

    const response = await apiClient.post("/voice/query", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data;
  }
};
```

**Legal Service:**
```typescript
// services/legalService.ts
import apiClient from "./apiClient";

export const legalService = {
  // Analyze legal document
  analyzeDocument: async (file: File) => {
    const formData = new FormData();
    formData.append("document", file);

    const response = await apiClient.post("/legal/analyze", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data;
  },

  // Search legal cases
  searchCases: async (query: string, filters?: any) => {
    const response = await apiClient.post("/legal/search", { query, filters });
    return response.data;
  },

  // Get legal citations
  getCitations: async (documentId: string) => {
    const response = await apiClient.get(`/legal/citations/${documentId}`);
    return response.data;
  }
};
```

---

### 4. WebSocket Integration

```typescript
// services/socketService.ts
import { io, Socket } from "socket.io-client";
import { authStorage } from "@/utils/secureStorage";

class SocketService {
  private socket: Socket | null = null;

  connect() {
    const token = authStorage.getToken();
    
    this.socket = io(import.meta.env.VITE_WS_URL || "http://localhost:8000", {
      auth: { token },
      transports: ["websocket"]
    });

    this.socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    this.socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string) {
    if (this.socket) {
      this.socket.off(event);
    }
  }

  getSocket() {
    return this.socket;
  }
}

export const socketService = new SocketService();
```

**Custom Hook:**
```typescript
// hooks/websocket/useSocket.ts
import { useEffect } from "react";
import { socketService } from "@/services/socketService";

export const useSocket = () => {
  useEffect(() => {
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  return socketService;
};

// hooks/websocket/useSocketEvent.ts
import { useEffect } from "react";
import { socketService } from "@/services/socketService";

export const useSocketEvent = (
  event: string, 
  callback: (data: any) => void
) => {
  useEffect(() => {
    socketService.on(event, callback);

    return () => {
      socketService.off(event);
    };
  }, [event, callback]);
};
```

---

### 5. Voice Interface Implementation

#### **Voice Recorder Hook**
```typescript
// hooks/voice/useVoiceRecorder.ts
import { useState, useRef, useCallback } from "react";
import { useVoiceStore } from "@/stores/voiceStore";

export const useVoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { setAudioBlob } = useVoiceStore();

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus"
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      throw error;
    }
  }, [setAudioBlob]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  return {
    isRecording,
    startRecording,
    stopRecording
  };
};
```

#### **WaveSurfer Hook**
```typescript
// hooks/voice/useWaveSurfer.ts
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export const useWaveSurfer = (containerRef: React.RefObject<HTMLDivElement>) => {
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#4F46E5",
      progressColor: "#818CF8",
      height: 80,
      barWidth: 2,
      barGap: 1,
      responsive: true
    });

    wavesurferRef.current = wavesurfer;

    wavesurfer.on("play", () => setIsPlaying(true));
    wavesurfer.on("pause", () => setIsPlaying(false));
    wavesurfer.on("finish", () => setIsPlaying(false));

    return () => {
      wavesurfer.destroy();
    };
  }, [containerRef]);

  const loadAudio = useCallback((audioBlob: Blob) => {
    if (wavesurferRef.current) {
      const url = URL.createObjectURL(audioBlob);
      wavesurferRef.current.load(url);
    }
  }, []);

  const play = useCallback(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.play();
    }
  }, []);

  const pause = useCallback(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.pause();
    }
  }, []);

  return {
    wavesurfer: wavesurferRef.current,
    isPlaying,
    loadAudio,
    play,
    pause
  };
};
```

#### **Voice Recorder Component**
```typescript
// components/voice/VoiceRecorder.tsx
import { useVoiceRecorder } from "@/hooks/voice/useVoiceRecorder";
import { voiceService } from "@/services/voiceService";
import { Button } from "@/components/common/Button";
import { Mic, Square } from "lucide-react";

export const VoiceRecorder = ({ onTranscript }: { onTranscript: (text: string) => void }) => {
  const { isRecording, startRecording, stopRecording } = useVoiceRecorder();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStopRecording = async () => {
    stopRecording();
    
    setIsProcessing(true);
    try {
      const audioBlob = useVoiceStore.getState().audioBlob;
      if (audioBlob) {
        const transcript = await voiceService.transcribeAudio(audioBlob);
        onTranscript(transcript);
      }
    } catch (error) {
      console.error("Transcription error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {!isRecording ? (
        <Button
          onClick={startRecording}
          variant="default"
          size="lg"
          className="rounded-full"
        >
          <Mic className="w-5 h-5" />
          Start Recording
        </Button>
      ) : (
        <Button
          onClick={handleStopRecording}
          variant="destructive"
          size="lg"
          className="rounded-full animate-pulse"
        >
          <Square className="w-5 h-5" />
          Stop Recording
        </Button>
      )}
      
      {isProcessing && (
        <span className="text-sm text-muted-foreground">
          Processing audio...
        </span>
      )}
    </div>
  );
};
```

---

### 6. Internationalization Setup

```typescript
// config/i18n.config.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enCommon from "@/locales/en/common.json";
import enLegal from "@/locales/en/legal.json";
import hiCommon from "@/locales/hi/common.json";
import hiLegal from "@/locales/hi/legal.json";
import mrCommon from "@/locales/mr/common.json";
import mrLegal from "@/locales/mr/legal.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        legal: enLegal
      },
      hi: {
        common: hiCommon,
        legal: hiLegal
      },
      mr: {
        common: mrCommon,
        legal: mrLegal
      }
    },
    fallbackLng: "en",
    defaultNS: "common",
    ns: ["common", "legal", "errors"],
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"]
    }
  });

export default i18n;
```

**Translation Files:**
```json
// locales/en/common.json
{
  "app": {
    "name": "OpenJustice",
    "tagline": "Your AI-Powered Legal Assistant"
  },
  "navigation": {
    "home": "Home",
    "chat": "Legal Chat",
    "voice": "Voice Assistant",
    "documents": "Documents",
    "profile": "Profile"
  },
  "chat": {
    "input_placeholder": "Ask a legal question...",
    "send": "Send",
    "clear": "Clear conversation"
  },
  "voice": {
    "start_recording": "Start Recording",
    "stop_recording": "Stop Recording",
    "listening": "Listening..."
  }
}
```

```json
// locales/si/common.json
{
  "app": {
    "name": "ඕපන්ජස්ටිස්",
    "tagline": "ඔබේ AI-බලගන්වන නීතිමය සහායක"
  },
  "navigation": {
    "home": "මුල් පිටුව",
    "chat": "නීතිමය චැට්",
    "voice": "හඬ සහායක",
    "documents": "ලේඛන",
    "profile": "පැතිකඩ"
  }
}
```

**Usage in Components:**
```typescript
import { useTranslation } from "react-i18next";

const ChatPage = () => {
  const { t } = useTranslation("common");

  return (
    <div>
      <h1>{t("app.name")}</h1>
      <p>{t("app.tagline")}</p>
      <input placeholder={t("chat.input_placeholder")} />
    </div>
  );
};
```

---

### 7. Chat Interface Components

```typescript
// components/chat/ChatMessage.tsx
import { ChatMessage as ChatMessageType } from "@/types/chat.types";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={cn(
      "flex gap-3 p-4",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center",
        isUser ? "bg-primary" : "bg-secondary"
      )}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      
      <div className={cn(
        "max-w-[70%] rounded-lg p-3",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-secondary text-secondary-foreground"
      )}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs opacity-70 mb-1">Sources:</p>
            {message.sources.map((source, idx) => (
              <a
                key={idx}
                href={source.url}
                className="text-xs underline block hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.title}
              </a>
            ))}
          </div>
        )}
        
        <span className="text-xs opacity-60 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};
```

---

### 8. Authentication Pattern

```typescript
// contexts/AuthContext.tsx
import { createContext, useState, useCallback, useEffect } from "react";
import { authService } from "@/services/authService";
import { authStorage } from "@/utils/secureStorage";
import { User } from "@/types/user.types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: any) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = authStorage.getToken();
      if (token) {
        try {
          const userData = await authService.verifyToken();
          setUser(userData);
        } catch (error) {
          authStorage.clearAuth();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    
    authStorage.setToken(response.accessToken);
    authStorage.setRefreshToken(response.refreshToken);
    authStorage.setTokenExpiry(response.expiresAt);
    authStorage.setUser(response.user);
    
    setUser(response.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      authStorage.clearAuth();
      setUser(null);
    }
  }, []);

  const register = useCallback(async (data: any) => {
    const response = await authService.register(data);
    
    authStorage.setToken(response.accessToken);
    authStorage.setUser(response.user);
    
    setUser(response.user);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 📝 TypeScript Type Definitions

```typescript
// types/chat.types.ts
export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  sources?: LegalSource[];
  metadata?: Record<string, any>;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

export interface LegalQuery {
  question: string;
  language?: string;
  conversationId?: string;
}

export interface LegalResponse {
  answer: string;
  sources: LegalSource[];
  confidence: number;
  language: string;
}

export interface LegalSource {
  title: string;
  url?: string;
  citation: string;
  relevance: number;
}
```

```typescript
// types/voice.types.ts
export interface VoiceRecording {
  id: string;
  blob: Blob;
  duration: number;
  timestamp: Date;
}

export interface TranscriptionResult {
  text: string;
  language: string;
  confidence: number;
}

export interface TTSOptions {
  voice?: string;
  speed?: number;
  language: string;
}
```

```typescript
// types/legal.types.ts
export interface LegalDocument {
  id: string;
  title: string;
  type: DocumentType;
  content: string;
  uploadedAt: Date;
  analyzedAt?: Date;
  analysis?: DocumentAnalysis;
}

export type DocumentType = 
  | "contract" 
  | "case_law" 
  | "statute" 
  | "regulation" 
  | "other";

export interface DocumentAnalysis {
  summary: string;
  keyPoints: string[];
  legalIssues: string[];
  citations: string[];
}

export interface CaseReference {
  caseName: string;
  citation: string;
  year: number;
  court: string;
  summary: string;
}
```

---

## 🎨 Component Examples

### Chat Input Component
```typescript
// components/chat/ChatInput.tsx
import { useState } from "react";
import { Send, Mic } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useTranslation } from "react-i18next";

interface ChatInputProps {
  onSend: (message: string) => void;
  onVoiceInput: () => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, onVoiceInput, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const { t } = useTranslation("common");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t("chat.input_placeholder")}
        disabled={disabled}
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
      />
      
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={onVoiceInput}
        disabled={disabled}
      >
        <Mic className="w-5 h-5" />
      </Button>
      
      <Button
        type="submit"
        variant="default"
        size="lg"
        disabled={disabled || !message.trim()}
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
};
```

---

## 🚀 Application Entry Point

```typescript
// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import App from "@/App";
import "@/config/i18n.config";
import "@/styles/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
```

---

## ⚙️ Configuration Files

### Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      },
      '/ws': {
        target: 'ws://localhost:8000',
        ws: true
      }
    }
  }
});
```

### Environment Variables
```env
# .env.example
VITE_API_BASE_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000
VITE_APP_NAME=OpenJustice
VITE_SUPPORTED_LANGUAGES=en,hi,mr
VITE_DEFAULT_LANGUAGE=en
VITE_MAX_AUDIO_DURATION=300
VITE_MAX_FILE_SIZE=10485760
```

---

## 🧪 Testing Strategy

```typescript
// __tests__/components/ChatMessage.test.tsx
import { render, screen } from '@testing-library/react';
import { ChatMessage } from '@/components/chat/ChatMessage';

describe('ChatMessage', () => {
  const mockMessage = {
    id: '1',
    role: 'user' as const,
    content: 'What are my rights?',
    timestamp: new Date(),
  };

  it('renders user message correctly', () => {
    render(<ChatMessage message={mockMessage} />);
    expect(screen.getByText('What are my rights?')).toBeInTheDocument();
  });

  it('displays sources when available', () => {
    const messageWithSources = {
      ...mockMessage,
      sources: [{ title: 'Article 21', url: '#', citation: 'Constitution', relevance: 0.9 }]
    };
    
    render(<ChatMessage message={messageWithSources} />);
    expect(screen.getByText('Sources:')).toBeInTheDocument();
    expect(screen.getByText('Article 21')).toBeInTheDocument();
  });
});
```

---

## 📋 Code Quality Standards

### ESLint Configuration
```javascript
// eslint.config.js
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ['**/*.{ts,tsx}'],
  plugins: {
    'react-hooks': reactHooks
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
});
```

---

## 🔒 Security Best Practices

1. **Input Sanitization** - Always sanitize user input before sending to AI
2. **XSS Prevention** - Use React's built-in escaping, avoid dangerouslySetInnerHTML
3. **Secure Storage** - Store tokens in httpOnly cookies when possible
4. **CORS Configuration** - Properly configure CORS on backend
5. **Rate Limiting** - Implement client-side rate limiting for API calls
6. **Audio Validation** - Validate audio files before upload
7. **Content Security Policy** - Implement CSP headers
8. **Environment Variables** - Never commit secrets to version control

---

## 📊 Performance Optimization

1. **Code Splitting** - Lazy load routes and heavy components
2. **Memoization** - Use React.memo, useMemo, useCallback appropriately
3. **Debouncing** - Debounce search inputs and API calls
4. **Audio Compression** - Compress audio before upload
5. **Pagination** - Implement pagination for chat history
6. **Virtual Scrolling** - Use virtual scrolling for long message lists
7. **Image Optimization** - Optimize and lazy load images
8. **Bundle Analysis** - Regularly analyze bundle size

---

## 📦 Deployment Checklist

- [ ] Set up environment variables for production
- [ ] Configure API endpoints correctly
- [ ] Enable HTTPS/WSS for production
- [ ] Set up error monitoring (Sentry)
- [ ] Configure analytics
- [ ] Test voice features across browsers
- [ ] Test multilingual support
- [ ] Optimize build bundle size
- [ ] Set up CI/CD pipeline
- [ ] Configure CDN for static assets
- [ ] Test WebSocket reconnection logic
- [ ] Implement service worker for offline support (optional)

---

## 🎯 Feature Implementation Priorities

### Phase 1 - MVP
- [ ] Basic chat interface
- [ ] Text-based legal Q&A
- [ ] User authentication
- [ ] Conversation history
- [ ] Language selection (EN, HI, MR)

### Phase 2 - Voice
- [ ] Voice recording
- [ ] Speech-to-text integration
- [ ] Text-to-speech responses
- [ ] Audio playback controls

### Phase 3 - Advanced Features
- [ ] Document upload & analysis
- [ ] WhatsApp integration
- [ ] Legal citation system
- [ ] Case search functionality

### Phase 4 - Enhancements
- [ ] Real-time collaboration
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] Offline mode

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS](https://tailwindcss.com)
- [TanStack Query](https://tanstack.com/query/latest)
- [Socket.IO Client](https://socket.io/docs/v4/client-api/)
- [i18next](https://www.i18next.com/)
- [WaveSurfer.js](https://wavesurfer-js.org/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)

---

## 🤝 Contributing Guidelines

1. Follow the established project structure
2. Use TypeScript strictly, avoid `any`
3. Write meaningful commit messages
4. Add tests for new features
5. Update documentation
6. Follow naming conventions
7. Keep components small and focused
8. Use proper error handling
9. Optimize for performance
10. Ensure accessibility (WCAG 2.1 AA)

---

**Last Updated:** December 2025  
**Version:** 1.0.0  
**Maintainer:** OpenJustice Development Team
