// app/page.tsx
import OurServices from '@/components/OurService';
import QualityAgencies from "@/components/QualityAgencies";
import FeaturedVehicles from "@/components/FeaturedVehicules";
import StatsSection from '@/components/StatsSection';
import ReviewsPage from '@/components/Testimonials';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col gap-24 pb-24">
      {/* Nous n'avons pas besoin de marges en haut car le Hero (Landings) est géré dans layout.tsx */}
      
      {/* Section Services avec fond blanc pour casser la monotonie */}
      <div className="bg-white rounded-b-[3rem] shadow-sm border-b border-slate-100 pb-10">
        <OurServices />
      </div>

      {/* Section Agences */}
      <div className="container mx-auto px-4">
        <QualityAgencies />
      </div>

      {/* Section Véhicules en vedette */}
      <div className="container mx-auto px-4">
        <FeaturedVehicles />
      </div>

      {/* Stats Section (Full width) */}
      <StatsSection />

      {/* Témoignages */}
      <div className="container mx-auto px-4">
        <ReviewsPage />
      </div>
    </div>
  );
}