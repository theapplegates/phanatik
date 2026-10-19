---
title: "Sample post: images inside a post"
description: "A sample post that includes a body image, using the existing Cloudinary pipeline."
pubDate: 2026-10-10
coverImage: "images/blog/nenad-radojcic-kIQoxt8-srU-unsplash"
coverAlt: "A sample cover photo"
coverCloudName: "paulapplegate-com"
tags: ["images", "astro"]
---

This sample post shows how an image sits inside the body of a piece. Both forms below use the same pipeline as the cover: JPEG XL, then AVIF, then WebP.

The explicit tag, as printed by the uploader:

<cloudinary-picture src="images/blog/resource-database-hDGU7nl8q6I-unsplash" cloud-name="paulapplegate-com" alt="A sample body image"></cloudinary-picture>

And the shorter shorthand once an image is already in the manifest:

![A sample body image](cloudinary:images/blog/Gulfstream-G800)

The browser picks the first format it supports, then a width that fits the column.
