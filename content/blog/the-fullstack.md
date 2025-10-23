---
title: The Fullstack
description: Building a comprehensive fullstack architecture with serverless computing, multi-cloud services, and custom API gateway. Covers AWS Lambda, GCP Cloud Run, Cloudflare Workers, authentication systems, Docker containers, and cost optimization strategies.
date: 2025-10-27 06:38:23
toc: true
keywords: Serverless, API gateway, Cloudflare Workers, Cloud Run, Lambda, Firebase, Identity Platform, edge computing
image: /assets/blog/fullstack-architecture.svg
robots: index, follow
author: Sheldon Hart
ogTitle: The Fullstack
ogDescription: Building a comprehensive fullstack architecture with serverless computing, multi-cloud services, and custom API gateway. Covers AWS Lambda, GCP Cloud Run, Cloudflare Workers, authentication systems, Docker containers, and cost optimization strategies. 
ogImage: https://www.fromthehart.tech/assets/blog/fullstack-architecture.png
ogUrl: https://www.fromthehart.tech/blog/the-fullstack
twitterTitle: The Fullstack
twitterDescription: Building a comprehensive fullstack architecture with serverless computing, multi-cloud services, and custom API gateway. Covers AWS Lambda, GCP Cloud Run, Cloudflare Workers, authentication systems, Docker containers, and cost optimization strategies.
twitterImage: https://www.fromthehart.tech/assets/blog/fullstack-architecture.png
twitterCard: summary_large_image
twitterSite: "@SheldonHart7"
twitterCreator: "@SheldonHart7"
---
## First API
>The world is a stage, and we're just actors in it. Our fates can be changed... through connections, through data. – Rintarou Okabe, Steins;Gate

In my previous two posts, I covered building a frontend (this website) and how Terraform enabled me to manage my infrastructure as code. However, this represents just one tier of a traditional 3-tier architecture. I still needed to tackle the remaining pieces: the ability to create APIs and services for the middle tier, and a persistence layer for data storage.

I wanted to start with something simple. My [projects page](/projects) would connect directly to GitHub to retrieve all my public repositories. Since this data doesn't change very often, I decided to leverage CloudFront's built-in caching capabilities rather than implementing a separate layer like Redis. The logic was straightforward: call the GitHub public endpoint, map the necessary fields to my response object, and add a cache control header for 24-hour caching. This ensures only the first request of the day hits GitHub directly, while subsequent requests are served from CloudFront's cache.

<details>
<summary>View Code Snippet</summary>

```js
export const getGitHubProjectsByUsername = async (
  request: FastifyRequest<{ Params: UsernameParam }>,
  reply: FastifyReply
) => {
  const { username } = request.params;
  const gitHubProjects = await projectService.getGitHubProjectsByUsername(
    username
  );

  reply.header("Cache-Control", "public, max-age=86400");

  if (!gitHubProjects || gitHubProjects.length === 0) {
    return reply.code(404).send({ error: "GitHub Projects not found" });
  }

  return reply.code(200).send({ data: gitHubProjects });
};
```
</details>

## Lambdaliths VS Lambda Functions
>But putting all those small "ones" together allows the "all" to exist... - Edward Elric, Fullmetal Alchemist: Brotherhood

My next challenge was deciding where to host this service. I wanted a serverless solution with pay-per-use billing, making AWS Lambda functions the obvious choice. While I've always appreciated the concept of Lambda functions, I've found service management becomes more complex in practice. I prefer organizing related services into logical domains. This API would be the foundation of my "projects" domain. However, Lambda's function-centric approach makes this significantly harder when every function operates as its own isolated service. Additionally, I wasn't comfortable with the vendor lock-in that would prevent me from hosting these services elsewhere if needed.

