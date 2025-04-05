import { POSTS_COLLECTION } from "@/lib/constants";
import { Sitemap } from "@/types/general";
import { MetadataRoute } from "next";
import { OstDocument } from "outstatic";
import { getDocuments } from "outstatic/server";

function generateSiteMap(posts: OstDocument[]): Sitemap {
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
      url: `https://atakanzen.com/writing/${p.slug}`,
      priority: 0.7,
      lastModified: new Date(p.publishedAt),
    })),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getDocuments(POSTS_COLLECTION, ["publishedAt", "slug"]);

  return generateSiteMap(posts);
}
