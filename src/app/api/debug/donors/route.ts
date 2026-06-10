import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const donors = await prisma.donor.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      createdAt: true,
    },
  });

  return NextResponse.json(donors);
}