import { BrowserRouter as Router, Routes } from "react-router-dom";
import { APP_ROUTES } from "@/config/routes.config";
import { renderRoutes } from "@/utils/routeRenderer";

function App() {
  return (
    <Router>
      <Routes>{renderRoutes(APP_ROUTES)}</Routes>
    </Router>
  );
}

export default App;
