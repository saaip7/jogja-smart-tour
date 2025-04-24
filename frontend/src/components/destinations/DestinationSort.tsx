import Select from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface DestinationSortProps {
  sortOption: string;
  onSortChange: (option: string) => void;
}

export default function DestinationSort({
  sortOption,
  onSortChange,
}: DestinationSortProps) {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Urutkan:</span>
      <div className="relative inline-block w-[180px]">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="appearance-none w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <option value="popularity">Popularitas</option>
          <option value="rating-high">Rating (Tertinggi)</option>
          <option value="rating-low">Rating (Terendah)</option>
          <option value="price-high">Harga (Tertinggi)</option>
          <option value="price-low">Harga (Terendah)</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}