"use client";

import { DestinasiCard } from "./destinasi-card";
import { useState, useRef, useEffect } from "react";
import { destinations, categories } from "@/data/destinations";

const topDestinations = [
  {
    id: 1,
    name: "Candi Prambanan",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    imageUrl: "/beranda/prambanan.jpeg",
    location: "Sleman",
  },
  {
    id: 2,
    name: "Malioboro",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    imageUrl: "/beranda/malioboro2.jpg",
    location: "Yogyakarta",
  },
  {
    id: 3,
    name: "Pantai Parang Teritis",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    imageUrl: "/beranda/paris.jpg",
    location: "Bantul",
  },
  {
    id: 4,
    name: "Kalibiru",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    imageUrl: "/beranda/kalibiru.jpg",
    location: "Kulon Progo",
  },
  {
    id: 5,
    name: "Pantai Indrayanti",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    imageUrl: "/beranda/indrayanti.jpg",
    location: "Gunung Kidul",
  },
];

export const BerandaDestinasi = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Filter destinations based on active category
  const filteredDestinations =
    activeCategory === "Semua" ? destinations : destinations.filter((dest) => dest.category === activeCategory);

  // Handle carousel navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll event to update the current slide indicator
  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const slideWidth = carouselRef.current.offsetWidth;
      const newSlideIndex = Math.round(scrollPosition / slideWidth);
      if (newSlideIndex !== currentSlide) {
        setCurrentSlide(newSlideIndex);
      }
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [currentSlide]);

  return (
    <section id="rekomendasi" className="py-12 px-12 md:px-24 mx-auto my-12">
      <h2 className="text-2xl md:text-4xl font-semibold text-center mb-6 md:mb-10 text-neutral-900">
        Top Destinasi Wisata di Yogyakarta
      </h2>

      {/* Desktop view - remains the same */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-6">
        {topDestinations.map((destination) => (
          <DestinasiCard
            key={destination.id}
            id={destination.id}
            name={destination.name}
            description={destination.description}
            imageUrl={destination.imageUrl}
            location={destination.location}
          />
        ))}
      </div>

      {/* Mobile view - carousel */}
      <div className="md:hidden">
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {topDestinations.map((destination) => (
            <div key={destination.id} className="min-w-full snap-center px-2">
              <DestinasiCard
                id={destination.id}
                name={destination.name}
                description={destination.description}
                imageUrl={destination.imageUrl}
                location={destination.location}
              />
            </div>
          ))}
        </div>
        
        {/* Carousel indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {topDestinations.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? "bg-primary-500" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary-700 mb-3">
            Rekomendasi Wisata Berdasarkan Kategori
          </h2>
          <p className="text-neutral-700 max-w-3xl mx-auto text-sm md:text-base">
            Pilih dari berbagai kategori wisata dan nikmati pengalaman terbaik
            di Jogja, mulai dari petualangan alam hingga wisata kuliner yang
            menggugah selera.
          </p>
        </div>
        
        {/* Category filters - made scrollable on mobile */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                activeCategory === category
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Destinations grid - responsive columns */}
        <div className="grid grid-cols-1 sm2:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredDestinations.map((destination) => (
            <DestinasiCard
              key={destination.id}
              id={destination.id}
              name={destination.name}
              description={destination.description}
              imageUrl={destination.imageUrl}
              location={destination.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
};