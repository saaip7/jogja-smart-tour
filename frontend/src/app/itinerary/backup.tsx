"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

interface Itinerary {
  id: string | number;
  title: string;
  startDate: string;
  endDate: string;
  budgetEstimation: number;
}

export default function ItineraryPage() {
  const { user, isAuthenticated } = useAuth();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    if (user) {
      fetchItineraries();
    }
  }, [user, isAuthenticated, router]);

  const fetchItineraries = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/itinerary`,
        { withCredentials: true }
      );
      setItineraries(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      setLoading(false);
    }
  };

  // Return early if not authenticated
  if (!isAuthenticated) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">My Itineraries</h1>
      </header>
      <main>
        {loading ? (
          <Loading />
        ) : itineraries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map((itinerary: Itinerary) => (
              <div
                key={itinerary.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {itinerary.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {new Date(itinerary.startDate).toLocaleDateString()} -
                  {new Date(itinerary.endDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Budget: Rp {itinerary.budgetEstimation.toLocaleString()}
                </p>
                {/* Add more itinerary details here */}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">
              You don&apos;t have any itineraries yet.
            </p>
            <button className="bg-[#0072BB] text-white px-4 py-2 rounded-md">
              Create New Itinerary
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
