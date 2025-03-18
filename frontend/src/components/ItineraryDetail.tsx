"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ItineraryService } from "@/app/services/itinerary.service";
import { formatRupiah } from "@/lib/utils";
import { format } from "date-fns";
import {
  AlertCircle,
  ChevronLeft,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Trash2,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { useToast } from "@/components/ui/use-toast";

export default function ItineraryDetailPage() {
  const { itineraryId } = useParams();
  const router = useRouter();
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingItinerary, setDeletingItinerary] = useState(false);
  //   const { toast } = useToast();

  useEffect(() => {
    if (itineraryId) {
      fetchItinerary(itineraryId as string);
    }
  }, [itineraryId]);

  const fetchItinerary = async (id: string) => {
    try {
      setLoading(true);
      const data = await ItineraryService.getItineraryById(id);
      setItinerary(data);
    } catch (err) {
      console.error("Error fetching itinerary:", err);
      setError("Failed to load itinerary details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItinerary = async () => {
    if (!itinerary) return;

    try {
      setDeletingItinerary(true);
      await ItineraryService.deleteItinerary(itinerary.id);
      //   toast({
      //     title: "Success",
      //     description: "Itinerary has been deleted",
      //   });
      router.push("/itinerary");
    } catch (err) {
      console.error("Error deleting itinerary:", err);
      //   toast({
      //     title: "Error",
      //     description: "Failed to delete itinerary",
      //     variant: "destructive",
      //   });
    } finally {
      setDeletingItinerary(false);
      setShowDeleteDialog(false);
    }
  };

  // Group itinerary details by day
  const groupedByDay = itinerary?.itinerary_detail?.reduce(
    (acc: any, detail: any) => {
      const day = detail.urutan_hari;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(detail);
      return acc;
    },
    {}
  );

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
          <AlertDescription>{error || "Itinerary not found"}</AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => router.push("/itinerary")}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Itineraries
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header with back button and delete button */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => router.push("/itinerary")}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Delete Itinerary
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                itinerary.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteItinerary}
                disabled={deletingItinerary}
              >
                {deletingItinerary ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Itinerary title */}
      <h1 className="text-3xl font-bold mb-4">
        {itinerary.title || `Trip #${itinerary.id}`}
      </h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Trip details card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trip Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>
                {format(
                  new Date(itinerary.preferensi_wisata.tanggal_perjalanan),
                  "PPP"
                )}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{itinerary.preferensi_wisata.durasi_hari} days</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {typeof itinerary.preferensi_wisata.jenis_wisata === "string"
                ? itinerary.preferensi_wisata.jenis_wisata
                    .split(",")
                    .map((type: string, idx: number) => (
                      <Badge key={idx} variant="outline">
                        {type.trim()}
                      </Badge>
                    ))
                : itinerary.preferensi_wisata.jenis_wisata.map(
                    (type: string, idx: number) => (
                      <Badge key={idx} variant="outline">
                        {type.trim()}
                      </Badge>
                    )
                  )}
            </div>
          </CardContent>
        </Card>

        {/* Budget card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Budget</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Transportation</span>
              <span>
                {formatRupiah(itinerary.estimasi_biaya[0]?.transportasi || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Accommodation</span>
              <span>
                {formatRupiah(itinerary.estimasi_biaya[0]?.akomodasi || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Food</span>
              <span>
                {formatRupiah(itinerary.estimasi_biaya[0]?.makan || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Entrance Tickets</span>
              <span>
                {formatRupiah(itinerary.estimasi_biaya[0]?.tiket_wisata || 0)}
              </span>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between font-bold">
              <span>Total</span>
              <span>{formatRupiah(itinerary.total_biaya)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Notes card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {itinerary.notes ||
                "This itinerary was generated based on your preferences for Yogyakarta trip."}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Daily itinerary */}
      <h2 className="text-2xl font-bold mb-4">Itinerary Plan</h2>

      {groupedByDay && Object.keys(groupedByDay).length > 0 ? (
        Object.entries(groupedByDay)
          .sort(([dayA], [dayB]) => parseInt(dayA) - parseInt(dayB))
          .map(([day, details]: [string, any[]]) => (
            <Card key={day} className="mb-6">
              <CardHeader>
                <CardTitle>Day {day}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {details.map((detail: any, idx: number) => (
                    <div
                      key={idx}
                      className="border-l-2 border-primary pl-4 ml-2 py-2"
                    >
                      <h3 className="font-medium text-lg">
                        {detail.destinasi.nama_destinasi}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{detail.destinasi.lokasi}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>
                          Entrance fee:{" "}
                          {formatRupiah(detail.destinasi.harga_tiket)}
                        </span>
                      </div>
                      <Badge variant="outline" className="mt-2">
                        {detail.destinasi.kategori}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No destinations</AlertTitle>
          <AlertDescription>
            This itinerary doesn&apos;t have any destinations yet.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
