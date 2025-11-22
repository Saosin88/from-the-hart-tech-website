# CLAUDE.md - From The Hart Tech Website

This file provides guidance to Claude Code when working with the Tech Website in this repository.

## Service Overview

The **From The Hart Tech Website** is a modern, responsive static website and blog built with Nuxt 3. It showcases professional portfolio, technical blog posts, project case studies, and contact information. The website is deployed on AWS using a serverless architecture (S3 + CloudFront) for optimal performance and cost efficiency.

### Key Responsibilities
- Static website generation and hosting
- Blog system with markdown content
- Portfolio and project showcases
- SEO optimization with meta tags and sitemap
- Responsive design for desktop and mobile
- Performance optimization through image optimization and lazy loading
- E2E testing with Cypress

### Architecture
- **Framework**: Nuxt 3 (Vue 3 + TypeScript)
- **Hosting**: AWS S3 + CloudFront CDN
- **DNS**: Cloudflare domain management
- **SSL/TLS**: AWS Certificate Manager
- **CI/CD**: GitHub Actions for automated deployment

## Technology Stack

### Frontend Technologies
- **Framework**: Nuxt 3 (v4.1.3+) with Vue 3
- **Language**: TypeScript
- **Styling**: Tailwind CSS with typography plugin
- **UI Components**: Nuxt UI (headless component library)
- **Content**: Nuxt Content v3 for markdown processing
- **Image Optimization**: Nuxt Image for responsive images
- **Routing**: Vue Router (included with Nuxt)
- **SEO**: Nuxt Sitemap plugin
- **Security**: Cloudflare Turnstile for bot protection

### Development Tools
- **Build Tool**: Nuxt (built on Vite)
- **Package Manager**: npm
- **Testing**: Cypress for E2E tests
- **Code Quality**: TypeScript strict mode
- **Hot Module Reload**: Enabled for dev experience

### AWS Infrastructure
- **Storage**: S3 bucket for static assets
- **CDN**: CloudFront distribution
- **SSL Certificates**: ACM
- **Access Control**: S3 bucket policies and IAM roles
- **Monitoring**: CloudWatch (via Terraform)

## Project Structure

```
from-the-hart-tech-website/
├── app/
│   ├── components/                 # Reusable Vue components
│   │   ├── common/                 # Shared components
│   │   ├── Hero.vue                # Landing hero section
│   │   ├── BlogCard.vue            # Blog post card component
│   │   └── ...
│   ├── composables/                # Composition functions (reusable logic)
│   │   ├── useBlog.ts              # Blog fetching and filtering
│   │   ├── useMetadata.ts          # SEO metadata composable
│   │   └── ...
│   ├── layouts/
│   │   ├── default.vue             # Default layout
│   │   └── blog.vue                # Blog-specific layout
│   ├── pages/
│   │   ├── index.vue               # Home page
│   │   ├── blog/
│   │   │   ├── index.vue           # Blog listing page
│   │   │   └── [...slug].vue       # Individual blog post (dynamic)
│   │   ├── projects.vue            # Projects showcase
│   │   ├── about.vue               # About page
│   │   └── contact.vue             # Contact page
│   ├── app.vue                     # Root component
│   └── app.config.ts               # Nuxt app configuration
├── content/
│   └── blog/                       # Markdown blog posts
│       ├── post-1.md               # Individual blog posts
│       └── ...
├── cypress/
│   └── e2e/                        # End-to-end tests
│       ├── landing.cy.ts           # Home page tests
│       ├── blog.cy.ts              # Blog tests
│       └── ...
├── public/
│   ├── assets/                     # Images and static files
│   ├── logo/                       # Logo files
│   └── robots.txt
├── resources/
│   └── drawio/                     # Architecture diagram sources
├── terraform/
│   ├── dev/                        # Development environment
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── prod/                       # Production environment
│       ├── main.tf
│       └── ...
├── .output/                        # Generated static site (build output)
│   └── public/                     # Production-ready HTML/CSS/JS
├── content.config.ts               # Nuxt Content configuration
├── nuxt.config.ts                  # Main Nuxt configuration
├── package.json                    # Dependencies and scripts
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project documentation
```

## Common Commands

### Installation & Setup
```bash
# Install dependencies
npm install

# Prepare Nuxt (generates types, imports, etc.)
npm run postinstall
```

### Development
```bash
# Start development server (localhost:3000)
npm run dev

# Start with specific environment file
npm run dev -- --dotenv .env.local

# Enable Nuxt DevTools UI
# Automatically opens on http://localhost:3000/__nuxt_devtools__
```

### Building

#### Static Site Generation (Recommended for S3 Hosting)
```bash
# Generate static site to .output/public
npm run generate

# This creates:
# - HTML files for each page/route
# - CSS and JavaScript bundles
# - Image-optimized assets
# - Static assets from public/ directory
```

