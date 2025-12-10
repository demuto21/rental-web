"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Home, 
  LayoutGrid, 
  Heart, 
  DollarSign, 
  Bell, 
  Settings, 
  LogOut, 
  Search, 
  Edit,
  ChevronDown,
  Calendar
} from "lucide-react";

// --- TYPES & DONNÉES FACTICES ---

const mockNotifications = [
    { id: 1, title: "titre du message", content: "fdffzefqf kniozdnons cjsnockos knsjc kqs ckqs kod,co k coq...", date: "Date d'envoi-heure" },
    { id: 2, title: "titre du message", content: "fdffzefqf kniozdnons cjsnockos knsjc kqs ckqs kod,co k coq...", date: "Date d'envoi-heure" },
];

const mockTransactions = [
    { id: 1, car: "Toyota RAV4", plate: "05 IBS 1024", provider: "Avis", user: "Jean Dupont", period: "07/06 - 10/06", status: "Terminé", amount: "250 €" },
    { id: 2, car: "Toyota RAV4", plate: "05 IBS 1024", provider: "Hertz", user: "Jean Dupont", period: "07/06 - 10/06", status: "En cours", amount: "250 €" },
    { id: 3, car: "Toyota RAV4", plate: "05 IBS 1024", provider: "Hertz", user: "Jean Dupont", period: "07/06 - 10/06", status: "Retard", amount: "250 €" },
];

// --- SOUS-COMPOSANTS ---

const InformationView = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden pb-8">
        {/* Bandeau Bleu */}
        <div className="h-24 bg-blue-600 w-full"></div>
        <div className="px-8 relative">
            {/* Avatar & Header */}
            <div className="flex justify-between items-end -mt-10 mb-8">
                <div className="flex items-end gap-4">
                    <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                        <Image src="/assets/default-avatar.jpeg" alt="Avatar" width={96} height={96} className="object-cover h-full w-full" />
                    </div>
                    <div className="mb-2">
                        <h2 className="text-xl font-bold text-gray-800">Alexa Rawles</h2>
                        <p className="text-gray-500 text-sm">alexarawles@gmail.com</p>
                    </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium mb-2 transition">
                    Edit
                </button>
            </div>

            {/* Formulaire */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                    <label className="block text-gray-500 text-sm mb-2">Full Name</label>
                    <input type="text" placeholder="Your First Name" className="w-full bg-gray-50 rounded-lg p-3 text-gray-700 outline-none focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                    <label className="block text-gray-500 text-sm mb-2">Nick Name</label>
                    <input type="text" placeholder="Your First Name" className="w-full bg-gray-50 rounded-lg p-3 text-gray-700 outline-none focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                    <label className="block text-gray-500 text-sm mb-2">Gender</label>
                    <div className="relative">
                        <input type="text" placeholder="Your First Name" className="w-full bg-gray-50 rounded-lg p-3 text-gray-700 outline-none focus:ring-2 focus:ring-blue-100" />
                        <ChevronDown className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-500 text-sm mb-2">Country</label>
                    <div className="relative">
                        <input type="text" placeholder="Your First Name" className="w-full bg-gray-50 rounded-lg p-3 text-gray-700 outline-none focus:ring-2 focus:ring-blue-100" />
                        <ChevronDown className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-500 text-sm mb-2">Language</label>
                    <div className="relative">
                        <input type="text" placeholder="Your First Name" className="w-full bg-gray-50 rounded-lg p-3 text-gray-700 outline-none focus:ring-2 focus:ring-blue-100" />
                        <ChevronDown className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-500 text-sm mb-2">Time Zone</label>
                    <div className="relative">
                        <input type="text" placeholder="Your First Name" className="w-full bg-gray-50 rounded-lg p-3 text-gray-700 outline-none focus:ring-2 focus:ring-blue-100" />
                        <ChevronDown className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <label className="block text-gray-800 font-semibold text-sm mb-4">My email Address</label>
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        @
                    </div>
                    <div>
                        <p className="text-gray-800 text-sm font-medium">alexarawles@gmail.com</p>
                        <p className="text-gray-400 text-xs">1 month ago</p>
                    </div>
                </div>
                <button className="text-blue-500 bg-blue-50 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 transition">
                    +Add Email Address
                </button>
            </div>
        </div>
    </div>
);

