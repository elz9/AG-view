# AG-DEsk

Next.js application with App Router - Mission Control for AI Agents.

## Architecture Best Practices

### 1. Thin Routes, Rich Components
- **Routes** (`app/`) should only contain layout and routing logic - no business logic
- **Components** (`components/`) contain all UI and business logic
- Keep routes as composition layers, not data handlers

### 2. Single Page Architecture
- All tabs (Dashboard, Task Board, Calendar, etc.) live in one route
- Components swap dynamically based on active tab state
- URL stays clean: always shows `/main-panel`

### 3. Component Organization
- Group related components by feature (e.g., `dashboard/`, `task-board/`)
- Shared UI components in `components/ui/`
- Use co-located files near their usage when possible

### 4. State Management
- Use React `useState` for local component state
- Avoid prop drilling - pass only what's needed

### 5. Styling
- Use Tailwind CSS for styling
- Use shadcn/ui component patterns
- Keep custom CSS to minimum

## File Structure

```
AG-DEsk/
├── app/
│   ├── page.tsx              # Root redirect
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── main-panel/
│       └── page.tsx          # Main panel with sidebar + tabs
├── components/
│   ├── ui/                   # shadcn UI components
│   │   ├── card.tsx
│   │   ├── button.tsx
│   │   └── ...
│   ├── dashboard/            # Dashboard components
│   │   └── Dashboard.tsx
│   └── task-board/           # Task board components
│       └── TaskBoard.tsx
├── lib/
│   └── utils.ts              # Utility functions (cn(), etc.)
├── public/                   # Static assets
├── package.json
└── README.md
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: Tailwind CSS + shadcn/ui patterns
- **Icons**: Lucide React
- **Charts**: Recharts (optional)

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the app.

## Contributing

1. Keep routes thin - business logic in components
2. Use consistent naming conventions
3. Follow the single-page tab architecture
