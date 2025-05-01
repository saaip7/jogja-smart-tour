// Main itinerary interface
export interface Itinerary {
  id: number;
  title: string;
  user_id: string;
  preferensi_id: number;
  total_biaya: number;
  created_at: string;
  preferensi_wisata: {
    jenis_wisata: string | string[];
    budget: number;
    durasi_hari: number;
    tanggal_perjalanan: string;
  };
  estimasi_biaya: {
    transportasi: number;
    akomodasi: number;
    makan: number;
    tiket_wisata: number;
    total_biaya: number;
  }[];
  itinerary_detail: ItineraryDetailItem[];
  notes?: string;
}

// Type for an individual itinerary detail item
export interface ItineraryDetailItem {
  destinasi: {
    id: number;
    nama_destinasi: string;
    lokasi: string;
    kategori: string;
    harga_tiket: number;
    rating: number;
    latitude?: number;
    longitude?: number;
  };
  urutan_hari: number;
}

// Type for the destination with day information for map
export interface DestinationWithDay {
  id: number;
  nama_destinasi: string;
  lokasi: string;
  kategori: string;
  harga_tiket: number;
  rating: number;
  latitude?: number;
  longitude?: number;
  urutan_hari: number;
}

// Type for the grouped itinerary details by day
export interface GroupedByDay {
  [day: string]: ItineraryDetailItem[];
}
