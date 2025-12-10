"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Fuel, Gauge, User, ShieldCheck, Clock, Wallet, Headphones } from "lucide-react";

// --- DATA ---
const vehicles = [
  {
    name: "Limousine Alpha",
    image: "/assets/limousine.jpg",
    price: 100000,
    type: "Auto",
    fuel: "Essence",
    seats: 8,
    rating: 5.0
  },
  {
    name: "Mercedes GLE 450",
    image: "/assets/mercedes gle.webp",
    price: 85000,
    type: "Auto",
    fuel: "Diesel",
    seats: 5,
    rating: 4.9
  },
  {
    name: "Toyota Land Cruiser",
    image: "/assets/toyota.jpg",
    price: 55000,
    type: "Manuel",
    fuel: "Diesel",
    seats: 7,
    rating: 4.7
  },
  {
    name: "Audi Q8 S-Line",
    image: "/assets/audi.jpg",
    price: 90000,
    type: "Auto",
    fuel: "Hybride",
    seats: 5,
    rating: 4.8,
  },
];

// --- COMPOSANT CAR CARD (Version Accueil) ---
const HomeCarCard = ({ data }: { data: any }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-100 flex-shrink-0 w-[300px] md:w-[340px]">
    {/* Image */}
    <div className="relative h-48 bg-gray-100 overflow-hidden">
      <Image
        src={data.image}
        alt={data.name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-sm">
        <Star size={12} className="text-yellow-400 fill-yellow-400" />
        {data.rating}
      </div>
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="font-bold text-slate-800 text-lg mb-1">{data.name}</h3>
      <p className="text-blue-600 font-extrabold text-xl mb-4">
        {data.price.toLocaleString()} <span className="text-sm font-medium text-slate-400">CFA/jr</span>
      </p>

      {/* Features */}
      <div className="flex justify-between border-t border-slate-100 pt-4 mb-4">
        <div className="flex flex-col items-center gap-1">
          <Gauge size={18} className="text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">{data.type}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Fuel size={18} className="text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">{data.fuel}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <User size={18} className="text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">{data.seats} places</span>
        </div>
      </div>

      <button className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-blue-600 transition-colors shadow-lg">
        Réserver
      </button>
    </div>
  </div>
);

// --- COMPOSANT WHY CHOOSE US ITEM ---
const FeatureItem = ({ icon: Icon, title, desc, color }: any) => (
  <div className="flex gap-5 items-start p-4 hover:bg-slate-50 rounded-2xl transition-colors">
    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${color} shadow-sm`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function FeaturedVehicles() {
  return (
    <div className="flex flex-col gap-24 py-12">
      
      {/* === SECTION VÉHICULES EN VEDETTE === */}
      <section>
        <div className="text-center mb-12">
          <span className="text-orange-500 font-bold tracking-wider text-sm uppercase">Collection Exclusive</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">Véhicules en Vedette</h2>
        </div>

        {/* Scroll Horizontal Container */}
        <div className="overflow-x-auto pb-8 hide-scrollbar px-4 -mx-4 flex justify-center">
          <div className="flex gap-6">
            {vehicles.map((v, i) => (
              <HomeCarCard key={i} data={v} />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Link href="/CarsPage">
            <button className="bg-white border-2 border-slate-200 text-slate-700 font-bold py-3 px-8 rounded-full hover:border-blue-600 hover:text-blue-600 transition-all">
              Voir tout le catalogue
            </button>
          </Link>
        </div>
      </section>

      {/* === SECTION WHY CHOOSE US (Refondue) === */}
      <section className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-lg text-slate-500">
              Nous ne nous contentons pas de louer des voitures. Nous vous offrons une expérience de mobilité sans tracas, sécurisée et premium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureItem 
              icon={Clock} 
              title="Rapide & Facile" 
              desc="Réservez votre véhicule en moins de 2 minutes grâce à notre processus simplifié."
              color="bg-blue-600"
            />
            <FeatureItem 
              icon={ShieldCheck} 
              title="Sécurité Garantie" 
              desc="Tous nos véhicules sont inspectés régulièrement et nos partenaires sont vérifiés."
              color="bg-orange-500"
            />
            <FeatureItem 
              icon={User} 
              title="Chauffeurs Pros" 
              desc="Besoin d'un chauffeur ? Nos experts de la route vous conduisent en toute sérénité."
              color="bg-indigo-600"
            />
            <FeatureItem 
              icon={Wallet} 
              title="Prix Transparents" 
              desc="Pas de frais cachés. Le prix affiché est le prix que vous payez."
              color="bg-emerald-500"
            />
            <FeatureItem 
              icon={Headphones} 
              title="Support 24/7" 
              desc="Une équipe dédiée est à votre écoute à tout moment pour vous assister."
              color="bg-pink-500"
            />
            <FeatureItem 
              icon={Star} 
              title="Qualité Premium" 
              desc="Nous sélectionnons uniquement les véhicules offrant le meilleur confort."
              color="bg-violet-600"
            />
          </div>
        </div>
      </section>

    </div>
  );
}