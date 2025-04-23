import { cache } from 'react';

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  description?: string;
}

// Create a cached version of the fetch function
export const getLocationsData = cache(async (): Promise<Location[]> => {
  try {
    // Fetch the JSON file from the public directory
    const response = await fetch('/data/yogya-locations.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error loading locations data:', error);
    return []; // Return empty array as fallback
  }
});

// Search for a location in the loaded data
export const findLocationByName = async (
  searchName: string, 
  threshold = 0.7
): Promise<Location | null> => {
  const locations = await getLocationsData();
  
  // Try exact match first
  const exactMatch = locations.find(
    loc => loc.name.toLowerCase() === searchName.toLowerCase()
  );
  if (exactMatch) return exactMatch;
  
  // Try partial match with similarity threshold
  for (const location of locations) {
    const similarity = calculateStringSimilarity(
      location.name.toLowerCase(), 
      searchName.toLowerCase()
    );
    if (similarity >= threshold) {
      return location;
    }
  }
  
  return null;
};

// Helper to find locations by category
export const findLocationsByCategory = async (
  category: string
): Promise<Location[]> => {
  const locations = await getLocationsData();
  return locations.filter(
    loc => loc.category.toLowerCase() === category.toLowerCase()
  );
};

// Calculate string similarity (Levenshtein distance based similarity)
function calculateStringSimilarity(str1: string, str2: string): number {
  const track = Array(str2.length + 1).fill(null).map(() => 
    Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator, // substitution
      );
    }
  }
  
  const distance = track[str2.length][str1.length];
  const maxLength = Math.max(str1.length, str2.length);
  return maxLength === 0 ? 1 : 1 - distance / maxLength;
}

// Create a function to fetch coordinates from Nominatim if not found in local data
export const geocodeLocation = async (placeName: string): Promise<[number, number] | null> => {
  try {
    // Try local data first
    const localLocation = await findLocationByName(placeName);
    if (localLocation) {
      return [localLocation.latitude, localLocation.longitude];
    }
    
    // If not found locally, use Nominatim
    // We add delay to respect usage policy
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}, Yogyakarta, Indonesia&limit=1`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to geocode: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    
    return null;
  } catch (error) {
    console.error('Error geocoding location:', error);
    return null;
  }
};