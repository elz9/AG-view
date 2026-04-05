# Ag-Desk — Product Requirements Document (V1)

**Version:** 1.0  
**Status:** Draft  
**Product Name:** Ag-Desk  
**Tagline:** Watch your AI agents work. Run the mission from one place.

---

## 1. Overview

Ag-Desk is a web-based SaaS that gives developers real-time visibility into their locally running AI coding agents (Claude Code, Codex CLI, etc.) through two combined interfaces:

- **Pixel Office** — a visual, game-like view where each running agent appears as an animated pixel character doing work in real time
- **Mission Control** — a structured dashboard showing task status, activity logs, cost tracking, and agent collaboration tools

The core insight: agents run locally on the developer's machine, but the developer has no unified view of what they're all doing. Ag-Desk bridges that gap without storing or transmitting any private code or log content.

---

## 2. Problem Statement

When a developer runs multiple AI coding agents in parallel:

- Each agent lives in its own terminal tab with raw, machine-readable logs
- Switching between tabs manually is the only way to check status
- Agents silently stop and wait for input — the developer doesn't notice for minutes or hours
- There is no unified view of what's been done, what's running, and what's next
- Cost and token usage is invisible until the monthly bill arrives

**No polished SaaS product solves this today.** Existing tools (Pixel Agents, Mission Control OSS) require self-hosting and significant technical setup.

---

## 3. Goals for V1

| Goal | Success Metric |
|---|---|
| Acquire users | 100 paying users within 60 days of launch |
| Prove core value | 70%+ of free users activate the local hook within 24 hours of signup |
| Retention | 60%+ of Solo plan subscribers still active at day 30 |
| Revenue | $2,000 MRR by end of month 2 |

---

## 4. Target Users

**Primary — Solo Developer / Indie Hacker**
- Runs 2–5 Claude Code or Codex CLI sessions simultaneously
- Builds fast, ships fast, hates context-switching
- Already paying $20–$100/month for AI coding tools
- Comfortable installing an npm package from the terminal

**Secondary — Small Dev Team (2–5 people)**
- Multiple developers each running agents on the same or different projects
- Wants shared visibility without setting up infrastructure
- Will come in V1 on the Team plan but is not the design target for core features

**Not V1 — Enterprise / Non-developer users**

---

## 5. How Ag-Desk Works (Architecture)

### 5.1 The Core Flow

```
Developer's Machine                    Ag-Desk Cloud
───────────────────                    ──────────────────────────────
Claude Code / Codex CLI                
  ↓ writes JSONL transcripts           
  ↓ fires hook events                  
                                       
Ag-Desk Local Hook (npm package)  ───► Authenticated WebSocket
  - watches ~/.claude/logs/            (per-user secure channel)
  - reads hook events                       ↓
  - extracts: tool used, status,       User's Isolated Workspace
    agent state, token counts               ├── Pixel Office renderer
  - sends ONLY metadata (not code)     ├── Mission Control panel
    to Ag-Desk cloud                   ├── Task board state
                                       ├── Activity feed
                                       └── Token/cost tracker
```

### 5.2 What Data Is Sent (Privacy Model)

**Ag-Desk never sends or stores:**
- Source code
- File contents
- Prompt text
- Response text
- Any content from JSONL logs

**Ag-Desk only sends:**
- Agent state signals: `{ state: "typing" | "reading" | "waiting" | "idle" }`
- Tool name used: `{ tool: "write_file" | "bash" | "search" | "read_file" }`
- Token count delta: `{ tokens_used: 142 }`
- Timestamp: `{ ts: 1714900000 }`
- Task completion signal: `{ event: "task_done" }`

This is pure **metadata** — behavioral signals only. Think of it as a heartbeat, not a log. No one at Ag-Desk can read what your agent is doing or what code it's writing.

> **Note for founder review:** This is the recommended privacy approach for V1. It avoids any GDPR / data storage complexity, makes the privacy promise simple to communicate, and is technically sufficient to power the Pixel Office and Mission Control views. If richer features (e.g., showing task names, file names) are desired in future, a user-controlled opt-in can be added. Modify this section if requirements change.

### 5.3 Multi-User Isolation (How Each User Gets Their Own Workspace)

This is standard SaaS per-tenant isolation. Here's exactly how it works:

**Authentication flow:**
1. User signs up at agdesk.io → creates an account
2. Ag-Desk generates a unique **API key** for that user (e.g., `agd_live_xk7f...`)
3. User copies the API key and runs: `agdesk connect --key agd_live_xk7f...`
4. The local hook authenticates with this key and opens a **dedicated WebSocket channel** to that user's workspace

**Isolation in the cloud:**
- Every user's data lives under their own `user_id` namespace in the database
- WebSocket connections are authenticated — no user can see another user's data
- The web dashboard at `agdesk.io/dashboard` always shows only the authenticated user's own agents, tasks, and activity
- There is no shared state between users

**Analogy:** It works exactly like Vercel or Netlify. One platform, but when you log in, you only see your own projects. Every other user has the same experience but with their own completely separate data.

