import React from "react";
import AdminModulePageTemplate from "@/components/admin/AdminModulePageTemplate";

const AdminUsersPage: React.FC = () => {
  return (
    <AdminModulePageTemplate
      modulePath="/admin/users"
      metrics={[
        { label: "Active Admins", value: "18", note: "2 pending privilege upgrades" },
        { label: "Pending Approvals", value: "11", note: "Awaiting senior reviewer decision" },
        { label: "Role Drift Alerts", value: "3", note: "Detected in last 24 hours" },
      ]}
      tasks={[
        {
          title: "Validate elevated access requests",
          description: "Review legal analyst role escalation requests before end of day.",
          actionLabel: "Review Queue",
        },
        {
          title: "Archive dormant privileged accounts",
          description: "Disable accounts with no access activity for more than 90 days.",
          actionLabel: "Open Audit",
        },
      ]}
    />
  );
};

export default AdminUsersPage;
