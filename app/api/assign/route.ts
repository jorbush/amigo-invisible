import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getRandomAssignments } from '@/app/utils/utils';
import { Participant } from '@/app/types/types';

const BATCH_SIZE = 5;
const BATCH_DELAY_MS = 2000;

async function sendBatchEmails(
    transporter: nodemailer.Transporter,
    assignments: { from: Participant; to: Participant }[],
    startIndex: number,
    endIndex: number,
    controller: ReadableStreamDefaultController
) {
    const batch = assignments.slice(startIndex, endIndex);
    for (const assignment of batch) {
        try {
            await transporter.sendMail({
                from: '"Amigo Invisible" <amigoinvisibleservice@gmail.com>',
                to: assignment.from.email,
                subject: '¡Tu Amigo Invisible ha sido asignado!',
                text: `¡Hola, ${assignment.from.name}! Te ha tocado regalar a: ${assignment.to.name}`,
            });
            controller.enqueue(
                `data: ${JSON.stringify({ participantId: assignment.from.id, status: 'sent' })}\n\n`
            );
        } catch (error) {
            console.error(`Error enviando a ${assignment.from.email}:`, error);
            controller.enqueue(
                `data: ${JSON.stringify({ participantId: assignment.from.id, status: 'error' })}\n\n`
            );
        }
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const participants = JSON.parse(searchParams.get('participants') || '[]');
    const supervisor = JSON.parse(searchParams.get('supervisor') || '{}');

    const headers = new Headers({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
    });

    const stream = new ReadableStream({
        async start(controller) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            try {
                const assignments = getRandomAssignments(participants);
                let startIndex = 0;

                while (startIndex < assignments.length) {
                    const endIndex = Math.min(
                        startIndex + BATCH_SIZE,
                        assignments.length
                    );
                    await sendBatchEmails(
                        transporter,
                        assignments,
                        startIndex,
                        endIndex,
                        controller
                    );
                    startIndex += BATCH_SIZE;

                    if (startIndex < assignments.length) {
                        await new Promise((resolve) =>
                            setTimeout(resolve, BATCH_DELAY_MS)
                        );
                    }
                }

                if (supervisor) {
                    const assignmentsTable = `
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <thead>
                        <tr style="background-color: #f3f4f6;">
                            <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">Quien regala</th>
                            <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">Regala a</th>
                        </tr>
                        </thead>
                        <tbody>
                        ${assignments
                            .map(
                                ({
                                    from,
                                    to,
                                }: {
                                    from: Participant;
                                    to: Participant;
                                }) => `
                                <tr>
                                    <td style="padding: 12px; border: 1px solid #e5e7eb;">${from.name} (${from.email})</td>
                                    <td style="padding: 12px; border: 1px solid #e5e7eb;">${to.name} (${to.email})</td>
                                </tr>`
                            )
                            .join('')}
                        </tbody>
                    </table>
                    `;

                    await transporter.sendMail({
                        from: '"Amigo Invisible" <amigoinvisibleservice@gmail.com>',
                        to: supervisor.email,
                        subject: 'Asignaciones del Amigo Invisible',
                        html: `
                        <h2>Hola, ${supervisor.name}</h2>
                        <p>Aquí tienes todas las asignaciones del Amigo Invisible:</p>
                        ${assignmentsTable}
                        <p style="margin-top: 20px;">Por favor, mantén esta información confidencial.</p>
                    `,
                    });

                    controller.enqueue(
                        `data: ${JSON.stringify({ supervisorStatus: 'sent' })}\n\n`
                    );
                }

                controller.enqueue(
                    `data: ${JSON.stringify({ completed: true })}\n\n`
                );
                controller.close();
            } catch (error) {
                console.error('Error:', error);
                controller.enqueue(
                    `data: ${JSON.stringify({ error: 'Error al procesar la solicitud' })}\n\n`
                );
                controller.close();
            }
        },
    });

    return new NextResponse(stream, { headers });
}
