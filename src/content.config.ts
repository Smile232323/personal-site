import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

export const BLOG_PATH = "src/content/posts";

const commonFields = {
  title: z.string(),
  description: z.string().optional(),
  draft: z.boolean().default(false),
  pubDatetime: z.date().optional(),
  modDatetime: z.date().optional().nullable(),
  tags: z.array(z.string()).default([]),
  source: z.url().optional(),
  sourceDate: z.coerce.date().optional(),
  curatedAt: z.coerce.date().optional(),
  sourceNote: z.string().optional(),
};

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
      source: z.url().optional(),
      sourceDate: z.coerce.date().optional(),
      curatedAt: z.coerce.date().optional(),
      sourceNote: z.string().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
    summary: z.string().optional(),
    skills: z.array(z.string()).default([]),
    experience: z.array(z.string()).default([]),
    education: z.array(z.string()).default([]),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    ...commonFields,
    title: z.string(),
    description: z.string().default(""),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().default(false),
    status: z.enum(["active", "maintained", "archived"]).default("active"),
    stack: z.array(z.string()).default([]),
    repo: z.url().optional(),
    demo: z.url().optional(),
    featured: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/publications",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    draft: z.boolean().default(false),
    venue: z.string().optional(),
    year: z.number().optional(),
    url: z.url().optional(),
    source: z.url().optional(),
    sourceDate: z.coerce.date().optional(),
    curatedAt: z.coerce.date().optional(),
    sourceNote: z.string().optional(),
  }),
});

export const collections = { posts, pages, notes, projects, publications };
