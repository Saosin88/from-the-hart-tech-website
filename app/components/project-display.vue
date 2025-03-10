<template>
  <div class="not-prose space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard v-for="(project, index) in projects" :key="index" class="h-full flex flex-col overflow-hidden">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ project.title }}</h3>

          <div v-if="project.logo" class="w-12 h-12 flex-shrink-0">
            <img :src="project.logo" :alt="`${project.title} logo`" class="w-full h-full object-contain" />
          </div>
        </div>

        <p class="text-gray-700 dark:text-gray-300 mb-4 text-sm flex-grow">{{ project.description }}</p>

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
    technologies?: string[]
  }

  const projects: Project[] = [
    {
      title: 'FNB Banking App',
      description:
        "Implemented and later designed a comprehensive suite of banking application frameworks and microservices architecture that powers FNB's digital banking platform. This enterprise-scale system serves millions of customers throughout Africa, maintaining robust performance while processing tens of thousands of concurrent sessions. The architecture incorporates high-availability principles, distributed data management, and advanced caching strategies to ensure 99.9% uptime for critical financial transactions.",
      url: 'https://www.fnb.co.za/ways-to-bank/digital/',
      urlLabel: 'FNB Digital Banking',
      logo: '/assets/fnb-logo.png',
      technologies: ['Scalable Systems', 'Java', 'Microservices', 'MySQL/MariaDB', 'Cassandra', 'InfluxDB', 'Kubernetes'],
    },
    {
      title: 'OCEP (Omni Channel Enablement Platform)',
      description:
        'Designed and implemented a framework enabling teams across the organization to create and maintain their own app flows, while allowing the core app team to control UI consistency and brand standards. This architecture supported a microservice approach for developing and deploying independent application flows.',
      logo: '/assets/fnb-logo.png',
      technologies: ['Enterprise Architecture', 'Domain-Driven Design', 'Software Patterns', 'API Design', 'Scalable Systems', 'Java', 'Microservices'],
    },
    {
      title: 'FNB App Messaging',
      description:
        'Designed and implemented FNB App messaging platform a real-time notification system for banking transactions and account activities (inContact). Subsequently enhanced the platform by enabling secure authenticated conversations between customers and banking representatives (Secure Chat). The final evolution incorporated a peer-to-peer chat and payment capability, allowing customers to conduct financial transactions directly with contacts through a secure communication channel.',
      url: 'https://www.fnb.co.za/ways-to-bank/digital/messaging.html',
      urlLabel: 'FNB Digital Banking',
      logo: '/assets/fnb-logo.png',
      technologies: ['Scalable Systems', 'API Design', 'Java', 'Microservices', 'MySQL/MariaDB', 'Cassandra', 'Kubernetes'],
    },
    {
      title: 'FNB App Chat Bot',
      description:
        'Designed and implemented an AI-powered conversational banking solution using Amazon Lex, enabling automated customer service for routine banking inquiries and transactions. The architecture integrated with the existing FNB App Messaging platform through a robust API layer, providing contextual handoffs between automated and human support channels. By extending the OCEP architectural principles, the solution featured a modular framework that empowered business units to independently develop and deploy domain-specific conversation flows while maintaining centralized governance.',
      logo: '/assets/fnb-logo.png',
      technologies: ['Enterprise Architecture', 'Domain-Driven Design', 'Software Patterns', 'API Design', 'Node.js', 'Microservices', 'AWS'],
    },
  ]
</script>
