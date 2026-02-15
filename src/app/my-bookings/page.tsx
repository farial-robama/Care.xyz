'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import PrivateRoute from '@/components/common/PrivateRoute';
import { useAuth } from '@/context/AuthContext';
import { Booking } from '@/types';
import { FiCalendar, FiMapPin, FiDollarSign, FiClock, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function MyBookingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      const response = await fetch(`/api/bookings/user/${user?.uid}`);
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        toast.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user, fetchBookings]);

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setCancellingId(bookingId);

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' }),
      });

      if (response.ok) {
        toast.success('Booking cancelled successfully');
        fetchBookings(); // Refresh bookings
      } else {
        toast.error('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Something went wrong');
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  return (
    <PrivateRoute>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Bookings</h1>
            <p className="text-gray-600">Track and manage your care service bookings</p>
          </div>

          {/* Bookings List */}
          {bookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Bookings Yet</h2>
              <p className="text-gray-600 mb-6">
                You haven&apos;t made any bookings. Start by browsing our services!
              </p>
              <button
                onClick={() => router.push('/#services')}
                className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
              >
                Browse Services
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">
                          {booking.serviceName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Booking ID: {booking._id}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        {/* Duration */}
                        <div className="flex items-start space-x-3">
                          <FiClock className="text-purple-600 mt-1 shrink-0" size={20} />
                          <div>
                            <div className="text-sm text-gray-600">Duration</div>
                            <div className="font-semibold text-gray-800">
                              {booking.duration} {booking.durationType}
                            </div>
                          </div>
                        </div>

                        {/* Cost */}
                        <div className="flex items-start space-x-3">
                          <FiDollarSign className="text-purple-600 mt-1 shrink-0" size={20} />
                          <div>
                            <div className="text-sm text-gray-600">Total Cost</div>
                            <div className="font-semibold text-gray-800 text-xl">
                              ৳{booking.totalCost}
                            </div>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-start space-x-3">
                          <FiCalendar className="text-purple-600 mt-1 shrink-0" size={20} />
                          <div>
                            <div className="text-sm text-gray-600">Booked On</div>
                            <div className="font-semibold text-gray-800">
                              {booking.createdAt
                                ? new Date(booking.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })
                                : 'N/A'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Location */}
                      <div>
                        <div className="flex items-start space-x-3">
                          <FiMapPin className="text-purple-600 mt-1 shrink-0" size={20} />
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-2">Service Location</div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-800 font-medium mb-1">
                                {booking.location.area}, {booking.location.city}
                              </p>
                              <p className="text-gray-600 text-sm mb-1">
                                {booking.location.district}, {booking.location.division}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {booking.location.address}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-6 border-t flex flex-wrap gap-4">
                      <button
                        onClick={() => router.push(`/service/${booking.serviceId}`)}
                        className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition"
                      >
                        View Service
                      </button>

                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleCancelBooking(booking._id!)}
                          disabled={cancellingId === booking._id}
                          className="flex items-center space-x-2 px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiX />
                          <span>
                            {cancellingId === booking._id ? 'Cancelling...' : 'Cancel Booking'}
                          </span>
                        </button>
                      )}

                      {booking.status === 'confirmed' && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <span className="text-2xl">✓</span>
                          <span className="font-semibold">
                            Confirmed! Caretaker will arrive soon.
                          </span>
                        </div>
                      )}

                      {booking.status === 'completed' && (
                        <div className="flex items-center space-x-2 text-blue-600">
                          <span className="text-2xl">🎉</span>
                          <span className="font-semibold">Service completed successfully!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </PrivateRoute>
  );
}