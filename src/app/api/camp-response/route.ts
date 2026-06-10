import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const existing = await prisma.campResponse.findFirst({
      where: {
        donorId: body.donorId,
        campId: body.campId,
      },
    });

    if (existing) {
      const updated = await prisma.campResponse.update({
        where: {
          id: existing.id,
        },
        data: {
          response: body.response,
        },
      });

      return NextResponse.json(updated);
    }

    const response = await prisma.campResponse.create({
      data: {
        donorId: body.donorId,
        campId: body.campId,
        response: body.response,
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Failed to save response' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const responses = await prisma.campResponse.findMany({
      include: {
        donor: true,
        camp: true,
      },
    });

    return NextResponse.json(responses);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Failed to fetch responses' },
      { status: 500 }
    );
  }
}