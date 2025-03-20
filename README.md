# From The Hart Tech Website

A personal technology website and blog built with Nuxt 3, showcasing projects, professional experience, and technical blog posts. This site is designed to be hosted on AWS using a serverless architecture with S3 and CloudFront.

![Website Screenshot](/public/logo/from-the-hart-social.png)

## 📋 Features

- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Blog System**: Markdown-based blogging with code highlighting and TOC
- **SEO Optimized**: Meta tags and sitemap generation
- **Serverless Deployment**: AWS S3 + CloudFront infrastructure

## 🛠️ Technology Stack

- **Frontend**: Vue.js/Nuxt 3, TypeScript
- **Styling**: Tailwind CSS, Nuxt UI components
- **Content**: Nuxt Content for markdown processing
- **Images**: Nuxt Image for optimization
- **Infrastructure**: AWS (S3, CloudFront, Route 53, ACM)
- **IaC**: Terraform for AWS resource provisioning
- **CI/CD**: GitHub Actions for automated deployment
- **Testing**: Cypress for E2E tests

## 🧰 Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)
- AWS CLI (for deployment)
- Terraform (v1.11.x) (for infrastructure)

## 📥 Installation

1. Clone the repository:

```bash
git clone https://github.com/Saosin88/from-the-hart-tech-website.git
cd from-the-hart-tech-website
```

2. Install dependencies:

```bash
npm install
```

## 💻 Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

The site features hot module reloading for streamlined development.

## 🏗️ Building for Production

### Static Site Generation

Generate a static version of the website:

```bash
npm run generate
```

This creates a `.output/public` directory with all static assets.

### Preview Static Site Locally

Serve the generated static site locally:

```bash
npm run serve
```

The site will be available at `http://localhost:3000`.

### Traditional Build

For a traditional SSR build:

```bash
npm run build
npm run preview
```

## 🚀 Deployment

The project uses GitHub Actions for CI/CD. When code is pushed to the main branch, it:

1. Runs Terraform to provision/update infrastructure
2. Builds and tests the application
3. Deploys to AWS S3
4. Invalidates CloudFront cache

### Manual Deployment

To manually deploy:

1. Build the static site:
   ```bash
   npm run generate
   ```

2. Deploy to AWS S3:
   ```bash
   aws s3 sync .output/public/ s3://your-bucket-name/ --delete
   ```

3. Invalidate CloudFront cache:
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
   ```

## 🧪 Testing

Run end-to-end tests with Cypress:

```bash
npm run cypress
```

## 🌐 Infrastructure

The project uses Terraform to manage AWS infrastructure across dev and prod environments:

- S3 buckets for static hosting
- CloudFront for CDN and edge caching
- Route 53 for DNS
- ACM for SSL certificates
- IAM roles and policies

To deploy infrastructure:

```bash
cd terraform/dev  # or terraform/prod
terraform init
terraform apply
```

## 📄 License

[MIT License](LICENSE)

## 📬 Contact

Sheldon Hart - [LinkedIn](https://www.linkedin.com/in/sheldon-hart/)

Project Link: [https://github.com/Saosin88/from-the-hart-tech-website.git](https://github.com/Saosin88/from-the-hart-tech-website.git)
