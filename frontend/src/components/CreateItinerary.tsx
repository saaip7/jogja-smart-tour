"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ItineraryService,
  ItineraryFormData,
} from "@/app/services/itinerary.service";
import { useToast } from "../hooks/use-toast";

type TripType = "Alam" | "Budaya" | "Kuliner" | "Pantai" | "Gunung" | "Belanja";

interface CreateItineraryProps {
  onBack: () => void;
  onSuccess?: (itineraryId: number) => void;
}

const CreateItinerary: React.FC<CreateItineraryProps> = ({
  onBack,
  onSuccess,
}) => {
  const [title, setTitle] = useState<string>("");
  const [preferences, setPreferences] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [duration, setDuration] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<TripType[]>([
    "Alam",
    "Kuliner",
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { toast } = useToast();

  const tripTypes: TripType[] = [
    "Alam",
    "Budaya",
    "Kuliner",
    "Pantai",
    "Gunung",
    "Belanja",
  ];

  const toggleTripType = (type: TripType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleSubmit = async () => {
    // Clear previous errors
    setErrors({});
    
    // Validate fields
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = "Judul rencana tidak boleh kosong";
    }
    
    if (!preferences.trim()) {
      newErrors.preferences = "Harap isi preferensi wisata Anda";
    } else if (preferences.trim().length < 10) {
      newErrors.preferences = "Preferensi terlalu singkat. Jelaskan lebih detail tempat atau aktivitas yang Anda inginkan";
    } else if (preferences.trim().split(/\s+/).length < 5) {
      newErrors.preferences = "Berikan minimal 5 kata untuk preferensi Anda. Contoh: 'Saya ingin mengunjungi pantai dan candi'";
    }
    
    const budgetValue = Number(budget);
    if (!budget || isNaN(budgetValue)) {
      newErrors.budget = "Harap isi budget perjalanan dengan nilai numerik";
    } else if (budgetValue < 100000) {
      newErrors.budget = "Budget minimum adalah Rp 100.000";
    } else if (budgetValue > 100000000) {
      newErrors.budget = "Budget maksimum adalah Rp 100.000.000";
    }
    
    if (!date) {
      newErrors.date = "Harap pilih tanggal perjalanan";
    } else if (date < new Date()) {
      newErrors.date = "Tanggal perjalanan tidak boleh di masa lalu";
    }
    
    if (selectedTypes.length === 0) {
      newErrors.tripTypes = "Harap pilih minimal satu jenis wisata";
    }
    
    if (duration <= 0 || duration > 14) {
      newErrors.duration = "Durasi harus antara 1-14 hari";
    }
    
    // If there are errors, show them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
   
    try {
      toast({
        title: "Sedang Memproses",
        description: "Membuat rencana perjalanan Anda...",
        variant: "default",
      });
      const itineraryData = {
        title,
        preferences,
        budget,
        date: date as Date, // date is already checked for null above
        tripTypes: selectedTypes,
        duration,
      };
      // Call AI service to generate itinerary
      const response = await ItineraryService.createItineraryWithAI(
        itineraryData
      );

      toast({
        title: "Berhasil!",
        description: "Rencana perjalanan Anda telah dibuat",
        variant: "success",
      });

      if (onSuccess && response.id) {
        onSuccess(response.id);
      } else {
        onBack();
      }
    } catch (error) {
      console.error("Error creating itinerary:", error);
      toast({
        title: "Gagal",
        description:
          "Terjadi kesalahan saat membuat rencana perjalanan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-4 md:p-6">
      <div className="space-y-6 p-0">
        {/* Title Field */}
        <div className="space-y-2 md:flex-row md:flex md:space-y-0">
          <label htmlFor="title" className="block text-md font-medium md:w-1/3">
            Judul Rencana
          </label>
          <div className="w-full">
            <Input
              id="title"
              placeholder="Masukkan judul perjalanan Anda..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
        </div>

        {/* Preferences Field */}
        <div className="space-y-2 md:flex-row md:flex md:space-y-0">
          <label
            htmlFor="preferences"
            className="block text-md font-medium md:w-1/3"
          >
            Preferensi
          </label>
          <div className="w-full">
            <Textarea
              id="preferences"
              placeholder="Apa tujuan wisata yang Anda ingin datangi? Berikan detail tentang aktivitas, tempat, atau pengalaman yang Anda harapkan."
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              className={`min-h-24 ${errors.preferences ? "border-red-500" : ""}`}
            />
            {errors.preferences && <p className="text-red-500 text-sm mt-1">{errors.preferences}</p>}
          </div>
        </div>

        {/* Budget Field */}
        <div className="space-y-2 md:flex-row md:flex md:space-y-0">
          <label
            htmlFor="budget"
            className="block text-md font-medium md:w-1/3"
          >
            Budget
          </label>
          <div className="w-full">
            <div className="flex w-full">
              <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-gray-50">
                Rp
              </div>
              <Input
                id="budget"
                placeholder="Berapa budget Anda? (dalam Rupiah)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                type="number"
                className={errors.budget ? "border-red-500" : ""}
              />
            </div>
            {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
          </div>
        </div>

        {/* Date Field */}
        <div className="space-y-2 md:flex-row md:flex md:space-y-0">
          <label htmlFor="date" className="block text-md font-medium md:w-1/3">
            Tanggal Perjalanan
          </label>
          <div className="w-full">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                    errors.date && "border-red-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pilih tanggal</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>
        </div>

        {/* Duration Field */}
        <div className="space-y-2 md:flex-row md:flex md:space-y-0">
          <label
            htmlFor="duration"
            className="block text-md font-medium md:w-1/3"
          >
            Lama Perjalanan
          </label>
          <div className="w-full">
            <div className="flex items-center">
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                type="number"
                min="1"
                max="14"
                className={`w-20 mr-2 ${errors.duration ? "border-red-500" : ""}`}
              />
              <span>hari</span>
            </div>
            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
          </div>
        </div>

        {/* Trip Types Field */}
        <div className="space-y-2 md:flex-row md:flex md:space-y-0">
          <label className="block text-md font-medium md:w-1/3">
            Jenis Wisata
          </label>
          <div className="w-full">
            <div className="flex flex-wrap gap-2 w-full">
              {tripTypes.map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={selectedTypes.includes(type) ? "selected" : "outline"}
                  onClick={() => toggleTripType(type)}
                  className="flex-grow sm:flex-grow-0 rounded-3xl"
                >
                  {type}
                </Button>
              ))}
            </div>
            {errors.tripTypes && <p className="text-red-500 text-sm mt-1">{errors.tripTypes}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-32 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? "Membuat..." : "Buat Rencana"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateItinerary;
