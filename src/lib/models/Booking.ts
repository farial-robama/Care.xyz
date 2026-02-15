import mongoose, { Schema, Document } from 'mongoose';
import { Location } from '@/types';

export interface IBooking extends Document {
  userId: string;
  userEmail: string;
  userName: string;
  serviceId: number;
  serviceName: string;
  duration: number;
  durationType: 'hours' | 'days';
  location: Location;
  totalCost: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  serviceId: { type: Number, required: true },
  serviceName: { type: String, required: true },
  duration: { type: Number, required: true },
  durationType: { type: String, enum: ['hours', 'days'], required: true },
  location: {
    division: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    address: { type: String, required: true },
  },
  totalCost: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);