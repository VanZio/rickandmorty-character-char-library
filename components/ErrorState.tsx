"use client";

interface ErrorStateProps {
  error: string;
  errorCode?: number | null;
  onRetry?: () => void;
  onClearFilters?: () => void;
  showClearFilters?: boolean;
}

export default function ErrorState({
  error,
  errorCode,
  onRetry,
  onClearFilters,
  showClearFilters = false,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center animate-fadeIn">
        <div className="mb-4 text-6xl animate-pulse">😵</div>
        <h3 className="mb-2 text-xl font-bold text-red-400">Oops! Something went wrong</h3>
        <p className="mb-4 text-gray-400">{error}</p>
        {errorCode && errorCode !== 404 && (
          <p className="mb-6 text-sm text-gray-500">Error Code: {errorCode}</p>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="cartoon-hover rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-6 py-3 text-green-300 transition-all hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            >
              Retry
            </button>
          )}
          {showClearFilters && onClearFilters && (
            <button
              onClick={onClearFilters}
              className="cartoon-hover rounded-lg border-2 border-gray-500/40 bg-gradient-to-br from-gray-950/40 via-gray-900/30 to-black/60 px-6 py-3 text-gray-300 transition-all hover:border-gray-400 hover:bg-gradient-to-br hover:from-gray-950/60 hover:via-gray-900/40 hover:to-black/80"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

