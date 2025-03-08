// Router Configuration Options
// This file defines custom behavior for the Vue Router used throughout the application

import type { RouterConfig } from '@nuxt/schema'

// Define TypeScript-Enhanced Router Options
// Customizes the behavior of navigation and page transitions
export default <RouterConfig>{
  // Scroll Behavior Function
  // Controls how the page scrolls when navigating between routes
  scrollBehavior(to, _from, savedPosition) {
    // Case 1: Restore Previous Scroll Position
    // When using browser back/forward buttons, restore the saved position
    if (savedPosition) {
      return savedPosition
    }

    // Case 2: Scroll to Anchor/Hash
    // When navigating to a URL with a hash fragment, smooth scroll to that element
    if (to.hash) {
      return {
        el: to.hash, // Target element selector
        behavior: 'smooth', // Use smooth scrolling animation
        top: 30, // Add offset from top (for fixed header)
      }
    }

    // Case 3: New Navigation
    // For all other navigation, scroll to top of page smoothly
    return { left: 0, top: 0, behavior: 'smooth' }
  },
}
