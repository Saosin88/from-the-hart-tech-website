<template>
  <section class="py-12 px-4 min-h-[60vh] flex flex-col items-center justify-center">
    <div class="max-w-md w-full">
      <UCard>
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Create an Account</h1>
          <p class="mt-2 text-neutral-600 dark:text-neutral-400">Sign up for From The Hart</p>
        </div>

        <UAlert v-if="error" :title="error.title" :description="error.message" color="error" variant="soft" icon="lucide:alert-circle" class="mb-4" />

        <UAlert
          v-if="registrationSuccess"
          title="Registration Successful"
          description="Please check your email to verify your account."
          color="success"
          variant="soft"
          icon="lucide:check-circle"
          class="mb-4"
        />

        <form @submit.prevent="handleSubmit">
          <div class="space-y-3">
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
              <UInput v-model="email" id="email" name="email" type="email" placeholder="your.email@example.com" autocomplete="email" required :disabled="isLoading" />
              <p class="text-xs text-neutral-500 dark:text-neutral-400">We'll send a verification email to this address</p>
            </div>

            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Password</label>
              <UInput v-model="password" id="password" name="password" type="password" placeholder="********" autocomplete="new-password" required :disabled="isLoading" />
              <p class="text-xs text-neutral-500 dark:text-neutral-400">Minimum 6 characters</p>
            </div>

            <div class="space-y-2">
              <label for="confirmPassword" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Confirm Password</label>
              <UInput v-model="confirmPassword" id="confirmPassword" name="confirmPassword" type="password" placeholder="********" autocomplete="new-password" required :disabled="isLoading" />
            </div>

            <div>
              <UButton type="submit" color="primary" block :loading="isLoading" :disabled="isLoading || password !== confirmPassword || password.length < 6">
                {{ isLoading ? 'Creating account...' : 'Create account' }}
              </UButton>
              <p v-if="password !== confirmPassword && confirmPassword" class="text-xs text-error-600 dark:text-error-400 mt-1">Passwords do not match</p>
              <p v-else-if="password && password.length < 6" class="text-xs text-error-600 dark:text-error-400 mt-1">Password must be at least 6 characters</p>
            </div>

            <div class="text-center">
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Already have an account?
                <ULink to="/auth/login" class="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"> Login </ULink>
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
  const confirmPassword = ref('')
  const isLoading = ref(false)
  const error = ref<{ title: string; message: string } | null>(null)
  const registrationSuccess = ref(false)

  const { register } = useAuthAPI()

  async function handleSubmit() {
    if (!email.value || !password.value) return

    if (password.value !== confirmPassword.value) {
      error.value = {
        title: 'Passwords do not match',
        message: 'Please make sure your passwords match.',
      }
      return
    }

    if (password.value.length < 6) {
      error.value = {
        title: 'Password too short',
        message: 'Your password must be at least 6 characters long.',
      }
      return
    }

    error.value = null
    isLoading.value = true

    try {
      const result = await register(email.value, password.value)

      if (result.success) {
        registrationSuccess.value = true
        email.value = ''
        password.value = ''
        confirmPassword.value = ''
      } else {
        error.value = {
          title: 'Registration failed',
          message: result.error,
        }
      }
    } finally {
      isLoading.value = false
    }
  }

  useSeoMeta({
    title: 'Register - From The Hart Tech',
    description: 'Create a new From The Hart account.',
    robots: 'noindex, nofollow',
    author: 'Sheldon Hart',
  })
</script>
