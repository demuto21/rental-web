"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { carService, bookingService } from "@/services/api";
import axios from 'axios';
import { 
  ArrowLeft, MapPin, Star, Calendar, CheckCircle, Info, X, Clock, User, Mail, Phone, Loader2, Gauge, Fuel, Users
} from "lucide-react";

// =========================================================
// 1. COMPOSANT MODAL DE RÉSERVATION (JOUR / HEURE)
// =========================================================
const BookingModal = ({ isOpen, onClose, carId, carName, pricePerDay, pricePerHour }: any) => {
  const [step, setStep] = useState(1); // 1 = Formulaire, 2 = Succès
  const [loading, setLoading] = useState(false);
  const [rentalType, setRentalType] = useState<"DAILY" | "HOURLY">("DAILY");

  const [formData, setFormData] = useState({
    startDate: "", startTime: "09:00",
    endDate: "", endTime: "18:00",
    clientName: "", clientEmail: "", clientPhone: "", withDriver: false
  });

  // Réinitialiser le step quand on rouvre le modal
  useEffect(() => { if (isOpen) setStep(1); }, [isOpen]);

  if (!isOpen) return null;

  // --- Calcul du Prix Dynamique ---
  const calculateTotal = () => {
    if (!formData.startDate) return 0;
    
    let total = 0;

    if (rentalType === "DAILY") {
        if (!formData.endDate) return 0;
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        const days = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) || 1;
        
        total = days * (pricePerDay || 0);
        if (formData.withDriver) total += (days * 15000); // Forfait chauffeur jour
    } else {
        // Mode Heure
        const start = new Date(`2000-01-01T${formData.startTime}`);
        const end = new Date(`2000-01-01T${formData.endTime}`);
        let hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        if (hours <= 0) hours = 1; // Minimum 1h
        
        // Si pas de prix heure défini, on prend 10% du prix jour
        const hourlyRate = pricePerHour || ((pricePerDay || 0) / 10);
        total = hours * hourlyRate;
    }
    
    return Math.round(total);
  };

  // --- Envoi au Backend ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Formatage des dates pour Spring Boot (LocalDateTime)
    let startISO, endISO;
    if (rentalType === "DAILY") {
        startISO = `${formData.startDate}T10:00:00`;
        endISO = `${formData.endDate}T10:00:00`;
    } else {
        startISO = `${formData.startDate}T${formData.startTime}:00`;
        endISO = `${formData.startDate}T${formData.endTime}:00`;
    }

    try {
      await bookingService.create({
        car: { id: carId },
        startDate: startISO,
        endDate: endISO,
        rentalType: rentalType,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        withDriver: formData.withDriver,
        totalPrice: calculateTotal()
      });
      setStep(2); // Afficher succès
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue. Vérifiez les champs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-10"><X size={20}/></button>
        
        {step === 1 ? (
          <div className="p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Louer <span className="text-orange-500">{carName}</span></h2>
            <p className="text-slate-400 text-xs mb-6">Complétez les informations ci-dessous</p>
            
            {/* SÉLECTEUR TYPE */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                <button 
                    onClick={() => setRentalType("DAILY")}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${rentalType === "DAILY" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                    Par Jour
                </button>
                <button 
                    onClick={() => setRentalType("HOURLY")}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${rentalType === "HOURLY" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                    Par Heure
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Dates */}
              {rentalType === "DAILY" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-bold text-slate-700 mb-1 block">Début</label><input type="date" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-orange-500 outline-none" onChange={e => setFormData({...formData, startDate: e.target.value})} /></div>
                    <div><label className="text-xs font-bold text-slate-700 mb-1 block">Fin</label><input type="date" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-orange-500 outline-none" onChange={e => setFormData({...formData, endDate: e.target.value})} /></div>
                  </div>
              ) : (
                  <div className="space-y-3">
                      <div><label className="text-xs font-bold text-slate-700 mb-1 block">Date</label><input type="date" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-orange-500 outline-none" onChange={e => setFormData({...formData, startDate: e.target.value})} /></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-xs font-bold text-slate-700 mb-1 block">De</label><input type="time" value={formData.startTime} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm" onChange={e => setFormData({...formData, startTime: e.target.value})} /></div>
                        <div><label className="text-xs font-bold text-slate-700 mb-1 block">À</label><input type="time" value={formData.endTime} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm" onChange={e => setFormData({...formData, endTime: e.target.value})} /></div>
                      </div>
                  </div>
              )}

              {/* Infos Perso */}
              <input type="text" placeholder="Nom complet" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none" onChange={e => setFormData({...formData, clientName: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="email" placeholder="Email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none" onChange={e => setFormData({...formData, clientEmail: e.target.value})} />
                <input type="tel" placeholder="Téléphone" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none" onChange={e => setFormData({...formData, clientPhone: e.target.value})} />
              </div>

              {/* Option Chauffeur */}
              <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                <input type="checkbox" id="driver" className="w-5 h-5 accent-orange-600 rounded cursor-pointer" onChange={e => setFormData({...formData, withDriver: e.target.checked})} />
                <label htmlFor="driver" className="text-sm font-bold text-slate-700 cursor-pointer select-none flex-1">Ajouter un chauffeur <span className="text-orange-500 text-xs block font-normal">+15 000 FCFA / jour</span></label>
              </div>

              {/* Total */}
              <div className="bg-orange-50 p-4 rounded-xl flex justify-between items-center border border-orange-100">
                <span className="text-orange-800 font-bold text-sm">Total Estimé</span>
                <span className="text-orange-900 font-black text-xl">{calculateTotal().toLocaleString()} <span className="text-sm font-bold">CFA</span></span>
              </div>

              {/* BOUTON CONFIRMER */}
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all flex justify-center transform active:scale-95">
                {loading ? <Loader2 className="animate-spin" /> : "Confirmer la demande"}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce shadow-sm">
                <CheckCircle size={48}/>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Demande Reçue !</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Votre réservation a été enregistrée.<br/>Un agent vous contactera sous peu.
            </p>
            <button onClick={onClose} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg w-full">Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================
// 2. PAGE PRINCIPALE DÉTAILS
// =========================================================
export default function CarDetailsPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("presentation");
  const [carData, setCarData] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Charger la voiture ET ses avis
  useEffect(() => {
    if (params?.id) {
      const loadData = async () => {
        try {
          // 1. Récupérer la voiture
          const carRes = await carService.getById(Number(params.id));
          const rawCar = carRes.data;
          
          // 2. Formater les données pour l'affichage
          setCarData({
            ...rawCar,
            price: rawCar.pricePerDay,
            pricePerHour: rawCar.pricePerHour,
            specs: {
              vitesse: rawCar.vitesseMax || "N/A",
              moteur: rawCar.moteur || "Standard",
              transmission: rawCar.transmission || "Manuel",
              puissance: rawCar.puissance || "N/A",
              places: (rawCar.seats || 5) + " Places"
            },
            // Si pas d'images secondaires, on met l'image principale en galerie
            gallery: rawCar.gallery && rawCar.gallery.length > 0 ? rawCar.gallery : [rawCar.image || "/assets/car1.jpeg"]
          });

          // 3. Récupérer les avis (Try/Catch silencieux)
          try {
            const reviewRes = await axios.get(`http://localhost:8081/api/reviews/car/${params.id}`);
            setReviews(reviewRes.data);
          } catch(e) { console.log("Pas d'avis disponible"); }

        } catch (error) { 
            console.error("Erreur chargement voiture:", error); 
        } finally { 
            setLoading(false); 
        }
      };
      loadData();
    }
  }, [params]);

  if (loading || !carData) return <div className="min-h-screen flex items-center justify-center text-orange-600 font-bold animate-pulse">Chargement du véhicule...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-800">
      
      {/* Intégration du Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        carId={carData.id} 
        carName={carData.name} 
        pricePerDay={carData.price}
        pricePerHour={carData.pricePerHour}
      />

      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <Link href="/CarsPage" className="inline-flex items-center text-slate-600 hover:text-orange-600 font-bold transition-colors gap-2 group">
          <div className="p-2.5 bg-white rounded-full border border-slate-200 group-hover:border-orange-200 group-hover:bg-orange-50 transition-all">
            <ArrowLeft size={18} className="group-hover:text-orange-600"/>
          </div> 
          Retour au catalogue
        </Link>
      </div>

      <main className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* === GAUCHE : VISUELS (Images + Carte) === */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. Galerie Images */}
          <div className="space-y-4">
              <div className="relative aspect-[16/10] bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group cursor-pointer">
                <Image src={carData.image || "/assets/car1.jpeg"} alt={carData.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-blue-600 shadow-sm flex items-center gap-2">
                    <Star size={12} fill="currentColor" className="text-orange-500"/> Vue Principale
                </div>
              </div>
              
              {/* Miniatures */}
              {carData.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                    {carData.gallery.slice(0, 4).map((img: string, i: number) => (
                        <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 cursor-pointer hover:border-orange-400 transition-colors">
                            <Image src={img} alt="Vue" fill className="object-cover" />
                        </div>
                    ))}
                </div>
              )}
          </div>

          {/* 2. Carte Google Maps */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><MapPin size={20} /></div>
                Localisation du véhicule
            </h2>
            <div className="bg-slate-100 rounded-3xl h-72 relative overflow-hidden w-full border border-slate-200 group">
                <iframe 
                  width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(carData.location || "Douala")}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  className="absolute inset-0 w-full h-full rounded-3xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                ></iframe>
            </div>
            <p className="mt-4 text-sm text-slate-500 flex items-center gap-2 bg-slate-50 p-3 rounded-xl">
                <Info size={16} className="text-blue-500"/> 
                Zone de récupération : <span className="font-bold text-slate-700">{carData.location || "Agence Centrale"}</span>
            </p>
          </div>
        </div>

        {/* === DROITE : INFOS + ONGLETS === */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* 1. Carte Prix & Action */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-slate-100 text-center relative z-20">
            <h1 className="text-3xl font-black text-slate-900 mb-2">{carData.name}</h1>
            <p className="text-slate-500 mb-8 px-4 text-sm line-clamp-2 leading-relaxed">{carData.description || "Un véhicule confortable et fiable pour tous vos déplacements."}</p>
            
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 inline-block mb-8 w-full">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Tarif Journalier</div>
                <span className="text-5xl font-extrabold text-orange-600">{carData.price?.toLocaleString()}</span>
                <span className="text-slate-600 font-bold text-xl"> CFA</span>
            </div>

            <button 
                onClick={() => setIsBookingOpen(true)} 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg py-4 rounded-2xl shadow-xl hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
            >
              Réserver ce véhicule <Calendar size={20}/>
            </button>
            <div className="mt-4 text-xs text-slate-400 flex justify-center gap-4">
                <span className="flex items-center gap-1"><CheckCircle size={12}/> Annulation gratuite</span>
                <span className="flex items-center gap-1"><CheckCircle size={12}/> Paiement sécurisé</span>
            </div>
          </div>

          {/* 2. Onglets (Détails / Avis / Stats) */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden min-h-[400px] flex flex-col">
            <div className="flex border-b border-slate-100 p-2 gap-2 bg-white">
              {[
                { id: "presentation", label: "Détails", icon: Info },
                { id: "avis", label: `Avis (${reviews.length})`, icon: Star },
                { id: "stats", label: "Performances", icon: Gauge },
              ].map((tab) => (
                <button
                  key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 
                    ${activeTab === tab.id ? 'bg-orange-50 text-orange-600 shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}
                  `}
                >
                  <tab.icon size={16}/> {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8 bg-slate-50/30 h-full flex-1 relative">
                {/* Contenu Onglet : DÉTAILS */}
                {activeTab === "presentation" && (
                  <div className="space-y-4 animate-fadeIn">
                    {Object.entries(carData.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-3 border-b border-slate-200 last:border-0 hover:bg-white px-3 rounded-lg transition-colors">
                            <span className="text-slate-500 capitalize text-sm font-medium flex items-center gap-2">
                                {key === 'vitesse' && <Gauge size={16}/>}
                                {key === 'carburant' && <Fuel size={16}/>}
                                {key === 'places' && <Users size={16}/>}
                                {key}
                            </span>
                            <span className="font-bold text-slate-800 text-sm">{value as string}</span>
                        </div>
                    ))}
                  </div>
                )}
                
                {/* Contenu Onglet : AVIS */}
                {activeTab === "avis" && (
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar animate-fadeIn">
                    {reviews.length > 0 ? reviews.map((review: any) => (
                      <div key={review.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between mb-2 items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                                    {review.userName ? review.userName[0] : "U"}
                                </div>
                                <span className="font-bold text-slate-800 text-sm">{review.userName || "Utilisateur"}</span>
                            </div>
                            <div className="flex text-yellow-400 bg-yellow-50 px-2 py-1 rounded-lg">
                                {[...Array(review.rating || 5)].map((_, i) => <Star key={i} size={10} fill="currentColor"/>)}
                            </div>
                        </div>
                        <p className="text-slate-600 text-xs italic leading-relaxed pl-10">"{review.comment}"</p>
                      </div>
                    )) : (
                        <div className="text-center py-12 flex flex-col items-center gap-3">
                            <div className="p-4 bg-slate-100 rounded-full text-slate-400"><Star size={24}/></div>
                            <p className="text-slate-400 text-sm">Aucun avis pour le moment.</p>
                        </div>
                    )}
                  </div>
                )}
                
                {/* Contenu Onglet : STATS */}
                {activeTab === "stats" && (
                  <div className="grid grid-cols-2 gap-4 text-center animate-fadeIn">
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2">
                        <div className="p-3 bg-yellow-50 text-yellow-500 rounded-full"><Star size={24} fill="currentColor" /></div>
                        <span className="block font-black text-2xl text-slate-800">{carData.rating || "5.0"}</span>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Note Moyenne</span>
                    </div>
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2">
                        <div className="p-3 bg-blue-50 text-blue-500 rounded-full"><Gauge size={24} /></div>
                        <span className="block font-black text-xl text-slate-800">{carData.vitesseMax || "N/A"}</span>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Vitesse Max</span>
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