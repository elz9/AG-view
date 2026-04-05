"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus, Bot, Clock, Zap } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface ScheduledTask {
  id: string;
  title: string;
  day: number;
  time: string;
  agent?: string;
  type: "scheduled" | "recurring" | "oneoff";
  color: string;
}

const TASKS: ScheduledTask[] = [
  {
    id: "1",
    title: "Daily codebase scan",
    day: 3,
    time: "09:00",
    agent: "Agent-3",
    type: "recurring",
    color: "indigo",
  },
  {
    id: "2",
    title: "Dependency audit",
    day: 5,
    time: "14:00",
    agent: "Agent-1",
    type: "scheduled",
    color: "amber",
  },
  {
    id: "3",
    title: "Weekly test suite",
    day: 8,
    time: "10:30",
    agent: "Agent-2",
    type: "recurring",
    color: "emerald",
  },
  {
    id: "4",
    title: "Memory consolidation",
    day: 10,
    time: "22:00",
    agent: "Agent-3",
    type: "recurring",
    color: "violet",
  },
  {
    id: "5",
    title: "Deploy to staging",
    day: 12,
    time: "15:00",
    type: "oneoff",
    color: "slate",
  },
  {
    id: "6",
    title: "Security token rotation",
    day: 15,
    time: "00:00",
    type: "scheduled",
    color: "red",
  },
  {
    id: "7",
    title: "LLM cost report",
    day: 18,
    time: "08:00",
    agent: "Agent-1",
    type: "recurring",
    color: "indigo",
  },
  {
    id: "8",
    title: "Integration tests",
    day: 22,
    time: "11:00",
    agent: "Agent-2",
    type: "scheduled",
    color: "emerald",
  },
  {
    id: "9",
    title: "DB backup verification",
    day: 25,
    time: "03:00",
    type: "recurring",
    color: "amber",
  },
];

const TYPE_COLORS: Record<string, string> = {
  indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  violet: "bg-violet-50 text-violet-700 border-violet-100",
  slate: "bg-slate-100 text-slate-600 border-slate-200",
  red: "bg-red-50 text-red-600 border-red-100",
};

const DOT_COLORS: Record<string, string> = {
  indigo: "bg-indigo-400",
  amber: "bg-amber-400",
  emerald: "bg-emerald-400",
  violet: "bg-violet-400",
  slate: "bg-slate-400",
  red: "bg-red-400",
};

export default function CalendarView() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(now.getDate());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1,
  );

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const tasksForDay = (day: number) => TASKS.filter((t) => t.day === day);
  const selectedTasks = selectedDay ? tasksForDay(selectedDay) : [];

  return (
    <div className="space-y-5 max-w-[1200px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Calendar</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Schedule agent tasks and cron jobs
          </p>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Schedule Task
        </button>
      </div>

      <div className="grid grid-cols-[1fr_280px] gap-4">
        {/* Calendar grid */}
        <div className="bg-white rounded-xl border border-slate-100">
          {/* Month nav */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <button
              onClick={prevMonth}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold text-slate-800">
              {MONTHS[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-slate-50">
            {DAYS.map((d) => (
              <div
                key={d}
                className="py-2 text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wide"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              const dayTasks = day ? tasksForDay(day) : [];
              const isToday =
                day === now.getDate() &&
                month === now.getMonth() &&
                year === now.getFullYear();
              const isSelected = day === selectedDay;
              return (
                <div
                  key={i}
                  onClick={() => day && setSelectedDay(day)}
                  className={cn(
                    "min-h-[80px] p-2 border-b border-r border-slate-50 cursor-pointer transition-colors",
                    day ? "hover:bg-slate-50/80" : "bg-slate-50/30",
                    isSelected && "bg-indigo-50/40",
                  )}
                >
                  {day && (
                    <>
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mb-1",
                          isToday
                            ? "bg-slate-900 text-white"
                            : isSelected
                              ? "bg-indigo-100 text-indigo-700"
                              : "text-slate-600",
                        )}
                      >
                        {day}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        {dayTasks.slice(0, 2).map((t) => (
                          <div
                            key={t.id}
                            className={cn(
                              "text-[9px] font-medium px-1 py-0.5 rounded truncate border",
                              TYPE_COLORS[t.color],
                            )}
                          >
                            {t.title}
                          </div>
                        ))}
                        {dayTasks.length > 2 && (
                          <span className="text-[9px] text-slate-400 pl-1">
                            +{dayTasks.length - 2} more
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected day panel */}
        <div className="bg-white rounded-xl border border-slate-100">
          <div className="px-4 py-4 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-800">
              {selectedDay ? `${MONTHS[month]} ${selectedDay}` : "Select a day"}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {selectedTasks.length > 0
                ? `${selectedTasks.length} scheduled tasks`
                : "No tasks scheduled"}
            </p>
          </div>

          <div className="p-3 flex flex-col gap-2">
            {selectedTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center mb-2">
                  <Clock className="w-4 h-4 text-slate-300" />
                </div>
                <p className="text-xs text-slate-300">No tasks this day</p>
              </div>
            ) : (
              selectedTasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "rounded-lg border p-3",
                    TYPE_COLORS[task.color],
                  )}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-1 shrink-0",
                        DOT_COLORS[task.color],
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-2.5 h-2.5 opacity-60" />
                        <span className="text-[10px] opacity-70">
                          {task.time}
                        </span>
                        {task.agent && (
                          <>
                            <Bot className="w-2.5 h-2.5 opacity-60" />
                            <span className="text-[10px] opacity-70">
                              {task.agent}
                            </span>
                          </>
                        )}
                      </div>
                      <span className="inline-block mt-1.5 text-[9px] font-semibold uppercase tracking-wide opacity-60">
                        {task.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
