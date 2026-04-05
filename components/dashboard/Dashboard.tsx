"use client";

import { cn } from "@/lib/utils";
import {
  Bot,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Activity,
  Zap,
  ArrowUpRight,
  MoreHorizontal,
  RefreshCw,
  Terminal,
  AlertTriangle,
  Play,
  Pause,
  StopCircle,
} from "lucide-react";

const STATS = [
  {
    label: "Active Agents",
    value: "4",
    sub: "across 3 CLI tools",
    icon: Bot,
    color: "indigo",
  },
  {
    label: "Sessions Today",
    value: "11",
    sub: "6 completed · 1 stalled",
    icon: Terminal,
    color: "emerald",
  },
  {
    label: "Awaiting Input",
    value: "2",
    sub: "Agent-2 · 14m idle",
    icon: AlertTriangle,
    color: "amber",
  },
  {
    label: "Cost Today",
    value: "$4.21",
    sub: "$0.61 last hour",
    icon: DollarSign,
    color: "violet",
  },
];

const AGENTS = [
  {
    id: "s1",
    name: "auth-refactor",
    cli: "Claude Code",
    cliColor: "bg-orange-50 text-orange-600",
    task: "Refactoring middleware auth layer",
    state: "active",
    tool: "write_file",
    tokens: 14200,
    cost: "$0.71",
    duration: "24m",
    model: "claude-sonnet-4-6",
  },
  {
    id: "s2",
    name: "test-suite",
    cli: "Claude Code",
    cliColor: "bg-orange-50 text-orange-600",
    task: "Writing unit tests for user module",
    state: "waiting",
    tool: "bash",
    tokens: 8900,
    cost: "$0.44",
    duration: "14m",
    model: "claude-sonnet-4-6",
  },
  {
    id: "s3",
    name: "api-endpoints",
    cli: "Codex CLI",
    cliColor: "bg-green-50 text-green-600",
    task: "Generating REST endpoint stubs",
    state: "active",
    tool: "read_file",
    tokens: 21300,
    cost: "$1.06",
    duration: "38m",
    model: "gpt-4o",
  },
  {
    id: "s4",
    name: "docs-gen",
    cli: "OpenCode",
    cliColor: "bg-blue-50 text-blue-600",
    task: "Session disconnected unexpectedly",
    state: "error",
    tool: "—",
    tokens: 0,
    cost: "$0.00",
    duration: "—",
    model: "—",
  },
];

const ACTIVITY = [
  { agent: "api-endpoints", cli: "Codex", action: "read_file", detail: "src/routes/users.ts", time: "just now", state: "active" },
  { agent: "auth-refactor", cli: "Claude", action: "write_file", detail: "src/auth/middleware.ts", time: "48s ago", state: "active" },
  { agent: "test-suite", cli: "Claude", action: "waiting", detail: "needs permission to run bash", time: "14m ago", state: "waiting" },
  { agent: "auth-refactor", cli: "Claude", action: "bash", detail: "npm run typecheck", time: "18m ago", state: "active" },
  { agent: "api-endpoints", cli: "Codex", action: "write_file", detail: "src/routes/products.ts", time: "22m ago", state: "active" },
  { agent: "docs-gen", cli: "OpenCode", action: "error", detail: "session disconnected", time: "31m ago", state: "error" },
];

const COST_BARS = [
  { label: "9am", value: 0.18 },
  { label: "10am", value: 0.44 },
  { label: "11am", value: 0.31 },
  { label: "12pm", value: 0.72 },
  { label: "1pm", value: 0.88 },
  { label: "2pm", value: 1.10 },
  { label: "now", value: 0.58 },
];

const MAX_COST = 1.2;

const STATE_CONFIG = {
  active: {
    label: "Running",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
    ring: "ring-emerald-100",
  },
  waiting: {
    label: "Waiting",
    dot: "bg-amber-400 animate-pulse",
    badge: "bg-amber-50 text-amber-700 border-amber-100",
    ring: "ring-amber-100",
  },
  error: {
    label: "Error",
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-600 border-red-100",
    ring: "ring-red-100",
  },
  idle: {
    label: "Idle",
    dot: "bg-slate-300",
    badge: "bg-slate-50 text-slate-500 border-slate-100",
    ring: "ring-slate-100",
  },
};

const TOOL_COLORS: Record<string, string> = {
  write_file: "bg-indigo-50 text-indigo-600",
  bash: "bg-slate-100 text-slate-600",
  read_file: "bg-sky-50 text-sky-600",
  search: "bg-violet-50 text-violet-600",
  "—": "bg-slate-50 text-slate-300",
};

const COLOR_ICON: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  violet: "bg-violet-50 text-violet-600 border-violet-100",
};

const ACTIVITY_ICON: Record<string, string> = {
  write_file: "bg-indigo-50 text-indigo-500",
  bash: "bg-slate-100 text-slate-500",
  read_file: "bg-sky-50 text-sky-500",
  waiting: "bg-amber-50 text-amber-500",
  error: "bg-red-50 text-red-500",
  active: "bg-emerald-50 text-emerald-500",
};

