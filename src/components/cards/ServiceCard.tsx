import Link from 'next/link';
import { Service } from '@/types';
import { FiClock, FiDollarSign, FiArrowRight } from 'react-icons/fi';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image */}
      <div className="h-48 bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center">
        <span className="text-6xl">
          {service.category === 'baby-care' ? '👶' : service.category === 'elderly-care' ? '👴' : '🏥'}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-purple-600">
            <FiDollarSign />
            <span className="font-semibold">৳{service.pricePerHour}/hour</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <FiClock />
            <span className="text-sm">৳{service.pricePerDay}/day</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-4">
          {service.features.slice(0, 3).map((feature: string, index: number) => (
            <li key={index} className="text-sm text-gray-600 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Button */}
        <Link
          href={`/service/${service.id}`}
          className="flex items-center justify-center space-x-2 bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
        >
          <span>View Details</span>
          <FiArrowRight />
        </Link>
      </div>
    </div>
  );
}