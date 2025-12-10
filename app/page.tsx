"use client";

import SearchFilter from "@/components/SearchFilter";
import CharacterList from "@/components/CharacterList";
import Pagination from "@/components/Pagination";
import CharacterDetails from "@/components/CharacterDetails";
import NetworkStatus from "@/components/NetworkStatus";
import ErrorBoundary from "@/components/ErrorBoundary";
import ThemeToggle from "@/components/ThemeToggle";
import BackgroundMusic from "@/components/BackgroundMusic";
import { useCharacterStore } from "@/store/characterStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { totalCount, loadAllData, loadingAllData } = useCharacterStore();

  useEffect(() => {
    // Pre-load all characters and episodes on mount
    loadAllData();
  }, [loadAllData]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen relative">

        <main className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 max-w-full overflow-x-hidden">
            <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/episodes"
                prefetch={false}
                className="cartoon-hover rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-4 py-2 text-green-300 transition-all hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              >
                Episodes
              </Link>
              <Link
                href="/favorites"
                prefetch={false}
                className="cartoon-hover flex items-center gap-2 rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-4 py-2 text-green-300 transition-all hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Favorites
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <BackgroundMusic />
              <ThemeToggle />
            </div>
          </div>
          <header className="mb-12 text-center">
            <div className="mb-6 flex items-center justify-center">
              <Image
                src="/assets/rm_title.svg"
                alt="Rick and Morty"
                width={400}
                height={100}
                className="title-animate h-12 w-auto sm:h-16"
                priority
                unoptimized
              />
            </div>
            <p className="subtitle-animate text-lg dark:text-green-300/80 text-green-200/90 sm:text-xl font-medium">
              Character Explorer
            </p>
            {totalCount > 0 && (
              <p className="count-animate mt-2 text-sm dark:text-green-400/60 text-green-300/70">
                {totalCount.toLocaleString()} characters across the multiverse
              </p>
            )}
            <div className="divider-animate mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-transparent via-green-400 to-transparent highlight-glow" />
          </header>

          <SearchFilter />

          <CharacterList />
          
          <Pagination />
          
          <CharacterDetails />
          <NetworkStatus />
        </main>
      </div>
    </ErrorBoundary>
  );
}
