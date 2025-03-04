<template>
  <UCard class="transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-800/40 h-full">
    <div class="flex flex-col h-full">
      <div class="flex justify-center mb-4">
        <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 flex items-center justify-center w-24 h-24 overflow-hidden">
          <img v-if="certification.image" :src="certification.image" :alt="`${certification.name} badge`" class="max-w-full max-h-full object-contain" />
          <div v-else class="text-2xl text-primary-600 dark:text-primary-400">
            <span class="i-lucide-award"></span>
          </div>
        </div>
      </div>

      <div class="h-16 flex items-center justify-center">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center line-clamp-2">
          {{ certification.name }}
        </h3>
      </div>

      <div class="flex-grow"></div>

      <div class="h-6 text-xs text-gray-500 dark:text-gray-400 mb-3 text-center overflow-hidden"><span class="font-medium">Institution:</span> {{ certification.institution }}</div>

      <UButton
        v-if="certification.credentialUrl"
        :to="certification.credentialUrl"
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
        variant="soft"
        size="sm"
        class="w-full flex justify-center items-center"
      >
        <UIcon name="lucide:external-link" class="mr-1" />
        View Credential
      </UButton>
    </div>
  </UCard>
</template>

<script setup>
  defineProps({
    certification: {
      type: Object,
      required: true,
      validator: value => {
        return value.name !== undefined && value.institution !== undefined
      },
    },
  })
</script>
