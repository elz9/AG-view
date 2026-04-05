"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Plus,
  Search,
  Brain,
  Bot,
  Clock,
  Tag,
  Trash2,
  MoreHorizontal,
  Sparkles,
  Database,
  ArrowUpRight,
} from "lucide-react";

interface Memory {
  id: string;
  title: string;
  content: string;
  agent: string;
  tags: string[];
  timestamp: string;
  type: "fact" | "preference" | "context" | "decision";
  relevance: number;
}

const MEMORIES: Memory[] = [
  {
    id: "1",
    title: "Auth module uses RS256 JWT",
    content:
      "The authentication system uses RS256 signed JWT tokens with 15min expiry and 7-day refresh tokens stored in httpOnly cookies.",
    agent: "Agent-1",
    tags: ["auth", "jwt", "security"],
    timestamp: "2h ago",
    type: "fact",
    relevance: 98,
  },
  {
    id: "2",
    title: "Prefers functional components over class",
    content:
      "Developer prefers React functional components with hooks. Class components should only be used when error boundaries are explicitly needed.",
    agent: "Agent-1",
    tags: ["react", "style"],
    timestamp: "4h ago",
    type: "preference",
    relevance: 91,
  },
  {
    id: "3",
    title: "Vector DB is Pinecone (us-east-1)",
    content:
      "Memory system uses Pinecone vector database in us-east-1 region. Index name: agdesk-memories. Dimension: 1536 (text-embedding-3-small).",
    agent: "Agent-3",
    tags: ["memory", "pinecone", "infra"],
    timestamp: "6h ago",
    type: "fact",
    relevance: 96,
  },
  {
    id: "4",
    title: "Never commit .env to git",
    content:
      "Strict rule: environment files (.env, .env.local, .env.production) should never be committed. Always use .env.example with placeholders.",
    agent: "Agent-2",
    tags: ["security", "git"],
    timestamp: "1d ago",
    type: "decision",
    relevance: 99,
  },
  {
    id: "5",
    title: "Staging deploys to Fly.io",
    content:
      "The staging environment is deployed on Fly.io. Production target is still TBD. fly.toml config is in the repo root.",
    agent: "Agent-1",
    tags: ["devops", "infra"],
    timestamp: "2d ago",
    type: "context",
    relevance: 85,
  },
  {
    id: "6",
    title: "Tailwind 4 CSS-first config",
    content:
      "Project uses Tailwind v4 with CSS-first configuration (@theme inline in globals.css). No tailwind.config.ts file. All customization goes in CSS.",
    agent: "Agent-2",
    tags: ["tailwind", "css", "style"],
    timestamp: "3d ago",
    type: "fact",
    relevance: 88,
  },
];

const TYPE_CONFIG = {
  fact: {
    label: "Fact",
    class: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  preference: {
    label: "Preference",
    class: "bg-violet-50 text-violet-600 border-violet-100",
  },
  context: {
    label: "Context",
    class: "bg-amber-50 text-amber-600 border-amber-100",
  },
  decision: {
    label: "Decision",
    class: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
};

export default function MemoriesView() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<string>("all");

  const filtered = MEMORIES.filter((m) => {
    const matchesQuery =
      query === "" ||
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.content.toLowerCase().includes(query.toLowerCase()) ||
      m.tags.some((t) => t.includes(query.toLowerCase()));
    const matchesType = activeType === "all" || m.type === activeType;
    return matchesQuery && matchesType;
  });

  return (
    <div className="space-y-5 max-w-[1000px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Memories</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {MEMORIES.length} memories indexed across{" "}
            {new Set(MEMORIES.map((m) => m.agent)).size} agents
          </p>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Add Memory
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        {(["all", "fact", "preference", "decision"] as const).map((type) => {
          const count =
            type === "all"
              ? MEMORIES.length
              : MEMORIES.filter((m) => m.type === type).length;
          return (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all",
                activeType === type
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-100 hover:border-slate-200",
              )}
            >
              <Database className="w-3.5 h-3.5 shrink-0" />
              <span className="capitalize">
                {type === "all" ? "All memories" : type + "s"}
              </span>
              <span
                className={cn(
                  "ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                  activeType === type
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
        <input
          type="text"
          placeholder="Semantic search memories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white placeholder-slate-300 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 transition-all"
        />
        {query && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-indigo-500">
            <Sparkles className="w-3 h-3" />
            <span>semantic</span>
          </div>
        )}
      </div>

      {/* Memory cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((memory) => {
          const typeConf = TYPE_CONFIG[memory.type];
          return (
            <div
              key={memory.id}
              className="bg-white border border-slate-100 rounded-xl p-4 hover:border-slate-200 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Brain className="w-4 h-4 text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-slate-800">
                      {memory.title}
                    </h3>
                    <span
                      className={cn(
                        "text-[10px] font-semibold px-1.5 py-0.5 rounded-full border shrink-0",
                        typeConf.class,
                      )}
                    >
                      {typeConf.label}
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-600 font-medium shrink-0">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      {memory.relevance}% relevant
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">
                    {memory.content}
                  </p>

                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      {memory.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-slate-50 border border-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 ml-auto text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Bot className="w-3 h-3" />
                        {memory.agent}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {memory.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-center bg-white rounded-xl border border-slate-100">
            <Brain className="w-8 h-8 text-slate-200 mb-2" />
            <p className="text-sm text-slate-400">
              No memories match your search
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
