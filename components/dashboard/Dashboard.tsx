"use client";

import { cn } from "@/lib/utils";
import {
  Bot,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Activity,
  Zap,
  DollarSign,
  ArrowUpRight,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react";

const STATS = [
  {
    label: "Active Agents",
    value: "4",
    sub: "+1 from yesterday",
    icon: Bot,
    trend: "up",
    color: "indigo",
  },
  {
    label: "Tasks Completed",
    value: "127",
    sub: "18 today",
    icon: CheckCircle2,
    trend: "up",
    color: "emerald",
  },
  {
    label: "In Progress",
    value: "12",
    sub: "3 awaiting input",
    icon: Clock,
    trend: "neutral",
    color: "amber",
  },
  {
    label: "Est. Cost Today",
    value: "$2.84",
    sub: "$0.48 last hour",
    icon: DollarSign,
    trend: "up",
    color: "violet",
  },
];

const AGENT_STATUS = [
  {
    id: "agent-1",
    name: "Agent-1",
    task: "Refactoring auth module",
    state: "active",
    tool: "write_file",
    tokens: 14200,
    cost: "$0.71",
    duration: "24m",
    progress: 68,
  },
  {
    id: "agent-2",
    name: "Agent-2",
    task: "Writing unit tests",
    state: "waiting",
    tool: "bash",
    tokens: 8900,
    cost: "$0.44",
    duration: "11m",
    progress: 40,
  },
  {
    id: "agent-3",
    name: "Agent-3",
    task: "Memory retrieval + indexing",
    state: "active",
    tool: "search",
    tokens: 21300,
    cost: "$1.06",
    duration: "38m",
    progress: 82,
  },
  {
    id: "agent-4",
    name: "Agent-4",
    task: "Connection failed",
    state: "error",
    tool: "—",
    tokens: 0,
    cost: "$0.00",
    duration: "—",
    progress: 0,
  },
];

const ACTIVITY = [
  {
    agent: "Agent-3",
    action: "Used search",
    detail: "queried vector store",
    time: "just now",
    type: "search",
  },
  {
    agent: "Agent-1",
    action: "Wrote file",
    detail: "src/auth/middleware.ts",
    time: "1m ago",
    type: "write",
  },
  {
    agent: "Agent-2",
    action: "⏸ Waiting",
    detail: "needs user confirmation",
    time: "3m ago",
    type: "waiting",
  },
  {
    agent: "Agent-1",
    action: "Ran bash",
    detail: "npm run typecheck",
    time: "5m ago",
    type: "bash",
  },
  {
    agent: "Agent-3",
    action: "Read file",
    detail: "package.json",
    time: "7m ago",
    type: "read",
  },
  {
    agent: "Agent-1",
    action: "Task complete",
    detail: "login flow refactored ✓",
    time: "18m ago",
    type: "done",
  },
];

const TOKEN_USAGE = [
  { hour: "10am", tokens: 3200 },
  { hour: "11am", tokens: 7800 },
  { hour: "12pm", tokens: 5400 },
  { hour: "1pm", tokens: 9100 },
  { hour: "2pm", tokens: 12400 },
  { hour: "now", tokens: 14200 },
];

const MAX_TOKENS = 16000;

const STATE_CONFIG = {
  active: {
    label: "Active",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  waiting: {
    label: "Waiting",
    dot: "bg-amber-400 animate-pulse",
    badge: "bg-amber-50 text-amber-700 border-amber-100",
  },
  error: {
    label: "Error",
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-700 border-red-100",
  },
  idle: {
    label: "Idle",
    dot: "bg-slate-300",
    badge: "bg-slate-50 text-slate-500 border-slate-100",
  },
};

const TOOL_COLORS: Record<string, string> = {
  write_file: "bg-indigo-50 text-indigo-600",
  bash: "bg-slate-100 text-slate-600",
  search: "bg-violet-50 text-violet-600",
  read_file: "bg-sky-50 text-sky-600",
  "—": "bg-slate-50 text-slate-400",
};

const COLOR_MAP: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  violet: "bg-violet-50 text-violet-600 border-violet-100",
};

const ICON_COLOR: Record<string, string> = {
  indigo: "text-indigo-500",
  emerald: "text-emerald-500",
  amber: "text-amber-500",
  violet: "text-violet-500",
};

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Mission control — real-time agent overview
          </p>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-all">
          <RefreshCw className="w-3 h-3" />
          Refresh
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-slate-100 p-4 hover:border-slate-200 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg border flex items-center justify-center",
                    COLOR_MAP[stat.color],
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <ArrowUpRight
                  className={cn("w-3.5 h-3.5 mt-0.5", ICON_COLOR[stat.color])}
                />
              </div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
              <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                {stat.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* Agents table + Activity feed */}
      <div className="grid grid-cols-[1fr_340px] gap-4">
        {/* Agent status table */}
        <div className="bg-white rounded-xl border border-slate-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-800">
                Agent Status
              </span>
            </div>
            <button className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {AGENT_STATUS.map((agent) => {
              const state =
                STATE_CONFIG[agent.state as keyof typeof STATE_CONFIG];
              const toolClass =
                TOOL_COLORS[agent.tool] ?? "bg-slate-100 text-slate-500";
              return (
                <div
                  key={agent.id}
                  className="px-5 py-3.5 hover:bg-slate-50/60 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {/* Name + state */}
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full shrink-0",
                          state.dot,
                        )}
                      />
                      <span className="text-sm font-medium text-slate-800">
                        {agent.name}
                      </span>
                    </div>

                    {/* Task */}
                    <p className="flex-1 text-xs text-slate-500 truncate">
                      {agent.task}
                    </p>

                    {/* Tool badge */}
                    <span
                      className={cn(
                        "text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0",
                        toolClass,
                      )}
                    >
                      {agent.tool}
                    </span>

                    {/* Tokens */}
                    <span className="text-xs text-slate-400 shrink-0 w-16 text-right">
                      {agent.tokens > 0
                        ? `${(agent.tokens / 1000).toFixed(1)}k tok`
                        : "—"}
                    </span>

                    {/* Cost */}
                    <span className="text-xs font-medium text-slate-600 shrink-0 w-12 text-right">
                      {agent.cost}
                    </span>

                    {/* Duration */}
                    <span className="text-xs text-slate-400 shrink-0 w-8 text-right">
                      {agent.duration}
                    </span>

                    {/* State badge */}
                    <span
                      className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0",
                        state.badge,
                      )}
                    >
                      {state.label}
                    </span>
                  </div>

                  {/* Progress bar */}
                  {agent.progress > 0 && (
                    <div className="mt-2.5 ml-4">
                      <div className="h-1 bg-slate-100 rounded-full overflow-hidden w-full max-w-[280px]">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            agent.state === "active"
                              ? "bg-emerald-400"
                              : agent.state === "waiting"
                                ? "bg-amber-400"
                                : "bg-slate-300",
                          )}
                          style={{ width: `${agent.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-white rounded-xl border border-slate-100">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
            <Activity className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold text-slate-800">
              Live Activity
            </span>
            <span className="ml-auto flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-600 font-medium">
                Live
              </span>
            </span>
          </div>
          <div className="divide-y divide-slate-50 overflow-y-auto max-h-[320px]">
            {ACTIVITY.map((item, i) => (
              <div
                key={i}
                className="px-5 py-3 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold text-slate-700">
                      {item.agent}
                    </span>
                    <span className="text-xs text-slate-500 ml-1.5">
                      {item.action}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[180px]">
                      {item.detail}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-300 shrink-0 mt-0.5">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Token usage sparkline */}
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold text-slate-800">
              Token Usage (today)
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>
              Total:{" "}
              <span className="font-semibold text-slate-700">44.3k tokens</span>
            </span>
            <span>
              Est: <span className="font-semibold text-slate-700">$2.84</span>
            </span>
          </div>
        </div>
        <div className="flex items-end gap-2 h-16">
          {TOKEN_USAGE.map((d) => {
            const pct = d.tokens / MAX_TOKENS;
            return (
              <div
                key={d.hour}
                className="flex-1 flex flex-col items-center gap-1.5"
              >
                <div
                  className="w-full bg-slate-100 rounded-sm overflow-hidden"
                  style={{ height: "48px" }}
                >
                  <div
                    className="w-full bg-indigo-400 rounded-sm transition-all hover:bg-indigo-500"
                    style={{
                      height: `${pct * 100}%`,
                      marginTop: `${(1 - pct) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] text-slate-400">{d.hour}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
