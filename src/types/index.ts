export interface User {
  _id?: string;
  nidNo: string;
  name: string;
  email: string;
  contact: string;
  password: string;
  role?: 'user' | 'admin';
  createdAt?: Date;
}

export interface Service {
  _id?: string;
  id: number;
  name: string;
  description: string;
  pricePerHour: number;
  pricePerDay: number;
  image: string;
  features: string[];
  category: 'baby-care' | 'elderly-care' | 'sick-care';
}

export interface Location {
  division: string;
  district: string;
  city: string;
  area: string;
  address: string;
}

export interface Booking {
  _id?: string;
  userId: string;
  serviceId: number;
  serviceName: string;
  duration: number;
  durationType: 'hours' | 'days';
  location: Location;
  totalCost: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LocationData {
  [division: string]: {
    districts: {
      [district: string]: string[];
    };
  };
}