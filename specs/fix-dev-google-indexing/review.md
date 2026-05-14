Here is the adversarial review of the specification (Requirements, Design, and Tasks).

---

### Finding 1
- **Category**: Unstated Assumption
- **Severity**: High
- **Finding**: The entire solution assumes that using the `@nuxtjs/robots` module to set `noindex` will force Google to immediately drop the existing indexed URLs. The specification implies AC-6 (resolving the GSC error) is a direct result of deployment. However, Google may cache the `noindex` directive for weeks or months, and the "Duplicate without user-selected canonical" error will persist until Google re-crawls and removes those specific URLs.
- **Suggestion**: Add explicit acceptance criteria requiring the use of Google Search Console's "Request Indexing" or "Removals" tool as a mandatory post-deployment step, not just a manual suggestion. Change AC-6 to: "The 'Duplicate without user-selected canonical' error is marked as resolved in GSC **after** a successful removal request, or after a waiting period of 30 days with confirmed `noindex` headers."

### Finding 2
- **Category**: Missing Requirement
- **Severity**: High
- **Finding**: The specification does not address what happens to the **hardcoded `<meta name="robots">` in `app.vue`**. Requirement states "No changes to `app.vue`" (C1), and "Existing `useSeoMeta` calls stay as-is" (Non-Goals). If `app.vue` currently has a **hardcoded** `<meta name="robots" content="index, follow">` that is globally applied, the `@nuxtjs/robots` module's per-environment logic may be overridden or conflict with this hardcoded tag. The design relies on the module to inject the tag, but a hardcoded tag in `app.vue` could take precedence or create a duplicate.
- **Suggestion**: Add a requirement to **remove** the hardcoded `<meta name="robots">` from `app.vue`. Alternatively, require a verification step that confirms no hardcoded meta tag exists in `app.vue` or `default.vue` layout. If it cannot be removed (C1 is strict), the spec must explicitly state that the module's injection is redundant and only `robots.txt` / `X-Robots-Tag` will be relied upon, which contradicts AC-1/AC-2 which require the `<meta>` tag.

### Finding 3
- **Category**: Design Gap
- **Severity**: High
- **Finding**: The `@nuxtjs/robots` module's behavior for **static generation** (`npm run generate`) is assumed to be compatible, but the design explicitly notes "zeroRuntime-compatible mode must work" (C3). The module v6.x documentation notes that `zeroRuntime` mode may have limitations regarding `X-Robots-Tag` headers (headers are typically added at runtime by a server/Nitro). For a fully static site on S3, **`X-Robots-Tag` headers cannot be injected** because there is no server to set response headers. The specification promises an `X-Robots-Tag` header in AC-1 and AC-2, which is **impossible to achieve** purely via static file hosting.
- **Suggestion**: Remove `X-Robots-Tag` from AC-1 and AC-2 for the static site deployment. Add a note that `X-Robots-Tag` is a runtime feature and cannot be implemented on S3 without a CloudFront Function or Lambda@Edge (which is outside scope). Rely solely on `robots.txt` and `<meta>` tags.

### Finding 4
- **Category**: Unstated Assumption
- **Severity**: Medium
- **Finding**: The design assumes that `@nuxtjs/robots` v6.x is compatible with `@nuxtjs/sitemap` v8.x and Nuxt 3. It notes "If incompatible, `npm install` will surface peer dependency warnings." This is a weak mitigation. A peer dependency warning might be ignored, or worse, the modules might partially work but produce incorrect `robots.txt` or sitemap (e.g., dev sitemap still containing URLs despite being blocked).
- **Suggestion**: Change Task 1 to include a step that pins both modules to specific compatible versions (e.g., `@nuxtjs/robots@6.0.6` and `@nuxtjs/sitemap@8.0.0`). Add a verification step in Task 5 that checks the integration is correct by inspecting the generated `sitemap.xml` in dev mode to ensure it is **empty** or **missing**, not just pointing to `www.fromthehart.tech`.

