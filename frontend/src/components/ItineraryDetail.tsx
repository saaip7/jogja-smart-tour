"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ItineraryService } from "@/app/services/itinerary.service";
import { printStyles } from "./itinerary/itineraryPrintStyles";
import { useToast } from "@/hooks/use-toast";
import dynamic from "next/dynamic";
import { Itinerary } from "@/types/itinerary";

const ItineraryContent = dynamic(() => import("./itinerary/ItineraryContent"), {
  ssr: false,
});

export default function ItineraryDetailPage() {
  const { itineraryId } = useParams();
  const router = useRouter();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingItinerary, setDeletingItinerary] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!itineraryId) return;
    (async () => {
      try {
        setLoading(true);
        const data = await ItineraryService.getItineraryById(
          itineraryId as string
        );
        setItinerary(data);
      } catch (err) {
        console.error("Error fetching itinerary:", err);
        setError("Failed to load itinerary details.");
        toast({
          title: "Error",
          description: "Gagal memuat detail itinerary",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [itineraryId, toast]);

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = printStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleDeleteItinerary = async () => {
    if (!itinerary) return;
    try {
      setDeletingItinerary(true);
      toast({
        title: "Menghapus itinerary",
        description: "Harap tunggu...",
        variant: "default",
      });

      await ItineraryService.deleteItinerary(itinerary.id);

      toast({
        title: "Berhasil",
        description: "Itinerary telah dihapus",
        variant: "success",
      });

      router.push("/itinerary");
    } catch (err) {
      console.error("Error deleting itinerary:", err);
      toast({
        title: "Error",
        description: "Gagal menghapus itinerary",
        variant: "destructive",
      });
    } finally {
      setDeletingItinerary(false);
      setShowDeleteDialog(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 animate-pulse">
        <div className="h-8 w-64 bg-muted rounded mb-6"></div>
        <div className="h-48 bg-muted rounded mb-6"></div>
        <div className="h-96 bg-muted rounded"></div>
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className="container mx-auto p-4">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {" "}
            {error || "Itinerary not found"}
          </span>
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push("/itinerary")}
        >
          Back to Itineraries
        </button>
      </div>
    );
  }

  return (
    <ItineraryContent
      itinerary={itinerary}
      showDeleteDialog={showDeleteDialog}
      setShowDeleteDialog={setShowDeleteDialog}
      deletingItinerary={deletingItinerary}
      handleDeleteItinerary={handleDeleteItinerary}
      handlePrint={handlePrint}
    />
  );
}
