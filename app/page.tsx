"use client";

import OurServices from '@/components/OurService';
import QualityAgencies from "@/components/QualityAgencies";
import FeaturedVehicles from "@/components/FeaturedVehicules";
import StatsSection from '@/components/StatsSection';
import ReviewsPage from '@/components/Testimonials';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* Services */}
      <div className="bg-white border-b border-slate-100 section-compact">
        <div className="container-compact">
          <OurServices />
        </div>
      </div>

      {/* Agences */}
      <div className="section-compact">
        <div className="container-compact">
          <QualityAgencies />
        </div>
      </div>

      {/* Véhicules */}
      <div className="section-compact">
        <div className="container-compact">
          <FeaturedVehicles />
        </div>
      </div>

      {/* Stats */}
      <div className="section-compact px-6">
         <div className="container-compact">
            <StatsSection />
         </div>
      </div>

      {/* Témoignages */}
      <div className="section-compact">
        <div className="container-compact">
          <ReviewsPage />
        </div>
      </div>
    </div>
  );
}