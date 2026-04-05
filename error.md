## Error Type
Build Error

## Error Message
Export Slack doesn't exist in target module

## Build Output
./components/alerts/AlertsView.tsx:5:1
Export Slack doesn't exist in target module
   3 | import { useState } from "react";
   4 | import { cn } from "@/lib/utils";
>  5 | import {
     | ^^^^^^^
>  6 |   BellRing,
     | ^^^^^^^^^^^
>  7 |   AlertTriangle,
     | ^^^^^^^^^^^^^^^^
>  8 |   Clock,
     | ^^^^^^^^
>  9 |   Terminal,
     | ^^^^^^^^^^^
> 10 |   CheckCircle2,
     | ^^^^^^^^^^^^^^^
> 11 |   XCircle,
     | ^^^^^^^^^^
> 12 |   Slack,
     | ^^^^^^^^
> 13 |   Mail,
     | ^^^^^^^
> 14 |   Smartphone,
     | ^^^^^^^^^^^^^
> 15 |   Settings,
     | ^^^^^^^^^^^
> 16 |   ChevronRight,
     | ^^^^^^^^^^^^^^^
> 17 |   Zap,
     | ^^^^^^
> 18 |   Bot,
     | ^^^^^^
> 19 | } from "lucide-react";
     | ^^^^^^^^^^^^^^^^^^^^^^
  20 |
  21 | interface Alert {
  22 |   id: string;

The export Slack was not found in module [project]/node_modules/lucide-react/dist/esm/lucide-react.js [app-client] (ecmascript).
Did you mean to import StepBack?
All exports of the module are statically known (It doesn't have dynamic exports). So it's known statically that the requested export doesn't exist.

Import traces:
  Client Component Browser:
    ./components/alerts/AlertsView.tsx [Client Component Browser]
    ./app/main-panel/page.tsx [Client Component Browser]
    ./app/main-panel/page.tsx [Server Component]

  Client Component SSR:
    ./components/alerts/AlertsView.tsx [Client Component SSR]
    ./app/main-panel/page.tsx [Client Component SSR]
    ./app/main-panel/page.tsx [Server Component]

Next.js version: 16.2.2 (Turbopack)
