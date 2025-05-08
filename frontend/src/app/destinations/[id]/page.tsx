"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Attraction } from "@/app/utils/attractions.utils";
import { loadAttractionData } from "@/app/services/data.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { StarRating } from "@/components/destinations/StarRating";
import BackToTop from "@/components/destinations/BackToTop";
import { formatRupiah } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { OwnButton } from "@/components/OwnButton";

export default function DestinationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [attraction, setAttraction] = useState<Attraction | null>(null);
  const [relatedAttractions, setRelatedAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAttraction = async () => {
      setIsLoading(true);
      try {
        const data = await loadAttractionData();
        
        const foundAttraction = data.find(item => item.no === Number(id));
        
        if (foundAttraction) {
          setAttraction(foundAttraction);
          
          if (foundAttraction.type) {
            const related = data
              .filter(item => 
                item.type === foundAttraction.type && 
                item.no !== foundAttraction.no
              )
              .slice(0, 4);
            
            setRelatedAttractions(related);
          }
        }
      } catch (error) {
        console.error("Failed to load attraction:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchAttraction();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <Skeleton className="h-[400px] w-full rounded-lg" />
              <div className="mt-6 space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
            <div className="md:w-1/3">
              <Skeleton className="h-[300px] w-full rounded-lg" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!attraction) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Destinasi tidak ditemukan</h1>
          <p className="mb-8">Maaf, destinasi yang Anda cari tidak tersedia.</p>
          <Button onClick={() => router.push("/destinations")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke daftar destinasi
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <BackToTop />
      
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary-500">Beranda</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/destinations" className="hover:text-primary-500">Destinasi</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900">{attraction.nama}</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img 
                src={`/destinations/${Number(id) % 10 + 1}.jpg`} 
                alt={attraction.nama}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/beranda/placeholder.jpg";
                }}
              />
              {attraction.type && (
                <Badge className="absolute top-4 left-4 bg-primary-500 text-white">
                  {attraction.type}
                </Badge>
              )}
            </div>
            
            <div className="mt-6">
              <h1 className="text-3xl font-bold mb-2">{attraction.nama}</h1>
              <div className="flex items-center mb-4 gap-2">
                {attraction.vote_average ? (
                  <StarRating rating={attraction.vote_average} size="lg" />
                ) : (
                  <span className="text-gray-500">Belum ada rating</span>
                )}
                <span className="text-gray-500">
                  ({attraction.vote_count || 0} ulasan)
                </span>
                {attraction.type && (
                  <>
                    <span className="text-gray-300 mx-2">•</span>
                    <Badge variant="outline">{attraction.type}</Badge>
                  </>
                )}
              </div>
              
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Yogyakarta, Indonesia</span>
              </div>
              
              <div className="prose max-w-none mb-8">
                <h2 className="text-xl font-semibold mb-4">Tentang {attraction.nama}</h2>
                <p className="text-gray-700">
                  {attraction.description || 
                    `${attraction.nama} adalah salah satu destinasi wisata terpopuler di Yogyakarta. Nikmati keindahan dan keunikan tempat ini saat berkunjung ke Yogyakarta.`}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Card>
                  <CardContent className="flex items-center p-4">
                    <DollarSign className="h-10 w-10 text-primary-500 mr-4" />
                    <div>
                      <h3 className="font-medium text-gray-500">Harga Tiket Masuk</h3>
                      <p className="text-lg font-semibold">
                        {attraction.htm_weekday ? formatRupiah(attraction.htm_weekday) : "Gratis"}
                      </p>
                      {attraction.htm_weekend && attraction.htm_weekend !== attraction.htm_weekday && (
                        <p className="text-sm text-gray-500">
                          Weekend: {formatRupiah(attraction.htm_weekend)}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex items-center p-4">
                    <Clock className="h-10 w-10 text-primary-500 mr-4" />
                    <div>
                      <h3 className="font-medium text-gray-500">Jam Operasional</h3>
                      <p className="text-lg font-semibold">08:00 - 17:00</p>
                      <p className="text-sm text-gray-500">Buka setiap hari</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Lokasi</h2>
                <div className="bg-gray-200 rounded-lg h-[300px] flex items-center justify-center">
                  <p className="text-gray-500">Peta lokasi {attraction.nama}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/3">
            <Card className="sticky top-4 mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Rencanakan Kunjungan Anda</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-2 text-primary-500" />
                    <span>Pilih tanggal kunjungan</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 mr-2 text-primary-500" />
                    <span>Pilih durasi kunjungan</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link href="/itinerary" className="w-full">
                    <OwnButton className="w-full">
                      Tambahkan ke Itinerary
                    </OwnButton>
                  </Link>
                  
                  <Button variant="outline" className="w-full">
                    Bagikan Destinasi
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {relatedAttractions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Destinasi Terkait</h3>
                <div className="space-y-4">
                  {relatedAttractions.map((item) => (
                    <Link 
                      key={item.no} 
                      href={`/destinations/${item.no}`}
                      className="block"
                    >
                      <Card className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex">
                          <div className="w-24 h-24">
                            <img 
                              src={`/destinations/${item.no % 10 + 1}.jpg`} 
                              alt={item.nama}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/beranda/placeholder.jpg";
                              }}
                            />
                          </div>
                          <CardContent className="flex-1 p-3">
                            <h4 className="font-medium line-clamp-1">{item.nama}</h4>
                            <div className="mt-1">
                              {item.vote_average ? (
                                <StarRating rating={item.vote_average} size="sm" showValue={true} />
                              ) : (
                                <span className="text-xs text-gray-500">Belum ada rating</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                              {item.htm_weekday ? formatRupiah(item.htm_weekday) : "Gratis"}
                            </p>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
