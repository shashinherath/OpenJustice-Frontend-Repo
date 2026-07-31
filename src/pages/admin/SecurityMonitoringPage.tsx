import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adminService } from "@/services/adminService";
import type { AdminSecurityMonitoringResponse } from "@/services/adminService";

const getToneClasses = (tone: string) => {
  const toneMap: Record<string, string> = {
    emerald: "text-emerald-600 dark:text-emerald-300",
    cyan: "text-cyan-600 dark:text-cyan-300",
    amber: "text-amber-600 dark:text-amber-300",
    rose: "text-rose-600 dark:text-rose-300",
    violet: "text-violet-600 dark:text-violet-300",
  };

  return toneMap[tone];
};

const getSeverityClasses = (severity: string) => {
  if (severity === "Critical") {
    return "bg-rose-500/15 text-rose-600 dark:text-rose-300";
  }

  if (severity === "High") {
    return "bg-amber-500/15 text-amber-600 dark:text-amber-300";
  }

  if (severity === "Medium") {
    return "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300";
  }

  return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300";
};

const SecurityMonitoringPage: React.FC = () => {
  const [data, setData] = useState<AdminSecurityMonitoringResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await adminService.getSecurityMonitoring();
        if (mounted) {
          setData(response);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          console.error("Failed to load security monitoring data:", err);
          setError("Failed to load security monitoring data.");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center p-8">
        <div className="text-cyan-600 dark:text-cyan-400">Loading security monitoring data...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-rose-600 dark:text-rose-500">Failed to load security monitoring data.</div>
      </div>
    );
  }

  const SIGNALS = data.signals;
  const MONITORING_AREAS = data.monitoring_areas;
  const PRIORITY_ALERTS = data.priority_alerts;
  const RECENT_EVENTS = data.recent_events;
  const ACTIVITY_LOGS = data.activity_logs || [];

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-rose-400/20 bg-white dark:bg-[#191919] p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600/70 dark:text-rose-200/70">
              AI Safety Operations
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Security Monitoring
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
              Security events are organized into one user-friendly view so your
              team can scan risk quickly and open detailed workflows only when
              needed.
            </p>
          </div>
          <div className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Security Operations Layer
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {SIGNALS.map((signal) => (
          <article
            key={signal.label}
            className="rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-[#191919] p-5"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              {signal.label}
            </p>
            <p className={`mt-3 text-2xl font-black ${getToneClasses(signal.tone)}`}>
              {signal.value}
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{signal.note}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Priority Alerts
          </h3>
          <div className="mt-5 space-y-4">
            {PRIORITY_ALERTS.map((alert) => (
              <div key={alert.title} className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {alert.title}
                  </span>
                  <span className={`text-sm font-bold ${getToneClasses(alert.severity === "Critical" ? "rose" : alert.severity === "High" ? "amber" : alert.severity === "Medium" ? "cyan" : "emerald")}`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {alert.detail}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Monitoring Areas
          </h3>
          <div className="mt-5 space-y-4">
            {MONITORING_AREAS.map((area) => (
              <div key={area.key} className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <span className="material-symbols-outlined text-[16px] text-slate-500 dark:text-slate-400">
                      {area.icon}
                    </span>
                    {area.title}
                  </span>
                  <span className={`text-sm font-bold ${area.status === 'Healthy' ? 'text-emerald-600 dark:text-emerald-300' : area.status === 'Watch' ? 'text-amber-600 dark:text-amber-300' : 'text-rose-600 dark:text-rose-300'}`}>
                    {area.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400">{area.summary}</p>
                  <p className="text-xs font-bold text-slate-700 dark:text-white whitespace-nowrap">
                    {area.metricLabel}: <span className="text-slate-500 dark:text-slate-300 font-normal">{area.metricValue}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
              Recent Security Events
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Unified event list for quick triage before opening detailed logs.
            </p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            {RECENT_EVENTS.length} entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                <th className="px-3 py-3 font-semibold">Area</th>
                <th className="px-3 py-3 font-semibold">Source</th>
                <th className="px-3 py-3 font-semibold">Event</th>
                <th className="px-3 py-3 font-semibold">Severity</th>
                <th className="px-3 py-3 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_EVENTS.map((event) => (
                <tr
                  key={`${event.area}-${event.timestamp}-${event.source}`}
                  className="border-b border-slate-100 dark:border-white/5"
                >
                  <td className="px-3 py-3 text-slate-700 dark:text-slate-200">{event.area}</td>
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{event.source}</td>
                  <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{event.detail}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${getSeverityClasses(event.severity)}`}
                    >
                      {event.severity}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-500 dark:text-slate-400">
                    {event.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
              User Activity Logs
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Recent user actions and system changes across the platform.
            </p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            {ACTIVITY_LOGS.length} entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                <th className="px-3 py-3 font-semibold">User</th>
                <th className="px-3 py-3 font-semibold">Action</th>
                <th className="px-3 py-3 font-semibold">Entity</th>
                <th className="px-3 py-3 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {ACTIVITY_LOGS.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-slate-100 dark:border-white/5"
                >
                  <td className="px-3 py-3 text-slate-700 dark:text-slate-200">{log.user_email}</td>
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{log.action}</td>
                  <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{log.entity || "-"}</td>
                  <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{log.timestamp}</td>
                </tr>
              ))}
              {ACTIVITY_LOGS.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-8 text-center text-slate-400 dark:text-slate-500">
                    No recent activity logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          to="/admin/settings/security"
          className="rounded border border-rose-400/20 bg-white dark:bg-[#191919] p-5 transition-colors hover:border-rose-400/40 hover:bg-rose-500/5"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600/70 dark:text-rose-200/70">
            Policy controls
          </p>
          <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
            Open security settings
          </h4>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Adjust rate limits, lockout rules, prompt validation, and JWT
            policy.
          </p>
        </Link>

        <Link
          to="/admin/logs"
          className="rounded border border-rose-400/20 bg-white dark:bg-[#191919] p-5 transition-colors hover:border-rose-400/40 hover:bg-rose-500/5"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600/70 dark:text-rose-200/70">
            Deep diagnostics
          </p>
          <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
            Open AI logs and traceability
          </h4>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Investigate full request traces and correlation IDs for incidents.
          </p>
        </Link>
      </section>
    </div>
  );
};

export default SecurityMonitoringPage;
