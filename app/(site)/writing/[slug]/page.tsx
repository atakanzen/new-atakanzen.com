import { POSTS_COLLECTION } from "@/lib/constants";
import { NextAppPage } from "@/types/next";
import "highlight.js/styles/github-dark.css";
import { getDocumentBySlug, getDocumentSlugs } from "outstatic/server";

const PostPage: NextAppPage<{ slug: string }> = async ({ params }) => {
  const { slug } = await params;
  const Post = getDocumentBySlug(POSTS_COLLECTION, slug);
  if (!Post) {
    console.error("No post found with ", slug);
  }

  return Post?.content;
};

export async function generateStaticParams() {
  const posts = getDocumentSlugs(POSTS_COLLECTION);
  return posts.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default PostPage;
