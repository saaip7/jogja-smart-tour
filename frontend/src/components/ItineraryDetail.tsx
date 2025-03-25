// src/components/ItineraryDetail.tsx
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
import { useToast } from "@/hooks/use-toast";

export default function ItineraryDetailPage() {
  const { itineraryId } = useParams();
  const router = useRouter();
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingItinerary, setDeletingItinerary] = useState(false);
  const { toast } = useToast();

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
      toast({
        title: "Error",
        description: "Gagal memuat detail itinerary",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
          <ChevronLeft className="mr-2 h-4 w-4" /> Kembali ke daftar itinerary
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header with back button and delete button */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => router.push("/itinerary")}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Hapus Itinerary
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apakah Anda yakin?</DialogTitle>
              <DialogDescription>
                Tindakan ini tidak dapat dibatalkan. Itinerary akan dihapus secara permanen.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteItinerary}
                disabled={deletingItinerary}
              >
                {deletingItinerary ? "Menghapus..." : "Hapus"}
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
            <CardTitle className="text-lg">Detail Perjalanan</CardTitle>
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
              <span>{itinerary.preferensi_wisata.durasi_hari} hari</span>
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
              <span>Transportasi</span>
              <span>
                {formatRupiah(itinerary.estimasi_biaya[0]?.transportasi || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Akomodasi</span>
              <span>
                {formatRupiah(itinerary.estimasi_biaya[0]?.akomodasi || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Makanan</span>
              <span>
                {formatRupiah(itinerary.estimasi_biaya[0]?.makan || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tiket Masuk</span>
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
            <CardTitle className="text-lg">Catatan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {itinerary.notes ||
                "Itinerary ini dibuat berdasarkan preferensi perjalanan Anda ke Yogyakarta."}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Daily itinerary */}
      <h2 className="text-2xl font-bold mb-4">Rencana Perjalanan</h2>
      {groupedByDay && Object.keys(groupedByDay).length > 0 ? (
        (Object.entries(groupedByDay) as [string, any[]][])
                  .sort(([dayA], [dayB]) => parseInt(dayA) - parseInt(dayB))
                  .map(([day, details]) => (
            <Card key={day} className="mb-6">
              <CardHeader>
                <CardTitle>Hari {day}</CardTitle>
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
                          Tiket masuk:{" "}
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
          <AlertTitle>Tidak ada destinasi</AlertTitle>
          <AlertDescription>
            Itinerary ini belum memiliki destinasi.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}