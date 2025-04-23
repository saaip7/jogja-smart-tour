// src/components/MapLocationsFetcher.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface MapLocationsFetcherProps {
  onReady?: () => void;
}

/**
 * Component to handle fetching and caching map locations data
 * This component doesn't render anything visible
 * It should be placed in your layout or root component
 */
const MapLocationsFetcher: React.FC<MapLocationsFetcherProps> = ({ onReady }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchAndCacheLocations = async () => {
      try {
        // Try to load from localStorage first
        const cachedData = localStorage.getItem('yogya_locations_data');
        const cachedTimestamp = localStorage.getItem('yogya_locations_timestamp');
        
        // Check if we have valid cached data less than 24 hours old
        if (cachedData && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp);
          const now = Date.now();
          const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
          
          if (now - timestamp < oneDay) {
            console.log('Using cached locations data');
            setIsLoading(false);
            onReady?.();
            return;
          }
        }

        // If no valid cache, fetch from server
        const response = await fetch('/data/yogya-locations.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch locations: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Save to localStorage with timestamp
        localStorage.setItem('yogya_locations_data', JSON.stringify(data));
        localStorage.setItem('yogya_locations_timestamp', Date.now().toString());
        
        setIsLoading(false);
        onReady?.();
      } catch (error) {
        console.error('Error fetching locations data:', error);
        setError('Failed to load locations data');
        
        toast({
          title: 'Error',
          description: 'Failed to load map data. Using fallback coordinates.',
          variant: 'warning',
        });
        
        setIsLoading(false);
      }
    };

    fetchAndCacheLocations();
  }, [onReady, toast]);

  // This component doesn't render anything visible
  return null;
};

export default MapLocationsFetcher;