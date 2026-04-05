"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Dashboard from "@/components/dashboard/Dashboard";
import TaskBoard from "@/components/task-board/TaskBoard";
import CalendarView from "@/components/calendar/CalendarView";
import ProjectsView from "@/components/projects/ProjectsView";
import SessionHistory from "@/components/sessions/SessionHistory";
import AlertsView from "@/components/alerts/AlertsView";
import {
  LayoutDashboard,
  Kanban,
  Calendar,
  FolderKanban,
  History,
  BellRing,
  Bell,
  Settings,
  Zap,
  ChevronRight,
  Terminal,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tasks", label: "Task Board", icon: Kanban },
  { id: "sessions", label: "Run History", icon: History },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "alerts", label: "Alerts", icon: BellRing },
  { id: "calendar", label: "Calendar", icon: Calendar },
];

export default function MainPanelPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const COMPONENTS: Record<string, React.ReactNode> = {
    dashboard: <Dashboard />,
    tasks: <TaskBoard />,
    sessions: <SessionHistory />,
    projects: <ProjectsView />,
    alerts: <AlertsView />,
    calendar: <CalendarView />,
  };

  const activeItem = NAV_ITEMS.find((i) => i.id === activeTab);

  return (
    <div className="min-h-screen bg-[oklch(0.982_0_0)] flex flex-col">
      {/* Top bar */}
      <header className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-5 sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src="/Robot working on a laptop.png"
              alt="AG-DEsk"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-semibold text-sm text-slate-900 tracking-tight">
            AG-DEsk
          </span>
          <span className="text-slate-200 text-xs ml-1 select-none">|</span>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span>Mission Control</span>
            {activeItem && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-600 font-medium">
                  {activeItem.label}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-slate-100 mx-1" />
          <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100 transition-colors group">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-[10px] font-semibold">
              A
            </div>
            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
              Admin
            </span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-[212px] bg-white border-r border-slate-100 flex flex-col sticky top-14 h-[calc(100vh-3.5rem)]">
          {/* Live status */}
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-100">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-emerald-700">
                4 agents running
              </span>
              <span className="ml-auto text-[10px] text-emerald-500 font-semibold">
                live
              </span>
            </div>
          </div>

          <div className="px-4 mb-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
              Navigation
            </p>
          </div>

          <nav className="flex-1 px-2 flex flex-col gap-0.5 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 w-full text-left",
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-slate-600"
                    )}
                  />
                  <span className="font-medium">{item.label}</span>
                  {item.id === "alerts" && (
                    <span className="ml-auto w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Connect CTA */}
          <div className="p-3 border-t border-slate-100">
            <div className="rounded-lg bg-slate-950 p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Terminal className="w-3 h-3 text-slate-400" />
                <p className="text-[11px] font-semibold text-slate-200">
                  Connect your agents
                </p>
              </div>
              <p className="text-[10px] text-slate-500 mb-2 leading-relaxed">
                Run one command to start monitoring
              </p>
              <div className="bg-slate-900 border border-slate-800 rounded-md px-2.5 py-1.5 font-mono text-[10px] text-emerald-400">
                npx agdesk connect
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 p-6 overflow-y-auto">
          {COMPONENTS[activeTab]}
        </main>
      </div>
    </div>
  );
}
