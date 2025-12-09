import type { Character, ApiResponse, Episode } from "@/types";

const BASE_URL = "https://rickandmortyapi.com/api";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  retries = MAX_RETRIES
): Promise<Response> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok && retries > 0 && response.status >= 500) {
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }

    return response;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError("Request timeout", 408, "Request Timeout");
    }

    if (retries > 0) {
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }

    throw new ApiError(
      error instanceof Error ? error.message : "Network error",
      0,
      "Network Error"
    );
  }
}

export async function getCharacters(
  page: number = 1,
  name?: string,
  status?: string,
  species?: string,
  gender?: string
): Promise<ApiResponse<Character>> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (name) params.append("name", name);
  if (status) params.append("status", status.toLowerCase());
  if (species) params.append("species", species);
  if (gender) params.append("gender", gender.toLowerCase());

  try {
    const response = await fetchWithRetry(
      `${BASE_URL}/character?${params.toString()}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return {
          info: { count: 0, pages: 0, next: null, prev: null },
          results: [],
        };
      }

      const errorText = await response.text().catch(() => "Unknown error");
      throw new ApiError(
        `Failed to fetch characters: ${errorText}`,
        response.status,
        response.statusText
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      0,
      "Unknown Error"
    );
  }
}

export async function getCharacter(id: number): Promise<Character> {
  try {
    const response = await fetchWithRetry(`${BASE_URL}/character/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new ApiError(
          `Character with ID ${id} not found`,
          404,
          "Not Found"
        );
      }

      const errorText = await response.text().catch(() => "Unknown error");
      throw new ApiError(
        `Failed to fetch character: ${errorText}`,
        response.status,
        response.statusText
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      0,
      "Unknown Error"
    );
  }
}

export async function getCharactersByIds(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) {
    return [];
  }

  try {
    // Rick and Morty API supports fetching multiple characters with comma-separated IDs
    const idsString = ids.join(",");
    const response = await fetchWithRetry(`${BASE_URL}/character/${idsString}`);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new ApiError(
        `Failed to fetch characters: ${errorText}`,
        response.status,
        response.statusText
      );
    }

    const data = await response.json();
    // API returns array if multiple IDs, or single object if one ID
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      0,
      "Unknown Error"
    );
  }
}

export async function getEpisodes(
  page: number = 1,
  name?: string
): Promise<ApiResponse<Episode>> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (name) params.append("name", name);

  try {
    const response = await fetchWithRetry(
      `${BASE_URL}/episode?${params.toString()}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return {
          info: { count: 0, pages: 0, next: null, prev: null },
          results: [],
        };
      }

      const errorText = await response.text().catch(() => "Unknown error");
      throw new ApiError(
        `Failed to fetch episodes: ${errorText}`,
        response.status,
        response.statusText
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      0,
      "Unknown Error"
    );
  }
}

export async function getEpisode(id: number): Promise<Episode> {
  try {
    const response = await fetchWithRetry(`${BASE_URL}/episode/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new ApiError(
          `Episode with ID ${id} not found`,
          404,
          "Not Found"
        );
      }

      const errorText = await response.text().catch(() => "Unknown error");
      throw new ApiError(
        `Failed to fetch episode: ${errorText}`,
        response.status,
        response.statusText
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      0,
      "Unknown Error"
    );
  }
}

