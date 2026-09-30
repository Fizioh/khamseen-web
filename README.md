# khamseen-web

Production landing page for **Khamseen** — the agent operating system for building and operating agentic organizations.

> **One human. Fifty agents. One operating system.**

This repository is the public-facing web surface for the Khamseen product narrative. It is intentionally separate from the [Khamseen OS open core](https://github.com/Fizioh/khamseen-os): no backend orchestration here, only structured demo data designed to be swapped for real API/event streams later.

## Design direction

Restrained, technical, premium — **Linear × Vercel × control-room**, not generic AI SaaS.

- Dark neutral palette, precise borders, mono labels
- Agent topology as the visual signature
- Motion that reflects system behavior (delegation pulses, lifecycle stages)
- No purple gradients, glassmorphism overload, or decorative “AI” chrome

## Architecture

```
src/
  app/              Next.js App Router (layout, page, globals)
  components/
    design-system/  Panels, CTAs, badges, section labels
    graph/          SVG agent topology, lifecycle rail, mobile timeline
    inspector/      Agent control-panel inspector
    execution/      KHA-142 demo flow
    sections/       Hero, narrative blocks, header/footer
  data/             Agents, edges, execution scenario (mock runtime)
  hooks/            Reduced motion, execution simulation
  motion/           Shared Framer Motion presets
  types/            Agent, Task, Run, RuntimeState, etc.
```

### Graph architecture

- **Nodes** — `Agent` records with normalized `x/y` layout coordinates
- **Edges** — `Edge[]` in `topology.ts`; pulse animation driven by `pulseEdgeIds`
- **Variants** — `full` | `compact` | `minimal` for responsive density
- **Mobile** — `MobileTimeline` when SVG topology is hidden

### Animation architecture

- Central presets in `src/motion/presets.ts`
- `usePrefersReducedMotion()` gates infinite loops and simulation timers
- Global CSS `@media (prefers-reduced-motion: reduce)` short-circuits transitions

### Relationship to Khamseen OS

| khamseen-web (this repo) | Khamseen OS |
|--------------------------|-------------|
| Marketing + visual language | Control plane, runs, tasks, budgets |
| Mock agent/runtime data | Source of truth for execution |
| Future: read-only dashboards | API + event audit trail |

## Local setup

```bash
git clone https://github.com/Fizioh/khamseen-web.git
cd khamseen-web
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run test` | Vitest unit tests |
| `npm run format` | Prettier |

## Branch strategy

- `main` — deployable default branch
- Feature work on `feat/*` via pull requests
- CI runs on push to `main` and `feat/**`

## Deployment

Optimized for [Vercel](https://vercel.com):

1. Import `Fizioh/khamseen-web`
2. Set `NEXT_PUBLIC_SITE_URL` to production URL
3. Build command: `npm run build`

## Contribution workflow

1. Branch from `main` (`feat/your-change`)
2. Implement with structured data in `src/data/` — avoid hardcoding topology in JSX
3. Run `npm run lint && npm run typecheck && npm run test && npm run build`
4. Open a PR with objective, architecture notes, tests run, and screenshots

## License

Private / all rights reserved unless otherwise specified by the Khamseen project owners.
