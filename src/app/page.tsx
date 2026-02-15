import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import ServiceCard from '@/components/cards/ServiceCard';
import { getAllServices } from '@/lib/models/Service';
import { Metadata } from 'next';
import { FiCheck, FiStar, FiShield, FiClock, FiAward, FiUsers, FiArrowRight } from 'react-icons/fi';

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
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white overflow-hidden">
        {/* Animated Background Circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fadeInLeft">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FiStar className="text-yellow-300" />
                <span className="text-sm font-medium">Rated 4.9/5 by 1000+ Families</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Trusted Care Services for Your 
                <span className="block text-yellow-300">Loved Ones</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-purple-100 leading-relaxed">
                Professional babysitting, elderly care, and home care services at your fingertips. 
                Safe, reliable, and accessible across Bangladesh.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#services"
                  className="group bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2"
                >
                  <span>Browse Services</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/register"
                  className="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-8">
                <div className="flex items-center space-x-2">
                  <FiShield className="text-2xl text-yellow-300" />
                  <div>
                    <div className="font-bold">100% Verified</div>
                    <div className="text-sm text-purple-200">Background Checked</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FiClock className="text-2xl text-yellow-300" />
                  <div>
                    <div className="font-bold">24/7 Support</div>
                    <div className="text-sm text-purple-200">Always Available</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FiAward className="text-2xl text-yellow-300" />
                  <div>
                    <div className="font-bold">Best Quality</div>
                    <div className="text-sm text-purple-200">Guaranteed Service</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block animate-fadeInRight">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-3xl transform rotate-6 opacity-20 animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-2xl">
                  <div className="text-9xl text-center mb-6 animate-bounce-slow">🏥</div>
                  <div className="space-y-4 text-center">
                    <div className="flex items-center justify-center space-x-2 text-lg">
                      <FiCheck className="text-green-400" />
                      <span>Instant Booking</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-lg">
                      <FiCheck className="text-green-400" />
                      <span>Transparent Pricing</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-lg">
                      <FiCheck className="text-green-400" />
                      <span>Expert Caregivers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#f9fafb" d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">500+</div>
              <div className="text-gray-600 font-medium">Verified Caretakers</div>
              <FiUsers className="mx-auto mt-2 text-purple-600" size={24} />
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">1000+</div>
              <div className="text-gray-600 font-medium">Happy Families</div>
              <FiStar className="mx-auto mt-2 text-purple-600" size={24} />
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support Available</div>
              <FiClock className="mx-auto mt-2 text-purple-600" size={24} />
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">50+</div>
              <div className="text-gray-600 font-medium">Cities Covered</div>
              <FiShield className="mx-auto mt-2 text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* About/Why Choose Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-gray-800">Why Choose Care.xyz?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make caregiving easy, secure, and accessible for everyone in Bangladesh
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🔒</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Verified Professionals</h3>
              <p className="text-gray-600 leading-relaxed">
                All our caretakers are thoroughly verified with background checks, training certifications, and personal interviews
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <FiCheck className="text-green-500" />
                  <span>Background verified</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <FiCheck className="text-green-500" />
                  <span>Certified professionals</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <FiCheck className="text-green-500" />
                  <span>Experienced caregivers</span>
                </li>
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">💰</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Transparent Pricing</h3>
              <p className="text-gray-600 leading-relaxed">
                Clear, upfront pricing with no hidden fees. Know exactly what you&apos;re paying for before booking
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <FiCheck className="text-green-500" />
                  <span>No hidden charges</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <FiCheck className="text-green-500" />
                  <span>Flexible payment options</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <FiCheck className="text-green-500" />
                  <span>Instant cost calculation</span>
                </li>
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">📱</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Easy Booking</h3>
              <p className="text-gray-600 leading-relaxed">
                Book services in minutes through our simple platform. Track your bookings anytime, anywhere
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <FiCheck className="text-green-500" />
                  <span>Quick 3-step booking</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <FiCheck className="text-green-500" />
                  <span>Real-time tracking</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <FiCheck className="text-green-500" />
                  <span>24/7 customer support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gradient-to-br from-gray-50 to-purple-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-gray-800">Our Services</h2>
            <p className="text-xl text-gray-600">
              Professional care services tailored to your needs
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-gray-800">How It Works</h2>
            <p className="text-xl text-gray-600">
              Get started in 4 simple steps
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 -z-10"></div>

            {[
              { step: "1", title: "Choose Service", desc: "Browse and select the care service you need", icon: "🔍" },
              { step: "2", title: "Book Online", desc: "Fill in details, select duration and location", icon: "📝" },
              { step: "3", title: "Get Confirmed", desc: "Receive confirmation and caretaker details", icon: "✅" },
              { step: "4", title: "Enjoy Service", desc: "Professional care delivered to your doorstep", icon: "🎉" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-4xl">{item.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-br from-purple-600 to-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-gray-800">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real stories from real families</p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Fatima Rahman",
                location: "Dhaka",
                avatar: "👩",
                rating: 5,
                text: "Excellent service! The caretaker was professional, punctual, and took great care of my mother. Highly recommended!"
              },
              {
                name: "Ahmed Hassan",
                location: "Chattogram",
                avatar: "👨",
                rating: 5,
                text: "As a working parent, Care.xyz has been a lifesaver. The babysitter is amazing with kids!"
              },
              {
                name: "Nusrat Jahan",
                location: "Sylhet",
                avatar: "👩‍💼",
                rating: 5,
                text: "Very professional service. The booking process was smooth and the care quality exceeded expectations."
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-5xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
                <div className="text-yellow-400 text-2xl mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed italic">
                  &quot;{testimonial.text}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-gray-800">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Got questions? We&apos;ve got answers</p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How do I book a caretaker?",
                a: "Simply choose a service, select your duration and location, and confirm your booking. You'll receive confirmation within 24 hours."
              },
              {
                q: "Are all caretakers verified?",
                a: "Yes! All our caretakers undergo thorough background checks, certification verification, and personal interviews."
              },
              {
                q: "What areas do you serve?",
                a: "We serve all major cities in Bangladesh including Dhaka, Chattogram, Sylhet, Rajshahi, Khulna, and more."
              },
              {
                q: "Can I cancel my booking?",
                a: "Yes, you can cancel pending bookings from your 'My Bookings' page. Confirmed bookings may require contacting support."
              },
              {
                q: "How is pricing calculated?",
                a: "Pricing is based on service type, duration (hourly or daily), and location. You'll see the total cost before confirming."
              }
            ].map((faq, index) => (
              <details 
                key={index} 
                className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl group"
              >
                <summary className="font-bold text-gray-800 cursor-pointer text-lg flex items-center justify-between">
                  {faq.q}
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-2xl mb-8 text-purple-100">
            Join thousands of families who trust Care.xyz for their caregiving needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="group bg-white text-purple-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2"
            >
              <span>Book a Service Now</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#services"
              className="group border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all shadow-2xl transform hover:-translate-y-1"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}