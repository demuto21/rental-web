// components/StatsSection.jsx
"use client";
import Image from 'next/image';
import { TrendingUp, Users, Car, Building2 } from 'lucide-react';

function StatBox({ value, label, icon: Icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Icon size={32} />
        </div>
      </div>
      <p className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-1">{value}</p>
      <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 px-6 rounded-[3rem] mx-4 md:mx-8">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[100px] -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Colonne Gauche */}
          <div className="text-center lg:text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold mb-4 border border-blue-500/30">
              NOS RÉSULTATS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              La performance <br/>
              <span className="text-blue-400">au service de votre mobilité</span>
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-lg mx-auto lg:mx-0">
              Nous connectons des milliers d'utilisateurs aux meilleures agences du pays avec une efficacité record.
            </p>
            
            <div className="relative h-64 w-full max-w-md mx-auto lg:mx-0">
               {/* Assurez-vous d'avoir une image de clé ou de voiture détourée ici */}
               <Image
                src="/assets/key.png" 
                alt="Performance"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Colonne Droite (Stats) */}
          <div className="grid grid-cols-2 gap-6">
            <StatBox value="10k+" label="Véhicules" icon={Car} />
            <StatBox value="150+" label="Agences" icon={Building2} />
            <StatBox value="1M+" label="Utilisateurs" icon={Users} />
            <StatBox value="1k+" label="Chauffeurs" icon={TrendingUp} />
          </div>
        </div>
      </div>
    </section>
  );
}