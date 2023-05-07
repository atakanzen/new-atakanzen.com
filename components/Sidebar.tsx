import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="p-4 xl:h-screen">
      <div className="flex flex-row-reverse xl:flex-col h-full items-center justify-between xl:justify-end gap-2">
        {/* Dynamic sized profile photo based on breakpoint */}
        <div>
          {/* For laptops and bigger sizes */}
          <div className="hidden xl:block">
            <Image
              src="/images/profile.png"
              alt="Atakan Zengin's Profile Logo"
              width={200}
              height={200}
              priority
            />
          </div>
          {/* For screens smaller than laptops */}
          <div className="relative overflow-hidden p-2 w-14 h-14 xs:w-20 xs:h-20  border-double border-4  d rounded-full xl:hidden">
            <Image
              src="/images/profile_close.png"
              alt="Atakan Zengin's Profile Logo"
              className="object-contain saturate-100 inline"
              fill
              priority
            />
          </div>
        </div>
        {/* Title */}
        <div className="flex items-center justify-center divide-x-2  text-center xl:flex-col xl:mb-4 xl:divide-x-0">
          <Link href="/">
            {" "}
            <p className="text-base xs:text-xl  xl:text-2xl 2xl:text-3xl font-bold pr-2 xl:pr-0">
              Atakan Zengin
            </p>
          </Link>

          <p className="text-sm xs:text-base xl:text-l 2xl:text-xl dark:text-slate-400 pl-2">
            Software Engineer
          </p>
        </div>
      </div>
    </aside>
  );
}
