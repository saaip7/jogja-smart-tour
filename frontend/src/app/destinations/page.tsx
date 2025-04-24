"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import DestinationFilter from "@/components/destinations/DestinationFilter";
import DestinationSort from "@/components/destinations/DestinationSort";
import Pagination from "@/components/destinations/Pagination";
import BackToTop from "@/components/destinations/BackToTop";
import { Attraction } from "@/app/utils/attractions.utils";
import { loadAttractionData } from "@/app/services/data.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationCatalogPage() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>([]);
  const [displayedAttractions, setDisplayedAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 10]);
  const [sortOption, setSortOption] = useState<string>("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const fetchAttractions = async () => {
      setIsLoading(true);
      try {
        const data = await loadAttractionData();
        setAttractions(data);
        setFilteredAttractions(data);
      } catch (error) {
        console.error("Failed to load attractions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAttractions();
    
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);
  
  useEffect(() => {
    applyFilters();
  }, [attractions, searchQuery, selectedCategory, priceRange, ratingRange, sortOption]);
  
  useEffect(() => {
    if (filteredAttractions.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setDisplayedAttractions(filteredAttractions.slice(startIndex, endIndex));
    }
  }, [filteredAttractions, currentPage, itemsPerPage]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceRange, ratingRange, sortOption]);
  
  const applyFilters = () => {
    if (!attractions.length) return;
    
    let filtered = [...attractions];
    
    if (searchQuery) {
      filtered = filtered.filter(attraction => 
        attraction.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (attraction.description && 
         attraction.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(attraction => 
        attraction.type && attraction.type.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(attraction => {
      const price = attraction.htm_weekday || attraction.htm_weekend || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Apply rating filter
    filtered = filtered.filter(attraction => {
      const rating = attraction.vote_average || 0;
      return rating >= ratingRange[0] && rating <= ratingRange[1];
    });
    
    // Apply sorting
    switch (sortOption) {
      case "popularity":
        filtered.sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));
        break;
      case "rating-high":
        filtered.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
        break;
      case "rating-low":
        filtered.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = a.htm_weekday || a.htm_weekend || 0;
          const priceB = b.htm_weekday || b.htm_weekend || 0;
          return priceB - priceA;
        });
        break;
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = a.htm_weekday || a.htm_weekend || 0;
          const priceB = b.htm_weekday || b.htm_weekend || 0;
          return priceA - priceB;
        });
        break;
      default:
        break;
    }
    
    setFilteredAttractions(filtered);
  };
  
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };
  
  const handleRatingRangeChange = (range: [number, number]) => {
    setRatingRange(range);
  };
  
  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <BackToTop />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-primary-700 text-white py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Temukan Destinasi Wisata di Yogyakarta</h1>
            <p className="text-lg mb-8">Jelajahi beragam tempat menarik yang dapat Anda kunjungi selama di Yogyakarta</p>
            
            {/* Search bar */}
            <div className="relative max-w-2xl">
              <Input
                type="text"
                placeholder="Cari destinasi wisata..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-4 pr-12 py-6 rounded-lg w-full text-black"
              />
              <Button 
                className="absolute right-1 top-1 bottom-1 rounded-md px-3"
                onClick={() => applyFilters()}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filters sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-4 space-y-6">
                <DestinationFilter 
                  selectedCategory={selectedCategory}
                  priceRange={priceRange}
                  ratingRange={ratingRange}
                  onCategoryChange={handleCategoryChange}
                  onPriceRangeChange={handlePriceRangeChange}
                  onRatingRangeChange={handleRatingRangeChange}
                />
              </div>
            </div>
            
            {/* Destination grid */}
            <div className="md:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Menampilkan {filteredAttractions.length} destinasi
                </p>
                <DestinationSort 
                  sortOption={sortOption}
                  onSortChange={handleSortChange}
                />
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                      <Skeleton className="h-48 w-full" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredAttractions.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedAttractions.map((attraction) => (
                      <DestinationCard
                        key={attraction.no}
                        id={attraction.no}
                        name={attraction.nama}
                        description={attraction.description || ""}
                        imageUrl={`/destinations/${attraction.no % 10 + 1}.jpg`} // Placeholder image
                        location={attraction.type || "Yogyakarta"}
                        price={attraction.htm_weekday || attraction.htm_weekend || 0}
                        rating={attraction.vote_average || 0}
                      />
                    ))}
                  </div>
                  
                  {filteredAttractions.length > itemsPerPage && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(filteredAttractions.length / itemsPerPage)}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Tidak ada destinasi yang sesuai dengan filter Anda.</p>
                  <Button 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setPriceRange([0, 500000]);
                      setRatingRange([0, 10]);
                    }}
                  >
                    Reset Filter
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}