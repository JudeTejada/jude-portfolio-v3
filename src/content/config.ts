import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishedAt: z.string(),
    summary: z.string(),
    image: z.string().optional(),
    showHome: z.boolean().optional().default(false),
    isPublished: z.boolean().optional().default(true),
    latestArticle: z.boolean().optional().default(false),
    labels: z.array(z.string()).optional().default([]),
  }),
});

const projectCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishedAt: z.string(),
    summary: z.string(),
    image: z.string().optional(),
    showHome: z.boolean().optional().default(false),
    isPublished: z.boolean().optional().default(true),
    labels: z.array(z.string()).optional().default([]),
    technologies: z.array(z.string()).optional().default([]),
    demoUrl: z.string().optional(),
    githubUrl: z.string().optional(),
  }),
});

const craftCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishedAt: z.string(),
    summary: z.string(),
    image: z.string().optional(),
    showHome: z.boolean().optional().default(false),
    isPublished: z.boolean().optional().default(true),
    labels: z.array(z.string()).optional().default([]),
    ogImage: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  project: projectCollection,
  craft: craftCollection,
};