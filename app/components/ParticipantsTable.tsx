'use client';
import { useState } from 'react';
import { FaCheck, FaSpinner, FaTimes } from 'react-icons/fa';
import { Participant } from '../types/types';

export const ParticipantsTable = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

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
        body: JSON.stringify({ participants }),
      });

      if (!response.ok) throw new Error('Error al asignar participantes');

      const result = await response.json();

      setParticipants(
        participants.map((p) => ({ ...p, status: 'sent' as const }))
      );
    } catch (err) {
      setError('Error al enviar los correos');
      setParticipants(
        participants.map((p) => ({ ...p, status: 'idle' as const }))
      );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={addParticipant}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Añadir
          </button>
        </div>
        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-center">Estado</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr
                key={participant.id}
                className="border-b dark:border-gray-700"
              >
                <td className="p-2 dark:text-white">{participant.name}</td>
                <td className="p-2 dark:text-white">{participant.email}</td>
                <td className="p-2 text-center">
                  {participant.status === 'sending' && (
                    <FaSpinner className="animate-spin inline text-blue-500" />
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
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {participants.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={assignParticipants}
            disabled={participants.length < 3}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Asignar Participantes
          </button>
        </div>
      )}
    </div>
  );
};
