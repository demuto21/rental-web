"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search, Heart, SlidersHorizontal, MapPin,
  Star, Phone, Clock, Building2, Car, ArrowRight, Settings, User
} from "lucide-react";
import { allAgencies } from "@/modules/agenciesData"; // Import des données

const AgencyCard = ({ data }: { data: any }) => (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-slate-100 flex flex-col h-full">
    {/* ... (Partie Image identique à avant) ... */}
    <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
      {data.logo ? (
        <Image src={data.logo} alt={data.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : <Building2 className="text-slate-300 w-16 h-16" />}

      {/* ... Badges ... */}
      <div className={`absolute bottom-3 left-3 px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 ${data.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        <div className={`w-2 h-2 rounded-full ${data.isOpen ? 'bg-green-600' : 'bg-red-600'}`}></div>
        {data.isOpen ? "Ouvert" : "Fermé"}
      </div>
    </div>

    <div className="p-5 flex flex-col flex-1">
      {/* ... Info Header ... */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{data.name}</h3>
          <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
            <MapPin size={14} className="text-orange-500" />
            <span className="text-xs line-clamp-1">{data.location}</span>
          </div>
        </div>
        <div className="flex items-center bg-blue-50 px-2 py-1 rounded-lg">
          <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
          <span className="font-bold text-slate-700 text-sm">{data.rating}</span>
        </div>
      </div>

      {/* ... Stats Grille ... */}
      <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-100 my-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 rounded-md text-blue-600"><Car size={16} /></div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Flotte</span>
            <span className="text-xs font-semibold text-slate-700">{data.vehicleCount} Véh.</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-orange-50 rounded-md text-orange-600"><Clock size={16} /></div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Horaires</span>
            <span className="text-xs font-semibold text-slate-700 truncate w-20">{data.openingHours}</span>
          </div>
        </div>
      </div>

      <div className="mt-auto flex gap-3">
        {/* LE LIEN VERS LA PAGE DÉTAILS */}
        <Link href={`/Agencies/${data.id}`} className="flex-1">
          <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2">
            Visiter <ArrowRight size={16} />
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default function AgenciesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("Tous");
  const [openOnly, setOpenOnly] = useState(false);

  // FILTRAGE SUR LES DONNÉES RÉELLES
  const filteredAgencies = allAgencies.filter(agency =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCity === "Tous" || agency.city === selectedCity) &&
    (!openOnly || agency.isOpen === true)
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* ... NAVBAR (Identique) ... */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-6 md:px-12 py-4">
        {/* ... code navbar ... */}
        <div className="flex items-center justify-between max-w-[1440px] mx-auto">
          <Link href="/" className="text-2xl font-bold flex items-center gap-1">
            <div className="bg-blue-600 text-white p-1 rounded-lg"><Building2 size={24} /></div>
            <span className="text-blue-600">EASY</span><span className="text-orange-500">-RENT</span>
          </Link>
          <div className="hidden md:flex flex-1 max-w-lg mx-8 bg-slate-100 rounded-full px-4 py-2.5 items-center border border-transparent focus-within:border-blue-300 transition-all">
            <Search size={18} className="text-slate-400 mr-2" />
            <input type="text" placeholder="Rechercher..." className="bg-transparent outline-none w-full text-slate-700 placeholder-slate-400 text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          {/* ... reste de la navbar ... */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/CarsPage" className="hover:text-blue-600 transition-colors">Cars</Link>
            <Link href="/Agencies" className="text-blue-600">Agencies</Link>
            <Link href="/Help" className="hover:text-blue-600 transition-colors">Help</Link>
          </nav>
          <div className="flex gap-4 items-center pl-4 border-l border-slate-200 ml-4">
            <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"><Heart size={20} /></button>
            <Link href="/Profil"><button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition text-slate-600"><Settings size={20} /></button></Link>
          </div>
        </div>
      </header>

      {/* ... RESTE DE LA PAGE (Sidebar + Grid) ... */}
      <main className="max-w-[1440px] mx-auto p-6 flex flex-col md:flex-row gap-8 relative mt-4">
        {/* Sidebar Filtres (Identique) */}
        <aside className="w-full md:w-[320px] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit sticky top-24 self-start flex-shrink-0 z-40">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-slate-800 text-xl font-bold flex items-center gap-2"><SlidersHorizontal size={20} className="text-blue-600" /> Filtres</h2>
            <button onClick={() => { setSearchTerm(""); setSelectedCity("Tous"); setOpenOnly(false); }} className="text-xs text-blue-600 hover:underline font-medium">Réinitialiser</button>
          </div>
          {/* ... Inputs de filtres ... */}
          <div className="mb-6">
            <label className="text-slate-700 font-semibold text-sm mb-3 block">Ville</label>
            <div className="flex flex-wrap gap-2">
              {["Tous", "Yaoundé", "Douala", "Kribi"].map(city => (
                <button key={city} onClick={() => setSelectedCity(city)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${selectedCity === city ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{city}</button>
              ))}
            </div>
          </div>
        </aside>

        {/* Content */}
        <section className="flex-1 overflow-hidden pb-20">
          {/* Header Banner */}
          <div className="bg-blue-600 rounded-3xl p-8 mb-12 text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Nos Agences Partenaires</h1>
              <p className="text-blue-100">{filteredAgencies.length} agences certifiées disponibles.</p>
            </div>
          </div>

          {/* Grid Résultats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgencies.map((agency) => (
              <AgencyCard key={agency.id} data={agency} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}