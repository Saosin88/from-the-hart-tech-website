<template>
  <Transition enter-active-class="transition-opacity duration-300" leave-active-class="transition-opacity duration-300" enter-from-class="opacity-0" leave-to-class="opacity-0">
    <div v-if="isOpen" class="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm" @click.self="close">
      <div class="absolute inset-0 flex flex-col">
        <div class="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent z-10">
          <div class="flex items-center justify-between p-4">
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <UButton icon="lucide:x" color="neutral" variant="ghost" size="lg" @click="close" aria-label="Close viewer" />
              <h2 class="text-lg font-medium text-white truncate">
                {{ fileMetadata?.file_name || 'Loading...' }}
              </h2>
            </div>

            <div class="flex items-center space-x-2">
              <UButton v-if="fileMetadata" icon="lucide:download" color="neutral" variant="ghost" size="lg" @click="downloadFile" aria-label="Download file" />
              <UButton icon="lucide:info" color="neutral" variant="ghost" size="lg" @click="toggleInfo" :aria-label="showInfo ? 'Hide info' : 'Show info'" />
            </div>
          </div>
        </div>

        <div class="flex-1 flex items-center justify-center p-20 relative">
          <div v-if="loading" class="text-center">
            <UIcon name="lucide:loader-2" class="w-12 h-12 animate-spin text-white mx-auto mb-4" />
            <p class="text-white text-lg">Loading file...</p>
          </div>

          <div v-else-if="error" class="text-center max-w-md">
            <UIcon name="lucide:alert-circle" class="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p class="text-white text-lg mb-4">{{ error }}</p>
            <UButton color="neutral" @click="close"> Close </UButton>
          </div>

          <div v-else-if="fileMetadata">
            <div v-if="isImage" class="relative">
              <div v-if="imageLoading" class="flex items-center justify-center" style="min-width: 200px; min-height: 200px">
                <UIcon name="lucide:loader-2" class="w-12 h-12 animate-spin text-white" />
              </div>
              <img
                :src="fileMetadata.file_url"
                :alt="fileMetadata.file_name"
                class="max-h-[80vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300"
                :class="imageLoading ? 'opacity-0 absolute' : 'opacity-100'"
                @load="imageLoading = false"
                @error="handleImageError"
              />
            </div>

            <div v-else class="text-center">
              <UIcon name="lucide:file" class="w-24 h-24 text-neutral-400 mx-auto mb-6" />
              <h3 class="text-white text-xl font-medium mb-2">{{ fileMetadata.file_name }}</h3>
              <p class="text-neutral-300 mb-6">
                {{ useFormatters().formatFileSize(fileMetadata.size_bytes) }}
              </p>
              <UButton icon="lucide:download" color="primary" size="lg" @click="downloadFile"> Download File </UButton>
            </div>
          </div>
        </div>
      </div>

      <Transition enter-active-class="transition-transform duration-300" leave-active-class="transition-transform duration-300" enter-from-class="translate-x-full" leave-to-class="translate-x-full">
        <div v-if="showInfo && fileMetadata" class="absolute top-0 right-0 bottom-0 w-80 bg-neutral-900/95 backdrop-blur-md border-l border-neutral-700 overflow-y-auto">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-white mb-6">File Information</h3>

            <div class="space-y-4">
              <div>
                <p class="text-sm text-neutral-400 mb-1">Name</p>
                <p class="text-sm text-white break-all">{{ fileMetadata.file_name }}</p>
              </div>

              <div>
                <p class="text-sm text-neutral-400 mb-1">Size</p>
                <p class="text-sm text-white">{{ useFormatters().formatFileSize(fileMetadata.size_bytes) }}</p>
              </div>

              <div>
                <p class="text-sm text-neutral-400 mb-1">Type</p>
                <p class="text-sm text-white">{{ fileMetadata.content_type }}</p>
              </div>

              <div>
                <p class="text-sm text-neutral-400 mb-1">Created</p>
                <p class="text-sm text-white">{{ useFormatters().formatDate(new Date(fileMetadata.created_date)) }}</p>
              </div>

              <div v-if="fileMetadata.media_metadata?.width && fileMetadata.media_metadata?.height">
                <p class="text-sm text-neutral-400 mb-1">Dimensions</p>
                <p class="text-sm text-white">{{ fileMetadata.media_metadata.width }} x {{ fileMetadata.media_metadata.height }}</p>
              </div>

              <div v-if="fileMetadata.media_metadata?.duration">
                <p class="text-sm text-neutral-400 mb-1">Duration</p>
                <p class="text-sm text-white">
                  {{ useFormatters().formatDuration(fileMetadata.media_metadata.duration) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import type { FileMetadata } from '~/app/types/storage'

  const props = defineProps<{
    filePath: string
    isOpen: boolean
  }>()

  const emit = defineEmits<{
    close: []
  }>()

  const fileMetadata = ref<FileMetadata | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)
  const showInfo = ref(false)
  const imageLoading = ref(true)

  const isImage = computed(() => {
    return useFormatters().isImageFile(fileMetadata.value?.content_type, fileMetadata.value?.media_type)
  })

  async function loadFile() {
    try {
      loading.value = true
      error.value = null
      imageLoading.value = true

      const result = await useStorageController().getFileMetadata(props.filePath)

      if (result.success) {
        fileMetadata.value = result.data
      } else {
        error.value = result.error
      }
    } catch (err) {
      console.error('Error loading file:', err)
      error.value = 'An unexpected error occurred'
    } finally {
      loading.value = false
    }
  }

  function downloadFile() {
    if (!fileMetadata.value) return

    const link = document.createElement('a')
    link.href = fileMetadata.value.file_url
    link.download = fileMetadata.value.file_name
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function toggleInfo() {
    showInfo.value = !showInfo.value
  }

  function close() {
    emit('close')
  }

  function handleImageError() {
    imageLoading.value = false
    error.value = 'Failed to load image'
  }

  watch(
    () => props.isOpen,
    newValue => {
      if (newValue) {
        loadFile()
        showInfo.value = false
      } else {
        fileMetadata.value = null
        error.value = null
        imageLoading.value = true
      }
    },
    { immediate: true },
  )
</script>
