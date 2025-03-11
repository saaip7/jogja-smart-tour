"use client";

import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { OwnButton } from "@/components/OwnButton";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="text-center space-y-6 max-w-lg">
        <div className="w-full max-w-[280px] md:max-w-[400px] mx-auto">
          <DotLottieReact
            src="/404.lottie"
            autoplay
            loop
            className="w-full h-full"
          />
        </div>
        <h2 className="text-2xl font-semibold text-neutral-900">Halaman Tidak Ditemukan</h2>
        
        <p className="text-neutral-700">
          Maaf, halaman yang Anda cari tidak tersedia. Mungkin URL telah berubah atau halaman telah dihapus.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/" className="w-full sm:w-auto">
            <OwnButton className="w-full">
              Kembali ke Beranda
            </OwnButton>
          </Link>
          
          <Link href="/#rekomendasi" className="w-full sm:w-auto">
            <OwnButton 
              variant="outline"
              className="w-full border-primary-500 text-primary-500"
            >
              Lihat Rekomendasi Wisata
            </OwnButton>
          </Link>
        </div>
      </div>
    </div>
  );
}