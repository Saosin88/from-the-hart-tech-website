# From The Hart Tech Website

A personal technology website and blog built with Nuxt 3, showcasing projects, professional experience, and technical blog posts. This site is designed to be hosted on AWS using a serverless architecture with S3 and CloudFront.

![Status](https://img.shields.io/badge/Status-Live-success)
![Platform](https://img.shields.io/badge/Platform-AWS-orange)
![Framework](https://img.shields.io/badge/Framework-Nuxt_3-green)
![Deployment](https://img.shields.io/badge/Deployment-Serverless-blue)

![Website Screenshot](/public/logo/from-the-hart-social.png)

## 🔍 Overview

The From The Hart Tech Website serves as the primary web presence for From The Hart, featuring:

- Professional portfolio and resume information
- Technical blog with architecture diagrams and code examples
- Project showcases and case studies
- Contact information and professional links

This website is part of the broader From The Hart multi-cloud architecture, integrating with other services across AWS, GCP, and Cloudflare.

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
- **Infrastructure**: AWS (S3, CloudFront, Cloudflare, ACM)
- **IaC**: Terraform for AWS and Cloudflare resource provisioning
- **CI/CD**: GitHub Actions for automated deployment
- **Testing**: Cypress for E2E tests

## 🧰 Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- AWS CLI (for deployment)
- Terraform (v1.7.x) (for infrastructure)

## 🚀 Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Saosin88/from-the-hart-tech-website.git
cd from-the-hart-tech-website
```

2. Install dependencies:

```bash
npm install
```

### Development

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

## 📦 Deployment

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
   aws cloudfront create-invalidation --distribution-id <YOUR_DISTRIBUTION_ID> --paths "/*"
   ```

## 🧪 Testing

Run end-to-end tests with Cypress:

```bash
npm run cypress
```

## 🌐 Infrastructure

This website is deployed on AWS using a serverless architecture and is configured through the `from-the-hart-infrastructure` repository using Terraform.

### Cloud Provider Details

- **Primary Platform**: AWS
- **Storage**: S3 buckets for static hosting
- **CDN**: CloudFront for edge caching and global delivery
- **DNS**: Cloudflare for domain management
- **SSL/TLS**: ACM for SSL certificates
- **Access Control**: IAM roles and policies
- **Infrastructure as Code**: Terraform (remote state in AWS S3)

For infrastructure deployments, refer to the `terraform/` directory which contains separate configurations for `dev` and `prod` environments:

```bash
cd terraform/dev  # or terraform/prod
terraform init
terraform apply
```

## 📁 Project Structure

The project follows the standard Nuxt 3 directory structure with some customizations:

```
from-the-hart-tech-website/
├── app/                    # Nuxt app directory
│   ├── components/         # Vue components
│   ├── composables/        # Reusable Vue composition functions
│   ├── layouts/            # Page layouts
│   └── pages/              # Application pages
├── content/                # Markdown blog content
│   └── blog/               # Blog post files
├── cypress/                # End-to-end tests
│   └── e2e/                # Test specifications
├── public/                 # Static assets
│   ├── assets/             # Images and other assets
│   └── logo/               # Logo files
├── resources/              # Source files for assets
│   └── drawio/             # Architecture diagram source files
├── terraform/              # Infrastructure as Code configurations
│   ├── dev/                # Development environment resources
│   └── prod/               # Production environment resources
├── content.config.ts       # Nuxt Content configuration
├── nuxt.config.ts          # Nuxt configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## 📚 Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build
- `npm run serve` - Serve the generated static site
- `npm run cypress` - Run end-to-end tests
