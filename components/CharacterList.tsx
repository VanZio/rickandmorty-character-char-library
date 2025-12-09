"use client";

import { useCharacterStore } from "@/store/characterStore";
import CharacterCard from "./CharacterCard";
import LoadingIndicator from "./LoadingIndicator";
import LoadingProgressBar from "./LoadingProgressBar";
import SkeletonCard from "./SkeletonCard";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import { useEffect, useCallback, useMemo, useState } from "react";

export default function CharacterList() {
  const {
    characters,
    loading,
    error,
    errorCode,
    currentPage,
    searchName,
    filterStatus,
    filterSpecies,
    filterGender,
    fetchCharacters,
    retryFetch,
    clearError,
    totalCount,
  } = useCharacterStore();

  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);

  useEffect(() => {
    fetchCharacters(
      currentPage,
      searchName || undefined,
      filterStatus || undefined,
      filterSpecies || undefined,
      filterGender || undefined
    );
  }, [currentPage, searchName, filterStatus, filterSpecies, filterGender, fetchCharacters]);

  // Track when we've successfully loaded data at least once
  useEffect(() => {
    if (characters.length > 0 || totalCount > 0) {
      setHasInitiallyLoaded(true);
    }
  }, [characters.length, totalCount]);

  // Show loading if we're loading OR if we haven't loaded anything yet (initial state)
  const isActuallyLoading = loading || (!hasInitiallyLoaded && characters.length === 0 && !error);

  const handleRetry = useCallback(() => {
    clearError();
    retryFetch();
  }, [clearError, retryFetch]);

  const handleClearFilters = useCallback(() => {
    clearError();
    window.location.reload();
  }, [clearError]);

  const hasFilters = useMemo(() => 
    !!(searchName || filterStatus || filterSpecies || filterGender),
    [searchName, filterStatus, filterSpecies, filterGender]
  );

  // Show loading state (progress bar + skeletons) when loading
  if (isActuallyLoading) {
    return (
      <>
        <LoadingProgressBar isLoading={true} />
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </>
    );
  }

  // Only show error if we're not loading and have no characters
  if (error && characters.length === 0 && !isActuallyLoading) {
    return (
      <>
        <LoadingProgressBar isLoading={false} />
        <ErrorState
          error={error}
          errorCode={errorCode}
          onRetry={handleRetry}
          onClearFilters={handleClearFilters}
          showClearFilters={hasFilters}
        />
      </>
    );
  }

  // Only show empty state if we're not loading and have no characters and no error
  if (characters.length === 0 && !isActuallyLoading && !error) {
    return (
      <>
        <LoadingProgressBar isLoading={false} />
        <EmptyState
          icon="🔍"
          title="No characters found"
          message={
            hasFilters
              ? "Try adjusting your search or filters"
              : "Something went wrong. Please try again."
          }
          actionLabel={hasFilters ? "Clear Filters" : undefined}
          onAction={hasFilters ? handleClearFilters : undefined}
        />
      </>
    );
  }

  return (
    <>
      <LoadingProgressBar isLoading={false} />
      {error && characters.length > 0 && (
        <div className="mb-6 rounded-lg border-2 border-yellow-500/40 bg-black/40 px-4 py-3 text-yellow-400 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm">
              <span className="font-semibold">Warning:</span> {error}
            </p>
            <button
              onClick={clearError}
              className="ml-4 text-yellow-400 hover:text-yellow-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </>
  );
}

