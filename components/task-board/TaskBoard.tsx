"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Plus,
  Bot,
  User,
  Clock,
  Zap,
  CheckCircle2,
  Circle,
  AlertCircle,
  Timer,
  MoreHorizontal,
  Terminal,
  GitBranch,
  Info,
} from "lucide-react";

type TaskStatus = "queued" | "in-progress" | "review" | "done";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignee: "human" | "agent";
  agentName?: string;
  cli?: string;
  priority: "low" | "medium" | "high";
  tags: string[];
  tokens?: number;
  cost?: string;
  duration?: string;
  branch?: string;
  autoDetected?: boolean;
}

const TASKS: Task[] = [
  {
    id: "1",
    title: "Add rate limiting to /api/auth/login endpoint",
    status: "queued",
    assignee: "human",
    priority: "high",
    tags: ["security", "api"],
  },
  {
    id: "2",
    title: "Refactor auth middleware to use RS256 JWT",
    status: "in-progress",
    assignee: "agent",
    agentName: "auth-refactor",
    cli: "Claude Code",
    priority: "high",
    tags: ["auth"],
    tokens: 14200,
    cost: "$0.71",
    duration: "24m",
    branch: "feat/auth-v2",
    autoDetected: true,
  },
  {
    id: "3",
    title: "Generate REST endpoint stubs for product routes",
    status: "in-progress",
    assignee: "agent",
    agentName: "api-endpoints",
    cli: "Codex CLI",
    priority: "medium",
    tags: ["api"],
    tokens: 21300,
    cost: "$1.06",
    duration: "38m",
    branch: "feat/product-api",
    autoDetected: true,
  },
  {
    id: "4",
    title: "Write unit tests for user authentication flow",
    status: "review",
    assignee: "agent",
    agentName: "test-suite",
    cli: "Claude Code",
    priority: "medium",
    tags: ["testing"],
    tokens: 8900,
    cost: "$0.44",
    duration: "14m",
    branch: "feat/auth-tests",
    autoDetected: true,
  },
  {
    id: "5",
    title: "Fix TypeScript strict mode errors in utils/",
    status: "queued",
    assignee: "human",
    priority: "low",
    tags: ["typescript"],
  },
  {
    id: "6",
    title: "Deploy auth service to staging",
    status: "done",
    assignee: "human",
    priority: "high",
    tags: ["devops"],
    branch: "feat/auth-v2",
  },
  {
    id: "7",
    title: "Update OpenAPI spec with new route definitions",
    status: "done",
    assignee: "agent",
    agentName: "api-endpoints",
    cli: "Codex CLI",
    priority: "low",
    tags: ["docs"],
    tokens: 5600,
    cost: "$0.28",
    duration: "9m",
    autoDetected: true,
  },
];

const COLUMNS: { id: TaskStatus; label: string; accent: string; iconColor: string; count?: boolean }[] = [
  { id: "queued", label: "Queued", accent: "bg-slate-100 text-slate-600", iconColor: "text-slate-400" },
  { id: "in-progress", label: "In Progress", accent: "bg-indigo-50 text-indigo-700", iconColor: "text-indigo-400" },
  { id: "review", label: "Review", accent: "bg-amber-50 text-amber-700", iconColor: "text-amber-400" },
  { id: "done", label: "Done", accent: "bg-emerald-50 text-emerald-700", iconColor: "text-emerald-400" },
];

const PRIORITY_CFG = {
  high: { label: "High", cls: "bg-red-50 text-red-600 border-red-100" },
  medium: { label: "Med", cls: "bg-amber-50 text-amber-600 border-amber-100" },
  low: { label: "Low", cls: "bg-slate-50 text-slate-400 border-slate-100" },
};

const COL_ICON = {
  queued: Circle,
  "in-progress": Timer,
  review: AlertCircle,
  done: CheckCircle2,
};

const CLI_COLOR: Record<string, string> = {
  "Claude Code": "bg-orange-50 text-orange-600",
  "Codex CLI": "bg-green-50 text-green-600",
  "OpenCode": "bg-blue-50 text-blue-600",
};

