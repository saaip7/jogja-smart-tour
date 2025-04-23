import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/utils";

interface DestinationFilterProps {
  selectedCategory: string;
  priceRange: [number, number];
  ratingRange: [number, number];
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onRatingRangeChange: (range: [number, number]) => void;
}

const CATEGORIES = [
  { id: "all", name: "Semua" },
  { id: "alam", name: "Alam" },
  { id: "pantai", name: "Pantai" },
  { id: "budaya", name: "Budaya" },
  { id: "kuliner", name: "Kuliner" },
  { id: "candi", name: "Candi" },
  { id: "museum", name: "Museum" },
  { id: "belanja", name: "Belanja" },
  { id: "gunung", name: "Gunung" },
];

const MAX_PRICE = 500000;

export default function DestinationFilter({
  selectedCategory,
  priceRange,
  ratingRange,
  onCategoryChange,
  onPriceRangeChange,
  onRatingRangeChange,
}: DestinationFilterProps) {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);
  const [localRatingRange, setLocalRatingRange] = useState<[number, number]>(ratingRange);

  const handlePriceChange = (values: number[]) => {
    const newRange: [number, number] = [values[0], values[1]];
    setLocalPriceRange(newRange);
  };

  const handleRatingChange = (values: number[]) => {
    const newRange: [number, number] = [values[0], values[1]];
    setLocalRatingRange(newRange);
  };

  const applyFilters = () => {
    onPriceRangeChange(localPriceRange);
    onRatingRangeChange(localRatingRange);
  };

  const resetFilters = () => {
    setLocalPriceRange([0, MAX_PRICE]);
    setLocalRatingRange([0, 10]);
    onCategoryChange("all");
    onPriceRangeChange([0, MAX_PRICE]);
    onRatingRangeChange([0, 10]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category filter */}
          <div>
            <h3 className="font-medium mb-3">Kategori</h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => onCategoryChange(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price range filter */}
          <div>
            <h3 className="font-medium mb-3">Harga Tiket</h3>
            <div className="px-2">
              <Slider
                defaultValue={localPriceRange}
                min={0}
                max={MAX_PRICE}
                step={10000}
                value={localPriceRange}
                onValueChange={handlePriceChange}
                className="mb-6"
              />
              <div className="flex justify-between text-sm">
                <span>{formatRupiah(localPriceRange[0])}</span>
                <span>{formatRupiah(localPriceRange[1])}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Rating filter */}
          <div>
            <h3 className="font-medium mb-3">Rating</h3>
            <div className="px-2">
              <Slider
                defaultValue={localRatingRange}
                min={0}
                max={10}
                step={0.5}
                value={localRatingRange}
                onValueChange={handleRatingChange}
                className="mb-6"
              />
              <div className="flex justify-between text-sm">
                <span>{localRatingRange[0].toFixed(1)}</span>
                <span>{localRatingRange[1].toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button onClick={applyFilters} className="w-full">
              Terapkan Filter
            </Button>
            <Button
              onClick={resetFilters}
              variant="outline"
              className="w-full"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}