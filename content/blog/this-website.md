---
title: Lets Talk About This Website
description: Explore my journey building a personal website with Vue, Nuxt, and TypeScript to sharpen my technical skills. I share my serverless AWS architecture using S3 and CloudFront, how GitHub Copilot helped with frontend design challenges, and solutions to technical roadblocks I encountered.
date: 2025-03-12 21:05:36
toc: true
keywords: Website, Vue, Nuxt, Typescript, S3, CloudFront, AWS, IAM, Route 53, ACM, Cloudfront Functions, GitHub Actions, Technology, Blog, Architecture, Tailwind CSS, Cloud, Serverless
image: /assets/blog/from-the-hart-tech-website-architecture.svg
robots: index, follow
author: Sheldon Hart
ogTitle: Lets Talk About This Website
ogDescription: Explore my journey building a personal website with Vue, Nuxt, and TypeScript to sharpen my technical skills. I share my serverless AWS architecture using S3 and CloudFront, how GitHub Copilot helped with frontend design challenges, and solutions to technical roadblocks I encountered.
ogImage: https://www.fromthehart.tech/assets/blog/from-the-hart-tech-website-architecture.png
ogUrl: https://www.fromtheharttech.com/blog/this-website
twitterTitle: Lets Talk About This Website
twitterDescription: Explore my journey building a personal website with Vue, Nuxt, and TypeScript to sharpen my technical skills. I share my serverless AWS architecture using S3 and CloudFront, how GitHub Copilot helped with frontend design challenges, and solutions to technical roadblocks I encountered.
twitterImage: https://www.fromthehart.tech/assets/blog/from-the-hart-tech-website-architecture.png
twitterCard: summary_large_image
twitterSite: "@SheldonHart7"
twitterCreator: "@SheldonHart7"
---
## The why
>All we have to decide is what to do with the time that is given us. — Gandalf, The Fellowship of the Ring

For the last 14 years of my career, I have learned a lot. I was given many opportunities to learn new tech that was very fulfilling, rewarding and fun. Unfortunately, my technical abilities have stalled somewhat over the past four years. While my role as a Solution Architect is challenging, it doesn't always push my technical skills. I needed to find a way to stay current with the latest technical offerings and keep my abilities sharp. These new skills would also benefit my professional work, as I could bring fresh perspectives to the table and incorporate them into future work-related projects.

I decided the best approach was to create personal projects where I could explore as many new technologies as possible (not necessarily new to the industry, but new to me). This website became my first step in this endeavor. Throughout my career, I've primarily focused on backend development with limited frontend experience. Creating a website made perfect sense as my initial project since it required frontend skills and most projects benefit from having a well-designed user interface (UI).


## Architecture

::blog-image{src="from-the-hart-tech-website-architecture.svg" alt="From The Hart Website Architecture" caption="From The Hart Website Architecture"}
::

As this is a personal project, I did not want to spend a lot of money, if any, on hosting. Secondary considerations were high availability and performance. Going the serverless route made the most sense to me, as serverless offerings are typically billed by usage rather than provisioned time, and they often have a free tier up to a certain point. They also generally provide high availability and scale automatically.

I chose a web framework that can be hosted statically (SPA). This allowed me to utilize an object store for the website files. AWS S3 was the obvious choice here - the costs are very low, it's highly available, and very performant. Another key aspect of the architecture is the use of a CDN. This caches the website files closer to the user, reducing latency and improving performance. AWS CloudFront was the natural choice given my use of S3.

While optimizing for cost and performance, security remained a critical consideration. The S3 bucket I used is private and only accessible via CloudFront through Origin Access Control (OAC). This ensures CloudFront signs all requests and S3 can validate the signature. Additionally, S3 bucket policies further restrict access to only allow CloudFront connections. Finally, I used AWS Certificate Manager (ACM) to ensure my website is served securely over HTTPS.

For a smooth development workflow, I implemented an automated deployment pipeline using GitHub Actions. I chose this solution primarily because my code is hosted on GitHub, but also because it offers a mature and well-supported build pipeline. When changes are pushed to the main branch, a GitHub Actions workflow is triggered that generates the static website files and uploads them to S3. It also invalidates the CloudFront cache to ensure users receive the updated content. To handle AWS authentication securely, I created an IAM Role with minimal required permissions, which GitHub Actions assumes via OIDC with short-lived STS tokens.


## We're going on an adventure

### Vue and Nuxt

As stated above, I want to learn something new with each project I undertake. This website was no exception. I wanted a framework that supports Single Page Applications (SPAs) - websites that load once and then update dynamically without full page reloads - primarily so that I could statically host the site. I narrowed my choices down to three frameworks: Angular, React, and Vue. I chose Vue because it strikes an excellent balance between Angular and React. It offers an intuitive developer experience (DX), features a gentler learning curve, and is backed by a mature, supportive community. I completed a comprehensive course on Udemy to learn the fundamentals of the framework.

