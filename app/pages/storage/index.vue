<template>
  <div></div>
</template>

<script setup lang="ts">
  const userID = useAuthController().getUserID()

  if (!userID) {
    navigateTo('/auth/login')
  } else {
    navigateTo(`/storage/${userID}/`)
  }
</script>
