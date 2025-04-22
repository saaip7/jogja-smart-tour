// src/components/ItineraryDetail.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Itinerary, ItineraryService } from "@/app/services/itinerary.service";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ItineraryContent from "./itinerary/ItineraryContent";
import { printStyles } from "./itinerary/itineraryPrintStyles";

export default function ItineraryDetailPage() {
  const { itineraryId } = useParams();
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

  // Simple print handler using native browser printing
  const handlePrint = () => {
    toast({
      title: "Menyiapkan dokumen",
      description: "Sedang menyiapkan itinerary untuk dicetak...",
      variant: "default",
    });

    // Small delay to allow toast to display and then hide before printing
    setTimeout(() => {
      window.print();

      // Toast after print dialog closes
      setTimeout(() => {
        toast({
          title: "Cetak siap",
          description: "Itinerary Anda siap untuk dicetak",
          variant: "success",
        });
      }, 500);
    }, 500);
  };

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

      window.location.href = "/itinerary";
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

  const renderContent = () => {
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
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error || "Itinerary not found"}
            </AlertDescription>
          </Alert>
          <Button
            className="mt-4"
            onClick={() => (window.location.href = "/itinerary")}
          >
            Kembali ke daftar itinerary
          </Button>
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
  };

  return (
    <div className="flex h-screen w-full">
      <SidebarProvider>
        <AppSidebar onSelect={() => {}} className="h-full" />
        <div className="flex-1 flex flex-col h-full overflow-y-auto bg-gray-100">
          {renderContent()}
        </div>
      </SidebarProvider>

      {/* Add print-specific CSS */}
      <style jsx global>
        {printStyles}
      </style>
    </div>
  );
}
