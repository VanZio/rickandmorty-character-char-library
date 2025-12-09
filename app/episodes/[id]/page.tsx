"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getEpisode, getCharactersByIds, type Episode } from "@/lib/api";
import type { Character } from "@/types";
import Link from "next/link";
import LoadingIndicator from "@/components/LoadingIndicator";
import ErrorState from "@/components/ErrorState";
import CharacterCard from "@/components/CharacterCard";
import SkeletonCard from "@/components/SkeletonCard";
import UniverseBackground from "@/components/UniverseBackground";

export default function EpisodeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [charactersLoading, setCharactersLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id && !isNaN(id)) {
      const fetchEpisode = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getEpisode(id);
          setEpisode(data);
          
          // Extract character IDs from URLs
          const characterIds = data.characters
            .map((url) => {
              const match = url.match(/\/(\d+)$/);
              return match ? parseInt(match[1], 10) : null;
            })
            .filter((id): id is number => id !== null);

          // Fetch characters
          if (characterIds.length > 0) {
            setCharactersLoading(true);
            try {
              const chars = await getCharactersByIds(characterIds);
              setCharacters(chars);
            } catch (err) {
              console.error("Failed to fetch characters:", err);
              setCharacters([]);
            } finally {
              setCharactersLoading(false);
            }
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to fetch episode");
        } finally {
          setLoading(false);
        }
      };

      fetchEpisode();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <UniverseBackground />
        <LoadingIndicator message="Loading episode..." />
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div className="min-h-screen relative">
        <UniverseBackground />
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <ErrorState
            error={error || "Episode not found"}
            onRetry={() => {
              setError(null);
              if (id && !isNaN(id)) {
                window.location.reload();
              }
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
        <Link
          href="/episodes"
          className="cartoon-hover mb-8 inline-flex items-center gap-2 text-green-300 transition-colors hover:text-green-200"
        >
          <span>←</span> Back to Episodes
        </Link>

        <div className="rounded-lg border-2 border-green-400/60 bg-gradient-to-br from-green-950/95 via-green-900/90 to-black/95 p-6 backdrop-blur-md shadow-[0_0_40px_rgba(34,197,94,0.4)] sm:p-8">
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-sm font-semibold text-green-400">{episode.episode}</span>
              <span className="text-sm text-green-300/60">{episode.air_date}</span>
            </div>
            <h1 className="text-4xl font-bold text-green-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] sm:text-5xl">
              {episode.name}
            </h1>
          </div>

          <div className="space-y-4 border-t border-green-500/30 pt-6">
            <div>
              <p className="mb-1 text-sm font-semibold text-green-400/60 uppercase tracking-wide">
                Air Date
              </p>
              <p className="text-lg text-green-200/80">{episode.air_date}</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold text-green-400/60 uppercase tracking-wide">
                Episode Code
              </p>
              <p className="text-lg text-green-200/80">{episode.episode}</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold text-green-400/60 uppercase tracking-wide">
                Characters
              </p>
              <p className="text-lg text-green-200/80">
                {episode.characters.length} character{episode.characters.length !== 1 ? "s" : ""} appeared
              </p>
            </div>
          </div>
        </div>

        {/* Characters Grid */}
        {charactersLoading ? (
          <div className="mt-8">
            <h2 className="mb-6 text-2xl font-bold text-green-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">
              Characters in this Episode
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: Math.min(episode.characters.length, 10) }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        ) : characters.length > 0 ? (
          <div className="mt-8">
            <h2 className="mb-6 text-2xl font-bold text-green-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">
              Characters in this Episode
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

