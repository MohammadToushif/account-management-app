import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
        <div className="w-full max-w-sm min-h-12 flex justify-center items-center gap-3">
          <Link href={"/profile"}>
            <span className="bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-sm">
              Profile
            </span>
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
