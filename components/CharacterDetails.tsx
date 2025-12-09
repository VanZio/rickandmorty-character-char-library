"use client";

import { useCharacterStore } from "@/store/characterStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CharacterDetails() {
  const { selectedCharacter, clearSelectedCharacter, getCharacterEpisodes } = useCharacterStore();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCharacter) {
        clearSelectedCharacter();
      }
    };

    if (selectedCharacter) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedCharacter, clearSelectedCharacter]);

  if (!selectedCharacter) return null;

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-green-950/90 p-2 sm:p-4 backdrop-blur-sm overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          clearSelectedCharacter();
        }
      }}
    >
      <div className="relative max-h-[95vh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-lg border-2 border-green-400/60 bg-gradient-to-br from-green-950/95 via-green-900/90 to-black/95 p-4 sm:p-6 backdrop-blur-md shadow-[0_0_40px_rgba(34,197,94,0.4)]">
        <button
          onClick={clearSelectedCharacter}
          className="cartoon-hover absolute right-2 top-2 sm:right-4 sm:top-4 z-10 rounded-lg border-2 border-green-500/50 bg-gradient-to-br from-green-950/60 via-green-900/40 to-black/80 px-3 py-1.5 sm:px-4 sm:py-2 text-green-300 text-sm sm:text-base transition-all hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/80 hover:via-green-900/60 hover:to-black/90 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col gap-4 sm:gap-6 md:flex-row">
            <div className="relative h-48 w-full flex-shrink-0 overflow-hidden rounded-lg border-2 border-green-400/50 shadow-[0_0_20px_rgba(34,197,94,0.3)] sm:h-64 md:h-80 md:w-64">
              <Image
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">
              <div>
                <div className="mb-2 flex items-center gap-2 sm:gap-3 flex-wrap">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] break-words">
                    {selectedCharacter.name}
                  </h2>
                  <div
                    className={`h-3 w-3 flex-shrink-0 rounded-full ${getStatusColor(selectedCharacter.status)} shadow-[0_0_8px_currentColor]`}
                    title={selectedCharacter.status}
                    aria-label={`Status: ${selectedCharacter.status}`}
                  />
                </div>
                <p className="text-base sm:text-lg text-green-200/80 break-words">{selectedCharacter.species}</p>
              </div>

              <div className="space-y-2 sm:space-y-3 border-t border-green-500/30 pt-3 sm:pt-4">
                <div>
                  <p className="text-xs sm:text-sm text-green-400/60">Status</p>
                  <p className="text-sm sm:text-base text-green-300 break-words">{selectedCharacter.status}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-green-400/60">Gender</p>
                  <p className="text-sm sm:text-base text-green-200/80 break-words">{selectedCharacter.gender}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-green-400/60">Origin</p>
                  <p className="text-sm sm:text-base text-green-200/80 break-words">{selectedCharacter.origin.name}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-green-400/60">Location</p>
                  <p className="text-sm sm:text-base text-green-200/80 break-words">{selectedCharacter.location.name}</p>
                </div>
                {selectedCharacter.type && (
                  <div>
                    <p className="text-xs sm:text-sm text-green-400/60">Type</p>
                    <p className="text-sm sm:text-base text-green-200/80 break-words">{selectedCharacter.type}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs sm:text-sm text-green-400/60">Episodes</p>
                  <p className="text-sm sm:text-base text-green-200/80">{selectedCharacter.episode.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Episodes List - Full Width */}
          {(() => {
            const characterEpisodes = getCharacterEpisodes(selectedCharacter);
            if (characterEpisodes.length > 0) {
              return (
                <div className="border-t border-green-500/30 pt-4 sm:pt-6 w-full">
                  <p className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-green-400/60 uppercase tracking-wide">
                    Appears in Episodes
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 max-h-64 sm:max-h-80 overflow-y-auto overflow-x-hidden">
                    {characterEpisodes.map((episode) => (
                      <Link
                        key={episode.id}
                        href={`/episodes/${episode.id}`}
                        onClick={clearSelectedCharacter}
                        prefetch={false}
                        className="cartoon-hover block rounded-lg border border-green-500/30 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-3 py-2 text-xs sm:text-sm transition-all hover:border-green-400/60 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] min-w-0 w-full"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-semibold text-green-300 text-xs sm:text-sm truncate">{episode.episode}</span>
                          <span className="text-xs text-green-300/60 flex-shrink-0">{episode.air_date}</span>
                        </div>
                        <p className="text-xs text-green-200/70 line-clamp-2 break-words">{episode.name}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })()}
        </div>
      </div>
    </div>
  );
}

