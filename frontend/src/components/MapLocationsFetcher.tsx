// src/components/MapLocationsFetcher.tsx
"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface MapLocationsFetcherProps {
  onReady?: () => void;
}

/**
 * Component to handle fetching and caching map locations data
 * This component doesn't render anything visible
 * It should be placed in your layout or root component
 */
const MapLocationsFetcher: React.FC<MapLocationsFetcherProps> = ({
  onReady,
}) => {
  const { toast } = useToast();

  useEffect(() => {
    const fetchAndCacheLocations = async () => {
      try {
        // Check if localStorage is available (prevents SSR issues)
        if (typeof window === "undefined" || !window.localStorage) {
          console.log("LocalStorage not available, fetching fresh data");
          await fetchFreshData();
          return;
        }

        // Try to load from localStorage first
        const cachedData = localStorage.getItem("yogya_locations_data");
        const cachedTimestamp = localStorage.getItem(
          "yogya_locations_timestamp"
        );

        // Check if we have valid cached data less than 24 hours old
        if (cachedData && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp);
          const now = Date.now();
          const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

          if (now - timestamp < oneDay) {
            console.log("Using cached locations data");
            onReady?.();
            return;
          }
        }

        await fetchFreshData();
      } catch (error) {
        console.error("Error fetching locations data:", error);

        // Show error notification
        toast({
          title: "Map Data Error",
          description: "Failed to load map data. Using fallback coordinates.",
          variant: "warning",
        });

        // Still call onReady even if there's an error, to prevent the app from hanging
        onReady?.();
      }
    };

    // Helper function to fetch fresh data from the server
    const fetchFreshData = async () => {
      const response = await fetch("/data/yogya-locations.json");

      if (!response.ok) {
        throw new Error(`Failed to fetch locations: ${response.statusText}`);
      }

      const data = await response.json();

      // Save to localStorage with timestamp if available
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("yogya_locations_data", JSON.stringify(data));
        localStorage.setItem(
          "yogya_locations_timestamp",
          Date.now().toString()
        );
      }

      onReady?.();
    };

    fetchAndCacheLocations();
  }, [onReady, toast]);

  // This component doesn't render anything visible
  return null;
};

export default MapLocationsFetcher;
