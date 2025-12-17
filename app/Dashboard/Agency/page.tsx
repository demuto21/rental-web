"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Building2, Plus, LogOut } from "lucide-react";

export default function AgencyDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* En-tête */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <Building2 className="text-orange-500" size={32} />
              Espace Agence
            </h1>
            <p className="text-slate-500 mt-1">
              Bienvenue, <span className="font-bold text-slate-800">{user?.fullName}</span>.
            </p>
          </div>
          <button 
            onClick={logout}
            className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-100 transition"
          >
            <LogOut size={20} className="inline mr-2" />
            Déconnexion
          </button>
        </div>

        {/* Contenu (Statistiques ou Actions) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition cursor-pointer group">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
              <Plus size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Ajouter un véhicule</h3>
            <p className="text-slate-400 text-sm mt-2">Mettez une nouvelle voiture en location.</p>
          </div>
          
          {/* Vous pourrez ajouter d'autres widgets ici (Réservations, Revenus, etc.) */}
        </div>

      </div>
    </div>
  );
}