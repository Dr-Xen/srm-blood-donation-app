import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const donorId = req.nextUrl.searchParams.get('donorId');

    if (!donorId) {
      return NextResponse.json(
        { error: 'Donor ID is required.' },
        { status: 400 }
      );
    }

    const responses = await prisma.campResponse.findMany({
      where: {
        donorId,
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