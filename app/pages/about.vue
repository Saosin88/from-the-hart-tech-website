<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-lg dark:prose-invert max-w-none">
    <section class="mb-12">
      <UCard class="p-6">
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mx-auto max-w-3xl">
          Hello! I'm <span class="font-semibold text-primary-700 dark:text-primary-400">Sheldon Hart</span>, a solutions architect with a passion for technology, development and architecture. I
          studied Computer Sciences and began my career at FNB, a leading bank in South Africa. Starting as a graduate developer, I have grown into a solutions architect, leveraging my expertise to
          design and implement innovative tech solutions.
        </p>
      </UCard>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <UIcon name="i-lucide-award" class="mr-2 text-primary-600 dark:text-primary-400" />
        Certifications
      </h2>
      <CertificationDisplay />

      <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <UIcon name="i-lucide-code" class="mr-2 text-primary-600 dark:text-primary-400" />
        Skills
      </h2>
      <SkillsDisplay />

      <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <UIcon name="i-lucide-briefcase" class="mr-2 text-primary-600 dark:text-primary-400" />
        Professional Experience
      </h2>
      <ExperienceDisplay />

      <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <UIcon name="i-lucide-folder" class="mr-2 text-primary-600 dark:text-primary-400" />
        Projects
      </h2>
      <ProjectDisplay />

      <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <UIcon name="i-lucide-graduation-cap" class="mr-2 text-primary-600 dark:text-primary-400" />
        Education
      </h2>
      <EducationDisplay />

      <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <UIcon name="i-lucide-heart" class="mr-2 text-primary-600 dark:text-primary-400" />
        Hobbies and Interests
      </h2>
      <HobbiesDisplay />

      <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <UIcon name="i-lucide-mail" class="mr-2 text-primary-600 dark:text-primary-400" />
        Contact Me
      </h2>
      <UCard class="p-6">
        <div class="flex flex-wrap gap-4">
          <UButton to="https://www.linkedin.com/in/sheldon-hart/" target="_blank" icon="i-lucide-linkedin" color="primary"> LinkedIn </UButton>
          <UButton to="mailto:sheldon.hart88@gmail.com" target="_blank" icon="i-lucide-mail" color="primary"> Email Me </UButton>
        </div>
      </UCard>
    </section>

    <USeparator />

    <div class="text-center my-8 text-gray-700 dark:text-gray-300">Thank you for visiting my page! I look forward to connecting with you.</div>
  </div>
</template>

<script setup lang="ts">
  useSeoMeta({
    title: 'About Me - Sheldon Hart',
    description: 'Learn about Sheldon Hart, a solutions architect with expertise in Java, AWS, and enterprise architecture.',
    keywords: 'Sheldon Hart, solutions architect, software development, Java, AWS, enterprise architecture',
    robots: 'index, follow',
    author: 'Sheldon Hart',
    ogTitle: 'About Sheldon Hart - Solutions Architect',
    ogDescription: 'Learn about my journey, skills, and experience as a solutions architect and software developer.',
    ogImage: 'https://www.fromthehart.tech/logo/from-the-hart.png',
    ogUrl: 'https://www.fromthehart.tech/about',
    twitterTitle: 'About Sheldon Hart - Solutions Architect',
    twitterDescription: 'Learn about my journey, skills, and experience as a solutions architect and software developer.',
    twitterImage: 'https://www.fromthehart.tech/logo/from-the-hart.png',
    twitterCard: 'summary_large_image',
    twitterSite: '@sheldonhart',
    twitterCreator: '@sheldonhart',
  })
</script>
