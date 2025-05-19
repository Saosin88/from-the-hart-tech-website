<template>
  <section class="py-12 px-4 min-h-[60vh] flex flex-col items-center justify-center">
    <div class="max-w-md w-full">
      <UCard class="border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20">
        <div class="text-center p-4">
          <!-- Move alerts above all text and actions, matching other auth pages -->
          <UAlert
            v-if="showSuccess"
            title="Verification Email Sent!"
            description="If your email is registered, you'll receive a new verification link shortly."
            color="primary"
            variant="soft"
            icon="lucide:check-circle"
            class="mb-4"
          />
          <UAlert v-if="resendError" :title="resendError.title" :description="resendError.message" color="error" variant="soft" icon="lucide:alert-circle" class="mb-4" />
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
            <UIcon name="lucide:mail" class="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 class="mt-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">Email Verification Required</h2>
          <p class="mt-2 text-neutral-600 dark:text-neutral-400">Please verify your email address to continue. We sent a verification link to your registered email when you registered.</p>
          <div class="mt-6 flex flex-col space-y-3">
            <UButton @click="handleResend" color="primary" class="w-full justify-center" :loading="isLoading" :disabled="isLoading">
              {{ isLoading ? 'Sending...' : 'Resend Verification Email' }}
            </UButton>
            <UButton to="/" variant="ghost" class="w-full justify-center"> Return to Home </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const isLoading = ref(false)
  const showSuccess = ref(false)
  const resendError = ref<{ title: string; message: string } | null>(null)

  const { resendVerificationEmail } = useAuthAPI()

  async function handleResend() {
    isLoading.value = true
    showSuccess.value = false
    resendError.value = null
    try {
      const accessToken = useAuthController().getAccessToken() || ''
      const result = await resendVerificationEmail(accessToken)
      if (result.success) {
        showSuccess.value = true
      } else {
        resendError.value = {
          title: 'Failed to resend verification email',
          message: result.error || 'An unknown error occurred.',
        }
      }
    } finally {
      isLoading.value = false
    }
  }

  useSeoMeta({
    title: 'Email Verification Required - From The Hart Tech',
    description: 'Please verify your email address to continue using your account.',
    robots: 'noindex, nofollow',
    author: 'Sheldon Hart',
  })
</script>
