import { Service } from '@/types';

export const services: Service[] = [
  {
    id: 1,
    name: 'Baby Care',
    description: 'Professional babysitting and child care services for your little ones. Our trained caregivers ensure safety, engagement, and proper care.',
    pricePerHour: 150,
    pricePerDay: 2500,
    image: '/images/baby-care.jpg',
    features: [
      'Trained and verified caregivers',
      '24/7 availability',
      'Emergency support',
      'Activity planning',
      'Meal preparation',
      'Safe environment'
    ],
    category: 'baby-care'
  },
  {
    id: 2,
    name: 'Elderly Service',
    description: 'Compassionate and professional care for elderly family members. We provide companionship, assistance, and medical support.',
    pricePerHour: 180,
    pricePerDay: 3000,
    image: '/images/elderly-care.jpg',
    features: [
      'Medical assistance',
      'Companionship',
      'Daily activities support',
      'Medication management',
      'Mobility assistance',
      'Emotional support'
    ],
    category: 'elderly-care'
  },
  {
    id: 3,
    name: 'Sick People Service',
    description: 'Specialized care for sick or recovering patients at home. Professional nursing support for faster recovery.',
    pricePerHour: 200,
    pricePerDay: 3500,
    image: '/images/sick-care.jpg',
    features: [
      'Nursing support',
      'Medication management',
      'Recovery monitoring',
      'Physiotherapy assistance',
      'Doctor coordination',
      'Health reporting'
    ],
    category: 'sick-care'
  }
];

export const getServiceById = (id: number): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getAllServices = (): Service[] => {
  return services;
};