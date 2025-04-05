import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center  gap-8">
      <h3 className="text-5xl font-bold ">404</h3>
      <div className="text-center">
        <p className="text-xl">
          Seems like you tried to reach a page that does not exist!
        </p>
        <p className="dark:text-neutral-400 ">
          If you think something is wrong,{" "}
          <a
            className="font-bold underline"
            href="mailto:atakanzzengin@gmail.com"
          >
            hit me up!
          </a>
        </p>
      </div>
      <Link href="/" className="font-extrabold underline">
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
