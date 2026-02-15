import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="text-9xl mb-8">🔍</div>
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
            >
              Go to Homepage
            </Link>
            <Link
              href="/#services"
              className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}