import { useEffect } from "react";
import { BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { APP_ROUTES } from "@/config/routes.config";
import { renderRoutes } from "@/utils/routeRenderer";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>{renderRoutes(APP_ROUTES)}</Routes>
    </Router>
  );
}

export default App;
