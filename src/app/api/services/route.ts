import { NextResponse } from 'next/server';
import { getAllServices } from '@/lib/models/Service';

export async function GET() {
  try {
    const services = getAllServices();
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error('Services error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}