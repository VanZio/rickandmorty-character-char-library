"use client";

interface LoadingIndicatorProps {
  message?: string;
  showPolling?: boolean;
}

export default function LoadingIndicator({
  message = "Loading...",
  showPolling = false,
}: LoadingIndicatorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500/30 border-t-green-500" />
        {showPolling && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full border-2 border-green-500/50 border-t-green-500 animate-spin" />
          </div>
        )}
      </div>
      <div className="text-center">
        <p className="text-green-400">{message}</p>
        {showPolling && (
          <p className="mt-1 text-xs text-gray-500">Checking for updates...</p>
        )}
      </div>
    </div>
  );
}

