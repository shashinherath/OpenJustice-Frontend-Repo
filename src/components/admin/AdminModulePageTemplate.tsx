import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/layout/AdminLayout";
import { ADMIN_MODULES } from "@/constants/admin-flow";

interface ModuleMetric {
  label: string;
  value: string;
  note: string;
}

interface ModuleTask {
  title: string;
  description: string;
  actionLabel: string;
}

interface AdminModulePageTemplateProps {
  modulePath: string;
  metrics: ModuleMetric[];
  tasks: ModuleTask[];
  kickerText?: string;
}

const AdminModulePageTemplate: React.FC<AdminModulePageTemplateProps> = ({
  modulePath,
  metrics,
  tasks,
  kickerText = "Operational Module",
}) => {
  const activeModule = ADMIN_MODULES.find(module => module.path === modulePath) ?? ADMIN_MODULES[0];

  return (
    <AdminLayout>
      <div className="space-y-8 p-8">
        <section className="rounded border border-white/10 bg-white/3 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              {kickerText && <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{kickerText}</p>}
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">{activeModule.label}</h2>
              <p className="mt-3 max-w-3xl text-sm text-slate-400">{activeModule.description}</p>
            </div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Overview
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {metrics.map(metric => (
            <article key={metric.label} className="rounded border border-white/10 bg-black/20 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{metric.label}</p>
              <p className="mt-3 text-2xl font-black text-white">{metric.value}</p>
              <p className="mt-2 text-xs text-slate-400">{metric.note}</p>
            </article>
          ))}
        </section>

        <section className="rounded border border-white/10 bg-white/2 p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Priority Queue</h3>
          <div className="mt-4 space-y-4">
            {tasks.map(task => (
              <article key={task.title} className="rounded border border-white/10 bg-black/30 p-4 md:flex md:items-center md:justify-between md:gap-5">
                <div>
                  <h4 className="text-sm font-semibold text-white">{task.title}</h4>
                  <p className="mt-1 text-xs text-slate-400">{task.description}</p>
                </div>
                <button
                  type="button"
                  className="mt-4 rounded border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-300 transition-colors hover:bg-white/10 hover:text-white md:mt-0"
                >
                  {task.actionLabel}
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminModulePageTemplate;
