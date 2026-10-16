import { getCollection } from "astro:content";

export const writerHref = (id: string) => `/writers/${id}`;

export const getWriters = async () => getCollection("writers");
