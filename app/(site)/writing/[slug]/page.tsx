import { POSTS_COLLECTION } from "@/lib/constants";
import { NextAppPage } from "@/types/next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getDocumentBySlug, getDocumentSlugs, load } from "outstatic/server";

import { ibmPlexMono } from "@/fonts";
import { Post } from "@/types/cms";
import { Code } from "bright";
import { Metadata } from "next";
import Image, { ImageProps } from "next/image";
import { DetailedHTMLProps, HTMLAttributes, ImgHTMLAttributes } from "react";
import rehypeCallouts from "rehype-callouts";
import remarkGfm from "remark-gfm";

const components = {
  a: (props: HTMLAttributes<HTMLAnchorElement>) => (
    <>
      <a {...props} target="_blank" rel="noreferrer" />
      <span className="inline-flex -z-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-3.5 h-3.5 relative top-0 right-0 text-current -z-50"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </span>
    </>
  ),
  img: (
    props: DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >
  ) => (
    <Image
      {...(props as ImageProps)}
      className="w-full h-auto rounded-lg"
      width={0}
      height={0}
      sizes="100vw"
      priority
      alt={""}
    />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <Code
      {...props}
      theme={"dracula"}
      lineNumbers
      className={ibmPlexMono.className}
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code {...props} className={ibmPlexMono.className} />
  ),
};

type GenerateMetadataProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params;

  const db = await load();

  const post = await db
    .find<Post>({ collection: POSTS_COLLECTION, slug }, [
      "title",
      "excerpt",
      "slug",
      "author",
    ])
    .first();

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/writing/${post.slug}`,
    },
    authors: {
      name: post.author?.name,
    },
  };
}

const PostPage: NextAppPage<{ slug: string }> = async ({ params }) => {
  const { slug } = await params;
  const post = getDocumentBySlug(POSTS_COLLECTION, slug, ["content"]);

  if (post === null) {
    throw new Error("post not found");
  }

  return (
    <MDXRemote
      source={post.content}
      components={components}
      options={{
        mdxOptions: {
          rehypePlugins: [[rehypeCallouts, { theme: "github" }]],
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
};

export async function generateStaticParams() {
  const posts = getDocumentSlugs(POSTS_COLLECTION);
  return posts.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default PostPage;
