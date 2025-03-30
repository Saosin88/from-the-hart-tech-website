---
title: From Manual to Managed
description: Follow my journey implementing Infrastructure as Code with Terraform to manage my website's AWS resources. I explore the challenges of growing infrastructure needs, share how I created reusable modules for S3 and CloudFront deployments, and demonstrate how IaC transformed disaster recovery from hours to minutes. Learn about my approach to shared state management, test environment setup, and how automated testing with Cypress solved persistent verification headaches.
date: 2025-03-28 16:15:54
toc: true
keywords: Terraform, Infrastructure as Code, DevOps, Test Environment, E2E Testing, Automation, CI/CD, IaC, AWS, S3, CloudFront, GitHub Actions, Disaster Recovery, Modules, State Management, HashiCorp, Cloud Infrastructure, Cypress, Route53, ACM, IAM, Multi-cloud, Configuration Management
image: /assets/blog/terraform.png
robots: index, follow
author: Sheldon Hart
ogTitle: From Manual to Managed
ogDescription: Follow my journey implementing Infrastructure as Code with Terraform to manage my website's AWS resources. I explore the challenges of growing infrastructure needs, share how I created reusable modules for S3 and CloudFront deployments, and demonstrate how IaC transformed disaster recovery from hours to minutes. Learn about my approach to shared state management, test environment setup, and how automated testing with Cypress solved persistent verification headaches. 
ogImage: https://www.fromthehart.tech/assets/blog/terraform.png
ogUrl: https://www.fromthehart.tech/blog/from-manual-to-managed
twitterTitle: From Manual to Managed
twitterDescription: Follow my journey implementing Infrastructure as Code with Terraform to manage my website's AWS resources. I explore the challenges of growing infrastructure needs, share how I created reusable modules for S3 and CloudFront deployments, and demonstrate how IaC transformed disaster recovery from hours to minutes. Learn about my approach to shared state management, test environment setup, and how automated testing with Cypress solved persistent verification headaches.
twitterImage: https://www.fromthehart.tech/assets/blog/terraform.png
twitterCard: summary_large_image
twitterSite: "@SheldonHart7"
twitterCreator: "@SheldonHart7"
---
## The Growth Problem: How Infrastructure Multiplies
>Growth comes from challenge, from pushing yourself beyond what is comfortable.— Dalinar Kholin, The Way of Kings

Managing infrastructure and configuration for a small project can be straightforward, especially if you start with just three servers for the full stack. This setup works well before your project launches. However, once you go live, it's best practice not to test new code and features directly on the production environment. You'll need a dev/test environment, which will at least double your infrastructure. To ensure high availability, you might need to double or even triple your infrastructure. As you build more features, especially if you adopt a microservices architecture, the need for additional servers will grow. Depending on the technology you use, you might require more than one server just to initialize (e.g., Quorum-type technologies). Finally, if your project is successful, you'll need to scale, and possibly scale quickly.

While this example is quite traditional, it highlights how infrastructure can grow rapidly over time. The industry offers many solutions to these challenges, such as containerization, managed services, and serverless architectures. However, these still need to be provisioned and configured consistently. It's crucial for a team to be able to provision new infrastructure quickly and consistently.

In my experience, an operations team would provision VMs and use tools like Ansible, Chef, or Puppet for configuration management. However, this approach was often hit or miss. Many VMs weren't managed by these tools, and migrating them took time. Additionally, enforcement was inconsistent, leading to changes being made outside the tools and not being tracked properly. For example, a developer might ask the operations team to make a change on an HAProxy in the dev environment, which was done manually. When it came time to go to production, the infrastructure configuration and code were successfully promoted, but the manual change wasn't tracked and applied, causing downtime in the production system.

This is where Infrastructure as Code (IaC) tools like Terraform become essential. Using its own declarative HashiCorp Configuration Language (HCL), Terraform allows you to define, provision, and manage infrastructure across multiple environments. The human-readable nature of HCL makes complex infrastructure setups both accessible and maintainable. While AWS-specific solutions like CloudFormation or CDK were options, I ultimately chose Terraform for its multi-cloud capabilities. With support for numerous providers including AWS, GCP, and Azure, Terraform aligns perfectly with my future plans to expand across different cloud platforms.

