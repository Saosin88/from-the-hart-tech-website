# Tasks: Fix Dev Google Indexing

> Each task references acceptance criteria from [requirements.md](./requirements.md) and design decisions from [design.md](./design.md). Tasks are ordered by dependency but are independently executable.

---

## Task 1: Install @nuxtjs/robots module

**WHAT:** Add the `@nuxtjs/robots` package as a project dependency, register it in Nuxt's module array, and remove all hardcoded `robots` lines from page files. This is the core mechanism that enables environment-aware indexing per AC-1 (dev blocks) and AC-2 (prod allows) in requirements.md. The module auto-detects production vs non-production from `NUXT_SITE_ENV` as described in design.md §Technology Decisions. All per-page `robots` meta lines are removed (the module now owns the global `<meta name="robots">` tag) — see design.md §Data Model for the full list.

**HOW:**
1. Run `npm install @nuxtjs/robots` in the project root
2. Open `nuxt.config.ts` and insert `'@nuxtjs/robots'` into the `modules` array, **before** `'@nuxtjs/sitemap'` (integration order matters per design.md §Architecture Overview — robots module must be evaluated first so sitemap can read its decisions)
3. Remove the `robots` line from `useSeoMeta` in `app.vue` (do NOT remove any other meta fields — OG, Twitter, title, description all stay intact per C1)
4. Remove the `robots` line from `useSeoMeta` in these page files (keep all other meta fields):
   - `pages/index.vue` — remove `robots: 'index, follow',`
   - `pages/about.vue` — remove `robots: 'index, follow',`
   - `pages/projects.vue` — remove `robots: 'index, follow',`
   - `pages/auth/login.vue` — remove `robots: 'noindex, nofollow',`
   - `pages/auth/register.vue` — remove `robots: 'noindex, nofollow',`
   - `pages/auth/forgot-password.vue` — remove `robots: 'noindex, nofollow',`
   - `pages/auth/reset-password.vue` — remove `robots: 'noindex, nofollow',`
   - `pages/auth/verify-email.vue` — remove `robots: 'noindex, nofollow',`
   - `pages/auth/email-verification-required.vue` — remove `robots: 'noindex, nofollow',`
5. Do NOT modify `pages/blog/[...slug].vue` (uses `post?.robots` — content-driven) or `types/blog.ts` (type definition)
6. Add a safety fallback in `nuxt.config.ts`: default `NUXT_SITE_ENV` to `'dev'` if unset, so a fresh clone without `.env` defaults to safe (blocking) behavior per design.md §Technology Decisions → NUXT_SITE_ENV:
   ```typescript
   site: {
     url: 'https://www.fromthehart.tech',
     name: 'My frontend sandbox to play with tech',
     env: process.env.NUXT_SITE_ENV || 'dev',
   },
   ```

