"use client";

import { cn } from "@/lib/utils";
import {
  Plus,
  Bot,
  GitBranch,
  Clock,
  Zap,
  MoreHorizontal,
  FolderOpen,
  CheckCircle2,
  Circle,
  AlertCircle,
  ArrowUpRight,
  Terminal,
  DollarSign,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  directory: string;
  description: string;
  status: "active" | "paused" | "completed";
  activeSessions: number;
  totalSessions: number;
  tokens: number;
  cost: string;
  branch: string;
  lastActivity: string;
  color: string;
  cliTools: string[];
}

const PROJECTS: Project[] = [
  {
    id: "1",
    name: "Auth Refactor",
    directory: "~/projects/ag-desk",
    description: "Migrating legacy auth to RS256 JWT with refresh token rotation",
    status: "active",
    activeSessions: 2,
    totalSessions: 8,
    tokens: 86400,
    cost: "$4.32",
    branch: "feat/auth-v2",
    lastActivity: "2m ago",
    color: "indigo",
    cliTools: ["Claude Code"],
  },
  {
    id: "2",
    name: "API Endpoints",
    directory: "~/projects/ag-desk",
    description: "Generating REST endpoint stubs for product and user routes",
    status: "active",
    activeSessions: 1,
    totalSessions: 5,
    tokens: 44200,
    cost: "$2.21",
    branch: "feat/product-api",
    lastActivity: "11m ago",
    color: "emerald",
    cliTools: ["Codex CLI"],
  },
  {
    id: "3",
    name: "Test Coverage",
    directory: "~/projects/ag-desk",
    description: "Unit and integration test coverage across auth and API modules",
    status: "active",
    activeSessions: 1,
    totalSessions: 4,
    tokens: 38100,
    cost: "$1.91",
    branch: "feat/tests",
    lastActivity: "38m ago",
    color: "violet",
    cliTools: ["Claude Code"],
  },
  {
    id: "4",
    name: "DB Schema",
    directory: "~/projects/ag-desk",
    description: "Designing and migrating Postgres schema for multi-tenant workspaces",
    status: "paused",
    activeSessions: 0,
    totalSessions: 3,
    tokens: 28900,
    cost: "$1.44",
    branch: "feat/db",
    lastActivity: "2d ago",
    color: "amber",
    cliTools: ["Claude Code"],
  },
  {
    id: "5",
    name: "API Docs",
    directory: "~/projects/ag-desk",
    description: "Auto-generating OpenAPI spec from codebase",
    status: "completed",
    activeSessions: 0,
    totalSessions: 2,
    tokens: 19200,
    cost: "$0.96",
    branch: "docs/api",
    lastActivity: "5d ago",
    color: "slate",
    cliTools: ["OpenCode"],
  },
];

const STATUS_CONFIG = {
  active: { label: "Active", icon: Circle, cls: "bg-emerald-50 text-emerald-700 border-emerald-100", dot: "bg-emerald-500 animate-pulse" },
  paused: { label: "Paused", icon: AlertCircle, cls: "bg-amber-50 text-amber-700 border-amber-100", dot: "bg-amber-400" },
  completed: { label: "Done", icon: CheckCircle2, cls: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-slate-300" },
};

const ACCENT: Record<string, string> = {
  indigo: "border-l-indigo-400",
  emerald: "border-l-emerald-400",
  violet: "border-l-violet-400",
  amber: "border-l-amber-400",
  slate: "border-l-slate-300",
};

const PROGRESS_COLOR: Record<string, string> = {
  indigo: "bg-indigo-400",
  emerald: "bg-emerald-400",
  violet: "bg-violet-400",
  amber: "bg-amber-400",
  slate: "bg-slate-300",
};

const CLI_COLOR: Record<string, string> = {
  "Claude Code": "bg-orange-50 text-orange-600",
  "Codex CLI": "bg-green-50 text-green-600",
  "OpenCode": "bg-blue-50 text-blue-600",
};

export default function ProjectsView() {
  const active = PROJECTS.filter((p) => p.status === "active").length;
  const totalTokens = PROJECTS.reduce((s, p) => s + p.tokens, 0);
  const totalCost = PROJECTS.reduce((s, p) => s + parseFloat(p.cost.replace("$", "")), 0);
  const totalSessions = PROJECTS.reduce((s, p) => s + p.totalSessions, 0);

  return (
    <div className="space-y-5 max-w-[1100px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {active} active · {totalSessions} sessions · ${totalCost.toFixed(2)} total spend
          </p>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors">
          <Plus className="w-3.5 h-3.5" />
          New Project
        </button>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-slate-100 px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 leading-none">{totalSessions}</p>
            <p className="text-xs text-slate-400 mt-0.5">Total sessions</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center">
            <Zap className="w-4 h-4 text-violet-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 leading-none">{(totalTokens / 1000).toFixed(0)}k</p>
            <p className="text-xs text-slate-400 mt-0.5">Total tokens</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 leading-none">${totalCost.toFixed(2)}</p>
            <p className="text-xs text-slate-400 mt-0.5">Total spend</p>
          </div>
        </div>
      </div>

      {/* Project list */}
      <div className="flex flex-col gap-3">
        {PROJECTS.map((project) => {
          const sessionPct = Math.round((project.activeSessions / Math.max(project.totalSessions, 1)) * 100);
          const status = STATUS_CONFIG[project.status];

          return (
            <div
              key={project.id}
              className={cn(
                "bg-white rounded-xl border border-slate-100 border-l-4 p-4 hover:border-slate-200 hover:shadow-sm transition-all group cursor-pointer",
                ACCENT[project.color]
              )}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  <FolderOpen className="w-4 h-4 text-slate-500" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h3 className="text-sm font-semibold text-slate-900">{project.name}</h3>
                    <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full border", status.cls)}>
                      {status.label}
                    </span>
                    {project.activeSessions > 0 && (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        {project.activeSessions} running
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-500 font-mono mb-1">{project.directory}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{project.description}</p>

                  {/* Meta row */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Terminal className="w-3 h-3" />
                      {project.totalSessions} sessions
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <GitBranch className="w-3 h-3" />
                      {project.branch}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Zap className="w-3 h-3" />
                      {(project.tokens / 1000).toFixed(0)}k tok · {project.cost}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      {project.lastActivity}
                    </span>
                    {/* CLI tools used */}
                    <div className="flex items-center gap-1 ml-auto">
                      {project.cliTools.map((cli) => (
                        <span key={cli} className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full", CLI_COLOR[cli] ?? "bg-slate-100 text-slate-500")}>
                          {cli}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
