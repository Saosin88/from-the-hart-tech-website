<template>
  <section class="py-12 px-4 min-h-[60vh] flex flex-col items-center justify-center">
    <div class="max-w-md w-full">
      <div v-if="isLoading" class="text-center">
        <UIcon name="lucide:loader" class="mx-auto h-16 w-16 text-primary-600 animate-spin" />
        <h2 class="mt-6 text-2xl font-bold text-neutral-900 dark:text-neutral-100">Verifying your email...</h2>
        <p class="mt-3 text-neutral-600 dark:text-neutral-400">Please wait while we verify your email address.</p>
      </div>

      <UCard v-else-if="isVerified" class="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
        <div class="text-center p-4">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <UIcon name="lucide:check" class="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h2 class="mt-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">Email Verified!</h2>
          <p class="mt-2 text-neutral-600 dark:text-neutral-400">Thank you for verifying your email address.</p>
          <div class="mt-6">
            <UButton to="/" color="primary" class="w-full justify-center"> Continue to Home </UButton>
          </div>
        </div>
      </UCard>

      <UCard v-else class="border-error-200 dark:border-error-800 bg-error-50 dark:bg-error-900/20">
        <div class="text-center p-4">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-error-100 dark:bg-error-900/30">
            <UIcon name="lucide:alert-triangle" class="h-6 w-6 text-error-600 dark:text-error-400" />
          </div>
          <h2 class="mt-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">Verification Failed</h2>
          <p class="mt-2 text-neutral-600 dark:text-neutral-400">{{ errorMessage }}</p>
          <div class="mt-6 flex flex-col space-y-3">
            <UButton to="/auth/resend-verification" color="primary" class="w-full justify-center"> Resend Verification Email </UButton>
            <UButton to="/" variant="ghost" class="w-full justify-center"> Return to Home </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
  const route = useRoute()
  const token = ref((route.query.token as string) || '')

  const isLoading = ref(true)
  const isVerified = ref(false)
  const errorMessage = ref('The verification link is invalid or has expired. Please request a new verification link.')

  onMounted(async () => {
    if (!token.value) {
      isLoading.value = false
      return
    }

    try {
      const { success, error } = await useAuthAPI().verifyEmail(token.value)

      if (success) {
        isVerified.value = true
      } else {
        errorMessage.value = error
      }
    } finally {
      isLoading.value = false
    }
  })

  useSeoMeta({
    title: 'Email Verification - From The Hart Tech',
    description: 'Verify your email address to complete your account setup.',
    robots: 'noindex, nofollow',
    author: 'Sheldon Hart',
  })
</script>
