// src/components/itinerary/ItineraryContent.tsx

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Printer,
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

interface ItineraryContentProps {
  itinerary: any;
  showDeleteDialog: boolean;
  setShowDeleteDialog: (show: boolean) => void;
  deletingItinerary: boolean;
  handleDeleteItinerary: () => Promise<void>;
  handlePrint: () => void;
}

const ItineraryContent: React.FC<ItineraryContentProps> = ({
  itinerary,
  showDeleteDialog,
  setShowDeleteDialog,
  deletingItinerary,
  handleDeleteItinerary,
  handlePrint,
}) => {
  const router = useRouter();
  
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
  
  return (
    <div className="container mx-auto p-4">
      {/* Navigation buttons - will be hidden during print */}
      <div className="flex items-center justify-between mb-6 no-print">
        <Button variant="outline" onClick={() => router.push("/itinerary")}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handlePrint}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
          >
            <Printer className="mr-2 h-4 w-4" /> Cetak Itinerary
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
      </div>

      {/* Print-only header - only shows when printing */}
      <div className="print-only-header">
        <div className="flex justify-center mb-4">
          <div className="w-48 h-12 relative">
            <img src="/Logo_JST.svg" alt="Jogja Smart Tour Logo" className="w-full" />
          </div>
        </div>
        <h2 className="text-center text-lg mb-2 text-gray-600">Jogja Smart Tour - Rencana Perjalanan</h2>
        <Separator className="mb-4" />
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
          <Card key={day} className="mb-6 page-break-inside-avoid">
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

      {/* Print-only footer */}
      <div className="print-only-footer">
        <Separator className="mb-4" />
        <p className="text-center text-sm text-gray-500">
          Dicetak melalui Jogja Smart Tour pada {new Date().toLocaleDateString('id-ID')}
        </p>
      </div>
    </div>
  );
};

export default ItineraryContent;