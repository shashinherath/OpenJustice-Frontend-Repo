import React, { createContext, useCallback, useState } from "react";
import SettingsModal from "@/components/settings/SettingsModal";
import ProfileModal from "@/components/profile/ProfileModal";

export interface SettingsModalContextType {
  isSettingsOpen: boolean;
  isProfileOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  openProfile: () => void;
  closeProfile: () => void;
}

export const SettingsModalContext = createContext<
  SettingsModalContextType | undefined
>(undefined);

export const SettingsModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const openSettings = useCallback(() => setIsSettingsOpen(true), []);
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);
  const openProfile = useCallback(() => setIsProfileOpen(true), []);
  const closeProfile = useCallback(() => setIsProfileOpen(false), []);

  return (
    <SettingsModalContext.Provider
      value={{
        isSettingsOpen,
        isProfileOpen,
        openSettings,
        closeSettings,
        openProfile,
        closeProfile,
      }}
    >
      {children}
      {/* Modals are rendered inside the Router (App) to ensure navigation hooks like useNavigate work correctly */}
    </SettingsModalContext.Provider>
  );
};
