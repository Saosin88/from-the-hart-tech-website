<template>
  <!-- Main Container with Responsive Padding -->
  <div class="max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <header class="flex items-center justify-between w-full py-5">
      <!-- Logo and Site Title -->
      <div class="flex items-center space-x-4">
        <img src="/logo/from-the-hart.png" alt="Logo" class="w-8 h-8" />
        <ULink to="/" @click="closeMenu" class="text-lg font-medium">From The Hart</ULink>
      </div>

      <!-- Desktop Navigation Menu - Hidden on Mobile -->
      <div class="hidden md:block flex-1 px-4">
        <div class="flex justify-center">
          <UNavigationMenu orientation="horizontal" :items="items" />
        </div>
      </div>

      <!-- Right Side Actions -->
      <div class="flex items-center gap-4">
        <!-- Theme Toggle Button -->
        <ColorModeSelector />

        <!-- Desktop Authentication Buttons - Hidden on Mobile -->
        <div class="hidden md:block">
          <div class="flex gap-3">
            <UButton href="#" size="sm">Login</UButton>
            <UButton href="#" color="neutral" size="sm">Sign Up</UButton>
          </div>
        </div>

        <!-- Mobile Menu Toggle and Dropdown - Visible on Mobile Only -->
        <div class="relative md:hidden">
          <!-- Toggle Button with Dynamic Icon -->
          <UButton @click="toggleMenu" :icon="isMenuOpen ? 'i-lucide-x' : 'i-lucide-align-justify'" variant="ghost" size="sm" />

          <!-- Mobile Dropdown Menu with Animation -->
          <transition name="slide-down">
            <div v-if="isMenuOpen" class="absolute right-0 mt-2 w-56 rounded-lg shadow-lg z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <!-- Navigation Items -->
              <div class="p-3">
                <UNavigationMenu orientation="vertical" :items="items" />
              </div>

              <!-- Divider Line -->
              <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>

              <!-- Authentication Buttons for Mobile -->
              <div class="p-3 space-y-2">
                <UButton href="#" @click="closeMenu" class="w-full justify-center" size="sm"> Login </UButton>
                <UButton href="#" @click="closeMenu" color="neutral" class="w-full justify-center" size="sm"> Sign Up </UButton>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="w-full py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
  // Mobile Menu State Management
  // Tracks whether the mobile menu is currently displayed
  const isMenuOpen = ref(false)

  // Menu Toggle Function
  // Switches the mobile menu between open and closed states
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  // Menu Close Function
  // Used when a navigation item is selected or when returning to home
  const closeMenu = () => {
    isMenuOpen.value = false
  }

  // Navigation Items Configuration
  // Define the main navigation links with their icons and actions
  const items = ref([
    [
      {
        label: 'About', // Menu item text
        icon: 'i-lucide-person-standing', // Icon for the menu item
        to: '/about', // Target route
        onSelect: closeMenu, // Action to perform when selected
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
  /* Transition Animation for Mobile Menu Dropdown */
  /* Controls how the menu appears and disappears */
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  /* Starting/Ending State for Opening Animation */
  .slide-down-enter-from,
  .slide-down-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }

  /* Ending/Starting State for Opening Animation */
  .slide-down-enter-to,
  .slide-down-leave-from {
    transform: translateY(0);
    opacity: 1;
  }
</style>
