import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    const donor = await prisma.donor.findFirst({
      where: {
        email,
      },
      include: {
        medicalExam: true,
      },
    });

    if (!donor) {
      return NextResponse.json(
        { error: 'Donor not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(donor);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Failed to fetch donor.' },
      { status: 500 }
    );
  }
}