export default function TaskBoard() {
  const [tasks] = useState<Task[]>(TASKS);

  const byStatus = (s: TaskStatus) => tasks.filter((t) => t.status === s);
  const inProgress = byStatus("in-progress").length;
  const done = byStatus("done").length;
  const autoDetectedCount = tasks.filter((t) => t.autoDetected).length;

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Task Board</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {inProgress} in progress · {done} done
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-indigo-50 border border-indigo-100 px-2.5 py-1.5 rounded-lg">
            <Zap className="w-3 h-3 text-indigo-400" />
            <span className="text-indigo-600 font-medium">{autoDetectedCount} auto-detected</span>
            <span>from agent sessions</span>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Add Task
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-2.5 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-500 leading-relaxed">
          Tasks marked <span className="font-semibold text-indigo-600">auto-detected</span> were inferred from agent JSONL sessions — when an agent starts working, a card appears automatically. You can also add tasks manually and assign them to agents.
        </p>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const colTasks = byStatus(col.id);
          const Icon = COL_ICON[col.id];
          return (
            <div key={col.id} className="flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className={cn("w-3.5 h-3.5", col.iconColor)} />
                  <span className="text-xs font-semibold text-slate-700">{col.label}</span>
                  <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", col.accent)}>
                    {colTasks.length}
                  </span>
                </div>
                <button className="w-5 h-5 rounded flex items-center justify-center text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {colTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
                {colTasks.length === 0 && (
                  <div className="border-2 border-dashed border-slate-100 rounded-xl h-20 flex items-center justify-center">
                    <p className="text-[11px] text-slate-300">Empty</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const p = PRIORITY_CFG[task.priority];
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-3.5 hover:border-slate-200 hover:shadow-sm transition-all group cursor-pointer">
      {/* Auto-detected badge */}
      {task.autoDetected && (
        <div className="flex items-center gap-1 mb-2">
          <Zap className="w-2.5 h-2.5 text-indigo-400" />
          <span className="text-[9px] font-semibold text-indigo-500 uppercase tracking-wide">
            auto-detected
          </span>
        </div>
      )}

      {/* Title */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <p className="text-xs font-medium text-slate-800 leading-relaxed flex-1">{task.title}</p>
        <button className="w-5 h-5 rounded flex items-center justify-center text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all shrink-0">
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2.5">
          {task.tags.map((tag) => (
            <span key={tag} className="text-[10px] bg-slate-50 border border-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-medium">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Branch */}
      {task.branch && (
        <div className="flex items-center gap-1 mb-2.5">
          <GitBranch className="w-3 h-3 text-slate-300" />
          <span className="text-[10px] text-slate-400 font-mono">{task.branch}</span>
        </div>
      )}

      {/* Token info */}
      {task.assignee === "agent" && task.tokens && (
        <div className="flex items-center gap-2 mb-2.5 px-2 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
          <Zap className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="text-[10px] text-slate-600 font-medium">{(task.tokens / 1000).toFixed(1)}k tok</span>
          <span className="text-[10px] text-slate-400">{task.cost}</span>
          <Clock className="w-3 h-3 text-slate-300 ml-auto shrink-0" />
          <span className="text-[10px] text-slate-400">{task.duration}</span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        {task.assignee === "agent" ? (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-slate-900 text-white px-1.5 py-0.5 rounded-md">
              <Terminal className="w-2.5 h-2.5" />
              <span className="text-[10px] font-medium">{task.agentName}</span>
            </div>
            {task.cli && (
              <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-md", CLI_COLOR[task.cli] ?? "bg-slate-100 text-slate-500")}>
                {task.cli}
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md">
            <User className="w-2.5 h-2.5" />
            <span className="text-[10px] font-medium">Manual</span>
          </div>
        )}
        <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-md border", p.cls)}>
          {p.label}
        </span>
      </div>
    </div>
  );
}
