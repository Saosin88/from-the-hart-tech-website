# Website Architecture

Last updated: 2025-11-22

## Current State
- Nuxt 3 with Vue.js 3 and TypeScript
- Static Site Generation (SSG) deployed to AWS S3/CloudFront
- Tailwind CSS + Nuxt UI components
- Nuxt Content for markdown blog posts
- Cypress for E2E testing

## Component Patterns
- All components use `<script setup lang="ts">` (Composition API)
- Proper TypeScript with `defineProps` and `withDefaults`
- Custom composables: `useBlogUtils()`, `useFormatters()`, `useProjectsAPI()`
- Consistent Nuxt UI component usage (UCard, UButton, etc.)
- Dark mode support throughout

## Issues Identified

### Low Priority
1. **[2025-11-22] Hardcoded skill data in component**
   - File: `app/components/about/skills-display.vue`
   - Issue: 96 lines of hardcoded data
   - Recommendation: Extract to composable or data file
   - Status: Not fixed

## Performance Notes
- Build time: Not yet measured
- Bundle size: Not yet analyzed
- Lighthouse scores: Not yet tested

## Testing Coverage
- Cypress E2E tests exist
- Coverage of critical user journeys: Unknown
- Accessibility testing: Not confirmed
