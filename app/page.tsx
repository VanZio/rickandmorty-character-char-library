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
                className="cartoon-hover rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-4 py-2 text-green-300 transition-all hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              >
                Episodes
              </Link>
              <Link
                href="/favorites"
                className="cartoon-hover rounded-lg border-2 border-yellow-500/40 bg-gradient-to-br from-yellow-950/40 via-yellow-900/30 to-black/60 px-4 py-2 text-yellow-300 transition-all hover:border-yellow-400 hover:bg-gradient-to-br hover:from-yellow-950/60 hover:via-yellow-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]"
              >
                ⭐ Favorites
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
