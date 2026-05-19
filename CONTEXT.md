# From The Hart Tech Website — Domain Glossary

> Canonical terms specific to the website. Extends [master CONTEXT.md](../CONTEXT.md).
> Code conventions: [AGENTS.md](./AGENTS.md).

---

## Visitors

### Anonymous

A person browsing the website without being authenticated. Can view public pages: landing page, about, blog, and projects.

- _Avoid:_ "unauthenticated user", "guest"
- _Relationships:_ An **Anonymous** visitor may authenticate to become a **Principal**.

### Principal

The authenticated cryptographic entity — *who you are* after logging in. Defined in the master CONTEXT.md; repeated here because the website is the primary consumer.

- _Avoid:_ "user", "authenticated user"
- _Relationships:_ A **Principal** may act as one or more **Identities** (future). Currently, a **Principal** is effectively self-contained — the **Identity** service does not yet exist.

---

## Content

### Blog Post

A long-form article written by Sheldon, stored as Markdown and rendered via Nuxt Content. Each post has a title, description, date, keywords, image, and SEO metadata.

- _Avoid:_ "article", "post" (ambiguous in a CMS context)
- _Relationships:_ **Blog Post**s are queried and displayed via blog components.

### Blog Post Summary

A lightweight view of a **Blog Post** — path, title, description, date, keywords, image — used in list/card layouts.

- _Relationships:_ A **Blog Post Summary** is a projection of a **Blog Post**.

### Repository

A public Git-hosted repository displayed on the `/projects` page. Fetched via the **Projects Service** through the **API Gateway**. Canonical domain definition in [Projects CONTEXT.md](../from-the-hart-projects/CONTEXT.md).

- _Avoid:_ "project" when referring to a GitHub repo
- _Relationships:_ Displayed by the repository list component. Fetched via the **API Gateway** → **Projects Service**.

### Work Project

An enterprise project from Sheldon's professional history, displayed as static content. Not fetched from any backend service.

- _Avoid:_ "project" (collides with **Repository**)
- _Relationships:_ Rendered on the About page.

---

## Storage

### Storage

The file browser showing all files the current **Principal** has access to — both owned and files shared by other **Principal**s. Currently scoped by Principal ID; will migrate to Identity ID when the **Identity** service is built.

- _Relationships:_ Lists **Storage Item**s. Protected by the **Route Guard**.

### Storage Item

A file or folder visible in the **Storage** browser.

- _Relationships:_ **Storage Item**s are listed during file navigation. Clicking a folder navigates into it; clicking a file opens the **File Viewer**.

### File Viewer

The display surface for a single file's metadata and download access.

- _Relationships:_ Displays one file at a time. Requires valid storage access before loading.

---

## Authentication

### ID Token

A short-lived OpenID Connect JWT issued after login or registration. Decoded client-side to extract identity claims. Sent with API requests through the **API Gateway** — effectively serving the access token role in this architecture.

- _Avoid:_ "access token" (this is an OpenID Connect ID Token, even though it's used to access resources)
- _Relationships:_ Issued by the **Auth Service**. Validated by the **Route Guard** before granting access to protected pages. Renewed silently by the **Refresh Token**.

### Refresh Token

A long-lived token issued when the **Principal** opts for persistent sessions. Used by the **Route Guard** to silently renew an expired **ID Token** without requiring the **Principal** to re-enter credentials.

- _Relationships:_ Issued by the **Auth Service**. Consumed during the **Route Guard** check.
- _Avoid:_ "session token" (ambiguous)

### Verification Token

A one-time-use token delivered via email link. Used for two flows: email verification and password reset.

- _Avoid:_ "reset token", "email token" (both are the same mechanism)

### Turnstile Token

A challenge token that prevents bot automation of authentication endpoints.

- _Relationships:_ Validated by the **API Gateway** before the request reaches the **Auth Service**.

---

## Navigation

### Route Guard

The mechanism that intercepts navigation to protected pages for **Anonymous** visitors. Redirects to login with the original path as a redirect parameter. Also handles **ID Token** validation, silent renewal via **Refresh Token**, and email verification checks.

- _Avoid:_ "auth middleware" (implementation detail)
- _Relationships:_ Protects pages that require a **Principal**.

---

## Flagged Ambiguities

- **/user/profile is a placeholder:** The page exists to verify auth flows end-to-end. It will become the **Identity** view once the **Identity** service is built. → See [TODO.md](../TODO.md#16-website--build-userprofile-into-identity-view).
