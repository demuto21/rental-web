import Image from 'next/image';
import { Search, Heart, User } from 'lucide-react';

const servicesData = [
  {
    title: "Vehicle Reservation",
    description: "With this app, a customer can book a vehicle, all type of vehicle : car, motorcyle, fly.",
    imageUrl: "/vehicule1.png",
  },
  {
    title: "Booking A Driver",
    description: "With this app, a customer should be able to book a driver with a car when he can not drive it.",
    imageUrl: "/driver.png",
  },
  {
    title: "Management of a Vehicle Agency",
    description: "With this app, when you have an agency, you can be our partner by sign in your agency to our platform.",
    imageUrl: "/agencies.png",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white px-8 py-5 flex items-center justify-between shadow-sm">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-[#2563EB]">EASY</span>
            <span className="text-[#F76513]">-RENT</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg mx-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search here"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-10">
          <a href="#" className="text-[#2563EB] font-semibold hover:text-[#0611D7] transition-colors">
            Home
          </a>
          <a href="#" className="text-gray-600 font-medium hover:text-[#0611D7] transition-colors">
            Cars
          </a>
          <a href="#" className="text-gray-600 font-medium hover:text-[#0611D7] transition-colors">
            Agencies
          </a>
          <a href="#" className="text-gray-600 font-medium hover:text-[#0611D7] transition-colors">
            Help
          </a>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-3 ml-10">
          <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors">
            <User className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[#2563EB] px-8 py-20 overflow-hidden min-h-[600px]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-6xl font-bold text-white leading-tight tracking-tight">
                Rent your dream car
                <br />
                in a click.
              </h2>
              <p className="text-blue-100 text-xl leading-relaxed font-light">
                You can rent all type of vehicle and for many
                <br />
                occasion. And in many agencies.
              </p>
              <div className="pt-4">
                <button className="bg-[#F76513] hover:bg-[#e55a0f] text-white font-semibold px-10 py-4 rounded-xl transition-all shadow-lg hover:shadow-orange-500/50 hover:scale-105 transform">
                  Join Us Now
                </button>
              </div>
            </div>

            {/* Right Content - Car Image */}
            <div className="relative">
              <div className="relative z-20 transform transition-transform duration-500">
                <Image 
                  src="/image.png"
                  alt="White Toyota Camry" 
                  width={900} 
                  height={500}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================= */}
      {/* =       SECTION SERVICES              = */}
      {/* ======================================= */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          
          {/* Titre de la section */}
          <h2 className="text-4xl font-bold text-center text-[#2563EB] mb-16">
            Our services
          </h2>

          {/* Liste des services avec alternance */}
          <div className="space-y-16">
            
            {servicesData.map((service, index) => (
              <div 
                key={service.title} 
                className={`flex items-center gap-12 ${
                  index % 2 === 1 ? 'flex-row-reverse' : ''
                }`}
              >
                
                {/* --- Image avec cadre bleu --- */}
                <div className="relative flex-shrink-0">
                  <div className="rounded-[2rem] border-[6px] border-[#2563EB] overflow-hidden shadow-lg w-[320px] h-[220px]">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      width={320}
                      height={220}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Bouton View More */}
                  <button 
                    className="absolute -bottom-3 right-6 z-10 bg-[#F76513] hover:bg-[#e55a0f] text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-lg hover:scale-105 transform"
                  >
                    View More
                  </button>
                </div>

                {/* --- Texte --- */}
                <div className="flex-1 space-y-3">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ======================================= */}
      {/* =       SECTION WHY CHOOSE US         = */}
      {/* ======================================= */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          
          {/* Titre de la section */}
          <h2 className="text-5xl font-bold text-center text-[#2563EB] mb-6">
            Why Choose Us ?
          </h2>
          <p className="text-center text-gray-700 text-lg mb-20 max-w-4xl mx-auto">
            We present many guarantees and advantages when you rent a car with us for your trip. Here are some of the advantages that you will get
          </p>

          {/* Grille des avantages */}
          <div className="grid grid-cols-3 gap-x-20 gap-y-16">
            
            {/* Avantage 1: Easy Rent */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-[#F76513] rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#2563EB] mb-3">Easy Rent</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Rent a car at our rental with an easy and fast process without disturbing your productivity
                </p>
              </div>
            </div>

            {/* Avantage 2: Premium Quality */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-[#F76513] rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#2563EB] mb-3">Premium Quality</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Our cars are always maintained engine health and cleanliness to provide a more comfortable driving experience
                </p>
              </div>
            </div>

            {/* Avantage 3: Professional Agent */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-[#F76513] rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#2563EB] mb-3">Professional Agent</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  You can ask your travel companion to escort and guide your journey.
                </p>
              </div>
            </div>

            {/* Avantage 4: Car Safety */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-[#F76513] rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#2563EB] mb-3">Car Safety</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  We guarantee the safety of the engine on the car always running well with regular checks on the car engine.
                </p>
              </div>
            </div>

            {/* Avantage 5: Refund */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-[#F76513] rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#2563EB] mb-3">Refund</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Our service guarantee provides a money back opportunity if the car does not match the information provided.
                </p>
              </div>
            </div>

            {/* Avantage 6: Live Monitoring */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-[#F76513] rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 3H4c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h4v2h8v-2h4c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 14H4V5h16v12z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#2563EB] mb-3">Live Monitoring</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Our service provides direct customer monitoring to monitor trips in terms of safety and comfort.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
}