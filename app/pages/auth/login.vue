<template>
  <section class="py-12 px-4 min-h-[60vh] flex flex-col items-center justify-center">
    <div class="max-w-md w-full">
      <UCard>
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Login</h1>
          <p class="mt-2 text-neutral-600 dark:text-neutral-400">Sign in to your From The Hart account</p>
        </div>

        <UAlert v-if="error" :title="error.title" :description="error.message" color="error" variant="soft" icon="lucide:alert-circle" class="mb-4" />

        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
              <UInput v-model="email" id="email" name="email" type="email" placeholder="your.email@example.com" autocomplete="email" required :disabled="isLoading" />
            </div>

            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label for="password" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Password</label>
                <ULink to="/auth/forgot-password" class="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300">Forgot password?</ULink>
              </div>
              <UInput v-model="password" id="password" name="password" type="password" placeholder="********" autocomplete="current-password" required :disabled="isLoading" />
            </div>

            <div>
              <UButton type="submit" color="primary" block :loading="isLoading" :disabled="isLoading">
                {{ isLoading ? 'Signing in...' : 'Sign in' }}
              </UButton>
            </div>

            <div class="text-center">
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Don't have an account?
                <ULink to="/auth/register" class="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"> Register </ULink>
              </p>
            </div>
          </div>
        </form>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
  const email = ref('')
  const password = ref('')
  const isLoading = ref(false)
  const error = ref<{ title: string; message: string } | null>(null)

  const { login } = useAuthAPI()

  async function handleSubmit() {
    if (!email.value || !password.value) return

    error.value = null
    isLoading.value = true

    try {
      const result = await login(email.value, password.value)

      if (result.success) {
        // Here you would typically store tokens in a secure storage
        // and set up authentication state
        await navigateTo('/')
      } else {
        error.value = {
          title: 'Login failed',
          message: result.error,
        }
      }
    } finally {
      isLoading.value = false
    }
  }

  useSeoMeta({
    title: 'Login - From The Hart Tech',
    description: 'Sign in to your From The Hart account.',
    robots: 'noindex, nofollow',
    author: 'Sheldon Hart',
  })
</script>
