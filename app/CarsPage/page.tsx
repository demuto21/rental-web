"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, SlidersHorizontal, Users, Fuel, Gauge, Car, Star, Settings } from "lucide-react";
// Import du service API (Backend)
import { carService } from "@/services/api";

const CarCard = ({ data }: { data: any }) => (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-slate-100 flex flex-col h-full">
    <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center overflow-hidden">
      {/* Image venant du Backend */}
      <Image 
        src={data.image || "/assets/car1.jpeg"} 
        alt={data.name} 
        fill 
        className="object-cover group-hover:scale-105 transition-transform duration-500" 
      />
      <div className="absolute bottom-3 left-3 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
        {data.isAvailable ? "Disponible" : "Loué"}
      </div>
    </div>

    <div className="p-5 flex flex-col flex-1">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{data.name}</h3>
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-slate-700">{data.rating || "N/A"}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Par jour</p>
          <p className="text-lg font-bold text-blue-600">{data.pricePerDay?.toLocaleString()} CFA</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 mb-4">
        <div className="flex flex-col items-center text-center">
          <Users size={16} className="text-slate-400 mb-1" />
          <span className="text-xs text-slate-600">{data.seats || 5} Pl.</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Fuel size={16} className="text-slate-400 mb-1" />
          <span className="text-xs text-slate-600">{data.fuelType || "Essence"}</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Gauge size={16} className="text-slate-400 mb-1" />
          <span className="text-xs text-slate-600 truncate w-full">{data.transmission || "Manuel"}</span>
        </div>
      </div>

      <div className="mt-auto">
        <Link href={`/CarsPage/${data.id}`}>
            <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                Voir Détails
            </button>
        </Link>
      </div>
    </div>
  </div>
);

export default function CarsPage() {
  // États de filtrage
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(200000);
  const [selectedType, setSelectedType] = useState("Tous");
  
  // États de données (API)
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Charger les données au démarrage
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await carService.getAll();
        setCars(response.data); // On stocke les vraies données
      } catch (error) {
        console.error("Erreur chargement voitures:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // 2. Filtrer les données reçues
  const filteredCars = cars.filter((car) => {
    // Filtre Recherche Nom
    const matchName = car.name && car.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtre Prix (On utilise pricePerDay du backend)
    const matchPrice = (car.pricePerDay || 0) <= priceRange;
    
    // Filtre Type (On compare avec le champ type du backend)
    const matchType = selectedType === "Tous" || (car.type && car.type.toLowerCase() === selectedType.toLowerCase());

    return matchName && matchPrice && matchType;
  });

  if (loading) return <div className="min-h-screen flex justify-center items-center text-blue-600 font-bold text-xl">Chargement du catalogue...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-6 md:px-12 py-4">
        <div className="flex items-center justify-between max-w-[1440px] mx-auto">
          <Link href="/" className="text-2xl font-bold flex items-center gap-1">
            <div className="bg-blue-600 text-white p-1 rounded-lg"><Car size={24} /></div>
            <span className="text-blue-600">EASY</span><span className="text-orange-500">-RENT</span>
          </Link>
          <div className="hidden md:flex flex-1 max-w-lg mx-8 bg-slate-100 rounded-full px-4 py-2.5 items-center border border-transparent focus-within:border-blue-300 transition-all">
             <Search size={18} className="text-slate-400 mr-2" />
             <input type="text" placeholder="Rechercher..." className="bg-transparent outline-none w-full text-slate-700 placeholder-slate-400 text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/CarsPage" className="text-blue-600">Cars</Link>
            <Link href="/Agencies" className="hover:text-blue-600 transition-colors">Agencies</Link>
            <Link href="/Help" className="hover:text-blue-600 transition-colors">Help</Link>
          </nav>
          <div className="flex gap-4 items-center pl-4 border-l border-slate-200 ml-4">
            <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"><Heart size={20} /></button>
            <Link href="/Profil"><button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition text-slate-600"><Settings size={20} /></button></Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto p-6 flex flex-col md:flex-row gap-8 relative mt-4">
        
        {/* BARRE LATÉRALE (SIDEBAR) RESTAURÉE */}
        <aside className="w-full md:w-[320px] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit sticky top-24 self-start flex-shrink-0 z-40">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-slate-800 text-xl font-bold flex items-center gap-2"><SlidersHorizontal size={20} className="text-blue-600"/> Filtres</h2>
             <button onClick={() => {setSearchTerm(""); setPriceRange(200000); setSelectedType("Tous")}} className="text-xs text-blue-600 hover:underline font-medium">Réinitialiser</button>
          </div>
          <hr className="border-slate-100 my-6" />
          <div className="mb-6">
            <div className="flex justify-between mb-4">
                <label className="text-slate-700 font-semibold text-sm">Prix Max / Jour</label>
                <span className="text-sm font-bold text-blue-600">{priceRange.toLocaleString()} CFA</span>
            </div>
            <input type="range" min="5000" max="200000" step="5000" value={priceRange} onChange={(e) => setPriceRange(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
          </div>
          <hr className="border-slate-100 my-6" />
          <div className="mb-8">
            <label className="text-slate-700 font-semibold text-sm mb-4 block">Type</label>
            <div className="space-y-3">
              {["Tous", "Sport", "SUV", "Luxe", "Moto", "Quad"].map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="type" className="accent-blue-600" checked={selectedType === type} onChange={() => setSelectedType(type)} />
                  <span className={`text-sm font-medium ${selectedType === type ? 'text-blue-700' : 'text-slate-600'}`}>{type}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* SECTION GRILLE */}
        <section className="flex-1 overflow-hidden pb-20">
          <div className="bg-blue-600 rounded-3xl p-8 mb-12 text-white relative overflow-hidden shadow-lg">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
             <div className="relative z-10">
                 <h1 className="text-3xl md:text-4xl font-bold mb-2">Catalogue Véhicules</h1>
                 <p className="text-blue-100">{filteredCars.length} véhicules disponibles.</p>
             </div>
          </div>

          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                <CarCard key={car.id} data={car} />
                ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400">Aucun véhicule trouvé (Vérifiez la base de données).</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}