import { Heart, User, Star, DoorOpen } from "lucide-react";
import Image from "next/image";

interface CarProps {
  data: {
    name: string;
    price: number;
    currency: string;
    rating: number;
    seats: number;
    // Ajoute d'autres props si nécessaire
  };
}

export default function CarCard({ data }: CarProps) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative flex flex-col items-center">
      {/* Header Card */}
      <div className="w-full flex justify-between items-start mb-2">
        <h3 className="text-blue-700 font-bold text-lg">{data.name}</h3>
        <Heart className="text-red-500 fill-red-500 w-5 h-5 cursor-pointer" />
      </div>

      {/* Car Image Area */}
      <div className="relative w-full h-32 mb-2">
        {/* Placeholder pour l'image - remplace src par ton image réelle */}
        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            [Image Voiture]
        </div>
        <span className="absolute bottom-0 right-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-l-full rounded-br-lg">
          detail
        </span>
      </div>

      {/* Price */}
      <div className="w-full text-left mb-2">
        <span className="text-gray-800 font-bold text-lg">
          {data.price.toLocaleString("fr-FR")} {data.currency}
        </span>
      </div>

      {/* Specs Icons */}
      <div className="flex justify-start gap-4 w-full text-gray-400 text-xs mb-4">
        <div className="flex items-center gap-1">
          <User size={14} /> <span>{data.seats}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={14} className="text-orange-400 fill-orange-400" /> <span>{data.rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <DoorOpen size={14} /> <span>2</span>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-blue-700 text-white font-semibold py-2 rounded-full hover:bg-blue-800 transition-colors">
        book now
      </button>
    </div>
  );
}