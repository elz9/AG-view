"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Search,
  Terminal,
  Clock,
  Zap,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  GitBranch,
  FileText,
} from "lucide-react";

interface Session {
  id: string;
  name: string;
  cli: string;
  model: string;
  project: string;
  branch: string;
  startedAt: string;
  duration: string;
  state: "completed" | "error" | "abandoned";
  tokensIn: number;
  tokensOut: number;
  cost: string;
  filesChanged: number;
  tools: { name: string; count: number }[];
  summary: string;
}

const SESSIONS: Session[] = [
  {
    id: "s1",
    name: "auth-refactor",
    cli: "Claude Code",
    model: "claude-sonnet-4-6",
    project: "ag-desk",
    branch: "feat/auth-v2",
    startedAt: "Today, 2:08 PM",
    duration: "24m",
    state: "completed",
    tokensIn: 10400,
    tokensOut: 3800,
    cost: "$0.71",
    filesChanged: 4,
    tools: [
      { name: "write_file", count: 6 },
      { name: "read_file", count: 14 },
      { name: "bash", count: 3 },
    ],
    summary: "Refactored auth middleware to RS256 JWT, added refresh token rotation, updated tests.",
  },
  {
    id: "s2",
    name: "api-endpoints",
    cli: "Codex CLI",
    model: "gpt-4o",
    project: "ag-desk",
    branch: "feat/product-api",
    startedAt: "Today, 1:30 PM",
    duration: "38m",
    state: "completed",
    tokensIn: 15900,
    tokensOut: 5400,
    cost: "$1.06",
    filesChanged: 7,
    tools: [
      { name: "write_file", count: 10 },
      { name: "read_file", count: 18 },
      { name: "bash", count: 5 },
    ],
    summary: "Generated REST endpoint stubs for product routes, updated OpenAPI spec.",
  },
  {
    id: "s3",
    name: "docs-gen",
    cli: "OpenCode",
    model: "claude-opus-4-6",
    project: "ag-desk",
    branch: "docs/api",
    startedAt: "Today, 12:15 PM",
    duration: "6m",
    state: "error",
    tokensIn: 2100,
    tokensOut: 800,
    cost: "$0.18",
    filesChanged: 0,
    tools: [{ name: "read_file", count: 3 }],
    summary: "Session disconnected unexpectedly. No files were modified.",
  },
  {
    id: "s4",
    name: "test-coverage",
    cli: "Claude Code",
    model: "claude-sonnet-4-6",
    project: "ag-desk",
    branch: "feat/tests",
    startedAt: "Today, 11:00 AM",
    duration: "19m",
    state: "completed",
    tokensIn: 8200,
    tokensOut: 2900,
    cost: "$0.49",
    filesChanged: 5,
    tools: [
      { name: "write_file", count: 7 },
      { name: "bash", count: 8 },
      { name: "read_file", count: 11 },
    ],
    summary: "Added unit tests for user auth, login, and token refresh flows. Coverage up 12%.",
  },
  {
    id: "s5",
    name: "db-schema",
    cli: "Claude Code",
    model: "claude-sonnet-4-6",
    project: "ag-desk",
    branch: "feat/db",
    startedAt: "Yesterday, 4:45 PM",
    duration: "31m",
    state: "abandoned",
    tokensIn: 12300,
    tokensOut: 4100,
    cost: "$0.82",
    filesChanged: 2,
    tools: [
      { name: "read_file", count: 22 },
      { name: "write_file", count: 3 },
      { name: "bash", count: 1 },
    ],
    summary: "Session left waiting for user input for 47 minutes and was auto-closed.",
  },
  {
    id: "s6",
    name: "rate-limiting",
    cli: "Claude Code",
    model: "claude-sonnet-4-6",
    project: "ag-desk",
    branch: "feat/auth-v2",
    startedAt: "Yesterday, 2:10 PM",
    duration: "15m",
    state: "completed",
    tokensIn: 6800,
    tokensOut: 2100,
    cost: "$0.39",
    filesChanged: 3,
    tools: [
      { name: "write_file", count: 4 },
      { name: "read_file", count: 9 },
      { name: "bash", count: 2 },
    ],
    summary: "Added rate limiting middleware to auth endpoints using express-rate-limit.",
  },
];

const STATE_CFG = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    cls: "bg-emerald-50 text-emerald-700 border-emerald-100",
    dot: "bg-emerald-500",
  },
  error: {
    label: "Error",
    icon: XCircle,
    cls: "bg-red-50 text-red-600 border-red-100",
    dot: "bg-red-500",
  },
  abandoned: {
    label: "Abandoned",
    icon: AlertCircle,
    cls: "bg-amber-50 text-amber-700 border-amber-100",
    dot: "bg-amber-400",
  },
};

const CLI_COLOR: Record<string, string> = {
  "Claude Code": "bg-orange-50 text-orange-600",
  "Codex CLI": "bg-green-50 text-green-600",
  "OpenCode": "bg-blue-50 text-blue-600",
};

