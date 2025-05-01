"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
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
  const { user, logout, login } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="z-20">
      <header className="w-full py-4 px-4 md:px-12 flex justify-between items-center relative">
        <div className="flex items-center">
          <div className="relative w-32 md:w-40 h-10 md:h-12">
            <Image
              onClick={() => router.push("/")}
              src="/Logo_JST.svg"
              alt="Jogja Smart Tour Logo"
              fill
              className="object-contain cursor-pointer"
              priority
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            href="/"
            className="text-neutral-900 hover:text-primary-700 font-medium"
          >
            Beranda
          </Link>
          <Link
            href="/destinations"
            className="text-neutral-900 hover:text-primary-700 font-medium"
          >
            Destinasi
          </Link>
          <Link
            href="#rekomendasi"
            className="text-neutral-900 hover:text-primary-700 font-medium"
          >
            Rekomendasi
          </Link>
          <Link
            href="#tentang-kami"
            className="text-neutral-900 hover:text-primary-700 font-medium"
          >
            Tentang Kami
          </Link>
          {user && (
            <Link
              href="/itinerary"
              className="text-neutral-900 hover:text-primary-700 font-medium"
            >
              Itinerary
            </Link>
          )}
        </nav>

        {/* Desktop Auth Button */}
        <div className="hidden lg:block">
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
                className="bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-md hover:bg-gray-300 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="bg-primary-500 text-white hover:bg-[#0E6095] active:bg-[#1269A0] px-10 py-2 rounded-lg font-medium">
                    Masuk
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[20.563rem]">
                  <AlertDialogHeader>
                    <AlertDialogCancel className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 font-medium">
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
                      className="w-full bg-primary-500 hover:bg-primary-700 font-medium"
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

        {/* Mobile Hamburger Menu Button */}
        <div className="lg:hidden relative" ref={menuRef}>
          <button
            className="text-neutral-900 p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-30">
              <nav className="flex flex-col py-2">
                <Link
                  href="/"
                  className="px-4 py-3 text-neutral-900 hover:bg-gray-100 hover:text-primary-700 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Beranda
                </Link>
                <Link
                  href="/destinations"
                  className="px-4 py-3 text-neutral-900 hover:bg-gray-100 hover:text-primary-700 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Destinasi
                </Link>
                <Link
                  href="#rekomendasi"
                  className="px-4 py-3 text-neutral-900 hover:bg-gray-100 hover:text-primary-700 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Rekomendasi
                </Link>
                <Link
                  href="#tentang-kami"
                  className="px-4 py-3 text-neutral-900 hover:bg-gray-100 hover:text-primary-700 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tentang Kami
                </Link>
                {user && (
                  <Link
                    href="/itinerary"
                    className="px-4 py-3 text-neutral-900 hover:bg-gray-100 hover:text-primary-700 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Itinerary
                  </Link>
                )}

                <div className="px-4 pt-2 mt-1 border-t border-gray-200">
                  {user ? (
                    <div className="flex flex-col gap-3 py-2">
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
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-md hover:bg-gray-300 transition w-full text-center"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="py-3">
                      <AlertDialog>
                        <AlertDialogTrigger className="w-full">
                          <div className="bg-primary-500 text-white hover:bg-[#0E6095] active:bg-[#1269A0] px-4 py-2 rounded-lg font-medium w-full text-center">
                            Masuk
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-[20.563rem]">
                          <AlertDialogHeader>
                            <AlertDialogCancel className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 font-medium">
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
                              <span className="font-bold">
                                Jogja Smart Tour
                              </span>{" "}
                              untuk perjalananmu
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogAction
                              onClick={() => {
                                login();
                                setMobileMenuOpen(false);
                              }}
                              className="w-full bg-primary-500 hover:bg-primary-700 font-medium"
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
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
