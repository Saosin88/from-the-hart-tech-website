<template>
  <section class="py-12 px-4 min-h-[60vh] flex flex-col items-center justify-center">
    <div class="max-w-md w-full">
      <UCard>
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Reset Password</h1>
          <p class="mt-2 text-neutral-600 dark:text-neutral-400">Enter your email to receive a password reset link</p>
        </div>

        <UAlert
          v-if="showSuccess"
          title="Email sent!"
          description="If your email is registered, you'll receive a password reset link shortly."
          color="primary"
          variant="soft"
          icon="lucide:check-circle"
          class="mb-4"
        />

        <UAlert v-if="error" :title="error.title" :description="error.message" color="error" variant="soft" icon="lucide:alert-circle" class="mb-4" />

        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
              <UInput v-model="email" id="email" name="email" type="email" placeholder="your.email@example.com" autocomplete="email" required :disabled="isLoading" class="w-full" />
              <p v-if="email && !isValidEmail(email)" class="text-xs text-error-600 dark:text-error-400 mt-1">Please enter a valid email address</p>
            </div>

            <div>
              <UButton type="submit" color="primary" block :loading="isLoading" :disabled="isLoading || (!!email && !isValidEmail(email)) || !turnstileToken">
                {{ isLoading ? 'Sending reset link...' : 'Send Reset Link' }}
              </UButton>

              <p v-if="turnstileError" class="mt-3 text-center text-sm text-error-600 dark:text-error-400 flex items-center justify-center gap-2">
                <UIcon name="lucide:alert-triangle" class="h-4 w-4" />
                {{ turnstileError }}
              </p>
              <p v-else-if="!turnstileToken" class="mt-3 text-center text-sm text-primary-600 dark:text-primary-400 flex items-center justify-center gap-2">
                <UIcon name="lucide:loader" class="animate-spin h-4 w-4" />
                Validating security settings
              </p>

              <div class="text-center mt-4">
                <ULink to="/auth/login" class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"> Remember your password? Login </ULink>
              </div>
            </div>
          </div>
        </form>
      </UCard>
      <div class="mt-4 mb-4 w-full flex justify-center">
        <ClientOnly>
          <NuxtTurnstile
            v-model="turnstileToken"
            ref="turnstile"
            :options="{
              appearance: 'interaction-only',
              'error-callback': handleTurnstileError,
              'expired-callback': handleTurnstileExpired,
            }"
          />
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const email = ref('')
  const isLoading = ref(false)
  const showSuccess = ref(false)
  const error = ref<{ title: string; message: string } | null>(null)
  const turnstileToken = ref('')
  const turnstile = ref()
  const turnstileError = ref('')

  const { forgotPassword } = useAuthAPI()
  const { isValidEmail } = useFormatters()

  function handleTurnstileError() {
    turnstileToken.value = ''
    turnstileError.value = 'Security verification failed.'
  }

  function handleTurnstileExpired() {
    turnstileToken.value = ''
    turnstileError.value = 'Security verification expired. Trying again...'
    turnstile.value?.reset()
  }

  async function handleSubmit() {
    if (!email.value) return

    if (!isValidEmail(email.value)) {
      error.value = {
        title: 'Invalid email',
        message: 'Please enter a valid email address.',
      }
      return
    }

    if (!turnstileToken.value) {
      error.value = {
        title: 'Security verification required',
        message: 'Please complete the security verification.',
      }
      return
    }

    error.value = null
    showSuccess.value = false
    isLoading.value = true

    try {
      const result = await forgotPassword(email.value, turnstileToken.value)

      if (result.success) {
        showSuccess.value = true
        email.value = ''
        turnstileToken.value = ''
        turnstileError.value = ''
        turnstile.value?.reset()
      } else {
        error.value = {
          title: 'Failed to send reset email',
          message: result.error,
        }
        turnstileToken.value = ''
        turnstileError.value = ''
        turnstile.value?.reset()
      }
    } finally {
      isLoading.value = false
    }
  }

  useSeoMeta({
    title: 'Forgot Password - From The Hart Tech',
    description: 'Request a password reset link for your account.',
    robots: 'noindex, nofollow',
    author: 'Sheldon Hart',
  })
</script>
