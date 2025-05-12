<template>
  <section class="py-12 px-4 min-h-[60vh] flex flex-col items-center justify-center">
    <div class="max-w-md w-full">
      <UCard class="border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20">
        <div class="text-center p-4">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
            <UIcon name="lucide:mail" class="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 class="mt-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">Email Verification Required</h2>
          <p class="mt-2 text-neutral-600 dark:text-neutral-400">Please verify your email address to continue. We sent a verification link to your registered email when you registered.</p>
          <div class="mt-6 flex flex-col space-y-3">
            <UButton to="/auth/resend-verification" color="primary" class="w-full justify-center"> Resend Verification Email </UButton>
            <UButton to="/" variant="ghost" class="w-full justify-center"> Return to Home </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
  useSeoMeta({
    title: 'Email Verification Required - From The Hart Tech',
    description: 'Please verify your email address to continue using your account.',
    robots: 'noindex, nofollow',
    author: 'Sheldon Hart',
  })
</script>
