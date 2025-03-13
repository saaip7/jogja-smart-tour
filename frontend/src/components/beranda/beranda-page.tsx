import { BerandaHero } from "./beranda-hero";
import { BerandaDestinasi } from "./beranda-destinasi";
import BerandaAbout from "./beranda-about";

export default function BerandaPage() {
    return (
        <div className="relative w-full bg-[bg-primary]">
            <BerandaHero />
            <BerandaDestinasi />
            <BerandaAbout />
        </div>
    );
}