**VERIFY:** `npm run generate` succeeds without errors (may show warning about non-production environment — that's expected and confirms the module is active). `cat .output/public/robots.txt` shows either `Disallow: /` or `Disallow:` depending on `NUXT_SITE_ENV`. `grep -r "robots:" app/pages/ app/app.vue` confirms no hardcoded `robots` remain (only `app/pages/blog/[...slug].vue` should show `post?.robots`).

---

## Task 2: Add route rules for behind-login pages in nuxt.config.ts

**WHAT:** Add `robots: false` route rules in `nuxt.config.ts` for pages that should never be indexed or appear in the sitemap, per AC-4 in requirements.md. Uses glob patterns for path families and exact paths for specific pages, as designed in design.md §Technology Decisions → Route rules.

**HOW:**
1. Open `nuxt.config.ts`
2. Locate the existing `routeRules` block
3. Add the following rules alongside the existing ones (do not remove any existing rules):

```typescript
// CAUTION: Do NOT add a generic /auth/** rule — it would incorrectly block
// /auth/forgot-password and /auth/reset-password, which are public pages.
//
// Behind-login pages — excluded from indexing and sitemap (AC-4)
'/auth/verify-email': { robots: false },
'/auth/email-verification-required': { robots: false },
'/user/**': { robots: false },
'/storage/**': { robots: false },
```

This covers the four excluded path families specified in requirements.md §AC-4. The `robots: false` rule triggers: disallow in `robots.txt`, exclude from `sitemap.xml`, and `noindex` meta tag, as documented in design.md §API/Interface Design → Route rule precedence.

**VERIFY:** `npm run generate` succeeds. Inspect `.output/public/sitemap.xml` — the four excluded paths (and their sub-routes for `user`/`storage`) are absent from the `<urlset>`.

---

## Task 3: Set NUXT_SITE_ENV in dev CI workflow

**WHAT:** Add `NUXT_SITE_ENV=dev` to the dev GitHub Actions workflow so the `@nuxtjs/robots` module disables indexing during dev builds. Addresses AC-5 in requirements.md. The prod workflow does NOT set this variable (module defaults to `production`), per constraint C5 in requirements.md and design.md §Data Model → CI environment variables.

**HOW:**
1. Open `.github/workflows/provision-build-test-deploy-dev.yml`
2. Locate the "Set environment variables" step (around line 66, where `NUXT_PUBLIC_FROM_THE_HART_API_BASE_URL` is set)
3. Add the following line to that step:

```yaml
echo "NUXT_SITE_ENV=dev" >> $GITHUB_ENV
```

4. Do NOT modify `.github/workflows/provision-build-test-deploy-prod.yml` — the prod workflow omits `NUXT_SITE_ENV` intentionally (module defaults to `production`)

**VERIFY:** Push to the `dev` branch. After CI completes, `curl -s https://dev.fromthehart.tech/robots.txt` shows `Disallow: /`.

---

## Task 4: Set NUXT_SITE_ENV in local .env

**WHAT:** Add `NUXT_SITE_ENV=dev` to the local `.env` file so that `npm run dev` and local `npm run generate` also disable indexing. Addresses AC-5 in requirements.md ("local dev uses `.env` with `NUXT_SITE_ENV=dev`") and design.md §Data Model → Local `.env`.

**HOW:**
1. Check if `.env` exists in the project root
2. If it exists, add the line `NUXT_SITE_ENV=dev`. If it does not exist, create it with that line.
3. Ensure `.env` is listed in `.gitignore` (verify with `git check-ignore .env` — Nuxt projects typically gitignore `.env` by default)

**VERIFY:** Run `NUXT_SITE_ENV=dev npm run generate` (or just `npm run generate` if `.env` is loaded). `cat .output/public/robots.txt` shows `Disallow: /`.

---

## Task 5: Verify the fix locally before deployment

**WHAT:** Run the static build in both dev and prod simulation modes and inspect the output to confirm all ACs are met before pushing to CI. Covers the pre-deploy verification from design.md §Testing Strategy.

**HOW:**
1. Simulate dev build:
   ```bash
   npm run generate
   ```
   (With `.env` containing `NUXT_SITE_ENV=dev`, or prefix with the env var)
   
   Verify:
   - `cat .output/public/robots.txt` → `User-agent: *\nDisallow: /`
   - `grep -r 'noindex' .output/public/` finds `<meta name="robots" content="noindex, nofollow">` in HTML files

2. Simulate prod build:
   ```bash
   NUXT_SITE_ENV=production npm run generate
   ```
   
   Verify:
   - `cat .output/public/robots.txt` → `User-agent: *\nDisallow:` with sitemap reference
   - `cat .output/public/sitemap.xml` → all `<loc>` URLs use `https://www.fromthehart.tech`
   - `grep -r 'index, follow' .output/public/` finds `<meta name="robots" content="index, follow">` in HTML files
   - The excluded paths (`/auth/verify-email`, `/auth/email-verification-required`, `/user/`, `/storage/`) are absent from `sitemap.xml`

3. Confirm no hardcoded `robots` remain in source (except blog):
   - `grep -r "robots:" app/pages/ app/app.vue | grep -v blog` → empty (zero matches)

4. Check for sitemap config conflicts (design.md §Finding 10): grep `nuxt.config.ts` for any other `sitemap: { urls:` or `sitemap: { include:` config that could override route rules. The existing config should only have `sitemap: { zeroRuntime: true }`.

5. Check Nuxt module version compatibility (design.md §Finding 4): verify `@nuxtjs/robots` and `@nuxtjs/sitemap` installed versions in `package.json` are compatible (robots v6.x, sitemap v8.x). If warnings appear during `npm install`, investigate before proceeding.

**VERIFY:** All grep/curl checks pass for both modes. No sitemap config conflicts found. No peer dependency warnings.

---

## Task 6: Deploy to dev and verify post-deployment

**WHAT:** Push to the `dev` branch to trigger CI deployment, then verify the live dev site serves the correct blocking `robots.txt` and `noindex` meta tags. Covers AC-1, AC-3, and the post-deploy verification from design.md §Testing Strategy.

**HOW:**
1. Commit and push all changes to the `dev` branch
2. Wait for the CI workflow `provision-build-test-deploy-dev.yml` to complete
3. Verify live dev site:
   - `curl -s https://dev.fromthehart.tech/robots.txt` → `User-agent: *\nDisallow: /`
   - `curl -s https://dev.fromthehart.tech/ | grep -o '<meta name="robots"[^>]*>'` → `content="noindex, nofollow"`

**VERIFY:** Curl results match expected dev-blocking values. X-Robots-Tag header is intentionally absent (not achievable on static S3 — per AC-1 note in requirements.md).

---

## Task 7: Deploy to prod and verify post-deployment

**WHAT:** Merge to `main` branch to trigger CI deployment, then verify the live prod site serves correct `robots.txt`, sitemap, and meta tags. Covers AC-2 and AC-4, and the post-deploy verification from design.md §Testing Strategy.

**HOW:**
1. Merge the `dev` branch into `main` (or push directly to `main` per your workflow)
2. Wait for the CI workflow `provision-build-test-deploy-prod.yml` to complete
3. Verify live prod site:
   - `curl -s https://www.fromthehart.tech/robots.txt` → `User-agent: *\nDisallow:\nSitemap: https://www.fromthehart.tech/sitemap.xml`
   - `curl -s https://www.fromthehart.tech/ | grep -o '<meta name="robots"[^>]*>'` → `content="index, follow"`
4. Verify sitemap exclusions (AC-4):
   - `curl -s https://www.fromthehart.tech/sitemap.xml | grep -c 'verify-email'` → `0`
   - `curl -s https://www.fromthehart.tech/sitemap.xml | grep -c '/user/'` → `0`
   - `curl -s https://www.fromthehart.tech/sitemap.xml | grep -c '/storage/'` → `0`

**VERIFY:** All curl results match expected prod-allowing values. Excluded paths absent from sitemap. X-Robots-Tag header is intentionally absent (not achievable on static S3). For SPA-only pages (like `/auth/verify-email`), the `<meta name="robots">` tag cannot be verified via `curl` — per design.md §SPA-only page limitation. The route rule + robots.txt is the sole defense for these pages.

---

## Task 8: Resolve Google Search Console error

**WHAT:** After the dev deploy is confirmed to serve `noindex`, use Google Search Console to verify Google sees the `noindex` directive and request temporary removal. Covers AC-6 in requirements.md and design.md §Testing Strategy → Google Search Console verification.

**HOW:**
1. Open Google Search Console for the `dev.fromthehart.tech` property
2. Use the **URL Inspection** tool on `https://dev.fromthehart.tech/`
3. Click "Test Live URL" → confirm the result shows: "Indexing allowed? No: 'noindex' detected in 'robots' meta tag"
4. Go to **Removals** → **New Request** → enter `https://dev.fromthehart.tech/` → select "Remove all URLs with this prefix" → submit (this is mandatory, per AC-6 in requirements.md — do not rely on passive Google re-crawl)
5. Monitor the **Coverage** report over the following days — the "Duplicate without user-selected canonical" error count should decrease to zero

**VERIFY:** URL Inspection tool confirms `noindex`. Removal request submitted. Coverage report shows zero "Duplicate without user-selected canonical" errors for dev URLs. Note: the `dev.fromthehart.tech` GSC property may become inactive after all URLs are removed — this is expected per requirements.md §AC-6.
