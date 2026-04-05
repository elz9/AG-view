"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Dashboard from "@/components/dashboard/Dashboard";
import TaskBoard from "@/components/task-board/TaskBoard";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "tasks", label: "Task Board", icon: "📋" },
  { id: "calendar", label: "Calendar", icon: "📅" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "memories", label: "Memories", icon: "🧠" },
  { id: "documents", label: "Documents", icon: "📄" },
  { id: "team", label: "Team", icon: "👥" },
];

const COMPONENTS: Record<string, React.ReactNode> = {
  dashboard: <Dashboard />,
  tasks: <TaskBoard />,
  calendar: <div>Calendar</div>,
  projects: <div>Projects</div>,
  memories: <div>Memories</div>,
  documents: <div>Documents</div>,
  team: <div>Team</div>,
};

export default function MainPanelPage() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-white">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
        <div />
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
            <span>🔔</span>
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
            <span>⚙️</span>
          </button>
          <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">👤</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-[220px] bg-white border-r border-slate-200 flex flex-col">
          <nav className="flex-1 p-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-slate-600 no-underline transition-all duration-150 text-left",
                  "hover:bg-slate-100 hover:text-slate-900",
                  activeTab === item.id && "bg-slate-100 text-slate-900 font-medium"
                )}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {COMPONENTS[activeTab]}
        </main>
      </div>
    </div>
  );
}
