import { NextRequest, NextResponse } from 'next/server';
import { getServiceById } from '@/lib/models/Service';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ✅ unwrap promise
    const serviceId = parseInt(id);

    const service = getServiceById(serviceId);

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.error('Service error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}
