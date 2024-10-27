'use client';
import { useState } from 'react';
import { FaCheck, FaSpinner } from 'react-icons/fa';
import { Participant, Supervisor } from '../types/types';
import { MdDelete } from 'react-icons/md';
import { Info } from './Info';

export const ParticipantsTable = () => {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [supervisor, setSupervisor] = useState<Supervisor | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [supervisorName, setSupervisorName] = useState('');
    const [supervisorEmail, setSupervisorEmail] = useState('');
    const [error, setError] = useState('');
    const [showSupervisor, setShowSupervisor] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const addParticipant = () => {
        if (!name || !email) {
            setError('Nombre y email son requeridos');
            return;
        }

        if (!emailRegex.test(email)) {
            setError('Email inválido');
            return;
        }

        if (participants.length >= 35) {
            setError('Máximo 35 participantes');
            return;
        }

        if (participants.some((p) => p.name === name)) {
            setError('El nombre ya está en uso');
            return;
        }

        if (participants.some((p) => p.email === email)) {
            setError('El email ya está en uso');
            return;
        }

        setParticipants([
            ...participants,
            {
                id: crypto.randomUUID(),
                name,
                email,
                status: 'idle',
            },
        ]);
        setName('');
        setEmail('');
        setError('');
    };

    const addSupervisor = () => {
        if (!supervisorName || !supervisorEmail) {
            setError('Nombre y email del supervisor son requeridos');
            return;
        }

        if (!emailRegex.test(supervisorEmail)) {
            setError('Email del supervisor inválido');
            return;
        }

        setSupervisor({
            name: supervisorName,
            email: supervisorEmail,
        });
        setSupervisorName('');
        setSupervisorEmail('');
        setError('');
    };

    const assignParticipants = async () => {
        if (participants.length < 3) {
            setError('Mínimo 3 participantes');
            return;
        }

        setParticipants(
            participants.map((p) => ({ ...p, status: 'sending' as const }))
        );

        try {
            const response = await fetch('/api/assign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    participants,
                    supervisor: supervisor || undefined,
                }),
            });

            if (!response.ok) throw new Error('Error al asignar participantes');

            // const result = await response.json();

            setParticipants(
                participants.map((p) => ({ ...p, status: 'sent' as const }))
            );
        } catch (err) {
            console.error('Error:', err);
            setError('Error al enviar los correos');
            setParticipants(
                participants.map((p) => ({ ...p, status: 'idle' as const }))
            );
        }
    };

    return (
        <div className="mx-auto w-full max-w-4xl p-4">
            <div className="mb-4">
                <span className="relative text-black dark:text-white">
                    Añade participantes y pulsa en &quot;Asignar&quot; para enviar los correos de asignación.
                    <span className="absolute -right-6 top-[calc(100%-1.2em)]">
                        <Info text="Entre 3 y 35 participantes" />
                    </span>
                </span>
            </div>

            <div className="mb-8">
                <div className="mb-4 flex flex-col gap-4 md:flex-row">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre"
                        className="w-full rounded border border-gray-200 bg-white p-2 text-black dark:border-gray-800 dark:bg-black dark:text-white"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full rounded border border-gray-200 bg-white p-2 text-black dark:border-gray-800 dark:bg-black dark:text-white"
                    />
                    <button
                        onClick={addParticipant}
                        className="rounded bg-black px-4 py-2 text-white hover:opacity-90 dark:bg-white dark:text-black"
                    >
                        Añadir
                    </button>
                </div>

                <div className="mt-6 flex flex-row">
                    <label className="flex items-center gap-2 text-black dark:text-white">
                        <input
                            type="checkbox"
                            checked={showSupervisor}
                            onChange={(e) =>
                                setShowSupervisor(e.target.checked)
                            }
                            className="rounded"
                        />
                        Añadir supervisor

                    </label>
                    <div className="ml-1 mt-1 text-black dark:text-white">
                        <Info text="Recibirá todas las asignaciones y no participa" />
                    </div>
                </div>

                {showSupervisor && (
                    <div className="mt-4 flex flex-col gap-4 md:flex-row">
                        <input
                            type="text"
                            value={supervisorName}
                            onChange={(e) => setSupervisorName(e.target.value)}
                            placeholder="Nombre del supervisor"
                            className="rounded border border-gray-200 bg-white p-2 text-black dark:border-gray-800 dark:bg-black dark:text-white md:w-1/3"
                        />
                        <input
                            type="email"
                            value={supervisorEmail}
                            onChange={(e) => setSupervisorEmail(e.target.value)}
                            placeholder="Email del supervisor"
                            className="rounded border border-gray-200 bg-white p-2 text-black dark:border-gray-800 dark:bg-black dark:text-white md:w-1/3"
                        />
                        <button
                            onClick={addSupervisor}
                            className="rounded bg-black px-4 py-2 text-white hover:opacity-90 dark:bg-white dark:text-black md:w-1/3"
                        >
                            Añadir Supervisor
                        </button>
                    </div>
                )}

                {error && (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                        {error}
                    </p>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="p-2 text-left text-black dark:text-white">
                                Nombre
                            </th>
                            <th className="p-2 text-left text-black dark:text-white">
                                Email
                            </th>
                            <th className="p-2 text-center text-black dark:text-white">
                                Estado
                            </th>
                            <th className="p-2 text-center text-black dark:text-white">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((participant) => (
                            <tr
                                key={participant.id}
                                className="border-b border-gray-200 dark:border-gray-800"
                            >
                                <td className="p-2 text-black dark:text-white">
                                    {participant.name}
                                </td>
                                <td className="p-2 text-black dark:text-white">
                                    {participant.email}
                                </td>
                                <td className="p-2 text-center">
                                    {participant.status === 'sending' && (
                                        <FaSpinner className="inline animate-spin text-black dark:text-white" />
                                    )}
                                    {participant.status === 'sent' && (
                                        <FaCheck className="inline text-green-500" />
                                    )}
                                    {participant.status === 'idle' && (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                                <td className="p-2 text-center">
                                    <button
                                        onClick={() =>
                                            setParticipants(
                                                participants.filter(
                                                    (p) =>
                                                        p.id !== participant.id
                                                )
                                            )
                                        }
                                        className="text-red-500 hover:opacity-70"
                                    >
                                        <MdDelete size={'25px'} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {supervisor && (
                            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                                <td className="p-2 text-black dark:text-white">
                                    {supervisor.name} (Supervisor)
                                </td>
                                <td className="p-2 text-black dark:text-white">
                                    {supervisor.email}
                                </td>
                                <td className="p-2 text-center">-</td>
                                <td className="p-2 text-center">
                                    <button
                                        onClick={() => setSupervisor(null)}
                                        className="text-red-500 hover:opacity-70"
                                    >
                                        <MdDelete size={'25px'} />
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {participants.length > 0 && (
                <div className="mt-8 text-center">
                    <button
                        onClick={assignParticipants}
                        disabled={participants.length < 3}
                        className="rounded bg-black px-6 py-2 text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
                    >
                        Asignar
                    </button>
                </div>
            )}
        </div>
    );
};
