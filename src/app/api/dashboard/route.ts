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

    const camps = await prisma.camp.findMany({
      where: {
        status: 'ACTIVE',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

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

    const respondedCampIds = responses.map(
      (response) => response.campId
    );

    const availableCamps = camps.filter(
      (camp) => !respondedCampIds.includes(camp.id)
    );

    return NextResponse.json({
      donor,
      availableCamps,
      responses,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Failed to load dashboard.' },
      { status: 500 }
    );
  }
}