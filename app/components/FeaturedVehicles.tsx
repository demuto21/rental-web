"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Vehicle {
  name: string;
  image: string;
  price: string;
  type: string;
  fuel: string;
  rating: number;
}

const vehicles: Vehicle[] = [
  {
    name: "Limousine alpha",
    image: "/images/limousine.jpg",
    price: "100000f /Jour",
    type: "Automatic",
    fuel: "10L",
    rating: 5.0
  },
  {
    name: "Audi Beta",
    image: "/images/audi.jpg",
    price: "50000f /Jour",
    type: "Automatic",
    fuel: "5L",
    rating: 4.3,
  },
  {
    name: "Motorcycle",
    image: "/images/moto.jpg",
    price: "25000f /Jour",
    type: "Manual",
    fuel: "2L",
    rating: 3.5,
  },
  {
    name: "Quad Bike",
    image: "/images/quad.jpg",
    price: "40000f /Jour",
    type: "Automatic",
    fuel: "3L",
    rating: 4.5,
  },
  {
    name: "Toyota Cruiser",
    image: "/images/toyota.jpg",
    price: "55000F /Jour",
    type: "Manual",
    fuel: "6L",
    rating: 4.1,
  },
  {
    name: "Truck Heavy",
    image: "/images/truck.jpg",
    price: "120000f /Jour",
    type: "Diesel",
    fuel: "15L",
    rating: 3.8,
  },
  
];

export default function FeaturedVehicles() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-12 px-4 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-blue-600 mb-2">
        Featured Vehicles
      </h2>
      <p className="text-gray-500 mb-8">
        Nous avons des véhicules variés : voitures, camions, tricycles...
        venant de plusieurs agences.
      </p>

      {/* Carrousel container */}
      <div className="overflow-hidden relative max-w-6xl mx-auto">
        <motion.div
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          animate={{ x: `-${currentIndex * 100}%` }}
        >
          {vehicles.map((v, i) => (
            <div
              key={i}
              className="min-w-full flex justify-center gap-6 sm:min-w-[33.33%]"
            >
              <div className="bg-white rounded-2xl shadow p-3 w-72">
                <Image
                  src={v.image}
                  alt={v.name}
                  width={250}
                  height={150}
                  className="rounded-xl object-cover h-40 w-full"
                />
                <div className="mt-3 text-left">
                  <h3 className="text-blue-600 font-bold text-lg">
                    {v.name}
                  </h3>
                  <div className="flex items-center text-gray-400 text-sm mt-1">
                    ⭐ {v.rating} &nbsp; | &nbsp; {v.type} &nbsp; | &nbsp; {v.fuel}
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <p className="font-semibold text-gray-700">{v.price}</p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded">
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {vehicles.slice(0, 3).map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-3 h-3 rounded-full ${
              i === currentIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
