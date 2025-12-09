import React, { useState } from 'react';
import { Search, HelpCircle, BookOpen, MessageCircle, Mail, Phone, FileText, Video, Zap, Shield, Settings, Users } from 'lucide-react';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tout', icon: HelpCircle },
    { id: 'getting-started', name: 'Démarrage', icon: Zap },
    { id: 'account', name: 'Compte', icon: Users },
    { id: 'security', name: 'Sécurité', icon: Shield },
    { id: 'settings', name: 'Paramètres', icon: Settings },
  ];

  const helpTopics = [
    { title: 'Comment créer un compte ?', category: 'getting-started', views: '2.5k' },
    { title: 'Réinitialiser mon mot de passe', category: 'security', views: '1.8k' },
    { title: 'Gérer mes préférences', category: 'settings', views: '1.2k' },
    { title: 'Modifier mes informations', category: 'account', views: '950' },
    { title: 'Activer l\'authentification à deux facteurs', category: 'security', views: '780' },
    { title: 'Supprimer mon compte', category: 'account', views: '620' },
  ];

  const quickActions = [
    { icon: MessageCircle, title: 'Chat en direct', description: 'Discutez avec notre équipe', color: 'from-blue-500 to-cyan-500' },
    { icon: Mail, title: 'Email support', description: 'Envoyez-nous un email', color: 'from-purple-500 to-pink-500' },
    { icon: Phone, title: 'Téléphone', description: 'Appelez notre service', color: 'from-orange-500 to-red-500' },
    { icon: Video, title: 'Tutoriels vidéo', description: 'Regardez nos guides', color: 'from-emerald-500 to-teal-500' },
  ];

  const filteredTopics = activeCategory === 'all' 
    ? helpTopics 
    : helpTopics.filter(topic => topic.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-800">Support</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Accueil</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Guide</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Communauté</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-block mb-4">
          <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white text-sm font-medium shadow-lg">
            Centre d'aide
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
          page help
        </h1>
        
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          Trouvez rapidement les réponses à vos questions et découvrez comment tirer le meilleur parti de nos services
        </p>

        {/* Search Section */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              How can we help you ?
            </h2>
            
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher dans l'aide..."
                className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-slate-700 placeholder-slate-400"
              />
            </div>

            {/* Popular Searches */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {['Connexion', 'Facturation', 'API', 'Sécurité'].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-medium transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white text-slate-600 hover:bg-slate-50 shadow-md hover:shadow-lg'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-slate-200"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{action.title}</h3>
                <p className="text-slate-600 text-sm">{action.description}</p>
              </div>
            );
          })}
        </div>

        {/* Popular Topics */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-blue-500" />
              Sujets populaires
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Voir tout →
            </button>
          </div>

          <div className="space-y-3">
            {filteredTopics.map((topic, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group border border-transparent hover:border-slate-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-slate-500">{topic.views} vues</p>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-blue-600 font-medium">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Notre équipe support est là pour vous aider 24/7
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
              Contacter le support
            </button>
            <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-colors">
              Parcourir la documentation
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-slate-800 mb-4">Ressources</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li><a href="#" className="hover:text-slate-900">Documentation</a></li>
                <li><a href="#" className="hover:text-slate-900">Tutoriels</a></li>
                <li><a href="#" className="hover:text-slate-900">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-4">Support</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li><a href="#" className="hover:text-slate-900">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-slate-900">Communauté</a></li>
                <li><a href="#" className="hover:text-slate-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-4">Entreprise</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li><a href="#" className="hover:text-slate-900">À propos</a></li>
                <li><a href="#" className="hover:text-slate-900">Blog</a></li>
                <li><a href="#" className="hover:text-slate-900">Carrières</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-4">Légal</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li><a href="#" className="hover:text-slate-900">Confidentialité</a></li>
                <li><a href="#" className="hover:text-slate-900">Conditions</a></li>
                <li><a href="#" className="hover:text-slate-900">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-slate-600 text-sm">
            <p>© 2024 Help Center - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpPage;