<template>
  <section class="py-8">
    <div class="container mx-auto px-6">
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold mb-2">User <span class="text-primary-600">Profile</span></h1>
        <p class="text-neutral-600 dark:text-neutral-400">Manage your account and personal information</p>
      </div>

      <UCard class="max-w-3xl mx-auto">
        <div class="p-6 break-words">
          <div class="flex items-center space-x-4 mb-6 min-w-0">
            <UAvatar icon="i-heroicons-user-circle" color="primary" variant="solid" size="xl" :alt="userEmail" class="h-16 w-16" />
            <div class="min-w-0">
              <h2 class="text-2xl font-bold text-center sm:text-left break-all">Welcome, {{ userEmail }}!</h2>
              <p class="text-sm text-neutral-500 dark:text-neutral-400">Your profile dashboard</p>
            </div>
          </div>

          <UDivider />

          <div class="py-4">
            <h3 class="text-lg font-medium mb-4">Profile Information</h3>
            <div class="space-y-4">
              <div class="flex flex-col sm:flex-row justify-between py-2">
                <span class="text-neutral-600 dark:text-neutral-400">Email</span>
                <span class="font-medium text-right sm:text-left">{{ userEmail }}</span>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </section>
</template>

<script setup>
  const userEmail = ref('')

  onMounted(() => {
    const { getUserEmail } = useAuthController()
    userEmail.value = getUserEmail() || ''
  })
</script>
