import React, { Suspense } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import type { RouteConfig } from "@/config/routes.config";
import MainLayout from "@/layout/MainLayout";
import ChatLayout from "@/layout/ChatLayout";
import { useAuthStore } from "@/stores/authStore";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    const redirect = `${location.pathname}${location.search}`;
    return <Navigate to={`/?login=1&redirect=${encodeURIComponent(redirect)}`} replace />;
  }

  return <>{children}</>;
};

const withLayout = (path: string, content: React.ReactNode) => {
  if (path === "/") {
    return <MainLayout>{content}</MainLayout>;
  }

  if (path === "/chat" || path.startsWith("/chat/")) {
    return (
      <RequireAuth>
        <ChatLayout>{content}</ChatLayout>
      </RequireAuth>
    );
  }

  return content;
};

export const renderRoutes = (routes: RouteConfig[]) =>
  routes.map(({ path, component: Component }) => {
    const page = withLayout(path, <Component />);

    return (
      <Route
        key={path}
        path={path}
        element={
          <Suspense fallback={<div className="p-4 text-sm text-slate-500">Loading...</div>}>
            {page}
          </Suspense>
        }
      />
    );
  });