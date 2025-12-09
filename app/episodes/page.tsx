"use client";

import { useState, useEffect } from "react";
import { getEpisodes, getEpisode } from "@/lib/api";
import type { Episode } from "@/types";
import Link from "next/link";
import Image from "next/image";
import LoadingIndicator from "@/components/LoadingIndicator";
import SkeletonCard from "@/components/SkeletonCard";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import UniverseBackground from "@/components/UniverseBackground";

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchName(localSearch);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getEpisodes(currentPage, searchName || undefined);
        setEpisodes(data.results);
        setTotalPages(data.info.pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch episodes");
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [currentPage, searchName]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading && episodes.length === 0) {
    return (
      <div className="min-h-screen relative">
        <UniverseBackground />
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error && episodes.length === 0) {
    return (
      <div className="min-h-screen relative">
        <UniverseBackground />
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <ErrorState
            error={error}
            onRetry={() => {
              setError(null);
              setCurrentPage(1);
            }}
          />
        </main>
      </div>
    );
  }

  if (episodes.length === 0 && !loading) {
    return (
      <div className="min-h-screen relative">
        <UniverseBackground />
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <EmptyState
            icon="📺"
            title="No episodes found"
            message={searchName ? "Try a different search term" : "No episodes available"}
            actionLabel={searchName ? "Clear Search" : undefined}
            onAction={searchName ? () => setLocalSearch("") : undefined}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <UniverseBackground />

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="cartoon-hover mb-8 inline-flex items-center gap-2 text-green-300 transition-colors hover:text-green-200"
        >
          <span>←</span> Back to Character Explorer
        </Link>

        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-green-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] sm:text-5xl">
            Episodes
          </h1>
          <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-transparent via-green-400 to-transparent highlight-glow" />
        </header>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search episodes..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full max-w-md mx-auto block rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-4 py-3 text-green-100 placeholder-green-400/50 backdrop-blur-sm transition-all focus:border-green-400 focus:bg-gradient-to-br focus:from-green-950/60 focus:via-green-900/40 focus:to-black/80 focus:outline-none focus:ring-2 focus:ring-green-400/30 focus:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {episodes.map((episode) => {
            const episodeNumber = episode.episode.match(/\d+/)?.[0] || "";
            return (
              <Link
                key={episode.id}
                href={`/episodes/${episode.id}`}
                prefetch={false}
                className="cartoon-hover group relative block overflow-hidden rounded-lg border-2 border-green-500/30 bg-gradient-to-br from-green-950/30 via-green-900/20 to-black/60 backdrop-blur-sm transition-all duration-300 hover:border-green-400/60 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
              >
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-green-400">
                      {episode.episode}
                    </span>
                    <span className="text-xs text-green-300/60">{episode.air_date}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-green-300 group-hover:text-green-200 transition-colors">
                    {episode.name}
                  </h3>
                  <p className="text-sm text-green-200/70">
                    {episode.characters.length} character{episode.characters.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="cartoon-hover rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-4 py-2 text-green-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            >
              Prev
            </button>
            <span className="px-4 py-2 text-green-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="cartoon-hover rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-4 py-2 text-green-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

