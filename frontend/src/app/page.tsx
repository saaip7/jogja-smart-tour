import BerandaPage from "@/components/beranda/beranda-page";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <div className="relative w-full">
      <Navbar />
      <BerandaPage />
      <Footer />
    </div>
  );
}
