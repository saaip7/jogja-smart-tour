"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ItineraryCard from "@/components/ItineraryCard";
import CreateItinerary from "@/components/CreateItinerary";
import { ItineraryService } from "@/app/services/itinerary.service";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useToast } from "../hooks/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
      setLoading(true);
      
      // Show toast for loading state
      toast({
        title: "Memuat data",
        description: "Sedang mengambil daftar itinerary...",
        variant: "default",
      });
      
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
      
      // Show success toast if data was loaded successfully
      if (data.length > 0) {
        toast({
          title: "Data berhasil dimuat",
          description: `${data.length} itinerary ditemukan`,
          variant: "success",
        });
      }
    } catch (err) {
      console.error("Error fetching itineraries:", err);
      setError("Gagal memuat daftar itinerary. Silakan coba lagi.");
      
      toast({
        title: "Error",
        description: "Gagal memuat daftar itinerary. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = (itineraryId: number) => {
    toast({
      title: "Berhasil",
      description: "Itinerary baru telah dibuat dan siap digunakan",
      variant: "success",
    });
    router.push(`/itinerary/${itineraryId}`);
  };

  const handleCreateNew = () => {
    setShowCreateForm(true);
    toast({
      title: "Buat Itinerary Baru",
      description: "Silakan isi detail untuk rencana perjalanan Anda",
      variant: "default",
    });
  };

  if (showCreateForm) {
    return (
      <div className="container mx-auto p-4">
        <CreateItinerary
          onBack={() => {
            setShowCreateForm(false);
            toast({
              title: "Dibatalkan",
              description: "Pembuatan itinerary dibatalkan",
              variant: "default",
            });
          }}
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
        <>
          <div className="mb-6">
            <Button
              onClick={handleCreateNew}
              className="bg-primary-500 hover:bg-primary-700"
            >
              + Buat Itinerary Baru
            </Button>
          </div>
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
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-6">
            Kamu belum memiliki itinerary
          </p>
          <Button
            onClick={handleCreateNew}
            className="bg-primary-500 hover:bg-primary-700"
          >
            Buat Itinerary Pertamamu
          </Button>
        </div>
      )}
    </div>
  );
}