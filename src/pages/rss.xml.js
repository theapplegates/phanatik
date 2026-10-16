import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const stories = (await getCollection("stories")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  return rss({
    title: "The Absurdist",
    description: "World sports news, every day: football, basketball, tennis, cycling, Formula 1 and athletics.",
    site: context.site,
    items: stories.map((story) => ({
      title: story.data.title,
      pubDate: story.data.pubDate,
      description: story.data.description,
      link: `/stories/${story.id}/`,
    })),
  });
}
