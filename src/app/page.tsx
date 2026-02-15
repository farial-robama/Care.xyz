import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import ServiceCard from '@/components/cards/ServiceCard';
import { getAllServices } from '@/lib/models/Service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Care.xyz - Trusted Care Services in Bangladesh',
  description: 'Find reliable babysitters, elderly care, and home care services. Book professional caretakers for your loved ones.',
  keywords: 'babysitting Bangladesh, elderly care Dhaka, home care services, caretaker booking',
};

export default function Home() {
  const services = getAllServices();

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Trusted Care Services for Your Loved Ones
              </h1>
              <p className="text-xl mb-8 text-purple-100">
                Professional babysitting, elderly care, and home care services at your fingertips. 
                Safe, reliable, and accessible.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#services"
                  className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Browse Services
                </Link>
                <Link
                  href="/register"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="text-9xl text-center">🏥</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Verified Caretakers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600">Happy Families</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Care.xyz?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make caregiving easy, secure, and accessible for everyone in Bangladesh
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Verified Professionals</h3>
              <p className="text-gray-600">
                All our caretakers are thoroughly verified with background checks and training certifications
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Transparent Pricing</h3>
              <p className="text-gray-600">
                Clear, upfront pricing with no hidden fees. Know exactly what you&apos;re paying for
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Easy Booking</h3>
              <p className="text-gray-600">
                Book services in minutes through our simple platform. Track your bookings anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">
              Professional care services tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real stories from real families</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
              <p className="text-gray-600 mb-4">
                &quot;Excellent service! The caretaker was professional, punctual, and took great care of my mother. Highly recommended!&quot;
              </p>
              <div className="font-semibold text-gray-800">- Fatima Rahman</div>
              <div className="text-sm text-gray-500">Dhaka</div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
              <p className="text-gray-600 mb-4">
                &quot;As a working parent, Care.xyz has been a lifesaver. The babysitter is amazing with kids!&quot;
              </p>
              <div className="font-semibold text-gray-800">- Ahmed Hassan</div>
              <div className="text-sm text-gray-500">Chattogram</div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
              <p className="text-gray-600 mb-4">
                &quot;Very professional service. The booking process was smooth and the care quality exceeded expectations.&quot;
              </p>
              <div className="font-semibold text-gray-800">- Nusrat Jahan</div>
              <div className="text-sm text-gray-500">Sylhet</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of families who trust Care.xyz for their caregiving needs
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
          >
            Book a Service Now
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}