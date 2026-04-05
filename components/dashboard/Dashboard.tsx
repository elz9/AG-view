"use client";

import { Activity, Bot, CheckCircle, AlertCircle, Clock, FileText, Brain, Folder, Zap, Cpu } from "lucide-react";
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

const RECENT_ACTIVITY = [
  { agent: "Agent-1", action: "Completed task", time: "2m ago" },
  { agent: "Agent-2", action: "Started execution", time: "5m ago" },
  { agent: "Agent-3", action: "Memory updated", time: "12m ago" },
  { agent: "Agent-1", action: "Document generated", time: "18m ago" },
  { agent: "Agent-4", action: "Error occurred", time: "25m ago" },
  { agent: "Agent-2", action: "Task assigned", time: "32m ago" },
  { agent: "Agent-1", action: "Memory retrieved", time: "41m ago" },
  { agent: "Agent-3", action: "Processing complete", time: "55m ago" },
  { agent: "Agent-2", action: "New document created", time: "1h ago" },
  { agent: "Agent-1", action: "Task completed", time: "1h ago" },
  { agent: "Agent-4", action: "Connection restored", time: "2h ago" },
  { agent: "Agent-3", action: "Memory stored", time: "2h ago" },
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

const SYSTEM_HEALTH = [
  { name: "CPU Usage", value: "45%", icon: Cpu, status: "normal" },
  { name: "Memory", value: "62%", icon: Brain, status: "normal" },
  { name: "API Rate Limit", value: "78%", icon: Zap, status: "warning" },
  { name: "Storage", value: "23%", icon: Folder, status: "normal" },
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

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-900">
              <Activity className="w-4 h-4" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {RECENT_ACTIVITY.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-700">
                    <span className="font-medium">{item.agent}</span> {item.action}
                  </span>
                  <span className="text-slate-400 text-xs">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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

        <Card className="bg-white border-slate-200 shadow-sm col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-900">
              <Cpu className="w-4 h-4" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {SYSTEM_HEALTH.map((item) => (
                <div key={item.name} className="text-center p-4 bg-slate-50 rounded-lg">
                  <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.status === 'warning' ? 'text-amber-500' : 'text-slate-600'}`} />
                  <p className="text-xl font-bold text-slate-900">{item.value}</p>
                  <p className="text-xs text-slate-500">{item.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
