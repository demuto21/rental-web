"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { allCars } from "@/modules/carsData";
import { 
  ArrowLeft, MapPin, Star, Calendar, AlertCircle, CheckCircle, Info, X, User, Mail, Phone
} from "lucide-react";

// --- COMPOSANT MODAL DE RÉSERVATION ---
const BookingModal = ({ isOpen, onClose, carName, price }: any) => {
  const [step, setStep] = useState(1); // 1 = Formulaire, 2 = Succès

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous connecteriez votre API backend
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        
        {/* Bouton Fermer */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-10"
        >
          <X size={20} className="text-slate-600" />
        </button>

        {step === 1 ? (
          <div className="p-8">
            <div className="mb-6">
              <span className="text-blue-600 font-bold text-xs uppercase tracking-wider">Réservation</span>
              <h2 className="text-2xl font-bold text-slate-800 mt-1">Louer {carName}</h2>
              <p className="text-slate-500 text-sm">Remplissez ce formulaire pour envoyer une demande.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Date de début</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="date" required className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-600" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Date de fin</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="date" required className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-600" />
                  </div>
                </div>
              </div>

              {/* Infos Perso */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input type="text" placeholder="Serge Kenfack" required className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="email" placeholder="serge@mail.com" required className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="tel" placeholder="699..." required className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>

              {/* Résumé Prix */}
              <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center mt-6">
                <span className="text-blue-800 text-sm font-medium">Prix estimé / jour</span>
                <span className="text-blue-900 font-bold text-lg">{price.toLocaleString()} CFA</span>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all mt-4">
                Confirmer la demande
              </button>
            </form>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Demande Envoyée !</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              L'agence a reçu votre demande de réservation. <br/>
              Un conseiller va vous contacter rapidement pour finaliser la location.
            </p>
            <button onClick={onClose} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg">
              Retour au véhicule
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- PAGE DÉTAILS ---
export default function CarDetailsPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("presentation");
  const [carData, setCarData] = useState<any>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false); // État du modal

  useEffect(() => {
    if (params?.id) {
      const id = Number(params.id);
      const foundCar = allCars.find((c) => c.id === id);
      setCarData(foundCar || null);
    }
  }, [params]);

  if (!carData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="text-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
            <AlertCircle size={48} className="text-slate-300 mb-4 mx-auto" />
            <h1 className="text-2xl font-bold text-slate-700">Chargement...</h1>
            <p className="text-slate-500 mb-4 mt-2">Si ce message persiste, le véhicule est introuvable.</p>
            <Link href="/CarsPage" className="text-blue-600 hover:underline font-bold inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Retour au catalogue
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-800">
      
      {/* Modal de Réservation */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        carName={carData.name}
        price={carData.price}
      />

      {/* Header Navigation */}
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <Link href="/CarsPage" className="inline-flex items-center text-slate-600 hover:text-blue-600 font-bold transition-colors group">
          <div className="p-2.5 bg-white rounded-full shadow-sm border border-slate-100 mr-3 group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors">
             <ArrowLeft size={20} className="text-slate-500 group-hover:text-blue-600" />
          </div>
          Retour aux voitures
        </Link>
      </div>

      <main className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* === COLONNE GAUCHE (Images & Map) === */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Galerie Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 md:col-span-2 group cursor-pointer">
               <Image 
                  src={carData.image} 
                  alt={carData.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                    Vue Principale
                </div>
            </div>
            
            {carData.gallery.slice(1).map((img: string, index: number) => (
              <div key={index} className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer">
                <Image 
                    src={img} 
                    alt={`Vue ${index + 1}`} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            ))}
          </div>

          {/* Section Localisation */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <MapPin className="text-blue-600" size={24} /> Localisation
            </h2>
            <div className="bg-slate-100 rounded-3xl h-72 relative overflow-hidden w-full group border border-slate-200">
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(carData.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="absolute inset-0 w-full h-full rounded-3xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                ></iframe>
            </div>
            <p className="mt-3 text-sm text-slate-500 flex items-center gap-2">
                <Info size={14} /> Le véhicule est situé à : <span className="font-bold text-slate-700">{carData.location}</span>
            </p>
          </div>
        </div>

        {/* === COLONNE DROITE (Infos & Onglets) === */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Carte Principale */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-slate-100 text-center relative z-20">
            <h1 className="text-3xl font-black text-blue-600 mb-3 leading-tight">{carData.name}</h1>
            <p className="text-slate-500 mb-8 leading-relaxed px-2">{carData.description}</p>
            
            <div className="flex justify-center items-end gap-2 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100 inline-flex mx-auto w-full">
                <span className="text-4xl font-extrabold text-slate-900">{carData.price.toLocaleString()}</span>
                <span className="text-slate-500 font-bold mb-1.5 text-lg">CFA <span className="text-xs font-normal">/ Jour</span></span>
            </div>

            <button 
                onClick={() => setIsBookingOpen(true)} // Ouvre le modal
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 mb-4 flex items-center justify-center gap-2"
            >
              Louer maintenant <CheckCircle size={20} />
            </button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <Info size={14} /> Annulation gratuite jusqu'à 24h avant
            </div>
          </div>

          {/* Section Onglets */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden min-h-[450px] flex flex-col">
            <div className="flex border-b border-slate-100 overflow-x-auto hide-scrollbar bg-white sticky top-0 z-10">
              {[
                { id: "presentation", label: "Détails" },
                { id: "avis", label: `Avis (${carData.reviewsList.length})` },
                { id: "stats", label: "Performances" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-5 px-6 text-sm font-bold capitalize transition-all relative whitespace-nowrap
                    ${activeTab === tab.id ? 'text-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}
                  `}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="p-8 bg-slate-50/30 h-full flex-1">
                {activeTab === "presentation" && (
                  <div className="grid grid-cols-1 gap-y-4">
                    {Object.entries(carData.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0 hover:bg-white px-2 rounded-lg transition-colors">
                            <span className="text-slate-500 capitalize text-sm font-medium">{key}</span>
                            <span className="font-bold text-slate-800 text-sm">{value as string}</span>
                        </div>
                    ))}
                  </div>
                )}
                
                {activeTab === "avis" && (
                  <div className="space-y-4">
                    {carData.reviewsList.length > 0 ? carData.reviewsList.map((review: any) => (
                      <div key={review.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden relative flex-shrink-0 border border-slate-200">
                            <Image src={review.avatar} alt={review.user} fill className="object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-slate-800 text-sm">{review.user}</span>
                                <div className="flex text-orange-400">
                                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                                </div>
                            </div>
                            <p className="text-slate-600 text-sm italic leading-relaxed">"{review.comment}"</p>
                        </div>
                      </div>
                    )) : (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                            <p className="text-slate-400 text-sm">Aucun avis pour le moment.</p>
                        </div>
                    )}
                  </div>
                )}
                
                {activeTab === "stats" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition-shadow">
                        <div className="p-3 bg-orange-50 rounded-full text-orange-500 mb-1">
                            <Star size={24} fill="currentColor" />
                        </div>
                        <div>
                            <span className="text-2xl font-black text-slate-800 block">{carData.rating}</span>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Note Moyenne</span>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition-shadow">
                        <div className="p-3 bg-blue-50 rounded-full text-blue-600 mb-1">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <span className="text-2xl font-black text-slate-800 block">{carData.specs.vitesseMax}</span>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Vitesse Max</span>
                        </div>
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