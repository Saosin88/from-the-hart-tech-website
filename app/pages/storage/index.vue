<template>
  <div></div>
</template>

<script setup lang="ts">
  const principalID = useAuthController().getPrincipalID()

  if (!principalID) {
    navigateTo('/auth/login')
  } else {
    navigateTo(`/storage/${principalID}/`)
  }
</script>
