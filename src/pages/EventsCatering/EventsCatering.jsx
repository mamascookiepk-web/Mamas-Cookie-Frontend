import EventsHero from './EventsHero';
import EventsForm from './EventsForm';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function EventsCatering() {
  usePageMeta(
    'Events & Catering',
    'Book Mama’s Cookie for your next event — weddings, corporate functions, and private parties. Custom catering packages available in Islamabad.'
  );

  return (
    <div>
      <EventsHero />
      <EventsForm />
    </div>
  );
}
