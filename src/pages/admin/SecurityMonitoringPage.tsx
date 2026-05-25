import React from "react";
import { Link } from "react-router-dom";

type SecurityTone = "emerald" | "cyan" | "amber" | "rose" | "violet";
type Severity = "Critical" | "High" | "Medium" | "Low";

interface SecuritySignal {
  label: string;
  value: string;
  note: string;
  tone: SecurityTone;
}

interface MonitoringArea {
  key: string;
  title: string;
  icon: string;
  status: "Healthy" | "Watch" | "Needs Action";
  summary: string;
  metricLabel: string;
  metricValue: string;
}

interface SecurityEvent {
  area: string;
  source: string;
  detail: string;
  severity: Severity;
  timestamp: string;
}

const SIGNALS: SecuritySignal[] = [
  {
    label: "Prompt Injection Attempts",
    value: "128",
    note: "Detected in last 24h",
    tone: "rose",
  },
  {
    label: "Failed Logins",
    value: "57",
    note: "Across web and mobile",
    tone: "amber",
  },
  {
    label: "Active Sessions",
    value: "2,430",
    note: "Tracked for anomalies",
    tone: "cyan",
  },
  {
    label: "Rate Limit Events",
    value: "114",
    note: "Throttled safely",
    tone: "emerald",
  },
  {
    label: "JWT Activity",
    value: "6 anomalies",
    note: "Invalid/expired/replay",
    tone: "violet",
  },
];

const MONITORING_AREAS: MonitoringArea[] = [
  {
    key: "prompt-injection",
    title: "Prompt Injection",
    icon: "psychology",
    status: "Needs Action",
    summary:
      "Adversarial prompts are being blocked, but high-severity attempts increased this morning.",
    metricLabel: "Blocks (24h)",
    metricValue: "128",
  },
  {
    key: "failed-logins",
    title: "Failed Logins",
    icon: "vpn_key",
    status: "Watch",
    summary:
      "Lockout policy is containing most failed login bursts; monitor suspicious IP clusters.",
    metricLabel: "Lockouts (24h)",
    metricValue: "8",
  },
  {
    key: "session-monitoring",
    title: "Session Monitoring",
    icon: "devices",
    status: "Healthy",
    summary:
      "Most sessions are stable with a small number of geo and device-fingerprint anomalies.",
    metricLabel: "Suspicious sessions",
    metricValue: "4",
  },
  {
    key: "rate-limits",
    title: "Rate Limits",
    icon: "speed",
    status: "Healthy",
    summary:
      "Throttling is active and protecting upstream services during batch and burst traffic.",
    metricLabel: "Throttled requests",
    metricValue: "114",
  },
  {
    key: "jwt-activity",
    title: "JWT Activity",
    icon: "token",
    status: "Watch",
    summary:
      "Token validation catches expiry and replay attempts; continue monitoring refresh endpoint anomalies.",
    metricLabel: "Invalid tokens",
    metricValue: "6",
  },
];

const PRIORITY_ALERTS: Array<{
  title: string;
  detail: string;
  severity: Severity;
}> = [
  {
    title: "Jailbreak prompt burst detected",
    detail: "Prompt injection attempts are above baseline between 08:30-10:00.",
    severity: "High",
  },
  {
    title: "Suspicious login cluster",
    detail:
      "Multiple failed admin logins from a narrow IP range triggered lockout controls.",
    severity: "Medium",
  },
  {
    title: "JWT replay attempt blocked",
    detail: "Reused rotated token rejected by signature validation.",
    severity: "High",
  },
];

const RECENT_EVENTS: SecurityEvent[] = [
  {
    area: "Prompt Injection",
    source: "Web chat client",
    detail:
      "Jailbreak phrasing with instruction override tokens blocked pre-generation.",
    severity: "High",
    timestamp: "2026-05-24 09:42",
  },
  {
    area: "Failed Logins",
    source: "Admin portal",
    detail: "Five consecutive failures caused automatic temporary lockout.",
    severity: "Medium",
    timestamp: "2026-05-24 10:03",
  },
  {
    area: "Session Monitoring",
    source: "Field investigator",
    detail: "Location drift detected inside same token refresh cycle.",
    severity: "High",
    timestamp: "2026-05-24 09:50",
  },
  {
    area: "Rate Limits",
    source: "AI chat endpoint",
    detail: "Burst traffic exceeded per-minute policy and was throttled.",
    severity: "Medium",
    timestamp: "2026-05-24 10:18",
  },
  {
    area: "JWT Activity",
    source: "Refresh endpoint",
    detail: "Rotated token reuse failed signature validation.",
    severity: "High",
    timestamp: "2026-05-24 10:06",
  },
];

const getToneClasses = (tone: SecurityTone) => {
  const toneMap: Record<SecurityTone, string> = {
    emerald: "text-emerald-300",
    cyan: "text-cyan-300",
    amber: "text-amber-300",
    rose: "text-rose-300",
    violet: "text-violet-300",
  };

  return toneMap[tone];
};

const getSeverityClasses = (severity: Severity) => {
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
