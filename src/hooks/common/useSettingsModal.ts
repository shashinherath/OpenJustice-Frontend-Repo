import { useContext } from "react";
import { SettingsModalContext, type SettingsModalContextType } from "@/contexts/SettingsModalContext";

export const useSettingsModal = (): SettingsModalContextType => {
  const context = useContext(SettingsModalContext);
  if (!context) {
    throw new Error("useSettingsModal must be used within a SettingsModalProvider");
  }
  return context;
};
