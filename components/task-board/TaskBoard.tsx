"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MOCK_TASKS = [
  { id: "1", title: "Setup agent infrastructure", status: "backlog", assignee: "human" },
  { id: "2", title: "Configure LLM endpoints", status: "in-progress", assignee: "agent" },
  { id: "3", title: "Test memory retrieval", status: "review", assignee: "agent" },
  { id: "4", title: "Deploy to staging", status: "done", assignee: "human" },
];

const COLUMNS = [
  { id: "backlog", label: "Backlog" },
  { id: "in-progress", label: "In Progress" },
  { id: "review", label: "Review" },
  { id: "done", label: "Done" },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(MOCK_TASKS);

  const getTasksByStatus = (status: string) => tasks.filter((t) => t.status === status);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Task Board</h1>
        <p className="text-sm text-slate-500">Manage your tasks</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {COLUMNS.map((col) => (
          <div key={col.id} className="bg-slate-50 rounded-lg p-3">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-slate-700">{col.label}</span>
              <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                {getTasksByStatus(col.id).length}
              </span>
            </div>
            <div className="space-y-2">
              {getTasksByStatus(col.id).map((task) => (
                <Card key={task.id} className="shadow-sm">
                  <CardContent className="p-3">
                    <p className="text-sm text-slate-700">{task.title}</p>
                    <span className="text-xs">
                      {task.assignee === "agent" ? "🤖" : "👤"}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
