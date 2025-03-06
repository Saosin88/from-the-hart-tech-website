<template>
  <NuxtLayout>
    <template>
      <section class="flex flex-col items-center justify-center min-h-[50vh] px-6 py-12 text-center">
        <div class="mb-8 text-red-500 dark:text-red-400">
          <UIcon name="lucide:alert-triangle" class="w-24 h-24 mx-auto" />
        </div>

        <h1 class="text-5xl font-bold mb-4">
          Error <span class="text-primary-600">{{ error.statusCode }}</span>
        </h1>

        <h2 class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
          {{ error.statusMessage || 'Something went wrong' }}
        </h2>

        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <UButton @click="handleErrorAndGoHome" class="flex items-center justify-center px-6 py-2">
            <UIcon name="lucide:home" class="mr-2 h-5 w-5" />
            Return Home
          </UButton>

          <UButton @click="handleErrorAndGoBack" color="neutral" class="flex items-center justify-center px-6 py-2">
            <UIcon name="lucide:arrow-left" class="mr-2 h-5 w-5" />
            Go Back
          </UButton>
        </div>
      </section>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
  import type { NuxtError } from 'nuxt/app'

  defineProps<{
    error: NuxtError
  }>()

  const router = useRouter()

  const handleErrorAndGoHome = () => {
    clearError({ redirect: '/' })
  }

  const handleErrorAndGoBack = () => {
    clearError()
    router.go(-1)
  }
</script>