const FavoriteView = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden min-h-[600px]">
        <div className="h-16 bg-blue-600 w-full flex justify-center items-center relative">
            {/* Le cercle D au milieu */}
            <div className="absolute -bottom-6 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-white shadow-sm">
                D
            </div>
        </div>

        <div className="p-8 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mock Car Cards */}
            {[1, 2, 3].map((i) => (
                <div key={i} className="border border-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-md">
                    <div className="flex justify-between mb-2">
                        <h3 className="text-blue-700 font-bold">Toyota Caml</h3>
                        <Heart className="fill-red-500 text-red-500 w-5 h-5" />
                    </div>
                    <div className="relative h-24 w-full mb-2 bg-gray-100 rounded-lg">
                        <Image src="/assets/car2.jpeg" alt="Car" fill className="object-contain" />
                        <span className="absolute bottom-0 right-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-tl-lg">detail</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="font-bold text-gray-800">100 000 CFA/jr</p>
                            <div className="flex gap-2 text-xs text-gray-400 mt-1">
                                <span>2 seats</span> <span>2 bags</span>
                            </div>
                        </div>
                    </div>
                    <button className="w-full bg-blue-700 text-white rounded-full py-2 mt-4 text-sm hover:bg-blue-800">book now</button>
                </div>
            ))}
            {/* Empty Placeholders */}
            <div className="border border-gray-100 rounded-3xl p-4 shadow-sm bg-gray-50 min-h-[250px]"></div>
            <div className="border border-gray-100 rounded-3xl p-4 shadow-sm bg-gray-50 min-h-[250px]"></div>
            <div className="border border-gray-100 rounded-3xl p-4 shadow-sm bg-gray-50 min-h-[250px]"></div>
        </div>
    </div>
);

