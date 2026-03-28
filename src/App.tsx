import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import ChatLayout from "@/layout/ChatLayout";
import ChatPage from "@/pages/chat/ChatPage";
import AnswerPage from "@/pages/chat/AnswerPage";
import PrivacyPolicyPage from "@/pages/legal/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/legal/TermsOfServicePage";
import AboutUsPage from "@/pages/info/AboutUsPage";
import ContactPage from "@/pages/info/ContactPage";
import HelpPage from "@/pages/info/HelpPage";
import ReleaseNotesPage from "@/pages/info/ReleaseNotesPage";
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
          path="/chat/:chatId"
          element={
            <ChatLayout>
              <AnswerPage />
            </ChatLayout>
          }
        />
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicyPage />}
        />
        <Route
          path="/terms-of-service"
          element={<TermsOfServicePage />}
        />
        <Route
          path="/about-us"
          element={<AboutUsPage />}
        />
        <Route
          path="/contact"
          element={<ContactPage />}
        />
        <Route
          path="/help"
          element={<HelpPage />}
        />
        <Route
          path="/release-notes"
          element={<ReleaseNotesPage />}
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
