"use client";

import { useEffect, useState } from "react";

interface LoadingProgressBarProps {
  isLoading: boolean;
}

export default function LoadingProgressBar({ isLoading }: LoadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      // Reset after animation completes
      const timer = setTimeout(() => setProgress(0), 300);
      return () => clearTimeout(timer);
    }

    // Simulate progress for better UX during slow connections
    let interval: NodeJS.Timeout;
    let currentProgress = 0;

    const updateProgress = () => {
      if (currentProgress < 90) {
        // Gradually increase to 90% while loading
        currentProgress += Math.random() * 15;
        if (currentProgress > 90) currentProgress = 90;
        setProgress(currentProgress);
      }
    };

    // Start progress immediately
    setProgress(10);
    interval = setInterval(updateProgress, 200);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  if (!isLoading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-green-950/50">
      <div
        className="h-full bg-gradient-to-r from-green-500 via-green-400 to-green-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(34,197,94,0.6)]"
        style={{
          width: `${progress}%`,
          transition: isLoading 
            ? 'width 0.3s ease-out' 
            : 'width 0.3s ease-out, opacity 0.3s ease-out 0.3s',
          opacity: isLoading ? 1 : 0,
        }}
      />
    </div>
  );
}

