import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { levels, topics } from './lib/taxonomy';

const questions = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.md',
    base: './src/content/questions',
  }),
  schema: z.object({
    title: z.string(),
    topic: z.enum(topics),
    section: z.string(),
    level: z.enum(levels),
    tags: z.array(z.string()).default([]),
    order: z.number().int(),
  }),
});

export const collections = { questions };
