"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="text-center">
        <div className="mb-8 flex items-center justify-center">
          <Image
            src="/assets/rmlogo.png"
            alt="Rick and Morty Logo"
            width={80}
            height={80}
            className="h-16 w-16 sm:h-20 sm:w-20"
            unoptimized
          />
        </div>
        
        <div className="mb-8">
          <h1 className="mb-4 text-9xl font-bold text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]">
            404
          </h1>
          <div className="mx-auto h-1 w-32 bg-gradient-to-r from-transparent via-green-500 to-transparent" />
        </div>
        
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
          Page Not Found
        </h2>
        
        <p className="mb-8 text-lg text-gray-400">
          This page doesn&apos;t exist in this dimension.
          <br />
          Maybe try a different universe?
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-lg border-2 border-green-500/40 bg-black/40 px-6 py-3 text-green-400 transition-all hover:border-green-500/60 hover:bg-green-500/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            Return to Character Explorer
          </Link>
        </div>

        {/* Abstract decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full border border-green-500/30 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full border border-green-500/20 blur-3xl" />
        </div>
      </div>
    </div>
  );
}

