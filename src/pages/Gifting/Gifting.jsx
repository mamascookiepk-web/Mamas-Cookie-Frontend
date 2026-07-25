import GiftingHero from './GiftingHero';
import Testimonials from './Testimonials';
import TestimonialForm from './TestimonialForm';
import InstagramFeed from './InstagramFeed';
import FAQ from './FAQ';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function Gifting() {
  usePageMeta(
    'Corporate Gifting',
    'Premium cookie gift boxes for corporate clients, events, and celebrations. Get in touch with Mama’s Cookie for bulk and custom gifting orders.'
  );

  return (
    <div>
      <GiftingHero />
      <Testimonials />
      <TestimonialForm />
      <InstagramFeed />
      <FAQ />
    </div>
  );
}
