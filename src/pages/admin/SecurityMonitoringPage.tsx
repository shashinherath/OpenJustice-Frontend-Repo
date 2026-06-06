import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adminService } from "@/services/adminService";
import type { SecuritySignal, MonitoringArea, PriorityAlert, SecurityEventRecord, AdminSecurityMonitoringResponse } from "@/services/adminService";




const getToneClasses = (tone: string) => {
  const toneMap: Record<string, string> = {
    emerald: "text-emerald-300",
    cyan: "text-cyan-300",
    amber: "text-amber-300",
    rose: "text-rose-300",
    violet: "text-violet-300",
  };

  return toneMap[tone];
};

const getSeverityClasses = (severity: string) => {
  if (severity === "Critical") {
    return "bg-rose-500/15 text-rose-300";
  }

  if (severity === "High") {
    return "bg-amber-500/15 text-amber-300";
  }

  if (severity === "Medium") {
    return "bg-cyan-500/15 text-cyan-300";
  }

  return "bg-emerald-500/15 text-emerald-300";
};

const getStatusClasses = (status: MonitoringArea["status"]) => {
  if (status === "Healthy") {
    return "bg-emerald-500/15 text-emerald-300";
  }

  if (status === "Watch") {
    return "bg-amber-500/15 text-amber-300";
  }

  return "bg-rose-500/15 text-rose-300";
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
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-rose-400">Loading security monitoring data...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-rose-500">Failed to load security monitoring data.</div>
      </div>
    );
  }

  const SIGNALS = data.signals;
  const MONITORING_AREAS = data.monitoring_areas;
  const PRIORITY_ALERTS = data.priority_alerts;
  const RECENT_EVENTS = data.recent_events;

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-rose-400/20 bg-[#191919] p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-200/70">
              AI Safety Operations
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              Security Monitoring
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-300">
              Security events are organized into one user-friendly view so your
              team can scan risk quickly and open detailed workflows only when
              needed.
            </p>
          </div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            Back to Overview
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {SIGNALS.map((signal) => (
          <article
            key={signal.label}
            className={`rounded border border-white/10 bg-[#191919] p-5 ${getToneClasses(signal.tone)}`}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              {signal.label}
            </p>
            <p className="mt-3 text-2xl font-black text-white">
              {signal.value}
            </p>
            <p className="mt-2 text-xs text-slate-400">{signal.note}</p>
          </article>
        ))}
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Priority Alerts
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Focus on these first during incident triage.
            </p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Top 3 active signals
          </span>
        </div>

        <div className="space-y-3">
          {PRIORITY_ALERTS.map((alert) => (
            <article
              key={alert.title}
              className="rounded border border-white/10 bg-black/30 p-4"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {alert.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-400">{alert.detail}</p>
                </div>
                <span
                  className={`inline-flex w-fit rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${getSeverityClasses(alert.severity)}`}
                >
                  {alert.severity}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Monitoring Areas
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Five focused areas with a clear status and one key metric each.
            </p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Single-page operations
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {MONITORING_AREAS.map((area) => (
            <article
              key={area.key}
              className="rounded border border-white/10 bg-black/30 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[19px] text-slate-300">
                      {area.icon}
                    </span>
                    <h4 className="text-sm font-semibold text-white">
                      {area.title}
                    </h4>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{area.summary}</p>
                </div>
                <span
                  className={`inline-flex h-fit rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${getStatusClasses(area.status)}`}
                >
                  {area.status}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between rounded border border-white/10 bg-white/5 px-3 py-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {area.metricLabel}
                </span>
                <span className="text-base font-black text-white">
                  {area.metricValue}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Recent Security Events
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Unified event list for quick triage before opening detailed logs.
            </p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {RECENT_EVENTS.length} entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-500">
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
                  className="border-b border-white/5"
                >
                  <td className="px-3 py-3 text-slate-200">{event.area}</td>
                  <td className="px-3 py-3 text-slate-300">{event.source}</td>
                  <td className="px-3 py-3 text-slate-400">{event.detail}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${getSeverityClasses(event.severity)}`}
                    >
                      {event.severity}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-400">
                    {event.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          to="/admin/settings/security"
          className="rounded border border-rose-400/20 bg-[#191919] p-5 transition-colors hover:border-rose-400/40 hover:bg-rose-500/5"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-200/70">
            Policy controls
          </p>
          <h4 className="mt-2 text-base font-bold text-white">
            Open security settings
          </h4>
          <p className="mt-2 text-sm text-slate-400">
            Adjust rate limits, lockout rules, prompt validation, and JWT
            policy.
          </p>
        </Link>

        <Link
          to="/admin/logs"
          className="rounded border border-rose-400/20 bg-[#191919] p-5 transition-colors hover:border-rose-400/40 hover:bg-rose-500/5"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-200/70">
            Deep diagnostics
          </p>
          <h4 className="mt-2 text-base font-bold text-white">
            Open AI logs and traceability
          </h4>
          <p className="mt-2 text-sm text-slate-400">
            Investigate full request traces and correlation IDs for incidents.
          </p>
        </Link>
      </section>
    </div>
  );
};

export default SecurityMonitoringPage;
