// src/hooks/use-map-locations.ts
import { useState, useEffect } from 'react';

export interface MapLocation {
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  description?: string;
}

/**
 * Hook to access cached map locations data
 */
export const useMapLocations = () => {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        // Try to get from localStorage first
        const cachedData = localStorage.getItem('yogya_locations_data');
        
        if (cachedData) {
          setLocations(JSON.parse(cachedData));
          setIsLoading(false);
          return;
        }
        
        // If not in localStorage, fetch from server
        const response = await fetch('/data/yogya-locations.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch locations: ${response.statusText}`);
        }
        
        const data = await response.json();
        setLocations(data);
        
        // Save to localStorage for future use
        localStorage.setItem('yogya_locations_data', JSON.stringify(data));
        localStorage.setItem('yogya_locations_timestamp', Date.now().toString());
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading locations:', error);
        setError('Failed to load locations data');
        setIsLoading(false);
      }
    };

    loadLocations();
  }, []);

  // Search for a location by name with fuzzy matching
  const findLocation = (name: string, threshold = 0.7): MapLocation | null => {
    if (!name || locations.length === 0) return null;
    
    // Try exact match first
    const exactMatch = locations.find(
      loc => loc.name.toLowerCase() === name.toLowerCase()
    );
    
    if (exactMatch) return exactMatch;
    
    // Try partial match
    for (const location of locations) {
      if (location.name.toLowerCase().includes(name.toLowerCase()) || 
          name.toLowerCase().includes(location.name.toLowerCase())) {
        return location;
      }
    }
    
    return null;
  };

  // Find locations by category
  const findLocationsByCategory = (category: string): MapLocation[] => {
    if (!category || locations.length === 0) return [];
    
    return locations.filter(
      loc => loc.category.toLowerCase() === category.toLowerCase()
    );
  };

  return {
    locations,
    isLoading,
    error,
    findLocation,
    findLocationsByCategory
  };
};