"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { allCars } from "@/modules/carsData";
import { 
  ArrowLeft, MapPin, Star, Calendar, AlertCircle, CheckCircle, 
  Info, X, User, Mail, Phone, Clock, Calculator, UserCheck
} from "lucide-react";

// --- COMPOSANT MODAL DE RÉSERVATION (CALCULATEUR AVEC CHAUFFEUR) ---
const BookingModal = ({ isOpen, onClose, carName, dailyPrice }: any) => {
  const [step, setStep] = useState(1);
  const [rentalType, setRentalType] = useState<'day' | 'hour'>('day');
  
  // Option Chauffeur
  const [withDriver, setWithDriver] = useState(false);
  
  // États dates/heures
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // États Prix
  const [totalPrice, setTotalPrice] = useState(0);
  const [duration, setDuration] = useState(0);

  // Tarifs (Vous pouvez ajuster ces valeurs)
  const hourlyPrice = Math.round(dailyPrice / 10);
  const DRIVER_PRICE_DAY = 15000;  // Prix chauffeur par jour
  const DRIVER_PRICE_HOUR = 2000;  // Prix chauffeur par heure

  // Calcul automatique
  useEffect(() => {
    let basePrice = 0;
    let driverCost = 0;
    let calcDuration = 0;

    if (rentalType === 'day' && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      calcDuration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      
      basePrice = calcDuration * dailyPrice;
      if (withDriver) driverCost = calcDuration * DRIVER_PRICE_DAY;

    } else if (rentalType === 'hour' && startTime && endTime) {
      const start = parseInt(startTime.split(':')[0]);
      const end = parseInt(endTime.split(':')[0]);
      calcDuration = end - start;
      if (calcDuration <= 0) calcDuration = 1;
      
      basePrice = calcDuration * hourlyPrice;
      if (withDriver) driverCost = calcDuration * DRIVER_PRICE_HOUR;
    }

    setDuration(calcDuration);
    setTotalPrice(basePrice + driverCost);
  }, [startDate, endDate, startTime, endTime, rentalType, dailyPrice, hourlyPrice, withDriver]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-900/40 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
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
            </div>

            {/* Sélecteur Type */}
            <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
              <button 
                onClick={() => { setRentalType('day'); setTotalPrice(0); }}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${rentalType === 'day' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Calendar size={16} /> Par Jour
              </button>
              <button 
                onClick={() => { setRentalType('hour'); setTotalPrice(0); }}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${rentalType === 'hour' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Clock size={16} /> Par Heure
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Dates */}
              {rentalType === 'day' ? (
                <div className="grid grid-cols-2 gap-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Du</label>
                    <input type="date" required value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Au</label>
                    <input type="date" required value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Date</label>
                    <input type="date" required value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Heure début</label>
                      <input type="time" required value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Heure fin</label>
                      <input type="time" required value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>
              )}

              {/* OPTION CHAUFFEUR */}
              <div 
                className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${withDriver ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200 hover:border-blue-300'}`}
                onClick={() => setWithDriver(!withDriver)}
              >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${withDriver ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <UserCheck size={20} />
                    </div>
                    <div>
                        <p className={`font-bold text-sm ${withDriver ? 'text-blue-800' : 'text-slate-700'}`}>Chauffeur privé</p>
                        <p className="text-xs text-slate-500">
                            +{rentalType === 'day' ? DRIVER_PRICE_DAY.toLocaleString() : DRIVER_PRICE_HOUR.toLocaleString()} CFA / {rentalType === 'day' ? 'jour' : 'heure'}
                        </p>
                    </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${withDriver ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                    {withDriver && <CheckCircle size={14} className="text-white" />}
                </div>
              </div>

              <hr className="border-slate-100 my-4" />

              {/* Infos Contact */}
              <div className="space-y-3">
                <input type="text" placeholder="Nom complet" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                <div className="grid grid-cols-2 gap-4">
                    <input type="email" placeholder="Email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="tel" placeholder="Téléphone" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              {/* Résumé Prix Dynamique */}
              <div className="bg-slate-900 p-5 rounded-2xl text-white mt-6 shadow-lg">
                <div className="flex justify-between items-center mb-1 text-sm opacity-80">
                    <span>Véhicule ({duration} {rentalType === 'day' ? 'j' : 'h'})</span>
                    <span>{(totalPrice - (withDriver ? (duration * (rentalType === 'day' ? DRIVER_PRICE_DAY : DRIVER_PRICE_HOUR)) : 0)).toLocaleString()} CFA</span>
                </div>
                {withDriver && (
                    <div className="flex justify-between items-center mb-3 text-sm text-blue-200">
                        <span>Option Chauffeur</span>
                        <span>+ {(duration * (rentalType === 'day' ? DRIVER_PRICE_DAY : DRIVER_PRICE_HOUR)).toLocaleString()} CFA</span>
                    </div>
                )}
                <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                    <span className="text-lg font-bold">Total à payer</span>
                    <span className="text-2xl font-black text-blue-400">{totalPrice.toLocaleString()} CFA</span>
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all mt-2">
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
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Votre demande pour <strong>{duration} {rentalType === 'day' ? 'jours' : 'heures'}</strong> {withDriver ? 'avec chauffeur' : ''} a bien été reçue.<br/>
              Un agent vous contactera pour valider le paiement de <span className="font-bold text-slate-800">{totalPrice.toLocaleString()} CFA</span>.
            </p>
            <button onClick={onClose} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg">
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function CarDetailsPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("presentation");
  const [carData, setCarData] = useState<any>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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
      
      {/* Modal avec option Chauffeur */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        carName={carData.name}
        dailyPrice={carData.price} 
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
        
        {/* Colonne Gauche */}
        <div className="lg:col-span-7 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 md:col-span-2 group cursor-pointer">
               <Image src={carData.image} alt={carData.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-blue-600 shadow-sm">Vue Principale</div>
            </div>
            {carData.gallery.slice(1).map((img: string, index: number) => (
              <div key={index} className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer">
                <Image src={img} alt={`Vue ${index + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <MapPin className="text-blue-600" size={24} /> Localisation
            </h2>
            <div className="bg-slate-100 rounded-3xl h-72 relative overflow-hidden w-full group border border-slate-200">
                <iframe 
                  width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(carData.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="absolute inset-0 w-full h-full rounded-3xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                ></iframe>
            </div>
            <p className="mt-3 text-sm text-slate-500 flex items-center gap-2">
                <Info size={14} /> Le véhicule est situé à : <span className="font-bold text-slate-700">{carData.location}</span>
            </p>
          </div>
        </div>

        {/* Colonne Droite */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-slate-100 text-center relative z-20">
            <h1 className="text-3xl font-black text-blue-600 mb-3 leading-tight">{carData.name}</h1>
            <p className="text-slate-500 mb-8 leading-relaxed px-2">{carData.description}</p>
            <div className="flex justify-center items-end gap-2 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100 inline-flex mx-auto w-full">
                <span className="text-4xl font-extrabold text-slate-900">{carData.price.toLocaleString()}</span>
                <span className="text-slate-500 font-bold mb-1.5 text-lg">CFA <span className="text-xs font-normal">/ Jour</span></span>
            </div>
            <button onClick={() => setIsBookingOpen(true)} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 mb-4 flex items-center justify-center gap-2">
              Louer maintenant <CheckCircle size={20} />
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <Info size={14} /> Annulation gratuite jusqu'à 24h avant
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden min-h-[450px] flex flex-col">
            <div className="flex border-b border-slate-100 overflow-x-auto hide-scrollbar bg-white sticky top-0 z-10">
              {[{ id: "presentation", label: "Détails" }, { id: "avis", label: `Avis (${carData.reviewsList.length})` }, { id: "stats", label: "Performances" }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-5 px-6 text-sm font-bold capitalize transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
                  {tab.label}
                  {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>}
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
                        <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden relative flex-shrink-0 border border-slate-200"><Image src={review.avatar} alt={review.user} fill className="object-cover" /></div>
                        <div><div className="flex items-center gap-2 mb-1"><span className="font-bold text-slate-800 text-sm">{review.user}</span><div className="flex text-orange-400">{[...Array(review.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}</div></div><p className="text-slate-600 text-sm italic leading-relaxed">"{review.comment}"</p></div>
                      </div>
                    )) : <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200"><p className="text-slate-400 text-sm">Aucun avis pour le moment.</p></div>}
                  </div>
                )}
                {activeTab === "stats" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition-shadow">
                        <div className="p-3 bg-orange-50 rounded-full text-orange-500 mb-1"><Star size={24} fill="currentColor" /></div>
                        <div><span className="text-2xl font-black text-slate-800 block">{carData.rating}</span><span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Note Moyenne</span></div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition-shadow">
                        <div className="p-3 bg-blue-50 rounded-full text-blue-600 mb-1"><Calendar size={24} /></div>
                        <div><span className="text-2xl font-black text-slate-800 block">{carData.specs.vitesseMax}</span><span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Vitesse Max</span></div>
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