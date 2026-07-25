import StoryHero from './StoryHero';
import StoryTicker from './StoryTicker';
import StoryTimeline from './StoryTimeline';
import StoryFeaturedVideo from './StoryFeaturedVideo';
import StoryVideoGallery from './StoryVideoGallery';
import StoryValues from './StoryValues';
import StoryClosing from './StoryClosing';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function OurStory() {
  usePageMeta(
    'Our Story',
    'From a home oven to Islamabad’s favourite cookie brand — discover how Mama’s Cookie started with a mother, her three sons, and one obsession.'
  );

  return (
    <div>
      <StoryHero />
      <StoryTicker />
      <StoryTimeline />
      <StoryFeaturedVideo />
      <StoryVideoGallery />
      <StoryValues />
      <StoryClosing />
    </div>
  );
}
