<template>
  <!-- Global Error Handler Page -->
  <!-- This layout wraps the error component in the site's default layout -->
  <NuxtLayout>
    <!-- Error Component with Default 404 Configuration -->
    <!-- Displays a styled error message with navigation options -->
    <TheError :statusCode="404" :statusMessage="'Page Not Found'" />
  </NuxtLayout>
</template>
