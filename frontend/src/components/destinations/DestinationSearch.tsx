import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DestinationSearchProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
}

export default function DestinationSearch({
  initialQuery = "",
  onSearch,
}: DestinationSearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Input
        type="text"
        placeholder="Cari destinasi wisata..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-4 pr-12 py-2 w-full"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full"
      >
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}