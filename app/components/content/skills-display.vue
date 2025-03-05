<template>
  <div class="not-prose my-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Category Cards -->
      <UCard v-for="(category, categoryIndex) in skillCategories" :key="categoryIndex" class="transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-800/40">
        <!-- Category Header -->
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg flex items-center justify-center">
            <UIcon :name="category.icon" class="text-primary-600 dark:text-primary-400 text-xl" />
          </div>
          <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100">{{ category.name }}</h3>
        </div>

        <!-- Skills -->
        <div class="flex flex-wrap gap-2">
          <div v-for="(skill, skillIndex) in category.skills" :key="skillIndex" class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <UIcon :name="skill.icon" class="text-base" />
            <span>{{ skill.name }}</span>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
  const skillCategories = [
    {
      name: 'Programming Languages',
      icon: 'i-lucide-code-2',
      skills: [
        { name: 'Java', icon: 'i-logos-java' },
        { name: 'JavaScript', icon: 'i-logos-javascript' },
      ],
    },
    {
      name: 'Frameworks',
      icon: 'i-lucide-package',
      skills: [
        { name: 'Vue.js/Nuxt', icon: 'i-logos-vue' },
        { name: 'Node.js', icon: 'i-logos-nodejs' },
        { name: 'Spring', icon: 'i-logos-spring' },
      ],
    },
    {
      name: 'Tools',
      icon: 'i-lucide-wrench',
      skills: [
        { name: 'Docker', icon: 'i-logos-docker-icon' },
        { name: 'Kubernetes', icon: 'i-logos-kubernetes' },
        { name: 'AWS', icon: 'i-logos-aws' },
        { name: 'Git', icon: 'i-logos-git-icon' },
      ],
    },
    {
      name: 'Databases',
      icon: 'i-lucide-database',
      skills: [
        { name: 'MySQL', icon: 'i-logos-mysql' },
        { name: 'Cassandra', icon: 'i-lucide-disc' },
      ],
    },
  ]
</script>
