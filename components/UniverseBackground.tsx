"use client";

import { useThemeStore } from "@/store/themeStore";
import { useEffect, useState, useMemo } from "react";

// Generate stable positions for elements that persist across renders
const generateStablePositions = (count: number, seed: string) => {
  const positions: Array<{ left: number; top: number; delay: number; duration: number }> = [];
  for (let i = 0; i < count; i++) {
    // Use seed + index for consistent random values
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    positions.push({
      left: pseudoRandom(i + seed.charCodeAt(0)) * 100,
      top: pseudoRandom(i + seed.charCodeAt(0) + 1) * 100,
      delay: pseudoRandom(i + seed.charCodeAt(0) + 2) * 20,
      duration: 20 + pseudoRandom(i + seed.charCodeAt(0) + 3) * 30,
    });
  }
  return positions;
};

const planetColors = [
  'rgba(34, 197, 94, 0.4)', // Green
  'rgba(59, 130, 246, 0.4)', // Blue
  'rgba(168, 85, 247, 0.4)', // Purple
  'rgba(236, 72, 153, 0.4)', // Pink
  'rgba(251, 146, 60, 0.4)', // Orange
  'rgba(34, 197, 94, 0.3)', // Light Green
  'rgba(147, 51, 234, 0.4)', // Violet
  'rgba(239, 68, 68, 0.4)', // Red
];

export default function UniverseBackground() {
  const { theme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate stable positions that don't change on re-render - reduced counts for performance
  const asteroidPositions = useMemo(() => generateStablePositions(4, 'asteroids'), []);
  const shootingStarPositions = useMemo(() => generateStablePositions(2, 'shooting'), []);
  const planetPositions = useMemo(() => generateStablePositions(3, 'planets'), []);
  const staticStarPositions = useMemo(() => generateStablePositions(15, 'static-stars'), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 stars-bg" />
      
      {/* Static glowing stars */}
      {staticStarPositions.map((pos, i) => {
        const size = 4 + (i % 4) * 2; // 4px to 10px
        const glowIntensity = 0.6 + (i % 3) * 0.2;
        return (
          <div
            key={`static-star-${i}`}
            className="absolute static-star"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${pos.delay}s`,
            }}
          >
            <div 
              className="static-star-glow"
              style={{
                boxShadow: `0 0 ${size * 4}px rgba(34, 197, 94, ${glowIntensity}), 0 0 ${size * 8}px rgba(34, 197, 94, ${glowIntensity * 0.6}), 0 0 ${size * 12}px rgba(34, 197, 94, ${glowIntensity * 0.3})`,
              }}
            />
          </div>
        );
      })}
      
      {/* Rotating planets */}
      {planetPositions.map((pos, i) => {
        const size = 60 + (i % 3) * 30; // 60px to 120px
        const color = planetColors[i % planetColors.length];
        const rotationSpeed = 20 + (i % 3) * 10;
        return (
          <div
            key={`planet-${i}`}
            className="absolute planet"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${rotationSpeed}s`,
              animationDelay: `${pos.delay}s`,
            }}
          >
            <div 
              className="planet-body"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${color}, ${color.replace('0.4', '0.2')})`,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                boxShadow: `0 0 ${size * 1.5}px ${color}, 0 0 ${size * 2}px ${color.replace('0.4', '0.3')}, inset -${size * 0.2}px -${size * 0.2}px ${size * 0.3}px rgba(0, 0, 0, 0.3)`,
              }}
            />
          </div>
        );
      })}
      
      {/* Animated asteroids */}
      {asteroidPositions.map((pos, i) => (
        <div
          key={`asteroid-${i}`}
          className="absolute asteroid"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${pos.duration}s`,
          }}
        >
          <div className="asteroid-shape" />
        </div>
      ))}

      {/* Shooting stars */}
      {shootingStarPositions.map((pos, i) => (
        <div
          key={`shooting-${i}`}
          className="absolute shooting-star"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${3 + (i % 2)}s`,
          }}
        />
      ))}

      {/* Green portal/nebula effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-green-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />

      {/* Grid pattern overlay (subtle) */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: theme === 'dark' 
            ? 'linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)'
            : 'linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}

