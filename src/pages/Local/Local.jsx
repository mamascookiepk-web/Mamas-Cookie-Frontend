import { useState } from 'react';
import { useLocalOrder } from '@/hooks/useLocalOrder';
import LocationGateModal from '@/components/common/location/LocationGateModal';
import MonthlyDropModal from './MonthlyDropModal';
import LocalHeroCarousel from './LocalHeroCarousel';
import LocalCategorySection from './LocalCategorySection';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function Local() {
  usePageMeta(
    'Order Cookies Online in Islamabad',
    'Browse our full cookie menu and order for delivery or pickup in Islamabad. Fresh batches baked daily by Mama’s Cookie.'
  );

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
