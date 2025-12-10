"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Home, 
  LayoutGrid, 
  Heart, 
  DollarSign, 
  Bell, 
  Settings, 
  LogOut, 
  Search, 
  Edit2,
  ChevronDown,
  Calendar,
  Car,
  Trash2,
  User,
  Mail,
  MapPin
} from "lucide-react";

// --- DONNÉES FACTICES ---

const mockNotifications = [
    { id: 1, title: "Réservation confirmée", content: "Votre réservation pour la Mercedes GLE 450 a été confirmée par l'agence.", date: "Aujourd'hui, 10:30", type: "success" },
    { id: 2, title: "Rappel de paiement", content: "N'oubliez pas de régler le solde de votre location avant le 15 juin.", date: "Hier, 14:00", type: "warning" },
    { id: 3, title: "Nouvelle offre", content: "-20% sur toutes les locations à Kribi ce week-end !", date: "08 Juin, 09:00", type: "info" },
];

const mockTransactions = [
    { id: 1, car: "Toyota RAV4", plate: "CE 123 AA", provider: "Avis", user: "Moi", period: "07 Juin - 10 Juin", status: "Terminé", amount: "150 000 FCFA" },
    { id: 2, car: "Mercedes Classe C", plate: "LT 456 BB", provider: "Hertz", user: "Moi", period: "15 Juin - 17 Juin", status: "En cours", amount: "200 000 FCFA" },
    { id: 3, car: "Hyundai Tucson", plate: "OU 789 CC", provider: "Sixt", user: "Moi", period: "20 Mai - 22 Mai", status: "Annulé", amount: "0 FCFA" },
];

const mockFavorites = [
    { id: 1, name: "Toyota Camry", price: "45 000", image: "/assets/car2.jpeg", rating: 4.8, type: "Berline" },
    { id: 2, name: "Range Rover Evoque", price: "120 000", image: "/assets/car3.jpeg", rating: 5.0, type: "SUV" },
    { id: 3, name: "Audi A4", price: "60 000", image: "/assets/car4.jpeg", rating: 4.6, type: "Berline" },
];

// --- SOUS-COMPOSANTS ---

const InformationView = () => (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-500 w-full relative">
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full cursor-pointer hover:bg-white/30 transition">
                <Edit2 className="text-white w-4 h-4" />
            </div>
        </div>
        
        <div className="px-8 pb-8 relative">
            {/* Avatar & Header */}
            <div className="flex flex-col md:flex-row justify-between items-end -mt-12 mb-10 gap-4">
                <div className="flex items-end gap-6">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100">
                            <Image src="/assets/default-avatar.jpeg" alt="Avatar" width={128} height={128} className="object-cover h-full w-full" />
                        </div>
                        <button className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full border-2 border-white text-white hover:bg-blue-700 transition shadow-sm">
                            <Edit2 size={14} />
                        </button>
                    </div>
                    <div className="mb-3">
                        <h2 className="text-2xl font-bold text-slate-800">Serge Kenfack</h2>
                        <p className="text-slate-500 text-sm">Membre depuis 2023</p>
                    </div>
                </div>
                <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition shadow-lg">
                    Sauvegarder
                </button>
            </div>

            {/* Formulaire */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Informations Personnelles</h3>
                    
                    <div>
                        <label className="block text-slate-600 text-sm font-medium mb-2">Nom Complet</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input type="text" defaultValue="Serge Kenfack" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-slate-600 text-sm font-medium mb-2">Genre</label>
                            <div className="relative">
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                                    <option>Homme</option>
                                    <option>Femme</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-slate-600 text-sm font-medium mb-2">Langue</label>
                            <div className="relative">
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                                    <option>Français</option>
                                    <option>Anglais</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Coordonnées</h3>
                    
                    <div>
                        <label className="block text-slate-600 text-sm font-medium mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input type="email" defaultValue="serge.kenfack@email.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-slate-600 text-sm font-medium mb-2">Adresse</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input type="text" defaultValue="Yaoundé, Cameroun" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const FavoriteView = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Mes Favoris</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFavorites.map((car) => (
                <div key={car.id} className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 group">
                    <div className="relative h-48 bg-slate-100 rounded-2xl overflow-hidden mb-4">
                        <Image src={car.image} alt={car.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 shadow-sm hover:bg-red-50 transition">
                            <Heart className="fill-current w-5 h-5" />
                        </button>
                        <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                            {car.type}
                        </span>
                    </div>
                    
                    <div className="px-2">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-slate-800">{car.name}</h3>
                            <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
                                <span className="text-xs font-bold text-orange-600">{car.rating}</span>
                                <span className="text-orange-400">★</span>
                            </div>
                        </div>
                        
                        <p className="text-slate-500 text-sm mb-4">À partir de <span className="text-blue-600 font-bold text-lg">{car.price} FCFA</span>/jour</p>
                        
                        <button className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg">
                            Louer maintenant
                        </button>
                    </div>
                </div>
            ))}
            
            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-4 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 min-h-[350px] hover:border-blue-300 hover:bg-blue-50/30 transition cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-slate-300" />
                </div>
                <p className="font-medium">Explorer plus de véhicules</p>
            </div>
        </div>
    </div>
);

