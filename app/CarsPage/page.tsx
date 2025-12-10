"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, Heart, SlidersHorizontal, MapPin, Calendar, 
  Users, Fuel, Gauge, Car, Star, Share2, Settings 
} from "lucide-react";

// --- COMPOSANT CAR CARD (Style amélioré) ---
const CarCard = ({ data }: { data: any }) => (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-slate-100">
    {/* Image & Badge */}
    <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center overflow-hidden">
      {/* Simulation d'image si pas de vraie image */}
      {data.image && !data.image.includes("placeholder") ? (
        <img src={data.image} alt={data.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <Car className="text-slate-400 w-20 h-20" />
      )}
      
      <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:text-red-500 transition-colors">
        <Heart size={18} className={data.isFavorite ? "fill-red-500 text-red-500" : "text-slate-600"} />
      </button>
      
      <div className="absolute bottom-3 left-3 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
        {data.tag || "Available"}
      </div>
    </div>

    {/* Contenu */}
    <div className="p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{data.name}</h3>
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-slate-700">{data.rating || "4.5"}</span>
            <span className="text-xs">({data.reviews || 24} avis)</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Par jour</p>
          <p className="text-lg font-bold text-blue-600">{data.price?.toLocaleString()} CFA</p>
        </div>
      </div>

      {/* Caractéristiques */}
      <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 mb-4">
        <div className="flex flex-col items-center text-center">
          <Users size={16} className="text-slate-400 mb-1" />
          <span className="text-xs text-slate-600">{data.seats || 4} Places</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Fuel size={16} className="text-slate-400 mb-1" />
          <span className="text-xs text-slate-600">{data.fuel || "Essence"}</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Gauge size={16} className="text-slate-400 mb-1" />
          <span className="text-xs text-slate-600">{data.transmission === 1 ? "Manuelle" : "Auto"}</span>
        </div>
      </div>

      <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2">
        Voir Détails
      </button>
    </div>
  </div>
);

export default function CarsPage() {
  // --- ÉTATS ---
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(100000);
  const [selectedType, setSelectedType] = useState("Car");

  // --- DONNÉES FACTICES (Structure unifiée) ---
  const dummyCar = {
    name: "Mercedes-Benz Class C",
    price: 45000,
    rating: 4.8,
    seats: 5,
    transmission: 2, // 2 = Auto
    fuel: "Essence",
    tag: "Populaire",
    isFavorite: false,
    image: "/assets/car2.jpeg" // Mettez vos vrais chemins ici
  };

  const cheapestCars = Array(3).fill({ ...dummyCar, name: "Toyota Yaris", price: 15000, tag: "Éco" });
  const mostUsedCars = Array(3).fill({ ...dummyCar, name: "Hyundai Elantra", price: 25000, tag: "Top Rated" });
  const promoCars = Array(3).fill({ ...dummyCar, name: "Ford Explorer", price: 35000, tag: "-20%" });
  
  // Simulation de la liste principale pour la recherche
  const allCars = [
    ...cheapestCars,
    ...mostUsedCars,
    { ...dummyCar, name: "Tesla Model 3", price: 60000, fuel: "Électrique" },
    { ...dummyCar, name: "Range Rover", price: 120000, type: "SUV" }
  ];

  // Logique de filtrage simple
  const filteredCars = allCars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) && car.price <= priceRange
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* ======================================= */}
      {/* === NAVBAR (Mélange Code 1 & 2) === */}
      {/* ======================================= */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-6 md:px-12 py-4">
        <div className="flex items-center justify-between max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold flex items-center gap-1">
            <div className="bg-blue-600 text-white p-1 rounded-lg">
                <Car size={24} />
            </div>
            <span className="text-blue-600">EASY</span>
            <span className="text-orange-500">-RENT</span>
          </Link>

          {/* Search Bar Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 bg-slate-100 rounded-full px-4 py-2.5 items-center border border-transparent focus-within:border-blue-300 transition-all">
             <Search size={18} className="text-slate-400 mr-2" />
             <input
               type="text"
               placeholder="Rechercher une marque, un modèle..."
               className="bg-transparent outline-none w-full text-slate-700 placeholder-slate-400 text-sm"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/CarsPage" className="text-blue-600">Cars</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Agencies</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Help</Link>
          </nav>

          {/* Actions */}
          <div className="flex gap-4 items-center pl-4 border-l border-slate-200 ml-4">
            <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
              <Heart size={20} />
            </button>
            <button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition text-slate-600">
                <Settings size={20} />
            </button>
            <div className="w-9 h-9 bg-gradient-to-tr from-orange-400 to-orange-600 rounded-full border-2 border-white shadow-sm"></div>
          </div>
        </div>
      </header>

      {/* ======================================= */}
      {/* === MAIN LAYOUT === */}
      {/* ======================================= */}
      <main className="max-w-[1440px] mx-auto p-6 flex flex-col md:flex-row gap-8 relative mt-4">
        
        {/* --- SIDEBAR (Filtres) --- */}
        <aside className="w-full md:w-[320px] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit sticky top-24 self-start flex-shrink-0 z-40">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-slate-800 text-xl font-bold flex items-center gap-2">
                <SlidersHorizontal size={20} className="text-blue-600"/> Filtres
             </h2>
             <button 
                onClick={() => {setSearchTerm(""); setPriceRange(200000);}}
                className="text-xs text-blue-600 hover:underline font-medium"
             >
                Réinitialiser
             </button>
          </div>

          {/* Recherche Sidebar (Mobile ou complément) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex items-center mb-6 md:hidden">
            <Search size={18} className="text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          <hr className="border-slate-100 my-6" />

          {/* Disponibilité */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-slate-700 font-semibold text-sm">Disponible immédiatement</span>
            <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full shadow absolute right-0.5 top-0.5"></div>
            </div>
          </div>

          <hr className="border-slate-100 my-6" />

          {/* Prix Slider */}
          <div className="mb-6">
            <div className="flex justify-between mb-4">
                <label className="text-slate-700 font-semibold text-sm">Prix Max / Jour</label>
                <span className="text-sm font-bold text-blue-600">{priceRange.toLocaleString()} CFA</span>
            </div>
            <input
              type="range"
              min="5000"
              max="200000"
              step="5000"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between mt-2 text-xs text-slate-400">
                <span>5 000</span>
                <span>200 000+</span>
            </div>
          </div>

          <hr className="border-slate-100 my-6" />

          {/* Type Selection */}
          <div className="mb-8">
            <label className="text-slate-700 font-semibold text-sm mb-4 block">Type de véhicule</label>
            <div className="space-y-3">
              {["Car", "Limousine", "SUV", "Bus", "Van"].map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedType === type ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'}`}>
                    {selectedType === type && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <input
                    type="radio"
                    name="type"
                    className="hidden"
                    checked={selectedType === type}
                    onChange={() => setSelectedType(type)}
                  />
                  <span className={`text-sm font-medium transition-colors ${selectedType === type ? 'text-blue-700' : 'text-slate-600 group-hover:text-slate-900'}`}>
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Bouton d'action Sidebar */}
          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
            Appliquer les filtres
          </button>
        </aside>

        {/* --- CONTENU PRINCIPAL --- */}
        <section className="flex-1 overflow-hidden pb-20">
          
          {/* Header Section */}
          <div className="bg-blue-600 rounded-3xl p-8 mb-12 text-white relative overflow-hidden shadow-lg">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
             <div className="relative z-10">
                 <h1 className="text-3xl md:text-4xl font-bold mb-2">Trouvez votre voiture idéale</h1>
                 <p className="text-blue-100">Plus de 500 véhicules disponibles à Yaoundé et Douala.</p>
             </div>
          </div>

          {/* SECTION 1: LES MOINS CHERS */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Les plus abordables</h2>
                <Link href="#" className="text-sm text-blue-600 font-semibold hover:underline">Voir tout</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cheapestCars.map((car, index) => <CarCard key={`cheap-${index}`} data={car} />)}
            </div>
          </div>

          {/* SECTION 2: LES PLUS UTILISÉS */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Les plus populaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mostUsedCars.map((car, index) => <CarCard key={`used-${index}`} data={car} />)}
            </div>
          </div>

          {/* SECTION 3: PROMOTIONS */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="bg-orange-100 text-orange-600 p-1 rounded">🔥</span> Offres Spéciales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promoCars.map((car, index) => <CarCard key={`promo-${index}`} data={car} />)}
            </div>
          </div>

          {/* SECTION 4: RÉSULTATS FILTRÉS (Flagship) */}
          <div className="mb-8" id="results">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              {searchTerm ? `Résultats pour "${searchTerm}"` : "Notre Catalogue Complet"}
            </h2>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car, index) => (
                  <CarCard key={`flag-${index}`} data={car} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border border-dashed border-slate-300 text-slate-400">
                  <Search size={48} className="mb-4 opacity-50" />
                  <p className="text-lg font-medium">Aucun véhicule ne correspond à vos critères.</p>
                  <button 
                    onClick={() => {setSearchTerm(""); setPriceRange(200000);}}
                    className="mt-4 text-blue-600 hover:underline"
                  >
                    Effacer les filtres
                  </button>
              </div>
            )}
          </div>

          {/* Pagination UI */}
          <div className="flex justify-center items-center gap-2 mt-12">
            {[1, 2, 3].map((page) => (
                <button 
                    key={page}
                    className={`w-10 h-10 rounded-xl font-bold transition-all ${page === 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                >
                    {page}
                </button>
            ))}
            <button className="w-10 h-10 rounded-xl bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 flex items-center justify-center">
                →
            </button>
          </div>

        </section>
      </main>
    </div>
  );
}
