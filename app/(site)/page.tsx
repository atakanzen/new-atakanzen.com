import Title from "@/components/Title";
import { getOpenGraphImage } from "@/lib/opengraph";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atakan Zengin - Software Engineer",
  description:
    "Hey I'm Atakan! I'm a full-stack software engineer. You can find more information about me here, and read about my thoughts on certain things I'm working on.",
  twitter: {
    creator: "@atakanzen_",
    card: "summary_large_image",
  },
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
    title: "Atakan Zengin",
    description:
      "Hey I'm Atakan! I'm a full-stack software engineer. You can find more information about me here, and read about my thoughts on certain things I'm working on.",
    images: getOpenGraphImage("Atakan Zengin - Software Engineer"),
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
  },
  keywords:
    "Atakan Zengin, Software Engineer, Zengin, Atakan, Personal Blog, Technology Blog",
};

export default function Home() {
  return (
    <div className="flex h-4/5 my-5 flex-col mt-5 items-center justify-center gap-y-5">
      <Title />
      <div className="flex text-base lg:text-2xl items-center gap-x-4 text-blue-400">
        <a
          className="underline"
          rel="noreferrer"
          target="_blank"
          href="https://github.com/atakanzen"
        >
          GitHub
        </a>
        <a
          className="underline"
          rel="noreferrer"
          target="_blank"
          href="https://linkedin.com/in/atakanzen"
        >
          LinkedIn
        </a>
        <a
          className="underline"
          rel="noreferrer"
          target="_blank"
          href="https://behance.com/atakanzengin"
        >
          Behance
        </a>
      </div>
    </div>
  );
}
