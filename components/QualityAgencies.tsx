"use client";

import Image from "next/image";
import { HeartIcon, StarIcon, MapPinIcon, ClockIcon } from "./Icons";

interface Agency {
  name: string;
  description: string;
  logo: string;
  location: string;
  rating: number;
  time?: string;
}

const agencies: Agency[] = [
  {
    name: "Company",
    description: "C’est une agence de livraison des vivres.",
    logo: "/assets/company-logo.jpg",
    location: "Douala",
    rating: 3.9,
    time: "09:00 - 18:00",
  },
  {
    name: "Company",
    description: "C’est une agence de livraison des vivres.",
    logo: "/assets/company-logo.jpg",
    location: "Douala",
    rating: 3.9,
    time: "08:00 - 17:00",
  },
  {
    name: "Company",
    description: "C’est une agence de livraison des vivres.",
    logo: "/assets/company-logo.jpg",
    location: "Douala",
    rating: 3.9,
    time: "09:30 - 19:00",
  },
  {
    name: "Company",
    description: "C’est une agence de livraison des vivres.",
    logo: "/assets/company-logo.jpg",
    location: "Douala",
    rating: 3.9,
    time: "10:00 - 16:00",
  },
];

export default function QualityAgencies() {
  return (
    <section id="agencies" className="py-12 px-4 bg-white text-center">      <h2 className="text-3xl font-bold text-blue-600 mb-2">Our Quality Agencies</h2>
      <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
        Découvrez nos agences partenaires grâce à qui on peut louer des véhicules à des clients
      </p>

      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {agencies.map((agency, i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-4 w-64 text-left hover:shadow-lg transition relative">
            {/* icône favoris en haut à droite */}
            <div className="absolute top-3 right-3 text-gray-400 hover:text-red-500 cursor-pointer">
              <HeartIcon className="w-5 h-5" />
            </div>

            <h3 className="text-blue-600 font-bold text-lg">{agency.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{agency.description}</p>

            <div className="flex justify-center mt-3">
              <Image src={agency.logo} alt={agency.name} width={100} height={100} className="object-contain" />
            </div>

            {/* ligne d'icônes: note - localisation - horaires */}
            <div className="flex items-center justify-between text-gray-400 text-sm mt-3">
              <div className="flex items-center gap-2">
                <StarIcon className="w-4 h-4" />
                <span>{agency.rating}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4" />
                <span>{agency.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                <span>{agency.time}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-700 font-semibold">Douala</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1 rounded">View More</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-8 py-2 rounded-full">View More</button>
      </div>
    </section>
  );
}