<template>
  <section class="py-12 px-4 min-h-[60vh] flex flex-col items-center justify-center">
    <div class="max-w-md w-full">
      <div v-if="isLoading" class="text-center">
        <UIcon name="lucide:loader" class="mx-auto h-16 w-16 text-primary-600 animate-spin" />
        <h2 class="mt-6 text-2xl font-bold text-neutral-900 dark:text-neutral-100">Processing...</h2>
        <p class="mt-3 text-neutral-600 dark:text-neutral-400">Please wait while we reset your password.</p>
      </div>

      <UCard v-else-if="isSuccess" class="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
        <div class="text-center p-4">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <UIcon name="lucide:check" class="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h2 class="mt-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">Password Updated!</h2>
          <p class="mt-2 text-neutral-600 dark:text-neutral-400">Your password has been successfully reset.</p>
          <div class="mt-6">
            <UButton to="/auth/login" color="primary" class="w-full justify-center"> Login with new password </UButton>
          </div>
        </div>
      </UCard>

      <UCard v-else-if="showForm">
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Reset Password</h1>
          <p class="mt-2 text-neutral-600 dark:text-neutral-400">Enter your new password below</p>
        </div>

        <UAlert v-if="error" :title="error.title" :description="error.message" color="error" variant="soft" icon="lucide:alert-circle" class="mb-4" />

        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">New Password</label>
              <UInput
                v-model="password"
                id="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="********"
                autocomplete="new-password"
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
                class="w-full"
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

            <div>
              <UButton type="submit" color="primary" block :loading="isLoading" :disabled="isLoading || password !== confirmPassword || !isPasswordValid">
                {{ isLoading ? 'Updating password...' : 'Reset Password' }}
              </UButton>
            </div>
          </div>
        </form>
      </UCard>

      <UCard v-else class="border-error-200 dark:border-error-800 bg-error-50 dark:bg-error-900/20">
        <div class="text-center p-4">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-error-100 dark:bg-error-900/30">
            <UIcon name="lucide:alert-triangle" class="h-6 w-6 text-error-600 dark:text-error-400" />
          </div>
          <h2 class="mt-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">Invalid Reset Link</h2>
          <p class="mt-2 text-neutral-600 dark:text-neutral-400">{{ errorMessage }}</p>
          <div class="mt-6 flex flex-col space-y-3">
            <UButton to="/auth/forgot-password" color="primary" class="w-full justify-center"> Request New Reset Link </UButton>
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

  const isLoading = ref(false)
  const isSuccess = ref(false)
  const showForm = ref(!!token.value)
  const password = ref('')
  const confirmPassword = ref('')
  const error = ref<{ title: string; message: string } | null>(null)
  const errorMessage = ref('The password reset link is invalid or has expired. Please request a new reset link.')
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)

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
    if (password.value !== confirmPassword.value) {
      return
    }

    if (!isPasswordValid.value) {
      return
    }

    error.value = null
    isLoading.value = true

    try {
      const result = await useAuthAPI().resetPassword(token.value, password.value)

      if (result.success) {
        isSuccess.value = true
        showForm.value = false
      } else {
        error.value = {
          title: 'Failed to reset password',
          message: result.error?.message || 'An unknown error occurred.',
        }
      }
    } finally {
      isLoading.value = false
    }
  }

  useSeoMeta({
    title: 'Reset Password - From The Hart Tech',
    description: 'Reset your From The Hart account password.',
    robots: 'noindex, nofollow',
    author: 'Sheldon Hart',
  })
</script>
