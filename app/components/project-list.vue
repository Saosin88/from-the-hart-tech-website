<template>
  <p class="mb-10">GitHub Projects</p>
  <section v-if="pending">Loading...</section>
  <section v-else-if="error">Something went wrong...try again!</section>
  <section v-else>
    <ul class="grid grid-cols-1 gap-4">
      <li
        v-for="repo in repos"
        :key="repo.id"
        class="border border-green-200 dark:border-green-800 rounded-sm p-4 hover:bg-gray-200 dark:hover:bg-gray-800 font-mono">
        <a :href="repo.html_url" target="_blank">
          <div class="flex items-center justify-between">
            <div class="font-semibold">{{ repo.name }}</div>
            <div>{{ repo.stargazers_count }} ★</div>
          </div>
          <p class="text-sm">{{ repo.description }}</p>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup>
const { error, status, data } = await useFetch(
  "https://api.github.com/users/Saosin88/repos"
);

const pending = computed(() => status.value === "pending");
const repos = computed(() =>
  (data.value ?? []).sort((a, b) => b.stargazers_count - a.stargazers_count)
);
</script>
