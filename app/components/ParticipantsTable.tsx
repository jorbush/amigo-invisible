'use client';
import { useState } from 'react';
import { FaCheck, FaSpinner } from 'react-icons/fa';
import { Participant, Supervisor } from '../types/types';
import { MdDelete } from "react-icons/md";

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
          supervisor: supervisor || undefined
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
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="p-2 border rounded bg-white dark:bg-black text-black dark:text-white border-gray-200 dark:border-gray-800"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 border rounded bg-white dark:bg-black text-black dark:text-white border-gray-200 dark:border-gray-800"
          />
          <button
            onClick={addParticipant}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:opacity-90"
          >
            Añadir
          </button>
        </div>

        <div className="mt-6">
          <label className="flex items-center gap-2 text-black dark:text-white">
            <input
              type="checkbox"
              checked={showSupervisor}
              onChange={(e) => setShowSupervisor(e.target.checked)}
              className="rounded"
            />
            Añadir supervisor (recibirá todas las asignaciones)
          </label>
        </div>

        {showSupervisor && (
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <input
              type="text"
              value={supervisorName}
              onChange={(e) => setSupervisorName(e.target.value)}
              placeholder="Nombre del supervisor"
              className="p-2 border rounded bg-white dark:bg-black text-black dark:text-white border-gray-200 dark:border-gray-800"
            />
            <input
              type="email"
              value={supervisorEmail}
              onChange={(e) => setSupervisorEmail(e.target.value)}
              placeholder="Email del supervisor"
              className="p-2 border rounded bg-white dark:bg-black text-black dark:text-white border-gray-200 dark:border-gray-800"
            />
            <button
              onClick={addSupervisor}
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:opacity-90"
            >
              Añadir Supervisor
            </button>
          </div>
        )}

        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-left text-black dark:text-white">Nombre</th>
              <th className="p-2 text-left text-black dark:text-white">Email</th>
              <th className="p-2 text-center text-black dark:text-white">Estado</th>
              <th className="p-2 text-center text-black dark:text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr
                key={participant.id}
                className="border-b border-gray-200 dark:border-gray-800"
              >
                <td className="p-2 text-black dark:text-white">{participant.name}</td>
                <td className="p-2 text-black dark:text-white">{participant.email}</td>
                <td className="p-2 text-center">
                  {participant.status === 'sending' && (
                    <FaSpinner className="animate-spin inline text-black dark:text-white" />
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
                        participants.filter((p) => p.id !== participant.id)
                      )
                    }
                    className="text-red-500 hover:opacity-70"
                  >
                    <MdDelete size={'25px'}/>
                  </button>
                </td>
              </tr>
            ))}
            {supervisor && (
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <td className="p-2 text-black dark:text-white">{supervisor.name} (Supervisor)</td>
                <td className="p-2 text-black dark:text-white">{supervisor.email}</td>
                <td className="p-2 text-center">-</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => setSupervisor(null)}
                    className="text-red-500 hover:opacity-70"
                  >
                    <MdDelete size={'25px'}/>
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
            className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Asignar Participantes
          </button>
        </div>
      )}
    </div>
  );
};
