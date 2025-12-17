import { Heart, User, Star, DoorOpen } from "lucide-react";
import Image from "next/image";

interface CarProps {
  data: {
    name: string;
    price: number;
    currency: string;
    rating: number;
    seats: number;
    image: string; // <-- Ajouté pour que TypeScript reconnaisse l'image
    transmission: number;
    tag: string;
    isFavorite: boolean;
  };
}

export default function CarCard({ data }: CarProps) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative flex flex-col items-center">
      {/* Header Card */}
      <div className="w-full flex justify-between items-start mb-2">
        <h3 className="text-blue-700 font-bold text-lg">{data.name}</h3>
        <Heart 
          className={`w-5 h-5 cursor-pointer ${data.isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} 
        />
      </div>

      {/* --- ZONE IMAGE CORRIGÉE --- */}
      <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden bg-gray-50">
        <Image
            src={data.image}
            alt={data.name}
            fill // Utilise tout l'espace du conteneur parent (h-40)
            className="object-contain" // ou "object-cover" selon le rendu voulu
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute bottom-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-tl-lg font-medium">
          {data.tag}
        </span>
      </div>
      {/* --------------------------- */}

      {/* Price */}
      <div className="w-full text-left mb-2">
        <span className="text-gray-800 font-bold text-lg">
          {data.price.toLocaleString("fr-FR")} {data.currency}
        </span>
      </div>

      {/* Specs Icons */}
      <div className="flex justify-start gap-4 w-full text-gray-400 text-xs mb-4">
        <div className="flex items-center gap-1">
          <User size={14} /> <span>{data.seats} places</span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={14} className="text-orange-400 fill-orange-400" /> <span>{data.rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <DoorOpen size={14} /> <span>Auto</span>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-blue-700 text-white font-semibold py-2 rounded-full hover:bg-blue-800 transition-colors">
        Book Now
      </button>
    </div>
  );
}