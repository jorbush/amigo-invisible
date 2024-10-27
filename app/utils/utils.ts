import { Participant } from "../types/types";

export function getRandomAssignments(participants: Participant[]): { from: Participant; to: Participant }[] {
    const n = participants.length;
    if (n < 3) throw new Error('Se necesitan al menos 3 participantes');
    const available = Array.from({ length: n }, (_, i) => i);
    const assignments: number[] = new Array(n).fill(-1);
    for (let i = 0; i < n; i++) {
      const validIndices = available.filter(idx =>
        idx !== i && !assignments.includes(idx)
      );
      if (validIndices.length === 0) {
        return getRandomAssignments(participants);
      }
      assignments[i] = validIndices[Math.floor(Math.random() * validIndices.length)];
    }
    const isValid = assignments.every((val, idx) =>
      val !== -1 && val !== idx
    );
    if (!isValid) {
      return getRandomAssignments(participants);
    }
    return assignments.map((toIdx, fromIdx) => ({
      from: participants[fromIdx],
      to: participants[toIdx]
    }));
}
