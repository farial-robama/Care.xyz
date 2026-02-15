// 'use client';

// import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';
// import { useState } from 'react';
// import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
// import toast from 'react-hot-toast';

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       console.error('Logout error:', error);
//       toast.error('Failed to logout');
//     }
//   };

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <span className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Care.xyz
//             </span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link href="/" className="text-gray-700 hover:text-purple-600 transition">
//               Home
//             </Link>
//             <Link href="/#services" className="text-gray-700 hover:text-purple-600 transition">
//               Services
//             </Link>
            
//             {user ? (
//               <>
//                 <Link href="/my-bookings" className="text-gray-700 hover:text-purple-600 transition">
//                   My Bookings
//                 </Link>
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2">
//                     <FiUser className="text-purple-600" />
//                     <span className="text-sm text-gray-600">{user.email}</span>
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//                   >
//                     <FiLogOut />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Link
//                   href="/login"
//                   className="text-purple-600 hover:text-purple-700 transition"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden text-gray-700"
//           >
//             {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden pb-4">
//             <div className="flex flex-col space-y-4">
//               <Link
//                 href="/"
//                 className="text-gray-700 hover:text-purple-600 transition"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/#services"
//                 className="text-gray-700 hover:text-purple-600 transition"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Services
//               </Link>
              
//               {user ? (
//                 <>
//                   <Link
//                     href="/my-bookings"
//                     className="text-gray-700 hover:text-purple-600 transition"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     My Bookings
//                   </Link>
//                   <div className="text-sm text-gray-600">{user.email}</div>
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setIsMenuOpen(false);
//                     }}
//                     className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-left"
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     href="/login"
//                     className="text-purple-600 hover:text-purple-700 transition"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     href="/register"
//                     className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-center"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Register
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }




'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiUser, FiLogOut, FiHeart, FiPhone, FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <a href="tel:+8801234567890" className="flex items-center space-x-2 hover:text-purple-200 transition">
              <FiPhone size={14} />
              <span>+880 1234-567890</span>
            </a>
            <a href="mailto:support@care.xyz" className="flex items-center space-x-2 hover:text-purple-200 transition">
              <FiMail size={14} />
              <span>support@care.xyz</span>
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <FiHeart size={14} />
            <span>Trusted by 1000+ Families</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🏥</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Care.xyz
                </span>
                <span className="text-xs text-gray-500">Trusted Care Services</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-purple-600 font-medium transition relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="/#services" 
                className="text-gray-700 hover:text-purple-600 font-medium transition relative group"
              >
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="/#about" 
                className="text-gray-700 hover:text-purple-600 font-medium transition relative group"
              >
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="/#how-it-works" 
                className="text-gray-700 hover:text-purple-600 font-medium transition relative group"
              >
                How It Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="/#testimonials" 
                className="text-gray-700 hover:text-purple-600 font-medium transition relative group"
              >
                Testimonials
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              {user ? (
                <>
                  <Link 
                    href="/my-bookings" 
                    className="text-gray-700 hover:text-purple-600 font-medium transition"
                  >
                    My Bookings
                  </Link>
                  <div className="flex items-center space-x-4 pl-4 border-l-2 border-gray-200">
                    <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-lg">
                      <FiUser className="text-purple-600" />
                      <span className="text-sm text-gray-700 font-medium max-w-[150px] truncate">
                        {user.displayName || user.email}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 bg-red-500 text-white px-5 py-2.5 rounded-lg hover:bg-red-600 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4 pl-4 border-l-2 border-gray-200">
                  <Link
                    href="/login"
                    className="text-purple-600 hover:text-purple-700 font-semibold transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-purple-600 transition p-2"
            >
              {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden pb-6 animate-fadeIn">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-purple-600 font-medium transition py-2 px-4 hover:bg-purple-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/#services"
                  className="text-gray-700 hover:text-purple-600 font-medium transition py-2 px-4 hover:bg-purple-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/#about"
                  className="text-gray-700 hover:text-purple-600 font-medium transition py-2 px-4 hover:bg-purple-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/#how-it-works"
                  className="text-gray-700 hover:text-purple-600 font-medium transition py-2 px-4 hover:bg-purple-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="/#testimonials"
                  className="text-gray-700 hover:text-purple-600 font-medium transition py-2 px-4 hover:bg-purple-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </Link>
                
                {user ? (
                  <>
                    <Link
                      href="/my-bookings"
                      className="text-gray-700 hover:text-purple-600 font-medium transition py-2 px-4 hover:bg-purple-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="bg-purple-50 px-4 py-3 rounded-lg mb-3">
                        <div className="flex items-center space-x-2">
                          <FiUser className="text-purple-600" />
                          <span className="text-sm text-gray-700 font-medium">
                            {user.displayName || user.email}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition flex items-center justify-center space-x-2"
                      >
                        <FiLogOut />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <Link
                      href="/login"
                      className="block text-center text-purple-600 hover:text-purple-700 font-semibold transition py-3 px-4 border-2 border-purple-600 rounded-lg hover:bg-purple-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}