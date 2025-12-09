"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume to 0 (muted by default)
    audio.volume = 0;

    // Don't try to play on mount since it's muted by default

    // Handle audio events
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      // Loop is handled by the loop attribute, but just in case
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = 0.1; // Set volume to 30% when unmuting
      setIsMuted(false);
      if (!isPlaying) {
        audio.play().catch(() => {
          // If play fails, user interaction may be required
        });
      }
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/themesong.mp3"
        loop
        preload="auto"
      />
      <button
        onClick={toggleMute}
        className={`cartoon-hover relative rounded-lg border-2 p-3 transition-all ${
          isMuted
            ? "border-red-500/60 bg-gradient-to-br from-red-950/40 via-red-900/30 to-black/60 text-red-400 hover:border-red-400 hover:bg-gradient-to-br hover:from-red-950/60 hover:via-red-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            : "border-green-500/40 bg-gradient-to-br from-green-950/40 via-green-900/30 to-black/60 text-green-300 hover:border-green-400 hover:bg-gradient-to-br hover:from-green-950/60 hover:via-green-900/40 hover:to-black/80 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
        }`}
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
        title={isMuted ? "Unmute background music" : "Mute background music"}
      >
        {isMuted ? (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              stroke="currentColor"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3.5}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              stroke="#22c55e"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </button>
    </>
  );
}

