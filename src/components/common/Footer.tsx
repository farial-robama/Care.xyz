import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Care.xyz
            </h3>
            <p className="text-gray-400 text-sm">
              Providing reliable and trusted care services for your loved ones. Making caregiving easy, secure, and accessible for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-400 hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="text-gray-400 hover:text-white transition">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/service/1" className="text-gray-400 hover:text-white transition">
                  Baby Care
                </Link>
              </li>
              <li>
                <Link href="/service/2" className="text-gray-400 hover:text-white transition">
                  Elderly Service
                </Link>
              </li>
              <li>
                <Link href="/service/3" className="text-gray-400 hover:text-white transition">
                  Sick People Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <FiMail className="text-purple-400" />
                <span className="text-sm">support@care.xyz</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <FiPhone className="text-purple-400" />
                <span className="text-sm">+880 1XXX-XXXXXX</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <FiMapPin className="text-purple-400" />
                <span className="text-sm">Dhaka, Bangladesh</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Care.xyz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}