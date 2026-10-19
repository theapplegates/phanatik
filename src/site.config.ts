/**
 * One place to change the site. Edit these values and the navigation,
 * footer, About page, RSS feed and SEO tags all follow.
 */
export const site = {
  name: "Living Life",
  tagline: "Notes on software, tools, and the work of making things.",
  description:
    "Living Life is a personal blog by Paul Applegate about software, tools, and the craft of building things.",
  author: {
    name: "Paul Applegate",
    role: "Writer",
    bio: "I write about software, tools, and the craft of building things. Living Life is where I keep those notes.",
    links: [] as { label: string; href: string }[],
  },
  /**
   * Default social preview image, as a Cloudinary public ID (see the
   * responsive image workflow). Replace it with one of your own uploads.
   */
  ogImage: "images/blog/resource-database-hDGU7nl8q6I-unsplash",
  ogCloudName: "paulapplegate-com",
  nav: [
    { label: "Writing", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "RSS", href: "/rss.xml" },
  ],
};
