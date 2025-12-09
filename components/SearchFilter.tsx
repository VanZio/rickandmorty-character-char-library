"use client";

import { useCharacterStore } from "@/store/characterStore";
import { useState, useEffect } from "react";

export default function SearchFilter() {
  const {
    searchName,
    filterStatus,
    filterSpecies,
    filterGender,
    setSearchName,
    setFilterStatus,
    setFilterSpecies,
    setFilterGender,
  } = useCharacterStore();
  const [localSearch, setLocalSearch] = useState(searchName);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchName(localSearch);
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, setSearchName]);

  return (
    <div className="mb-8 space-y-4">
      {/* Search bar - full width */}
      <div>
        <input
          type="text"
          placeholder="Search by name..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full rounded-lg border-2 border-green-500/40 dark:bg-gradient-to-br dark:from-green-950/40 dark:via-green-900/30 dark:to-black/60 bg-gradient-to-br from-green-950/70 via-green-900/60 to-black/80 px-4 py-3 dark:text-green-100 text-green-200 placeholder-green-400/50 dark:placeholder-green-400/50 placeholder-green-500/70 backdrop-blur-sm transition-all focus:border-green-400 dark:focus:bg-gradient-to-br dark:focus:from-green-950/60 dark:focus:via-green-900/40 dark:focus:to-black/80 focus:bg-gradient-to-br focus:from-green-950/80 focus:via-green-900/70 focus:to-black/90 focus:outline-none focus:ring-2 focus:ring-green-400/30 focus:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
        />
      </div>
      
      {/* Filter options - below search bar */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="sm:w-48">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full rounded-lg border-2 border-green-500/40 dark:bg-gradient-to-br dark:from-green-950/40 dark:via-green-900/30 dark:to-black/60 bg-gradient-to-br from-green-950/70 via-green-900/60 to-black/80 px-4 py-3 dark:text-green-100 text-green-200 backdrop-blur-sm transition-all focus:border-green-400 dark:focus:bg-gradient-to-br dark:focus:from-green-950/60 dark:focus:via-green-900/40 dark:focus:to-black/80 focus:bg-gradient-to-br focus:from-green-950/80 focus:via-green-900/70 focus:to-black/90 focus:outline-none focus:ring-2 focus:ring-green-400/30 focus:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            <option value="" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">All Status</option>
            <option value="alive" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Alive</option>
            <option value="dead" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Dead</option>
            <option value="unknown" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Unknown</option>
          </select>
        </div>
        <div className="flex-1 sm:flex-none sm:w-48">
          <select
            value={filterSpecies}
            onChange={(e) => setFilterSpecies(e.target.value)}
            className="w-full rounded-lg border-2 border-green-500/40 dark:bg-gradient-to-br dark:from-green-950/40 dark:via-green-900/30 dark:to-black/60 bg-gradient-to-br from-green-950/70 via-green-900/60 to-black/80 px-4 py-3 dark:text-green-100 text-green-200 backdrop-blur-sm transition-all focus:border-green-400 dark:focus:bg-gradient-to-br dark:focus:from-green-950/60 dark:focus:via-green-900/40 dark:focus:to-black/80 focus:bg-gradient-to-br focus:from-green-950/80 focus:via-green-900/70 focus:to-black/90 focus:outline-none focus:ring-2 focus:ring-green-400/30 focus:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            <option value="" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">All Species</option>
            <option value="Human" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Human</option>
            <option value="Alien" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Alien</option>
            <option value="Humanoid" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Humanoid</option>
            <option value="Robot" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Robot</option>
            <option value="Animal" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Animal</option>
            <option value="Mythological Creature" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Mythological Creature</option>
            <option value="Disease" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Disease</option>
            <option value="Cronenberg" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Cronenberg</option>
            <option value="Poopybutthole" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Poopybutthole</option>
          </select>
        </div>
        <div className="sm:w-48">
          <select
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            className="w-full rounded-lg border-2 border-green-500/40 dark:bg-gradient-to-br dark:from-green-950/40 dark:via-green-900/30 dark:to-black/60 bg-gradient-to-br from-green-950/70 via-green-900/60 to-black/80 px-4 py-3 dark:text-green-100 text-green-200 backdrop-blur-sm transition-all focus:border-green-400 dark:focus:bg-gradient-to-br dark:focus:from-green-950/60 dark:focus:via-green-900/40 dark:focus:to-black/80 focus:bg-gradient-to-br focus:from-green-950/80 focus:via-green-900/70 focus:to-black/90 focus:outline-none focus:ring-2 focus:ring-green-400/30 focus:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            <option value="" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">All Gender</option>
            <option value="Female" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Female</option>
            <option value="Male" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Male</option>
            <option value="Genderless" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Genderless</option>
            <option value="unknown" className="dark:bg-black bg-green-950 dark:text-green-100 text-green-200">Unknown</option>
          </select>
        </div>
      </div>
    </div>
  );
}

