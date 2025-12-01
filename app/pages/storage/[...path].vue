<template>
  <div>
    <div v-show="!showFileViewer" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <StorageBreadcrumbs :route-params="route.params.path" />

      <div v-if="loading" class="flex justify-center items-center py-12">
        <UIcon name="lucide:loader-2" class="w-8 h-8 animate-spin text-primary" />
      </div>

      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div class="flex items-center">
          <UIcon name="lucide:alert-circle" class="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
          <p class="text-red-800 dark:text-red-200">{{ error }}</p>
        </div>
      </div>

      <div v-else-if="items.length === 0" class="text-center py-12">
        <UIcon name="lucide:folder-open" class="w-16 h-16 mx-auto text-neutral-300 dark:text-neutral-600 mb-4" />
        <p class="text-neutral-600 dark:text-neutral-400">This folder is empty</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StorageItemCard v-for="item in items" :key="item.resource_id" :item="item" @click="handleItemClick" />
      </div>

      <div v-if="nextCursor" class="mt-8 flex justify-center">
        <UButton @click="loadMore" :loading="loadingMore"> Load More </UButton>
      </div>
    </div>

    <StorageFileViewer v-if="showFileViewer && currentFilePath" :file-path="currentFilePath" :is-open="showFileViewer" @close="handleViewerClose" />
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()

  const userID = ref<string>('')
  const items = ref<any[]>([])
  const nextCursor = ref<string | null>(null)
  const loading = ref(true)
  const loadingMore = ref(false)
  const error = ref<string | null>(null)

  const showFileViewer = ref(false)
  const currentFilePath = ref<string | null>(null)
  const scrollPosition = ref(0)

  const apiPath = computed(() => {
    const pathArray = route.params.path as string[]
    return pathArray ? pathArray.join('/') : ''
  })

  const subPath = computed(() => {
    const pathArray = route.params.path as string[]
    return pathArray && pathArray.length > 1 ? pathArray.slice(1).join('/') : ''
  })

  async function loadFilesAndFolders() {
    try {
      loading.value = true
      error.value = null

      const result = await useStorageController().getFilesAndFolders(`storage/${apiPath.value}`)

      if (result.success) {
        items.value = result.data.items || []
        nextCursor.value = result.data.next_cursor || null
      } else {
        error.value = result.error
      }
    } catch (err) {
      console.error('Error loading files and folders:', err)
      error.value = 'An unexpected error occurred'
    } finally {
      loading.value = false
    }
  }

  async function loadMore() {
    if (!nextCursor.value) return

    try {
      loadingMore.value = true
      const result = await useStorageController().getFilesAndFolders(`storage/${apiPath.value}?cursor=${nextCursor.value}`)

      if (result.success) {
        items.value = [...items.value, ...(result.data.items || [])]
        nextCursor.value = result.data.next_cursor || null
      }
    } catch (err) {
      console.error('Error loading more items:', err)
    } finally {
      loadingMore.value = false
    }
  }

  function handleItemClick(item: any) {
    const cleanSubPath = subPath.value.replace(/\/+$/, '')
    const path = cleanSubPath ? `${cleanSubPath}/${item.name}` : item.name

    if (item.is_folder) {
      navigateTo(`/storage/${userID.value}/${path}/`)
    } else {
      scrollPosition.value = window.scrollY
      currentFilePath.value = `storage/${userID.value}/${path}`
      showFileViewer.value = true
    }
  }

  function handleViewerClose() {
    showFileViewer.value = false
    currentFilePath.value = null
    nextTick(() => {
      if (scrollPosition.value > 0) {
        window.scrollTo(0, scrollPosition.value)
        scrollPosition.value = 0
      }
    })
  }

  onMounted(() => {
    const userId = useAuthController().getUserID()
    if (!userId) {
      navigateTo('/auth/login')
      return
    }

    userID.value = userId

    const pathArray = route.params.path as string[]
    if (pathArray && pathArray.length > 0 && pathArray[0] !== userId) {
      navigateTo(`/storage/${userId}/`)
      return
    }

    loadFilesAndFolders()
  })

  watch(() => route.params.path, loadFilesAndFolders)
</script>
