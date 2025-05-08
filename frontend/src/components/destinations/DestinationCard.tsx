interface DestinationCardProps {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  price: number;
  rating: number;
}

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";
import { StarRating } from "./StarRating";

export function DestinationCard({
  id,
  name,
  description,
  imageUrl,
  location,
  price,
  rating,
}: DestinationCardProps) {
  return (
    <Link href={`/destinations/${id}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="h-48 relative">
          {/* Default image fallback if the specific image doesn't exist */}
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/beranda/placeholder.jpg";
            }}
          />
          {price > 0 && (
            <div className="absolute bottom-0 right-0 bg-primary-500 text-white px-3 py-1 text-sm font-medium">
              {formatRupiah(price)}
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs">
              {location}
            </Badge>
            {rating > 0 && <StarRating rating={rating} size="sm" />}
          </div>
          <h3 className="font-semibold text-lg mb-1">{name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