After some research, I discovered that Lambda could host Docker containers. This opened up an elegant solution: I could build my services using familiar API frameworks like Fastify and standard Docker. The only requirement was a special adapter to transform Lambda requests into traditional RESTful requests. Fortunately, Fastify already provides this [adapter](https://fastify.dev/docs/latest/Guides/Serverless/). A normal Docker instance would start my server.js file, while running in Lambda would start my Lambda handler instead. Everything else remained identical.

This dual-entry-point provided several advantages:
- **Development simplicity**: Local development mirrors production
- **Deployment flexibility**: Same codebase could run on Lambda, ECS, or any container platform
- **Domain cohesion**: Related functionality stays together
- **No vendor lock-in**: Easy migration between hosting platforms

<details>
<summary>View the Standard Docker file</summary>

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app

ARG NODE_ENV=production
ARG LOG_LEVEL=info

ENV NODE_ENV=$NODE_ENV
ENV LOG_LEVEL=$LOG_LEVEL
ENV PORT=8080
ENV HOST=0.0.0.0

COPY --from=builder /usr/app/dist/. ./
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/src/public ./public
EXPOSE 8080
CMD ["node", "server.js"]
```
</details>
<details>
<summary>View the Lambda Docker file</summary>

```dockerfile
FROM public.ecr.aws/lambda/nodejs:22 AS builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci
COPY . . 
RUN npm run build
    
FROM public.ecr.aws/lambda/nodejs:22
WORKDIR ${LAMBDA_TASK_ROOT}

ARG NODE_ENV=production
ARG LOG_LEVEL=info

ENV NODE_ENV=$NODE_ENV
ENV LOG_LEVEL=$LOG_LEVEL

COPY --from=builder /usr/app/dist/. ./
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/src/public ./public
CMD ["lambda.handler"]
```
</details>

## API Gateway
>A gateway doesn’t just open a door—it decides what can come through and what cannot. – Kamina, Gurren Lagann

Next, I needed an API gateway for this API and all future APIs I planned to build. AWS API Gateway offered two options: HTTP or REST. The HTTP version was cheaper with fewer features, while REST was more expensive but feature-rich. The key feature I wanted was caching, which was only available with the REST version. Rather than paying the premium for REST, I decided to use the HTTP version and front it with CloudFront. 

This approach delivered several advantages:
- **Cost savings**: Lower per-request pricing than REST API Gateway alone
- **Global edge caching**: Responses could be cached
- **Reduced latency**: Users served from the nearest edge location
- **Enhanced security**: Built-in DDoS protection and Web Application Firewall options

Although I was now managing two services instead of one, the total cost per request was still lower than using REST alone, and the extra features made it worthwhile. The initial setup required more complexity, but Terraform made ongoing maintenance straightforward.

::blog-image{src="fullstack-architecture-first.svg" alt="Inital Fullstack Architecture" caption=""}
::

## Authentication
>A person's true identity isn't something they show to others; it's something that is verified through their actions. - Shikamaru Nara, Naruto

Next, I wanted to build authentication for my website to enable user-specific content and flows. This would allow me to generate session tokens (JWTs) for passing user context to future APIs, while also enabling my API gateway to validate tokens before routing requests to downstream services. Rather than building an authentication system from scratch, I evaluated three different providers:

| Feature | GCP Identity Platform | Amazon Cognito | Auth0 |
|---------|----------------------|----------------|-------|
| **Free Tier** | 50,000 monthly active users (MAUs) | 50,000 MAUs for User Pools | 7,500 MAUs |
| **Pricing (beyond free)** | $0.0055 per MAU | $0.0055 per MAU | $23/month for up to 1,000 MAUs |
| **Social Providers** | Google, Facebook, Twitter, GitHub, Microsoft | Google, Facebook, Amazon, Apple | 30+ providers including enterprise SSO |
| **Multi-factor Authentication** | SMS, TOTP, phone calls | SMS, TOTP, hardware tokens | SMS, TOTP, push notifications, biometrics |
| **Developer Experience** | Good documentation, Firebase integration | AWS ecosystem integration | Excellent docs, extensive SDKs |
| **Geographic Coverage** | Global with Google infrastructure | Global with AWS regions | Global CDN with edge locations |

I ultimately chose GCP Identity Platform for its generous free tier and my desire to explore a different cloud provider. Rather than connecting my website directly to Identity Platform, I designed my own auth domain service layer. This architectural decision provided several key benefits:

- **Orchestration control**: I could compose multiple Identity Platform APIs into custom workflows
- **Business logic insertion**: Custom validation, logging, and user onboarding flows
- **Future flexibility**: Easy to swap providers or add additional auth methods
- **API consistency**: Unified interface regardless of underlying provider changes

I let Identity Platform handle the core authentication mechanics—user registration, credential validation, and JWT token lifecycle management—while building my own email verification and password reset flows on top.

For hosting the auth service, I discovered Cloud Run, Google's containerized serverless platform. Compared to Lambda, Cloud Run offered several advantages: it used standard Docker images, standard Docker networking and required no special adapter.

For the persistence layer, I chose Firebase to store verification and password-reset tokens. While I'm using it simply now as a document store, Firebase has many powerful features that I might leverage for more complex use cases in the future.

The email verification and password reset flow works as follows:

1. Generate a JWT that includes the email and expiry in the payload, signed with a generated signing key
2. Store the signing key, user UUID, and expiration in Firebase
3. Send email with token link
4. When the email link is clicked, the key is retrieved using the email address in the token
5. Validate token with signing key. If valid, verify user or allow password reset
6. Successful verification removes the token (single-use)

## API Gateway V2
>Looks like I’ve leveled up! - Kirito, Sword Art Online

Having APIs hosted across different cloud providers presented a new challenge. My current AWS API Gateway would start charging egress costs for requests routing to my GCP-hosted auth service. I didn't want to absorb these cross-cloud data transfer fees, so I started exploring alternatives. After research, I discovered Cloudflare Workers, a solution that would enable me to have an API gateway sitting outside any of the big cloud providers, while also being significantly cheaper.

| Service | Free Tier | Paid Pricing | Data Transfer |
|---------|-----------|--------------|---------------|
| AWS HTTP API Gateway | 1 million requests/month | $1.00/million requests | $0.09/GB outbound |
| GCP API Gateway | 2 million requests/month | $3.00/million requests | $0.12/GB outbound |
| Cloudflare Workers | 3 million requests/month (100,000 requests/day)  | $0.50/million requests | Free globally |

### Cloudflare Workers

While Cloudflare doesn't offer a traditional API Gateway, it does offer Cloudflare Workers. Workers are a serverless computing platform (like Lambda), but they run at all of Cloudflare's edge locations globally. They use the V8 JavaScript runtime, which enables extremely fast cold starts with virtually no startup delay. Workers provide a simple yet powerful framework that allows you to intercept HTTP requests, apply custom logic, call downstream services, and modify responses.

This essentially gave me the power to create my own API gateway from scratch, which is exactly what I did! Building this from the ground up was incredibly rewarding, as it forced me to think deeply about all the features traditional API gateways provide while allowing me to customize them precisely to my needs. Significantly more work than using a managed solution (and probably introducing security vulnerabilities I haven't discovered yet), but the learning experience and control made it worthwhile.

The one challenge with this approach was that I now had to expose my Cloud Run and Lambda endpoints publicly, which presented a security risk. I wanted my API Gateway to handle the security heavy lifting while letting my services focus purely on business logic. Fortunately, both platforms provide built-in solutions for this exact scenario.

Lambda function URLs support auth type "AWS_IAM", which requires signing requests with specific IAM access keys. For AWS Lambda, the IAM signature is added as an Authorization header containing the calculated SigV4 signature. Cloud Run uses Google ID tokens for authentication, requiring a signed JWT generated with a service account's private key to obtain an ID token from Google's OAuth2 service. For GCP Cloud Run, the ID token is added as a Bearer token in the Authorization header.

This authentication model ensures my API Gateway remains the only system capable of invoking these APIs, as it securely stores the necessary credentials and keys as environmental secrets on Cloudflare. Any direct access attempts result in a 403 forbidden response, effectively creating a secure perimeter around my services.

### API Gateway Features
| Feature | Description |
|---------|-------------|
| **Request Routing & Path Resolution** | Routes requests to appropriate downstream services (AWS Lambda, GCP Cloud Run) with path mapping |
| **Request Size Limiting** | Enforces maximum request payload sizes to prevent abuse, returns 413 errors for oversized requests |
| **Rate Limiting** | Implements request throttling per client/IP using Cloudflare KV for distributed tracking |
| **CORS Handling** | Manages cross-origin resource sharing policies and adds appropriate CORS headers |
| **AWS Signature Authentication** | Signs requests to AWS Lambda functions for secure service-to-service communication |
| **Google ID Token Authentication** | Handles GCP Cloud Run service authentication with proper token validation |
| **Access Token Validation** | Validates JWT tokens for protected endpoints with caching for performance |
| **Bot Protection** | Integrates Cloudflare Turnstile (CAPTCHA alternative) to validate human users vs bots |
| **Response Header Management** | Adds security headers (HSTS, CSP, etc.) and manages caching headers |
| **Error Handling & Service Availability** | Graceful degradation when downstream services are unavailable with proper HTTP status codes |
| **API Documentation Redirection** | Serves HTML index page with API documentation links for developer experience |
| **Configuration Management** | Centralized configuration for different environments and route definitions |
| **Edge Caching Integration** | Leverages Cloudflare's edge cache for response caching with cache control strategies |

::blog-image{src="fullstack-architecture.svg" alt="Fullstack Architecture" caption=""}
::

## Consolidating with Cloudflare
>When one is in control of everything, one can ensure that everything works as intended. - Light Yagami, Death Note

I also transferred my domain to Cloudflare and migrated all my DNS records from Route53, saving myself $0.50 per month for the hosted zone. It's not much, but every bit helps!

A dedicated worker handles redirecting the apex domain to the full website URL: fromthehart.tech → www.fromthehart.tech

Finally, I leveraged their email routing services. This allows me to have email addresses that look like a proper business domain without having to pay for email hosting (sheldon@fromthehart.tech). Any emails sent to these custom business domain addresses are automatically forwarded to my personal Gmail account.

## Signing off..

Now that my website has authentication and a bit of user management, I feel like I have a solid foundation to build upon. It's time to create something actually useful.

I back up family photos and videos to S3, but have no way to easily manage them. What I need is a media management tool that allows me to view and download files, store rich metadata, and implement search functionality to actually find what I'm looking for.