import React from "react";
import AdminModulePageTemplate from "@/components/admin/AdminModulePageTemplate";

const AdminSettingsPage: React.FC = () => {
  return (
    <AdminModulePageTemplate
      modulePath="/admin/settings"
      metrics={[
        { label: "Active Policies", value: "24", note: "Production policy controls currently enforced" },
        { label: "Pending Changes", value: "5", note: "Awaiting multi-admin approval" },
        { label: "Guardrail Version", value: "v3.7", note: "Aligned with latest risk model" },
      ]}
      tasks={[
        {
          title: "Apply multilingual threshold update",
          description: "Roll out revised confidence thresholds for Sinhala and Tamil responses.",
          actionLabel: "Apply Change",
        },
        {
          title: "Review API rate policy",
          description: "Tune request limits for institutional consumers before peak hours.",
          actionLabel: "Open Controls",
        },
      ]}
    />
  );
};

export default AdminSettingsPage;
