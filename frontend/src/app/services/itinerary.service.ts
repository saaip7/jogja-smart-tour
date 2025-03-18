import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface ItineraryFormData {
  title: string;
  preferences: string;
  budget: string;
  date: Date;
  tripTypes: string[];
  duration: number;
}

export interface Itinerary {
  id: number;
  title: string;
  user_id: string;
  preferensi_id: number;
  total_biaya: number;
  created_at: string;
  preferensi_wisata: {
    jenis_wisata: string;
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
  itinerary_detail: {
    destinasi: {
      id: number;
      nama_destinasi: string;
      lokasi: string;
      kategori: string;
      harga_tiket: number;
      rating: number;
    };
    urutan_hari: number;
  }[];
}

export const ItineraryService = {
  async createItineraryWithAI(data: ItineraryFormData): Promise<Itinerary> {
    const response = await axios.post(`${API_URL}/itinerary/ai`, data, {
      withCredentials: true,
    });
    return response.data;
  },

  async getUserItineraries(): Promise<Itinerary[]> {
    const response = await axios.get(`${API_URL}/itinerary`, {
      withCredentials: true,
    });
    return response.data;
  },

  async getItineraryById(id: string): Promise<Itinerary> {
    const response = await axios.get(`${API_URL}/itinerary/${id}`, {
      withCredentials: true,
    });
    return response.data;
  },

  async deleteItinerary(id: number): Promise<void> {
    await axios.delete(`${API_URL}/itinerary/${id}`, {
      withCredentials: true,
    });
  },
};
