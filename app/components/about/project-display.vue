<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard v-for="(project, index) in projects" :key="index" class="h-full flex flex-col overflow-hidden">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{{ project.title }}</h3>

          <div v-if="project.logo" class="flex items-center gap-2">
            <span v-if="project.logoLabel" class="text-xs font-medium px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded self-center">
              {{ project.logoLabel }}
            </span>
            <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white dark:bg-neutral-800 rounded-md p-1">
              <img :src="project.logo" :alt="`${project.title} logo`" class="max-w-[32px] max-h-[32px] w-auto h-auto object-contain" />
            </div>
          </div>
        </div>

        <p class="text-neutral-700 dark:text-neutral-300 mb-4 text-base flex-grow">{{ project.description }}</p>

        <div v-if="project.technologies && project.technologies.length" class="mb-4">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <div class="mt-auto pt-3">
          <UButton v-if="project.url" :to="project.url" target="_blank" icon="i-lucide-external-link" color="primary" variant="soft" class="w-full text-center">
            {{ project.urlLabel || 'View Project' }}
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Project {
    title: string
    description: string
    url?: string
    urlLabel?: string
    logo?: string
    logoLabel?: string
    technologies?: string[]
  }

  const projects: Project[] = [
    {
      title: 'FNB Connect',
      description:
        "Implemented key enhancements for FNB Connect's telecommunications offering, developing both backend services and frontend web interfaces. This provided banking customers with complimentary ADSL data allocations when selecting FNB Connect as their ISP. Additionally, there was a VoIP solution featuring a mobile application that enabled free peer-to-peer calling, complemented by a flexible minute-based billing system for external network communication (GSM, PSTN).",
      url: 'https://web.archive.org/web/20150326065043/https://www.fnbconnect.co.za/',
      urlLabel: 'FNB Connect',
      logoLabel: 'Work',
      logo: '/assets/fnb-logo.png',
      technologies: ['JBoss', 'Tomcat', 'Java', 'MySQL/MariaDB'],
    },
    {
      title: 'FNB Banking App',
      description:
        "Implemented and later architected a comprehensive suite of banking application frameworks and microservices architecture that powers FNB's digital banking platform. This enterprise-scale system serves millions of customers throughout Africa, maintaining robust performance while processing tens of thousands of concurrent sessions. The architecture incorporates high-availability principles, distributed data management, and advanced caching strategies to ensure 99.99% uptime for critical financial transactions.",
      url: 'https://www.fnb.co.za/ways-to-bank/digital/',
      urlLabel: 'FNB Digital Banking',
      logoLabel: 'Work',
      logo: '/assets/fnb-logo.png',
      technologies: ['Scalable Systems', 'Java', 'Microservices', 'MySQL/MariaDB', 'Cassandra', 'InfluxDB', 'Kubernetes'],
    },
    {
      title: 'OCEP (Omni Channel Enablement Platform)',
      description:
        'Designed and implemented an enterprise-grade application framework (OCEP) that revolutionized cross-functional software development within the organization. This architectural solution empowered individual business units to independently develop and maintain their domain-specific application flows while ensuring UI consistency and adherence to brand standards through centralized governance. By adopting a microservice approach with clear boundaries, teams could deploy their features independently, significantly reducing release dependencies and improving time-to-market for critical banking features while maintaining the cohesive user experience essential for the FNB brand.',
      logoLabel: 'Work',
      logo: '/assets/fnb-logo.png',
      technologies: ['Enterprise Architecture', 'Domain-Driven Design', 'Software Patterns', 'API Design', 'Scalable Systems', 'Java', 'Microservices'],
    },
    {
      title: 'FNB App Messaging',
      description:
        'Architected and implemented FNB App messaging platform. At first this consumed the existing real-time notification system for banking transactions and account activities (inContact), but using push notifications instead of SMS. Saving FNB millions in network fees. Subsequently enhanced the platform by enabling secure authenticated conversations between customers and banking representatives (Secure Chat). The final evolution incorporated a peer-to-peer chat and payment capability, allowing customers to conduct financial transactions directly with contacts through a secure communication channel.',
      url: 'https://www.fnb.co.za/ways-to-bank/digital/messaging.html',
      urlLabel: 'FNB Messaging',
      logoLabel: 'Work',
      logo: '/assets/fnb-logo.png',
      technologies: ['Scalable Systems', 'API Design', 'Java', 'Microservices', 'MySQL/MariaDB', 'Cassandra', 'Kubernetes'],
    },
    {
      title: 'FNB App Chat Bot',
      description:
        'Architected and implemented an AI-powered conversational banking solution using Amazon Lex, enabling automated customer service for routine banking inquiries and transactions. The architecture integrated with the existing FNB App Messaging platform through a API layer, providing contextual handoffs between automated and human support channels. By extending the OCEP architectural principles, the solution featured a modular framework that empowered business units to independently develop and deploy domain-specific conversation flows while maintaining centralized governance.',
      logoLabel: 'Work',
      logo: '/assets/fnb-logo.png',
      technologies: ['Enterprise Architecture', 'Domain-Driven Design', 'Software Patterns', 'API Design', 'Node.js', 'Microservices', 'AWS'],
    },
    {
      title: 'nav» Earth',
      description:
        "Architected nav» Earth, a sustainability offering within FNB's banking ecosystem that enables customers to quantify their carbon footprint based on transaction history. Designed a comprehensive technical architecture comprising API services and well-designed database models. The solution applies sophisticated categorization algorithms to transaction data, mapping financial activities to their corresponding environmental impact. The offering includes interactive educational components, cand a donation mechanism allowing customers to contribute directly to verified environmental organizations for carbon offsetting.",
      url: 'https://www.fnb.co.za/ways-to-bank/digital/nav/earth/',
      urlLabel: 'nav» Earth',
      logoLabel: 'Work',
      logo: '/assets/fnb-logo.png',
      technologies: ['Domain-Driven Design', 'Software Patterns', 'API Design', 'Scalable Systems', 'MySQL/MariaDB', 'Kubernetes'],
    },
    {
      title: 'nav» Payroll',
      description:
        "Architected nav» Payroll, an enterprise-grade payroll management solution for FNB's commercial banking clients. Designed a comprehensive technical architecture featuring secure API services and well-designed database models. The system enables businesses to efficiently create and manage customizable payroll schedules (monthly, bi-weekly, or weekly), process bulk payments with automated tax calculations, and generate comprehensive compliance reports. Implemented robust validation rules ensuring adherence to South African tax regulations and labor laws, while maintaining seamless integration with FNB's banking infrastructure for secure payment execution.",
      logoLabel: 'Work',
      logo: '/assets/fnb-logo.png',
      technologies: ['Domain-Driven Design', 'Software Patterns', 'API Design', 'Scalable Systems', 'MySQL/MariaDB', 'Kubernetes'],
    },
    {
      title: 'From The Hart - Teaching resources',
      description:
        'Designed and deployed a scalable e-commerce website (fromthehart.co.za) for educational resource distribution. Implemented a WordPress solution with WooCommerce integration and Payfast payment gateway for seamless transactions. Architected a high-availability AWS infrastructure leveraging EC2 with auto-scaling capabilities, RDS for database management, Application Load Balancer for traffic distribution, and CloudFront CDN for optimized content delivery. This enabled my wife, who is a teacher, to sell her teaching resources online.',
      logoLabel: 'Personal',
      logo: '/assets/person-svgrepo-com.png',
      technologies: ['PHP', 'MySQL/MariaDB', 'AWS'],
    },
    {
      title: 'From The Hart - Tech',
      description:
        "Architect, designed and developed this website as a professional portfolio and technology showcase, combining modern front-end architecture with cloud-based infrastructure. Leveraging Vue.js/Nuxt for component-driven development and AWS for scalable hosting. The implementation features responsive design principles and optimized performance. Explore the blog section for more info behind this project's development.",
      logoLabel: 'Personal',
      logo: '/assets/person-svgrepo-com.png',
      technologies: ['Scalable Systems', 'JavaScript/TypeScript', 'Vue.js/Nuxt', 'AWS'],
    },
  ]
</script>
