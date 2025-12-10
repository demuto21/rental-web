"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"; // Pour récupérer l'ID
import { allCars } from "@/modules/carsData"; // On importe les données
import { 
  ArrowLeft, MapPin, Star, Heart, 
  Calendar, CheckCircle, AlertCircle
} from "lucide-react";

export default function CarDetailsPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("presentation");
  
  // Trouver la voiture correspondante
  // On convertit params.id en nombre car nos IDs sont des nombres dans carsData
  const carId = Number(params.id);
  const carData = allCars.find((c) => c.id === carId);

  if (!carData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <AlertCircle size={48} className="text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold text-slate-700">Voiture non trouvée</h1>
        <Link href="/CarsPage" className="text-blue-600 hover:underline mt-4">
          Retour aux voitures
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header Navigation */}
      <div className="max-w-[1440px] mx-auto px-6 py-6">
        <Link href="/CarsPage" className="inline-flex items-center text-slate-600 hover:text-blue-600 font-bold transition-colors">
          <div className="p-2 bg-white rounded-full shadow-sm mr-3">
             <ArrowLeft size={20} />
          </div>
          Retour au catalogue
        </Link>
      </div>

      <main className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* === COLONNE GAUCHE (Images & Map) === */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Galerie Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image Principale (plus grande) */}
            <div className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 md:col-span-2">
               <Image 
                  src={carData.image} 
                  alt={carData.name} 
                  fill 
                  className="object-cover" 
                />
            </div>
            {/* Images secondaires */}
            {carData.gallery.map((img, index) => (
              <div key={index} className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                <Image 
                  src={img} 
                  alt={`Vue ${index + 1}`} 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
            ))}
          </div>

          {/* Section Localisation */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Localisation</h2>
            <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 h-64 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-100">
                    <div className="w-full h-full opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/OpenStreetMap_transport_layer.png')] bg-cover"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-blue-600 p-3 rounded-full shadow-xl animate-bounce">
                            <MapPin className="text-white" size={24} />
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-lg shadow-md text-xs font-bold whitespace-nowrap">
                            {carData.location}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* === COLONNE DROITE (Infos & Onglets) === */}
        <div className="lg:col-span-5 space-y-10">
          
          {/* Carte Principale "Rent Now" */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-slate-100 text-center sticky top-24">
            <h1 className="text-3xl font-extrabold text-blue-600 mb-2">{carData.name}</h1>
            <p className="text-slate-500 mb-6">{carData.description}</p>
            
            <div className="flex justify-center items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-slate-800">{carData.price.toLocaleString()}</span>
                <span className="text-slate-500 font-medium">FCFA / Jour</span>
            </div>

            <button className="w-full bg-[#F76513] hover:bg-[#e55a0f] text-white font-bold text-xl py-4 rounded-2xl shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 mb-4">
              Louer maintenant
            </button>
            <p className="text-xs text-slate-400">Annulation gratuite jusqu'à 24h avant</p>
          </div>

          {/* Section Onglets (Tabs) */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden min-h-[400px]">
            <div className="flex border-b border-slate-100 overflow-x-auto hide-scrollbar">
              {["presentation", "avis", "stats"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-5 px-4 text-sm font-bold capitalize transition-colors relative
                    ${activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}
                  `}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="p-8 bg-slate-50/50 h-full">
                {/* --- CONTENU PRÉSENTATION --- */}
                {activeTab === "presentation" && (
                  <div className="grid grid-cols-1 gap-y-4">
                    {Object.entries(carData.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-3 border-b border-slate-200 last:border-0">
                            <span className="text-slate-500 capitalize">{key}</span>
                            <span className="font-bold text-slate-800">{value}</span>
                        </div>
                    ))}
                  </div>
                )}
                
                {/* --- CONTENU AVIS --- */}
                {activeTab === "avis" && (
                  <div className="space-y-4">
                    {carData.reviewsList.length > 0 ? carData.reviewsList.map((review) => (
                      <div key={review.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                                <Image src={review.avatar} alt={review.user} width={32} height={32} />
                            </div>
                            <span className="font-bold text-sm">{review.user}</span>
                            <div className="flex ml-auto text-orange-400">
                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                            </div>
                        </div>
                        <p className="text-slate-600 text-sm italic">"{review.comment}"</p>
                      </div>
                    )) : (
                        <p className="text-center text-slate-400 py-10">Aucun avis pour le moment.</p>
                    )}
                  </div>
                )}
                
                {/* --- CONTENU STATS --- */}
                {activeTab === "stats" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border-2 border-blue-100 flex flex-col items-center justify-center text-center">
                        <Star size={24} className="text-orange-500 fill-orange-500 mb-2" />
                        <span className="text-2xl font-bold text-slate-800">{carData.rating}</span>
                        <span className="text-xs text-slate-400">Note moyenne</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border-2 border-blue-100 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-bold text-slate-800">{carData.specs.vitesseMax}</span>
                        <span className="text-xs text-slate-400">Vitesse Max</span>
                    </div>
                  </div>
                )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}