import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import type { RouteConfig } from "@/config/routes.config";
import MainLayout from "@/layout/MainLayout";
import ChatLayout from "@/layout/ChatLayout";

const withLayout = (path: string, content: React.ReactNode) => {
  if (path === "/") {
    return <MainLayout>{content}</MainLayout>;
  }

  if (path === "/chat" || path.startsWith("/chat/")) {
    return <ChatLayout>{content}</ChatLayout>;
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