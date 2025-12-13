"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { allCars } from "@/modules/carsData";
import { allAgencies } from "@/modules/agenciesData";
import { allDrivers } from "@/modules/driversData"; // Assurez-vous d'avoir ce fichier
import { 
  Star, User, Car, Building2, ShieldCheck, Quote, ArrowLeft, AlertCircle, MapPin
} from "lucide-react";

// --- COMPOSANT CARTE D'ÉLÉMENT (Générique) ---
const ReviewItemCard = ({ data, type }: { data: any, type: 'vehicle' | 'driver' | 'agency' }) => {
  // Adaptation des données selon le type (les champs ne sont pas les mêmes partout)
  const title = type === 'driver' ? data.name : data.name;
  
  // Sous-titre dynamique
  let subtitle = "";
  if (type === 'vehicle') subtitle = data.type;
  else if (type === 'agency') subtitle = data.city;
  else subtitle = `${data.experience} d'expérience`;

  // Image dynamique
  const image = type === 'agency' ? (data.logo || "/assets/agencies.png") : (data.image || "/assets/car2.jpeg");
  
  // Stats avis
  const reviewCount = type === 'vehicle' ? data.reviewsCount : data.reviewCount;
  const rating = data.rating;
  
  // Récupération du dernier avis pour l'aperçu
  const reviews = data.reviews || data.reviewsList || [];
  const lastReview = reviews.length > 0 ? reviews[0] : null;

  // Détermination du lien de destination
  let linkHref = "#";
  let buttonText = "Voir les détails";

  if (type === 'vehicle') {
      linkHref = `/CarsPage/${data.id}`;
  } else if (type === 'agency') {
      linkHref = `/Agencies/${data.id}`;
  } else if (type === 'driver') {
      linkHref = `/Drivers/${data.id}`;
      buttonText = "Voir le profil";
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all group flex flex-col h-full">
      
      {/* En-tête de la carte */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-1 line-clamp-1">{title}</h3>
          <p className="text-sm text-slate-500 mb-2 flex items-center gap-1">
            {type === 'driver' && <ShieldCheck size={14} className="text-green-500" />}
            {type === 'agency' && <MapPin size={14} className="text-blue-500" />}
            {subtitle}
          </p>
          <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg w-fit">
            <Star size={14} className="text-orange-500 fill-orange-500" />
            <span className="text-sm font-bold text-slate-700">{rating}</span>
            <span className="text-xs text-slate-400">({reviewCount} avis)</span>
          </div>
        </div>
      </div>

      {/* Section "Dernier Avis" */}
      <div className="mt-auto bg-slate-50 rounded-2xl p-4 relative mb-6">
        <Quote size={20} className="text-blue-200 absolute top-2 right-2 rotate-180" />
        {lastReview ? (
          <div>
            <p className="text-sm text-slate-600 italic mb-3 line-clamp-3 leading-relaxed">"{lastReview.comment}"</p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden relative">
                 {/* Avatar générique si pas d'image utilisateur */}
                 <Image src={lastReview.avatar || "/assets/default-avatar.jpeg"} alt="User" fill className="object-cover" />
              </div>
              <span className="text-xs font-bold text-slate-700">{lastReview.user}</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic text-center py-2">Aucun commentaire pour le moment.</p>
        )}
      </div>

      {/* Bouton d'action */}
      <Link 
        href={linkHref} 
        className="w-full py-3 rounded-xl border-2 border-slate-100 text-slate-600 font-bold hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all text-center block"
      >
        {buttonText}
      </Link>
    </div>
  );
};

// --- PAGE PRINCIPALE ---
export default function ReviewsCategoryPage() {
  const params = useParams();
  const category = params.category as string; // 'vehicles', 'drivers', 'agencies'

  let contentData: any[] = [];
  let pageTitle = "";
  let pageDesc = "";
  let icon = null;

  // Configuration selon la catégorie
  switch (category) {
    case 'vehicles':
      contentData = allCars;
      pageTitle = "Avis Véhicules";
      pageDesc = "Découvrez les retours d'expérience sur notre flotte.";
      icon = <Car size={32} />;
      break;
    case 'drivers':
      contentData = allDrivers || []; // Sécurité
      pageTitle = "Nos Chauffeurs";
      pageDesc = "Des professionnels notés par la communauté pour votre sécurité.";
      icon = <User size={32} />;
      break;
    case 'agencies':
      contentData = allAgencies;
      pageTitle = "Agences Partenaires";
      pageDesc = "La transparence sur la qualité de service de nos partenaires.";
      icon = <Building2 size={32} />;
      break;
    default:
      // Cas d'erreur (404 visuelle)
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans">
            <AlertCircle size={48} className="text-slate-300 mb-4" />
            <h1 className="text-2xl font-bold text-slate-700">Catégorie introuvable</h1>
            <p className="text-slate-500 mt-2 mb-6">La section "{category}" n'existe pas.</p>
            <Link href="/" className="text-white bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">Retour à l'accueil</Link>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-6 md:px-12 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold transition-colors bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm hover:shadow-md">
                <ArrowLeft size={20} /> Retour
            </Link>
            <h1 className="font-bold text-lg text-slate-700 hidden md:block">Espace Avis & Transparence</h1>
            <div className="w-20"></div> {/* Spacer pour centrer le titre si besoin */}
        </div>
      </header>

      {/* Contenu Principal */}
      <main className="max-w-[1440px] mx-auto px-6 py-12">
        
        {/* Titre de Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fadeIn">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-200 transform -rotate-3">
                {icon}
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{pageTitle}</h1>
            <p className="text-slate-500 text-lg">{pageDesc}</p>
        </div>

        {/* Grille de Résultats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contentData.map((item: any) => (
                <ReviewItemCard 
                    key={item.id} 
                    data={item} 
                    type={category === 'vehicles' ? 'vehicle' : category === 'agencies' ? 'agency' : 'driver'} 
                />
            ))}
        </div>

        {/* Message si vide */}
        {contentData.length === 0 && (
            <div className="text-center py-20">
                <p className="text-slate-400 text-lg">Aucun élément trouvé dans cette catégorie.</p>
            </div>
        )}
      </main>
    </div>
  );
}