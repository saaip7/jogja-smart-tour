import Image from "next/image";

interface DestinasiCardProps {
  id: number; // Keep the id in the interface for future use if needed
  name: string;
  description: string;
  imageUrl: string;
  location: string;
}

export function DestinasiCard({
  name,
  description,
  imageUrl,
  location,
}: Omit<DestinasiCardProps, "id">) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="h-60 relative">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="p-4">
        <span className="text-sm font-medium text-primary-500">{location}</span>
        <h3 className="font-semibold text-lg mt-1">{name}</h3>
        <p className="text-sm text-neutral-700 mt-1">{description}</p>
      </div>
    </div>
  );
}
