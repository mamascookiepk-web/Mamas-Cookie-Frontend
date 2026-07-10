import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileDetailsForm() {
  const { user, profileStatus, profileMutationStatus, profileError, fetchProfile, updateProfile } =
    useAuth();
  const [form, setForm] = useState({ name: '', phone: '', gender: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name ?? '', phone: user.phone ?? '', gender: user.gender ?? '' });
    }
  }, [user]);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaved(false);
    const result = await updateProfile(form);
    if (result.meta.requestStatus === 'fulfilled') {
      setSaved(true);
    }
  };

  if (profileStatus === 'loading' && !user) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-ink-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-extrabold text-ink-900">My Profile</h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink-900">Email</label>
          <input
            disabled
            value={user?.email ?? ''}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-ink-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink-900">Name</label>
          <input
            required
            value={form.name}
            onChange={handleChange('name')}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink-900">Phone</label>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={handleChange('phone')}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink-900">
            Gender <span className="font-normal text-ink-400">(optional)</span>
          </label>
          <select
            value={form.gender}
            onChange={handleChange('gender')}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
          >
            <option value="">Select</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {profileError && <p className="text-sm text-primary-600">{profileError}</p>}
        {saved && <p className="text-sm font-medium text-green-700">Profile updated.</p>}

        <button
          type="submit"
          disabled={profileMutationStatus === 'loading'}
          className="rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
        >
          {profileMutationStatus === 'loading' ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
