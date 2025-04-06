"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Link = {
  href: string;
  title: string;
};

const links: Link[] = [
  {
    href: "/",
    title: "home",
  },
  {
    href: "/writing",
    title: "writing",
  },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed border-b backdrop-blur-lg py-5 w-screen flex items-center justify-start text-lg md:text-2xl px-4 h-12 md:h-16">
      <div className="flex items-center justify-center gap-x-2 font-light">
        {links.map((li) => (
          <React.Fragment key={li.href}>
            <Link
              className={`hover:text-blue-500 ${
                pathname === li.href && "text-blue-500 underline"
              }`}
              href={li.href}
            >
              {li.title}
            </Link>
            <span>/</span>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
