## COVA Kinetic - Next.js Build

Production-ready modular landing platform for COVA hardware.

### Implemented

- App Router pages: `/`, `/modules`, `/hub`, `/specs`, `/waitlist`, `/privacy`, `/terms`, `/support`
- Reusable waitlist flow with API endpoint: `POST /api/waitlist`
- CTA wiring and client-side analytics event hooks
- SEO foundation: metadata templates, Open Graph, robots, sitemap
- Shared shell layout with reusable top navigation and footer

### Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000.

### Waitlist Integration

The waitlist endpoint supports optional webhook forwarding:

```bash
WAITLIST_WEBHOOK_URL=https://your-webhook-url.example/collect
```

If unset, waitlist submissions are still accepted and logged server-side.

### Core Structure

- `src/app`: routes, metadata, API handlers
- `src/components`: UI composition (`landing`, `common`, `forms`)
- `src/content`: centralized content/config for navigation and presets
- `src/lib`: analytics, validation, and server rate limiter

### Quality Commands

```bash
npm run lint
npm run build
```

### Next Steps

- Plug `POST /api/waitlist` into CRM or Supabase
- Add authentication and profile saving in `/hub`
- Add locale route groups for full EN/RO content

