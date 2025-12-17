"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Check, Car, Heart, Settings, Search, X, Crown, Sparkles, CheckCircle, CreditCard, User, Mail, Phone, Calendar
} from "lucide-react";

// --- DONNÉES DES PLANS ---
const plans = [
  {
    id: "free",
    name: "Liberté",
    desc: "Payez uniquement ce que vous consommez à la location.",
    price: { monthly: 0, yearly: 0 },
    features: [
      "Accès à tout le catalogue",
      "Assurance standard incluse",
      "Annulation gratuite (24h)",
      "Support client 7j/7"
    ],
    notIncluded: [
      "Kilométrage illimité",
      "Priorité de réservation",
      "Chauffeur privé inclus"
    ],
    buttonText: "S'inscrire Gratuitement",
    popular: false,
    theme: "white"
  },
  {
    id: "gold",
    name: "Gold Illimité",
    desc: "La solution idéale pour les déplacements fréquents.",
    price: { monthly: 250000, yearly: 2500000 }, // 10 mois payés pour l'année
    features: [
      "Locations illimitées (Catégorie B)",
      "Kilométrage illimité",
      "Assurance Tout Risque",
      "Support prioritaire",
      "Pas de caution requise"
    ],
    notIncluded: [
      "Chauffeur privé inclus",
      "Véhicules de Luxe (Catégorie A+)"
    ],
    buttonText: "Choisir Gold",
    popular: true,
    theme: "blue"
  },
  {
    id: "platinum",
    name: "Platinum VIP",
    desc: "Le luxe absolu et sans contraintes. Tout est inclus.",
    price: { monthly: 500000, yearly: 5000000 },
    features: [
      "Accès illimité à TOUS les véhicules",
      "Véhicules de Luxe & Sport inclus",
      "Chauffeur privé disponible (4j/mois)",
      "Livraison & Récupération à domicile",
      "Service de conciergerie 24/24",
      "Surclassement garanti si dispo"
    ],
    notIncluded: [],
    buttonText: "Devenir Membre Platinum",
    popular: false,
    theme: "dark"
  }
];