### Finding 5
- **Category**: Missing Requirement
- **Severity**: Medium
- **Finding**: The specification does not address the **`/auth/forgot-password` and `/auth/reset-password` pages**. Non-Goals explicitly state these should remain indexable. However, the design does not explicitly exclude them from the route rules. If a future developer misinterprets the route rule pattern (e.g., using `/auth/**`), these pages would be incorrectly blocked.
- **Suggestion**: Add a **negative route rule** in `nuxt.config.ts` for safety: `'/auth/forgot-password': { robots: true }` and `'/auth/reset-password': { robots: true }`. Alternatively, add a comment in the code explicitly stating "Do not block these reset/forgot pages."

### Finding 6
- **Category**: Risk
- **Severity**: Medium
- **Finding**: The specification introduces a new environment variable `NUXT_SITE_ENV` that overrides the module's production detection. However, the module's default behavior is to treat **any** non-`development` value (e.g., `staging`, `demo`) as production. If a developer accidentally sets `NUXT_SITE_ENV=dev` (without the full word), the module will treat it as production and allow indexing. The design has no validation or guard against this.
- **Suggestion**: Add a requirement for a validation check in the CI pipeline or a `prebuild` script that warns/errors if `NUXT_SITE_ENV` is set to an unexpected value. Example: `if [[ "$NUXT_SITE_ENV" != "development" && "$NUXT_SITE_ENV" != "production" ]]` then fail.

### Finding 7
- **Category**: Design Gap
- **Severity**: Medium
- **Finding**: The verification steps for AC-4 (behind-login pages) rely on checking `sitemap.xml` for the absence of URLs. This is a weak test. A page could be absent from the sitemap but still be indexable via external links or direct access. The AC requires pages to be `noindex`, but the test only checks the sitemap.
- **Suggestion**: Update Task 5 and Task 7 to also verify that the **actual HTML** of those behind-login pages contains `<meta name="robots" content="noindex, nofollow">`. For example: `curl -s https://www.fromthehart.tech/auth/verify-email` should return a 2xx (or 3xx) but include the `noindex` meta tag.

### Finding 8
- **Category**: Missing Requirement
- **Severity**: Low
- **Finding**: The specification does not define what happens to the **Google Search Console property** for `dev.fromthehart.tech`. If the site is completely blocked and eventually removed from the index, the GSC property for `dev.fromthehart.tech` may show a "Property not verified" or "Site not indexed" state. This is a minor UX issue but could cause confusion for the site owner.
- **Suggestion**: Add a note in AC-6 that the GSC property for `dev.fromthehart.tech` may become inactive, and that is expected / acceptable. Alternatively, recommend removing the GSC property entirely after the error is resolved.

### Finding 9
- **Category**: Risk
- **Severity**: Low
- **Finding**: The specification relies solely on `NUXT_SITE_ENV` to differentiate environments. If a developer runs `npm run generate` locally **without** the `.env` file loaded (e.g., in a fresh clone), the output will be a **production build** (indexable). This is a risk for accidental staging deploys.
- **Suggestion**: Add a requirement to set `NUXT_SITE_ENV=development` as a **default** in `nuxt.config.ts` using `process.env.NUXT_SITE_ENV || 'development'` (only for local dev, CI overrides). This ensures a fresh clone without `.env` defaults to blocking (safe) behavior.

### Finding 10
- **Category**: Unstated Assumption
- **Severity**: Low
- **Finding**: The design assumes the `@nuxtjs/robots` module's route rules (`robots: false`) will be respected by the sitemap module. The documentation supports this, but there is a known edge case: If a page is excluded via `robots: false` but is also explicitly included in a `sitemap: { urls: [] }` array (if such config exists), the sitemap module might include it anyway. The spec does not check for existing `sitemap` config in `nuxt.config.ts`.
- **Suggestion**: Add a verification step in Task 5 to grep for any `sitemap` configuration in `nuxt.config.ts` that might conflict with route rules. If found, the spec should explicitly address how to handle the conflict (e.g., remove the manual sitemap config).