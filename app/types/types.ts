export interface Participant {
    id: string;
    name: string;
    email: string;
    status: 'idle' | 'sending' | 'sent';
    assignedTo?: string;
}
