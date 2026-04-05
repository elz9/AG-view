"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Plus,
  MoreHorizontal,
  Bot,
  User,
  Clock,
  Zap,
  GripVertical,
  CheckCircle2,
  Circle,
  AlertCircle,
  Timer,
} from "lucide-react";

type TaskStatus = "backlog" | "in-progress" | "review" | "done";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignee: "human" | "agent";
  agentName?: string;
  priority: "low" | "medium" | "high";
  tags: string[];
  tokens?: number;
  cost?: string;
  duration?: string;
}

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Setup agent infrastructure & WebSocket layer",
    status: "backlog",
    assignee: "human",
    priority: "high",
    tags: ["infra", "backend"],
  },
  {
    id: "2",
    title: "Configure LLM API endpoints and rate limits",
    status: "in-progress",
    assignee: "agent",
    agentName: "Agent-1",
    priority: "high",
    tags: ["api"],
    tokens: 14200,
    cost: "$0.71",
    duration: "24m",
  },
  {
    id: "3",
    title: "Implement memory retrieval with vector DB",
    status: "in-progress",
    assignee: "agent",
    agentName: "Agent-3",
    priority: "medium",
    tags: ["memory", "ai"],
    tokens: 21300,
    cost: "$1.06",
    duration: "38m",
  },
  {
    id: "4",
    title: "Write unit tests for auth middleware",
    status: "review",
    assignee: "agent",
    agentName: "Agent-2",
    priority: "medium",
    tags: ["testing"],
    tokens: 8900,
    cost: "$0.44",
    duration: "11m",
  },
  {
    id: "5",
    title: "Deploy staging environment to Fly.io",
    status: "done",
    assignee: "human",
    priority: "low",
    tags: ["devops"],
  },
  {
    id: "6",
    title: "Design token usage dashboard charts",
    status: "backlog",
    assignee: "human",
    priority: "medium",
    tags: ["ui", "charts"],
  },
  {
    id: "7",
    title: "Integrate Slack webhook for stuck-agent alerts",
    status: "done",
    assignee: "agent",
    agentName: "Agent-1",
    priority: "high",
    tags: ["alerts", "integrations"],
    tokens: 9800,
    cost: "$0.49",
    duration: "19m",
  },
];

const COLUMNS: {
  id: TaskStatus;
  label: string;
  color: string;
  iconColor: string;
}[] = [
  {
    id: "backlog",
    label: "Backlog",
    color: "bg-slate-100 text-slate-600",
    iconColor: "text-slate-400",
  },
  {
    id: "in-progress",
    label: "In Progress",
    color: "bg-indigo-50 text-indigo-700",
    iconColor: "text-indigo-400",
  },
  {
    id: "review",
    label: "Review",
    color: "bg-amber-50 text-amber-700",
    iconColor: "text-amber-400",
  },
  {
    id: "done",
    label: "Done",
    color: "bg-emerald-50 text-emerald-700",
    iconColor: "text-emerald-400",
  },
];

const PRIORITY_CONFIG = {
  high: { label: "High", class: "bg-red-50 text-red-600 border-red-100" },
  medium: {
    label: "Med",
    class: "bg-amber-50 text-amber-600 border-amber-100",
  },
  low: { label: "Low", class: "bg-slate-50 text-slate-500 border-slate-100" },
};

const COL_ICON = {
  backlog: Circle,
  "in-progress": Timer,
  review: AlertCircle,
  done: CheckCircle2,
};

export default function TaskBoard() {
  const [tasks] = useState<Task[]>(INITIAL_TASKS);

  const getTasksByStatus = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status);

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Task Board</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {tasks.filter((t) => t.status === "in-progress").length} tasks in
            progress · {tasks.filter((t) => t.status === "done").length}{" "}
            completed
          </p>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Add Task
        </button>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const colTasks = getTasksByStatus(col.id);
          const ColIcon = COL_ICON[col.id];
          return (
            <div key={col.id} className="flex flex-col min-h-[200px]">
              {/* Column header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ColIcon className={cn("w-3.5 h-3.5", col.iconColor)} />
                  <span className="text-xs font-semibold text-slate-700">
                    {col.label}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                      col.color,
                    )}
                  >
                    {colTasks.length}
                  </span>
                </div>
                <button className="w-6 h-6 rounded-md flex items-center justify-center text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2 flex-1">
                {colTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}

                {colTasks.length === 0 && (
                  <div className="border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center h-24">
                    <p className="text-[11px] text-slate-300">
                      Drop tasks here
                    </p>
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
  const priority = PRIORITY_CONFIG[task.priority];

  return (
    <div className="bg-white border border-slate-100 rounded-xl p-3.5 hover:border-slate-200 hover:shadow-sm transition-all group cursor-pointer">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <p className="text-xs font-medium text-slate-800 leading-relaxed flex-1">
          {task.title}
        </p>
        <button className="w-5 h-5 rounded flex items-center justify-center text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all shrink-0">
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-slate-50 border border-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Token info for agent tasks */}
      {task.assignee === "agent" && task.tokens && (
        <div className="flex items-center gap-2 mb-3 px-2 py-1.5 bg-indigo-50/60 rounded-lg border border-indigo-50">
          <Zap className="w-3 h-3 text-indigo-400 shrink-0" />
          <span className="text-[10px] text-indigo-600 font-medium">
            {(task.tokens / 1000).toFixed(1)}k tokens
          </span>
          <span className="text-[10px] text-indigo-400">{task.cost}</span>
          <Clock className="w-3 h-3 text-indigo-300 ml-auto shrink-0" />
          <span className="text-[10px] text-indigo-400">{task.duration}</span>
        </div>
      )}

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {task.assignee === "agent" ? (
            <div className="flex items-center gap-1 bg-slate-900 text-white px-1.5 py-0.5 rounded-md">
              <Bot className="w-2.5 h-2.5" />
              <span className="text-[10px] font-medium">{task.agentName}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md">
              <User className="w-2.5 h-2.5" />
              <span className="text-[10px] font-medium">You</span>
            </div>
          )}
        </div>
        <span
          className={cn(
            "text-[10px] font-semibold px-1.5 py-0.5 rounded-md border",
            priority.class,
          )}
        >
          {priority.label}
        </span>
      </div>
    </div>
  );
}
