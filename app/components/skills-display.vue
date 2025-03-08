<template>
  <!-- Main Skills Display Container with Vertical Spacing -->
  <div class="my-6">
    <!-- Responsive Grid Layout - 1 Column on Mobile, 2 Columns on Medium+ Screens -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Individual Skill Category Cards with Hover Effects -->
      <UCard v-for="(category, categoryIndex) in skillCategories" :key="categoryIndex" class="transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-800/40">
        <!-- Category Header with Icon and Title -->
        <div class="flex items-center gap-3 mb-4">
          <!-- Category Icon with Accent Background -->
          <div class="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg flex items-center justify-center">
            <UIcon :name="category.icon" class="text-primary-600 dark:text-primary-400 text-xl" />
          </div>
          <!-- Category Name with Consistent Styling -->
          <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100">{{ category.name }}</h3>
        </div>

        <!-- Skills Container with Wrapping Flex Layout -->
        <div class="flex flex-wrap gap-2">
          <!-- Individual Skill Pills with Icons -->
          <div v-for="(skill, skillIndex) in category.skills" :key="skillIndex" class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <!-- Skill-Specific Icon -->
            <UIcon :name="skill.icon" class="text-base" />
            <!-- Skill Name -->
            <span>{{ skill.name }}</span>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Skill Categories Data Structure
  // Each category contains:
  // - name: Category title
  // - icon: Category icon identifier
  // - skills: Array of skills in this category, each with:
  //   - name: Skill name
  //   - icon: Skill-specific icon identifier
  const skillCategories = [
    {
      name: 'Architecture & Design',
      icon: 'i-lucide-layout-template',
      skills: [
        { name: 'Enterprise Architecture', icon: 'i-lucide-building-2' },
        { name: 'Domain-Driven Design', icon: 'i-lucide-box-select' },
        { name: 'API Design', icon: 'i-lucide-webhook' },
        { name: 'Software Patterns', icon: 'i-lucide-iteration-cw' },
        { name: 'Scalable Systems', icon: 'i-lucide-expand' },
      ],
    },
    {
      name: 'Programming Languages',
      icon: 'i-lucide-code-2',
      skills: [
        { name: 'Java', icon: 'i-logos-java' },
        { name: 'JavaScript/TypeScript', icon: 'i-logos-javascript' },
        { name: 'PHP', icon: 'i-logos-php' },
      ],
    },
    {
      name: 'Frameworks',
      icon: 'i-lucide-package',
      skills: [
        { name: 'Spring Boot', icon: 'i-logos-spring' },
        { name: 'Node.js', icon: 'i-logos-nodejs' },
        { name: 'Express.js', icon: 'i-lucide-server' },
        { name: 'Vue.js/Nuxt', icon: 'i-logos-vue' },
        { name: 'WordPress', icon: 'i-logos-wordpress-icon' },
      ],
    },
    {
      name: 'Databases',
      icon: 'i-lucide-database',
      skills: [
        { name: 'MySQL/MariaDB', icon: 'i-logos-mysql' },
        { name: 'Cassandra', icon: 'i-lucide-disc' },
        { name: 'InfluxDB', icon: 'i-logos-influxdb' },
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
        { name: 'GitHub Actions', icon: 'i-logos-github-actions' },
        { name: 'Swagger', icon: 'i-logos-swagger' },
        { name: 'Prometheus', icon: 'i-logos-prometheus' },
        { name: 'Grafana', icon: 'i-logos-grafana' },
        { name: 'ELK Stack', icon: 'i-logos-elasticsearch' },
        { name: 'Jira', icon: 'i-logos-jira' },
        { name: 'Confluence', icon: 'i-logos-confluence' },
        { name: 'VS Code', icon: 'i-logos-visual-studio-code' },
        { name: 'IntelliJ IDEA', icon: 'i-logos-intellij-idea' },
      ],
    },
  ]
</script>
