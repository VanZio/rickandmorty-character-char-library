"use client";

import { useEffect, useState } from "react";
import { useFavoriteStore } from "@/store/favoriteStore";
import { getCharacter } from "@/lib/api";
import type { Character } from "@/types";
import CharacterCard from "@/components/CharacterCard";
import CharacterDetails from "@/components/CharacterDetails";
import LoadingIndicator from "@/components/LoadingIndicator";
import SkeletonCard from "@/components/SkeletonCard";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import BackgroundMusic from "@/components/BackgroundMusic";
import UniverseBackground from "@/components/UniverseBackground";

export default function FavoritesPage() {
  const { favorites } = useFavoriteStore();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setCharacters([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const characterPromises = favorites.map((id) => getCharacter(id));
        const fetchedCharacters = await Promise.all(characterPromises);
        setCharacters(fetchedCharacters);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch favorite characters");
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <UniverseBackground />
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            <Link
              href="/"
              className="cartoon-hover rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-4 py-2 text-green-300 transition-all hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            >
              ← Back
            </Link>
            <ThemeToggle />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative">
        <UniverseBackground />
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            <Link
              href="/"
              className="cartoon-hover rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-4 py-2 text-green-300 transition-all hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            >
              ← Back
            </Link>
            <ThemeToggle />
          </div>
          <ErrorState
            error={error}
            onRetry={() => {
              setError(null);
              setLoading(true);
            }}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <UniverseBackground />

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/"
            className="cartoon-hover rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-4 py-2 text-green-300 transition-all hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
          >
            ← Back
          </Link>
          <div className="flex items-center gap-3">
            <BackgroundMusic />
            <ThemeToggle />
          </div>
        </div>

        <header className="mb-12 text-center">
          <h1 className="mb-4 flex items-center justify-center gap-3 text-4xl font-bold text-green-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] sm:text-5xl">
            <svg className="h-8 w-8 fill-current sm:h-10 sm:w-10" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Favorites
          </h1>
          <p className="text-lg text-green-300/80 sm:text-xl font-medium">
            {characters.length} favorite {characters.length !== 1 ? "characters" : "character"}
          </p>
          <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-transparent via-green-400 to-transparent highlight-glow" />
        </header>

        {characters.length === 0 ? (
          <EmptyState
            icon="❤️"
            title="No favorites yet"
            message="Start adding characters to your favorites by clicking the heart icon on character cards"
            actionLabel="Browse Characters"
            onAction={() => window.location.href = "/"}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}

        <CharacterDetails />
      </main>
    </div>
  );
}

