"use client";

import { DestinasiCard } from "./destinasi-card";
import { useState } from "react";
import { destinations, categories } from "@/data/destinations"

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

    // Filter destinations based on active category
    const filteredDestinations =
    activeCategory === "Semua" ? destinations : destinations.filter((dest) => dest.category === activeCategory)

  return (
    <section className="py-12 px-8 mx-auto mx-12 my-12">
      <h2 className="text-4xl font-semibold text-center mb-10 text-neutral-900">
        Top Destinasi Wisata di Yogyakarta
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {topDestinations.map((destination) => (
          <DestinasiCard
            id={destination.id}
            name={destination.name}
            description={destination.description}
            imageUrl={destination.imageUrl}
            location={destination.location}
          />
        ))}
      </div>

      <div className="mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-primary-700 mb-3">
            Rekomendasi Wisata Berdasarkan Kategori
          </h2>
          <p className="text-neutral-700 max-w-3xl mx-auto">
            Pilih dari berbagai kategori wisata dan nikmati pengalaman terbaik
            di Jogja, mulai dari petualangan alam hingga wisata kuliner yang
            menggugah selera.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Destinations grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredDestinations.map((destination) => (
            <DestinasiCard
              key={destination.id}
              id={destination.id}
              name={destination.name}
              description={destination.description}
              imageUrl={destination.imageUrl}
              location={destination.location} //prop location tapi isinya kategori
            />
          ))}
        </div>
      </div>
    </section>
  );
};