#### Traditional Build (for Cloud Run/Node.js)
```bash
# Build for SSR
npm run build

# Preview SSR build
npm run preview
```

#### Serving Static Site Locally
```bash
# Serve .output/public directory
npm run serve

# Or with npx serve directly
npx serve .output/public
```

### Testing
```bash
# Run Cypress E2E tests
npm run cypress

# Open Cypress interactive mode
npm run cypress -- --open

# Run specific test file
npm run cypress -- --spec cypress/e2e/blog.cy.ts

# Run tests headless
npm run cypress -- --headless

# Generate coverage report
npm run cypress -- --coverage
```

### Deployment

#### Manual Deployment to AWS S3
```bash
# Generate static site
npm run generate

# Sync to S3 bucket (deletes old files)
aws s3 sync .output/public/ s3://your-bucket-name/ --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

#### Using GitHub Actions (Automated)
```bash
# Push to main branch to trigger automatic deployment:
git push origin main

# GitHub Actions will:
# 1. Run Terraform (infrastructure updates)
# 2. Build and test the site
# 3. Deploy to S3
# 4. Invalidate CloudFront
```

## Environment Variables

### Development Configuration
- `NODE_ENV` - Environment mode (development, production)
- `NUXT_PUBLIC_API_BASE` - Public API base URL for API calls
- `NUXT_PUBLIC_SITE_URL` - Website URL for canonical links and SEO

### Optional Configuration
- `NUXT_PUBLIC_GA_ID` - Google Analytics ID (if using analytics)
- `NUXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` - For form protection

### Build-Time Variables
- `CI` - Set by GitHub Actions for CI detection
- `GENERATE_SOURCEMAPS` - Whether to generate source maps (false in prod for security)

### Environment Files
- `.env` - Local development (not committed)
- `.env.example` - Template for environment variables
- `.env.production` - Production overrides (CI/CD)

## Local Development Setup

### Prerequisites
- Node.js v18+ (check with `node --version`)
- npm v9+ (included with Node.js)
- Git

### Initial Setup
```bash
# Clone repository
git clone https://github.com/Saosin88/from-the-hart-tech-website.git
cd from-the-hart-tech-website

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Development Workflow
```bash
# Terminal 1: Run dev server with hot reload
npm run dev

# Terminal 2: Run Cypress tests in watch mode
npm run cypress -- --open

# Make changes to .vue files, components, or content
# Changes auto-reload in browser
# Test updates in Cypress UI
```

### Adding Blog Posts
```bash
# Blog posts are markdown files in content/blog/
# Create new file: content/blog/my-new-post.md

# Front matter example:
---
title: "My Blog Post Title"
description: "Short description for meta tags"
author: "Your Name"
date: "2025-01-15"
image: "/assets/blog/post-image.jpg"
---

# Your markdown content here
```

### Image Optimization
```bash
# Nuxt Image automatically optimizes:
# - Responsive sizes
# - Modern formats (WebP)
# - Lazy loading

# Usage in components:
<NuxtImg
  src="/assets/my-image.jpg"
  alt="Description"
  width="800"
  height="600"
/>
```

## Testing Approach

### Cypress E2E Testing
Tests verify complete user flows from navigation to interactions:

```bash
# Run all tests
npm run cypress

# Run specific test file
npm run cypress -- --spec cypress/e2e/blog.cy.ts

# Run in interactive mode
npm run cypress -- --open
```

### Test Structure
```typescript
describe('Blog Page', () => {
  it('displays blog posts', () => {
    cy.visit('/blog');
    cy.get('[data-testid="blog-post"]').should('have.length.greaterThan', 0);
  });

  it('filters blog posts by category', () => {
    cy.visit('/blog');
    cy.get('[data-testid="category-filter"]').click();
    cy.get('[data-testid="blog-post"]').should('be.visible');
  });
});
```

### Testing Best Practices
- Use `data-testid` attributes for reliable selectors
- Test user flows, not implementation details
- Keep tests focused and independent
- Use fixtures for test data

## Deployment Information

### Static Site Generation Workflow

The website uses Nuxt's `generate` command to create a fully static site:

```
npm run generate
  ├─ Processes all .vue pages
  ├─ Renders markdown content from content/blog/
  ├─ Optimizes images
  ├─ Generates .output/public/
  │  ├─ HTML files for all routes
  │  ├─ CSS/JavaScript bundles
  │  ├─ Optimized images
  │  └─ Static assets
  └─ Site ready for S3 deployment
```

### AWS S3 + CloudFront Deployment

**S3 Configuration**:
- Static website hosting enabled
- Public read access via bucket policy
- Gzip compression for text assets
- CloudFront Origin Access Identity for security

