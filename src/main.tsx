import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
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
