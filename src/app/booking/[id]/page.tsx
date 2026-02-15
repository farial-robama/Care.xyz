'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import PrivateRoute from '@/components/common/PrivateRoute';
import { useAuth } from '@/context/AuthContext';
import { bangladeshLocations } from '@/lib/utils/locations';
import toast from 'react-hot-toast';

interface BookingPageProps {
  params: {
    id: string;
  };
}

export default function BookingPage({ params }: BookingPageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [service, setService] = useState<{ id?: number; name?: string; pricePerHour?: number; pricePerDay?: number } | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [duration, setDuration] = useState<number>(1);
  const [durationType, setDurationType] = useState<'hours' | 'days'>('hours');
  const [division, setDivision] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [totalCost, setTotalCost] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);

  // Fetch service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/services/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setService(data);
        } else {
          toast.error('Service not found');
          router.push('/');
        }
      } catch (error) {
        console.error('Service fetch error:', error);
        toast.error('Failed to load service');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [params.id, router]);

  // Calculate total cost
  useEffect(() => {
    if (service) {
      const cost = durationType === 'hours' 
        ? duration * (service.pricePerHour || 0)
        : duration * (service.pricePerDay || 0);
      setTotalCost(cost);
    }
  }, [duration, durationType, service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!division || !district || !city || !area || !address) {
      toast.error('Please fill in all location fields');
      return;
    }

    if (duration < 1) {
      toast.error('Duration must be at least 1');
      return;
    }

    setSubmitting(true);

    try {
      const bookingData = {
        userId: user?.uid,
        userEmail: user?.email,
        userName: user?.displayName || user?.email?.split('@')[0],
        serviceId: service?.id,
        serviceName: service?.name,
        duration,
        durationType,
        location: {
          division,
          district,
          city,
          area,
          address,
        },
        totalCost,
        status: 'pending',
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        toast.success('Booking created successfully! Check your email for invoice.');
        router.push('/my-bookings');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to create booking');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Booking error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </>
    );
  }

  const districts = division ? Object.keys(bangladeshLocations[division]?.districts || {}) : [];
  const cities = district && division ? bangladeshLocations[division]?.districts[district] || [] : [];

  return (
    <PrivateRoute>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Book {service?.name}</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                {/* Step 1: Duration */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Step 1: Select Duration</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setDurationType('hours')}
                      className={`py-3 px-4 rounded-lg font-semibold transition ${
                        durationType === 'hours'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Hourly
                    </button>
                    <button
                      type="button"
                      onClick={() => setDurationType('days')}
                      className={`py-3 px-4 rounded-lg font-semibold transition ${
                        durationType === 'days'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Daily
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of {durationType}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Step 2: Select Location</h3>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Division */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Division
                      </label>
                      <select
                        value={division}
                        onChange={(e) => {
                          setDivision(e.target.value);
                          setDistrict('');
                          setCity('');
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        required
                      >
                        <option value="">Select Division</option>
                        {Object.keys(bangladeshLocations).map((div) => (
                          <option key={div} value={div}>
                            {div}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* District */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        District
                      </label>
                      <select
                        value={district}
                        onChange={(e) => {
                          setDistrict(e.target.value);
                          setCity('');
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        required
                        disabled={!division}
                      >
                        <option value="">Select District</option>
                        {districts.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        required
                        disabled={!district}
                      >
                        <option value="">Select City</option>
                        {cities.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Area */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Area
                      </label>
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g., Block A"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Address */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Address
                      </label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House no, Road no, etc."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </form>
            </div>

            {/* Summary Card */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h3>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Service</div>
                    <div className="font-semibold text-gray-800">{service?.name}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold text-gray-800">
                      {duration} {durationType}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Rate</div>
                    <div className="font-semibold text-gray-800">
                      ৳{durationType === 'hours' ? service?.pricePerHour : service?.pricePerDay}/{durationType === 'hours' ? 'hour' : 'day'}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">Total Cost</span>
                      <span className="text-2xl font-bold text-purple-600">৳{totalCost}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    💡 Your booking will be confirmed within 24 hours. An invoice will be sent to your email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </PrivateRoute>
  );
}