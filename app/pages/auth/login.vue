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
              <UInput v-model="email" id="email" name="email" type="email" placeholder="your.email@example.com" autocomplete="email" required :disabled="isLoading" class="w-full" />
              <p v-if="email && !isValidEmail(email)" class="text-xs text-error-600 dark:text-error-400 mt-1">Please enter a valid email address</p>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label for="password" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Password</label>
                <ULink to="/auth/forgot-password" class="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300">Forgot password?</ULink>
              </div>
              <UInput
                v-model="password"
                id="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="********"
                autocomplete="current-password"
                required
                :disabled="isLoading"
                class="w-full"
              >
                <template #trailing>
                  <button type="button" @click="showPassword = !showPassword" class="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none" tabindex="-1">
                    <UIcon v-if="showPassword" name="lucide:eye-off" class="h-4 w-4" />
                    <UIcon v-else name="lucide:eye" class="h-4 w-4" />
                  </button>
                </template>
              </UInput>
            </div>

            <!-- Remember me checkbox -->
            <div class="flex items-center">
              <UCheckbox v-model="rememberMe" id="remember-me" name="remember-me" :disabled="isLoading" />
              <label for="remember-me" class="ml-2 block text-sm text-neutral-700 dark:text-neutral-300"> Remember me </label>
            </div>

            <div>
              <UButton type="submit" color="primary" block :loading="isLoading" :disabled="isLoading || (!!email && !isValidEmail(email)) || !turnstileToken">
                {{ isLoading ? 'Signing in...' : 'Sign in' }}
              </UButton>

              <p v-if="turnstileError" class="mt-3 text-center text-sm text-error-600 dark:text-error-400 flex items-center justify-center gap-2">
                <UIcon name="lucide:alert-triangle" class="h-4 w-4" />
                {{ turnstileError }}
              </p>
              <p v-else-if="!turnstileToken" class="mt-3 text-center text-sm text-primary-600 dark:text-primary-400 flex items-center justify-center gap-2">
                <UIcon name="lucide:loader" class="animate-spin h-4 w-4" />
                Validating security settings
              </p>
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
  const password = ref('')
  const rememberMe = ref(false) // Add this for the remember me checkbox
  const isLoading = ref(false)
  const error = ref<{ title: string; message: string } | null>(null)
  const showPassword = ref(false)
  const turnstileToken = ref('')
  const turnstile = ref()
  const turnstileError = ref('')

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
    if (!email.value || !password.value) return
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
    isLoading.value = true

    try {
      const result = await useAuthController().login(email.value, password.value, turnstileToken.value, rememberMe.value)

      if (result.success) {
        email.value = ''
        password.value = ''
        turnstileToken.value = ''
        turnstileError.value = ''
        turnstile.value?.reset()
        const route = useRoute()
        const redirectPath = route.query.redirect?.toString() || '/user/profile'
        await navigateTo(redirectPath)
      } else {
        error.value = {
          title: 'Login failed',
          message: result.error || 'An unknown error occurred.',
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
    title: 'Login - From The Hart Tech',
    description: 'Sign in to your From The Hart account.',
    robots: 'noindex, nofollow',
    author: 'Sheldon Hart',
  })
</script>
