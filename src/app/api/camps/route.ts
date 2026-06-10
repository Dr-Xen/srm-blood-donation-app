import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const camp = await prisma.camp.create({
      data: {
        campName: body.campName,
        campDate: body.campDate,
        campTime: body.campTime,
        venue: body.venue,
        description: body.description,
        maxDonors: Number(body.maxDonors),
      },
    });

    return NextResponse.json(camp, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Failed to create camp' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const camps = await prisma.camp.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(camps);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Failed to fetch camps' },
      { status: 500 }
    );
  }
}