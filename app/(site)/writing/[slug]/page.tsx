import { POSTS_COLLECTION } from "@/lib/constants";
import { NextAppPage } from "@/types/next";
import "highlight.js/styles/github-dark.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getDocumentBySlug, getDocumentSlugs } from "outstatic/server";

import Image, { ImageProps } from "next/image";
import rehypeCallouts from "rehype-callouts";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const components = {
  a: (props: any) => (
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
  img: (props: any) => (
    <Image
      className="w-full h-auto"
      width={0}
      height={0}
      sizes="100vw"
      {...(props as ImageProps)}
    />
  ),
};

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
          rehypePlugins: [
            [rehypeHighlight],
            [rehypeCallouts, { theme: "github" }],
          ],
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
