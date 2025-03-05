"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Navbar() {
  const { user, logout, login, isAuthenticated } = useAuth();
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
            <AlertDialog>
              <AlertDialogTrigger className="bg-primary-500 text-white px-10 py-2 rounded-lg hover:bg-primary-700">
                Masuk
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[20.563rem]">
                <AlertDialogHeader>
                  <AlertDialogCancel className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </AlertDialogCancel>
                  <AlertDialogTitle className="text-primary-500 pb-2 text-center">
                    Cobain Sekarang!
                  </AlertDialogTitle>
                  <AlertDialogDescription className="pb-4 text-center">
                    Rasakan kemudahan{" "}
                    <span className="font-bold">Jogja Smart Tour</span> untuk
                    perjalananmu
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    onClick={() => login()}
                    className="w-full bg-primary-500 hover:bg-primary-700"
                  >
                    <Image
                      src="/Google.png"
                      alt="Google Icon"
                      width={24}
                      height={24}
                    />
                    <span>Sign in with Google</span>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
    </header>
  );
}
