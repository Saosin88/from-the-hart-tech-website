<template>
  <div class="flex space-x-2 items-center">
    <div class="text-gray-500 text-xs" v-if="showNextModelLabel">
      Change to {{ nextMode }}
    </div>
    <button
      @click="toggleMode"
      @mouseenter="showNextModelLabel = true"
      @mouseleave="showNextModelLabel = false"
      class="hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 text-gray-500 text-4xl md:text-base">
      {{ nextModeIcon }}
    </button>
  </div>
</template>

<script setup>
const showNextModelLabel = ref(false);
const colorMode = useColorMode();

const modes = ["system", "light", "dark"];

const nextModeIcons = {
  system: "🌓",
  light: "🌕",
  dark: "🌑",
};

const nextMode = computed(() => {
  const currentModeIndex = modes.indexOf(colorMode.preference);
  const nextModeIndex = (currentModeIndex + 1) % modes.length;
  return modes[nextModeIndex] || "system";
});

const nextModeIcon = computed(() => nextModeIcons[nextMode.value]);

const toggleMode = () => {
  colorMode.preference = nextMode.value;
};
</script>
