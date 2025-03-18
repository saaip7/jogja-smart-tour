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
    if (
      !title ||
      !preferences ||
      !budget ||
      !date ||
      selectedTypes.length === 0
    ) {
      // If you have a toast component, uncomment this
      // toast({
      //   title: "Missing Information",
      //   description: "Please fill out all required fields",
      //   variant: "destructive",
      // });
      console.error("Missing required fields");
      return;
    }

    setIsLoading(true);

    try {
      const itineraryData = {
        title,
        preferences,
        budget,
        date, // Now we know date is defined because of the validation above
        tripTypes: selectedTypes,
        duration,
      };

      // Call AI service to generate itinerary
      const response = await ItineraryService.createItineraryWithAI(
        itineraryData as any // Type assertion as a workaround
      );

      // toast({
      //   title: "Success!",
      //   description: "Your itinerary has been created",
      // });

      if (onSuccess && response.id) {
        onSuccess(response.id);
      } else {
        onBack();
      }
    } catch (error) {
      console.error("Error creating itinerary:", error);
      // toast({
      //   title: "Error",
      //   description: "Failed to create itinerary. Please try again.",
      //   variant: "destructive",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Itinerary</h2>

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
          <Input
            id="budget"
            placeholder="Berapa budget Anda? (dalam Rupiah)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            type="number"
          />
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
          <div className="flex items-center">
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
          <div className="flex flex-wrap gap-2">
            {tripTypes.map((type) => (
              <Button
                key={type}
                type="button"
                variant={selectedTypes.includes(type) ? "default" : "outline"}
                onClick={() => toggleTripType(type)}
                className="mb-2"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Kembali
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Itinerary"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateItinerary;
