<template>
  <div class="my-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard v-for="(category, categoryIndex) in skillCategories" :key="categoryIndex" class="transition-all duration-200 hover:shadow-md dark:hover:shadow-neutral-800/40">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg flex items-center justify-center">
            <UIcon :name="category.icon" class="text-primary-600 dark:text-primary-400 text-xl" />
          </div>

          <h3 class="font-semibold text-lg text-neutral-900 dark:text-neutral-100">{{ category.name }}</h3>
        </div>

        <div class="flex flex-wrap gap-2">
          <div v-for="(skill, skillIndex) in category.skills" :key="skillIndex" class="bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <UIcon :name="skill.icon" class="text-base" />

            <span>{{ skill.name }}</span>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  const skillCategories = [
    {
      name: 'Architecture & Design',
      icon: 'lucide:layout-template',
      skills: [
        { name: 'Enterprise Architecture', icon: 'lucide:building-2' },
        { name: 'Domain-Driven Design', icon: 'lucide:box-select' },
        { name: 'API Design', icon: 'lucide:webhook' },
        { name: 'Software Patterns', icon: 'lucide:iteration-cw' },
        { name: 'Scalable Systems', icon: 'lucide:expand' },
      ],
    },
    {
      name: 'Programming Languages',
      icon: 'lucide:code-2',
      skills: [
        { name: 'Java', icon: 'logos:java' },
        { name: 'JavaScript/TypeScript', icon: 'logos:javascript' },
        { name: 'PHP', icon: 'logos:php' },
      ],
    },
    {
      name: 'Frameworks',
      icon: 'lucide:package',
      skills: [
        { name: 'Spring Boot', icon: 'logos:spring' },
        { name: 'Node.js', icon: 'logos:nodejs' },
        { name: 'Express.js', icon: 'lucide:server' },
        { name: 'Vue.js/Nuxt', icon: 'logos:vue' },
        { name: 'WordPress', icon: 'logos:wordpress-icon' },
      ],
    },
    {
      name: 'Databases',
      icon: 'lucide:database',
      skills: [
        { name: 'MySQL/MariaDB', icon: 'logos:mysql' },
        { name: 'Cassandra', icon: 'lucide:disc' },
        { name: 'InfluxDB', icon: 'logos:influxdb' },
      ],
    },
    {
      name: 'Application Servers',
      icon: 'lucide:server-cog',
      skills: [
        { name: 'Tomcat', icon: 'logos:tomcat' },
        { name: 'Wildfly/JBoss', icon: 'lucide:server' },
        { name: 'Jetty', icon: 'lucide:server' },
      ],
    },
    {
      name: 'Tools',
      icon: 'lucide:wrench',
      skills: [
        { name: 'Docker', icon: 'logos:docker-icon' },
        { name: 'Kubernetes', icon: 'logos:kubernetes' },
        { name: 'AWS', icon: 'logos:aws' },
        { name: 'Git', icon: 'logos:git-icon' },
        { name: 'GitHub Actions', icon: 'logos:github-actions' },
        { name: 'Swagger', icon: 'logos:swagger' },
        { name: 'Prometheus', icon: 'logos:prometheus' },
        { name: 'Grafana', icon: 'logos:grafana' },
        { name: 'ELK Stack', icon: 'logos:elasticsearch' },
        { name: 'Jira', icon: 'logos:jira' },
        { name: 'Confluence', icon: 'logos:confluence' },
        { name: 'VS Code', icon: 'logos:visual-studio-code' },
        { name: 'IntelliJ IDEA', icon: 'logos:intellij-idea' },
      ],
    },
  ]
</script>
