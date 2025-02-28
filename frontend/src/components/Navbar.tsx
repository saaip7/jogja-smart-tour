import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <div className="relative w-40 h-12">
          <Image
            src="/Logo_JST.svg"
            alt="Jogja Smart Tour Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/beranda" className="text-gray-700 hover:text-[#0072BB]">
          Beranda
        </Link>
        <Link
          href="/rekomendasi"
          className="text-gray-700 hover:text-[#0072BB]"
        >
          Rekomendasi
        </Link>
        <Link
          href="/tentang-kami"
          className="text-gray-700 hover:text-[#0072BB]"
        >
          Tentang Kami
        </Link>
      </nav>

      <div>
        <Link
          href="/auth/login"
          className="bg-[#0072BB] text-white px-4 py-2 rounded-md hover:text-[#0072BB]"
        >
          Masuk
        </Link>
      </div>
    </header>
  );
}
