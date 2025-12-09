import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Character } from "@/types";

interface FavoriteState {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (id) => {
        set((state) => ({
          favorites: [...state.favorites, id],
        }));
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((favId) => favId !== id),
        }));
      },

      toggleFavorite: (id) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          get().removeFavorite(id);
        } else {
          get().addFavorite(id);
        }
      },

      isFavorite: (id) => {
        return get().favorites.includes(id);
      },
    }),
    {
      name: "rick-and-morty-favorites",
    }
  )
);

