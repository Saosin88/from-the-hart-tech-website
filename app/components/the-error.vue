<template>
  <!-- Error Page Container - Centered Layout with Minimum Height -->
  <section class="flex flex-col items-center justify-center min-h-[50vh] px-6 py-12 text-center">
    <!-- Error Icon - Alert Triangle with Accent Color -->
    <div class="mb-8 text-red-500 dark:text-red-400">
      <UIcon name="lucide:alert-triangle" class="w-24 h-24 mx-auto" />
    </div>

    <!-- Error Status Code Heading -->
    <h1 class="text-5xl font-bold mb-4">
      Error <span class="text-primary-600">{{ statusCode }}</span>
    </h1>

    <!-- Error Message or Default Text -->
    <h2 class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
      {{ statusMessage || 'Something went wrong' }}
    </h2>

    <!-- Action Buttons Container - Stacked on Mobile, Side by Side on Desktop -->
    <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <!-- Home Button - Primary Action -->
      <UButton @click="handleErrorAndGoHome" class="flex items-center justify-center px-6 py-2">
        <UIcon name="lucide:home" class="mr-2 h-5 w-5" />
        Return Home
      </UButton>

      <!-- Back Button - Secondary Action -->
      <UButton @click="handleErrorAndGoBack" color="neutral" class="flex items-center justify-center px-6 py-2">
        <UIcon name="lucide:arrow-left" class="mr-2 h-5 w-5" />
        Go Back
      </UButton>
    </div>
  </section>
</template>

<script setup lang="ts">
  // Component Props Definition with Default Values
  // - statusCode: HTTP error code (defaults to 404)
  // - statusMessage: Human-readable error message
  withDefaults(
    defineProps<{
      statusCode?: number
      statusMessage?: string
    }>(),
    {
      statusCode: 404,
      statusMessage: 'Page Not Found',
    },
  )

  // Router Access for Navigation
  const router = useRouter()

  // Error Handling Functions

  // Navigate to Home Page and Clear Error State
  // This completely resets the error and redirects to home
  const handleErrorAndGoHome = () => {
    clearError({ redirect: '/' })
  }

  // Go Back to Previous Page and Clear Error State
  // This uses browser history to return to the previous page
  const handleErrorAndGoBack = () => {
    clearError()
    router.go(-1)
  }
</script>
