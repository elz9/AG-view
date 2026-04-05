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
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "completed";
  agents: number;
  tasksTotal: number;
  tasksDone: number;
  tokens: number;
  cost: string;
  branch: string;
  lastActivity: string;
  color: string;
}

const PROJECTS: Project[] = [
  {
    id: "1",
    name: "Auth Refactor",
    description:
      "Migrating legacy auth system to JWT with refresh token rotation",
    status: "active",
    agents: 2,
    tasksTotal: 12,
    tasksDone: 8,
    tokens: 86400,
    cost: "$4.32",
    branch: "feat/auth-v2",
    lastActivity: "2m ago",
    color: "indigo",
  },
  {
    id: "2",
    name: "Test Coverage",
    description:
      "Increasing unit & integration test coverage to 80%+ across all modules",
    status: "active",
    agents: 1,
    tasksTotal: 20,
    tasksDone: 9,
    tokens: 44200,
    cost: "$2.21",
    branch: "feat/tests",
    lastActivity: "11m ago",
    color: "emerald",
  },
  {
    id: "3",
    name: "Memory System v2",
    description:
      "Building vector-backed persistent memory with semantic search",
    status: "active",
    agents: 1,
    tasksTotal: 8,
    tasksDone: 6,
    tokens: 102100,
    cost: "$5.10",
    branch: "feat/memory-v2",
    lastActivity: "38m ago",
    color: "violet",
  },
  {
    id: "4",
    name: "CI/CD Pipeline",
    description:
      "Automated deployment pipeline with staging and production gates",
    status: "paused",
    agents: 0,
    tasksTotal: 6,
    tasksDone: 6,
    tokens: 28900,
    cost: "$1.44",
    branch: "feat/cicd",
    lastActivity: "2d ago",
    color: "amber",
  },
  {
    id: "5",
    name: "API Documentation",
    description: "Generating comprehensive OpenAPI docs from codebase",
    status: "completed",
    agents: 0,
    tasksTotal: 5,
    tasksDone: 5,
    tokens: 19200,
    cost: "$0.96",
    branch: "docs/api",
    lastActivity: "5d ago",
    color: "slate",
  },
];

const STATUS_CONFIG = {
  active: {
    label: "Active",
    icon: Circle,
    class: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  paused: {
    label: "Paused",
    icon: AlertCircle,
    class: "bg-amber-50 text-amber-700 border-amber-100",
  },
  completed: {
    label: "Done",
    icon: CheckCircle2,
    class: "bg-slate-100 text-slate-600 border-slate-200",
  },
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

export default function ProjectsView() {
  const active = PROJECTS.filter((p) => p.status === "active").length;
  const totalTokens = PROJECTS.reduce((s, p) => s + p.tokens, 0);

  return (
    <div className="space-y-5 max-w-[1200px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {active} active · {(totalTokens / 1000).toFixed(0)}k total tokens
            used
          </p>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors">
          <Plus className="w-3.5 h-3.5" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {PROJECTS.map((project) => {
          const progress = Math.round(
            (project.tasksDone / project.tasksTotal) * 100,
          );
          const status = STATUS_CONFIG[project.status];
          const StatusIcon = status.icon;

          return (
            <div
              key={project.id}
              className={cn(
                "bg-white rounded-xl border border-slate-100 border-l-4 p-4 hover:border-slate-200 hover:shadow-sm transition-all group cursor-pointer",
                ACCENT[project.color],
              )}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  <FolderOpen className="w-4 h-4 text-slate-500" />
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {project.name}
                    </h3>
                    <span
                      className={cn(
                        "text-[10px] font-semibold px-1.5 py-0.5 rounded-full border",
                        status.class,
                      )}
                    >
                      {status.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {/* Progress bar */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          PROGRESS_COLOR[project.color],
                        )}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">
                      {project.tasksDone}/{project.tasksTotal} tasks
                    </span>
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center gap-4 flex-wrap">
                    {project.agents > 0 && (
                      <span className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Bot className="w-3 h-3" />
                        {project.agents} agent{project.agents > 1 ? "s" : ""}
                      </span>
                    )}
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