At its core, Terraform has three main components: resources, variables, and outputs. Resources are the basic building blocks of your infrastructure (e.g., S3 Bucket, CloudFront Distribution, IAM Role). Variables in Terraform are like function input parameters, allowing you to pass dynamic values into your configurations. Outputs are like return values, providing useful information about your infrastructure after it's been created.

These components can be orchestrated together to create custom modules, enabling you to specify many resources in a specific configuration. Modules can also have variables and outputs.

Finally, there is the state. The state keeps track of the current state of your infrastructure and is stored as a file or can be remotely stored in block storage like S3. Remote state storage allows for locking, ensuring that only one run can be done concurrently to avoid conflicts.

::blog-image{src="terraform.png" alt="Terraform" caption=""}
::

### Infrastructure Tools at a Glance

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

<div class="border border-secondary-500 dark:border-secondary-700 rounded-lg p-4 shadow-sm">

#### Terraform
- **Primary Focus:** Infrastructure provisioning
- **Multi-cloud Support:** Strong (80+ providers)
- **Agent Required:** No
- **State Management:** Explicit state tracking
- **Approach:** Declarative
- **Open Source:** Yes

</div>

<div class="border border-secondary-500 dark:border-secondary-700 rounded-lg p-4 shadow-sm">

#### Puppet
- **Primary Focus:** Configuration management
- **Multi-cloud Support:** Limited
- **Agent Required:** Yes
- **State Management:** Desired state model
- **Approach:** Declarative
- **Open Source:** Yes

</div>

<div class="border border-secondary-500 dark:border-secondary-700 rounded-lg p-4 shadow-sm">

#### Chef
- **Primary Focus:** Configuration management
- **Multi-cloud Support:** Limited
- **Agent Required:** Yes
- **State Management:** Desired state model
- **Approach:** Procedural
- **Open Source:** Yes

</div>

<div class="border border-secondary-500 dark:border-secondary-700 rounded-lg p-4 shadow-sm">

#### Ansible
- **Primary Focus:** Configuration management
- **Multi-cloud Support:** Good
- **Agent Required:** No
- **State Management:** Stateless (with limited state options)
- **Approach:** Hybrid (mostly procedural)
- **Open Source:** Yes

</div>

</div>

### From Theory to Practice
>To create, it is necessary first to destroy.— Kwaan, Mistborn: The Final Empire

After completing the first phase of my website (which you can read about [here](/blog/this-website)), I realized the importance of implementing Infrastructure as Code (IaC) as early as possible. Delaying this implementation only makes migration more challenging as your infrastructure grows. Despite the relatively small scale of my website, the process took longer than anticipated. I began by focusing on shared resources—components my website needs that shouldn't be controlled by any specific project, such as ACM Certificates, IAM Roles and permissions, and Route53 DNS records. To manage these resources effectively, I store their state centrally in an S3 bucket, allowing for consistent tracking and version control. Changes to this shared infrastructure are applied through a CI/CD workflow that automatically executes whenever a pull request is merged to the main branch. Due to the sensitive information contained within this repository, I've opted to keep it private.

Next, I focused on my website project by importing my existing S3 bucket and CloudFront distribution configurations. While working with these resources, I recognized that my website's infrastructure pattern could be abstracted into a reusable Terraform module. This approach would allow me to create any static website on AWS by simply providing a few key variables. After developing this module, my website's infrastructure configuration became elegantly simple:

```hcl
module "website" {
  source              = "../modules/s3_and_cloudfront_static_website"
  acm_certificate_arn = data.terraform_remote_state.shared.outputs.acm_certificate_arn
  route53_zone_id     = data.terraform_remote_state.shared.outputs.zone_id
  domain_name         = "www.fromthehart.tech"
  tags = {
    Domain      = "tech"
    Project     = "from-the-hart-tech-website"
    Environment = "prod"
    Terraform   = "true"
  }
}
``` 

You can see that the module takes the ACM certificate and Route53 Zone ID from the shared resources and then creates the website with the domain name `www.fromthehart.tech`. State can be shared in this manner across any of my projects by simply creating a data object and then using the outputs from the shared resources:

