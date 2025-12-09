import OurServices from '@/components/OurService';
import QualityAgencies from "@/components/QualityAgencies";
import Featuredvehicules from "@/components/FeaturedVehicules";
import ReviewsPublics from '@/components/ReviewsPublics';
import WhoAreWe from '@/components/WhoAreWe';
import StatsSection from '@/components/StatsSection';
import  {ReviewCard}  from '@/components/ReviewCard';
import  {StatsCard}  from '@/components/StatsCard';
import Testimonials from '@/components/Testimonials';


export default function HomePage() {
  return (
    <>
      <OurServices />
      <QualityAgencies />
      <Featuredvehicules />
      <WhoAreWe />
      <ReviewsPublics />
      <ReviewCard />
      <StatsCard />
      <Testimonials />
      <StatsSection />
    </>
  );
}