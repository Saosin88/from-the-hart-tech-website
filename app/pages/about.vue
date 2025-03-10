<template>
  <section class="py-8">
    <div class="container mx-auto px-6">
      <div class="mb-12">
        <h1 class="text-5xl font-bold leading-none sm:text-6xl text-center mb-8">About <span class="text-primary-600">Me</span></h1>

        <div class="mx-auto">
          <UCard class="p-6">
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Hello! I'm <span class="font-semibold text-primary-700 dark:text-primary-400">Sheldon Hart</span>, a solutions architect with over 15 years of experience creating innovative technology
              solutions. My professional journey began after completing my BSc Computer Science degree, and then joining First National Bank (FNB), one of South Africa's biggest financial
              institutions. What started as a graduate developer position evolved into a fulfilling career as a solutions architect, where I now design and implement enterprise-scale systems that
              balance technical excellence with business value.
            </p>
          </UCard>
        </div>
      </div>

      <div class="prose prose-lg dark:prose-invert max-w-none">
        <section class="mb-12">
          <!-- Standardize section headings -->
          <h2 id="certifications" class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <UIcon name="i-lucide-award" class="mr-2 text-primary-600 dark:text-primary-400" />
            Certifications
          </h2>

          <AboutCertificationDisplay />

          <h2 id="skills" class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <UIcon name="i-lucide-code" class="mr-2 text-primary-600 dark:text-primary-400" />
            Skills
          </h2>

          <AboutSkillsDisplay />

          <h2 id="experience" class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <UIcon name="i-lucide-briefcase" class="mr-2 text-primary-600 dark:text-primary-400" />
            Professional Experience
          </h2>

          <AboutExperienceDisplay />

          <h2 id="projects" class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <UIcon name="i-lucide-folder" class="mr-2 text-primary-600 dark:text-primary-400" />
            Projects
          </h2>

          <AboutProjectDisplay />

          <h2 id="education" class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <UIcon name="i-lucide-graduation-cap" class="mr-2 text-primary-600 dark:text-primary-400" />
            Education
          </h2>

          <AboutEducationDisplay />

          <h2 id="hobbies" class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <UIcon name="i-lucide-heart" class="mr-2 text-primary-600 dark:text-primary-400" />
            Hobbies and Interests
          </h2>

          <AboutHobbiesDisplay />

          <h2 id="contact" class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
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
    </div>
  </section>
</template>

<script setup lang="ts">
  useSeoMeta({
    title: 'About Sheldon Hart - From The Hart Tech',
    description: 'Professional profile of Sheldon Hart, Solutions Architect with 15+ years of experience in architecture, design, and development at FNB.',
    keywords: 'Sheldon Hart, solutions architect, enterprise architecture, microservices, AWS, Java, domain-driven design, FNB, banking technology, cloud architecture',
    robots: 'index, follow',
    author: 'Sheldon Hart',

    ogTitle: 'About Sheldon Hart | Solutions Architect',
    ogDescription: 'Learn about my journey from developer to solutions architect, skills in architecture, design, and development.',
    ogImage: 'https://www.fromthehart.tech/logo/from-the-hart-social.png',
    ogUrl: 'https://www.fromthehart.tech/about',

    twitterTitle: 'Sheldon Hart - Enterprise Solutions Architect Portfolio',
    twitterDescription: 'View my professional experience at FNB, certifications including AWS Solutions Architect, and expertise in enterprise-scale system design.',
    twitterImage: 'https://www.fromthehart.tech/logo/from-the-hart-social.png',
    twitterCard: 'summary_large_image',
    twitterSite: '@SheldonHart7',
    twitterCreator: '@SheldonHart7',
  })
</script>
