---
title: The Fullstack
description: 
date: 2025-10-27 06:38:23
toc: true
keywords: 
image: /assets/blog/fullstack-architecture.svg
robots: index, follow
author: Sheldon Hart
ogTitle: The Fullstack
ogDescription:  
ogImage: https://www.fromthehart.tech/assets/blog/fullstack-architecture.png
ogUrl: https://www.fromthehart.tech/blog/the-fullstack
twitterTitle: The Fullstack
twitterDescription: 
twitterImage: https://www.fromthehart.tech/assets/blog/fullstack-architecture.png
twitterCard: summary_large_image
twitterSite: "@SheldonHart7"
twitterCreator: "@SheldonHart7"
---
## First API
>The world is a stage, and we're just actors in it. Our fates can be changed... through connections, through data. – Rintarou Okabe, Steins;Gate

In my previous two posts, I covered building a frontend (this website) and how Terraform enabled me to manage my infrastructure as code. However, this represents just one tier of a traditional 3-tier architecture. I still needed to tackle the remaining pieces: the ability to create APIs and services for the middle tier, and a persistence layer for data storage.

I wanted to start with something simple. My [projects page](/projects) would connect directly to GitHub to retrieve all my public repositories. Since this data doesn't change very often, I decided to leverage CloudFront's built-in caching capabilities rather than implementing a separate layer like Redis. The logic was straightforward: call the GitHub public endpoint, map the necessary fields to my response object, and add a cache control header for 24-hour caching. This ensures only the first request of the day hits GitHub directly, while subsequent requests are served from CloudFront's cache.

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

## Lambdaliths VS Lambda Functions
>But putting all those small "ones" together allows the "all" to exist... - Edward Elric, Fullmetal Alchemist: Brotherhood

My next challenge was deciding where to host this service. I wanted a serverless solution with pay-per-use billing, making AWS Lambda functions the obvious choice. While I've always appreciated the concept of Lambda functions, I've found service management becomes more complex in practice. I prefer organizing related services into logical domains. This API would be the foundation of my "projects" domain. However, Lambda's function-centric approach makes this significantly harder when every function operates as its own isolated service. Additionally, I wasn't comfortable with the vendor lock-in that would prevent me from hosting these services elsewhere if needed.

After some research, I discovered that Lambda could host Docker containers. This opened up an elegant solution: I could build my services using familiar API frameworks like Fastify and standard Docker, then develop locally with just Docker and easily port these domain APIs to any Docker-enabled hosting service. The only requirement was a special adapter to transform Lambda requests into traditional RESTful requests. Fortunately, Fastify already provides this [adapter](https://fastify.dev/docs/latest/Guides/Serverless/) out of the box. The beauty of this approach is its simplicity—running a normal Docker instance would start my server.js file, while running in Lambda would start my Lambda handler instead. Everything else remained identical.


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
>A person’s true identity isn’t something they show to others; it’s something that is verified through their actions. - Shikamaru Nara, Naruto

Next, I wanted to build some sign-up and login pages for my website, that would enable user-specific content and flows. This would allow me to generate session tokens (JWTs) for passing user context to future APIs, while also enabling my API gateway to validate tokens before routing requests to downstream services. Rather than building an authentication system from scratch, I evaluated three different providers: GCP Identity Platform, Amazon Cognito, and Auth0.

| Feature | GCP Identity Platform | Amazon Cognito | Auth0 |
|---------|----------------------|----------------|-------|
| **Free Tier** | 50,000 monthly active users (MAUs) | 50,000 MAUs for User Pools | 7,500 MAUs |
| **Pricing (beyond free)** | $0.0055 per MAU | $0.0055 per MAU | $23/month for up to 1,000 MAUs |
| **Social Providers** | Google, Facebook, Twitter, GitHub, Microsoft | Google, Facebook, Amazon, Apple | 30+ providers including enterprise SSO |
| **Multi-factor Authentication** | SMS, TOTP, phone calls | SMS, TOTP, hardware tokens | SMS, TOTP, push notifications, biometrics |
| **Developer Experience** | Good documentation, Firebase integration | AWS ecosystem integration | Excellent docs, extensive SDKs |
| **Geographic Coverage** | Global with Google infrastructure | Global with AWS regions | Global CDN with edge locations |

I ultimately went with GCP Identity Platform, as it had a higher free tier than Auth0 and I wanted to try and build some stuff on a different cloud provider.

I didn't want to connect directly from my API gateway to Identity Platform, I wanted my own auth domain services layer, where I could orcherstrate the Identity Platform APIs, and also implement my own business logic. I let Identity Platform do alot of the heavy lifting like registering a new user, authenticating the user with email and password, as well as generating and validating the user tokens(JWT).

I did however build my own verify email flows and services, along with forgot password flows and services. This is what made the need for the third tier in the the three tier architecure, The persistance layer. I needed a place to store custom JWT tokens, that could help me verify that the email that requested verification or the forgot password came from the same email. This way someone would need access to the the other peoples email to gain access.

3. Cloudflare
4. Cloud run
5. Auth domain, identity platform, firestore

::blog-image{src="fullstack-architecture.svg" alt="Fullstack Architecture" caption=""}
::

