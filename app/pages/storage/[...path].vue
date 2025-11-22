<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <nav class="mb-6">
      <ol class="flex items-center space-x-2 text-sm">
        <li>
          <ULink :to="`/storage/${userID}/`" class="text-primary hover:underline flex items-center">
            <UIcon name="lucide:hard-drive" class="w-4 h-4 mr-1" />
            My Storage
          </ULink>
        </li>
        <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
          <UIcon name="lucide:chevron-right" class="w-4 h-4 mx-2 text-neutral-400" />
          <ULink v-if="index < breadcrumbs.length - 1" :to="crumb.path" class="text-primary hover:underline">
            {{ crumb.name }}
          </ULink>
          <span v-else class="text-neutral-600 dark:text-neutral-400">
            {{ crumb.name }}
          </span>
        </li>
      </ol>
    </nav>

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
      <div
        v-for="item in items"
        :key="item.resource_id"
        @click="handleItemClick(item)"
        class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
      >
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <UIcon :name="getItemIcon(item)" :class="getItemIconColor(item)" class="w-8 h-8" />
          </div>

          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
              {{ item.name }}
            </p>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {{ formatters.formatDate(new Date(item.created_date)) }}
            </p>
            <p v-if="!item.is_folder" class="text-xs text-neutral-500 dark:text-neutral-400">
              {{ formatters.formatFileSize(item.size_bytes) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="nextCursor" class="mt-8 flex justify-center">
      <UButton @click="loadMore" :loading="loadingMore"> Load More </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const formatters = useFormatters()

  const userID = ref<string>('')
  const items = ref<any[]>([])
  const nextCursor = ref<string | null>(null)
  const loading = ref(true)
  const loadingMore = ref(false)
  const error = ref<string | null>(null)

  interface Breadcrumb {
    name: string
    path: string
  }

  // Full path for API calls: userid/folder1/folder2
  const apiPath = computed(() => {
    const pathArray = route.params.path as string[]
    return pathArray ? pathArray.join('/') : ''
  })

  // Subpath after userID for building navigation: folder1/folder2
  const subPath = computed(() => {
    const pathArray = route.params.path as string[]
    return pathArray && pathArray.length > 1 ? pathArray.slice(1).join('/') : ''
  })

  const breadcrumbs = computed<Breadcrumb[]>(() => {
    const pathArray = route.params.path as string[]
    if (!pathArray || pathArray.length <= 1) return []

    const crumbs: Breadcrumb[] = []
    for (let i = 1; i < pathArray.length; i++) {
      const part = pathArray[i]
      if (!part) continue

      const pathUpToHere = pathArray.slice(0, i + 1).join('/')
      crumbs.push({
        name: part,
        path: `/storage/${pathUpToHere}/`,
      })
    }

    return crumbs
  })

  async function loadFilesAndFolders() {
    try {
      loading.value = true
      error.value = null

      const result = await useStorageAPI().getFilesAndFolders(`storage/${apiPath.value}`)

      if (result.success && result.data) {
        items.value = result.data.items || []
        nextCursor.value = result.data.next_cursor || null
      } else {
        error.value = result.error || 'Failed to load files and folders'
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
      const result = await useStorageAPI().getFilesAndFolders(`storage/${apiPath.value}?cursor=${nextCursor.value}`)

      if (result.success && result.data) {
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
    // Clean any trailing slashes from subPath before building the new path
    const cleanSubPath = subPath.value.replace(/\/+$/, '')
    const path = cleanSubPath ? `${cleanSubPath}/${item.name}` : item.name

    if (item.is_folder) {
      navigateTo(`/storage/${userID.value}/${path}/`)
    } else {
      navigateTo(`/storage/${userID.value}/${path}`)
      console.log('Opening file:', item.name)
    }
  }

  function getItemIcon(item: any): string {
    if (item.is_folder) return 'lucide:folder'
    if (item.media_type?.toLowerCase() === 'image') return 'lucide:image'
    return 'lucide:file'
  }

  function getItemIconColor(item: any): string {
    if (item.is_folder) return 'text-blue-500'
    if (item.media_type?.toLowerCase() === 'image') return 'text-green-500'
    if (item.media_type?.toLowerCase() === 'video') return 'text-purple-500'
    return 'text-neutral-500'
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