**Team plan extension (V1):**
- A team account has one `team_id` that multiple user accounts can join
- All members of a team see the same shared workspace
- Still fully isolated from any other team or individual account

---

## 6. Features — V1 Scope

### 6.1 Pixel Office

The visual layer. Rendered in the browser as a 2D pixel art office.

**Behavior:**
- Each connected agent session = one animated pixel character in the office
- Characters animate based on real-time state signals from the local hook:
  - `typing` → character sits at desk, typing animation
  - `reading` → character leans toward screen, reading animation  
  - `waiting` → character idle, alert bubble appears above head (🔔)
  - `idle` / `done` → character sits relaxed or walks to a common area
- Floating tool indicator above character head shows last tool used (e.g., "📝 write_file", "💻 bash", "🔍 search")
- Clicking a character opens that agent's detail panel in Mission Control
- Office layout: default grid with desks, each agent assigned a desk on first connection
- Office is user-customizable (drag desks, add furniture) — layout saved to their account

**V1 Limitations:**
- Fixed set of character sprites (no custom skins in V1)
- Office grid is 16x16 tiles max in V1
- No sound in V1

---

### 6.2 Mission Control Panel

The functional layer. Sits alongside or below the Pixel Office in the UI.

#### 6.2.1 Task Board

A Kanban-style board with three columns:

| Queue | In Progress | Done |
|---|---|---|
| Tasks waiting to start | Currently running agent tasks | Completed tasks |

- Tasks are **auto-detected** from agent activity (when an agent starts working, a task card appears in "In Progress")
- Users can also **manually add tasks** to Queue with a title and assign to an agent
- Each task card shows: task title (auto-named or user-set), agent assigned, time started, tokens used so far
- Drag-and-drop between columns supported
- Done tasks show: time completed, total tokens used, total cost

#### 6.2.2 Live Activity Feed

A real-time stream of what each agent is doing, in plain English:

```
14:32:01  Agent-1   Used bash → ran: npm install          
14:32:04  Agent-1   Wrote file → src/auth/login.tsx       [redacted - private]
14:32:09  Agent-2   Read file → package.json              [redacted - private]
14:32:15  Agent-1   ⏸ Waiting for your input
14:33:01  Agent-3   Task complete ✓
```

> Note: File names are shown only as metadata indicators (tool was used on "a file") unless user opts in to share file paths. File contents are never shown. The exact display format of filenames can be toggled per user preference.

#### 6.2.3 Agent Status Cards

Each connected agent gets a status card showing:
- Agent name (auto-assigned: Agent-1, Agent-2, or user-renamed)
- Current state (Active / Waiting / Done / Disconnected)
- Current task
- Session duration
- Tokens used this session
- Estimated cost this session (calculated from Anthropic/OpenAI pricing)

#### 6.2.4 Token & Cost Tracker

- Real-time token counter per agent session
- Running USD cost estimate per session (input + output tokens × current model pricing)
- Daily total across all agents
- Monthly total with a configurable spend alert threshold
- Simple chart: cost over time (today, this week)

---

### 6.3 Stuck Agent Alerts

When an agent enters `waiting` state (it needs user input to continue), Ag-Desk alerts the developer immediately so they don't lose time.

**V1 Alert channels:**
- **In-app notification** — a banner in the Ag-Desk dashboard, and the agent's pixel character shows an alert bubble
- **Browser notification** — if the user has the tab open but is doing something else (requires one-time browser permission)
- **Email alert** — optional, user enables in settings. Sends: "Agent-2 is waiting for your input. Session started 14 min ago."
- **Slack alert** — optional, user connects their Slack workspace in settings. Sends a message to a chosen channel.

> **Note for founder review:** Email and Slack alerts are low-effort to build and are a meaningful retention driver — developers working in focus mode need a way to know their agent is blocked without watching a dashboard. Recommended to keep both in V1. Remove this section if you decide otherwise.

**How waiting state is detected:**
The local hook monitors Claude Code's JSONL transcript for permission request events and input-awaiting signals. When detected, it immediately emits a `{ state: "waiting" }` signal to Ag-Desk cloud, which triggers alerts.

---

### 6.4 Local Hook (npm Package)

The bridge between the developer's machine and Ag-Desk cloud.

**Package name:** `agdesk` (published to npm)

**Setup:**
```bash
npm install -g agdesk
agdesk connect --key YOUR_API_KEY
```

**What it does:**
- Watches Claude Code JSONL transcript directory (`~/.claude/projects/`)
- Listens to Claude Code hook events (pre-tool, post-tool, stop)
- Extracts only metadata signals (state, tool name, token counts)
- Sends signals over authenticated WebSocket to Ag-Desk cloud
- Runs as a background process, zero performance impact on agents
- Survives terminal restarts (auto-reconnects)

**What it does NOT do:**
- Read, store, or transmit file contents
- Read, store, or transmit prompt or response text
- Modify Claude Code behavior in any way
- Require any changes to how the developer uses their agents

**Supported agents in V1:**
- Claude Code (primary)
- Codex CLI (secondary, best effort)

---

### 6.5 Authentication & Accounts

