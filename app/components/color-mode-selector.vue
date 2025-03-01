<template>
  <div class="flex space-x-2 items-center">
    <div class="text-gray-500 text-xs" v-if="showNextModelLabel">
      Change to {{ nextMode }}
    </div>
    <button
      @click="toggleMode"
      @mouseenter="showNextModelLabel = true"
      @mouseleave="showNextModelLabel = false"
      class="hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 text-gray-500">
      {{ nextModeIcon }}
    </button>
  </div>
</template>

<script setup lang="ts">
const showNextModelLabel = ref(false);
const colorMode = useColorMode();

const modes: Array<"system" | "light" | "dark"> = ["system", "light", "dark"];

const nextModeIcons: Record<"system" | "light" | "dark", string> = {
  system: "🌓",
  light: "🌕",
  dark: "🌑",
};

const nextMode = computed<string>(() => {
  const currentModeIndex = modes.indexOf(
    colorMode.preference as "system" | "light" | "dark"
  );
  const nextModeIndex = (currentModeIndex + 1) % modes.length;
  return modes[nextModeIndex] || "system";
});

const nextModeIcon = computed<string>(
  () => nextModeIcons[nextMode.value as "system" | "light" | "dark"]
);

const toggleMode = (): void => {
  colorMode.preference = nextMode.value as "system" | "light" | "dark";
};
</script>
