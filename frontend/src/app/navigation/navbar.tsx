import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="w-full py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="Jogja Smart Tour Logo"
          width={40}
          height={40}
          className="mr-2"
        />
        <span className="text-blue-600 font-bold text-xl">jogja</span>
        <span className="text-gray-700 text-xs mt-auto mb-1 ml-1">SMART TOUR</span>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/beranda" className="text-gray-700 hover:text-blue-600">
          Beranda
        </Link>
        <Link href="/rekomendasi" className="text-gray-700 hover:text-blue-600">
          Rekomendasi
        </Link>
        <Link href="/tentang-kami" className="text-gray-700 hover:text-blue-600">
          Tentang Kami
        </Link>
      </nav>
      
      <div>
        <Link href="/auth/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Masuk
        </Link>
      </div>
    </header>
  )
}