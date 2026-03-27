import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import ChatLayout from "@/layout/ChatLayout";
import ChatPage from "@/pages/chat/ChatPage";

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
      </Routes>
    </Router>
  );
}

export default App;
