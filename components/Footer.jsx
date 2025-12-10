"use client";

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Car, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 font-sans">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* --- PARTIE HAUTE (Grille) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Colonne 1 : Marque & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold flex items-center gap-2 mb-6">
               <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                  <Car size={24} />
               </div>
               <div>
                 <span className="text-blue-600">EASY</span>
                 <span className="text-orange-500">-RENT</span>
               </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              La plateforme de location de véhicules numéro 1 au Cameroun. 
              Nous connectons les agences certifiées aux clients pour une expérience simple, rapide et sécurisée.
            </p>
          </div>

          {/* Colonne 2 : Liens Entreprise */}
          <div>
            <h3 className="font-bold text-slate-800 mb-6 text-lg">Entreprise</h3>
            <ul className="space-y-4 text-slate-600 text-sm font-medium">
              <li><Link href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2">À propos</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2">Carrières</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2">Blog & Actualités</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2">Presse</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Liens Support */}
          <div>
            <h3 className="font-bold text-slate-800 mb-6 text-lg">Support</h3>
            <ul className="space-y-4 text-slate-600 text-sm font-medium">
              <li><Link href="/Help" className="hover:text-blue-600 transition-colors">Centre d'aide</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Conditions générales</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Politique de confidentialité</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Devenir partenaire</Link></li>
            </ul>
          </div>

          {/* Colonne 4 : Réseaux & Newsletter */}
          <div>
            <h3 className="font-bold text-slate-800 mb-6 text-lg">Restez connecté</h3>
            
            {/* Icônes Réseaux */}
            <div className="flex gap-3 mb-8">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Youtube, href: "#" }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <Link 
                    key={i} 
                    href={social.href}
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                  >
                    <Icon size={18} />
                  </Link>
                )
              })}
            </div>

            {/* Newsletter */}
            <div>
                <p className="text-slate-500 text-xs mb-3 font-medium uppercase tracking-wide">Newsletter</p>
                <div className="flex">
                    <input 
                        type="email" 
                        placeholder="Votre email" 
                        className="bg-slate-50 border border-slate-200 rounded-l-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full transition-all"
                    />
                    <button className="bg-blue-600 text-white px-5 py-3 rounded-r-xl text-sm font-bold hover:bg-blue-700 transition shadow-md">
                        OK
                    </button>
                </div>
            </div>
          </div>
        </div>

        {/* --- PARTIE BASSE (Copyright) --- */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p className="font-medium">© 2025 Easy-Rent. Tous droits réservés.</p>
          
          <div className="flex items-center gap-6">
             <Link href="#" className="hover:text-blue-600 transition-colors">Mentions légales</Link>
             <Link href="#" className="hover:text-blue-600 transition-colors">Plan du site</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}