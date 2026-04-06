import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#191919] text-slate-300 antialiased font-display">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#191919]">
        <AdminHeader />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
