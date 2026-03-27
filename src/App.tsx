import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import ChatLayout from "@/layout/ChatLayout";
import ChatPage from "@/pages/chat/ChatPage";
import TrustPage from "@/pages/legal/TrustPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import TopicBrowserPage from "@/pages/topics/TopicBrowserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/chat"
          element={
            <ChatLayout>
              <ChatPage />
            </ChatLayout>
          }
        />
        <Route
          path="/trust"
          element={<TrustPage />}
        />
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
        <Route
          path="/topics"
          element={<TopicBrowserPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
