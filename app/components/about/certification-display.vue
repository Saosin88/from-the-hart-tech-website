<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard v-for="(cert, index) in certifications" :key="index" class="transition-all duration-200 hover:shadow-md dark:hover:shadow-neutral-800/40 h-full">
        <div class="flex flex-col h-full">
          <div class="flex justify-center mb-4">
            <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2 flex items-center justify-center w-24 h-24 overflow-hidden">
              <NuxtImg v-if="cert.image" :src="cert.image" :alt="`${cert.name} badge`" class="max-w-full max-h-full object-contain" />
              <div v-else class="text-2xl text-primary-600 dark:text-primary-400">
                <span class="lucide:award"></span>
              </div>
            </div>
          </div>

          <div class="h-16 flex items-center justify-center">
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 text-center line-clamp-2">
              {{ cert.name }}
            </h3>
          </div>

          <div class="flex-grow"></div>

          <div class="h-6 text-xs text-neutral-500 dark:text-neutral-400 mb-3 text-center overflow-hidden"><span class="font-medium">Institution:</span> {{ cert.institution }}</div>

          <UButton
            v-if="cert.credentialUrl"
            :to="cert.credentialUrl"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            variant="soft"
            size="sm"
            class="w-full flex justify-center items-center"
          >
            <UIcon name="lucide:external-link" class="mr-1" />
            View Credential
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  const certifications = [
    {
      name: 'AWS Certified Solutions Architect – Associate',
      institution: 'Amazon Web Services (AWS)',
      credentialUrl: 'https://www.credly.com/badges/af7dd9e8-000e-442a-ae44-7728edaae9f3/public_url',
      image: '/assets/about/aws-architect-associate.png',
    },
    {
      name: 'TOGAF® Certification Program',
      institution: 'The Open Group',
      credentialUrl: 'https://www.credly.com/badges/4cac01a9-6796-42a1-b28d-d01a9aa0416b/public_url',
      image: '/assets/about/togaf.png',
    },
    {
      name: 'Digital Transformation: Platform Strategies for Success',
      institution: 'Emeritus',
      credentialUrl: 'https://certificates.emeritus.org/d775348b-544f-466c-9986-1fbb71a4fb91',
      image: '/assets/about/emeritus.png',
    },
  ]
</script>