const NotificationsView = () => (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 min-h-[600px]">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Notifications</h2>
            <button className="text-sm text-blue-600 font-semibold hover:underline">Tout marquer comme lu</button>
        </div>

        <div className="space-y-4">
            {mockNotifications.map((notif) => (
                <div key={notif.id} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 
                        ${notif.type === 'success' ? 'bg-green-100 text-green-600' : ''}
                        ${notif.type === 'warning' ? 'bg-orange-100 text-orange-600' : ''}
                        ${notif.type === 'info' ? 'bg-blue-100 text-blue-600' : ''}
                    `}>
                        <Bell className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{notif.title}</h3>
                            <span className="text-xs text-slate-400 font-medium">{notif.date}</span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{notif.content}</p>
                    </div>
                    <button className="text-slate-300 hover:text-red-500 transition p-2 opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const TransactionsView = ({ type }: { type: 'locations' | 'payments' }) => (
    <div className="space-y-8">
        {type === 'locations' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Locations Actives", value: "1", icon: Car, color: "bg-blue-600" },
                    { label: "Total Dépensé", value: "850k", icon: DollarSign, color: "bg-green-500" },
                    { label: "Total Locations", value: "12", icon: Calendar, color: "bg-orange-500" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <h3 className="font-bold text-xl text-slate-800">
                    {type === 'locations' ? 'Historique des Locations' : 'Historique des Paiements'}
                </h3>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input type="text" placeholder="Rechercher..." className="bg-slate-50 border border-slate-200 pl-10 pr-4 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 w-48" />
                    </div>
                    <button className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
                        <Calendar className="w-4 h-4" /> 2023 <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="py-4 px-6 font-semibold text-slate-600 text-sm">Véhicule</th>
                            <th className="py-4 px-6 font-semibold text-slate-600 text-sm hidden md:table-cell">Agence</th>
                            <th className="py-4 px-6 font-semibold text-slate-600 text-sm">Période</th>
                            <th className="py-4 px-6 font-semibold text-slate-600 text-sm">Statut</th>
                            <th className="py-4 px-6 font-semibold text-slate-600 text-sm text-right">Montant</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {mockTransactions.map((item, i) => (
                            <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image src="/assets/car2.jpeg" width={48} height={48} alt="car" className="object-cover h-full w-full" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">{item.car}</p>
                                            <p className="text-xs text-slate-400 font-mono bg-slate-100 px-1.5 py-0.5 rounded inline-block mt-1">{item.plate}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 hidden md:table-cell">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                            {item.provider[0]}
                                        </div>
                                        <span className="text-slate-600 text-sm font-medium">{item.provider}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <p className="text-slate-700 font-medium text-sm">{item.period}</p>
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold
                                        ${item.status === 'Terminé' ? 'bg-green-100 text-green-700' : ''}
                                        ${item.status === 'En cours' ? 'bg-blue-100 text-blue-700' : ''}
                                        ${item.status === 'Annulé' ? 'bg-red-100 text-red-700' : ''}
                                    `}>
                                        <span className={`w-1.5 h-1.5 rounded-full 
                                            ${item.status === 'Terminé' ? 'bg-green-500' : ''}
                                            ${item.status === 'En cours' ? 'bg-blue-500' : ''}
                                            ${item.status === 'Annulé' ? 'bg-red-500' : ''}
                                        `}></span>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <span className="font-bold text-slate-800">{item.amount}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

// --- COMPOSANT PAGE PRINCIPAL ---

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<"info" | "home" | "favorite" | "transactions" | "notifications">("info");

    const menuItems = [
        { id: "home", label: "Tableau de bord", icon: LayoutGrid },
        { id: "info", label: "Informations", icon: User },
        { id: "favorite", label: "Favoris", icon: Heart },
        { id: "transactions", label: "Transactions", icon: DollarSign },
        { id: "notifications", label: "Notifications", icon: Bell },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "home": return <TransactionsView type="locations" />;
            case "info": return <InformationView />;
            case "favorite": return <FavoriteView />;
            case "transactions": return <TransactionsView type="payments" />;
            case "notifications": return <NotificationsView />;
            default: return <InformationView />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            
            {/* ======================================= */}
            {/* === NAVBAR GLOBALE (AJOUTÉE) === */}
            {/* ======================================= */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-6 md:px-12 py-4">
                <div className="flex items-center justify-between max-w-[1440px] mx-auto">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold flex items-center gap-1">
                        <div className="bg-blue-600 text-white p-1 rounded-lg">
                            <Car size={24} />
                        </div>
                        <span className="text-blue-600">EASY</span>
                        <span className="text-orange-500">-RENT</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <Link href="/CarsPage" className="hover:text-blue-600 transition-colors">Cars</Link>
                        <Link href="/Agencies" className="hover:text-blue-600 transition-colors">Agencies</Link>
                        <Link href="/Help" className="hover:text-blue-600 transition-colors">Help</Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex gap-4 items-center pl-4 border-l border-slate-200 ml-4">
                        <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                            <Heart size={20} />
                        </button>
                        <div className="w-9 h-9 bg-gradient-to-tr from-orange-400 to-orange-600 rounded-full border-2 border-white shadow-sm overflow-hidden">
                            <Image src="/assets/default-avatar.jpeg" alt="User" width={36} height={36} className="object-cover w-full h-full" />
                        </div>
                    </div>
                </div>
            </header>

            {/* ======================================= */}
            {/* === CONTENU PRINCIPAL + SIDEBAR === */}
            {/* ======================================= */}
            <div className="flex flex-1 items-start max-w-[1440px] mx-auto w-full">
                
                {/* --- SIDEBAR FIXE (Sous la Navbar) --- */}
                <aside className="w-full md:w-72 bg-white flex flex-col py-8 border-r border-slate-200 sticky top-20 h-[calc(100vh-80px)] hidden md:flex flex-shrink-0 rounded-br-3xl">
                    <div className="px-6 mb-4">
                        <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Menu Principal</p>
                        <nav className="space-y-1">
                            {menuItems.map((item) => (
                                <button 
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id as any)} 
                                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                                        ${activeTab === item.id 
                                            ? 'bg-blue-50 text-blue-600 shadow-sm' 
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-600' : 'text-slate-400'}`} /> 
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-auto px-6 pt-4 border-t border-slate-100">
                        <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Autres</p>
                        <nav className="space-y-1">
                            <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl text-sm font-medium transition-colors">
                                <Settings className="w-5 h-5 text-slate-400" /> Paramètres
                            </button>
                            <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors">
                                <LogOut className="w-5 h-5" /> Déconnexion
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* --- MOBILE NAV --- */}
                <div className="md:hidden bg-white p-4 flex justify-between items-center sticky top-20 z-40 border-b border-slate-200 w-full">
                    <span className="font-bold text-slate-700">Menu Profil</span>
                    <button className="p-2 bg-slate-100 rounded-lg">
                        <LayoutGrid size={24} className="text-slate-600" />
                    </button>
                </div>

                {/* --- MAIN CONTENT AREA --- */}
                <main className="flex-1 p-6 md:p-10 w-full">
                    {/* Page Header (Breadcrumb style) */}
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Mon Espace</h1>
                            <p className="text-slate-500 mt-1 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Compte actif • Connecté en tant que Serge
                            </p>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input type="text" placeholder="Rechercher dans l'espace..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-100 shadow-sm" />
                            </div>
                            <button className="relative p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-sm">
                                <Bell className="w-5 h-5 text-slate-600" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                        </div>
                    </header>

                    {/* Dynamic Content */}
                    <div className="max-w-6xl mx-auto animate-fadeIn">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
}