```hcl
data "terraform_remote_state" "shared" {
  backend = "s3"
  config = {
    bucket  = "from-the-hart-terraform"
    key     = "state/shared.tfstate"
    region  = "af-south-1"
  }
}
```

Following the principle that each project should own its infrastructure, I've integrated this Terraform configuration directly into my website's CI/CD workflow. This integration creates a seamless deployment process: the workflow first validates the infrastructure state and applies any necessary changes before proceeding to the build and deployment phases. By structuring the process this way, infrastructure updates become a natural prerequisite to code deployment, ensuring that my website always runs on correctly provisioned resources.

![Terraform CICD](/assets/blog/terraform-ci-cd.png)

After setting up the infrastructure pipeline, I needed to thoroughly test my configuration. While I conducted most testing in isolation from production (which I'll explain shortly), I ultimately decided to perform one real-world test on my live environment. Despite recognizing this as poor practice, I rationalized that the risk was minimal given my website's limited audience at this early stage. The process began with running terraform destroy :boom: and watching my entire infrastructure disappear from the AWS console in seconds. Next, I triggered my CI/CD workflow to rebuild everything from scratch. The entire recovery process took just 7 minutes—most of which was spent waiting for CloudFront to complete its deployment. This experiment vividly demonstrated the power of Infrastructure as Code: what might have been a catastrophic disaster in a traditional environment became a simple, rapid recovery process.

Going forward, I need to maintain the discipline of applying changes exclusively through Terraform and my CI/CD pipeline.

## Tying Up Some Loose Ends

### Test/Dev Environement

As my website gained visibility and traffic began to grow, implementing a proper test/dev environment became necessary to follow industry best practices. Such an environment would allow me to safely experiment with new features before deploying them to production. Thanks to the module I had created, setting up this parallel environment took just minutes—I simply duplicated my configuration with environment-specific variables. To complete the workflow, I implemented a separate dev CI/CD pipeline that automatically applies infrastructure changes and deploys code to this new environement. This allows me to test changes before merging them into the main branch. Terraform transformed what could have been a complex infrastructure duplication process into an elegantly simple process.

```hcl
module "website" {
  source              = "../modules/s3_and_cloudfront_static_website"
  acm_certificate_arn = data.terraform_remote_state.shared.outputs.acm_certificate_arn
  route53_zone_id     = data.terraform_remote_state.shared.outputs.zone_id
  domain_name         = "dev.fromthehart.tech"
  tags = {
    Domain      = "tech"
    Project     = "from-the-hart-tech-website"
    Environment = "dev"
    Terraform   = "true"
  }
}
``` 
### End-to-End (E2E) Testing
>Trust, but verify.— Navani Kholin, Rhythm of War

Automated testing became another essential addition to my workflow. During development, I encountered a particularly troublesome bug—the inconsistent blog post list issue (detailed [here](/blog/this-website))—which consumed hours of debugging time. Even after resolving the issue, I found myself compulsively checking whether posts were disappearing with each new change. This repetitive manual testing gradually accumulated to significant lost development time. The solution was clear: automate these checks to eliminate both the tedious verification process and the lingering anxiety about regression. With proper automated tests, I could move forward with confidence, knowing any recurrence of the bug would be caught immediately.

After looking into a few testing options, I decided on Cypress.io for my E2E testing. It's open source and completely free. I built tests that automatically check all the things I was manually testing before - especially the blog post list that had given me so much trouble. I then integrated it with my CI/CD pipeline. Now, whenever I push changes, the tests run automatically before deployment. If anything fails, the pipeline stops immediately. No more manual checking after each change.

![Cypress Test Results](/assets/blog/cypress-test-results.png)

## Wrapping Up

Learning Terraform has been not just useful but genuinely enjoyable. After seeing its benefits firsthand, I'm convinced that Infrastructure as Code provides tremendous value for projects of any size—from personal websites to enterprise applications. The most important lesson I've learned, though, is to implement it early. Having now built this foundation, I'm excited to use Terraform in all my future projects.

Cheers!