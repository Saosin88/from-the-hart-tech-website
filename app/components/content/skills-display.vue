<template>
  <div class="not-prose my-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Programming Languages -->
      <UCard class="transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-800/40">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg flex items-center justify-center">
            <UIcon name="i-lucide-code-2" class="text-primary-600 dark:text-primary-400 text-xl" />
          </div>
          <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100">Programming Languages</h3>
        </div>

        <div class="flex flex-wrap gap-2">
          <div class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <UIcon name="i-logos-java" class="text-base" />
            <span>Java</span>
          </div>
          <div class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <UIcon name="i-logos-javascript" class="text-base" />
            <span>JavaScript</span>
          </div>
        </div>
      </UCard>

      <!-- Frameworks -->
      <UCard class="transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-800/40">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg flex items-center justify-center">
            <UIcon name="i-lucide-package" class="text-primary-600 dark:text-primary-400 text-xl" />
          </div>
          <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100">Frameworks</h3>
        </div>

        <div class="flex flex-wrap gap-2">
          <div class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <UIcon name="i-logos-vue" class="text-base" />
            <span>Vue.js/Nuxt</span>
          </div>
          <div class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <UIcon name="i-logos-nodejs" class="text-base" />
            <span>Node.js</span>
          </div>
          <div class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <UIcon name="i-logos-spring" class="text-base" />
            <span>Spring</span>
          </div>
        </div>
      </UCard>

      <!-- Tools -->
      <UCard class="transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-800/40">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg flex items-center justify-center">
            <UIcon name="i-lucide-wrench" class="text-primary-600 dark:text-primary-400 text-xl" />
          </div>
          <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100">Tools</h3>
        </div>

        <div class="flex flex-wrap gap-2">
          <div class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <UIcon name="i-logos-docker-icon" class="text-base" />
            <span>Docker</span>
          </div>
          <div class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <UIcon name="i-logos-kubernetes" class="text-base" />
            <span>Kubernetes</span>
          </div>
          <div class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <UIcon name="i-logos-aws" class="text-base" />
            <span>AWS</span>
          </div>
          <div class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <UIcon name="i-logos-git-icon" class="text-base" />
            <span>Git</span>
          </div>
        </div>
      </UCard>

      <!-- Databases -->
      <UCard class="transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-800/40">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg flex items-center justify-center">
            <UIcon name="i-lucide-database" class="text-primary-600 dark:text-primary-400 text-xl" />
          </div>
          <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100">Databases</h3>
        </div>

        <div class="flex flex-wrap gap-2">
          <div class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <UIcon name="i-logos-mysql" class="text-base" />
            <span>MySQL</span>
          </div>
          <div class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <UIcon name="i-lucide-disc" class="text-base" />
            <span>Cassandra</span>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
