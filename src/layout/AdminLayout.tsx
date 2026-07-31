import React, { useEffect, useRef } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const mainRef = useRef<HTMLElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-[#191919] text-slate-600 dark:text-slate-300 antialiased font-display">
      <AdminSidebar />
      <main
        ref={mainRef}
        className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50 dark:bg-[#191919]"
      >
        <AdminHeader />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
