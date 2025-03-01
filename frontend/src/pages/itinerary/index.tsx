import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

export default function ItineraryPage() {
  const { user } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (user) {
  //     fetchItineraries();
  //   }
  // }, [user]);

  // const fetchItineraries = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/itinerary`,
  //       { withCredentials: true }
  //     );
  //     setItineraries(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching itineraries:", error);
  //     setLoading(false);
  //   }
  // };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Your Itineraries</h1>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0072BB]"></div>
            </div>
          ) : itineraries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itineraries.map((itinerary: any) => (
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
    </ProtectedRoute>
  );
}
