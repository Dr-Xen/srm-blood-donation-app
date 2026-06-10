import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const responses = await prisma.campResponse.findMany({
      include: {
        donor: true,
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
      { error: 'Failed to fetch camp responses.' },
      { status: 500 }
    );
  }
}