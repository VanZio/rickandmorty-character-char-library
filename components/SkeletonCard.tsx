"use client";

export default function SkeletonCard() {
  return (
    <div className="group relative block overflow-hidden rounded-lg border-2 border-green-500/20 bg-gradient-to-br from-green-950/30 via-green-900/20 to-black/60 backdrop-blur-sm animate-pulse">
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-green-900/40 to-green-950/60">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent animate-shimmer" />
      </div>
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 bg-green-900/40 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-green-900/30 rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-green-900/20 rounded animate-pulse" />
      </div>
    </div>
  );
}

