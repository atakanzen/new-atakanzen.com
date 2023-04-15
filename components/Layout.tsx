import Sidebar from "./Sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div
        className={`${inter.className} grid grid-rows-1 grid-cols-1 xl:grid-cols-12`}
      >
        <div className="row-start-1 xl:col-span-2  xl:col-start-11">
          <Sidebar />
        </div>

        <main className="mx-auto p-10 col-span-12 row-start-2 col-start-1 xl:col-span-10  xl:row-start-1 ">
          {children}
        </main>
      </div>
    </>
  );
}
