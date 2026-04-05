"use client";

import { Bot, CheckCircle, AlertCircle, Clock, FileText, Brain, Folder, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  { label: "Active Agents", value: "4", icon: Bot, color: "text-indigo-600" },
  { label: "Tasks Completed", value: "127", icon: CheckCircle, color: "text-emerald-600" },
  { label: "In Progress", value: "12", icon: Clock, color: "text-amber-600" },
  { label: "Errors", value: "2", icon: AlertCircle, color: "text-red-600" },
  { label: "Documents", value: "34", icon: FileText, color: "text-blue-600" },
  { label: "Memories", value: "89", icon: Brain, color: "text-purple-600" },
  { label: "Projects", value: "7", icon: Folder, color: "text-pink-600" },
  { label: "Uptime", value: "99.9%", icon: Zap, color: "text-amber-600" },
];

const AGENT_STATUS = [
  { name: "Agent-1", status: "active", task: "Processing...", model: "GPT-4" },
  { name: "Agent-2", status: "idle", task: "Waiting", model: "Claude" },
  { name: "Agent-3", status: "active", task: "Memory retrieval", model: "GPT-4" },
  { name: "Agent-4", status: "error", task: "Connection failed", model: "Claude" },
  { name: "Agent-5", status: "active", task: "Document generation", model: "GPT-4" },
  { name: "Agent-6", status: "idle", task: "Waiting", model: "Claude" },
  { name: "Agent-7", status: "active", task: "Data analysis", model: "GPT-4" },
  { name: "Agent-8", status: "idle", task: "Waiting", model: "Claude" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm">Mission Control overview</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <stat.icon className={stat.color} />
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-slate-900">
            <Bot className="w-4 h-4" />
            Agent Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {AGENT_STATUS.map((agent) => (
              <div key={agent.name} className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-0">
                <div>
                  <span className="text-slate-700 font-medium">{agent.name}</span>
                  <span className="text-slate-400 text-xs ml-2">({agent.model})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs">{agent.task}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      agent.status === "active"
                        ? "bg-emerald-500"
                        : agent.status === "idle"
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