For the programming language, I decided to use TypeScript over JavaScript, as I valued the type safety it provides. TypeScript felt more familiar to me since it's a statically typed language similar to Java, which has been my primary language throughout my career. The compiler catches potential errors during development rather than at runtime, which significantly improves code quality and maintenance.

For styling, I chose Tailwind CSS, which follows the utility-first approach to web design. Instead of writing custom CSS classes, Tailwind provides small, single-purpose utility classes like `flex`, `pt-4`, and `text-center` that can be composed directly in your HTML. I found this approach incredibly efficient for rapid development and consistent styling. It also excels at creating responsive designs that adapt seamlessly to different screen sizes - from desktop monitors to mobile phones - with simple responsive modifiers like `md:` and `lg:`.

While learning Vue, I discovered Nuxt, a higher-level framework built on top of Vue (sometimes called a "meta-framework"). Nuxt significantly improved my development experience by eliminating much of the boilerplate configuration that comes with setting up a Vue project. Its opinionated architecture provides a clear directory structure that organizes code logically - for instance, placing all page components in a `/pages` directory automatically generates routes without manual configuration. I particularly appreciated the Nuxt Content module, which allowed me to write these blog posts in Markdown files and seamlessly integrate them into the site without building a custom CMS solution.

### A little bit of a helping hand
>I can't carry it for you, but I can carry you. — Samwise Gamgee, The Return of the King

As I've already stated, most of my experience is in backend development. Even though I have created server-side front-end frameworks for the FNB App, I never really had to deal too much with styling and layouts. This was handled by our front-end teams (Android, iOS, and mobi). Despite adopting Tailwind CSS, I still struggled with creating visually appealing layouts. Hours of effort resulted in designs that never quite matched my vision.

VS Code, my IDE, has a built-in GitHub Copilot AI, so I decided to give it a try. I gave it my landing page and explained the layout, styling, and theme I wanted, then waited while it processed. I wasn't expecting much to be honest, but the results were genuinely impressive. It generated a clean, responsive layout that captured exactly what I was trying to achieve. With just minor tweaks here and there, it saved me hours of frustrating work. I subsequently used it for other pages on the site, which significantly boosted my productivity and allowed me to focus on implementing the functionality rather than wrestling with CSS.

P.S. It is still my goal to learn how to do this myself, but for now, it truly made the work so much easier.

### Some Struggles
>It's like in the great stories, Mr. Frodo. The ones that really mattered. Full of darkness and danger they were. And sometimes you didn't want to know the end... because how could the end be happy? How could the world go back to the way it was when so much bad had happened? But in the end, it's only a passing thing, this shadow. Even darkness must pass. — Samwise Gamgee, The Two Towers

#### Challenge 1: Nuxt Content's Mysterious Behavior

Nuxt Content has a query language very similar to MongoDB that retrieves blog post data and metadata.

For statically generated sites, Nuxt Content creates a data dump and uses a local SQLite database within the browser for queries. Initially, this worked flawlessly, but I soon noticed inconsistent behavior - my website would sometimes load blog posts and other times show none at all.

After many hours of debugging and even consulting AI tools without success, I took a systematic approach. I reverted to an older working commit and reapplied changes one by one until I identified the culprit: two placeholder navigation buttons I had modified to use "#" as their destination. This seemingly innocent change interfered with Nuxt Content's query system, which apparently has issues with hash fragments in the URL.

![AI Response](/assets/blog/ai-response.png)

#### Challenge 2: CloudFront and S3 Path Handling

The second challenge involved how CloudFront and S3 handle URL paths. This issue stems from a fundamental difference in how web servers and object stores work:

| **Web Server (S3 Static Website)** | **Object Store (S3 API)** |
|----------------------------------|--------------------------|
| Understands directory structure | Treats paths as object keys |
| Automatically looks for index.html | No concept of default files |
| Handles clean URLs natively | Requires exact path matching |

I wanted to keep my S3 bucket private and only allow access via CloudFront through Origin Access Control (OAC), which meant CloudFront would access S3 through its API, not as a traditional web server. This created a problem with URLs:

Example: `https://www.fromthehart.tech/blog`
- A web server would recognize this as a directory and serve `/blog/index.html`
- S3's API sees this as just an object key "blog" that doesn't exist

To solve this, I implemented a CloudFront Function that runs on every request. It rewrites URLs before they reach S3, adding `/index.html` to directory paths and paths without file extensions:

```js
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    // Check whether the URI is missing a file name.
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    } 
    // Check whether the URI is missing a file extension.
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }
  
    return request;
}
```


## The Journey Continues

This completes what I consider phase 1 of my plan. I thoroughly enjoyed learning Vue and Nuxt, as well as deploying it all in a serverless fashion on AWS. I have several other projects I still want to tackle that will allow me to explore new technologies. Most likely, my next projects will involve some Infrastructure as Code (IaC). I'm unsure if I will use Terraform, CDK, or CloudFormation at this point. Whatever I decide, I will post about the journey here. Thank you for reading, and I hope you enjoyed the post.