import Hero from './Hero';
import BestSellers from './BestSellers';
import ProcessSteps from './ProcessSteps';
import FeatureCards from './FeatureCards';
import OurStory from './OurStory';

export default function Home() {
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
