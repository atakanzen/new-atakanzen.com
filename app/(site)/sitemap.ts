import { getAllPosts } from "@/lib/mdx";
import { Post, Sitemap } from "@/types/general";
import { MetadataRoute } from "next";

function generateSiteMap(posts: Post[]): Sitemap {
  return [
    {
      url: "https://atakanzen.com",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://atakanzen.com/writing",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...posts.map((p) => ({
      url: `https://atakanzen.com/writing/${p.path}`,
      priority: 0.7,
      lastModified: new Date(p.metadata.date),
    })),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  return generateSiteMap(posts);
}
