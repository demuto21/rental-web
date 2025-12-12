"use client";

import OurServices from '@/components/OurService';
import QualityAgencies from "@/components/QualityAgencies";
import FeaturedVehicles from "@/components/FeaturedVehicules";
import StatsSection from '@/components/StatsSection';
import ReviewsPage from '@/components/Testimonials';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col gap-0">
      
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <OurServices />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        <QualityAgencies />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        <FeaturedVehicles />
      </div>

      <div className="w-full px-4 md:px-8 py-12">
         <StatsSection />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full pb-24">
        <ReviewsPage />
      </div>
    </div>
  );
}