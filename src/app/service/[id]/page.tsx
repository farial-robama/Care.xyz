// import { Metadata } from 'next';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';
// import Navbar from '@/components/common/Navbar';
// import Footer from '@/components/common/Footer';
// import { getServiceById } from '@/lib/models/Service';
// import { FiCheckCircle, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';

// interface ServiceDetailPageProps {
//   params: {
//     id: string;
//   };
// }

// export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
//   const service = getServiceById(parseInt(params.id));
  
//   if (!service) {
//     return {
//       title: 'Service Not Found',
//     };
//   }

//   return {
//     title: `${service.name} - Care.xyz`,
//     description: service.description,
//     keywords: `${service.name}, care services, Bangladesh, ${service.category}`,
//   };
// }

// export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
//   const service = getServiceById(parseInt(params.id));

//   if (!service) {
//     notFound();
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-gray-50 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Back Button */}
//           <Link
//             href="/"
//             className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8"
//           >
//             ← Back to Home
//           </Link>

//           <div className="grid md:grid-cols-2 gap-12">
//             {/* Service Image */}
//             <div>
//                 <div className="bg-linear-to-br from-purple-400 to-pink-400 rounded-2xl h-96 flex items-center justify-center shadow-2xl">
//                 <span className="text-9xl">
//                   {service.category === 'baby-care' ? '👶' : service.category === 'elderly-care' ? '👴' : '🏥'}
//                 </span>
//               </div>
//             </div>

//             {/* Service Details */}
//             <div>
//               <h1 className="text-4xl font-bold text-gray-800 mb-4">{service.name}</h1>
//               <p className="text-gray-600 text-lg mb-6">{service.description}</p>

//               {/* Pricing Card */}
//               <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">Pricing</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <FiClock className="text-purple-600" size={24} />
//                       <span className="text-gray-700">Hourly Rate</span>
//                     </div>
//                     <span className="text-2xl font-bold text-purple-600">৳{service.pricePerHour}</span>
//                   </div>
//                   <div className="border-t pt-4 flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <FiDollarSign className="text-purple-600" size={24} />
//                       <span className="text-gray-700">Daily Rate</span>
//                     </div>
//                     <span className="text-2xl font-bold text-purple-600">৳{service.pricePerDay}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Features */}
//               <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">What&apos;s Included</h3>
//                 <ul className="space-y-3">
//                   {service.features.map((feature, index) => (
//                     <li key={index} className="flex items-start space-x-3">
//                       <FiCheckCircle className="text-green-500 mt-1 shrink-0" size={20} />
//                       <span className="text-gray-700">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Coverage */}
//               <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
//                 <div className="flex items-start space-x-3">
//                   <FiMapPin className="text-blue-600 mt-1" size={24} />
//                   <div>
//                     <h4 className="font-semibold text-gray-800 mb-2">Service Coverage</h4>
//                     <p className="text-gray-600 text-sm">
//                       Available across all major cities in Bangladesh including Dhaka, Chattogram, 
//                       Sylhet, Rajshahi, Khulna, Barishal, Rangpur, and Mymensingh divisions.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Book Button */}
//               <Link
//                 href={`/booking/${service.id}`}
//                 className="block w-full bg-linear-to-r from-purple-600 to-pink-600 text-white text-center py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
//               >
//                 Book This Service
//               </Link>
//             </div>
//           </div>

//           {/* How It Works */}
//           <div className="mt-16">
//             <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">How It Works</h2>
//             <div className="grid md:grid-cols-4 gap-8">
//               <div className="text-center">
//                 <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-2xl font-bold text-purple-600">1</span>
//                 </div>
//                 <h3 className="font-semibold text-gray-800 mb-2">Choose Service</h3>
//                 <p className="text-sm text-gray-600">Select the care service you need</p>
//               </div>

//               <div className="text-center">
//                 <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-2xl font-bold text-purple-600">2</span>
//                 </div>
//                 <h3 className="font-semibold text-gray-800 mb-2">Book Online</h3>
//                 <p className="text-sm text-gray-600">Fill in details and confirm booking</p>
//               </div>

//               <div className="text-center">
//                 <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-2xl font-bold text-purple-600">3</span>
//                 </div>
//                 <h3 className="font-semibold text-gray-800 mb-2">Get Confirmed</h3>
//                 <p className="text-sm text-gray-600">Receive confirmation within 24 hours</p>
//               </div>

//               <div className="text-center">
//                 <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-2xl font-bold text-purple-600">4</span>
//                 </div>
//                 <h3 className="font-semibold text-gray-800 mb-2">Enjoy Service</h3>
//                 <p className="text-sm text-gray-600">Professional care at your doorstep</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }



import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { getServiceById } from '@/lib/models/Service';
import { FiCheckCircle, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';

interface ServiceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceById(parseInt(resolvedParams.id));
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.name} - Care.xyz`,
    description: service.description,
    keywords: `${service.name}, care services, Bangladesh, ${service.category}`,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const resolvedParams = await params;
  const service = getServiceById(parseInt(resolvedParams.id));

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8"
          >
            ← Back to Home
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Service Image */}
            <div>
              <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl h-96 flex items-center justify-center shadow-2xl">
                <span className="text-9xl">
                  {service.category === 'baby-care' ? '👶' : service.category === 'elderly-care' ? '👴' : '🏥'}
                </span>
              </div>
            </div>

            {/* Service Details */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{service.name}</h1>
              <p className="text-gray-600 text-lg mb-6">{service.description}</p>

              {/* Pricing Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Pricing</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FiClock className="text-purple-600" size={24} />
                      <span className="text-gray-700">Hourly Rate</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">৳{service.pricePerHour}</span>
                  </div>
                  <div className="border-t pt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FiDollarSign className="text-purple-600" size={24} />
                      <span className="text-gray-700">Daily Rate</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">৳{service.pricePerDay}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">What&apos;s Included</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coverage */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <div className="flex items-start space-x-3">
                  <FiMapPin className="text-blue-600 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Service Coverage</h4>
                    <p className="text-gray-600 text-sm">
                      Available across all major cities in Bangladesh including Dhaka, Chattogram, 
                      Sylhet, Rajshahi, Khulna, Barishal, Rangpur, and Mymensingh divisions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <Link
                href={`/booking/${service.id}`}
                className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
              >
                Book This Service
              </Link>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Choose Service</h3>
                <p className="text-sm text-gray-600">Select the care service you need</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Book Online</h3>
                <p className="text-sm text-gray-600">Fill in details and confirm booking</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Get Confirmed</h3>
                <p className="text-sm text-gray-600">Receive confirmation within 24 hours</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">4</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Enjoy Service</h3>
                <p className="text-sm text-gray-600">Professional care at your doorstep</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}