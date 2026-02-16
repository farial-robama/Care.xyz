'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import PrivateRoute from '@/components/common/PrivateRoute';
import { useAuth } from '@/context/AuthContext';
import { Booking } from '@/types';
import { FiCalendar, FiMapPin, FiDollarSign, FiClock, FiX, FiCheck, FiPackage, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function MyBookingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchBookings = useCallback(async () => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`/api/bookings/user/${user.uid}`);
      
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
        setFilteredBookings(data);
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

  // Filter bookings by status
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(b => b.status === statusFilter));
    }
  }, [statusFilter, bookings]);

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
        fetchBookings();
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
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'confirmed':
        return '✓';
      case 'completed':
        return '🎉';
      case 'cancelled':
        return '✕';
      default:
        return '📋';
    }
  };

  const getBookingStats = () => {
    return {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
    };
  };

  const stats = getBookingStats();

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading your bookings...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <PrivateRoute>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  My Bookings
                </h1>
                <p className="text-gray-600 text-lg">Track and manage your care service bookings</p>
              </div>
              <div className="hidden md:block">
                <div className="text-6xl animate-bounce-slow">📋</div>
              </div>
            </div>

            {/* Stats Cards */}
            {bookings.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div 
                  onClick={() => setStatusFilter('all')}
                  className={`cursor-pointer p-4 rounded-xl transition-all transform hover:scale-105 ${
                    statusFilter === 'all' 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg' 
                      : 'bg-white hover:shadow-lg'
                  }`}
                >
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <div className={`text-sm ${statusFilter === 'all' ? 'text-purple-100' : 'text-gray-600'}`}>
                    Total Bookings
                  </div>
                </div>
                
                <div 
                  onClick={() => setStatusFilter('pending')}
                  className={`cursor-pointer p-4 rounded-xl transition-all transform hover:scale-105 ${
                    statusFilter === 'pending' 
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-lg' 
                      : 'bg-white hover:shadow-lg'
                  }`}
                >
                  <div className="text-2xl font-bold">{stats.pending}</div>
                  <div className={`text-sm ${statusFilter === 'pending' ? 'text-yellow-100' : 'text-gray-600'}`}>
                    Pending
                  </div>
                </div>

                <div 
                  onClick={() => setStatusFilter('confirmed')}
                  className={`cursor-pointer p-4 rounded-xl transition-all transform hover:scale-105 ${
                    statusFilter === 'confirmed' 
                      ? 'bg-gradient-to-br from-blue-400 to-cyan-400 text-white shadow-lg' 
                      : 'bg-white hover:shadow-lg'
                  }`}
                >
                  <div className="text-2xl font-bold">{stats.confirmed}</div>
                  <div className={`text-sm ${statusFilter === 'confirmed' ? 'text-blue-100' : 'text-gray-600'}`}>
                    Confirmed
                  </div>
                </div>

                <div 
                  onClick={() => setStatusFilter('completed')}
                  className={`cursor-pointer p-4 rounded-xl transition-all transform hover:scale-105 ${
                    statusFilter === 'completed' 
                      ? 'bg-gradient-to-br from-green-400 to-emerald-400 text-white shadow-lg' 
                      : 'bg-white hover:shadow-lg'
                  }`}
                >
                  <div className="text-2xl font-bold">{stats.completed}</div>
                  <div className={`text-sm ${statusFilter === 'completed' ? 'text-green-100' : 'text-gray-600'}`}>
                    Completed
                  </div>
                </div>

                <div 
                  onClick={() => setStatusFilter('cancelled')}
                  className={`cursor-pointer p-4 rounded-xl transition-all transform hover:scale-105 ${
                    statusFilter === 'cancelled' 
                      ? 'bg-gradient-to-br from-red-400 to-pink-400 text-white shadow-lg' 
                      : 'bg-white hover:shadow-lg'
                  }`}
                >
                  <div className="text-2xl font-bold">{stats.cancelled}</div>
                  <div className={`text-sm ${statusFilter === 'cancelled' ? 'text-red-100' : 'text-gray-600'}`}>
                    Cancelled
                  </div>
                </div>
              </div>
            )}

            {/* Filter Info */}
            {statusFilter !== 'all' && filteredBookings.length > 0 && (
              <div className="bg-white border-l-4 border-purple-500 p-4 rounded-lg shadow-md mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FiFilter className="text-purple-600" size={20} />
                  <span className="text-gray-700">
                    Showing <strong>{filteredBookings.length}</strong> {statusFilter} booking{filteredBookings.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <button
                  onClick={() => setStatusFilter('all')}
                  className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-8xl mb-6 animate-bounce-slow">
                {statusFilter === 'all' ? '📋' : '🔍'}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                {statusFilter === 'all' ? 'No Bookings Yet' : `No ${statusFilter} bookings`}
              </h2>
              <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                {statusFilter === 'all' 
                  ? "You haven't made any bookings. Start by browsing our services!" 
                  : `You don't have any ${statusFilter} bookings at the moment.`}
              </p>
              {statusFilter === 'all' ? (
                <button
                  onClick={() => router.push('/#services')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Browse Services
                </button>
              ) : (
                <button
                  onClick={() => setStatusFilter('all')}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg"
                >
                  View All Bookings
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking, index) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Status Bar */}
                  <div className={`h-2 ${
                    booking.status === 'pending' ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                    booking.status === 'confirmed' ? 'bg-gradient-to-r from-blue-400 to-cyan-400' :
                    booking.status === 'completed' ? 'bg-gradient-to-r from-green-400 to-emerald-400' :
                    'bg-gradient-to-r from-red-400 to-pink-400'
                  }`}></div>

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="text-5xl">
                          {booking.serviceName.includes('Baby') ? '👶' : 
                           booking.serviceName.includes('Elderly') ? '👴' : '🏥'}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-1">
                            {booking.serviceName}
                          </h3>
                          <p className="text-sm text-gray-500 font-mono">
                            ID: {booking._id?.slice(-8)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span
                          className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          <span className="text-xl">{getStatusIcon(booking.status)}</span>
                          <span>{booking.status.toUpperCase()}</span>
                        </span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl">
                          <FiClock className="text-purple-600 mt-1 flex-shrink-0" size={24} />
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 font-medium mb-1">Duration</div>
                            <div className="text-lg font-bold text-gray-800">
                              {booking.duration} {booking.durationType}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl">
                          <FiDollarSign className="text-green-600 mt-1 flex-shrink-0" size={24} />
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 font-medium mb-1">Total Cost</div>
                            <div className="text-2xl font-bold text-green-600">
                              ৳{booking.totalCost.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                          <FiCalendar className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 font-medium mb-1">Booked On</div>
                            <div className="font-semibold text-gray-800">
                              {booking.createdAt
                                ? new Date(booking.createdAt).toLocaleDateString('en-US', {
                                    weekday: 'short',
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
                        <div className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl h-full">
                          <div className="flex items-start space-x-3">
                            <FiMapPin className="text-pink-600 mt-1 flex-shrink-0" size={24} />
                            <div className="flex-1">
                              <div className="text-sm text-gray-600 font-medium mb-3">Service Location</div>
                              <div className="space-y-2">
                                <p className="text-gray-800 font-bold text-lg">
                                  {booking.location.area}
                                </p>
                                <p className="text-gray-700">
                                  {booking.location.city}
                                </p>
                                <p className="text-gray-600 text-sm">
                                  {booking.location.district}, {booking.location.division}
                                </p>
                                <div className="pt-2 border-t border-pink-200">
                                  <p className="text-gray-600 text-sm">
                                    📍 {booking.location.address}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => router.push(`/service/${booking.serviceId}`)}
                        className="flex items-center space-x-2 px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all transform hover:scale-105"
                      >
                        <FiPackage />
                        <span>View Service</span>
                      </button>

                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleCancelBooking(booking._id!)}
                          disabled={cancellingId === booking._id}
                          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
                        >
                          <FiX />
                          <span>
                            {cancellingId === booking._id ? 'Cancelling...' : 'Cancel Booking'}
                          </span>
                        </button>
                      )}

                      {booking.status === 'confirmed' && (
                        <div className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-300">
                          <span className="text-3xl">✓</span>
                          <div>
                            <div className="font-bold text-green-700">Confirmed!</div>
                            <div className="text-sm text-green-600">Caretaker assigned</div>
                          </div>
                        </div>
                      )}

                      {booking.status === 'completed' && (
                        <div className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl border-2 border-blue-300">
                          <span className="text-3xl">🎉</span>
                          <div>
                            <div className="font-bold text-blue-700">Completed!</div>
                            <div className="text-sm text-blue-600">Service finished</div>
                          </div>
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