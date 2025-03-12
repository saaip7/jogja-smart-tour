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

type TripType = "Alam" | "Budaya" | "Kuliner" | "Pantai" | "Gunung" | "Belanja";

interface CreateItineraryProps {
  onBack: () => void;
}

const CreateItinerary: React.FC<CreateItineraryProps> = ({ onBack }) => {
  const [title, setTitle] = useState<string>("");
  const [preferences, setPreferences] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
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

  const handleSubmit = () => {
    const itineraryData = {
      title,
      preferences,
      budget,
      date,
      tripTypes: selectedTypes,
    };
    console.log("Itinerary Data:", itineraryData);
    // Here you would typically send this data to your backend

    // After successful submission, navigate back to the itinerary list
    onBack();
  };

  return (
    <div className="max-w-2xl p-4 md:p-6">
      <div className="space-y-6 p-0">
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

        <div className="space-y-2 md:flex-row md:flex md:space-y-0">
          <label
            htmlFor="budget"
            className="block text-md font-medium md:w-1/4"
          >
            Budget
          </label>
          <div className="flex md:w-3/4">
            <div className="flex  items-center justify-center px-3 border border-r-0 rounded-l-md bg-gray-50">
              Rp
            </div>
            <Input
              id="budget"
              placeholder="Berapa budget perjalanan kali ini?"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="rounded-l-none"
            />
          </div>
        </div>

        <div className="space-y-2 md:flex-row md:flex md:space-y-0">
          <label htmlFor="date" className="block text-md font-medium md:w-1/3">
            Tanggal
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pilih tanggal liburanmu"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2 md:flex-row md:flex md:space-y-0">
          <label className="block text-md font-medium md:w-1/4">
            Jenis wisata
          </label>
          <div className="flex flex-wrap gap-2 md:w-3/4">
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

        <div className="flex justify-end w-full">
          <Button
            onClick={handleSubmit}
            className="w-32 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Buat Rencana
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateItinerary;
