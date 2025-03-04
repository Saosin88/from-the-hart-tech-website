<template>
  <div class="max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8">
    <header class="flex justify-between items-center mt-5 w-full">
      <div class="flex-shrink-0 flex items-center space-x-4">
        <img src="/logo/from-the-hart.png" alt="Logo" class="h-8 w-8" />
        <ULink to="/" @click="closeMenu()">From The Hart</ULink>
      </div>

      <div class="hidden md:block">
        <div class="flex-grow text-center">
          <UNavigationMenu orientation="horizontal" :items="items" />
        </div>
      </div>

      <div class="flex items-center gap-4">
        <ColorModeSelector />
        <div class="hidden md:block">
          <div class="sm:flex sm:gap-4">
            <UButton to="/login">Login</UButton>
            <UButton to="/signup" color="neutral">Sign Up</UButton>
          </div>
        </div>

        <div class="block md:hidden relative">
          <UButton @click="toggleMenu()" :icon="isMenuOpen ? 'i-lucide-x' : 'i-lucide-align-justify'" />
          <transition name="slide-down">
            <div v-if="isMenuOpen" class="absolute right-0 mt-2 w-48 shadow-lg z-50 bg-gray-800 flex flex-col space-y-2 p-2">
              <UNavigationMenu orientation="vertical" :items="items" />
              <UButton to="/login" @click="closeMenu()" class="justify-center">Login</UButton>
              <UButton to="/signup" @click="closeMenu()" color="neutral" class="justify-center">Sign Up</UButton>
            </div>
          </transition>
        </div>
      </div>
    </header>

    <main class="p-2 mt-10 w-full">
      <slot />
    </main>
  </div>
</template>

<script setup>
  import BlogPost from '~/components/content/blog-post.vue'

  const isMenuOpen = ref(false)
  const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)

  const closeMenu = _e => {
    isMenuOpen.value = false
  }

  const items = ref([
    [
      {
        label: 'About',
        icon: 'i-lucide-person-standing',
        to: '/about',
        onSelect: closeMenu,
      },
      {
        label: 'Blog',
        icon: 'i-lucide-book-open',
        to: '/blog',
        onSelect: closeMenu,
      },
      {
        label: 'Projects',
        icon: 'i-lucide-codepen',
        to: '/projects',
        onSelect: closeMenu,
      },
    ],
  ])
</script>

<style scoped>
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .slide-down-enter-from,
  .slide-down-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }

  .slide-down-enter-to,
  .slide-down-leave-from {
    transform: translateY(0);
    opacity: 1;
  }
</style>