const TOOL_COLOR: Record<string, string> = {
  write_file: "text-indigo-600 bg-indigo-50",
  read_file: "text-sky-600 bg-sky-50",
  bash: "text-slate-600 bg-slate-100",
  search: "text-violet-600 bg-violet-50",
};

export default function SessionHistory() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "error" | "abandoned">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = SESSIONS.filter((s) => {
    const matchQ =
      query === "" ||
      s.name.includes(query) ||
      s.project.includes(query) ||
      s.cli.toLowerCase().includes(query.toLowerCase());
    const matchF = filter === "all" || s.state === filter;
    return matchQ && matchF;
  });

  const totalCost = SESSIONS.reduce((a, s) => a + parseFloat(s.cost.replace("$", "")), 0);
  const totalTokens = SESSIONS.reduce((a, s) => a + s.tokensIn + s.tokensOut, 0);

  return (
    <div className="space-y-5 max-w-[1100px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Run History</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {SESSIONS.length} sessions · ${totalCost.toFixed(2)} total · {(totalTokens / 1000).toFixed(0)}k tokens
          </p>
        </div>
      </div>

      {/* Filter pills */}
      <div className="grid grid-cols-3 gap-3">
        {(["completed", "error", "abandoned"] as const).map((state) => {
          const count = SESSIONS.filter((s) => s.state === state).length;
          const cfg = STATE_CFG[state];
          const Icon = cfg.icon;
          return (
            <button
              key={state}
              onClick={() => setFilter(filter === state ? "all" : state)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left",
                filter === state
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "bg-white border-slate-100 hover:border-slate-200"
              )}
            >
              <Icon className={cn("w-4 h-4 shrink-0", filter === state ? "text-white" : "text-slate-400")} />
              <div>
                <p className={cn("text-lg font-bold leading-none mb-0.5", filter === state ? "text-white" : "text-slate-800")}>{count}</p>
                <p className={cn("text-[11px]", filter === state ? "text-slate-300" : "text-slate-400")}>{cfg.label}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
        <input
          type="text"
          placeholder="Search sessions, projects, CLI tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white placeholder-slate-300 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 transition-all"
        />
      </div>

      {/* Sessions */}
      <div className="flex flex-col gap-2">
        {filtered.map((session) => {
          const cfg = STATE_CFG[session.state];
          const isOpen = expanded === session.id;

          return (
            <div key={session.id} className="bg-white border border-slate-100 rounded-xl overflow-hidden hover:border-slate-200 transition-colors">
              <button
                className="w-full flex items-center gap-4 px-5 py-4 text-left"
                onClick={() => setExpanded(isOpen ? null : session.id)}
              >
                <span className={cn("w-2 h-2 rounded-full shrink-0", cfg.dot)} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-sm font-semibold text-slate-800">{session.name}</span>
                    <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full", CLI_COLOR[session.cli] ?? "bg-slate-100 text-slate-500")}>
                      {session.cli}
                    </span>
                    <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full border", cfg.cls)}>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />{session.branch}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />{session.startedAt} · {session.duration}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-700">{session.filesChanged} files</p>
                    <p className="text-[10px] text-slate-400">changed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-700">{((session.tokensIn + session.tokensOut) / 1000).toFixed(1)}k</p>
                    <p className="text-[10px] text-slate-400">tokens</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-700">{session.cost}</p>
                    <p className="text-[10px] text-slate-400">cost</p>
                  </div>
                  <ChevronRight className={cn("w-4 h-4 text-slate-300 transition-transform duration-200", isOpen && "rotate-90")} />
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 px-5 py-4 bg-slate-50/50 space-y-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Summary</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{session.summary}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Token breakdown</p>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Input tokens</span>
                          <span className="font-medium text-slate-700">{session.tokensIn.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Output tokens</span>
                          <span className="font-medium text-slate-700">{session.tokensOut.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-1.5">
                          <span className="text-slate-500 font-medium">Total cost</span>
                          <span className="font-bold text-slate-800">{session.cost}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Tools used</p>
                      <div className="flex flex-wrap gap-1.5">
                        {session.tools.map((t) => (
                          <span key={t.name} className={cn("text-[10px] font-medium px-2 py-1 rounded-lg", TOOL_COLOR[t.name] ?? "bg-slate-100 text-slate-500")}>
                            {t.name} ×{t.count}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                    <Terminal className="w-3 h-3" />
                    <span>Model: <span className="font-medium text-slate-600 font-mono">{session.model}</span></span>
                    <span className="text-slate-200">·</span>
                    <span>Project: <span className="font-medium text-slate-600">{session.project}</span></span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 bg-white rounded-xl border border-slate-100 text-center">
            <FileText className="w-8 h-8 text-slate-200 mb-2" />
            <p className="text-sm text-slate-400">No sessions match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
