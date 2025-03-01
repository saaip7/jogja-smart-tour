// frontend/src/components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, loading, login, logout, isAuthenticated } = useAuth();

  console.log("Tes navbar:", user, isAuthenticated);

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
        <Link href="/" className="text-gray-700 hover:text-[#0072BB]">
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
        {user && (
          <Link
            href="/itinerary"
            className="text-gray-700 hover:text-[#0072BB]"
          >
            Itinerary
          </Link>
        )}
      </nav>

      <div>
        {!loading && (
          <>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {user.image && (
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button
                  onClick={() => logout()}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => login()}
                className="bg-[#0072BB] text-white px-4 py-2 rounded-md hover:bg-[#005d98] transition"
              >
                Masuk
              </button>
            )}
          </>
        )}
      </div>
      <div className="fixed bottom-4 right-4 bg-gray-100 p-2 rounded text-xs z-50">
        Loading: {loading ? "true" : "false"}
        <br />
        User: {user ? `${user.name} (${user.email})` : "Not logged in"}
      </div>
    </header>
  );
}
