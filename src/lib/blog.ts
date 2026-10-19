import { getCollection, type CollectionEntry } from "astro:content";
import { getImageUrl } from "@/lib/cloudinary";

export type Post = CollectionEntry<"blog">;

export const postHref = (id: string) => `/blog/${id}`;

/** Every published post, newest first. Drafts are hidden in production. */
export const getPosts = async (): Promise<Post[]> =>
  (
    await getCollection("blog", ({ data }) =>
      import.meta.env.PROD ? !data.draft : true,
    )
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

/** Reads one attribute out of a raw HTML tag, trying each name in turn. */
const attribute = (tag: string, ...names: string[]) => {
  for (const name of names) {
    const match = tag.match(new RegExp(`\\b${name}=("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
    if (match) return match[2] ?? match[3] ?? match[4] ?? "";
  }
  return undefined;
};

const imageUrl = (publicId: string, cloudName?: string) =>
  getImageUrl(publicId, {
    format: "jpg",
    width: 1600,
    ...(cloudName ? { cloudName } : {}),
  });

/**
 * Turns the two supported image forms into ordinary Markdown images with absolute
 * Cloudinary URLs, so a reader of the copied text gets images rather than component tags.
 */
const imagesToMarkdown = (markdown: string) =>
  markdown
    .replace(/<cloudinary-picture\b[^>]*>(?:<\/cloudinary-picture>)?/gi, (tag) => {
      const src = attribute(tag, "src", "publicid");
      if (!src) return tag;
      const alt = attribute(tag, "alt") ?? "";
      const cloud = attribute(tag, "cloud-name", "cloudname");
      return `![${alt.replace(/]/g, "\\]")}](${imageUrl(src, cloud)})`;
    })
    .replace(
      /!\[([^\]]*)\]\(cloudinary:([^)\s]+)\)/g,
      (_match, alt, publicId) => `![${alt}](${imageUrl(publicId)})`,
    );

/** The whole post as Markdown, for the "Copy page" button. */
export const postMarkdown = (post: Post) => {
  const { title, description } = post.data;
  const body = imagesToMarkdown(post.body ?? "").trim();
  return [`# ${title}`, description ? `\n\n${description}` : "", body ? `\n\n${body}` : ""]
    .join("")
    .trim();
};
