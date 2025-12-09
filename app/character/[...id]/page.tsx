import CharacterDetailClient from "./CharacterDetailClient";
import { getCharacters } from "@/lib/api";

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    // Fetch all characters to get total count
    const firstPage = await getCharacters(1);
    const totalCount = firstPage.info.count;
    const totalPages = firstPage.info.pages;
    
    // Generate params for all characters
    const params = [];
    
    // Add characters from first page
    for (const character of firstPage.results) {
      params.push({ id: [character.id.toString()] });
    }
    
    // Fetch remaining pages
    for (let page = 2; page <= totalPages; page++) {
      const pageData = await getCharacters(page);
      for (const character of pageData.results) {
        params.push({ id: [character.id.toString()] });
      }
    }
    
    return params;
  } catch (error) {
    console.error("Error generating static params for characters:", error);
    // Fallback to at least one character
    return [{ id: ["1"] }];
  }
}

export default function CharacterDetailPage() {
  return <CharacterDetailClient />;
}
