<template>
  <UModal :open="isLoading" title="Re-authenticating" description="Please wait while we restore your session..." :dismissible="false" :close="false" overlay>
    <template #body>
      <div class="flex flex-col items-center justify-center p-4">
        <UIcon name="lucide:refresh-cw" class="text-primary-500 h-12 w-12 animate-spin mb-6" />

        <div class="w-full mt-4">
          <div class="h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div class="h-full bg-primary-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
  const authUtils = useAuthUtils()

  const isLoading = computed({
    get: () => authUtils.tokenRefreshLoading.value,
    set: value => {
      authUtils.tokenRefreshLoading.value = value
    },
  })
</script>
