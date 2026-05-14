# Design: Fix Dev Google Indexing

> Addresses all acceptance criteria: AC-1 (dev blocks), AC-2 (prod allows), AC-3 (dev sitemap irrelevant), AC-4 (login pages excluded), AC-5 (env-aware build), AC-6 (GSC error resolved)

## Architecture Overview

```
CI Runner (dev branch)                     CI Runner (main branch)
│  NUXT_SITE_ENV=dev                      │  NUXT_SITE_ENV=(unset → 'production')
│  npm run generate                         │  npm run generate
▼                                           ▼
┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│        nuxt.config.ts           │     │        nuxt.config.ts           │
│                                 │     │                                 │
│  modules: [                     │     │  modules: [                     │
│    '@nuxtjs/robots',  ← NEW     │     │    '@nuxtjs/robots',  ← NEW     │
│    '@nuxtjs/sitemap',           │     │    '@nuxtjs/sitemap',           │
│    ...                          │     │    ...                          │
│  ]                              │     │  ]                              │
│                                 │     │                                 │
│  routeRules: {                  │     │  routeRules: {                  │
│    '/user/**':  { robots:false }│     │    '/user/**':  { robots:false }│
│    '/storage/**':{ robots:false }│    │    '/storage/**':{ robots:false }│
│    '/auth/verify-email':        │     │    '/auth/verify-email':        │
│       { robots: false },        │     │       { robots: false },        │
│    '/auth/email-verification-   │     │    '/auth/email-verification-   │
│       required': { robots:false}│     │       required': { robots:false}│
│  }                              │     │  }                              │
│                                 │     │                                 │
│  site: {                        │     │  site: {                        │
│    url: 'https://www.           │     │    url: 'https://www.           │
│           fromthehart.tech'     │     │           fromthehart.tech'     │
│  }                              │     │  }                              │
└────────────┬────────────────────┘     └────────────┬────────────────────┘
             │                                       │
             ▼                                       ▼
   Build-time module behavior              Build-time module behavior
   ┌──────────────────────────┐           ┌──────────────────────────┐
   │ @nuxtjs/robots           │           │ @nuxtjs/robots           │
   │ env ≠ 'production'       │           │ env = 'production'       │
   │ → robots.txt: Disallow:/ │           │ → robots.txt: Disallow:  │
   │ → meta: noindex,nofollow │           │ → meta: index,follow     │
   └──────────┬───────────────┘           └──────────┬───────────────┘
              │                                      │
   ┌──────────▼───────────────┐           ┌──────────▼───────────────┐
   │ @nuxtjs/sitemap          │           │ @nuxtjs/sitemap          │
   │ respects robots module   │           │ respects robots module   │
   │ all pages non-indexable  │           │ excludes /user/**, etc.  │
   │ → empty/minimal sitemap  │           │ → valid prod sitemap     │
   └──────────┬───────────────┘           └──────────┬───────────────┘
              │                                      │
              ▼                                      ▼
   .output/public/                       .output/public/
   robots.txt:  Disallow: /              robots.txt:  Disallow:
   sitemap.xml: (empty/minimal)          sitemap.xml: valid prod URLs
   *.html: meta="noindex,nofollow"       *.html: meta="index,follow"
              │                                      │
              ▼                                      ▼
   S3: dev.fromthehart.tech              S3: www.fromthehart.tech
```

**Key flow:**
1. CI workflow sets `NUXT_SITE_ENV` (dev only; prod relies on default)
2. `@nuxtjs/robots` reads env → decides indexability for entire site
3. `@nuxtjs/sitemap` reads robots module decisions → filters sitemap entries
4. Static output differs per environment → deployed to different S3 buckets

## Technology Decisions

### `@nuxtjs/robots` (v6.x)

**Addresses:** AC-1, AC-2, AC-5, AC-6

- **Why:** Purpose-built for env-aware indexing. Auto-blocks non-prod with zero config beyond `NUXT_SITE_ENV`. Generates `robots.txt` + `<meta name="robots">` tag. Integrates natively with `@nuxtjs/sitemap`.
- **Why not manual `robots.txt`:** Requires CI post-build overrides (brittle). Doesn't add meta tags.
- **Why not `@nuxtjs/robots` + custom config:** Defaults are sufficient — the module's production detection is all we need.
- **Version:** Latest v6 (~v6.0.6). Compatible with Nuxt 3 and `zeroRuntime` static generation.

### `NUXT_SITE_ENV` env var

**Addresses:** AC-5, AC-1, AC-2

