# From The Hart Tech Website

> Nuxt 3 static SPA on S3 + CloudFront. See [master AGENTS.md](../AGENTS.md) for shared principles.

## Tech Stack

- **Framework:** Nuxt 3 + Vue 3 Composition API (`<script setup lang="ts">`)
- **Styling:** Tailwind CSS + Nuxt UI v4
- **Content:** Nuxt Content v3 (Markdown in `content/blog/`)
- **Images:** `@nuxt/image`
- **SEO:** `@nuxtjs/sitemap`
- **Bot Protection:** `@nuxtjs/turnstile` (Cloudflare Turnstile)
- **Testing:** Cypress (E2E)
- **Deploy:** S3 + CloudFront, provisioned via Terraform (in this repo)

## Common Commands

```bash
npm install              # Install deps
npm run dev              # Dev server at localhost:3000
npm run generate         # Static site → .output/public
npm run serve            # Serve static output locally
npm run cypress          # Run E2E tests
```

## Directory Notes

```
app/
├── components/          # Auto-imported Vue components
│   ├── about/           # About page sections
│   ├── auth/            # Auth UI (modals, etc.)
│   ├── content/         # Blog rendering components
│   ├── projects/        # Project display components
│   └── storage/         # Storage UI components
├── composables/         # Auto-imported composables
├── layouts/             # Page layouts
├── pages/               # File-based routing
│   ├── auth/            # Auth pages (login, register, verify, reset)
│   ├── blog/[...slug]   # Dynamic blog post routes
│   ├── storage/[...path] # Dynamic storage routes
│   └── user/            # User profile pages
├── app.vue              # Root component
└── error.vue            # Error page
content/
└── blog/                # Markdown blog posts with YAML frontmatter
cypress/e2e/             # E2E test specs
terraform/
├── modules/             # Reusable Terraform modules
│   ├── s3_and_cloudfront_static_website/
│   └── s3_and_cloudfront_website_redirect/
├── prod/                # Production infra config
└── dev/                 # Dev infra config
```

## Page Routing

- Prerendered (static): `/`, `/about/**`, `/blog/**`, `/projects/**`
- Dynamic (client-side): `/auth/**`, `/user/**`, `/storage/**`

## Blog Posts

Create in `content/blog/{slug}.md`:

```yaml
---
title: "Post Title"
description: "Meta description"
date: "2025-01-15"
image: "/assets/blog/image.jpg"
---
```

## Nuxt Conventions

- Composables in `composables/` and components in `components/` are **auto-imported** — no manual imports
- Use `useSeoMeta()` in `app.vue` for site-wide SEO
- API calls go through `useAuthAPI()`, `useProjectsAPI()`, etc. composables
- `runtimeConfig.public` for env vars exposed to client (prefixed `NUXT_PUBLIC_`)
