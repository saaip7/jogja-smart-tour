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
import { ItineraryService } from "@/app/services/itinerary.service";
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
    // Form validation
    if (!title) {
      toast({
        title: "Error",
        description: "Judul rencana tidak boleh kosong",
        variant: "destructive",
      });
      return;
    }

    if (!preferences) {
      toast({
        title: "Error",
        description: "Harap isi preferensi wisata Anda",
        variant: "destructive",
      });
      return;
    }

    if (!budget) {
      toast({
        title: "Error",
        description: "Harap isi budget perjalanan Anda",
        variant: "destructive",
      });
      return;
    }

    if (!date) {
      toast({
        title: "Error",
        description: "Harap pilih tanggal perjalanan",
        variant: "destructive",
      });
      return;
    }

    if (selectedTypes.length === 0) {
      toast({
        title: "Error",
        description: "Harap pilih minimal satu jenis wisata",
        variant: "destructive",
      });
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
        date,
        tripTypes: selectedTypes,
        duration,
      };

      // Call AI service to generate itinerary
      const response = await ItineraryService.createItineraryWithAI(
        itineraryData as any // Type assertion as a workaround
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
        description: "Terjadi kesalahan saat membuat rencana perjalanan. Silakan coba lagi.",
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
          <Input
            id="title"
            placeholder="Masukkan judul perjalanan Anda..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Preferences Field */}
        <div className="space-y-2 md:flex-row md:flex md:space-y-0">
          <label
            htmlFor="preferences"
            className="block text-md font-medium md:w-1/3"
          >
            Preferensi
          </label>
          <Textarea
            id="preferences"
            placeholder="Apa tujuan wisata yang Anda ingin datangi?"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className="min-h-24"
          />
        </div>

        {/* Budget Field */}
        <div className="space-y-2 md:flex-row md:flex md:space-y-0">
          <label
            htmlFor="budget"
            className="block text-md font-medium md:w-1/3"
          >
            Budget
          </label>
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
            />
          </div>
        </div>

        {/* Date Field */}
        <div className="space-y-2 md:flex-row md:flex md:space-y-0">
          <label htmlFor="date" className="block text-md font-medium md:w-1/3">
            Tanggal Perjalanan
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
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
        </div>

        {/* Duration Field */}
        <div className="space-y-2 md:flex-row md:flex md:space-y-0">
          <label
            htmlFor="duration"
            className="block text-md font-medium md:w-1/3"
          >
            Lama Perjalanan
          </label>
          <div className="flex items-center w-full">
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              type="number"
              min="1"
              max="14"
              className="w-20 mr-2"
            />
            <span>hari</span>
          </div>
        </div>

        {/* Trip Types Field */}
        <div className="space-y-2 md:flex-row md:flex md:space-y-0">
          <label className="block text-md font-medium md:w-1/3">
            Jenis Wisata
          </label>
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