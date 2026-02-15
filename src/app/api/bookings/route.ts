import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import { sendBookingInvoice } from '@/lib/utils/sendEmail';

export async function POST(req: NextRequest) {
  try {
    const bookingData = await req.json();

    await connectDB();

    const booking = await Booking.create(bookingData);

    // Send invoice email
    try {
      await sendBookingInvoice(
        booking.toObject(),
        bookingData.userEmail,
        bookingData.userName
      );
    } catch (emailError) {
      console.error('Failed to send invoice email:', emailError);
      // Don't fail the booking if email fails
    }

    return NextResponse.json(
      {
        message: 'Booking created successfully',
        booking: booking.toObject()
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Booking error:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}