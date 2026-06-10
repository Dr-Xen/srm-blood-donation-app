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

    const donor = await prisma.donor.findUnique({
      where: {
        email,
      },
    });

    if (!donor) {
      return NextResponse.json(
        { error: 'Donor not found.' },
        { status: 404 }
      );
    }

    const responses = await prisma.campResponse.findMany({
      where: {
        donorId: donor.id,
      },
      include: {
        camp: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(responses);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Failed to fetch donor responses.' },
      { status: 500 }
    );
  }
}