<template>
  <section class="py-8">
    <div class="container mx-auto px-6">
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold mb-2">Your <span class="text-primary-600">Profile</span></h1>
        <p class="text-neutral-600 dark:text-neutral-400">Manage your personal information</p>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-12">
        <UIcon name="lucide:loader-2" class="w-8 h-8 animate-spin text-primary" />
      </div>

      <UCard v-else-if="error" class="max-w-3xl mx-auto">
        <div class="p-6 text-center space-y-4">
          <p class="text-red-600">{{ error }}</p>
          <UButton @click="fetchIdentity" color="primary" variant="soft" size="sm">Try Again</UButton>
        </div>
      </UCard>

      <!-- Display mode -->
      <UCard v-else-if="identity && !editing" class="max-w-3xl mx-auto">
        <div class="p-6 wrap-break-word">
          <div class="flex items-center space-x-4 mb-6">
            <UAvatar icon="lucide:circle-user" color="primary" variant="solid" size="xl" class="h-16 w-16" />
            <div>
              <h2 class="text-2xl font-bold">{{ displayName || 'Your Profile' }}</h2>
              <p class="text-sm text-neutral-500">{{ identity.email }}</p>
            </div>
          </div>
          <USeparator />
          <div class="py-4 space-y-4">
            <div class="flex justify-between py-2"><span class="text-neutral-600">First Name</span><span class="font-medium">{{ identity.first_name || '—' }}</span></div>
            <div class="flex justify-between py-2"><span class="text-neutral-600">Last Name</span><span class="font-medium">{{ identity.last_name || '—' }}</span></div>
            <div class="flex justify-between py-2"><span class="text-neutral-600">Email</span><span class="font-medium">{{ identity.email }}</span></div>
          </div>
          <USeparator />
          <div class="pt-4 flex justify-between items-center">
            <span class="text-xs text-neutral-400">Last updated {{ formatDate(identity.updated_at) }}</span>
            <UButton @click="startEditing" color="primary" size="sm">Edit Profile</UButton>
          </div>
        </div>
      </UCard>

      <!-- Edit mode -->
      <UCard v-else-if="identity && editing" class="max-w-3xl mx-auto">
        <div class="p-6 wrap-break-word">
          <h2 class="text-xl font-bold mb-4">Edit Profile</h2>

          <div v-if="saveError" class="mb-4">
            <UAlert color="error" variant="soft" :title="saveError" />
          </div>

          <div class="space-y-4">
            <UFormField label="First Name">
              <UInput v-model="editForm.first_name" placeholder="First name" />
            </UFormField>
            <UFormField label="Last Name">
              <UInput v-model="editForm.last_name" placeholder="Last name" />
            </UFormField>
            <UFormField label="Email">
              <UInput :value="identity.email" disabled />
              <template #help>
                <span class="text-xs text-neutral-400">Email cannot be changed</span>
              </template>
            </UFormField>
          </div>

          <USeparator class="my-4" />

          <div class="flex justify-end gap-3">
            <UButton @click="cancelEditing" variant="soft" size="sm">Cancel</UButton>
            <UButton @click="saveIdentity" :loading="saving" color="primary" size="sm">Save Changes</UButton>
          </div>
        </div>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
  import type { IdentityRecord } from '~/app/types/identity'

  const route = useRoute()

  const identity = ref<IdentityRecord | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)
  const editing = ref(false)
  const saving = ref(false)
  const saveError = ref<string | null>(null)

  const editForm = reactive({
    first_name: '',
    last_name: '',
  })

  const displayName = computed(() => {
    if (!identity.value) return ''
    return [identity.value.first_name, identity.value.last_name].filter(Boolean).join(' ') || ''
  })

  async function fetchIdentity() {
    try {
      loading.value = true
      error.value = null
      const result = await useIdentityAPI().getIdentity(route.params.id as string)
      if (result.success) {
        identity.value = result.data
      } else {
        error.value = result.error
      }
    } catch (err) {
      console.error('Error loading identity:', err)
      error.value = 'An unexpected error occurred'
    } finally {
      loading.value = false
    }
  }

  function startEditing() {
    if (!identity.value) return
    editForm.first_name = identity.value.first_name
    editForm.last_name = identity.value.last_name
    saveError.value = null
    editing.value = true
  }

  function cancelEditing() {
    editing.value = false
    saveError.value = null
  }

  async function saveIdentity() {
    saving.value = true
    saveError.value = null

    try {
      const result = await useIdentityAPI().updateIdentity(route.params.id as string, {
        first_name: editForm.first_name,
        last_name: editForm.last_name,
      })

      if (result.success) {
        identity.value = result.data
        editing.value = false
      } else {
        saveError.value = result.error
      }
    } catch (err) {
      console.error('Error saving identity:', err)
      saveError.value = 'An unexpected error occurred'
    } finally {
      saving.value = false
    }
  }

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  }

  onMounted(() => {
    fetchIdentity()
  })

  watch(() => route.params.id, () => {
    editing.value = false
    fetchIdentity()
  })
</script>
