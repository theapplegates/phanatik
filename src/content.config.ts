import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { sports } from "@/lib/sports";

const writers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writers" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      bio: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
    }),
});

const stories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/stories" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      description: z.string(),
      sport: z.enum(sports),
      writer: reference("writers"),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      placement: z.enum(["lead", "featured", "standard"]).default("standard"),
      live: z.boolean().default(false),
      members: z.boolean().default(false),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: ["**/*.md", "!**/_*"], base: "./src/content/blog" }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      coverImage: z.string().optional(),
      coverAlt: z.string().optional(),
      coverCloudName: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
    })
    .refine((data) => !data.coverImage || Boolean(data.coverAlt), {
      message: "coverAlt is required when coverImage is set",
      path: ["coverAlt"],
    }),
});

const legal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/legal" }),
  schema: z.object({
    page: z.string(),
    pubDate: z.coerce.date(),
  }),
});

export const collections = {
  writers,
  stories,
  blog,
  legal,
};
