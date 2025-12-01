<template>
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
</template>

<script setup lang="ts">
  interface Breadcrumb {
    name: string
    path: string
  }

  interface Props {
    routeParams?: string | string[]
  }

  const props = defineProps<Props>()

  const userID = computed(() => {
    const pathArray = Array.isArray(props.routeParams) ? props.routeParams : [props.routeParams]
    return pathArray && pathArray.length > 0 ? pathArray[0] : ''
  })

  const breadcrumbs = computed<Breadcrumb[]>(() => {
    const pathArray = Array.isArray(props.routeParams) ? props.routeParams : [props.routeParams]
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
</script>
