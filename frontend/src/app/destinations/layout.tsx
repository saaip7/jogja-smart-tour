import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinasi Wisata Yogyakarta | Jogja Smart Tour",
  description: "Jelajahi beragam destinasi wisata menarik di Yogyakarta dengan informasi lengkap untuk merencanakan perjalanan Anda.",
};

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}