// --- COMPOSANT MODAL D'ABONNEMENT ---
const SubscriptionModal = ({ isOpen, onClose, plan, billing }: any) => {
  const [step, setStep] = useState(1); // 1 = Form, 2 = Success

  if (!isOpen || !plan) return null;

  const price = plan.price[billing];
  const billingLabel = billing === 'monthly' ? 'Mois' : 'An';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi API
    setTimeout(() => setStep(2), 500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-10"
        >
          <X size={20} className="text-slate-600" />
        </button>

        {step === 1 ? (
          <div className="p-8">
            <div className="mb-6 text-center">
              <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg ${plan.id === 'platinum' ? 'bg-slate-900 text-yellow-400' : plan.id === 'gold' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {plan.id === 'platinum' ? <Crown size={32} /> : plan.id === 'gold' ? <Sparkles size={32} /> : <Car size={32} />}
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Abonnement {plan.name}</h2>
              <p className="text-slate-500 text-sm">Vous avez choisi la facturation <strong className="text-slate-700">{billing === 'monthly' ? 'Mensuelle' : 'Annuelle'}</strong>.</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 flex justify-between items-center">
                <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Montant à payer</p>
                    <p className="text-2xl font-black text-slate-900">{price.toLocaleString()} CFA</p>
                </div>
                <div className="text-right">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                        {billing === 'yearly' ? '-20% Appliqué' : 'Sans engagement'}
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="text" placeholder="Nom complet" required className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="email" placeholder="Email professionnel" required className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="tel" placeholder="Numéro de téléphone" required className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 mb-2">Moyen de paiement</label>
                  <div className="grid grid-cols-2 gap-3">
                      <button type="button" className="border border-blue-500 bg-blue-50 text-blue-700 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                          <CreditCard size={16} /> Carte Bancaire
                      </button>
                      <button type="button" className="border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 py-2.5 rounded-xl text-sm font-medium">
                          Mobile Money
                      </button>
                  </div>
              </div>

              <button type="submit" className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all mt-4 transform hover:-translate-y-1 ${plan.id === 'platinum' ? 'bg-slate-900 hover:bg-slate-800' : 'bg-blue-600 hover:bg-blue-700'}`}>
                Confirmer l'abonnement
              </button>
            </form>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Félicitations !</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Vous êtes désormais membre <strong className="text-slate-800">{plan.name}</strong>.<br/>
              Un email de confirmation a été envoyé avec votre contrat.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-8">
                <p className="text-sm text-slate-600">Votre abonnement est actif dès maintenant.</p>
            </div>
            <button onClick={onClose} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg w-full">
              Accéder à mon espace
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function PlansPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<any>(null); // Pour le modal

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Modal Overlay */}
      <SubscriptionModal 
        isOpen={!!selectedPlan} 
        onClose={() => setSelectedPlan(null)} 
        plan={selectedPlan}
        billing={billing}
      />

      {/* NAVBAR */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-6 md:px-12 py-4">
        <div className="flex items-center justify-between max-w-[1440px] mx-auto">
          <Link href="/" className="text-2xl font-bold flex items-center gap-1">
            <div className="bg-blue-600 text-white p-1 rounded-lg"><Car size={24} /></div>
            <span className="text-blue-600">EASY</span><span className="text-orange-500">-RENT</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/CarsPage" className="hover:text-blue-600 transition-colors">Cars</Link>
            <Link href="/Agencies" className="hover:text-blue-600 transition-colors">Agencies</Link>
            <Link href="/Help" className="hover:text-blue-600 transition-colors">Help</Link>
          </nav>
          <div className="flex gap-4 items-center pl-4 border-l border-slate-200 ml-4">
            <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"><Heart size={20} /></button>
            <Link href="/Profil"><button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition text-slate-600"><Settings size={20} /></button></Link>
          </div>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="max-w-[1440px] mx-auto px-6 py-16">
        
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Choisissez votre liberté</h1>
          <p className="text-slate-500 text-lg">
            Optez pour un abonnement et profitez de la location illimitée. Plus de flexibilité, moins de paperasse.
          </p>

          {/* Toggle Mensuel / Annuel */}
          <div className="mt-8 inline-flex bg-white p-1.5 rounded-full relative border border-slate-200 shadow-sm">
            <button 
              onClick={() => setBilling('monthly')}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all relative z-10 ${billing === 'monthly' ? 'text-white' : 'text-slate-600 hover:text-slate-800'}`}
            >
              Mensuel
            </button>
            <button 
              onClick={() => setBilling('yearly')}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all relative z-10 ${billing === 'yearly' ? 'text-white' : 'text-slate-600 hover:text-slate-800'}`}
            >
              Annuel <span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded ml-1 font-extrabold uppercase shadow-sm">-20%</span>
            </button>
            
            <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-slate-900 rounded-full transition-all duration-300 shadow-md ${billing === 'monthly' ? 'left-1.5' : 'left-[calc(50%+3px)]'}`}></div>
          </div>
        </div>

        {/* Grille des Prix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative rounded-[2.5rem] p-8 shadow-xl transition-all duration-300 border flex flex-col h-full
                ${plan.theme === 'dark' ? 'bg-slate-900 text-white border-slate-900 ring-4 ring-slate-900/10' : ''}
                ${plan.theme === 'blue' ? 'bg-blue-600 text-white border-blue-600 ring-4 ring-blue-600/20 scale-105 z-10 shadow-2xl' : ''}
                ${plan.theme === 'white' ? 'bg-white text-slate-800 border-slate-200 hover:-translate-y-2' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg tracking-wider">
                  LE PLUS POPULAIRE
                </div>
              )}

              <div className="mb-6">
                  {plan.id === 'platinum' && <Crown className="text-yellow-400 w-10 h-10 mb-4" />}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={`text-sm opacity-80 ${plan.theme === 'white' ? 'text-slate-500' : 'text-blue-100'}`}>{plan.desc}</p>
              </div>

              <div className="mb-8 pb-8 border-b border-white/10 border-slate-100/10">
                <span className="text-4xl font-extrabold tracking-tight">
                  {plan.price[billing].toLocaleString()}
                </span>
                <span className={`text-sm font-medium ${plan.theme === 'white' ? 'text-slate-400' : 'text-white/60'}`}> CFA / {billing === 'monthly' ? 'mois' : 'an'}</span>
              </div>

              {/* Bouton d'action qui ouvre le Modal */}
              <button 
                onClick={() => setSelectedPlan(plan)}
                className={`w-full py-4 rounded-xl font-bold mb-8 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1
                ${plan.theme === 'white' ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white text-slate-900 hover:bg-slate-50'}
                `}
              >
                {plan.buttonText}
              </button>

              <div className="space-y-4 mt-auto">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-0.5 p-0.5 rounded-full ${plan.theme === 'white' ? 'bg-blue-100 text-blue-600' : 'bg-white/20 text-white'}`}>
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className={`text-sm font-medium ${plan.theme === 'white' ? 'text-slate-600' : 'text-white/90'}`}>{feat}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 opacity-40">
                    <X size={16} />
                    <span className="text-sm">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}