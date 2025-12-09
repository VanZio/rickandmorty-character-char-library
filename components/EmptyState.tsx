"use client";

interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon = "🔍",
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center animate-fadeIn">
        <div className="mb-4 text-6xl animate-bounce">{icon}</div>
        <h3 className="mb-2 text-xl font-bold text-gray-400">{title}</h3>
        <p className="mb-6 text-gray-500">{message}</p>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="cartoon-hover rounded-lg border-2 border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 px-6 py-3 text-green-300 transition-all hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

