import ProfileDetailsForm from './ProfileDetailsForm';
import AddressManager from './AddressManager';

export default function Profile() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-extrabold text-ink-900">My Account</h1>
      <ProfileDetailsForm />
      <AddressManager />
    </div>
  );
}
