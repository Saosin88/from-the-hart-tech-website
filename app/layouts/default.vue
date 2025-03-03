<template>
  <div class="max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8">
    <header class="flex justify-between items-center mt-5 w-full">
      <div class="flex justify-between items-center w-full">
        <div class="flex-shrink-0 flex items-center space-x-4">
          <img src="/logo/from-the-hart.png" alt="Logo" class="h-8 w-8" />
          <ULink to="/">From The Hart</ULink>
        </div>

        <div class="flex-grow text-center">
          <Menu />
        </div>

        <div class="flex-shrink-0 flex items-center space-x-4">
          <ColorModeSelector />
          <UButton to="/login">Login</UButton>
          <UButton to="/signup" color="neutral">Sign Up</UButton>
        </div>
      </div>
    </header>

    <main class="p-2 mt-10 w-full">
      <slot />
    </main>
  </div>
</template>