**CloudFront Configuration**:
- Distribution points to S3 as origin
- Caching rules optimize for performance
- Gzip compression enabled
- HTTPS only (via ACM certificate)

**Invalidation Strategy**:
- Full path invalidation (`/*`) on each deploy
- Cache-busting through Nuxt's asset hashing
- Predictable TTLs for stable content

### Production Deployment Checklist
- [ ] Run tests: `npm run cypress`
- [ ] Generate site: `npm run generate`
- [ ] Test locally: `npm run serve`
- [ ] Verify build has no errors
- [ ] Check SEO metadata in generated HTML
- [ ] Validate images are optimized
- [ ] Test responsive design
- [ ] Verify sitemap is generated
- [ ] Check CloudFront invalidation succeeds

### Performance Optimization

**Built-in Optimizations**:
- Automatic image optimization via Nuxt Image
- Code splitting and lazy loading
- Asset hashing for cache busting
- Gzip compression
- Tree-shaking of unused code

**Recommended Practices**:
- Keep images under 500KB original size
- Use modern formats (WebP) via Nuxt Image
- Minimize JavaScript bundle (tree-shake unused deps)
- Use semantic HTML for SEO
- Implement proper meta tags for social sharing

### Scaling & Monitoring

**Traffic Scaling**:
- CloudFront auto-scales based on traffic
- S3 automatically handles request volume
- No server-side scaling needed (static content)

**Monitoring**:
- CloudFront access logs available
- CloudWatch metrics for cache hit rate
- S3 access logs for direct S3 requests
- Configure alarms in Terraform

## Claude Code Integration Notes

### .claude Directory
Commands and context files are located in `.claude/commands/`:
- Custom slash commands for common operations
- Integration with Claude Code agents

### Useful Patterns for Agent Work

**Analyzing Vue Components**
- Check `<template>`, `<script setup>`, and `<style>` blocks
- Look for `v-if`, `v-for` directives for conditional rendering
- Examine `useAsyncData` and `useFetch` for data loading
- Search for composables imported from app/composables/

**Understanding Routes**
- Nuxt uses file-based routing (pages/ directory structure maps to routes)
- Dynamic routes use `[slug].vue` or `[...slug].vue` syntax
- Check nuxt.config.ts for custom route configuration

**Blog Content Handling**
- Blog posts are markdown files in content/blog/
- Nuxt Content parses YAML front matter automatically
- Use `queryContent()` composable to fetch posts
- Structure: `/blog/post-slug` maps to `content/blog/post-slug.md`

### Common Claude Code Tasks

**Adding a New Page**
1. Create component in `app/pages/new-page.vue`
2. Component auto-registers as route
3. Add navigation link in layout/navigation
4. Optionally add Cypress test in `cypress/e2e/`

**Creating Blog Post**
1. Create markdown file: `content/blog/post-slug.md`
2. Add YAML front matter (title, date, description)
3. Write markdown content
4. Post auto-appears in blog listing
5. Accessible at `/blog/post-slug`

**Modifying Styles**
- Tailwind classes in templates
- Global CSS in app.vue or components
- Theme colors in tailwind.config.ts
- Dark mode available with Tailwind dark: directive

**Integrating APIs**
- Use `useFetch()` or `useAsyncData()` in components
- Set baseURL in nuxt.config.ts
- Environment variables for API endpoints
- Error handling with try/catch or composable wrapper

### Debugging Tips
- Enable Nuxt DevTools: `npm run dev` (DevTools UI at /__nuxt_devtools__)
- Check browser DevTools for hydration mismatches
- Use `definePageMeta()` for page-level configuration
- Review generated files in `.output/` to diagnose build issues
- Test with `npm run serve` for production-like behavior

## Key Files Reference

| File | Purpose |
|------|---------|
| `nuxt.config.ts` | Main Nuxt configuration |
| `app.vue` | Root component and layout wrapper |
| `content.config.ts` | Nuxt Content (markdown) configuration |
| `tailwind.config.ts` | Tailwind CSS theme and plugins |
| `app/pages/*.vue` | Page components (auto-routed) |
| `app/components/*.vue` | Reusable components |
| `app/composables/*.ts` | Composition functions |
| `content/blog/*.md` | Blog post markdown files |
| `cypress/e2e/*.ts` | End-to-end tests |
| `public/` | Static assets (favicons, robots.txt, etc.) |

## Related Services

This service integrates with:
- **Infrastructure** (`from-the-hart-infrastructure`): Terraform configs for S3, CloudFront, Cloudflare DNS
- **API Reverse Proxy** (`from-the-hart-tech-api-reverse-proxy-worker`): Routes API requests (contact form, etc.)
- **Projects API** (`from-the-hart-projects`): Provides project data
- **Auth Service** (`from-the-hart-auth`): Optional authentication for admin features
