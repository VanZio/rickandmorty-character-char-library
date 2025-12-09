"use client";

import { useCharacterStore } from "@/store/characterStore";
import { useCallback, useMemo } from "react";

export default function Pagination() {
  const { currentPage, totalPages, setCurrentPage } = useCharacterStore();

  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages, setCurrentPage]);

  const getPageNumbers = useMemo(() => {
    if (totalPages <= 1) return [];
    
    const pages: (number | string)[] = [];
    
    // On mobile, show fewer pages to prevent overflow
    // Show current page and adjacent pages only
    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 3) {
        // Near the start: 1, 2, 3, 4, ..., last
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end: 1, ..., last-3, last-2, last-1, last
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle: 1, ..., current-1, current, current+1, ..., last
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  const handlePrev = useCallback(() => handlePageChange(currentPage - 1), [currentPage, handlePageChange]);
  const handleNext = useCallback(() => handlePageChange(currentPage + 1), [currentPage, handlePageChange]);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 min-w-fit mx-auto px-2 max-w-full">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="cartoon-hover rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base text-green-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] flex-shrink-0 whitespace-nowrap"
        >
          <span className="hidden sm:inline">Prev</span>
          <span className="sm:hidden">‹</span>
        </button>

        {getPageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === "..."}
            className={`cartoon-hover rounded-lg border-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base transition-all flex-shrink-0 min-w-[1.75rem] sm:min-w-[2rem] md:min-w-[2.5rem] ${
              page === currentPage
                ? "border-green-400 bg-gradient-to-br from-green-500/30 via-green-600/20 to-green-700/30 text-green-200 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                : page === "..."
                ? "border-transparent text-green-400/50 cursor-default px-1 sm:px-2"
                : "border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 text-green-300 hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="cartoon-hover rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base text-green-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] flex-shrink-0 whitespace-nowrap"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden">›</span>
        </button>
      </div>
    </div>
  );
}

