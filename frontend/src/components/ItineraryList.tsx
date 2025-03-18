"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ItineraryCard from "@/components/ItineraryCard";
import CreateItinerary from "@/components/CreateItinerary";
import { ItineraryService } from "@/app/services/itinerary.service";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

interface Itinerary {
  id: number;
  title?: string;
  total_biaya: number;
  preferensi_wisata: {
    tanggal_perjalanan: string;
    durasi_hari: number;
    jenis_wisata: string[];
  };
}

export default function ItineraryList() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
      setLoading(true);
      const data = await ItineraryService.getUserItineraries();
      const formattedData = data.map((item) => ({
        ...item,
        preferensi_wisata: {
          ...item.preferensi_wisata,
          jenis_wisata: Array.isArray(item.preferensi_wisata.jenis_wisata)
            ? item.preferensi_wisata.jenis_wisata
            : item.preferensi_wisata.jenis_wisata.split(","),
        },
      }));
      setItineraries(formattedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching itineraries:", err);
      setError("Failed to load itineraries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = (itineraryId: number) => {
    router.push(`/itinerary/${itineraryId}`);
  };

  if (showCreateForm) {
    return (
      <div className="container mx-auto p-4">
        <CreateItinerary
          onBack={() => setShowCreateForm(false)}
          onSuccess={handleCreateSuccess}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-md bg-muted animate-pulse" />
          ))}
        </div>
      ) : itineraries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((itinerary) => (
            <ItineraryCard
              key={itinerary.id}
              id={itinerary.id}
              title={itinerary.title || `Trip #${itinerary.id}`}
              totalCost={itinerary.total_biaya}
              date={itinerary.preferensi_wisata.tanggal_perjalanan}
              duration={itinerary.preferensi_wisata.durasi_hari}
              tripTypes={itinerary.preferensi_wisata.jenis_wisata}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-6">
            Kamu belum memiliki itinerary
          </p>
          {/* <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-primary-500 hover:bg-primary-700"
          >
            Create Your First Itinerary
          </Button> */}
        </div>
      )}
    </div>
  );
}
