import { POST_PATHS, getPostSlug, postFilePaths } from "@/lib/mdx";
import fs from "fs";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import path from "path";
import React from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { getOpenGraphImage } from "@/lib/opengraph";
import { IBM_Plex_Mono } from "next/font/google";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

type Props = {
  mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
};

// Injecting custom components for MDX Render Engine
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
  // p: (props: any) => <p {...props} className={`${inter.className}`}></p>,
  // li: (props: any) => <li {...props} className={`${inter.className}`}></li>,
};

const PostPage = ({
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        title={mdxSource.frontmatter.title}
        titleTemplate="%s - Atakan Zengin - Blog"
        description={mdxSource.frontmatter.excerpt}
        openGraph={{
          type: "article",
          images: [getOpenGraphImage(mdxSource.frontmatter.title)],
          article: {
            publishedTime: new Date(mdxSource.frontmatter.date).toISOString(),
          },
        }}
        twitter={{
          handle: "@atakanzen_",
          cardType: "summary_large_image",
        }}
        canonical={`https://atakanzen.com/blog/${mdxSource.frontmatter.slug}`}
        additionalMetaTags={[
          {
            name: "date",
            content: new Date(mdxSource.frontmatter.date).toDateString(),
          },
        ]}
      ></NextSeo>
      <div className="flex flex-col items- justify-center px-4 py-8 divide-y-2 gap-4 xs:max-w-xs sm:max-w-xl md:max-w-2xl mx-auto">
        <div className="flex items-center gap-2 font-semibold">
          <Link href="/" className="underline underline-offset-2">
            home
          </Link>
          <span>/</span>
          <Link href="/writing" className="underline underline-offset-2">
            writing
          </Link>
          <span>/</span>
          <span>{mdxSource.frontmatter.slug}</span>
        </div>
        <article className="prose xl:prose-lg prose-blue  pt-4 dark:prose-invert prose-a:underline prose-pre:xs:max-w-sm prose-pre:sm:max-w-md prose-pre:md:max-w-none  prose-a:text-lime-500 prose-pre:dark:bg-neutral-800 prose-pre:bg-neutral-900">
          <MDXRemote {...mdxSource} components={components} lazy />
        </article>
        <div className="flex items-center w-full gap-2 font-semibold pt-4">
          <Link href="/" className="underline underline-offset-2 ">
            home
          </Link>
          <span>/</span>
          <Link href="/writing" className="underline underline-offset-2 ">
            writing
          </Link>
          <span>/</span>
          <span>{mdxSource.frontmatter.slug}</span>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(POST_PATHS, `${params?.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const mdxSource = await serialize(source, { parseFrontmatter: true });

  return {
    props: {
      mdxSource,
    },
  };
};

export const getStaticPaths: GetStaticPaths = (context) => {
  const paths = postFilePaths
    .map((fp) => getPostSlug(fp))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
