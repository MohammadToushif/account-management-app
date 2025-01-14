"use client";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Home() {
  const notify = () => toast("Welcome to Next.js App");
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-5 border-4 border-double border-zinc-500 px-3 py-1 bg-white">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="uppercase font-semibold text-5xl text-black">App</h1>
        </div>
        <div className="flex justify-center items-center gap-3">
          <Link href={"/signin"}>
            <span className="bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-sm">
              Sign In
            </span>
          </Link>
          <button
            className="mx-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-sm"
            onClick={notify}
          >
            Click Me
          </button>
          <Link href={"/signup"}>
            <span className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-5 rounded-sm">
              Sign Up
            </span>
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
