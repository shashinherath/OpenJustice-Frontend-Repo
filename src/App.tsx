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
