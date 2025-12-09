"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCharacterStore } from "@/store/characterStore";
import UniverseBackground from "@/components/UniverseBackground";
import Image from "next/image";
import Link from "next/link";

export function generateStaticParams() {
  return [];
}

export default function CharacterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const {
    selectedCharacter,
    loadingCharacter,
    error,
    errorCode,
    fetchCharacter,
    clearError,
  } = useCharacterStore();

  useEffect(() => {
    if (id && !isNaN(id)) {
      fetchCharacter(id);
    }
  }, [id, fetchCharacter]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-green-500";
      case "dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loadingCharacter) {
    return (
      <div className="flex min-h-screen items-center justify-center relative">
        <UniverseBackground />
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-green-500/30 border-t-green-500 mx-auto" />
          <p className="text-green-300">Loading character...</p>
        </div>
      </div>
    );
  }

  if (error || !selectedCharacter) {
    if (errorCode === 404) {
      router.push("/not-found");
      return null;
    }

    return (
      <div className="flex min-h-screen items-center justify-center relative px-4">
        <UniverseBackground />
        <div className="text-center">
          <p className="mb-4 text-xl text-red-400">Error: {error}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => {
                clearError();
                fetchCharacter(id);
              }}
              className="cartoon-hover rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-6 py-3 text-green-300 transition-all hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            >
              Retry
            </button>
            <Link
              href="/"
              className="cartoon-hover rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-6 py-3 text-green-300 transition-all hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            >
              Back to Explorer
            </Link>
          </div>
        </div>
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

        <div className="rounded-lg border-2 border-green-400/60 bg-gradient-to-br from-green-950/95 via-green-900/90 to-black/95 p-6 backdrop-blur-md shadow-[0_0_40px_rgba(34,197,94,0.4)] sm:p-8">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="relative h-80 w-full flex-shrink-0 overflow-hidden rounded-lg border-2 border-green-400/50 shadow-[0_0_20px_rgba(34,197,94,0.3)] md:h-96 md:w-80">
              <Image
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <h1 className="text-4xl font-bold text-green-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] sm:text-5xl">
                    {selectedCharacter.name}
                  </h1>
                  <div
                    className={`h-4 w-4 rounded-full ${getStatusColor(selectedCharacter.status)} shadow-[0_0_8px_currentColor]`}
                    title={selectedCharacter.status}
                  />
                </div>
                <p className="text-xl text-green-200/80">{selectedCharacter.species}</p>
              </div>

              <div className="grid gap-4 border-t border-green-500/30 pt-6 sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-sm font-semibold text-green-400/60 uppercase tracking-wide">
                    Status
                  </p>
                  <p className="text-lg text-green-300">{selectedCharacter.status}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold text-green-400/60 uppercase tracking-wide">
                    Gender
                  </p>
                  <p className="text-lg text-green-200/80">{selectedCharacter.gender}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold text-green-400/60 uppercase tracking-wide">
                    Origin
                  </p>
                  <p className="text-lg text-green-200/80">{selectedCharacter.origin.name}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold text-green-400/60 uppercase tracking-wide">
                    Location
                  </p>
                  <p className="text-lg text-green-200/80">{selectedCharacter.location.name}</p>
                </div>
                {selectedCharacter.type && (
                  <div>
                    <p className="mb-1 text-sm font-semibold text-green-400/60 uppercase tracking-wide">
                      Type
                    </p>
                    <p className="text-lg text-green-200/80">{selectedCharacter.type}</p>
                  </div>
                )}
                <div>
                  <p className="mb-1 text-sm font-semibold text-green-400/60 uppercase tracking-wide">
                    Episodes
                  </p>
                  <p className="text-lg text-green-200/80">
                    {selectedCharacter.episode.length} episode
                    {selectedCharacter.episode.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="border-t border-green-500/30 pt-6">
                <p className="mb-2 text-sm font-semibold text-green-400/60 uppercase tracking-wide">
                  Character ID
                </p>
                <p className="text-sm text-green-300/60">#{selectedCharacter.id}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


