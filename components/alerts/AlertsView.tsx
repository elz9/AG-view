"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  BellRing,
  AlertTriangle,
  Clock,
  Terminal,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Mail,
  Smartphone,
  Settings,
  ChevronRight,
  Zap,
  Bot,
} from "lucide-react";

interface Alert {
  id: string;
  type: "waiting" | "error" | "cost" | "completed";
  agent: string;
  cli: string;
  message: string;
  detail: string;
  time: string;
  read: boolean;
}

const ALERTS: Alert[] = [
  {
    id: "a1",
    type: "waiting",
    agent: "test-suite",
    cli: "Claude Code",
    message: "Agent waiting for your input",
    detail: "Needs permission to run bash — has been idle for 14 minutes",
    time: "14m ago",
    read: false,
  },
  {
    id: "a2",
    type: "error",
    agent: "docs-gen",
    cli: "OpenCode",
    message: "Session disconnected unexpectedly",
    detail: "Process exited with code 1. Check your OpenCode installation.",
    time: "31m ago",
    read: false,
  },
  {
    id: "a3",
    type: "cost",
    agent: "—",
    cli: "All sessions",
    message: "Daily spend threshold reached",
    detail: "You've spent $4.00 today — approaching your $5.00 daily limit",
    time: "1h ago",
    read: true,
  },
  {
    id: "a4",
    type: "completed",
    agent: "auth-refactor",
    cli: "Claude Code",
    message: "Session completed successfully",
    detail: "4 files changed · 14.2k tokens · $0.71",
    time: "2h ago",
    read: true,
  },
  {
    id: "a5",
    type: "completed",
    agent: "rate-limiting",
    cli: "Claude Code",
    message: "Session completed successfully",
    detail: "3 files changed · 8.9k tokens · $0.39",
    time: "Yesterday",
    read: true,
  },
];

const TYPE_CFG = {
  waiting: {
    label: "Waiting",
    icon: AlertTriangle,
    cls: "bg-amber-50 border-amber-200 text-amber-700",
    iconCls: "bg-amber-100 text-amber-600",
    dot: "bg-amber-400",
  },
  error: {
    label: "Error",
    icon: XCircle,
    cls: "bg-red-50 border-red-200 text-red-700",
    iconCls: "bg-red-100 text-red-600",
    dot: "bg-red-500",
  },
  cost: {
    label: "Spend",
    icon: Zap,
    cls: "bg-violet-50 border-violet-200 text-violet-700",
    iconCls: "bg-violet-100 text-violet-600",
    dot: "bg-violet-400",
  },
  completed: {
    label: "Done",
    icon: CheckCircle2,
    cls: "bg-slate-50 border-slate-200 text-slate-600",
    iconCls: "bg-slate-100 text-slate-500",
    dot: "bg-emerald-400",
  },
};

const CLI_COLOR: Record<string, string> = {
  "Claude Code": "bg-orange-50 text-orange-600",
  "Codex CLI": "bg-green-50 text-green-600",
  "OpenCode": "bg-blue-50 text-blue-600",
  "All sessions": "bg-slate-100 text-slate-500",
};

const CHANNELS = [
  { id: "browser", label: "Browser push", icon: Smartphone, enabled: true, desc: "Get notified in this tab" },
  { id: "slack", label: "Slack", icon: MessageCircle, enabled: false, desc: "Send to a Slack channel" },
  { id: "email", label: "Email", icon: Mail, enabled: true, desc: "admin@yourteam.com" },
];

export default function AlertsView() {
  const [alerts, setAlerts] = useState(ALERTS);
  const [tab, setTab] = useState<"alerts" | "settings">("alerts");
  const [channels, setChannels] = useState(CHANNELS);

  const unread = alerts.filter((a) => !a.read).length;

  const markRead = (id: string) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));

  const markAllRead = () => setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));

  const toggleChannel = (id: string) =>
    setChannels((prev) => prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c)));

  return (
    <div className="space-y-5 max-w-[820px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-slate-900">Alerts</h1>
            {unread > 0 && (
              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unread}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-0.5">
            Agent notifications and spend alerts
          </p>
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-all"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {(["alerts", "settings"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize",
              tab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "alerts" ? (
        <div className="flex flex-col gap-2">
          {alerts.map((alert) => {
            const cfg = TYPE_CFG[alert.type];
            const Icon = cfg.icon;
            return (
              <div
                key={alert.id}
                className={cn(
                  "rounded-xl border p-4 transition-all cursor-pointer",
                  alert.read ? "bg-white border-slate-100" : cn("border", cfg.cls),
                  !alert.read && "hover:opacity-90"
                )}
                onClick={() => markRead(alert.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", alert.read ? "bg-slate-100 text-slate-400" : cfg.iconCls)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className={cn("text-sm font-semibold", alert.read ? "text-slate-600" : "text-slate-900")}>
                        {alert.message}
                      </p>
                      {!alert.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mb-2 leading-relaxed">{alert.detail}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1 text-[10px] text-slate-500">
                        <Terminal className="w-3 h-3" />
                        {alert.agent}
                      </span>
                      <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full", CLI_COLOR[alert.cli] ?? "bg-slate-100 text-slate-500")}>
                        {alert.cli}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{alert.time}</span>
                </div>
              </div>
            );
          })}

          {alerts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 bg-white rounded-xl border border-slate-100">
              <BellRing className="w-8 h-8 text-slate-200 mb-2" />
              <p className="text-sm text-slate-400">No alerts</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Notification channels */}
          <div className="bg-white rounded-xl border border-slate-100">
            <div className="px-5 py-4 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-800">Notification channels</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Choose where to receive alerts when agents need attention
              </p>
            </div>
            <div className="divide-y divide-slate-50">
              {channels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <div key={ch.id} className="flex items-center gap-4 px-5 py-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">{ch.label}</p>
                      <p className="text-xs text-slate-400">{ch.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleChannel(ch.id)}
                      className={cn(
                        "relative w-10 h-5 rounded-full transition-colors shrink-0",
                        ch.enabled ? "bg-slate-900" : "bg-slate-200"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200",
                          ch.enabled ? "translate-x-5" : "translate-x-0.5"
                        )}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alert triggers */}
          <div className="bg-white rounded-xl border border-slate-100">
            <div className="px-5 py-4 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-800">Alert triggers</p>
              <p className="text-xs text-slate-400 mt-0.5">What events trigger a notification</p>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { label: "Agent waiting for input", desc: "Fire when any agent pauses waiting for your response", enabled: true, icon: AlertTriangle },
                { label: "Session error or crash", desc: "Fire when a session exits with an error", enabled: true, icon: XCircle },
                { label: "Session completed", desc: "Fire when an agent finishes its turn", enabled: false, icon: CheckCircle2 },
                { label: "Daily spend limit", desc: "Fire when you approach your spend threshold", enabled: true, icon: Zap },
              ].map((trigger) => {
                const Icon = trigger.icon;
                return (
                  <div key={trigger.label} className="flex items-center gap-4 px-5 py-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">{trigger.label}</p>
                      <p className="text-xs text-slate-400">{trigger.desc}</p>
                    </div>
                    <div className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0",
                      trigger.enabled ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"
                    )}>
                      {trigger.enabled ? "On" : "Off"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Spend limit */}
          <div className="bg-white rounded-xl border border-slate-100 px-5 py-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-slate-800">Daily spend limit</p>
              <span className="text-sm font-bold text-slate-900">$5.00</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">You've spent $4.21 today (84%)</p>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-violet-400 rounded-full" style={{ width: "84%" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
