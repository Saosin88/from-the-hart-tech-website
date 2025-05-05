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
              <label for="email" class="block text-sm font-medium text -neutral-700 dark:text-neutral-300">Email</label>
              <UInput v-model="email" id="email" name="email" type="email" placeholder="your.email@example.com" autocomplete="email" required :disabled="isLoading" />
            </div>

            <div>
              <UButton type="submit" color="primary" block :loading="isLoading" :disabled="isLoading">
                {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
              </UButton>
            </div>

            <div class="text-center">
              <ULink to="/auth/login" class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"> Remember your password? Login </ULink>
            </div>
          </div>
        </form>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
  const email = ref('')
  const isLoading = ref(false)
  const showSuccess = ref(false)
  const error = ref<{ title: string; message: string } | null>(null)
  const { forgotPassword } = useAuthAPI()

  async function handleSubmit() {
    if (!email.value) return

    error.value = null
    showSuccess.value = false
    isLoading.value = true

    try {
      const result = await forgotPassword(email.value)

      if (result.success) {
        showSuccess.value = true
        email.value = '' // Clear the form
      } else {
        error.value = {
          title: 'Failed to send reset email',
          message: result.error,
        }
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
