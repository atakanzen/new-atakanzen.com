import { Metadata } from "next";
import Link from "next/link";
import { getDocuments } from "outstatic/server";

import { POSTS_COLLECTION } from "@/lib/constants";
import { getOpenGraphImage } from "@/lib/opengraph";

export const metadata: Metadata = {
  title: "Atakan Zengin - Blog",
  description:
    "This is my blog which you can find my posts and notes about the things I'm working with or find interesting.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/writing`,
  },
  twitter: {
    creator: "@atakanzen_",
    card: "summary_large_image",
  },
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/writing`,
    title: "Atakan Zengin's Blog",
    siteName: "Blog - Atakan Zengin",
    description:
      "This is my blog which you can find my posts and notes about the things I'm working with or find interesting.",
    images: [getOpenGraphImage("Atakan Zengin's Blog")],
  },
  keywords:
    "Atakan Zengin Blog, Technology Blog, Software Blog, Blog Posts, Zengin Blog, Atakan Zengin's Blog",
};

const Posts = async () => {
  const posts = getDocuments(POSTS_COLLECTION, [
    "title",
    "slug",
    "description",
    "coverImage",
    "publishedAt",
  ]);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-4xl mb-8 text-center text-[var(--foreground-rgb)]">
        Writing
      </h1>
      <div className="flex flex-col items-left gap-y-8">
        {posts.map((p, i) => (
          <Link key={i} href={`/writing/${p.slug}`} className="group block">
            {p.coverImage && (
              <div
                className="h-48 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${p.coverImage})` }}
              ></div>
            )}
            <div className="p-4">
              <h2 className="text-2xl mb-2 group-hover:underline text-[var(--foreground-rgb)]">
                {p.title}
              </h2>
              {p.description && (
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {p.description}
                </p>
              )}
              <div className="text-sm text-gray-500">
                <span>
                  {new Date(p.publishedAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Posts;
