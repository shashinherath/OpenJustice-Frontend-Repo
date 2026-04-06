import React from "react";
import AdminModulePageTemplate from "@/components/admin/AdminModulePageTemplate";

const AdminModerationPage: React.FC = () => {
  return (
    <AdminModulePageTemplate
      modulePath="/admin/moderation"
      kickerText=""
      metrics={[
        { label: "Flagged Outputs", value: "27", note: "9 require immediate human review" },
        { label: "Policy Overrides", value: "4", note: "Manual intervention in the last 24 hours" },
        { label: "Resolved Cases", value: "132", note: "Weekly completion volume" },
      ]}
      tasks={[
        {
          title: "Review high-risk response batch",
          description: "Inspect multilingual outputs exceeding toxicity confidence score.",
          actionLabel: "Open Cases",
        },
        {
          title: "Approve policy rule updates",
          description: "Finalize revised legal misinformation safeguard thresholds.",
          actionLabel: "Approve Rules",
        },
      ]}
    />
  );
};

export default AdminModerationPage;
