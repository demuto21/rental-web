import OurServices from '@/components/OurService';
import QualityAgencies from "@/components/QualityAgencies";
import FeaturedVehicles from "@/components/FeaturedVehicles";
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
      <FeaturedVehicles />
      <WhoAreWe />
      <ReviewsPublics />
      <ReviewCard />
      <StatsCard />
      <Testimonials />
      <StatsSection />
    </>
  );
}