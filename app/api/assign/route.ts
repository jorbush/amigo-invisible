import { NextResponse } from 'next/server';
import { Participant } from '@/app/types/types';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { participants } = await request.json();
    const shuffled = [...participants];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const assignments = participants.map(
      (participant: Participant, index: number) => ({
        from: participant,
        to: shuffled[(index + 1) % shuffled.length],
      })
    );
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    for (const assignment of assignments) {
      await transporter.sendMail({
        from: '"Amigo Invisible" <amigoinvisibleservice@gmail.com>',
        to: assignment.from.email,
        subject: '¡Tu Amigo Invisible ha sido asignado!',
        text: `¡Hola ${assignment.from.name}!\nTe ha tocado regalar a: ${assignment.to.name}\n¡Que te diviertas eligiendo el regalo!`,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
