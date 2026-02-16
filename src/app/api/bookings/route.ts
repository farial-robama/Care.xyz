// // import { NextRequest, NextResponse } from 'next/server';
// // import connectDB from '@/lib/mongodb';
// // import Booking from '@/lib/models/Booking';
// // import { sendBookingInvoice } from '@/lib/utils/sendEmail';

// // export async function POST(req: NextRequest) {
// //   try {
// //     const bookingData = await req.json();

// //     await connectDB();

// //     const booking = await Booking.create(bookingData);

// //     // Send invoice email
// //     try {
// //       await sendBookingInvoice(
// //         booking.toObject(),
// //         bookingData.userEmail,
// //         bookingData.userName
// //       );
// //     } catch (emailError) {
// //       console.error('Failed to send invoice email:', emailError);
// //       // Don't fail the booking if email fails
// //     }

// //     return NextResponse.json(
// //       {
// //         message: 'Booking created successfully',
// //         booking: booking.toObject()
// //       },
// //       { status: 201 }
// //     );
// //   } catch (error) {
// //     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
// //     console.error('Booking error:', errorMessage);
// //     return NextResponse.json(
// //       { error: 'Failed to create booking' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export async function GET() {
// //   try {
// //     await connectDB();
// //     const bookings = await Booking.find().sort({ createdAt: -1 });
// //     return NextResponse.json(bookings, { status: 200 });
// //   } catch (error) {
// //     console.error('Fetch bookings error:', error);
// //     return NextResponse.json(
// //       { error: 'Failed to fetch bookings' },
// //       { status: 500 }
// //     );
// //   }
// // }



// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '@/lib/mongodb';
// import Booking from '@/lib/models/Booking';

// export async function GET(
//   req: NextRequest,
//   { params }: { params: Promise<{ userId: string }> }
// ) {
//   try {
//     const resolvedParams = await params;
//     const userId = resolvedParams.userId;
    
//     console.log('🔍 API: Fetching bookings for userId:', userId);
    
//     await connectDB();
//     console.log('✅ API: Database connected');
    
//     // Find bookings
//     const bookings = await Booking.find({ userId: userId }).sort({ createdAt: -1 });
    
//     console.log('📊 API: Found bookings:', bookings.length);
//     console.log('📝 API: Bookings data:', bookings);
    
//     // Also check if there are ANY bookings in the database
//     const allBookings = await Booking.find({});
//     console.log('🗄️ API: Total bookings in database:', allBookings.length);
    
//     if (allBookings.length > 0) {
//       console.log('👥 API: Sample booking userIds:', allBookings.map(b => b.userId));
//     }
    
//     return NextResponse.json(bookings, { status: 200 });
//   } catch (error) {
//     console.error('❌ API: Error fetching user bookings:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch user bookings' },
//       { status: 500 }
//     );
//   }
// }




import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import { sendBookingInvoice } from '@/lib/utils/sendEmail';

export async function POST(req: NextRequest) {
  try {
    const bookingData = await req.json();
    
    console.log('📝 API: Creating booking with data:', bookingData);
    console.log('👤 API: User ID from booking:', bookingData.userId);

    await connectDB();
    console.log('✅ API: Database connected');

    const booking = await Booking.create(bookingData);
    console.log('✅ API: Booking created with ID:', booking._id);
    console.log('👤 API: Booking saved with userId:', booking.userId);

    // Send invoice email
    try {
      await sendBookingInvoice(
        booking.toObject(),
        bookingData.userEmail,
        bookingData.userName
      );
      console.log('📧 API: Invoice email sent');
    } catch (emailError) {
      console.error('❌ API: Failed to send invoice email:', emailError);
      // Don't fail the booking if email fails
    }

    return NextResponse.json(
      {
        message: 'Booking created successfully',
        booking: booking.toObject()
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ API: Booking creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    console.log('📊 API: Fetched all bookings:', bookings.length);
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error('❌ API: Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}