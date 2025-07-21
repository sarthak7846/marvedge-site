import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json({ success: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
