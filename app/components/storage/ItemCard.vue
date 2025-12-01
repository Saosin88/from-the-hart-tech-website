<template>
  <div
    @click="$emit('click', item)"
    class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
  >
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0">
        <UIcon :name="getItemIcon()" :class="getItemIconColor()" class="w-8 h-8" />
      </div>

      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
          {{ item.name }}
        </p>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          {{ formatters.formatDate(new Date(item.created_date)) }}
        </p>
        <p v-if="!item.is_folder && item.size_bytes" class="text-xs text-neutral-500 dark:text-neutral-400">
          {{ formatters.formatFileSize(item.size_bytes) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface StorageItem {
    resource_id: string
    name: string
    is_folder: boolean
    created_date: string
    size_bytes?: number
    media_type?: string
  }

  interface Props {
    item: StorageItem
  }

  const props = defineProps<Props>()
  defineEmits<{
    click: [item: StorageItem]
  }>()

  const formatters = useFormatters()

  function getItemIcon(): string {
    if (props.item.is_folder) return 'lucide:folder'
    if (props.item.media_type?.toLowerCase() === 'image') return 'lucide:image'
    return 'lucide:file'
  }

  function getItemIconColor(): string {
    if (props.item.is_folder) return 'text-blue-500'
    if (props.item.media_type?.toLowerCase() === 'image') return 'text-green-500'
    if (props.item.media_type?.toLowerCase() === 'video') return 'text-purple-500'
    return 'text-neutral-500'
  }
</script>