const NotificationsView = () => (
    <div className="bg-white rounded-xl shadow-sm p-8 min-h-[600px]">
        <h2 className="text-xl font-bold mb-6">Notifications</h2>

        <div className="bg-gray-50 rounded-lg px-4 py-2 flex items-center mb-8 max-w-sm">
            <Search className="text-gray-400 w-5 h-5 mr-2" />
            <input type="text" placeholder="Search" className="bg-transparent outline-none w-full text-sm" />
        </div>

        <div className="space-y-6">
            {mockNotifications.map((notif) => (
                <div key={notif.id} className="border-b border-gray-100 pb-6 last:border-0">
                    <h3 className="font-semibold text-lg mb-2">{notif.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{notif.content}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400 font-bold">{notif.date}</span>
                        <button className="bg-[#3B82F6] text-white px-6 py-2 rounded shadow hover:bg-blue-600 text-sm font-medium">
                            DELETE
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const TransactionsView = ({ type }: { type: 'locations' | 'payments' }) => (
    <div className="space-y-6">
        {/* Summary Cards (Only for Locations/Home) */}
        {type === 'locations' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-1">Locations en cours</p>
                    <p className="text-3xl font-bold text-gray-800">12</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-1">Retours prévus ce jour</p>
                    <p className="text-3xl font-bold text-gray-800">4</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-1">Nouveaux clients aujourd'hui</p>
                    <p className="text-3xl font-bold text-gray-800">3</p>
                </div>
            </div>
        )}

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Table Header / Filters */}
            <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <h3 className="font-bold text-lg">{type === 'locations' ? 'Recents Locations' : 'History payements'}</h3>
                <div className="flex gap-3">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2 text-sm text-gray-600">
                        <Search className="w-4 h-4" /> Search...
                    </div>
                    <div className="bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
                        <Calendar className="w-4 h-4" /> 2022 <ChevronDown className="w-4 h-4" />
                    </div>
                    <div className="bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
                        Tous les statut <ChevronDown className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* The Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#3B82F6] text-white">
                            <th className="py-4 px-6 font-medium text-sm rounded-tl-lg">{type === 'locations' ? 'Véhicule' : 'Date'}</th>
                            <th className="py-4 px-6 font-medium text-sm">{type === 'locations' ? 'Fournisseur' : 'Types'}</th>
                            <th className="py-4 px-6 font-medium text-sm">Utilisateur</th>
                            <th className="py-4 px-6 font-medium text-sm">{type === 'locations' ? 'Période' : 'Description'}</th>
                            <th className="py-4 px-6 font-medium text-sm">Statut</th>
                            <th className="py-4 px-6 font-medium text-sm rounded-tr-lg">Montant</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {mockTransactions.map((item, i) => (
                            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="py-4 px-6">
                                    {type === 'locations' ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-8 bg-gray-200 rounded overflow-hidden">
                                                <Image src="/assets/car2.jpeg" width={48} height={32} alt="car" className="object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{item.car}</p>
                                                <p className="text-xs text-gray-400">{item.plate}</p>
                                            </div>
                                        </div>
                                    ) : "07/06/2022"}
                                </td>
                                <td className="py-4 px-6">
                                    {type === 'locations' ? (
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 bg-red-600 text-white text-[10px] flex items-center justify-center font-bold rounded">AV</span>
                                            <span>{item.provider}</span>
                                        </div>
                                    ) : "Location"}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 overflow-hidden">
                                            <Image src="/assets/default-avatar.jpeg" width={24} height={24} alt="u" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.user}</p>
                                            <p className="text-xs text-gray-400">ID: 2708</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    {type === 'locations' ? (
                                        <div>
                                            <p className="font-bold">07/06 - 10/06</p>
                                            <p className="text-xs text-gray-400">3 jours</p>
                                        </div>
                                    ) : "Paiement mensuel"}
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                                    ${item.status === 'Terminé' ? 'bg-green-100 text-green-600' : ''}
                                    ${item.status === 'En cours' ? 'bg-blue-100 text-blue-600' : ''}
                                    ${item.status === 'Retard' ? 'bg-orange-100 text-orange-600' : ''}
                                `}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 font-bold">{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination Dots (Mocked) */}
            <div className="flex justify-center p-6 gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
        </div>
    </div>
);


export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<"home" | "info" | "favorite" | "transactions" | "notifications">("info");

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
        // CHANGEMENT ICI : Flex container pour mettre Sidebar et Main côte à côte
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col md:flex-row">

            {/* --- SIDEBAR --- */}
            {/* CHANGEMENT ICI : Suppression de 'fixed' et ajout de 'sticky top-0 h-screen' */}
            <aside className="w-full md:w-64 bg-white flex flex-col items-center md:items-start py-8 border-r border-gray-100 sticky top-0 h-screen z-10 flex-shrink-0">
                <div className="px-6 mb-12 hidden md:block">
                    <h1 className="text-3xl font-bold tracking-tight">
                        <span className="text-[#2563EB]">EASY</span>
                        <span className="text-[#F76513]">-RENT</span>
                    </h1>
                </div>
                <div className="px-6 mb-12 md:hidden">
                    <Home className="text-orange-500 w-8 h-8" />
                </div>

                <nav className="flex-1 w-full space-y-2 px-4">
                    <button onClick={() => setActiveTab("home")} className={`flex items-center gap-4 w-full p-3 rounded-xl transition-colors ${activeTab === 'home' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50'}`}>
                        <Home className="w-5 h-5" /> <span className="hidden md:inline font-medium">Home</span>
                    </button>
                    <button onClick={() => setActiveTab("info")} className={`flex items-center gap-4 w-full p-3 rounded-xl transition-colors ${activeTab === 'info' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50'}`}>
                        <LayoutGrid className="w-5 h-5" /> <span className="hidden md:inline font-medium">Information</span>
                    </button>
                    <button onClick={() => setActiveTab("favorite")} className={`flex items-center gap-4 w-full p-3 rounded-xl transition-colors ${activeTab === 'favorite' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50'}`}>
                        <Heart className="w-5 h-5" /> <span className="hidden md:inline font-medium">Favorite</span>
                    </button>
                    <button onClick={() => setActiveTab("transactions")} className={`flex items-center gap-4 w-full p-3 rounded-xl transition-colors ${activeTab === 'transactions' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50'}`}>
                        <DollarSign className="w-5 h-5" /> <span className="hidden md:inline font-medium">Transactions</span>
                    </button>
                    <button onClick={() => setActiveTab("notifications")} className={`flex items-center gap-4 w-full p-3 rounded-xl transition-colors ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50'}`}>
                        <Bell className="w-5 h-5" /> <span className="hidden md:inline font-medium">Notifications</span>
                    </button>
                </nav>

                <div className="w-full px-4 space-y-2 mt-auto">
                    <button className="flex items-center gap-4 w-full p-3 text-gray-400 hover:bg-gray-50 rounded-xl">
                        <Settings className="w-5 h-5" /> <span className="hidden md:inline font-medium">Setting</span>
                    </button>
                    <button className="flex items-center gap-4 w-full p-3 text-orange-500 hover:bg-orange-50 rounded-xl">
                        <LogOut className="w-5 h-5" /> <span className="hidden md:inline font-medium">Log out</span>
                    </button>
                </div>
            </aside>

            {/* --- CONTENT AREA (DROITE) --- */}
            {/* CHANGEMENT ICI : Suppression de 'ml-24 md:ml-64' car la sidebar est maintenant dans le flux */}
            <main className="flex-1 p-8 w-full">

                {/* Top Header */}
                <header className="flex justify-between items-start mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Welcome, Amanda</h1>
                        <p className="text-gray-400 text-sm mt-1">Tue, 07 June 2022</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-100 text-sm outline-none focus:border-blue-300 w-64" />
                        </div>
                        <button className="relative">
                            <Bell className="w-5 h-5 text-blue-400" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-50"></span>
                        </button>
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200">
                            <Image src="/assets/default-avatar.jpeg" width={40} height={40} alt="Profile" className="object-cover w-full h-full" />
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="max-w-5xl">
                    {renderContent()}
                </div>

            </main>
        </div>
    );
}