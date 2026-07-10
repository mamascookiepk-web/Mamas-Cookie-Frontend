import { useState } from 'react';
import { useLocalOrder } from '@/hooks/useLocalOrder';
import LocationGateModal from '@/components/common/location/LocationGateModal';
import MonthlyDropModal from './MonthlyDropModal';
import LocalHeroCarousel from './LocalHeroCarousel';
import LocalCategorySection from './LocalCategorySection';

export default function Local() {
  const { isSelected } = useLocalOrder();
  const [dropDismissed, setDropDismissed] = useState(false);

  return (
    <div>
      <LocalHeroCarousel />
      <LocalCategorySection />

      {!isSelected && <LocationGateModal />}
      {isSelected && !dropDismissed && (
        <MonthlyDropModal onClose={() => setDropDismissed(true)} />
      )}
    </div>
  );
}
