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
          <div class="space-y-4">
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
              <UInput v-model="email" id="email" name="email" type="email" placeholder="your.email@example.com" autocomplete="email" required :disabled="isLoading" />
              <p v-if="email && !useFormatters().isValidEmail(email)" class="text-xs text-error-600 dark:text-error-400 mt-1">Please enter a valid email address</p>
              <p v-else class="text-xs text-neutral-500 dark:text-neutral-400">We'll send a verification email to this address</p>
            </div>

            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Password</label>
              <UInput v-model="password" id="password" name="password" :type="showPassword ? 'text' : 'password'" placeholder="********" autocomplete="new-password" required :disabled="isLoading">
                <template #trailing>
                  <button type="button" @click="showPassword = !showPassword" class="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none" tabindex="-1">
                    <UIcon v-if="showPassword" name="lucide:eye-off" class="h-4 w-4" />
                    <UIcon v-else name="lucide:eye" class="h-4 w-4" />
                  </button>
                </template>
              </UInput>
              <div v-if="password" class="flex items-center mt-1 space-x-1.5">
                <div
                  v-for="(bar, index) in passwordStrength"
                  :key="index"
                  class="h-1 flex-1 rounded-full transition-colors duration-300"
                  :class="bar.valid ? 'bg-green-500' : 'bg-neutral-300 dark:bg-neutral-600'"
                ></div>
              </div>
              <p v-if="password && passwordError" class="text-xs text-error-600 dark:text-error-400 mt-1">{{ passwordError }}</p>
            </div>

            <div class="space-y-2">
              <label for="confirmPassword" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Confirm Password</label>
              <UInput
                v-model="confirmPassword"
                id="confirmPassword"
                name="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="********"
                autocomplete="new-password"
                required
                :disabled="isLoading"
              >
                <template #trailing>
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none"
                    tabindex="-1"
                  >
                    <UIcon v-if="showConfirmPassword" name="lucide:eye-off" class="h-4 w-4" />
                    <UIcon v-else name="lucide:eye" class="h-4 w-4" />
                  </button>
                </template>
              </UInput>
              <p v-if="password !== confirmPassword && confirmPassword" class="text-xs text-error-600 dark:text-error-400 mt-1">Passwords do not match</p>
            </div>

            <div class="mb-4 flex justify-center">
              <ClientOnly>
                <NuxtTurnstile v-model="turnstileToken" ref="turnstile" />
              </ClientOnly>
            </div>

            <div>
              <UButton
                type="submit"
                color="primary"
                block
                :loading="isLoading"
                :disabled="isLoading || password !== confirmPassword || !isPasswordValid || (!!email && !useFormatters().isValidEmail(email)) || !turnstileToken"
              >
                {{ isLoading ? 'Creating account...' : 'Create account' }}
              </UButton>
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
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  const turnstileToken = ref('')
  const turnstile = ref()

  const passwordValidation = computed(() => useFormatters().validatePassword(password.value))
  const isPasswordValid = computed(() => passwordValidation.value.isValid)
  const passwordError = computed(() => useFormatters().getPasswordError(passwordValidation.value))

  const passwordStrength = computed(() => {
    const validation = passwordValidation.value
    const errors = validation.errors

    const totalRules = 5
    const validRulesCount = totalRules - Object.keys(errors).length

    return Array(totalRules)
      .fill(0)
      .map((_, index) => ({
        valid: index < validRulesCount,
      }))
  })

  async function handleSubmit() {
    if (!email.value || !password.value) return

    if (!useFormatters().isValidEmail(email.value)) {
      error.value = {
        title: 'Invalid email',
        message: 'Please enter a valid email address.',
      }
      return
    }

    if (!isPasswordValid.value) {
      return
    }

    if (password.value !== confirmPassword.value) {
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
      const result = await useAuthAPI().register(email.value, password.value, turnstileToken.value)

      if (result.success) {
        registrationSuccess.value = true
        email.value = ''
        password.value = ''
        confirmPassword.value = ''
        turnstileToken.value = ''
      } else {
        error.value = {
          title: 'Registration failed',
          message: result.error,
        }
        turnstileToken.value = ''
        turnstile.value?.reset()
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
