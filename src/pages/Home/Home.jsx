import Hero from './Hero';
import BestSellers from './BestSellers';
import ProcessSteps from './ProcessSteps';
import FeatureCards from './FeatureCards';
import OurStory from './OurStory';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function Home() {
  usePageMeta(
    "Mama's Cookie | Fresh Baked Cookies Delivered in Islamabad",
    'Handmade, freshly baked cookies delivered same-day in Islamabad. Order online from Mama’s Cookie — a family bakery obsessed with quality.'
  );

  return (
    <div>
      <Hero />
      <BestSellers />
      <ProcessSteps />
      <FeatureCards />
      <OurStory />
    </div>
  );
}
