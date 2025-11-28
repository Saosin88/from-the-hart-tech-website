# From The Hart Tech Website

Nuxt 3 static website and blog deployed on AWS S3 + CloudFront.

## Overview

**Responsibilities:**
- Static website generation and hosting
- Blog system with markdown content
- Portfolio and project showcases
- SEO optimization with meta tags and sitemap
- Responsive design and performance optimization

**Architecture:** Nuxt 3 (Vue 3 + TypeScript) → AWS S3 + CloudFront CDN

## Technology Stack

- **Framework:** Nuxt 3 with Vue 3
- **Language:** TypeScript
- **Styling:** Tailwind CSS with Nuxt UI components
- **Content:** Nuxt Content v3 for markdown
- **Images:** Nuxt Image for optimization
- **SEO:** Nuxt Sitemap plugin
- **Testing:** Cypress (E2E)

## Common Commands

```bash
# Development
npm install                          # Install dependencies
npm run dev                          # Start dev server at localhost:3000

# Building
npm run generate                     # Generate static site to .output/public
npm run build                        # Build for SSR
npm run serve                        # Serve static site locally
npm run preview                      # Preview SSR build

# Testing
npm run cypress                      # Run E2E tests
```

## Environment Variables

- `NODE_ENV` - development, production
- `NUXT_PUBLIC_API_BASE` - API base URL
- `NUXT_PUBLIC_SITE_URL` - Website URL for canonical links
- `NUXT_PUBLIC_GA_ID` - Google Analytics ID (optional)

## Local Development

```bash
npm install
cp .env.example .env
npm run dev
# Open browser to http://localhost:3000
```

## Adding Blog Posts

Create markdown files in `content/blog/`:

```markdown
---
title: "Post Title"
description: "Description for meta tags"
author: "Author Name"
date: "2025-01-15"
image: "/assets/blog/image.jpg"
---

# Your markdown content
```

## Deployment

```bash
# Generate static site
npm run generate

# Deploy to S3 (manual)
aws s3 sync .output/public/ s3://bucket-name/ --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id ID --paths "/*"

# Automated via GitHub Actions on push to main
```

## Related Services

- **Infrastructure:** Terraform for S3, CloudFront, Cloudflare DNS
- **API Reverse Proxy:** Routes API requests
- **Projects API:** Provides project data
- Composable in nuxt do not need to be imported, it is auto imported by nuxt