"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { allDrivers } from "@/modules/driversData";
import { 
  ArrowLeft, MapPin, Star, Phone, Mail, CheckCircle, 
  User, Globe, ShieldCheck, MessageCircle, Calendar
} from "lucide-react";

export default function DriverProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("infos");
  const [driver, setDriver] = useState<any>(null);

  useEffect(() => {
    if (params?.id) {
      const id = Number(params.id);
      const found = allDrivers.find((d) => d.id === id);
      setDriver(found || null);
    }
  }, [params]);

  if (!driver) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-800">
      
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <Link href="/Reviews/drivers" className="inline-flex items-center text-slate-600 hover:text-blue-600 font-bold transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Retour aux chauffeurs
        </Link>
      </div>

      <main className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* === COLONNE GAUCHE (Profil) === */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden">
            <div className="w-32 h-32 mx-auto rounded-full p-1 border-2 border-blue-600 mb-6 relative">
               <div className="w-full h-full rounded-full overflow-hidden relative">
                 <Image src={driver.image} alt={driver.name} fill className="object-cover" />
               </div>
               <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full border-4 border-white">
                 <ShieldCheck size={16} />
               </div>
            </div>
            
            <h1 className="text-2xl font-extrabold text-slate-900 mb-1">{driver.name}</h1>
            <p className="text-slate-500 font-medium mb-6">{driver.experience} d'expérience</p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
               {driver.languages.map((lang: string) => (
                 <span key={lang} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">{lang}</span>
               ))}
            </div>

            <div className="space-y-3">
               <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                 <Phone size={18} /> Afficher le numéro
               </button>
               <button className="w-full py-3 bg-white border-2 border-slate-100 text-slate-700 rounded-xl font-bold hover:border-blue-200 transition flex items-center justify-center gap-2">
                 <MessageCircle size={18} /> Envoyer un message
               </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
             <h3 className="font-bold text-slate-800 mb-4">Informations</h3>
             <ul className="space-y-4 text-sm">
                <li className="flex justify-between border-b border-slate-50 pb-3">
                    <span className="text-slate-500 flex items-center gap-2"><User size={16}/> Âge</span>
                    <span className="font-bold">{driver.age} ans</span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-3">
                    <span className="text-slate-500 flex items-center gap-2"><MapPin size={16}/> Ville</span>
                    <span className="font-bold">{driver.location}</span>
                </li>
                <li className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-2"><CheckCircle size={16}/> Permis</span>
                    <span className="font-bold text-green-600">Vérifié</span>
                </li>
             </ul>
          </div>
        </div>

        {/* === COLONNE DROITE (Détails) === */}
        <div className="lg:col-span-8 space-y-8">
           
           <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <h2 className="text-xl font-bold text-slate-900">Tarif Journalier</h2>
                    <p className="text-slate-400 text-sm">Prestation de service (8h/jour)</p>
                 </div>
                 <div className="text-right">
                    <span className="text-3xl font-black text-blue-600">{driver.price.toLocaleString()}</span>
                    <span className="text-sm font-bold text-slate-400"> CFA</span>
                 </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-blue-800 text-sm leading-relaxed">
                 <p><strong>Note :</strong> Ce tarif n'inclut pas les frais de déplacement hors de la ville de résidence du chauffeur ni son hébergement en cas de voyage.</p>
              </div>
           </div>

           {/* Onglets */}
           <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden min-h-[400px]">
              <div className="flex border-b border-slate-100">
                 <button onClick={() => setActiveTab('infos')} className={`flex-1 py-4 font-bold text-sm ${activeTab === 'infos' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>Biographie</button>
                 <button onClick={() => setActiveTab('avis')} className={`flex-1 py-4 font-bold text-sm ${activeTab === 'avis' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>Avis Clients ({driver.reviewCount})</button>
              </div>
              
              <div className="p-8">
                 {activeTab === 'infos' && (
                    <div className="animate-fadeIn">
                       <h3 className="font-bold text-lg mb-4">À propos de {driver.name}</h3>
                       <p className="text-slate-600 leading-relaxed mb-6">{driver.bio}</p>
                       
                       <h3 className="font-bold text-lg mb-4">Compétences</h3>
                       <div className="grid grid-cols-2 gap-4">
                          {['Conduite défensive', 'Mécanique de base', 'Premiers secours', 'GPS & Navigation'].map((skill, i) => (
                             <div key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                                <div className="w-2 h-2 rounded-full bg-blue-600"></div> {skill}
                             </div>
                          ))}
                       </div>
                    </div>
                 )}

                 {activeTab === 'avis' && (
                    <div className="space-y-6 animate-fadeIn">
                       {driver.reviews.map((review: any) => (
                          <div key={review.id} className="border-b border-slate-50 last:border-0 pb-6 last:pb-0">
                             <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                                      {review.user[0]}
                                   </div>
                                   <div>
                                      <p className="font-bold text-slate-800">{review.user}</p>
                                      <p className="text-xs text-slate-400">{review.date}</p>
                                   </div>
                                </div>
                                <div className="flex text-orange-400">
                                   {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < review.rating ? "fill-current" : "text-slate-200"} />)}
                                </div>
                             </div>
                             <p className="text-slate-600 text-sm italic">"{review.comment}"</p>
                          </div>
                       ))}
                    </div>
                 )}
              </div>
           </div>

        </div>
      </main>
    </div>
  );
}