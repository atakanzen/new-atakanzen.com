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
    canonical: "https://atakanzen.com/writing",
  },
  twitter: {
    creator: "@atakanzen_",
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://atakanzen.com/writing",
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
  const posts = getDocuments(POSTS_COLLECTION, ["title", "slug"]);
  return (
    <div className="w-full">
      <div className="flex flex-col items-start gap-y-2 w-full">
        {posts.map((p, i) => (
          <Link
            key={i}
            href={`writing/${p.slug}`}
            className="flex w-full items-center justify-between hover:pl-4 focus:pl-4 transition-all duration-150"
          >
            <span className="underline text-base md:text-2xl">{p.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Posts;
