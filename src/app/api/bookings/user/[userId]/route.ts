// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '@/lib/mongodb';
// import Booking from '@/lib/models/Booking';

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { userId: string } }
// ) {
//   try {
//     await connectDB();
//     const bookings = await Booking.find({ userId: params.userId }).sort({ createdAt: -1 });
//     return NextResponse.json(bookings, { status: 200 });
//   } catch (error) {
//     console.error('Fetch user bookings error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch user bookings' },
//       { status: 500 }
//     );
//   }
// }



import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const resolvedParams = await params;
    const userId = resolvedParams.userId;
    
    console.log('🔍 API: Fetching bookings for userId:', userId);
    
    await connectDB();
    console.log('✅ API: Database connected');
    
    // Find bookings with exact match
    const bookings = await Booking.find({ userId: userId }).sort({ createdAt: -1 });
    
    console.log('📊 API: Found bookings:', bookings.length);
    
    // Debug: Check all bookings
    const allBookings = await Booking.find({});
    console.log('🗄️ API: Total bookings in DB:', allBookings.length);
    
    if (allBookings.length > 0) {
      console.log('👥 API: All booking userIds:', allBookings.map(b => ({
        id: b._id,
        userId: b.userId,
        match: b.userId === userId
      })));
    }
    
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error('❌ API: Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user bookings' },
      { status: 500 }
    );
  }
}