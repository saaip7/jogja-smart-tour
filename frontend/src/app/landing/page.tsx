import Link from 'next/link'
import Navbar from '../navigation/navbar'

export default function LandingPage() {
  const topDestinations = [
    {
      id: 1,
      name: 'Malioboro',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      imageUrl: '/placeholder-destination.jpg'
    },
    {
      id: 2,
      name: 'Malioboro',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      imageUrl: '/placeholder-destination.jpg'
    },
    {
      id: 3,
      name: 'Malioboro',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      imageUrl: '/placeholder-destination.jpg'
    },
    {
      id: 4,
      name: 'Malioboro',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      imageUrl: '/placeholder-destination.jpg'
    },
    {
      id: 5,
      name: 'Malioboro',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      imageUrl: '/placeholder-destination.jpg'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* header */}
      <Navbar />

      {/* hero */}
      <section className="relative w-full h-[400px] rounded-lg mx-auto my-4 overflow-hidden max-w-7xl">
        <div className="absolute inset-0 bg-gray-300">
          {/* placeholder untuk gambar hero */}
          <div className="absolute inset-0 bg-black/30 z-10"></div>
        </div>
        
        <div className="relative z-20 h-full flex flex-col justify-center px-8 text-white">
          <h1 className="text-4xl font-bold mb-2">
            Temukan Pesona Jogja, <br />
            Rancang Sesuai Gaya <br />
            Liburanmu!
          </h1>
          <div className="mt-6">
            <Link href="/mulai" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* destinations*/}
      <section className="py-12 px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Top Destinasi Wisata di Yogyakarta</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topDestinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-300 relative">
              </div>
              <div className="p-4">
                <span className="text-xs text-blue-600 font-semibold">Kota Yogyakarta</span>
                <h3 className="font-bold mt-1">{destination.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{destination.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}