import { create } from "zustand";
import type { Character } from "@/types";
import { getCharacters, getCharacter, ApiError } from "@/lib/api";

interface CharacterState {
  characters: Character[];
  selectedCharacter: Character | null;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  searchName: string;
  filterStatus: string;
  filterSpecies: string;
  filterGender: string;
  loading: boolean;
  loadingCharacter: boolean;
  error: string | null;
  errorCode: number | null;
  isPolling: boolean;
  lastFetchTime: number | null;
  
  fetchCharacters: (page?: number, name?: string, status?: string, species?: string, gender?: string) => Promise<void>;
  fetchCharacter: (id: number) => Promise<void>;
  setSearchName: (name: string) => void;
  setFilterStatus: (status: string) => void;
  setFilterSpecies: (species: string) => void;
  setFilterGender: (gender: string) => void;
  setCurrentPage: (page: number) => void;
  clearSelectedCharacter: () => void;
  retryFetch: () => Promise<void>;
  clearError: () => void;
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  characters: [],
  selectedCharacter: null,
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
  searchName: "",
  filterStatus: "",
  filterSpecies: "",
  filterGender: "",
  loading: false,
  loadingCharacter: false,
  error: null,
  errorCode: null,
  isPolling: false,
  lastFetchTime: null,

  fetchCharacters: async (page = 1, name, status, species, gender) => {
    const state = get();
    set({ 
      loading: true, 
      error: null, 
      errorCode: null,
      isPolling: state.isPolling || false 
    });
    
    try {
      const data = await getCharacters(page, name, status, species, gender);
      set({
        characters: data.results,
        currentPage: page,
        totalPages: data.info.pages,
        totalCount: data.info.count,
        loading: false,
        isPolling: false,
        lastFetchTime: Date.now(),
      });
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : error instanceof Error 
        ? error.message 
        : "An error occurred";
      
      const errorCode = error instanceof ApiError ? error.status : null;
      
      set({
        error: errorMessage,
        errorCode,
        loading: false,
        isPolling: false,
        characters: errorCode === 404 ? [] : state.characters, // Keep previous results on 404
      });
    }
  },

  fetchCharacter: async (id) => {
    // Clear previous character data to ensure fresh fetch
    set({ 
      loadingCharacter: true, 
      error: null, 
      errorCode: null,
      selectedCharacter: null // Clear previous character
    });
    try {
      const character = await getCharacter(id);
      set({ selectedCharacter: character, loadingCharacter: false });
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : error instanceof Error 
        ? error.message 
        : "An error occurred";
      
      const errorCode = error instanceof ApiError ? error.status : null;
      
      set({
        error: errorMessage,
        errorCode,
        loadingCharacter: false,
        selectedCharacter: null, // Ensure no stale data on error
      });
    }
  },

  setSearchName: (name) => {
    set({ searchName: name, currentPage: 1 });
  },

  setFilterStatus: (status) => {
    set({ filterStatus: status, currentPage: 1 });
  },

  setFilterSpecies: (species) => {
    set({ filterSpecies: species, currentPage: 1 });
  },

  setFilterGender: (gender) => {
    set({ filterGender: gender, currentPage: 1 });
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  clearSelectedCharacter: () => {
    set({ selectedCharacter: null });
  },

  retryFetch: async () => {
    const state = get();
    await state.fetchCharacters(
      state.currentPage,
      state.searchName || undefined,
      state.filterStatus || undefined,
      state.filterSpecies || undefined,
      state.filterGender || undefined
    );
  },

  clearError: () => {
    set({ error: null, errorCode: null });
  },
}));

