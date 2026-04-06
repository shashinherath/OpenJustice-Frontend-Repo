import React from "react";
import AdminModulePageTemplate from "@/components/admin/AdminModulePageTemplate";

const AdminReportsPage: React.FC = () => {
  return (
    <AdminModulePageTemplate
      modulePath="/admin/reports"
      metrics={[
        { label: "Generated Today", value: "19", note: "PDF and CSV compliance bundles" },
        { label: "Scheduled Exports", value: "8", note: "Queued for weekly stakeholder delivery" },
        { label: "Failed Exports", value: "1", note: "Data source lock timeout" },
      ]}
      tasks={[
        {
          title: "Publish governance summary",
          description: "Create executive brief covering moderation and trust metrics.",
          actionLabel: "Generate",
        },
        {
          title: "Re-run failed compliance export",
          description: "Retry monthly archive package with refreshed source snapshot.",
          actionLabel: "Retry Export",
        },
      ]}
    />
  );
};

export default AdminReportsPage;
