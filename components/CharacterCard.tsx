"use client";

import type { Character } from "@/types";
import { useCharacterStore } from "@/store/characterStore";
import { useFavoriteStore } from "@/store/favoriteStore";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, memo } from "react";

interface CharacterCardProps {
  character: Character;
}

function CharacterCard({ character }: CharacterCardProps) {
  const fetchCharacter = useCharacterStore((state) => state.fetchCharacter);
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const [wasFavorite, setWasFavorite] = useState(isFavorite(character.id));

  useEffect(() => {
    setWasFavorite(isFavorite(character.id));
  }, [character.id]);

  const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavoriteState = !isFavorite(character.id);
    toggleFavorite(character.id);
    
    // Only animate when adding to favorites (not removing)
    if (newFavoriteState && !wasFavorite) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
    setWasFavorite(newFavoriteState);
  }, [character.id, isFavorite, toggleFavorite, wasFavorite]);

  const getStatusColor = useCallback((status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-green-500";
      case "dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    // Allow opening in new tab with middle click or ctrl+click
    if (e.ctrlKey || e.metaKey || e.button === 1) {
      return;
    }
    e.preventDefault();
    fetchCharacter(character.id);
  }, [character.id, fetchCharacter]);

  return (
    <Link
      href={`/character/${character.id}`}
      onClick={handleClick}
      prefetch={false}
      className="group relative block w-full overflow-hidden rounded-lg border-2 border-green-500/30 dark:bg-gradient-to-br dark:from-green-950/30 dark:via-green-900/20 dark:to-black/60 bg-gradient-to-br from-green-950/60 via-green-900/50 to-black/80 backdrop-blur-sm cartoon-hover hover:border-green-400/80 hover:shadow-[0_0_30px_rgba(34,197,94,0.5),0_0_60px_rgba(34,197,94,0.2)]"
    >
      {/* Cartoon highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/0 group-hover:from-green-500/10 group-hover:via-green-500/5 group-hover:to-green-500/0 transition-all duration-300 pointer-events-none" />
      
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Green glow overlay on hover */}
        <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 transition-all duration-300" />
      </div>
      <div className="p-3 sm:p-4 relative z-10 dark:bg-gradient-to-b dark:from-transparent dark:to-green-950/40 bg-gradient-to-b from-transparent to-green-950/60">
        <div className="mb-2 flex items-center gap-2 min-w-0">
          <div className="relative flex-shrink-0 z-20 w-8 h-8 flex items-center justify-center overflow-visible">
            <button
              onClick={handleFavoriteClick}
              className={`flex-shrink-0 text-green-400 hover:text-green-300 transition-colors w-8 h-8 flex items-center justify-center p-1 ${
                isAnimating ? "favorite-animate" : ""
              }`}
              aria-label={isFavorite(character.id) ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite(character.id) ? (
                <svg className="h-5 w-5 fill-current favorite-heart" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 fill-none stroke-current" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" style={{ strokeWidth: 1.5 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              )}
            </button>
            {/* Sparkle particles when favoriting */}
            {isAnimating && (
              <>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute favorite-sparkle"
                    style={{
                      '--sparkle-angle': `${(i * 360) / 8}deg`,
                      '--sparkle-delay': `${i * 0.05}s`,
                    } as React.CSSProperties}
                  />
                ))}
              </>
            )}
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold dark:text-green-300 text-green-200 group-hover:dark:text-green-200 group-hover:text-green-100 transition-colors drop-shadow-[0_0_8px_rgba(34,197,94,0.5)] truncate flex-1 min-w-0">
              {character.name}
            </h3>
            <div
              className={`h-2.5 w-2.5 rounded-full ${getStatusColor(character.status)} shadow-[0_0_8px_currentColor] group-hover:scale-125 transition-transform flex-shrink-0`}
              title={character.status}
              aria-label={`Status: ${character.status}`}
            />
          </div>
        </div>
        <p className="text-xs sm:text-sm dark:text-green-200/70 text-green-200/80 group-hover:dark:text-green-200/90 group-hover:text-green-100 transition-colors break-words">{character.species}</p>
        <p className="text-xs dark:text-green-300/50 text-green-300/60 truncate group-hover:dark:text-green-300/70 group-hover:text-green-200/80 transition-colors" title={character.location.name}>
          {character.location.name}
        </p>
      </div>
      {/* Animated border glow */}
      <div className="absolute inset-0 border-2 border-green-500/0 group-hover:border-green-400/50 transition-all duration-300 rounded-lg" />
    </Link>
  );
}

export default memo(CharacterCard);

