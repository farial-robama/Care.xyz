'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import PrivateRoute from '@/components/common/PrivateRoute';
import { useAuth } from '@/context/AuthContext';
import { bangladeshLocations } from '@/lib/utils/locations';
import toast from 'react-hot-toast';

type Service = {
  id: number;
  name: string;
  pricePerHour: number;
  pricePerDay: number;
};

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const [duration, setDuration] = useState(1);
  const [durationType, setDurationType] = useState<'hours' | 'days'>('hours');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Fetch service
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${params.id}`);

        if (!res.ok) {
          toast.error('Service not found');
          router.push('/');
          return;
        }

        const data = await res.json();
        setService(data);
      } catch {
        toast.error('Failed to load service');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) fetchService();
  }, [params?.id, router]);

  // Calculate price
  useEffect(() => {
    if (!service) return;

    const cost =
      durationType === 'hours'
        ? duration * service.pricePerHour
        : duration * service.pricePerDay;

    setTotalCost(cost);
  }, [duration, durationType, service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!division || !district || !city || !area || !address) {
      toast.error('Please fill all location fields');
      return;
    }

    if (!user) {
      toast.error('Login required');
      return;
    }

    setSubmitting(true);

    try {
      const bookingData = {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || 'User',
        serviceId: service?.id,
        serviceName: service?.name,
        duration,
        durationType,
        location: { division, district, city, area, address },
        totalCost,
        status: 'pending',
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Booking failed');
        return;
      }

      toast.success('Booking created successfully!');
      router.push('/my-bookings');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-purple-600 border-t-transparent rounded-full" />
        </div>
      </>
    );
  }

  const districts = division
    ? Object.keys(bangladeshLocations[division]?.districts || {})
    : [];

  const cities =
    district && division
      ? bangladeshLocations[division]?.districts[district] || []
      : [];

  return (
    <PrivateRoute>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">
            Book {service?.name}
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-8 space-y-6"
          >
            {/* Duration */}
            <div>
              <h3 className="text-xl font-bold mb-4">
                Step 1: Duration
              </h3>

              <div className="flex gap-4 mb-4">
                {['hours', 'days'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setDurationType(type as any)}
                    className={`px-4 py-2 rounded ${
                      durationType === type
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <input
                type="number"
                min="1"
                value={duration}
                onChange={(e) =>
                  setDuration(parseInt(e.target.value) || 1)
                }
                className="w-full border p-3 rounded"
              />
            </div>

            {/* Location */}
            <div>
              <h3 className="text-xl font-bold mb-4">
                Step 2: Location
              </h3>

              <select
                value={division}
                onChange={(e) => {
                  setDivision(e.target.value);
                  setDistrict('');
                  setCity('');
                }}
                className="w-full border p-3 rounded mb-3"
              >
                <option value="">Select Division</option>
                {Object.keys(bangladeshLocations).map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>

              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setCity('');
                }}
                disabled={!division}
                className="w-full border p-3 rounded mb-3"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!district}
                className="w-full border p-3 rounded mb-3"
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <input
                placeholder="Area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full border p-3 rounded mb-3"
              />

              <textarea
                placeholder="Full Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border p-3 rounded"
              />
            </div>

            <button
              disabled={submitting}
              className="w-full bg-purple-600 text-white py-3 rounded font-semibold"
            >
              {submitting ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </PrivateRoute>
  );
}
