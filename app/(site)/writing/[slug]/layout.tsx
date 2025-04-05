import { POSTS_COLLECTION } from "@/lib/constants";
import { getDocumentBySlug } from "outstatic/server";

export default async function MdxLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getDocumentBySlug(POSTS_COLLECTION, slug, ["publishedAt"]);
  if (!post) {
    throw new Error("No post found");
  }
  const publishedAt = new Date(post.publishedAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col justify-center py-8 gap-4 xs:max-w-xs sm:max-w-xl md:max-w-2xl xl:max-w-full xl:items-center mx-auto">
      <span className="text-gray-500 text-base md:text-xl font-bold">
        {publishedAt}
      </span>
      <article className="prose xl:prose-xl 2xl:prose-2xl prose-blue pt-4 dark:prose-invert prose-a:underline xs:prose-pre:max-w-sm sm:prose-pre:max-w-md md:prose-pre:max-w-none prose-a:text-blue-500 prose-pre:bg-[#0D1117] dark">
        {children}
      </article>
    </div>
  );
}
