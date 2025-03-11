import Link from "next/link";
import Image from "next/image";
import { OwnButton } from "../OwnButton";

export const BerandaHero = () => {
  return (
    <section className="relative w-full pt-10 h-[fit-content]">
      <div className="mx-12 relative">
        <Image
          src="/beranda/hero-base.png"
          alt="hero"
          objectFit="cover"
          width={3500}
          height={0}
          draggable={false}
        />
        {/* Overlay Candi */}
        <div className="absolute bottom-0">
          <Image
            src="/beranda/hero-overlay.png"
            alt="hero overlay"
            width={3500}
            height={0}
            draggable={false}
          />
        </div>

        {/* Overlay dark */}
        <div
          className="absolute w-full h-full bottom-0 opacity-80 rounded-[28px]"
          style={{
            background:
              "linear-gradient(60deg, #000 -7%, rgba(0, 0, 0, 0.00) 65%)",
          }}
        />

        {/* Text */}
        <div className="absolute inset-0 h-full flex flex-col justify-center p-24">
          <h1 className="text-4xl font-semibold mb-2 text-white">
            Temukan Pesona <span className="text-[#7CF8FF]">Jogja</span>, <br />
            Rancang Sesuai Gaya <br />
            Liburanmu!
          </h1>
          <OwnButton className="w-[fit-content] mt-2">Mulai Sekarang</OwnButton>
        </div>
      </div>
    </section>
  );
};
