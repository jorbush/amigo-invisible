export interface Participant {
    id: string;
    name: string;
    email: string;
    status: 'idle' | 'sending' | 'sent';
    assignedTo?: string;
}

export interface Supervisor {
    name: string;
    email: string;
    status: 'idle' | 'sending' | 'sent';
}
