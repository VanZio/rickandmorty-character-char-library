import EpisodeDetailClient from "./EpisodeDetailClient";
import { getEpisodes } from "@/lib/api";

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    // Fetch all episodes to get total count
    const firstPage = await getEpisodes(1);
    const totalPages = firstPage.info.pages;
    
    // Generate params for all episodes
    const params = [];
    
    // Add episodes from first page
    for (const episode of firstPage.results) {
      params.push({ id: [episode.id.toString()] });
    }
    
    // Fetch remaining pages
    for (let page = 2; page <= totalPages; page++) {
      const pageData = await getEpisodes(page);
      for (const episode of pageData.results) {
        params.push({ id: [episode.id.toString()] });
      }
    }
    
    return params;
  } catch (error) {
    console.error("Error generating static params for episodes:", error);
    // Fallback to at least one episode
    return [{ id: ["1"] }];
  }
}

export default function EpisodeDetailPage() {
  return <EpisodeDetailClient />;
}
