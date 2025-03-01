import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: "blog/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        keywords: z.string(),
        robots: z.string(),
        author: z.string(),
        ogTitle: z.string(),
        ogDescription: z.string(),
        ogImage: z.string(),
        ogUrl: z.string(),
        twitterTitle: z.string(),
        twitterDescription: z.string(),
        twitterImage: z.string(),
        twitterCard: z.string(),
        twitterSite: z.string(),
        twitterCreator: z.string(),
      }),
    }),
  },
});
