<template>
  <section class="py-12 px-4 min-h-[60vh] flex flex-col items-center justify-center">
    <div class="max-w-md w-full">
      <UCard>
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Resend Verification Email</h1>
          <p class="mt-2 text-neutral-600 dark:text-neutral-400">Enter your email to receive a new verification link</p>
        </div>

        <!-- Success notification -->
        <UAlert
          v-if="showSuccess"
          title="Email sent!"
          description="If your email is registered and not verified, you'll receive a verification link shortly."
          color="primary"
          variant="soft"
          icon="lucide:check-circle"
          class="mb-4"
        />

        <!-- Error notification -->
        <UAlert v-if="error" :title="error.title" :description="error.message" color="error" variant="soft" icon="lucide:alert-circle" class="mb-4" />

        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <UFormGroup label="Email" name="email">
              <UInput v-model="email" name="email" type="email" placeholder="your.email@example.com" autocomplete="email" required :disabled="isLoading" />
            </UFormGroup>

            <div>
              <UButton type="submit" color="primary" block :loading="isLoading" :disabled="isLoading">
                {{ isLoading ? 'Sending...' : 'Send Verification Email' }}
              </UButton>
            </div>

            <div class="text-center">
              <ULink to="/" class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"> Return to home </ULink>
            </div>
          </div>
        </form>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
  const config = useRuntimeConfig()

  // Form state
  const email = ref('')
  const isLoading = ref(false)
  const showSuccess = ref(false)
  const error = ref<{ title: string; message: string } | null>(null)

  useSeoMeta({
    title: 'Resend Verification Email - From The Hart Tech',
    description: 'Request a new email verification link.',
    robots: 'noindex, nofollow',
    author: 'Sheldon Hart',
  })

  async function handleSubmit() {
    if (!email.value) return

    error.value = null
    showSuccess.value = false
    isLoading.value = true

    try {
      const response = await fetch(`${config.public.fromTheHartAPIBaseUrl}/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value }),
      })

      const data = await response.json()

      if (response.ok) {
        showSuccess.value = true
        email.value = '' // Clear the form
      } else {
        error.value = {
          title: 'Failed to send verification email',
          message: data.error || 'An error occurred while sending the verification email. Please try again.',
        }
      }
    } catch (e) {
      error.value = {
        title: 'Network error',
        message: 'Unable to connect to the server. Please check your internet connection and try again.',
      }
    } finally {
      isLoading.value = false
    }
  }
</script>