- Sign up with email + password, or GitHub OAuth (one-click for developers)
- Each account gets a unique API key on creation
- API key can be rotated from settings
- Password reset via email
- Account deletion removes all stored data immediately

---

## 7. Pricing — V1 Tiers

| Plan | Price | Agents | History | Key Features |
|---|---|---|---|---|
| **Free** | $0/mo | **1 agent** | 7 days | Pixel office, activity feed, basic status |
| **Solo** | $15/mo | 5 agents | 30 days | + Cost tracker, stuck alerts, task board |
| **Builder** | $49/mo | 15 agents | 90 days | + Email alerts, Slack alerts, cross-device |
| **Team** | $99/mo | Unlimited | 1 year | + Shared team workspace, multi-user |

**Free tier rationale:** 1 agent is enough to experience the full Pixel Office and see the core value. A developer running even a single Claude Code session will immediately understand the product. The upgrade trigger is natural: when they want to run a second agent, they upgrade.

---

## 8. User Journey — V1

```
1. Developer discovers Ag-Desk (Reddit, PH, Twitter, HN)
        ↓
2. Lands on agdesk.io → sees demo GIF of pixel office
        ↓
3. Signs up (email or GitHub) → free tier
        ↓
4. Dashboard shows: "Connect your first agent"
   → Copy API key
   → Run: npm install -g agdesk && agdesk connect --key xxx
        ↓
5. Starts Claude Code in terminal as usual
        ↓
6. Pixel character appears in their office
   Agent starts typing → character animates
        ↓
7. Developer watches from dashboard — no more terminal-switching
        ↓
8. Agent gets stuck → alert fires
   Developer clicks alert → goes to terminal → unblocks agent
        ↓
9. Task completes → card moves to Done column
   Cost and token usage shown on card
        ↓
10. Developer wants to run 2 agents → hits free tier limit
    → Upgrades to Solo ($15/mo)
```

---

## 9. Platform — V1

- **Web only** (no desktop app, no VS Code extension in V1)
- Works in any modern browser (Chrome, Firefox, Safari, Edge)
- Responsive layout but optimized for desktop (developers are at their desk)
- The local hook (npm package) runs in the background on the developer's machine — no browser extension needed

---

## 10. Out of Scope for V1

These are planned for future versions. They are explicitly excluded from V1 to keep scope tight:

- Mobile app
- VS Code extension
- Agent-to-agent messaging / collaboration
- AI-powered task suggestions
- Git / PR integration
- Cursor, Windsurf, Gemini CLI support
- Self-hosted / on-premise deployment
- Voice alerts
- Custom pixel character skins
- Detailed prompt/response history (privacy constraint)

---

## 11. Technical Stack (Recommended)

| Layer | Technology | Reason |
|---|---|---|
| Frontend | Next.js + Tailwind | Fast to build, great DX, easy deployment |
| Pixel Office rendering | HTML Canvas or PixiJS | Smooth 2D animation, browser-native |
| Backend | Node.js + tRPC | Type-safe, fast API |
| WebSocket | Socket.io or native WS | Real-time agent signal delivery |
| Database | PostgreSQL (Supabase) | Per-user data isolation, easy to start |
| Auth | Clerk or NextAuth | GitHub OAuth + email, fast to integrate |
| Hosting | Vercel (frontend) + Railway/Fly.io (backend) | Low ops overhead |
| npm package | Node.js + ws library | Simple WebSocket client |

---

## 12. Open Questions — Founder To Decide

- [ ] **Product name styling** — "Ag-Desk" or "AgDesk" or "agdesk"? Matters for domain, npm package, branding
- [ ] **File name visibility** — show file names (not contents) in activity feed by default, or hide behind an opt-in? Affects perceived value vs. privacy feel
- [ ] **Codex CLI priority** — full support in V1 or Claude Code only first?
- [ ] **Spend alert threshold** — configurable by user, or fixed tiers (e.g., alert at $5, $10, $25)?
- [ ] **Team plan in V1** — ship it at launch or add it in V1.1 once solo plan is validated?
- [ ] **Waitlist vs. open signup** — open launch or build hype with a waitlist first?

---

## 13. Launch Plan

**Phase 1 — Build (Weeks 1–6)**
- Local hook npm package
- WebSocket infrastructure with per-user isolation
- Pixel Office renderer (basic sprites, 4 states)
- Mission Control panel (task board, activity feed, cost tracker)
- Auth + billing (Stripe)

**Phase 2 — Private Beta (Week 7–8)**
- Invite 20–30 developers from r/ClaudeCode and Twitter
- Collect feedback, fix critical bugs
- Validate that hook installs cleanly and pixel office feels magical

**Phase 3 — Public Launch (Week 9)**
- Product Hunt launch
- Post on r/ClaudeCode, r/ChatGPTCoding, Hacker News (Show HN)
- Demo video on Twitter/X showing pixel office in action
- Goal: 100 signups day 1, 20 paid in week 1

---

*This document covers V1 only. Subsequent versions will expand agent support, add mobile, team collaboration features, and deeper mission control capabilities.*