- **Why:** The documented interface for `@nuxtjs/robots` to detect non-production environments. Defaults to `'production'` — prod CI omits it, dev CI sets `dev`. The module treats any value except the literal string `'production'` as non-production (indexing disabled).
- **Safety fallback:** `nuxt.config.ts` defaults `NUXT_SITE_ENV` to `'dev'` if unset (`process.env.NUXT_SITE_ENV || 'dev'`). This ensures a local build without `.env` blocks indexing (safe default). CI prod overrides to `production` explicitly.
- **Why not `site.indexable: false`:** Can't be set per-environment in `nuxt.config.ts` without an env var anyway.
- **Why not repurpose an existing env var (`NUXT_PUBLIC_FROM_THE_HART_API_BASE_URL`):** Mixing concerns — API URLs are functional, indexing is SEO. Using the dedicated `NUXT_SITE_ENV` is self-documenting.

### Route rules (`robots: false`) for behind-login pages

**Addresses:** AC-4

- **Why:** `robots: false` route rule is the `@nuxtjs/robots` module's mechanism for per-page indexing control. It triggers three effects: page excluded from sitemap, disallowed in `robots.txt`, meta tag set to `noindex`.
- **Why glob patterns:** `'/user/**': { robots: false }` covers all sub-routes; `'/auth/verify-email'` is an exact match for a specific post-login page. Adding a new exclusion is one line.
- **Why not `sitemap.exclude` in sitemap module:** `robots: false` route rule propagates to both robots.txt AND sitemap. Using only `sitemap.exclude` would leave the page allowed in robots.txt.
- **Why not per-page `defineRouteRules`:** Requires modifying individual Vue files (violates C1 constraint of minimal code changes). Route rules in `nuxt.config.ts` are centralized.

## Data Model

No new data structures. All changes are configuration:

### `nuxt.config.ts` additions

```typescript
// New module (inserted before @nuxtjs/sitemap for proper integration order)
modules: ['@nuxtjs/robots', '@nuxtjs/sitemap', ...],

// Route rules — single source of truth for indexing policy.
// All per-page `robots` meta lines are removed from .vue files
// (see below). These route rules replace them + control robots.txt/sitemap.
routeRules: {
  // ... existing prerender rules unchanged ...

  // CAUTION: Do NOT add a generic /auth/** rule — it would incorrectly block
  // /auth/forgot-password and /auth/reset-password, which are public pages.

  // Behind-login pages — excluded from indexing and sitemap (AC-4)
  '/auth/verify-email': { robots: false },
  '/auth/email-verification-required': { robots: false },
  '/user/**': { robots: false },
  '/storage/**': { robots: false },
}
```

### Per-page `robots` meta removals

All hardcoded `robots` lines are removed from `useSeoMeta` calls (the `@nuxtjs/robots` module now owns the global meta tag). The only exceptions are:

| File | `robots` value | Action | Reason |
|------|---------------|--------|--------|
| `app.vue` | `'index, follow'` | Remove | Module handles global default |
| `pages/index.vue` | `'index, follow'` | Remove | Redundant (module default on prod) |
| `pages/about.vue` | `'index, follow'` | Remove | Redundant |
| `pages/projects.vue` | `'index, follow'` | Remove | Redundant |
| `pages/auth/login.vue` | `'noindex, nofollow'` | Remove | Was wrong — login is a public page, should be indexable |
| `pages/auth/register.vue` | `'noindex, nofollow'` | Remove | Was wrong — register is a public page |
| `pages/auth/forgot-password.vue` | `'noindex, nofollow'` | Remove | Was wrong — public page (see Non-Goals) |
| `pages/auth/reset-password.vue` | `'noindex, nofollow'` | Remove | Was wrong — public page (see Non-Goals) |
| `pages/auth/verify-email.vue` | `'noindex, nofollow'` | Remove | Covered by route rule above |
| `pages/auth/email-verification-required.vue` | `'noindex, nofollow'` | Remove | Covered by route rule above |
| `pages/blog/[...slug].vue` | `post?.robots` | **KEEP** | Content-driven, per-post from Nuxt Content frontmatter. This is intentional overridable behavior. |
| `types/blog.ts` | `robots: string` | **KEEP** | TypeScript type definition for the blog route |

### CI environment variables

| Workflow | Variable | Value |
|----------|----------|-------|
| `provision-build-test-deploy-dev.yml` | `NUXT_SITE_ENV` | `dev` |
| `provision-build-test-deploy-prod.yml` | `NUXT_SITE_ENV` | *(not set — defaults to `production`)* |

### Local `.env`

```
NUXT_SITE_ENV=dev
```

## API / Interface Design

### `@nuxtjs/robots` module config (nuxt.config.ts)

```typescript
// No explicit robots config block needed — module defaults handle everything.
// The module auto-detects production vs non-production from NUXT_SITE_ENV.
// Route rules provide per-page overrides.

robots: {
  // No custom config — default behavior is sufficient:
  // - Non-prod: blocks everything
  // - Prod: allows everything, adds sitemap reference
}
```

The module's auto-behavior per environment:

| Environment | `robots.txt` | `<meta name="robots">` |
|-------------|-------------|------------------------|
| `dev` (non-prod) | `User-agent: *` / `Disallow: /` | `noindex, nofollow` |
| `production` | `User-agent: *` / `Disallow:` + sitemap ref | `index, follow` |

