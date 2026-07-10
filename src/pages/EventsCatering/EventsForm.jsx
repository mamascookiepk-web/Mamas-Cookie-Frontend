import { useState } from 'react';
import { useCatering } from '@/hooks/useCatering';
import StepIndicator from './StepIndicator';
import ContactStep from './ContactStep';
import EventDetailsStep from './EventDetailsStep';
import ReviewStep from './ReviewStep';
import ThankYou from './ThankYou';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  eventType: '',
  eventDate: '',
  guestCount: '',
  venueAddress: '',
};

export default function EventsForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const { submitCatering, submitStatus, submitError } = useCatering();

  const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    await submitCatering({
      ...formData,
      guestCount: Number(formData.guestCount),
    });
  };

  const submitting = submitStatus === 'loading';
  const submitted = submitStatus === 'succeeded';

  return (
    <section id="events-form" className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="rounded-2xl bg-surface-muted p-6 shadow-lg sm:p-10">
        {submitted ? (
          <ThankYou />
        ) : (
          <>
            <StepIndicator currentStep={step} />

            <div className="mt-8">
              {step === 1 && (
                <ContactStep
                  formData={formData}
                  onChange={handleChange}
                  onNext={() => setStep(2)}
                />
              )}
              {step === 2 && (
                <EventDetailsStep
                  formData={formData}
                  onChange={handleChange}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <ReviewStep
                  formData={formData}
                  onBack={() => setStep(2)}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  error={submitError}
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
