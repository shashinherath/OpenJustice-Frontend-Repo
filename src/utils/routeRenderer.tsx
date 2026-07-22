import React, { Suspense } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import type { RouteConfig } from "@/config/routes.config";
import MainLayout from "@/layout/MainLayout";
import ChatLayout from "@/layout/ChatLayout";
import AdminLayout from "@/layout/AdminLayout";
import { useAuthStore } from "@/stores/authStore";

const PageLoader: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark gap-4">
    <div className="w-8 h-8 border-2 border-slate-300 dark:border-slate-600 border-t-slate-700 dark:border-t-slate-200 rounded-full animate-spin" />
    <span className="text-xs text-slate-400 dark:text-slate-500 tracking-wide">
      Loading…
    </span>
  </div>
);

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    const redirect = `${location.pathname}${location.search}`;
    return (
      <Navigate
        to={`/?login=1&redirect=${encodeURIComponent(redirect)}`}
        replace
      />
    );
  }

  return <>{children}</>;
};

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);
  const location = useLocation();

  if (!isAuthenticated) {
    const redirect = `${location.pathname}${location.search}`;
    return (
      <Navigate
        to={`/?login=1&redirect=${encodeURIComponent(redirect)}`}
        replace
      />
    );
  }

  if (userRole !== "admin") {
    // Redirect non-admin users to chat
    return <Navigate to="/chat" replace />;
  }

  return <>{children}</>;
};

const withLayout = (path: string, content: React.ReactNode) => {
  const mainLayoutPaths = [
    "/",
    "/privacy-policy",
    "/terms-of-service",
    "/about-us",
    "/contact",
    "/help",
    "/release-notes",
    "/topics",
    "/research",
    "/developers"
  ];

  if (mainLayoutPaths.includes(path)) {
    return <MainLayout>{content}</MainLayout>;
  }

  if (path === "/chat" || path.startsWith("/chat/")) {
    return (
      <RequireAuth>
        <ChatLayout>{content}</ChatLayout>
      </RequireAuth>
    );
  }

  if (path === "/admin" || path.startsWith("/admin/")) {
    return (
      <RequireAdmin>
        <AdminLayout>{content}</AdminLayout>
      </RequireAdmin>
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
          <Suspense fallback={<PageLoader />}>
            {page}
          </Suspense>
        }
      />
    );
  });

