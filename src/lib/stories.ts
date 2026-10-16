import { getCollection } from "astro:content";

export const storyHref = (id: string) => `/stories/${id}`;

export const getStories = async () =>
  (await getCollection("stories")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
