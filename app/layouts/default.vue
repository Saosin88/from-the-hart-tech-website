<template>
  <div class="min-h-screen flex flex-col">
    <header class="w-full py-5 border-b border-neutral-200 dark:border-neutral-700 bg-neutral dark:bg-neutral-900">
      <div class="max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <NuxtImg src="/logo/from-the-hart.svg" alt="Logo" class="w-12 h-12" />
          <ULink to="/" @click="closeMenu" class="text-lg font-medium">From The Hart</ULink>
        </div>

        <div class="hidden md:block flex-1 px-4">
          <div class="flex justify-center">
            <UNavigationMenu orientation="horizontal" :items="items" />
          </div>
        </div>

        <div class="flex items-center gap-4">
          <ColorModeSelector />

          <!-- Desktop auth buttons -->
          <div class="hidden md:block">
            <div class="flex gap-3">
              <template v-if="isAuthenticated">
                <UButton @click="handleLogout" size="sm" color="primary" variant="soft">Logout</UButton>
              </template>
              <template v-else>
                <UButton href="/auth/login" size="sm">Login</UButton>
                <UButton href="/auth/register" color="neutral" size="sm">Sign Up</UButton>
              </template>
            </div>
          </div>

          <div class="relative md:hidden">
            <UButton id="mobile-button" @click="toggleMenu" :icon="isMenuOpen ? 'lucide:x' : 'lucide:align-justify'" variant="ghost" size="sm" />

            <transition name="slide-down">
              <div v-if="isMenuOpen" class="absolute right-0 mt-2 w-56 rounded-lg shadow-lg z-50 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <div class="p-3">
                  <UNavigationMenu orientation="vertical" :items="items" />
                </div>

                <div class="border-t border-neutral-200 dark:border-neutral-700 my-1"></div>

                <!-- Mobile auth buttons -->
                <div class="p-3 space-y-2">
                  <template v-if="isAuthenticated">
                    <UButton @click="handleLogout" class="w-full justify-center" size="sm" color="primary" variant="soft">Logout</UButton>
                  </template>
                  <template v-else>
                    <UButton href="/auth/login" @click="closeMenu" class="w-full justify-center" size="sm">Login</UButton>
                    <UButton href="/auth/register" @click="closeMenu" color="neutral" class="w-full justify-center" size="sm">Sign Up</UButton>
                  </template>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>
    <footer class="w-full py-6 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
      <!-- Footer content unchanged -->
      <div class="max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <!-- Copyright with dynamic year -->
          <div class="text-sm text-neutral-600 dark:text-neutral-400">&copy; {{ new Date().getFullYear() }} From The Hart. All rights reserved.</div>

          <!-- Contact options -->
          <div class="flex flex-wrap gap-3">
            <UButton to="https://www.linkedin.com/in/sheldon-hart/" target="_blank" icon="lucide:linkedin" color="primary" variant="soft" size="sm"> LinkedIn </UButton>
            <UButton to="mailto:sheldon@fromthehart.tech" target="_blank" icon="lucide:mail" color="primary" variant="soft" size="sm"> Email Me </UButton>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
  const isMenuOpen = ref(false)
  const authUtils = useAuthUtils()
  const isAuthenticated = ref(false)

  onMounted(() => {
    updateAuthStatus()
  })

  const route = useRoute()
  watch(() => route.path, updateAuthStatus)

  function updateAuthStatus() {
    // Only run on client side
    if (import.meta.client) {
      isAuthenticated.value = authUtils.isAuthenticated()
    }
  }

  function handleLogout() {
    authUtils.clearAccessToken()
    isAuthenticated.value = false
    closeMenu()
    navigateTo('/')
  }

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
  }

  function closeMenu() {
    isMenuOpen.value = false
  }

  const items = ref([
    [
      {
        label: 'Home',
        icon: 'lucide:home',
        to: '/',
        onSelect: closeMenu,
      },
      {
        label: 'About',
        icon: 'lucide:person-standing',
        to: '/about',
        onSelect: closeMenu,
      },
      {
        label: 'Blog',
        icon: 'lucide:book-open',
        to: '/blog',
        onSelect: closeMenu,
      },
      {
        label: 'Projects',
        icon: 'lucide:codepen',
        to: '/projects',
        onSelect: closeMenu,
      },
    ],
  ])
</script>

<style scoped>
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
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
