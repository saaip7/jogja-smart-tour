import { BerandaHero } from "./beranda-hero";
import { BerandaDestinasi } from "./beranda-destinasi";

export default function BerandaPage() {
    return (
        <div className="relative w-full bg-[bg-primary]">
            <BerandaHero />
            <BerandaDestinasi />
        </div>
    );
}