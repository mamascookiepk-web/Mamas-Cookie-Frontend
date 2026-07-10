import StoryHero from './StoryHero';
import StoryTicker from './StoryTicker';
import StoryTimeline from './StoryTimeline';
import StoryFeaturedVideo from './StoryFeaturedVideo';
import StoryVideoGallery from './StoryVideoGallery';
import StoryValues from './StoryValues';
import StoryClosing from './StoryClosing';

export default function OurStory() {
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
