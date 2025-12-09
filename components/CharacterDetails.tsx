"use client";

import { useCharacterStore } from "@/store/characterStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CharacterDetails() {
  const { selectedCharacter, clearSelectedCharacter } = useCharacterStore();

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-green-950/90 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          clearSelectedCharacter();
        }
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border-2 border-green-400/60 bg-gradient-to-br from-green-950/95 via-green-900/90 to-black/95 p-6 backdrop-blur-md shadow-[0_0_40px_rgba(34,197,94,0.4)]">
        <button
          onClick={clearSelectedCharacter}
          className="cartoon-hover absolute right-4 top-4 z-10 rounded-lg border-2 border-green-500/50 bg-gradient-to-br from-green-950/60 via-green-900/40 to-black/80 px-4 py-2 text-green-300 transition-all hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/80 hover:via-green-900/60 hover:to-black/90 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="relative h-64 w-full flex-shrink-0 overflow-hidden rounded-lg border-2 border-green-400/50 shadow-[0_0_20px_rgba(34,197,94,0.3)] md:h-80 md:w-64">
            <Image
              src={selectedCharacter.image}
              alt={selectedCharacter.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h2 className="text-3xl font-bold text-green-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">
                  {selectedCharacter.name}
                </h2>
                <div
                  className={`h-3 w-3 rounded-full ${getStatusColor(selectedCharacter.status)} shadow-[0_0_8px_currentColor]`}
                  title={selectedCharacter.status}
                  aria-label={`Status: ${selectedCharacter.status}`}
                />
              </div>
              <p className="text-lg text-green-200/80">{selectedCharacter.species}</p>
            </div>

            <div className="space-y-3 border-t border-green-500/30 pt-4">
              <div>
                <p className="text-sm text-green-400/60">Status</p>
                <p className="text-green-300">{selectedCharacter.status}</p>
              </div>
              <div>
                <p className="text-sm text-green-400/60">Gender</p>
                <p className="text-green-200/80">{selectedCharacter.gender}</p>
              </div>
              <div>
                <p className="text-sm text-green-400/60">Origin</p>
                <p className="text-green-200/80">{selectedCharacter.origin.name}</p>
              </div>
              <div>
                <p className="text-sm text-green-400/60">Location</p>
                <p className="text-green-200/80">{selectedCharacter.location.name}</p>
              </div>
              {selectedCharacter.type && (
                <div>
                  <p className="text-sm text-green-400/60">Type</p>
                  <p className="text-green-200/80">{selectedCharacter.type}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-green-400/60">Episodes</p>
                <p className="text-green-200/80">{selectedCharacter.episode.length}</p>
              </div>
            </div>

            <div className="border-t border-green-500/30 pt-4">
              <Link
                href={`/character/${selectedCharacter.id}`}
                onClick={clearSelectedCharacter}
                className="cartoon-hover inline-block rounded-lg border-2 border-green-400/50 bg-gradient-to-br from-green-950/60 via-green-900/40 to-black/80 px-4 py-2 text-green-300 transition-all hover:border-green-300 hover:bg-gradient-to-br hover:from-green-950/80 hover:via-green-900/60 hover:to-black/90 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]"
              >
                View Full Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

