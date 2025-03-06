interface DestinasiCardProps {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
}

export function DestinasiCard({
  id,
  name,
  description,
  imageUrl,
  location,
}: DestinasiCardProps) {
  return (
    <div key={id} className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="h-60 relative">
        <img src={imageUrl} alt={name} className="object-cover w-full h-full" />
      </div>
      <div className="p-4">
        <span className="text-sm font-medium text-primary-500">{location}</span>
        <h3 className="font-semibold text-lg mt-1">{name}</h3>
        <p className="text-sm text-neutral-700 mt-1">{description}</p>
      </div>
    </div>
  );
}
