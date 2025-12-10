"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, Heart, SlidersHorizontal, MapPin, 
  Star, Phone, Clock, Building2, Car, CheckCircle, 
  Settings, ArrowRight
} from "lucide-react";

// --- COMPOSANT AGENCY CARD (Style unifié avec CarCard) ---
const AgencyCard = ({ data }: { data: any }) => (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-slate-100 flex flex-col h-full">
    {/* Image & Badge */}
    <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
      {/* Image de l'agence ou Placeholder */}
      {data.image ? (
        <Image 
          src={data.image} 
          alt={data.name} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <Building2 className="text-slate-300 w-16 h-16" />
      )}
      
      {/* Bouton Favoris */}
      <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:text-red-500 transition-colors z-10">
        <Heart size={18} className={data.isFavorite ? "fill-red-500 text-red-500" : "text-slate-600"} />
      </button>
      
      {/* Badge Statut (Ouvert/Fermé) */}
      <div className={`absolute bottom-3 left-3 px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 ${data.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        <div className={`w-2 h-2 rounded-full ${data.isOpen ? 'bg-green-600' : 'bg-red-600'}`}></div>
        {data.isOpen ? "Ouvert" : "Fermé"}
      </div>
    </div>

    {/* Contenu */}
    <div className="p-5 flex flex-col flex-1">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{data.name}</h3>
          <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
            <MapPin size={14} className="text-orange-500" />
            <span className="text-xs line-clamp-1">{data.location}, {data.city}</span>
          </div>
        </div>
        <div className="flex items-center bg-blue-50 px-2 py-1 rounded-lg">
            <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
            <span className="font-bold text-slate-700 text-sm">{data.rating}</span>
        </div>
      </div>

      {/* Infos Rapides */}
      <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-100 my-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 rounded-md text-blue-600">
            <Car size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Flotte</span>
            <span className="text-xs font-semibold text-slate-700">{data.vehicleCount}+ Véhicules</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-orange-50 rounded-md text-orange-600">
            <Clock size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Horaires</span>
            <span className="text-xs font-semibold text-slate-700">08h - 18h</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto flex gap-3">
        <button className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors text-sm flex items-center justify-center gap-2">
           <Phone size={16} /> Contact
        </button>
        <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2">
           Visiter <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </div>
);

export default function AgenciesPage() {
  // --- ÉTATS ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("Tous");
  const [openOnly, setOpenOnly] = useState(true);

  // --- DONNÉES FACTICES ---
  const mockAgencies = [
    { name: "Agence Prestige", city: "Yaoundé", location: "Bastos", rating: 4.8, vehicleCount: 45, isOpen: true, image: "/assets/agencies.png" },
    { name: "Douala Cars", city: "Douala", location: "Akwa", rating: 4.5, vehicleCount: 120, isOpen: true, image: "/assets/company-logo.jpg" },
    { name: "Kribi Beach Rent", city: "Kribi", location: "Centre", rating: 4.9, vehicleCount: 20, isOpen: false, image: "/assets/agencies.png" },
    { name: "Easy Drive", city: "Yaoundé", location: "Mvan", rating: 4.2, vehicleCount: 60, isOpen: true, image: "/assets/company-logo.jpg" },
    { name: "Luxury Wheels", city: "Douala", location: "Bonapriso", rating: 5.0, vehicleCount: 15, isOpen: true, image: "/assets/agencies.png" },
    { name: "Eco Move", city: "Bafoussam", location: "Ville", rating: 3.8, vehicleCount: 30, isOpen: false, image: "/assets/company-logo.jpg" },
  ];

  // Filtres
  const filteredAgencies = mockAgencies.filter(agency => 
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCity === "Tous" || agency.city === selectedCity) &&
    (!openOnly || agency.isOpen === true)
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* ======================================= */}
      {/* === NAVBAR (Identique CarsPage) === */}
      {/* ======================================= */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-6 md:px-12 py-4">
        <div className="flex items-center justify-between max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold flex items-center gap-1">
            <div className="bg-blue-600 text-white p-1 rounded-lg">
                <Building2 size={24} />
            </div>
            <span className="text-blue-600">EASY</span>
            <span className="text-orange-500">-RENT</span>
          </Link>

          {/* Search Bar Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 bg-slate-100 rounded-full px-4 py-2.5 items-center border border-transparent focus-within:border-blue-300 transition-all">
             <Search size={18} className="text-slate-400 mr-2" />
             <input
               type="text"
               placeholder="Trouver une agence..."
               className="bg-transparent outline-none w-full text-slate-700 placeholder-slate-400 text-sm"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/CarsPage" className="hover:text-blue-600 transition-colors">Cars</Link>
            <Link href="/Agencies" className="text-blue-600">Agencies</Link>
            <Link href="/Help" className="hover:text-blue-600 transition-colors">Help</Link>
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
                onClick={() => {setSearchTerm(""); setSelectedCity("Tous"); setOpenOnly(false);}}
                className="text-xs text-blue-600 hover:underline font-medium"
             >
                Réinitialiser
             </button>
          </div>

          {/* Recherche Sidebar (Mobile) */}
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

          {/* Ville Filter */}
          <div className="mb-6">
            <label className="text-slate-700 font-semibold text-sm mb-3 block">Ville</label>
            <div className="flex flex-wrap gap-2">
                {["Tous", "Yaoundé", "Douala", "Kribi", "Bafoussam"].map(city => (
                    <button
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            selectedCity === city 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {city}
                    </button>
                ))}
            </div>
          </div>

          <hr className="border-slate-100 my-6" />

          {/* Toggle Open Only */}
          <div className="flex justify-between items-center mb-6 cursor-pointer" onClick={() => setOpenOnly(!openOnly)}>
            <span className="text-slate-700 font-semibold text-sm">Ouvert actuellement</span>
            <div className={`w-11 h-6 rounded-full relative transition-colors ${openOnly ? 'bg-blue-600' : 'bg-slate-300'}`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-transform ${openOnly ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
            </div>
          </div>

          <hr className="border-slate-100 my-6" />

          {/* Score Filter */}
          <div className="mb-8">
            <label className="text-slate-700 font-semibold text-sm mb-4 block">Note minimale</label>
            <div className="space-y-2">
              {[5, 4, 3].map((score) => (
                <label key={score} className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-2 rounded-lg -mx-2">
                  <input type="radio" name="score" className="accent-blue-600 w-4 h-4" />
                  <div className="flex items-center text-sm text-slate-600">
                    <span className="font-medium mr-2">{score}+ Étoiles</span>
                    <div className="flex">
                        {[...Array(score)].map((_, i) => (
                            <Star key={i} size={12} className="fill-orange-400 text-orange-400" />
                        ))}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
            Appliquer les filtres
          </button>
        </aside>

        {/* --- CONTENT AREA --- */}
        <section className="flex-1 overflow-hidden pb-20">
          
          {/* Header Banner (Style CarsPage) */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 mb-12 text-white relative overflow-hidden shadow-lg border border-slate-700">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
             <div className="absolute bottom-0 left-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl"></div>
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Nos Agences Partenaires</h1>
                    <p className="text-slate-300">Découvrez les meilleures agences de location certifiées.</p>
                 </div>
                 <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-600 flex items-center justify-center text-xs font-bold">
                            Ag.
                        </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-blue-600 flex items-center justify-center text-xs font-bold">
                        50+
                    </div>
                 </div>
             </div>
          </div>

          {/* Section: Résultats */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                {searchTerm ? `Résultats pour "${searchTerm}"` : "Liste des agences"}
                <span className="text-sm font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{filteredAgencies.length}</span>
            </h2>

            {filteredAgencies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgencies.map((agency, i) => (
                    <AgencyCard key={i} data={agency} />
                ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border border-dashed border-slate-300 text-slate-400">
                    <Building2 size={48} className="mb-4 opacity-50" />
                    <p className="text-lg font-medium">Aucune agence trouvée.</p>
                    <button 
                        onClick={() => {setSearchTerm(""); setSelectedCity("Tous"); setOpenOnly(false);}}
                        className="mt-4 text-blue-600 hover:underline"
                    >
                        Effacer les filtres
                    </button>
                </div>
            )}
          </div>

          {/* Section: Vedettes / Partenaires Premium */}
          {mockAgencies.length > 3 && (
            <div className="mb-10 pt-10 border-t border-slate-200">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Nos Partenaires Premium</h2>
                        <p className="text-slate-500 text-sm">Les agences les mieux notées par nos utilisateurs</p>
                    </div>
                    <Link href="#" className="text-blue-600 text-sm font-bold hover:underline">Voir tout</Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockAgencies.slice(0, 3).map((agency, i) => (
                        <AgencyCard key={`prem-${i}`} data={{...agency, isFavorite: true}} />
                    ))}
                </div>
            </div>
          )}

          {/* Pagination UI */}
          <div className="flex justify-center items-center gap-2 mt-12 pb-10">
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