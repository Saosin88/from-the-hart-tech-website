<template>
  <!-- Main Container with Typography Settings -->
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-lg dark:prose-invert max-w-none">
    <!-- Introduction Section with Personal Bio -->
    <section class="mb-12">
      <!-- Bio Card with Accent Styling -->
      <UCard class="p-6">
        <!-- Personal Introduction with Highlighted Name -->
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mx-auto max-w-3xl">
          Hello! I'm <span class="font-semibold text-primary-700 dark:text-primary-400">Sheldon Hart</span>, a solutions architect with a passion for technology, development and architecture. I
          studied Computer Sciences and began my career at FNB, a leading bank in South Africa. Starting as a graduate developer, I have grown into a solutions architect, leveraging my expertise to
          design and implement innovative tech solutions.
        </p>
      </UCard>
    </section>

    <!-- Professional Information Section -->
    <section class="mb-12">
      <!-- Certifications Heading with Icon -->
      <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <UIcon name="i-lucide-award" class="mr-2 text-primary-600 dark:text-primary-400" />
        Certifications
      </h2>
      <!-- Certifications Component - Displays Professional Certifications and Badges -->
      <CertificationDisplay />

      <!-- Skills Heading with Icon -->
      <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <UIcon name="i-lucide-code" class="mr-2 text-primary-600 dark:text-primary-400" />
        Skills
      </h2>
      <!-- Skills Component - Displays Technical Skills and Expertise -->
      <SkillsDisplay />

      <!-- Professional Experience Heading with Icon -->
      <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <UIcon name="i-lucide-briefcase" class="mr-2 text-primary-600 dark:text-primary-400" />
        Professional Experience
      </h2>
      <!-- Experience Timeline Component - Shows Career Progression -->
      <ExperienceDisplay />

      <!-- Projects Heading with Icon -->
      <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <UIcon name="i-lucide-folder" class="mr-2 text-primary-600 dark:text-primary-400" />
        Projects
      </h2>
      <!-- Projects Component - Displays Notable Professional Projects -->
      <ProjectDisplay />

      <!-- Education Heading with Icon -->
      <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <UIcon name="i-lucide-graduation-cap" class="mr-2 text-primary-600 dark:text-primary-400" />
        Education
      </h2>
      <!-- Education Component - Shows Academic Background -->
      <EducationDisplay />

      <!-- Hobbies Heading with Icon -->
      <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <UIcon name="i-lucide-heart" class="mr-2 text-primary-600 dark:text-primary-400" />
        Hobbies and Interests
      </h2>
      <!-- Hobbies Component - Displays Personal Interests -->
      <HobbiesDisplay />

      <!-- Contact Heading with Icon -->
      <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <UIcon name="i-lucide-mail" class="mr-2 text-primary-600 dark:text-primary-400" />
        Contact Me
      </h2>
      <!-- Contact Card with Action Buttons -->
      <UCard class="p-6">
        <!-- Contact Button Group with External Links -->
        <div class="flex flex-wrap gap-4">
          <!-- LinkedIn Profile Button -->
          <UButton to="https://www.linkedin.com/in/sheldon-hart/" target="_blank" icon="i-lucide-linkedin" color="primary"> LinkedIn </UButton>
          <!-- Email Contact Button -->
          <UButton to="mailto:sheldon.hart88@gmail.com" target="_blank" icon="i-lucide-mail" color="primary"> Email Me </UButton>
        </div>
      </UCard>
    </section>

    <!-- Visual Separator Line -->
    <USeparator />

    <!-- Page Footer Message -->
    <div class="text-center my-8 text-gray-700 dark:text-gray-300">Thank you for visiting my page! I look forward to connecting with you.</div>
  </div>
</template>

<script setup lang="ts">
  // SEO Meta Tags Configuration
  // Optimizes page for search engines and social sharing
  useSeoMeta({
    title: 'About Me - Sheldon Hart', // Page title for browsers and search results
    description: 'Learn about Sheldon Hart, a solutions architect with expertise in Java, AWS, and enterprise architecture.', // Page summary for search results
    keywords: 'Sheldon Hart, solutions architect, software development, Java, AWS, enterprise architecture', // Keywords for search indexing
    robots: 'index, follow', // Search engine indexing instructions
    author: 'Sheldon Hart', // Content author information

    // Open Graph Tags for Social Media Sharing
    ogTitle: 'About Sheldon Hart - Solutions Architect',
    ogDescription: 'Learn about my journey, skills, and experience as a solutions architect and software developer.',
    ogImage: 'https://www.fromthehart.tech/logo/from-the-hart.png', // Image shown when shared on social media
    ogUrl: 'https://www.fromthehart.tech/about', // Canonical URL for the page

    // Twitter Card Tags for Twitter Sharing
    twitterTitle: 'About Sheldon Hart - Solutions Architect',
    twitterDescription: 'Learn about my journey, skills, and experience as a solutions architect and software developer.',
    twitterImage: 'https://www.fromthehart.tech/logo/from-the-hart.png',
    twitterCard: 'summary_large_image', // Twitter card format (large image)
    twitterSite: '@sheldonhart', // Twitter account associated with site
    twitterCreator: '@sheldonhart', // Twitter account of content creator
  })
</script>
