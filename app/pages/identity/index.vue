<script setup lang="ts">
  const actingId = useAuthController().getActingIdentity()

  if (!actingId) {
    navigateTo('/auth/login')
  } else {
    navigateTo(`/identity/${actingId}`)
  }
</script>

<template>
  <div class="flex items-center justify-center min-h-[50vh]">
    <p class="text-neutral-500">Redirecting…</p>
  </div>
</template>
