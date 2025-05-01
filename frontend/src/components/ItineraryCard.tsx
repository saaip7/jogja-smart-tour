import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";

interface ItineraryCardProps {
  id: number;
  title: string;
  totalCost: number;
  date: string;
  duration: number;
  tripTypes: string[] | string;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  id,
  title,
  totalCost,
  date,
  duration,
  tripTypes,
}) => {
  const formattedDate = new Date(date);

  return (
    <Link href={`/itinerary/${id}`} className="block">
      <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg line-clamp-2">
              {title || "Trip to Yogyakarta"}
            </CardTitle>
          </div>
          <CardDescription className="mt-2 flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            {format(formattedDate, "PPP")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  {duration} {duration > 1 ? "days" : "day"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>{formatRupiah(totalCost)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              {Array.isArray(tripTypes)
                ? tripTypes.map((type: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {type.trim()}
                    </Badge>
                  ))
                : typeof tripTypes === "string" &&
                  tripTypes.split(",").map((type: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {type.trim()}
                    </Badge>
                  ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ItineraryCard;
