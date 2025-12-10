"use client";

import { useState } from "react";
import { Search, Heart, MapPin, Star, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- COMPOSANT CARTE AGENCE (Interne pour ce fichier) ---
const AgencyCard = ({ name, location, subLocation }: { name: string, location: string, subLocation: string }) => {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center min-w-[260px]">
      {/* Header: Nom + Coeur */}
      <div className="w-full flex justify-between items-start mb-2">
        <h3 className="text-blue-700 font-bold text-lg">{name}</h3>
        <Heart className="fill-red-500 text-red-500 w-5 h-5 cursor-pointer" />
      </div>

      {/* Image Agence (Voiture placeholder comme sur la maquette) */}
      <div className="relative w-full h-32 mb-3">
        <Image
          src="/assets/car2.jpeg" // L'image rouge de tes screens
          alt={name}
          fill
          className="object-contain"
        />
      </div>

      {/* Localisation */}
      <div className="w-full text-left mb-2">
        <p className="text-gray-800 font-semibold">{location}</p>
        <p className="text-gray-500 text-sm">{subLocation}</p>
      </div>

      {/* Stats (Icônes gris clair) */}
      <div className="flex justify-start gap-4 w-full text-gray-400 text-xs mb-4">
        <div className="flex items-center gap-1">
          <MessageSquare size={14} /> <span>2</span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={14} className="text-orange-400 fill-orange-400" /> <span>2</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Open</span>
        </div>
      </div>

      {/* Bouton Visit */}
      <button className="w-full bg-blue-700 text-white font-semibold py-2 rounded-full hover:bg-blue-800 transition-colors">
        Visit
      </button>
    </div>
  );
};

