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
    image: "/assets/limousine.jpg",
    price: "100000f /Jour",
    type: "Automatic",
    fuel: "10L",
    rating: 5.0
  },
  {
    name: "Audi Beta",
    image: "/assets/audi.jpg",
    price: "50000f /Jour",
    type: "Automatic",
    fuel: "5L",
    rating: 4.3,
  },
  {
    name: "Motorcycle",
    image: "/assets/moto.jpg",
    price: "25000f /Jour",
    type: "Manual",
    fuel: "2L",
    rating: 3.5,
  },
  {
    name: "Quad Bike",
    image: "/assets/quad.jpg",
    price: "40000f /Jour",
    type: "Automatic",
    fuel: "3L",
    rating: 4.5,
  },
  {
    name: "Toyota Cruiser",
    image: "/assets/toyota.jpg",
    price: "55000F /Jour",
    type: "Manual",
    fuel: "6L",
    rating: 4.1,
  },
  {
    name: "Truck Heavy",
    image: "/assets/truck.jpg",
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
    <section id="featured-vehicles" className="py-12 px-4 bg-gray-50 text-center">
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
       {/* ======================================= */}
      {/* =       SECTION WHY CHOOSE US         = */}
      {/* ======================================= */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          
          {/* Titre de la section */}
          <h2 className="text-5xl font-bold text-center text-[#2563EB] mb-6">
            Why Choose Us ?
          </h2>
          <p className="text-center text-gray-700 text-lg mb-20 max-w-4xl mx-auto">
            We present many guarantees and advantages when you rent a car with us for your trip. Here are some of the advantages that you will get
          </p>

          {/* Grille des avantages */}
          <div className="grid grid-cols-3 gap-x-20 gap-y-16">
            
            {/* Avantage 1: Easy Rent */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-[#F76513] rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#2563EB] mb-3">Easy Rent</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Rent a car at our rental with an easy and fast process without disturbing your productivity
                </p>
              </div>
            </div>

            {/* Avantage 2: Premium Quality */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-[#F76513] rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#2563EB] mb-3">Premium Quality</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Our cars are always maintained engine health and cleanliness to provide a more comfortable driving experience
                </p>
              </div>
            </div>

            {/* Avantage 3: Professional Agent */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-[#F76513] rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#2563EB] mb-3">Professional Agent</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  You can ask your travel companion to escort and guide your journey.
                </p>
              </div>
            </div>

            {/* Avantage 4: Car Safety */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-[#F76513] rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#2563EB] mb-3">Car Safety</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  We guarantee the safety of the engine on the car always running well with regular checks on the car engine.
                </p>
              </div>
            </div>

            {/* Avantage 5: Refund */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-[#F76513] rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#2563EB] mb-3">Refund</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Our service guarantee provides a money back opportunity if the car does not match the information provided.
                </p>
              </div>
            </div>

            {/* Avantage 6: Live Monitoring */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-[#F76513] rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 3H4c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h4v2h8v-2h4c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 14H4V5h16v12z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#2563EB] mb-3">Live Monitoring</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Our service provides direct customer monitoring to monitor trips in terms of safety and comfort.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </section>
    
  );
}