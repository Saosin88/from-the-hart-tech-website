<template>
  <section>
    <div class="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
      <div class="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
        <img src="/assets/Business_SVG.svg" alt="" class="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
      </div>
      <div class="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
        <h1 class="text-5xl font-bold leading-none sm:text-6xl">Tech <span class="text-primary-600">Playground</span></h1>
        <p class="mt-6 mb-8 text-lg sm:mb-12">A website to showcase my work and allow me to experiment with new tech!</p>
        <div class="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
          <UButton to="/projects" class="px-8 py-3 text-lg font-semibold rounded">Check out my Projects</UButton>
          <UButton to="/about" color="neutral" class="px-8 py-3 text-lg font-semibold rounded">About me</UButton>
        </div>
      </div>
    </div>
    <div>
      <h1 class="text-5xl font-bold leading-none sm:text-6xl">My latest <ULink to="/blog" class="text-primary-600">Blog</ULink> posts</h1>
    </div>
    <div class="mt-6">
      <LatestBlogPosts :limit="3" />
    </div>
  </section>
</template>