export default function AgenciesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScore, setSelectedScore] = useState(0);

  // Données factices répétées pour l'exemple
  const mockAgencies = [
    { name: "Agence Alpha", location: "Yaoundé", subLocation: "Obili" },
    { name: "Agence Bet", location: "Yaoundé", subLocation: "Obili" },
    { name: "Agence Cet", location: "Douala", subLocation: "Akwa" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* ======================================= */}
      {/* === NAVBAR (Identique à CarsPage) === */}
      {/* ======================================= */}
      <header className="bg-white py-4 px-6 md:px-12 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-8 w-full">
          <Link href="/" className="text-2xl font-bold whitespace-nowrap">
            <span className="text-blue-600">EASY</span>
            <span className="text-orange-500">-RENT</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl mx-auto bg-gray-200 rounded-full px-6 py-3 items-center">
             <input
              type="text"
              placeholder="search here"
              className="bg-transparent outline-none w-full text-gray-600 placeholder-gray-500"
            />
          </div>

          <nav className="hidden md:flex gap-6 text-gray items-center">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/CarsPage" className="hover:text-blue-600">Cars</Link>
            <Link href="/Agencies" className="text-blue-600 border-b-2 border-blue-600 pb-1">Agencies</Link>
            <a href="#" className="hover:text-blue-600">Help</a>
          </nav>

          <div className="flex gap-3 items-center">
            <button className="p-2 rounded-full bg-blue-50 text-blue-600">
              <Heart size={20} />
            </button>
            <div className="w-10 h-10 bg-gray-200 rounded-full">
                <User className="w-5 h-5 text-gray-600 m-2.5" />
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-[1400px] mx-auto p-6 flex flex-col md:flex-row gap-8 mt-4 relative">
        
        {/* ======================================================= */}
        {/* === SIDEBAR FILTRES (Style Agence) - FIXE === */}
        {/* ======================================================= */}
        <aside className="w-full md:w-[300px] bg-white p-6 rounded-3xl shadow-sm h-fit border border-gray-100 sticky top-24 self-start flex-shrink-0">
          <h2 className="text-blue-700 text-2xl font-bold mb-6">Filter by :</h2>

          {/* Search */}
          <div className="bg-gray-200 rounded-full px-4 py-3 flex items-center mb-6">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="search here"
              className="bg-transparent outline-none w-full text-sm placeholder-gray-500"
            />
          </div>

          <hr className="border-gray-100 my-6" />

          {/* City Filter (Style gris comme sur la capture 14) */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
               <span className="text-blue-600 font-semibold text-sm">City</span>
            </div>
            <div className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md text-sm">
                Yaoundé
            </div>
          </div>

          <hr className="border-gray-100 my-6" />

          {/* Open Only Toggle */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-blue-600 font-semibold text-sm">Open only</span>
            <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
              <div className="w-6 h-6 bg-white rounded-full shadow absolute right-0 border border-gray-200"></div>
            </div>
          </div>

          <hr className="border-gray-100 my-6" />

          {/* Score Radio Buttons */}
          <div className="mb-8">
            <label className="text-blue-600 font-semibold text-sm mb-4 block">Score</label>
            <div className="grid grid-cols-2 gap-4">
              {[1, 3, 2, 4].map((score) => (
                <label key={score} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="score"
                    checked={selectedScore === score}
                    onChange={() => setSelectedScore(score)}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    {score} <Star size={12} className="ml-1 text-orange-500 fill-orange-500" />
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <button className="flex-1 bg-blue-800 text-white py-3 rounded-full text-sm font-bold hover:bg-blue-900 transition">
              clear
            </button>
            <button className="flex-1 bg-orange-500 text-white py-3 rounded-full text-sm font-bold hover:bg-orange-600 transition">
              apply here
            </button>
          </div>
        </aside>

        {/* ============================================ */}
        {/* === CONTENT (SEULE CETTE PARTIE DÉFILE) === */}
        {/* ============================================ */}
        <section className="flex-1 overflow-hidden space-y-16">
          
          {/* SECTION 1: Les agences les plus utilisés (Capture 14) */}
          <div>
            <h2 className="text-center text-3xl font-bold mb-8 text-black">Les agences les plus utilisés</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAgencies.map((agency, i) => <AgencyCard key={i} {...agency} />)}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[300px]"></div>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[300px]"></div>
            </div>
          </div>

          {/* SECTION 2: Our agencies in Douala (Capture 13) */}
          <div>
            <h2 className="text-center text-3xl font-bold mb-8 text-black">Our agencies in Douala</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAgencies.map((agency, i) => <AgencyCard key={i} {...agency} location="Douala" subLocation="Akwa" />)}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[300px]"></div>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[300px]"></div>
            </div>
          </div>

          {/* SECTION 3: Our agencies in Yaoundé (Capture 12) */}
          <div>
            <h2 className="text-center text-3xl font-bold mb-8 text-black">Our agencies in Yaoundé</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAgencies.map((agency, i) => <AgencyCard key={i} {...agency} location="Yaoundé" subLocation="Bastos" />)}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[300px]"></div>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[300px]"></div>
            </div>
          </div>

          {/* SECTION 4: Les agences vedette (Capture 15) */}
          <div>
            <h2 className="text-center text-3xl font-bold mb-8 text-black">Les agences vedette</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAgencies.map((agency, i) => <AgencyCard key={i} {...agency} />)}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[300px]"></div>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[300px]"></div>
            </div>
          </div>

          {/* SECTION 5: Our best partners (Capture 11) */}
          <div>
            <h2 className="text-center text-3xl font-bold mb-8 text-black">Our best partners</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAgencies.map((agency, i) => <AgencyCard key={i} {...agency} />)}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[300px]"></div>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[300px]"></div>
            </div>
          </div>

          {/* Pagination & Button */}
          <div className="flex flex-col items-center gap-8 pb-10">
            <div className="flex justify-center gap-4">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            </div>
            <button className="bg-orange-500 text-white text-xl font-bold py-3 px-12 rounded-full shadow-lg hover:bg-orange-600 transition">
              View More
            </button>
          </div>

        </section>
      </main>
    </div>
  );
}