"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "./LoginModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  console.log("Tes navbar:", user, isAuthenticated);

  return (
    <header className="w-full py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <div className="relative w-40 h-12">
          <Image
            onClick={() => router.push("/")}
            src="/Logo_JST.svg"
            alt="Jogja Smart Tour Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-[#2A2A2A] hover:text-[#004C7D]">
          Beranda
        </Link>
        <Link
          href="/rekomendasi"
          className="text-[#2A2A2A] hover:text-[#004C7D]"
        >
          Rekomendasi
        </Link>
        <Link
          href="/tentang-kami"
          className="text-[#2A2A2A] hover:text-[#004C7D]"
        >
          Tentang Kami
        </Link>
        {user && (
          <Link
            href="/itinerary"
            className="text-[#2A2A2A] hover:text-[#004C7D]"
          >
            Itinerary
          </Link>
        )}
      </nav>

      <div>
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
          <>
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
            />
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-[#0072BB] text-white px-4 py-2 rounded-md hover:bg-[#004C7D]"
            >
              Masuk
            </button>
          </>
        )}
      </div>
    </header>
  );
}
