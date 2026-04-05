"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/dashboard/tasks", label: "Task Board", icon: "📋" },
  { href: "/dashboard/calendar", label: "Calendar", icon: "📅" },
  { href: "/dashboard/projects", label: "Projects", icon: "📁" },
  { href: "/dashboard/memories", label: "Memories", icon: "🧠" },
  { href: "/dashboard/documents", label: "Documents", icon: "📄" },
  { href: "/dashboard/team", label: "Team", icon: "👥" },
];

export default function SidebarPage() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] bg-white border-r border-slate-200 flex flex-col">
      <nav className="flex-1 p-3 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-slate-600 no-underline transition-all duration-150",
              "hover:bg-slate-100 hover:text-slate-900",
              pathname === item.href && "bg-slate-100 text-slate-900 font-medium"
            )}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
