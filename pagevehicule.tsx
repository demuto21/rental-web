import React, { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Calendar, Users, Settings, Heart, Share2, Star, Fuel, Gauge, Car } from 'lucide-react';

const VehicleListingPage = () => {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    type: [],
    year: [],
    fuel: []
  });

  const vehicles = [
    { id: 1, name: 'Mercedes-Benz C-Class', price: 45000, image: '🚗', rating: 4.8, reviews: 124, type: 'Sedan', fuel: 'Essence', year: 2023, passengers: 5 },
    { id: 2, name: 'BMW 3 Series', price: 48000, image: '🚗', rating: 4.7, reviews: 98, type: 'Sedan', fuel: 'Diesel', year: 2023, passengers: 5 },
    { id: 3, name: 'Audi A4', price: 42000, image: '🚗', rating: 4.9, reviews: 156, type: 'Sedan', fuel: 'Essence', year: 2023, passengers: 5 },
  ];

  const sections = [
    { id: 105, title: 'The cheapest Vehicles' },
    { id: 106, title: 'Our Property vehicle' },
    { id: 107, title: 'Nos véhicules en promotion' },
    { id: 108, title: 'les véhicules les plus utiles' },
    { id: 109, title: 'Résultats de la recherche' },
  ];

  const FilterSidebar = () => (
    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Filter by:</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Reset
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Price Range</label>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="100000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-slate-600">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Brand</label>
        <div className="space-y-2">
          {['Mercedes-Benz', 'BMW', 'Audi', 'Tesla', 'Porsche'].map((brand) => (
            <label key={brand} className="flex items-center space-x-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
              <span className="text-sm text-slate-600 group-hover:text-slate-900">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Type</label>
        <div className="space-y-2">
          {['Sedan', 'SUV', 'Coupe', 'Convertible'].map((type) => (
            <label key={type} className="flex items-center space-x-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
              <span className="text-sm text-slate-600 group-hover:text-slate-900">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Fuel Type</label>
        <div className="space-y-2">
          {['Essence', 'Diesel', 'Electric', 'Hybrid'].map((fuel) => (
            <label key={fuel} className="flex items-center space-x-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
              <span className="text-sm text-slate-600 group-hover:text-slate-900">{fuel}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
          Apply Filters
        </button>
        <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
          Search
        </button>
      </div>
    </div>
  );

  const VehicleCard = ({ vehicle }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-6xl">
          {vehicle.image}
        </div>
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
          <Heart className="w-5 h-5 text-slate-600" />
        </button>
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
          {vehicle.type}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-lg mb-1">{vehicle.name}</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold text-slate-700 ml-1">{vehicle.rating}</span>
              </div>
              <span className="text-sm text-slate-500">({vehicle.reviews} avis)</span>
            </div>
          </div>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors">
            <Share2 className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-y border-slate-100">
          <div className="text-center">
            <Fuel className="w-4 h-4 text-slate-400 mx-auto mb-1" />
            <p className="text-xs text-slate-600">{vehicle.fuel}</p>
          </div>
          <div className="text-center">
            <Calendar className="w-4 h-4 text-slate-400 mx-auto mb-1" />
            <p className="text-xs text-slate-600">{vehicle.year}</p>
          </div>
          <div className="text-center">
            <Users className="w-4 h-4 text-slate-400 mx-auto mb-1" />
            <p className="text-xs text-slate-600">{vehicle.passengers}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">À partir de</p>
            <p className="text-2xl font-bold text-blue-600">${vehicle.price.toLocaleString()}</p>
          </div>
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
            Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">EASY-RENT</h1>
                <p className="text-xs text-slate-500">Rent your Dream Car</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              <a href="#" className="text-blue-600 font-semibold">Home</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Cars</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Agencies</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Help</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            page dédiée aux véhicules
          </h1>
          <p className="text-blue-100 text-lg">
            Découvrez notre collection exclusive de véhicules premium
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Vehicle Sections */}
        {sections.map((section, idx) => (
          <div key={section.id} className="mb-16">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-sm text-slate-400 mb-2">{section.id}</div>
                <h2 className="text-3xl font-bold text-slate-800">{section.title}</h2>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium">
                  Home
                </button>
                <span className="text-slate-300">/</span>
                <button className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium">
                  Cars
                </button>
                <span className="text-slate-300">/</span>
                <button className="px-4 py-2 text-sm text-blue-600 font-medium">
                  Agencies
                </button>
                <button className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium">
                  Help
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filter Sidebar */}
              <div className="lg:col-span-1">
                <FilterSidebar />
              </div>

              {/* Vehicle Grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center space-x-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                    ←
                  </button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                        page === 1
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                    →
                  </button>
                </div>

                {/* View More Button */}
                <div className="text-center mt-12">
                  <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all">
                    View More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <div className="inline-block">
              <h2 className="text-2xl font-bold mb-2">
                <span className="text-blue-600">EASY-</span>
                <span className="text-orange-500">RENT</span>
              </h2>
              <p className="text-slate-600 text-sm">Rent your Dream Car<br />with a Click</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-slate-800 mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li><a href="#" className="hover:text-slate-900">Mention légales</a></li>
                <li><a href="#" className="hover:text-slate-900">CGV</a></li>
                <li><a href="#" className="hover:text-slate-900">Confidentialité</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-4">Services</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li><a href="#" className="hover:text-slate-900">Financement</a></li>
                <li><a href="#" className="hover:text-slate-900">Assurance</a></li>
                <li><a href="#" className="hover:text-slate-900">Garantie</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-4">Contact Us</h3>
              <p className="text-blue-600 text-sm">easyrent@mail.com</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            {['Instagram', 'LinkedIn', 'Facebook', 'Twitter', 'YouTube'].map((social) => (
              <button key={social} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors">
                <span className="text-xs font-bold text-slate-600">{social[0]}</span>
              </button>
            ))}
          </div>

          <div className="text-center text-slate-600 text-sm pt-8 border-t border-slate-200">
            <p>© 2025 Easy-rent. Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VehicleListingPage;