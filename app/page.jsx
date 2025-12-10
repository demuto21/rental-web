import OurServices from '@/components/OurService';
import QualityAgencies from "@/components/QualityAgencies";
import Featuredvehicules from "@/components/FeaturedVehicules";
import StatsSection from '@/components/StatsSection';
import { ReviewCard } from '@/components/ReviewCard';
import ReviewsPage from '@/components/Testimonials';

export default function HomePage() {
  return (
    <>
      <OurServices />
      <QualityAgencies />
      <Featuredvehicules />
      <ReviewsPage />
      <ReviewCard />
      <StatsSection />
    </>
  );
}