export default function Dashboard() {
  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Real-time view of all running CLI agents
          </p>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-all">
          <RefreshCw className="w-3 h-3" />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {STATS.map((s) => {
          return (
            <div
              key={s.label}
              className="bg-white rounded-lg border border-slate-100 p-3 hover:border-slate-200 transition-colors"
            >
              <p className="text-lg font-semibold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Agent grid + Activity */}
      <div className="grid grid-cols-[1fr_320px] gap-4">
        {/* Live agent cards */}
        <div className="bg-white rounded-xl border border-slate-100">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold text-slate-800">Live Agents</span>
            </div>
            <span className="text-[10px] text-slate-400">{AGENTS.length} sessions</span>
          </div>

          <div className="divide-y divide-slate-50">
            {AGENTS.map((agent) => {
              const state = STATE_CONFIG[agent.state as keyof typeof STATE_CONFIG];
              const toolCls = TOOL_COLORS[agent.tool] ?? "bg-slate-100 text-slate-400";
              return (
                <div
                  key={agent.id}
                  className={cn(
                    "px-5 py-4 hover:bg-slate-50/60 transition-colors group",
                    agent.state === "waiting" && "bg-amber-50/30"
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {/* Indicator */}
                    <span className={cn("w-2 h-2 rounded-full shrink-0", state.dot)} />

                    {/* Name + CLI */}
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="text-sm font-semibold text-slate-800 truncate">
                        {agent.name}
                      </span>
                      <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0", agent.cliColor)}>
                        {agent.cli}
                      </span>
                    </div>

                    {/* Tool */}
                    <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0", toolCls)}>
                      {agent.tool}
                    </span>

                    {/* Tokens */}
                    <span className="text-[11px] text-slate-400 shrink-0 w-14 text-right">
                      {agent.tokens > 0 ? `${(agent.tokens / 1000).toFixed(1)}k` : "—"}
                    </span>

                    {/* Cost */}
                    <span className="text-[11px] font-semibold text-slate-600 shrink-0 w-10 text-right">
                      {agent.cost}
                    </span>

                    {/* Duration */}
                    <span className="text-[11px] text-slate-400 shrink-0 w-8 text-right">
                      {agent.duration}
                    </span>

                    {/* State */}
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0", state.badge)}>
                      {state.label}
                    </span>
                  </div>

                  {/* Task row */}
                  <div className="ml-5 flex items-center gap-2">
                    <p className="text-[11px] text-slate-400 truncate flex-1">{agent.task}</p>
                    <span className="text-[10px] text-slate-300 shrink-0">{agent.model}</span>
                  </div>

                  {/* Waiting alert */}
                  {agent.state === "waiting" && (
                    <div className="ml-5 mt-2 flex items-center gap-2 px-2.5 py-1.5 bg-amber-50 border border-amber-100 rounded-lg">
                      <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
                      <span className="text-[11px] text-amber-700 font-medium">
                        Agent is waiting for your input — check terminal
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-white rounded-xl border border-slate-100 flex flex-col">
          <div className="flex items-center gap-2 px-4 py-3.5 border-b border-slate-100">
            <Activity className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold text-slate-800">Live Activity</span>
            <span className="ml-auto flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-600 font-medium">live</span>
            </span>
          </div>
          <div className="flex-1 divide-y divide-slate-50 overflow-y-auto">
            {ACTIVITY.map((item, i) => (
              <div key={i} className="px-4 py-3 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start gap-2.5">
                  <div className={cn(
                    "w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5",
                    ACTIVITY_ICON[item.action] ?? ACTIVITY_ICON[item.state]
                  )}>
                    {item.action === "write_file" && <Zap className="w-3 h-3" />}
                    {item.action === "bash" && <Terminal className="w-3 h-3" />}
                    {item.action === "read_file" && <Activity className="w-3 h-3" />}
                    {item.action === "waiting" && <Pause className="w-3 h-3" />}
                    {item.action === "error" && <StopCircle className="w-3 h-3" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-semibold text-slate-700">{item.agent}</span>
                      <span className="text-[10px] text-slate-300">·</span>
                      <span className="text-[10px] text-slate-400">{item.cli}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.detail}</p>
                  </div>
                  <span className="text-[10px] text-slate-300 shrink-0">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cost over time */}
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold text-slate-800">Spend today</span>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <span className="text-slate-400">
              Total: <span className="font-semibold text-slate-700">$4.21</span>
            </span>
            <span className="text-slate-400">
              Tokens: <span className="font-semibold text-slate-700">84.3k</span>
            </span>
            <span className="text-slate-400">
              Sessions: <span className="font-semibold text-slate-700">11</span>
            </span>
          </div>
        </div>
        <div className="flex items-end gap-2" style={{ height: 56 }}>
          {COST_BARS.map((b) => {
            const pct = b.value / MAX_COST;
            return (
              <div key={b.label} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-slate-100 rounded overflow-hidden relative" style={{ height: 44 }}>
                  <div
                    className="w-full bg-indigo-400 hover:bg-indigo-500 transition-colors rounded absolute bottom-0"
                    style={{ height: `${pct * 100}%` }}
                    title={`$${b.value.toFixed(2)}`}
                  />
                </div>
                <span className="text-[10px] text-slate-400">{b.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
