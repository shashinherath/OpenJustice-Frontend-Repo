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

interface SecurityEvent {
  actor: string;
  detail: string;
  timestamp: string;
  severity: Severity;
}

interface SecuritySection {
  title: string;
  icon: string;
  description: string;
  summaryLabel: string;
  summaryValue: string;
  summaryNote: string;
  accent: SecurityTone;
  events: SecurityEvent[];
}

const SIGNALS: SecuritySignal[] = [
  {
    label: "Prompt Injection Attempts",
    value: "128",
    note: "Blocked by prompt validation and content heuristics in the last 24 hours.",
    tone: "rose",
  },
  {
    label: "Failed Logins",
    value: "57",
    note: "Authentication failures with clustered bursts from three source IP ranges.",
    tone: "amber",
  },
  {
    label: "Active Sessions",
    value: "2,430",
    note: "Live user sessions with session refresh and revocation tracking enabled.",
    tone: "cyan",
  },
  {
    label: "Rate Limit Events",
    value: "114",
    note: "Requests throttled before reaching downstream AI and API services.",
    tone: "emerald",
  },
  {
    label: "JWT Activity",
    value: "6 anomalies",
    note: "Invalid, expired, or replayed token events detected during validation.",
    tone: "violet",
  },
];

const SECURITY_SECTIONS: SecuritySection[] = [
  {
    title: "Prompt Injection",
    icon: "psychology",
    description:
      "Monitor adversarial prompts, policy bypass attempts, and model-directed manipulation before the request reaches the LLM.",
    summaryLabel: "Injection blocks",
    summaryValue: "128",
    summaryNote: "97.8% blocked before generation, 2.2% escalated for review.",
    accent: "rose",
    events: [
      {
        actor: "Web chat client",
        detail:
          "Detected jailbreak phrasing combined with instruction override tokens.",
        timestamp: "2026-05-24 09:42",
        severity: "High",
      },
      {
        actor: "WhatsApp channel",
        detail:
          "Obfuscated prompt tried to force policy disclosure and hidden chain-of-thought requests.",
        timestamp: "2026-05-24 08:57",
        severity: "Medium",
      },
      {
        actor: "Research workspace",
        detail:
          "Repeated prompt injection pattern matched the legal escalation blocklist.",
        timestamp: "2026-05-24 08:11",
        severity: "High",
      },
    ],
  },
  {
    title: "Failed Logins",
    icon: "vpn_key",
    description:
      "Track authentication failures, password spraying, lockouts, and repeated access attempts across the admin surface.",
    summaryLabel: "Lockouts triggered",
    summaryValue: "8",
    summaryNote:
      "Most events were contained within a short burst window and auto-throttled.",
    accent: "amber",
    events: [
      {
        actor: "Admin portal",
        detail:
          "Five consecutive failures from one account caused a temporary lockout.",
        timestamp: "2026-05-24 10:03",
        severity: "Medium",
      },
      {
        actor: "Mobile login",
        detail:
          "Multiple invalid password attempts were correlated to a suspicious IP cluster.",
        timestamp: "2026-05-24 09:38",
        severity: "High",
      },
      {
        actor: "Partner account",
        detail:
          "Expired credentials generated a failure spike after session renewal.",
        timestamp: "2026-05-24 08:20",
        severity: "Low",
      },
    ],
  },
  {
    title: "Session Monitoring",
    icon: "devices",
    description:
      "Observe active sessions, device churn, geo anomalies, and token revocations from one operational view.",
    summaryLabel: "Suspicious sessions",
    summaryValue: "4",
    summaryNote:
      "Flagged when device fingerprint or location drift exceeded policy thresholds.",
    accent: "cyan",
    events: [
      {
        actor: "Desktop session",
        detail:
          "New device fingerprint appeared without a matching trusted browser profile.",
        timestamp: "2026-05-24 10:11",
        severity: "Medium",
      },
      {
        actor: "Field investigator",
        detail:
          "Session moved from Colombo to a new region within the same refresh cycle.",
        timestamp: "2026-05-24 09:50",
        severity: "High",
      },
      {
        actor: "Supervisor workspace",
        detail:
          "Token revocation completed after logout propagation across web and mobile clients.",
        timestamp: "2026-05-24 09:04",
        severity: "Low",
      },
    ],
  },
  {
    title: "Rate Limits",
    icon: "speed",
    description:
      "Monitor request throttling and burst pressure so API, retrieval, and model usage stay inside safe envelopes.",
    summaryLabel: "Throttled requests",
    summaryValue: "114",
    summaryNote:
      "Most pressure came from one multilingual batch and was absorbed before upstream failure.",
    accent: "emerald",
    events: [
      {
        actor: "AI chat endpoint",
        detail:
          "Burst traffic exceeded the per-minute policy and was returned with retry guidance.",
        timestamp: "2026-05-24 10:18",
        severity: "Medium",
      },
      {
        actor: "Admin export job",
        detail:
          "Large export workflow tripped the hourly quota and shifted to deferred processing.",
        timestamp: "2026-05-24 09:29",
        severity: "Low",
      },
      {
        actor: "Translation pipeline",
        detail:
          "Sustained burst matched the rate curve that usually precedes abuse or automation.",
        timestamp: "2026-05-24 08:46",
        severity: "High",
      },
    ],
  },
  {
    title: "JWT Activity",
    icon: "token",
    description:
      "Inspect token issuance, refresh, expiry, and invalid token detection for authentication integrity.",
    summaryLabel: "Invalid tokens",
    summaryValue: "6",
    summaryNote:
      "Tokens were rejected for expiry, replay, or signature mismatch during validation.",
    accent: "violet",
    events: [
      {
        actor: "Refresh endpoint",
        detail:
          "A rotated token was reused after revocation and failed signature validation.",
        timestamp: "2026-05-24 10:06",
        severity: "High",
      },
      {
        actor: "Chat gateway",
        detail:
          "Expired access token was detected before request forwarding to the conversation service.",
        timestamp: "2026-05-24 09:33",
        severity: "Medium",
      },
      {
        actor: "Admin console",
        detail:
          "Session token refresh completed and old token was added to the deny list.",
        timestamp: "2026-05-24 08:28",
        severity: "Low",
      },
    ],
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

const getAccentBorder = (tone: SecurityTone) => {
  const toneMap: Record<SecurityTone, string> = {
    emerald: "border-emerald-400/20",
    cyan: "border-cyan-400/20",
    amber: "border-amber-400/20",
    rose: "border-rose-400/20",
    violet: "border-violet-400/20",
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
              Monitor prompt injection attempts, failed logins, session
              anomalies, rate limit pressure, and JWT activity from one
              consolidated page aligned with the platform&apos;s legal and
              multilingual risk profile.
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

      <section className="space-y-4 rounded border border-slate-700/70 bg-[#191919] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Unified Security Feed
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Each subsection stays on the same page to keep operational review
              fast and reduce context switching.
            </p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Live operational snapshot
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {SECURITY_SECTIONS.map((section) => (
            <article
              key={section.title}
              className={`rounded border ${getAccentBorder(section.accent)} bg-black/30 p-5`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-[20px] ${getToneClasses(section.accent)}`}
                    >
                      {section.icon}
                    </span>
                    <h4 className="text-base font-bold text-white">
                      {section.title}
                    </h4>
                  </div>
                  <p className="mt-2 max-w-xl text-sm text-slate-400">
                    {section.description}
                  </p>
                </div>
                <div className="rounded border border-white/10 bg-white/5 px-3 py-2 text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {section.summaryLabel}
                  </p>
                  <p
                    className={`mt-1 text-xl font-black ${getToneClasses(section.accent)}`}
                  >
                    {section.summaryValue}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                {section.summaryNote}
              </p>

              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-500">
                      <th className="px-3 py-3 font-semibold">Source</th>
                      <th className="px-3 py-3 font-semibold">Event</th>
                      <th className="px-3 py-3 font-semibold">Severity</th>
                      <th className="px-3 py-3 font-semibold">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.events.map((event) => (
                      <tr
                        key={`${section.title}-${event.timestamp}-${event.actor}`}
                        className="border-b border-white/5"
                      >
                        <td className="px-3 py-3 text-slate-300">
                          {event.actor}
                        </td>
                        <td className="px-3 py-3 text-slate-400">
                          {event.detail}
                        </td>
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
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SecurityMonitoringPage;
