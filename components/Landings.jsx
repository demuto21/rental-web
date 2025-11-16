import Image from 'next/image';
import Link from 'next/link';
import { Search, Heart, User } from 'lucide-react';
import AnimatedCarImage from './AnimatedCarImages';

const servicesData = [
  {
    title: "Vehicle Reservation",
    description: "With this app, a customer can book a vehicle, all type of vehicle : car, motorcyle, fly.",
    imageUrl: "/service-car.png",
  },
  {
    title: "Booking A Driver",
    description: "With this app, a customer should be able to book a driver with a car when he can not drive it.",
    imageUrl: "/service-driver.png",
  },
  {
    title: "Management of a Vehicle Agency",
    description: "With this app, when you have an agency, you can be our partner by sign in your agency to our platform.",
    imageUrl: "/service-agency.png",
  },
];

export default function Landings() {
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
          <a href="#featured-vehicles" className="text-gray-600 font-medium hover:text-[#0611D7] transition-colors">
            Cars
          </a>
          <a href="#agencies" className="text-gray-600 font-medium hover:text-[#0611D7] transition-colors">
            Agencies
          </a>
          <a href="#footer" className="text-gray-600 font-medium hover:text-[#0611D7] transition-colors">
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
                <AnimatedCarImage/>
              </div>
            </div>
          </div>
        </div>
      </section>

           
    </div>
  );
}