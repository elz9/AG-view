# AG-DEsk - Claude AI Instructions

## Project Overview

AG-DEsk is a Next.js 16 mission control dashboard for AI agents. It uses the App Router with a single-page architecture where all tabs live in one route and swap components dynamically.

## Architecture

### Single Page Architecture
- All tabs (Dashboard, Task Board, Calendar, Projects, Memories, Documents, Team) are components
- They render in `/main-panel` route
- URL never changes - always `/main-panel`
- Components swap via React state (`activeTab`)

### Thin Routes, Rich Components
- Routes in `app/` only handle layout and routing
- All UI and business logic lives in `components/`
- Components import from `@/components/...` path alias

## File Structure

```
AG-DEsk/
├── app/
│   ├── page.tsx              # Redirects to /main-panel
│   ├── layout.tsx            # Root HTML layout with globals.css
│   ├── globals.css           # Tailwind + CSS variables (shadcn theme)
│   └── main-panel/
│       └── page.tsx          # Main page with sidebar + tab switching
├── components/
│   ├── ui/                   # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   └── select.tsx
│   ├── dashboard/
│   │   └── Dashboard.tsx    # Dashboard stats + agent status
│   └── task-board/
│       └── TaskBoard.tsx    # Kanban-style task board
├── lib/
│   └── utils.ts              # cn() utility for class merging
├── public/                   # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── README.md
```

## Key Patterns

### Tab Switching
```tsx
const [activeTab, setActiveTab] = useState("dashboard");
const COMPONENTS = {
  dashboard: <Dashboard />,
  tasks: <TaskBoard />,
  // ...
};
// In render:
{COMPONENTS[activeTab]}
```

### Component Props
- Use TypeScript interfaces for props
- Use shadcn/ui components (Card, Button, etc.)
- Tailwind for styling

### Colors/Theme
- Uses shadcn CSS variables in globals.css
- `text-slate-xxx`, `bg-slate-xxx`, `border-slate-xxx` for neutral colors
- shadcn semantic colors: `text-foreground`, `text-muted-foreground`, etc.

## Important Notes

1. **DO NOT** create new routes for tabs - they should all be components
2. **DO NOT** add URL paths to sidebar links - they should all point to `/main-panel`
3. **DO** keep all business logic in `components/` folder
4. **DO** use shadcn/ui components from `components/ui/`
5. **DO NOT** run build commands unless explicitly asked
6. **DO** commit and push changes when asked

## shadcn Components Available

- Card (with Header, Title, Description, Content, Footer)
- Button
- Chart (ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent)
- Select (Select, SelectTrigger, SelectValue, SelectContent, SelectItem)

## Before Writing Code

1. Check existing components in `components/` folder
2. Use existing shadcn/ui components from `components/ui/`
3. Follow the single-page tab architecture
4. Use Tailwind CSS classes (not custom CSS)

## Running the App

```bash
npm run dev   # Start dev server
npm run build # Build for production (only when asked)
```
