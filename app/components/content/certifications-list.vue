<template>
  <div class="not-prose space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CertificationCard v-for="(cert, index) in certifications" :key="index" :certification="cert" />
    </div>
  </div>
</template>

<script setup>
  const certifications = [
    {
      name: 'AWS Certified Solutions Architect – Associate',
      institution: 'Amazon Web Services (AWS)',
      credentialUrl: 'https://www.credly.com/badges/af7dd9e8-000e-442a-ae44-7728edaae9f3/public_url',
      image: '/assets/aws-architect-associate.png',
    },
    {
      name: 'TOGAF® Certification Program',
      institution: 'The Open Group',
      credentialUrl: 'https://www.credly.com/badges/4cac01a9-6796-42a1-b28d-d01a9aa0416b/public_url',
      image: '/assets/togaf.png',
    },
    {
      name: 'Digital Transformation: Platform Strategies for Success',
      institution: 'Emeritus',
      credentialUrl: 'https://certificates.emeritus.org/d775348b-544f-466c-9986-1fbb71a4fb91',
      image: '/assets/emeritus.png',
    },
  ]
</script>
