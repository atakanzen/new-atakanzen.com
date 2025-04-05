import { getPostMetadata } from "@/lib/mdx";

export default async function MdxLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { matter } = await getPostMetadata(`${slug}.mdx`);

  return (
    <div className="flex flex-col justify-center py-8 gap-4 xs:max-w-xs sm:max-w-xl md:max-w-2xl xl:max-w-full xl:items-center mx-auto">
      <span className="text-blue-500 text-base md:text-xl font-bold">
        {matter.date}
      </span>
      <article className="prose xl:prose-xl 2xl:prose-2xl prose-blue pt-4 dark:prose-invert prose-a:underline xs:prose-pre:max-w-sm sm:prose-pre:max-w-md md:prose-pre:max-w-none prose-a:text-blue-500 prose-pre:bg-[#0D1117]">
        {children}
      </article>
    </div>
  );
}
