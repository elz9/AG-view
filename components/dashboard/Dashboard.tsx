"use client";

import { Activity, Bot, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  { label: "Active Agents", value: "4", icon: Bot, color: "text-indigo-600" },
  { label: "Tasks Completed", value: "127", icon: CheckCircle, color: "text-emerald-600" },
  { label: "In Progress", value: "12", icon: Clock, color: "text-amber-600" },
  { label: "Errors", value: "2", icon: AlertCircle, color: "text-red-600" },
];

const RECENT_ACTIVITY = [
  { agent: "Agent-1", action: "Completed task", time: "2m ago" },
  { agent: "Agent-2", action: "Started execution", time: "5m ago" },
  { agent: "Agent-3", action: "Memory updated", time: "12m ago" },
  { agent: "Agent-1", action: "Document generated", time: "18m ago" },
];

const AGENT_STATUS = [
  { name: "Agent-1", status: "active", task: "Processing..." },
  { name: "Agent-2", status: "idle", task: "Waiting" },
  { name: "Agent-3", status: "active", task: "Memory retrieval" },
  { name: "Agent-4", status: "error", task: "Connection failed" },
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
            <div className="space-y-3">
              {RECENT_ACTIVITY.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-slate-700">
                    <span className="font-medium">{item.agent}</span> {item.action}
                  </span>
                  <span className="text-slate-400">{item.time}</span>
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
            <div className="space-y-3">
              {AGENT_STATUS.map((agent) => (
                <div key={agent.name} className="flex justify-between items-center text-sm">
                  <span className="text-slate-700 font-medium">{agent.name}</span>
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
    </div>
  );
}
