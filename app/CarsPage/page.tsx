"use client";

import { useState } from "react";
import { Search, Heart, LayoutGrid, SlidersHorizontal } from "lucide-react";
import CarCard from "@/modules/CarCard"; // Assure-toi du chemin
import { cars } from "@/modules/cars"; // Importe tes données

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  const [selectedType, setSelectedType] = useState("Car");

  // Logique simple de filtrage pour la démo
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* --- NAVBAR --- */}
      <header className="bg-white py-4 px-6 md:px-12 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <h1 className="text-2xl font-bold">
            <span className="text-blue-600">EASY</span>
            <span className="text-orange-500">-RENT</span>
          </h1>

          {/* Main Search Bar */}
          <div className="hidden md:flex bg-gray-100 rounded-full px-4 py-2 w-96 items-center">
            <input
              type="text"
              placeholder="search here"
              className="bg-transparent outline-none w-full text-sm text-gray-600"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 font-medium text-gray-600">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">Cars</a>
          <a href="#" className="hover:text-blue-600">Agencies</a>
          <a href="#" className="hover:text-blue-600">Help</a>
        </nav>

        {/* Icons */}
        <div className="flex gap-4">
          <button className="p-2 rounded-full bg-blue-50 text-blue-600">
            <Heart size={20} />
          </button>
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-8 mt-4">
        
        {/* --- SIDEBAR FILTERS --- */}
        <aside className="w-full md:w-1/4 bg-white p-6 rounded-3xl shadow-sm h-fit">
          <h2 className="text-blue-700 text-xl font-bold mb-6">Filter by :</h2>

          {/* Sidebar Search */}
          <div className="bg-gray-200 rounded-full px-4 py-2 flex items-center mb-6">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none w-full text-sm placeholder-gray-500"
            />
          </div>

          <hr className="border-gray-100 my-4" />

          {/* Only Available Toggle */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-blue-600 font-semibold text-sm">ONLY AVAILABLE</span>
            <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
              <div className="w-6 h-6 bg-white rounded-full shadow absolute left-0 border border-gray-200"></div>
            </div>
          </div>

          <hr className="border-gray-100 my-4" />

          {/* Price Slider */}
          <div className="mb-6">
            <label className="text-blue-600 font-semibold text-sm mb-2 block">Price</label>
            <input
              type="range"
              min="0"
              max="200000"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-right text-xs text-gray-500 mt-1 font-bold">
              {priceRange} CFA/jours
            </div>
          </div>

          <hr className="border-gray-100 my-4" />

          {/* Type Selection */}
          <div className="mb-8">
            <label className="text-blue-600 font-semibold text-sm mb-4 block">Type</label>
            <div className="grid grid-cols-2 gap-4">
              {["Car", "limousine", "bus", "track"].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    checked={selectedType === type}
                    onChange={() => setSelectedType(type)}
                    className="accent-orange-500 w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700 capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3">
            <button 
                onClick={() => {setSearchTerm(""); setPriceRange(0);}}
                className="flex-1 bg-blue-800 text-white py-2 rounded-full text-sm font-semibold"
            >
              clear
            </button>
            <button className="flex-1 bg-orange-500 text-white py-2 rounded-full text-sm font-semibold">
              apply here
            </button>
          </div>
        </aside>

        {/* --- CAR LISTING --- */}
        <section className="flex-1">
          {/* Section Title */}
          <h2 className="text-center text-2xl font-bold mb-8">
            {searchTerm ? "Résultats de la recherche" : "Our Flagship Vehicle"}
          </h2>

          {/* Grid or Empty State */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car, index) => (
                <CarCard key={index} data={car} />
              ))}
              
              {/* Cartes Vides (Placeholders) comme sur le design pour garder la grille */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[300px]"></div>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[300px]"></div>
            </div>
          ) : (
            // EMPTY STATE (Capture 5 & 110)
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
               <p className="text-lg">Aucun véhicule ne correspond à votre recherche.</p>
            </div>
          )}

          {/* Pagination Dots */}
          <div className="flex justify-center gap-4 mt-12 mb-8">
            <div className="w-4 h-4 bg-gray-500 rounded-full opacity-50"></div>
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
          </div>

          {/* View More Button */}
          <div className="flex justify-center">
            <button className="bg-orange-500 text-white text-xl font-bold py-3 px-12 rounded-full shadow-lg hover:bg-orange-600 transition">
              View More
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}