import React from "react";

interface MapLegendProps {
  days: number[];
}

// Function to get a color based on the day number (same as in ItineraryMap)
const getDayColor = (day: number): string => {
  const colors = [
    "#FF5733", // Red-Orange
    "#33A8FF", // Blue
    "#FF33A8", // Pink
    "#A833FF", // Purple
    "#33FF57", // Green
    "#FFD433", // Yellow
    "#33FFF5", // Cyan
  ];
  return colors[day % colors.length];
};

const MapLegend: React.FC<MapLegendProps> = ({ days }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-2 mb-4">
      <h4 className="font-semibold mb-2">Legend</h4>
      <div className="flex flex-wrap gap-4">
        {days.map((day) => (
          <div key={day} className="flex items-center gap-2">
            <div
              style={{ backgroundColor: getDayColor(day) }}
              className="w-5 h-5 rounded-full"
            ></div>
            <span>Day {day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;

