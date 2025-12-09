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
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
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
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="cartoon-hover rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-4 py-2 text-green-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
      >
        Prev
      </button>

      {getPageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && handlePageChange(page)}
          disabled={page === "..."}
          className={`cartoon-hover rounded-lg border-2 px-4 py-2 transition-all ${
            page === currentPage
              ? "border-green-400 bg-gradient-to-br from-green-500/30 via-green-600/20 to-green-700/30 text-green-200 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
              : page === "..."
              ? "border-transparent text-green-400/50 cursor-default"
              : "border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 text-green-300 hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="cartoon-hover rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-4 py-2 text-green-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
      >
        Next
      </button>
    </div>
  );
}

