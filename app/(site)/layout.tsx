import Navigation from "@/components/Navigation";
import { nudica } from "@/fonts";

import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nudica.className}>
        <Navigation />
        <main className="container pt-14 md:pt-20 mx-auto px-4 h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
