# The Grill Lab — Build Plan

## Stack note
Your spec asks for Next.js 14 App Router, but this project is on **TanStack Start v1 + React 19 + Vite + Tailwind v4 + TypeScript**, which is what Lovable supports. I'll deliver the same site, same design system, same routes, same behavior — using TanStack Start file routes instead of Next App Router, and `<img>` with lazy loading instead of `next/image`. Framer Motion + GSAP, Recharts, all features stay identical. If you'd rather I stop and migrate to Next, say the word; otherwise I'll proceed on TanStack Start.

## Design system (src/styles.css)
- Tokens: `--bg #0A0A0A`, `--bg-2 #1B1B1B`, `--copper #B87333`, `--ember #E85D04`, `--gold #F6AA1C`, `--warm #F5F5F0`, `--red #8B0000`, `--smoke #2E2E2E`. All as oklch in `@theme inline`.
- Fonts via `<link>` in `__root.tsx` head: Bebas Neue (headlines), Inter (body), Space Mono (accent labels). Tokenized as `--font-display`, `--font-body`, `--font-mono`.
- Motion utilities (fade-up, scale-in, ember-glow, ripple). `prefers-reduced-motion` respected globally.

## Shared components (`src/components/`)
NavBar, Footer, HeatMeter, SmokeMeter, SectionLabel, CTAButton (ripple), PageTransition, FireParticles (canvas), Smoke (CSS), Lightbox.

## Routes (`src/routes/`)
1. `index.tsx` — Fire intro → Truck reveal → Built on Fire (horizontal scroll, GSAP) → Meet the Fire split → Signature teaser → Customer ticker → Track/Book strip
2. `menu.tsx` — Filter bar + cinematic alternating rows, 12 items
3. `builder.tsx` — 7-step shawarma builder, live preview, live price, spice glow
4. `about.tsx` — Timeline, values grid, founder strip, process steps
5. `gallery.tsx` — Masonry, filter tabs, lightbox, video tiles
6. `catering.tsx` — 3 packages, event icons, booking form, success animation
7. `tracker.tsx` — Map embed (iframe, dark styled), status card, upcoming list, notify modal
8. `loyalty.tsx` — 5 tiers with progress bars, perks, join form, success
9. `contact.tsx` — Large contact links, form, map, hours table
10. `admin.tsx` — Dummy auth (admin / grilllab2024 via localStorage), sidebar with Overview, Orders, Menu Manager, Truck Location, Customers, Analytics (Recharts), Coupons, Reviews, Notifications

## Data (`src/lib/`)
- `types.ts` — `MenuItem`, `Testimonial`, `CateringPackage`, `LoyaltyTier`, `Order`, `Customer`
- `menu.ts` — 12 items across bbq / shawarma / sides / drinks (realistic Bangalore-priced INR)
- `testimonials.ts`, `catering.ts`, `loyalty.ts`, `admin-data.ts` (orders, customers, chart series)
- `utils.ts` — currency formatter, cn

## Images
Generate ~8 fast-tier images: hero truck, 3 signature items, menu hero shots, gallery seeds, founder portrait, charcoal/marinade close-ups. Stored in `src/assets/`, imported as ES modules.

## Mobile / perf
Horizontal scrolls collapse to vertical on `<md`. Charts and map lazy via `React.lazy` + Suspense. Touch targets ≥44px. Intro skippable + remembered in localStorage.

## Out of scope / simplifications
- "Live" map = styled Google Maps iframe with overlay card (no API key needed). If you want a real interactive map with the animated truck pin, I'll wire the Google Maps connector after.
- Admin auth is dummy localStorage gate as you specified — not real auth.
- Form submissions show success state only (no backend). Hook up Lovable Cloud later if you want persistence.

I'll build all 10 pages, components, data, and design system in one pass.