Pages with `robots: false` route rule get `noindex, nofollow` in all environments.

### Route rule precedence

The `robots: false` route rule takes precedence over the environment default:
- Dev (non-prod) + `robots: false` → `noindex, nofollow` (same result, consistent)
- Prod + `robots: false` → `noindex, nofollow` (overrides the prod allow-all default)

### Integration with `@nuxtjs/sitemap`

The sitemap module reads the robots module's decisions via Nuxt Site Config:
- Pages marked `robots: false` → excluded from `<urlset>`
- Dev environment (all pages non-indexable) → empty/minimal sitemap

`site.url` remains hardcoded to `https://www.fromthehart.tech` (no change needed — AC-3 confirms dev sitemap is irrelevant, and prod sitemap is correct).

### SPA-only page limitation

Pages that are **not prerendered** (`/auth/**`, `/user/**`, `/storage/**` have `prerender: false`) are served via the SPA fallback HTML. The `robots: false` route rule affects `robots.txt` and `sitemap.xml` for these routes, but a `<meta name="robots">` tag cannot be injected into their static HTML (there is no per-route HTML file — only the SPA fallback).

The global fallback HTML gets the module's env-aware meta tag (`noindex` on dev, `index` on prod). For behind-login routes on prod, this means the fallback says `index, follow` — which is acceptable because:
1. `robots.txt` blocks crawling of those paths
2. They are excluded from the sitemap
3. If a crawler somehow reaches them, the client-side SPA redirects unauthenticated users to login

No per-page `useSeoMeta({ robots })` remains on these pages (all removed — see Data Model above). The route rule + robots.txt is the sole defense.

## Error Handling

| Scenario | Behavior |
|----------|----------|
| `NUXT_SITE_ENV` not set on dev | Module defaults to `production` → dev would be indexable (same as current bug). Mitigation: CI workflow explicitly sets it AND `nuxt.config.ts` falls back to `'dev'` if unset for local safety. |
| `@nuxtjs/robots` fails to install | `npm ci` fails → CI pipeline halts before build. No deploy of broken state. |
| `@nuxtjs/robots` conflicts with `@nuxtjs/sitemap` | Both are Nuxt SEO ecosystem modules from the same maintainer (harlan-zw). Integration is documented and tested. If `@nuxtjs/robots` v6+ and `@nuxtjs/sitemap` v8+ are incompatible, `npm install` will surface peer dependency warnings. |
| Build generates unexpected `robots.txt` | Static file — can be verified with `curl` after deploy. No runtime surprises. |
| Route rule typo (e.g., `/usr/**` instead of `/user/**`)| Route rule won't match any actual route → page remains indexable. Low-risk: use exact copy-paste paths from the file-based router. |

## Testing Strategy

### Pre-deploy verification (local)

```bash
# 1. Verify local dev blocks indexing
NUXT_SITE_ENV=dev npm run generate
cat .output/public/robots.txt
# Expected: User-agent: * / Disallow: /

# 2. Simulate prod (unset NUXT_SITE_ENV)
NUXT_SITE_ENV=production npm run generate
cat .output/public/robots.txt
# Expected: User-agent: * / Disallow: (empty, with sitemap reference)
```

### Post-deploy verification (automated — CI or manual)

```bash
# Dev
curl -s https://dev.fromthehart.tech/robots.txt
# Expected: User-agent: *\nDisallow: /

curl -s https://dev.fromthehart.tech/ | grep -o '<meta name="robots"[^>]*>'
# Expected: <meta name="robots" content="noindex, nofollow">

# Prod
curl -s https://www.fromthehart.tech/robots.txt
# Expected: User-agent: *\nDisallow:\nSitemap: https://www.fromthehart.tech/sitemap.xml

curl -s https://www.fromthehart.tech/ | grep -o '<meta name="robots"[^>]*>'
# Expected: <meta name="robots" content="index, follow">
```

### Google Search Console verification (manual)

1. After dev deploy, use **URL Inspection** tool on `dev.fromthehart.tech/`
2. Confirm: "Indexing allowed? No: 'noindex' detected in 'robots' meta tag"
3. Go to **Removals** → **New Request** → enter `https://dev.fromthehart.tech/` → select "Remove all URLs with this prefix" → submit (this is mandatory — do not rely on passive Google re-crawl, per AC-6)
4. Monitor GSC for resolution of the "Duplicate without user-selected canonical" error on the Coverage report

### Regression checks

- `npm run generate` must succeed without errors
- `npm run dev` must still work locally (with `.env` providing `NUXT_SITE_ENV=dev`)
- Existing Cypress E2E tests must still pass
- OG/twitter meta tags in `app.vue` must remain unchanged (C1 — only `robots` line removed, everything else intact)
