import Link from "next/link";
import React, { ReactElement } from "react";

interface JorneyPoint {
  title: string;
  startDate: Date;
  endDate?: Date;
  description: ReactElement;
  hasLink: boolean;
  href?: string;
  linkType?: "internal" | "external";
}

const journeyPoints: JorneyPoint[] = [
  {
    title: "Software Engineer @ GSK",
    startDate: new Date(2022, 0),
    description: (
      <p className="text-base font-normal">
        I&apos;m contributing to GSK&apos;s various R&D Tech projects with{" "}
        <span className="font-semibold  text-sky-500 dark:text-cyan-300">
          React
        </span>{" "}
        and{" "}
        <span className="font-semibold text-sky-500 dark:text-cyan-300">
          ASP.NET Web API
        </span>{" "}
        technologies{" "}
      </p>
    ),
    hasLink: false,
  },
  {
    title: "Moved to Poland",
    startDate: new Date(2021, 8),
    description: (
      <p className="text-base font-normal ">
        I made a tough call, and moved to Poland to follow an academic path in
        my passion –– technology. I&apos;m currently studying{" "}
        <span className="font-semibold  text-sky-500 dark:text-cyan-300">
          Information Technology
        </span>{" "}
        for a Bachelor of Engineering degree.
      </p>
    ),
    hasLink: false,
  },
  {
    title: "First Bachelor's Degree",
    startDate: new Date(2021, 5),
    description: (
      <p className="text-base font-normal ">
        I have completed my studies in English Translation and Interpration with
        a{" "}
        <span className=" text-sky-500 dark:text-cyan-300 font-semibold">
          GPA of 3.25
        </span>
        , enabling me with exceptional communication skills.
      </p>
    ),
    hasLink: false,
  },
  {
    title: "Sofware Developer Intern @ Modanisa",
    startDate: new Date(2020, 9),
    endDate: new Date(2021, 7),
    description: (
      <p className="text-base font-normal ">
        I contributed to Modanisa&apos;s digital transformation journey from a
        monolith architecture to{" "}
        <span
          className=" font-semibold
          text-sky-500 dark:text-cyan-300"
        >
          Go micro-services
        </span>{" "}
        and{" "}
        <span className="text-sky-500 dark:text-cyan-300 font-semibold">
          Vue micro-frontends
        </span>{" "}
        in{" "}
        <span className="text-sky-500 dark:text-cyan-300 font-semibold">
          Search & Listing
        </span>{" "}
        domain to improve customer retention and revenu streams
      </p>
    ),
    hasLink: true,
    linkType: "internal",
    href: "/posts/almost-one-year-at-modanisa",
  },
  {
    title: "Successfully completed a software bootcamp",
    startDate: new Date(2020, 0),
    endDate: new Date(2020, 8),
    description: (
      <p className="text-base font-normal ">
        I laid a foundation for my software career by focusing on{" "}
        <span className="text-sky-500 dark:text-cyan-300 font-semibold ">
          ASP.NET MVC Web Apps
        </span>
        ,{" "}
        <span className="text-sky-500 dark:text-cyan-300 font-semibold ">
          HTML5
        </span>
        ,{" "}
        <span className="text-sky-500 dark:text-cyan-300 font-semibold ">
          CSS
        </span>
        , and{" "}
        <span className="text-sky-500 dark:text-cyan-300 font-semibold ">
          JavaScript
        </span>
      </p>
    ),
    hasLink: false,
  },
];

const MyJourney = () => {
  return (
    <div className="flex flex-col items-start gap-4 divide-y-2 justify-center xl:h-full xl:max-w-4xl mx-auto">
      <div className="flex items-center justify-start gap-2 font-semibold">
        <Link
          href="/"
          className="underline underline-offset-2 font-semibold decoration-sky-400"
        >
          Homepage
        </Link>
        <span>/</span>
        <h2>My Journey</h2>
      </div>
      <div className="pt-4">
        <ol className="relative border-l border-slate-300">
          {journeyPoints.map((j, i) => (
            <li key={i} className="ml-4 my-4">
              <div className="absolute w-2 h-2 bg-slate-300 rounded-full mt-0.5 -left-[0.275rem]"></div>
              <div className="flex items-center gap-2 divide-x divide-slate-400">
                <time className="mb-1 text-sm font-normal leading-none text-slate-500">
                  {j.startDate.toLocaleDateString("en", {
                    year: "numeric",
                    month: "long",
                  })}
                </time>
                {j.endDate ? (
                  <>
                    <time className="pl-2 mb-1 text-sm font-normal leading-none text-slate-500 ">
                      {j.endDate.toLocaleDateString("en", {
                        year: "numeric",
                        month: "long",
                      })}
                    </time>
                  </>
                ) : null}
              </div>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                {j.title}
              </h3>
              <div className="text-slate-600 dark:text-slate-400">
                {j.description}
              </div>
              {j.hasLink ? (
                j.linkType === "internal" ? (
                  <Link
                    className="inline-flex items-center border border-slate-300 dark:border-black xl:hover:bg-slate-100 py-2 px-4 mt-2 rounded dark:bg-slate-900 xl:hover:dark:bg-slate-800 font-semibold"
                    href={j.href!}
                  >
                    See more here
                  </Link>
                ) : j.linkType === "external" ? (
                  <a
                    className="inline-flex items-center border border-slate-300 dark:border-black xl:hover:bg-slate-100 py-2 px-4 mt-2 rounded dark:bg-slate-900 xl:hover:dark:bg-slate-800 font-semibold"
                    href={j.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See more here
                  </a>
                ) : null
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default MyJourney;
