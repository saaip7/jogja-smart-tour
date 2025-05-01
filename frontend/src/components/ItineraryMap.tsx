"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  ZoomControl,
  useMap,
  LayersControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { geocodeLocation } from "@/app/services/location-data.service";
import "@/styles/map-styles.css";
import { DestinationWithDay } from "@/types/itinerary";

const mapStyles = {
  standard: {
    name: "Standard",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  topographic: {
    name: "Topographic",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
  },
  humanitarian: {
    name: "Humanitarian",
    url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://www.hotosm.org/">HOT</a>',
  },
  cycleMap: {
    name: "Cycle Map",
    url: "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://www.cyclosm.org/">CyclOSM</a>',
  },
  watercolor: {
    name: "Watercolor",
    url: "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
    attribution:
      '&copy; <a href="https://stamen.com">Stamen Design</a> contributors',
  },
};

interface EnhancedItineraryMapProps {
  destinations: DestinationWithDay[];
}

const getDayColor = (day: number): string => {
  const colors = [
    "#FF5733",
    "#33A8FF",
    "#FF33A8",
    "#A833FF",
    "#33FF57",
    "#FFD433",
    "#33FFF5",
  ];
  return colors[day % colors.length];
};

const MapBoundsFitter = ({
  destinations,
}: {
  destinations: DestinationWithDay[];
}) => {
  const map = useMap();

  useEffect(() => {
    if (destinations.length > 0) {
      const points = destinations
        .filter((d) => d.latitude && d.longitude)
        .map((d) => [d.latitude || 0, d.longitude || 0]);

      if (points.length > 0) {
        const bounds = L.latLngBounds(points as [number, number][]);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [destinations, map]);

  return null;
};

const MapLoading = () => (
  <div className="h-96 bg-gray-100 flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading map...</p>
    </div>
  </div>
);

const EnhancedItineraryMap: React.FC<EnhancedItineraryMapProps> = ({
  destinations,
}) => {
  const [ready, setReady] = useState(false);
  const [processedDestinations, setProcessedDestinations] = useState<
    DestinationWithDay[]
  >([]);
  const [dayGroups, setDayGroups] = useState<{
    [key: number]: DestinationWithDay[];
  }>({});
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [mapKey, setMapKey] = useState(Date.now());

  useEffect(() => {
    const processDestinations = async () => {
      const destCopy = [...destinations];

      for (let i = 0; i < destCopy.length; i++) {
        if (!destCopy[i].latitude || !destCopy[i].longitude) {
          try {
            let coords = await geocodeLocation(destCopy[i].nama_destinasi);

            if (!coords && destCopy[i].lokasi) {
              coords = await geocodeLocation(destCopy[i].lokasi);
            }

            if (coords) {
              destCopy[i].latitude = coords[0];
              destCopy[i].longitude = coords[1];
            } else {
              const dayOffset = destCopy[i].urutan_hari * 0.01;
              const randomOffset = () => (Math.random() - 0.5) * 0.03;

              destCopy[i].latitude = -7.7956 + randomOffset() + dayOffset;
              destCopy[i].longitude = 110.3695 + randomOffset();
            }
          } catch (error) {
            console.error(
              `Error getting coordinates for ${destCopy[i].nama_destinasi}:`,
              error
            );

            const dayOffset = destCopy[i].urutan_hari * 0.01;
            const randomOffset = () => (Math.random() - 0.5) * 0.03;

            destCopy[i].latitude = -7.7956 + randomOffset() + dayOffset;
            destCopy[i].longitude = 110.3695 + randomOffset();
          }
        }
      }

      setProcessedDestinations(destCopy);

      const groups: { [key: number]: DestinationWithDay[] } = {};
      destCopy.forEach((dest) => {
        if (!groups[dest.urutan_hari]) {
          groups[dest.urutan_hari] = [];
        }
        groups[dest.urutan_hari].push(dest);
      });

      Object.keys(groups).forEach((day) => {
        const dayNum = parseInt(day);
        groups[dayNum] = groups[dayNum].sort((a, b) => a.id - b.id);
      });

      setDayGroups(groups);

      if (Object.keys(groups).length > 0) {
        setActiveDay(parseInt(Object.keys(groups)[0]));
      }

      setReady(true);
    };

    processDestinations();
  }, [destinations]);

  useEffect(() => {
    const handleResize = () => {
      setMapKey(Date.now());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!ready || processedDestinations.length === 0) {
    return <MapLoading />;
  }

  const allLats = processedDestinations.map((d) => d.latitude || 0);
  const allLngs = processedDestinations.map((d) => d.longitude || 0);
  const centerLat = allLats.reduce((sum, lat) => sum + lat, 0) / allLats.length;
  const centerLng = allLngs.reduce((sum, lng) => sum + lng, 0) / allLngs.length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveDay(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeDay === null
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All Days
        </button>

        {Object.keys(dayGroups).map((day) => {
          const dayNum = parseInt(day);
          return (
            <button
              key={day}
              onClick={() => setActiveDay(dayNum)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors`}
              style={{
                backgroundColor:
                  activeDay === dayNum ? getDayColor(dayNum) : "#f3f4f6",
                color: activeDay === dayNum ? "white" : "#374151",
              }}
            >
              Day {day}
            </button>
          );
        })}
      </div>

      <div
        className="relative z-0 h-[500px] w-full rounded-lg overflow-hidden shadow-md"
        key={mapKey}
      >
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <LayersControl position="topright">
            {Object.entries(mapStyles).map(([key, style]) => (
              <LayersControl.BaseLayer
                key={key}
                checked={key === "standard"}
                name={style.name}
              >
                <TileLayer attribution={style.attribution} url={style.url} />
              </LayersControl.BaseLayer>
            ))}
          </LayersControl>

          <ZoomControl position="bottomleft" />
          <MapBoundsFitter destinations={processedDestinations} />

          {processedDestinations
            .filter(
              (dest) => activeDay === null || dest.urutan_hari === activeDay
            )
            .map((destination) => (
              <Marker
                key={destination.id}
                position={[
                  destination.latitude || 0,
                  destination.longitude || 0,
                ]}
                icon={L.divIcon({
                  className: "custom-div-icon",
                  html: `
                    <div 
                      class="map-marker" 
                      style="
                        background-color: ${getDayColor(
                          destination.urutan_hari
                        )}; 
                        width: 2.5rem; 
                        height: 2.5rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      "
                    >
                      <div>${destination.urutan_hari}</div>
                    </div>
                  `,
                  iconSize: [40, 40],
                  iconAnchor: [20, 20],
                })}
              >
                <Popup>
                  <div className="popup-header">
                    Day {destination.urutan_hari}
                  </div>
                  <div className="popup-content">
                    <h3 className="font-bold text-base mb-1">
                      {destination.nama_destinasi}
                    </h3>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Location:</strong> {destination.lokasi}
                      </p>
                      <p>
                        <strong>Category:</strong> {destination.kategori}
                      </p>
                      <p>
                        <strong>Entrance Fee:</strong> Rp
                        {destination.harga_tiket.toLocaleString()}
                      </p>
                      <p>
                        <strong>Rating:</strong> {destination.rating}/5
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

          {Object.entries(dayGroups)
            .filter(
              ([day]) => activeDay === null || parseInt(day) === activeDay
            )
            .map(([day, destinations]) => {
              const sortedDestinations = [...destinations].sort(
                (a, b) => a.id - b.id
              );
              const points = sortedDestinations.map((d) => [
                d.latitude || 0,
                d.longitude || 0,
              ]);

              return (
                <Polyline
                  key={`day-${day}`}
                  positions={points as [number, number][]}
                  pathOptions={{
                    color: getDayColor(parseInt(day)),
                    weight: 4,
                    opacity: 0.8,
                    dashArray: "10, 10",
                    lineCap: "round",
                    className: "route-path",
                  }}
                />
              );
            })}
        </MapContainer>
      </div>

      <div className="text-sm text-gray-500 italic">
        <p>• Klik tombol hari di atas untuk memfilter tampilan peta</p>
        <p>• Klik pada penanda untuk melihat detail destinasi</p>
        <p>• Gunakan kontrol lapisan (kanan atas) untuk mengubah gaya peta</p>
        <p>• Garis putus-putus menunjukkan rute perjalanan untuk setiap hari</p>
      </div>
    </div>
  );
};

export default EnhancedItineraryMap;
